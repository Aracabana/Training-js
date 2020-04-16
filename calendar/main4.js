const app = document.getElementById('app');
function createNewElementAppend(element, elementParent, elementClass) {
    let newElement = document.createElement(element);
    elementParent.appendChild(newElement);
    if (elementClass) {
        newElement.classList.add(elementClass);
    }
    return newElement;
}
function createNewElementPrepend(element, elementParent, elementClass) {
    let newElement = document.createElement(element);
    elementParent.prepend(newElement);
    if (elementClass) {
        newElement.classList.add(elementClass);
    }
    return newElement;
}

function Popup() {
    let bg;
    let title;
    let eventName;
    let eventDate;
    let eventTime;
    let saveBtn;
    const createHTML = function() {
        bg = createNewElementAppend('div', app, 'popup-bg');
        const wrapper = createNewElementAppend('div', bg, 'popup-wrapper');
        const content = createNewElementAppend('div', wrapper, 'popup-content');
        const closeBtn = createNewElementAppend('button', content, 'popup-close-btn');
        closeBtn.innerText = 'X';
        closeBtn.addEventListener('click', remove);
        title = createNewElementAppend('h2', content, 'popup-title');
        eventName = createNewElementAppend('input', content, 'popup-event-name');
        eventDate = createNewElementAppend('input', content, 'popup-event-date');
        eventDate.type = 'date';
        eventDate.min = setMinValueForDate();
        eventDate.max = setMaxValueForDate();
        eventTime = createNewElementAppend('input', content, 'popup-event-time');
        eventTime.type = 'time';
        saveBtn = createNewElementAppend('button', content, 'popup-save-btn');
        saveBtn.innerText = 'Сохранить';
    };
    const setMinValueForDate = function() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return yyyy + '-' + mm + '-' + dd;
    };
    const setMaxValueForDate = function() {
        let today = new Date();
        let yyyy = today.getFullYear();
        return yyyy + '-' + 12 + '-' + 31;
    };
    this.createNew = function() {
        createHTML();
        title.innerText = 'Добавить событие';
        eventName.placeholder = 'Введите название события';
        eventDate.placeholder = 'Выберите дату';
        eventTime.placeholder = 'Выберите время';
        saveBtn.addEventListener('click', function() {
            new Event(eventName.value, eventDate.value, eventTime.value).createNew();
            remove();
        });
    };
    this.createExist = function(name, date, time, key) {
        createHTML();
        title.innerText = 'Редактировать событие';
        eventName.value = name;
        eventDate.value = date;
        eventTime.value = time;
        saveBtn.addEventListener('click', function() {
            const data = {
                title: eventName.value,
                date: eventDate.value,
                time: eventTime.value
            };
            const dataForUpdate = JSON.stringify(data);
            EventLocalStorage.updateOne(key, dataForUpdate);
            updateEvent(key, data);
            remove();
        });
    };
    const remove = function() {
        bg.remove();
    }
}

function Event(eventName, eventDate, eventTime) {
    this.name = eventName;
    this.date = eventDate;
    this.time = eventTime;
    let wrapper;
    let title;
    let date;
    let time;
    let localStorageKey = '';
    const createHTML = () => {
        wrapper = createNewElementAppend('div', app, 'event');
        title = createNewElementAppend('p', wrapper, 'event-title');
        title.innerText = this.name;
        date = createNewElementAppend('p', wrapper, 'event-date');
        date.innerText = this.date;
        time = createNewElementAppend('p', wrapper, 'event-time');
        time.innerText = this.time;
        const deleteBtn = createNewElementAppend('button', wrapper, 'event-delete-btn');
        deleteBtn.innerText = 'x';
        deleteBtn.addEventListener('click', function() {
            wrapper.remove();
            EventLocalStorage.removeOne(localStorageKey);
        });
        const editBtn = createNewElementAppend('button', wrapper, 'event-edit-btn');
        editBtn.innerText = '✎';
        editBtn.addEventListener('click', () => {
            new Popup().createExist(this.name, this.date, this.time, localStorageKey);
        });
    };
    const saveToLocalStorage = () => {
        const eventForSave = {
            title: this.name,
            date: this.date,
            time: this.time
        };
        const eventForSaveJSON = JSON.stringify(eventForSave);
        localStorage.setItem(localStorageKey, eventForSaveJSON);
    };
    this.createNew = function() {
        createHTML();
        localStorageKey = EventLocalStorage.getNewKey();
        wrapper.id = localStorageKey;
        saveToLocalStorage();
    };
    this.createExist = function (key) {
        createHTML();
        localStorageKey = key;
        wrapper.id = localStorageKey;
    };
}

const EventLocalStorage = {
    generateKey: function (keys) {
        let alphabet = 'abcdefghijklmnopqastuvwxyz';
        let newKey = 'event-';
        for (let j = 0; j < 5; j++) {
            const rand = Math.round(Math.random() * (alphabet.length - 1));
            newKey += alphabet[rand];
        }
        if (keys.includes(newKey)) {
            this.generateKey(keys);
        } else {
            return newKey;
        }
    },
    getNewKey: function () {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            keys.push(localStorage.key(i));
        }
        return this.generateKey(keys);
    },
    getAll: function () {
        const allEvents = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes('event-')) {
                const data = JSON.parse(localStorage.getItem(key));
                allEvents.push({key, data});
            }
        }
        return allEvents;
    },
    updateOne: function(currentKey, data) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key === currentKey) {
                localStorage.setItem(currentKey, data);
                break;
            }
        }
    },
    removeOne: function(key) {
        localStorage.removeItem(key);
    }
};

const addEventBtn = createNewElementAppend('button', app, 'add-event-btn');
addEventBtn.innerText = 'Добавить событие';
addEventBtn.addEventListener('click', function () {
    new Popup().createNew();
});

const allEvents = EventLocalStorage.getAll();
if (allEvents) {
    allEvents.forEach(event => {
        new Event(event.data.title, event.data.date, event.data.time).createExist(event.key);
    });
}

function updateEvent(id, data) {
    let event = document.getElementById(id);
    let eventName = event.querySelector('.event-title');
    eventName.innerText = data.title;
    let eventDate = event.querySelector('.event-date');
    eventDate.innerText = data.date;
    let eventTime = event.querySelector('.event-time');
    eventTime.innerText = data.time;
}
