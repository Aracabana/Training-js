//const arr = [1, 2, 3, 5, 8, 19];
//
//arr.forEach(function(item, i, arr) {
//    console.log(item + ' -  элемент №' + i + ' массива ' + arr);
//});

let items = Array.from(document.getElementsByClassName('item'));
items.forEach(function(item, i, arr) {
    let textLength = item.innerHTML.length;
    console.log(textLength);
});
