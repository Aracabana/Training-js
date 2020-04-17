/*const app = document.getElementById('app');
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
}*/

function Popup() {
    let bg;
    this.title = null;
    this.eventName = null;
    this.eventDate = null;
    this.eventTime = null;
    this.saveBtn = null;
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
    this.createHTML = function() {
        bg = createNewElementAppend('div', app, 'popup-bg');
        const wrapper = createNewElementAppend('div', bg, 'popup-wrapper');
        const content = createNewElementAppend('div', wrapper, 'popup-content');
        const closeBtn = createNewElementAppend('button', content, 'popup-close-btn');
        closeBtn.innerText = 'X';
        closeBtn.addEventListener('click', this.remove);
        this.title = createNewElementAppend('h2', content, 'popup-title');
        this.eventName = createNewElementAppend('input', content, 'popup-event-name');
        this.eventDate = createNewElementAppend('input', content, 'popup-event-date');
        this.eventDate.type = 'date';
        this.eventDate.min = setMinValueForDate();
        this.eventDate.max = setMaxValueForDate();
        this.eventTime = createNewElementAppend('input', content, 'popup-event-time');
        this.eventTime.type = 'time';
        this.saveBtn = createNewElementAppend('button', content, 'popup-save-btn');
        this.saveBtn.innerText = 'Сохранить';
    };
    this.remove = function() {
        bg.remove();
    }
}

export function PopupNew() {
    this.create = function() {
        this.createHTML();
        this.title.innerText = 'Добавить событие';
        this.eventName.placeholder = 'Введите название события';
        this.eventDate.placeholder = 'Выберите дату';
        this.eventTime.placeholder = 'Выберите время';
        this.saveBtn.addEventListener('click', () => {
            new Event(this.eventName.value, this.eventDate.value, this.eventTime.value).createNew();
            this.remove();
        });
    }
}
PopupNew.prototype = new Popup();
export function PopupExist() {
    this.create = function(event) {
        this.createHTML();
        this.title.innerText = 'Редактировать событие';
        this.eventName.value = event.name;
        this.eventDate.value = event.date;
        this.eventTime.value = event.time;
        this.saveBtn.addEventListener('click', () => {
            const data = {
                title: this.eventName.value,
                date: this.eventDate.value,
                time: this.eventTime.value
            };
            event.updateEvent(data);
            this.remove();
        });
    }
}
PopupExist.prototype = new Popup();

function Event(eventName, eventDate, eventTime) {
    this.name = eventName;
    this.date = eventDate;
    this.time = eventTime;
    let wrapper;
    let title;
    let date;
    let time;
    this.localStorageKey = '';
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
        deleteBtn.addEventListener('click', () => {
            wrapper.remove();
            EventLocalStorage.removeOne(this.localStorageKey);
        });
        const editBtn = createNewElementAppend('button', wrapper, 'event-edit-btn');
        editBtn.innerText = '✎';
        editBtn.addEventListener('click', () => {
            new PopupExist().create(this);
        });
    };
    const saveToLocalStorage = () => {
        const eventForSave = {
            title: this.name,
            date: this.date,
            time: this.time
        };
        const eventForSaveJSON = JSON.stringify(eventForSave);
        localStorage.setItem(this.localStorageKey, eventForSaveJSON);
    };
    this.createNew = function() {
        createHTML();
        this.localStorageKey = EventLocalStorage.getNewKey();
        saveToLocalStorage();
    };
    this.createExist = function (key) {
        createHTML();
        this.localStorageKey = key;
    };
    this.updateEvent = function(data) {
        title.innerText = data.title;
        date.innerText = data.date;
        time.innerText = data.time;
        const dataForUpdate = JSON.stringify(data);
        EventLocalStorage.updateOne(this.localStorageKey, dataForUpdate);
    }
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
    new PopupNew().create();
});

const allEvents = EventLocalStorage.getAll();
if (allEvents) {
    allEvents.forEach(event => {
        new Event(event.data.title, event.data.date, event.data.time).createExist(event.key);
    });
}

