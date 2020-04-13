function ToDo() {
    let actionsQueue = [];
    let filterWrapper;
    let sortWrapper;
    let designWrapper;
    const btns = [
        {
            text: 'Все',
            classes: ['todo-filter-btn-all', 'active'],
            wrapper: () => filterWrapper,
            action: filter.bind(null, ToDoActions.filter.byAll),
            type: 'filter'
        },
        {
            text: 'Выполненные',
            classes: ['todo-filter-btn-done'],
            wrapper: () => filterWrapper,
            action: filter.bind(null, ToDoActions.filter.byDone),
            type: 'filter'
        },
        {
            text: 'Активные',
            classes: ['todo-filter-btn-active'],
            wrapper: () => filterWrapper,
            action: filter.bind(null, ToDoActions.filter.byActive),
            type: 'filter'
        },
        {
            text: 'По алфавиту',
            classes: ['todo-filter-btn-abc'],
            wrapper: () => sortWrapper,
            action: sort.bind(null, ToDoActions.sort.byAbc),
            type: 'sort'
        },
        {
            text: 'По времени',
            classes: ['todo-filter-btn-time', 'active'],
            wrapper: () => sortWrapper,
            action: sort.bind(null, ToDoActions.sort.byTime),
            type: 'sort'
        }
    ];
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
        let wrapper = createNewElement('div', container, 'todo-list-wrapper');
        let card = createNewElement('div', wrapper, 'todo-list-card');
        createCardTitleHTML(card);
        list = createNewElement('ul', card, 'todo-list');
        createInputHTML(card);
        let cardFooter = createNewElement('div', card, 'todo-footer');
        createBtns(cardFooter);
        createDeleteBtn(cardFooter, wrapper);
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
        input.addEventListener('blur', () => {setListItemText(input, items);});
        input.addEventListener('keydown', (e) => {if (e.code === "Enter") {setListItemText(input, items);}});
    };
    const createBtns = function(cardFooter) {
        filterWrapper = createNewElement('div', cardFooter, 'todo-filter-wrapper');
        sortWrapper = createNewElement('div', cardFooter, 'todo-sort-wrapper');
        designWrapper = createNewElement('div', cardFooter, 'todo-design-wrapper');
        btns.forEach(btn => {
            let newBtn = createNewElement('button', btn.wrapper(), 'todo-filter-btn');
            newBtn.innerText = btn.text;
            newBtn.classList.add(...btn.classes);
            newBtn.addEventListener('click', (e) => {
                toggleBtnClassActive(e.target, btn.wrapper());
                addActionToQueue(btn.action, btn.type);
                renderList();
            });
        });
    };
    const createDeleteBtn = function (cardFooter, wrapper) {
        let deleteBtn = createNewElement('button', cardFooter, 'todo-footer-btn-delete');
        deleteBtn.innerText = 'X';
        deleteBtn.title = 'Удалить лист';
        deleteBtn.addEventListener('click', removeList.bind(null, wrapper));
    };
    const toggleBtnClassActive = function (target, wrapper) {
        let currentActiveBtn = wrapper.querySelector('.todo-filter-btn.active');
        currentActiveBtn.classList.remove('active');
        target.classList.add('active');
    };
    const createListItemHTML = function(item) {
        let listItem = createNewElement('li', list, 'todo-list-item');
        let listItemIn = createNewElement('span', listItem, 'todo-list-item-in');
        listItemIn.innerText = '✔';
        listItemIn.onclick = changeListItemStatus.bind(null, item);
        let listItemText = createNewElement('span', listItem, 'todo-list-item-text');
        listItemText.innerText = item.text;
        listItemText.contentEditable = true;
        listItemText.addEventListener('blur', changeListItemText.bind(null, item));
        if (item.isDone) {
            listItem.classList.add('done');
            listItemText.contentEditable = false;
        }
        let listItemDeleteBtn = createNewElement('button', listItem, 'todo-list-item-delete-btn');
        listItemDeleteBtn.innerText = 'x';
        listItemDeleteBtn.onclick = removeListItem.bind(null, item);
    };
    const setListItemText = function(input, items) {
        const inputValue = input.value;
        if (!inputValue) {return}
        items.push({
            text: inputValue,
            isDone: false,
            time: new Date()
        });
        input.value = '';
        renderList();
        saveToLocalStorage();
    };
    const changeListItemStatus = function (item) {
        item.isDone = !item.isDone;
        renderList();
        saveToLocalStorage();
    };
    const changeListItemText = function (item, e) {
        item.text = e.target.innerText;
        renderList();
        saveToLocalStorage();
    };
    const removeListItem = function(item) {
        items.splice(items.indexOf(item), 1);
        renderList();
        saveToLocalStorage();
    };
    const addActionToQueue = function(action, type) {
        let foundAction = actionsQueue.find(action => action.type === type);
        if (foundAction) {
            foundAction.action = action;
        } else {
            actionsQueue.push({action, type});
        }
    };
    const getDataForRender = function(items) {
        let adaptedData = items;
        actionsQueue.forEach(item => {
            adaptedData = item.action(adaptedData);
        });
        return adaptedData;
    };
    const removeList = function(wrapper) {
        ToDoLocalStorage.removeOne(localStorageKey);
        wrapper.remove();
    };
    const renderList = function () {
        list.innerHTML = '';
        const dataForRender = getDataForRender(items);
        dataForRender.forEach(item => {
            createListItemHTML(item);
        });
    };
    this.createNew = function () {
        createHTML();
        items = [];
        localStorageKey = ToDoLocalStorage.getNewKey();
    };
    this.createExist = function (key, currentToDo) {
        createHTML();
        localStorageKey = key;
        items = currentToDo.items;
        setTitleOuter(currentToDo.title);
        addActionToQueue(filter.bind(null, ToDoActions.filter.byAll), 'filter');
        addActionToQueue(sort.bind(null, ToDoActions.sort.byTime), 'sort');
        renderList();
    };
}
const ToDoLocalStorage = {
    generateKey: function (keys) {
        let alphabet = 'abcdefghijklmnopqastuvwxyz';
        let newKey = 'todo-';
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
            if (key.includes('todo-')) {
                const data = JSON.parse(localStorage.getItem(key));
                allToDo.push({key, data});
            }
        }
        return allToDo;
    },
    sortAll: function () {
        const allToDoSort = this.getAll();
        allToDoSort.sort(function (a, b) {
            if (a.data.date > b.data.date) {
                return 1;
            }
            if (a.data.date < b.data.date) {
                return -1;
            }
            return 0;
        });
        return allToDoSort;
    },
    getByKey: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },
    removeAll: function () {
        const allToDo = this.getAll();
        for (let i = 0; i < allToDo.length; i++) {
            let key = allToDo[i].key;
            localStorage.removeItem(key);
        }
    },
    removeOne: function(key) {
        localStorage.removeItem(key);
    }
};
const ToDoActions = {
    filter: {
        byAll: (item) => item,
        byDone: (item) => item.isDone,
        byActive: (item) => !item.isDone
    },
    sort: {
        byAbc: function(a, b) {
            if (a.text > b.text) {return 1;}
            if (a.text < b.text) {return -1;}
            return 0;
        },
        byTime: function(a, b) {
            if (a.time > b.time) {return 1;}
            if (a.time < b.time) {return -1;}
            return 0;
        }
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
let container = document.getElementById('js-container');
let createToDoBtn = document.getElementById('js-add-todo-btn');
createToDoBtn.onclick = function () {
    new ToDo().createNew();
};
let removeAllToDoBtn = document.getElementById('js-remove-all-todo-btn');
removeAllToDoBtn.onclick = function () {
    ToDoLocalStorage.removeAll();
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
};
const allToDo = ToDoLocalStorage.sortAll();
if (allToDo) {
    allToDo.forEach(toDo => {
        new ToDo().createExist(toDo.key, toDo.data);
    });
}
