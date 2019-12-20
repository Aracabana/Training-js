//checkbox
let checkbox1 = document.getElementById('checkbox1');
function fun1() {
    if (checkbox1.checked) {
        alert('checked!');
    } else {
        alert('unchecked!');
    }
}
checkbox1.onchange = fun1;

//radio
let btn = document.getElementById('btn1');
function fun2() {
    let radio1 = document.getElementsByName('radio1');
    for (let i = 0; i < radio1.length; i++) {
        if (radio1[i].checked) {
            alert('Element ' + [i + 1] + ' has been checked! ');
        }
    }
}
btn.onclick = fun2;

//select
let select1 = document.getElementById('select1');
let options1 = select1.options;
function fun3 () {
    let select1Index = select1.selectedIndex;
    alert(options1[select1Index].text);
}
select1.onchange = fun3;

//range
let range1 = document.getElementById('range1');
let rangeValue = document.getElementById('rangeValue');
let rangeDiv = document.getElementById('rangeDiv');
function fun4 () {
    //rangeValue.innerHTML = range1.value;
    rangeValue.value = range1.value;
}
function fun5 () {
    range1.value = rangeValue.value;
}
function fun6 () {
    rangeDiv.style.width = range1.value + 'px'
}
//range1.oninput = fun4;
//rangeValue.oninput = fun5;
range1.oninput = fun6;
