// (function() {
function ToDo() {
    this.titleInner = null;
    this.titleOuter = null;
    this.list = null;
    this.input = null;
    this.filterWrapper = null;
    this.items = [];
    this.key = '';
    this.isNew = true;
    this.setItems = function(currentToDo, key) {
        let toDo = JSON.parse(currentToDo);
        this.items = toDo.items;
        this.setTitleOuter(toDo.title);
        this.isNew = false;
        this.key = key;
        this.renderList(this.byAll);
    };
    this.saveToLocalStorage = function() {
        const ToDoForSave = {
            title: this.titleInner.innerText,
            items: this.items
        };
        console.log(this.key);
        console.log(ToDoForSave);
        localStorage.setItem(this.key, JSON.stringify(ToDoForSave));
    };
    this.create = function() {
        this.createHTML();
        this.createListeners();
    };
    this.createHTML = function() {
        let wrapper = createNewElement('div', container, 'todo-list-wrapper');
        let instance = createNewElement('div', wrapper, 'todo-list-instance');
        this.createTitleHTML(instance);
        this.list = createNewElement('ul', instance, 'todo-list');
        let inputWrapper = createNewElement('div', instance, 'todo-list-input-wrapper');
        this.input = createNewElement('input', inputWrapper, 'todo-list-input');
        this.input.placeholder = 'Напишите что-нибудь...';
        this.filterWrapper = createNewElement('div', instance, 'todo-filter-wrapper');
        this.createFilterBtn('Все', ['todo-filter-btn-all', 'active'], this.byAll);
        this.createFilterBtn('Выполненные', ['todo-filter-btn-done'], this.byDone);
        this.createFilterBtn('Активные', ['todo-filter-btn-active'], this.byActive);
    };
    this.createTitleHTML = function(instance) {
        this.titleOuter = createNewElement('div', instance, 'todo-list-title-outer');
        this.titleOuter.innerText = 'Введите название списка';
        this.titleInner = createNewElement('h1', instance, 'todo-list-title-inner');
        this.titleInner.contentEditable = true;
        this.titleInner.addEventListener('input', () => {
            let titleText = this.titleInner.innerText;
            this.titleOuter.style.display = titleText ? 'none' : 'block';
        });
        this.titleInner.addEventListener('blur', () => {
            this.saveToLocalStorage();
        });
    };
    this.setTitleOuter = function(value) {
        if (value) {
            this.titleOuter.style.display = 'none';
            this.titleInner.innerText = value;
            return
        }
        this.titleOuter.style.display = 'block';
    };
    this.createFilterBtn = function(filterBtnText, filterBtnClass, filterBy) {
        let btn = createNewElement('button', this.filterWrapper, 'todo-filter-btn');
        btn.innerText = filterBtnText;
        filterBtnClass.forEach(item => {
            btn.classList.add(item);
        });
        btn.addEventListener('click', (e) => {
            this.toggleBtnClassActive(e.target);
            this.renderList(filterBy);
        });
    };
    this.createListeners = function() {
        this.input.addEventListener('blur', () => {
            const inputValue = this.input.value;
            if (!inputValue) {
                return
            }
            this.items.push({
                text: inputValue,
                isDone: false
            });
            this.input.value = '';
            this.renderList();
        });
    };
    this.toggleBtnClassActive = function(target) {
        let currentActiveBtn = this.filterWrapper.querySelector('.todo-filter-btn.active');
        currentActiveBtn.classList.remove('active');
        target.classList.add('active');
    };
    this.changeListItemStatus = function(filterBy, item) {
        item.isDone = !item.isDone;
        this.renderList(filterBy);
    };
    this.renderList = function(filterBy = this.byAll) {
        this.list.innerHTML = '';
        this.items.filter(filterBy).forEach(item => {
            let listItem = createNewElement('li', this.list, 'todo-list-item');
            listItem.innerText = item.text;
            listItem.onclick = this.changeListItemStatus.bind(this, filterBy, item);
            if (item.isDone) {
                listItem.classList.add('done');
            }
        });
        this.saveToLocalStorage();
    };
    this.byAll = (item) => item;
    this.byDone = (item) => item.isDone;
    this.byActive = (item) => !item.isDone;
}
const ToDoLocalStorage = {
    getInnerTitle: function() {
        return localStorage.getItem('listTitle');
    },
    hasInnerTitle: function() {
        return localStorage.getItem('listTitle') !== null;
    },
    toggleInnerTitle: function() {
        let listTitleText = this.innerText;
        if (listTitleText !== '') {
            localStorage.setItem('listTitle', listTitleText);
        } else {
            localStorage.removeItem('listTitle')
        }
    }
};

const ToDoStorage = {
    setIfToDosExist: function() {
        localStorage.setItem('blabla', JSON.stringify(todo));
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            const currentToDo = localStorage.getItem(key);
            const toDo = new ToDo();
            toDo.create();
            toDo.setItems(currentToDo, key);
        }
    },
    writeInLocalStorage: function() {
    
    },
    getAllToDoFromLocalStorage: function() {
    
    },
};
const todo = {
    title: 'dfghn',
    items: [
        {
            text: 'fgfgfgfg gfgfgg',
            isDone: false
        },
        {
            text: 'fgfgfgfg gfgfgg',
            isDone: false
        },
        {
            text: 'fgfgfgfg gfgfgg',
            isDone: false
        }
    ]
};

function createNewElement(element, elementParent, elementClass) {
    let newElement = document.createElement(element);
    elementParent.appendChild(newElement);
    newElement.classList.add(elementClass);
    return newElement;
}
let createToDoBtn = document.getElementById('js-add-todo-btn');
createToDoBtn.onclick = function() {
    new ToDo().create();
};
let container = document.getElementById('js-container');


// const ArrayOfToDo = [];
// const currentToDO = new ToDo();
// currentToDO.create();
// ArrayOfToDo.push(currentToDO);
// const currentToDO1 = new ToDo();
// currentToDO1.create();
// ArrayOfToDo.push(currentToDO1);

ToDoStorage.setIfToDosExist();

// })();
