function createListWrapper() {
    let listWrapper = document.createElement('div');
    document.body.appendChild(listWrapper);
    listWrapper.classList.add('todo-list-wrapper');
    return listWrapper;
}
function createListTitle(listWrapper) {
    let listTitle = document.createElement('h1');
    listWrapper.appendChild(listTitle);
    listTitle.innerText = 'Список дел';
    listTitle.classList.add('todo-list-title');
    return listTitle;
}
function createList(listWrapper) {
    let list = document.createElement('ul');
    listWrapper.appendChild(list);
    list.classList.add('todo-list');
    return list;
}
function createListItem(list) {
    let listItem = document.createElement('li');
    list.prepend(listItem);
    listItem.classList.add('todo-list-item');
    listItem.onclick = markCompleted;
    return listItem;
}
function createListItemInput(list) {
    let listItemInput = document.createElement('li');
    list.appendChild(listItemInput);
    listItemInput.classList.add('todo-list-item-input');
    return listItemInput;
}
function createListInput(listItemInput) {
    let listInput = document.createElement('input');
    listItemInput.appendChild(listInput);
    listInput.classList.add('todo-list-input');
    listInput.placeholder = 'Напишите что-нибудь';
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
let listWrapper = createListWrapper();
let listTitle = createListTitle(listWrapper);
let list = createList(listWrapper);
let listItemInput = createListItemInput(list);
let listInput = createListInput(listItemInput);
listInput.addEventListener('blur', getInputValue);


