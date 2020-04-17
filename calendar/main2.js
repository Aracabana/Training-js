import {PopupNew, PopupExist} from './main4.js';

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
const calendarData = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
};
function Calendar(year, month, isCurrentMonth, isPreviousMonth) {
    this.curYear = year;
    this.curMonth = month;
    this.isCurMonth = isCurrentMonth;
    this.isPrevMonth = isPreviousMonth;
    let monthName;
    let tbody;
    let daysByWeeks = [];
    const getMonthLength = () => {
        return 33 - new Date(this.curYear, this.curMonth, 33).getDate();
    };
    const getFirstDay = () => {
        const firstDay = new Date(this.curYear, this.curMonth, 1).getDay() - 1;
        if (firstDay === -1) {
            return 6;
        }
        return firstDay;
    };
    const getLastDay = () => {
        const lastDay = new Date(this.curYear, this.curMonth, getMonthLength()).getDay() - 1;
        if (lastDay === -1) {
            return 6;
        }
        return lastDay;
    };
    const setDays = function () {
        let days = [];
        for (let i = 1; i <= getMonthLength(); i++) {
            days.push(i);
        }
        for (let i = 0; i < getFirstDay(); i++) {
            days.unshift('');
        }
        const emptyCellsCount = calendarData.dayNames.length - (days.length % 7);
        if (getLastDay() !== 6) {
            for (let i = 0; i < emptyCellsCount; i++) {
                days.push('');
            }
        }
        while(days.length) {daysByWeeks.push(days.splice(0, calendarData.dayNames.length));}
        return daysByWeeks;
    };
    const createHeaderHTML = function (table) {
        const thead = createNewElementPrepend('thead', table, '');
        const theadTr = createNewElementPrepend('tr', thead, '');
        for (let i = 0; i < calendarData.dayNames.length; i++) {
            let theadDay = createNewElementAppend('th', theadTr, 'calendar-day-name');
            theadDay.innerText = calendarData.dayNames[i];
        }
    };
    this.render = function () {
        monthName.innerText = calendarData.monthNames[this.curMonth] + ', ' + year;
        tbody.innerText = '';
        daysByWeeks = [];
        const tbodyData = setDays();
        for (let i = 0; i < tbodyData.length; i++) {
            let tbodyTr = createNewElementAppend('tr', tbody, '');
            for (let j = 0; j < tbodyData[i].length; j++) {
                let tbodyDay = createNewElementAppend('td', tbodyTr, 'calendar-day');
                if (!this.isPrevMonth) {
                    tbodyDay.addEventListener('click', () => {
                        new PopupNew().create();
                    });
                }
                let tbodyDayDate = createNewElementAppend('span', tbodyDay, 'calendar-day-date');
                tbodyDayDate.innerText = tbodyData[i][j];
                if (this.isCurMonth && tbodyData[i][j] === new Date().getDate()) {
                    tbodyDay.classList.add('current');
                }
                if ((this.isCurMonth && tbodyData[i][j] < new Date().getDate()) || this.isPrevMonth) {
                    tbodyDay.classList.add('before');
                }
            }
        }
    };
    this.createNew = function () {
        const wrapper = createNewElementAppend('div', app, 'calendar-wrapper');
        monthName = createNewElementAppend('h1', wrapper, 'calendar-month');
        const table = createNewElementAppend('table', wrapper, 'calendar');
        createHeaderHTML(table);
        tbody = createNewElementAppend('tbody', table, '');
        this.render();
    };
}



let monthNumber = new Date().getMonth();
const currentCalendar = new Calendar(new Date().getFullYear(), monthNumber, true, false);
currentCalendar.createNew();

const btnsWrapper = createNewElementAppend('div', app, 'btns-wrapper');
const btnPrev = createNewElementAppend('button', btnsWrapper, 'btn-prev');
btnPrev.innerText = '←';
btnPrev.addEventListener('click', function() {
    if (btnNext.getAttribute('disabled')) {
        btnNext.removeAttribute("disabled");
    }
    monthNumber--;
    currentCalendar.curMonth = monthNumber;
    currentCalendar.isCurMonth = monthNumber === new Date().getMonth();
    currentCalendar.isPrevMonth = monthNumber < new Date().getMonth();
    currentCalendar.render();
    if (monthNumber === 0) {
        this.setAttribute("disabled", true)
    }
});
const btnNext = createNewElementAppend('button', btnsWrapper, 'btn-next');
btnNext.innerText = '→';
btnNext.addEventListener('click', function() {
    if (btnPrev.getAttribute('disabled')) {
        btnPrev.removeAttribute("disabled");
    }
    monthNumber++;
    currentCalendar.curMonth = monthNumber;
    currentCalendar.isCurMonth = monthNumber === new Date().getMonth();
    currentCalendar.isPrevMonth = monthNumber < new Date().getMonth();
    currentCalendar.render();
    if (monthNumber === 11) {
        this.setAttribute("disabled", true);
    }
});


