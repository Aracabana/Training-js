function createNewElement(element, elementParent, elementClass) {
    let newElement = document.createElement(element);
    elementParent.appendChild(newElement);
    newElement.classList.add(elementClass);
    return newElement;
}
function createListTitle() {
    let listTitleInner = createNewElement('h1', listWrapper, 'todo-list-title-inner');
    listTitleInner.contentEditable = true;
    if (localStorage.getItem('listTitle') === null) {
        let listTitleOuter = createNewElement('div', listWrapper, 'todo-list-title-outer');
        listTitleOuter.innerText = 'Введите название списка';
        listTitleInner.oninput = toggleListTitleOuter;
    }
    if (localStorage.getItem('listTitle') !== '') {
        listTitleInner.innerText = localStorage.getItem('listTitle');
    }
    listTitleInner.onblur = saveListTitle;
}
function createListItem() {
    let listItem = document.createElement('li');
    list.prepend(listItem);
    listItem.classList.add('todo-list-item');
    listItem.onclick = markCompleted;
    return listItem;
}
function createListInput() {
    let listInput = createNewElement('input', listItemInput, 'todo-list-input');
    listInput.placeholder = 'Напишите что-нибудь...';
    return listInput;
}
function getInputValue() {
    let listItemText = this.value;
    this.value = '';
    if (listItemText !== '') {
        let listItem = createListItem(list);
        listItem.innerText = listItemText;
    }
}
function markCompleted() {
    this.classList.add('done');
}
function createListFilterBtn(filterBtnText, filterBtnClass, action) {
    let filterBtn = createNewElement('button', listFilter, 'todo-filter-btn');
    filterBtn.innerText = filterBtnText;
    filterBtnClass.forEach(item => {
        filterBtn.classList.add(item);
    });
    filterBtn.onclick = action;
    return filterBtn;
}
function changeFilterBtnClass(e) {
    let target = e.target;
    let listFilter = target.closest('.todo-filter');
    let filterBtns = Array.from(listFilter.querySelectorAll('.todo-filter-btn'));
    filterBtns.forEach((item) => {
        item.classList.remove('active');
    });
    target.classList.add('active');
}
function filterListItem(filterBy, e) {
    let target = e.target;
    let listItems = Array.from(target.closest('.todo-list-wrapper').querySelectorAll('.todo-list-item'));
    listItems.forEach(filterBy);
    changeFilterBtnClass(e);
}
const byAll = (item) => {item.style.display = 'list-item';};
const byDone = (item) => {item.style.display = !item.classList.contains('done') ? 'none' : 'list-item';};
const byActive = (item) => {item.style.display = item.classList.contains('done') ? 'none' : 'list-item';};
function toggleListTitleOuter() {
    let titleText = this.innerText;
    let listTitleOuter = this.closest('.todo-list-wrapper').querySelector('.todo-list-title-outer');
    listTitleOuter.style.display = titleText ? 'none' : 'block';
}
function saveListTitle() {
    let listTitleText = this.innerText;
    if (listTitleText !== '') {
        localStorage.setItem('listTitle', listTitleText);
    } else {
        localStorage.removeItem('listTitle')
    }
}

let listWrapper = createNewElement('div', document.body, 'todo-list-wrapper');
createListTitle();
let list = createNewElement('ul', listWrapper, 'todo-list');
let listItemInput = createNewElement('li', list, 'todo-list-item-input');
let listInput = createListInput();
listInput.addEventListener('blur', getInputValue);
let listFilter = createNewElement('div', listWrapper, 'todo-filter-wrapper');
let filterBtnAll = createListFilterBtn('Все', ['todo-filter-btn-all', 'active'], filterListItem.bind(null, byAll));
let filterBtnDone = createListFilterBtn('Выполненные', ['todo-filter-btn-done'], filterListItem.bind(null, byDone));
let filterBtnActive = createListFilterBtn('Активные', ['todo-filter-btn-active'], filterListItem.bind(null, byActive));
