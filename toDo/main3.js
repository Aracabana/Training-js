// (function() {
function ToDo() {
    const byAll = (item) => item;
    const byDone = (item) => item.isDone;
    const byActive = (item) => !item.isDone;
    const byAbc = function(a, b) {
        if (a.text > b.text) {return 1;}
        if (a.text < b.text) {return -1;}
        return 0;
    };
    const btns = [
        {
            text: 'Все',
            classes: ['todo-filter-btn-all', 'active'],
            action: filter.bind(null, byAll)
        },
        {
            text: 'Выполненные',
            classes: ['todo-filter-btn-done'],
            action: filter.bind(null, byDone)
        },
        {
            text: 'Активные',
            classes: ['todo-filter-btn-active'],
            action: filter.bind(null, byActive)
        },
        {
            text: 'По алфавиту',
            classes: ['todo-filter-btn-abc'],
            action: sort.bind(null, byAbc)
        }
    ];
    let filterWrapper;
    let titleInner;
    let titleOuter;
    let list;
    let items;
    let localStorageKey = '';
    const saveToLocalStorage = function () {
        const currentToDo = ToDoLocalStorage.getByKey(localStorageKey);
        let currentDate = !currentToDo ? new Date() : currentToDo.date;
        const ToDoForSave = {
            title: titleInner.innerText,
            items,
            date: currentDate
        };
        const ToDoForSaveJson = JSON.stringify(ToDoForSave);
        localStorage.setItem(localStorageKey, ToDoForSaveJson);
    };
    const createHTML = function () {
        let container = document.getElementById('js-container');
        let wrapper = createNewElement('div', container, 'todo-list-wrapper');
        let card = createNewElement('div', wrapper, 'todo-list-card');
        createCardTitleHTML(card);
        list = createNewElement('ul', card, 'todo-list');
        createInputHTML(card);
        createBtns(card);
    };
    const createCardTitleHTML = function (card) {
        titleOuter = createNewElement('div', card, 'todo-list-title-outer');
        titleOuter.innerText = 'Введите название списка';
        titleInner = createNewElement('h1', card, 'todo-list-title-inner');
        titleInner.contentEditable = true;
        titleInner.addEventListener('input', () => {
            let titleText = titleInner.innerText;
            titleOuter.style.display = titleText ? 'none' : 'block';
        });
        titleInner.addEventListener('blur', () => {
            saveToLocalStorage();
        });
    };
    const setTitleOuter = function (value) {
        if (value) {
            titleOuter.style.display = 'none';
            titleInner.innerText = value;
            return
        }
        titleOuter.style.display = 'block';
    };
    const createInputHTML = function (card) {
        let inputWrapper = createNewElement('div', card, 'todo-list-input-wrapper');
        let input = createNewElement('input', inputWrapper, 'todo-list-input');
        input.placeholder = 'Напишите что-нибудь...';
        input.addEventListener('blur', () => {
            const inputValue = input.value;
            if (!inputValue) {
                return
            }
            items.push({
                text: inputValue,
                isDone: false
            });
            input.value = '';
            renderList(filter.bind(null, byAll));
            saveToLocalStorage();
        });
    };
    const createBtns = function(card) {
        filterWrapper = createNewElement('div', card, 'todo-filter-wrapper');
        btns.forEach(btn => {
            createFilterBtn(btn);
        });
    };
    const createFilterBtn = function (btn) {
        let newBtn = createNewElement('button', filterWrapper, 'todo-filter-btn');
        newBtn.innerText = btn.text;
        newBtn.classList.add(...btn.classes);
        newBtn.addEventListener('click', (e) => {
            toggleBtnClassActive(e.target);
            renderList(btn.action);
        });
    };
    const toggleBtnClassActive = function (target) {
        let currentActiveBtn = filterWrapper.querySelector('.todo-filter-btn.active');
        currentActiveBtn.classList.remove('active');
        target.classList.add('active');
    };
    const changeListItemStatus = function (filterBy, item) {
        item.isDone = !item.isDone;
        renderList(filterBy);
        saveToLocalStorage();
    };
    const renderList = function (action = undefined) {
        list.innerHTML = '';
        const dataForRender = action(items);
        dataForRender.forEach(item => {
            let listItem = createNewElement('li', list, 'todo-list-item');
            listItem.innerText = item.text;
            listItem.onclick = changeListItemStatus.bind(this, action, item);
            if (item.isDone) {listItem.classList.add('done');}
        });
    };
    this.createNew = function () {
        createHTML();
        items = [];
        localStorageKey = ToDoLocalStorage.getNewKey();
        console.log(this);
    };
    this.createExist = function (key, currentToDo) {
        createHTML();
        localStorageKey = key;
        items = currentToDo.items;
        setTitleOuter(currentToDo.title);
        renderList(filter.bind(null, byAll));
    };
}
const ToDoLocalStorage = {
    generateKey: function (keys) {
        let alphabet = 'abcdefghijklmnopqastuvwxyz';
        let newKey = '';
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
        const allToDo = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(key));
            allToDo.push({key, data});
        }
        allToDo.sort(function (a, b) {
            if (a.data.date > b.data.date) {
                return 1;
            }
            if (a.data.date < b.data.date) {
                return -1;
            }
            return 0;
        });
        return allToDo;
    },
    getByKey: function (key) {
        return JSON.parse(localStorage.getItem(key));
    }
};
function filter(filterType, items) {
    return items.filter(filterType);
}
function sort(sortType, items) {
    return items.sort(sortType);
}
function createNewElement(element, elementParent, elementClass) {
    let newElement = document.createElement(element);
    elementParent.appendChild(newElement);
    newElement.classList.add(elementClass);
    return newElement;
}
let createToDoBtn = document.getElementById('js-add-todo-btn');
createToDoBtn.onclick = function () {
    new ToDo().createNew();
};
const allToDo = ToDoLocalStorage.getAll();
if (allToDo) {
    allToDo.forEach(toDo => {
        new ToDo().createExist(toDo.key, toDo.data);
    });
}
// })();
