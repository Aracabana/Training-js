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
function Calendar() {
    // const currentYear = year;
    // this.currentMonth = monthNumber;
    // const currentIsPreviousMonth = isPreviousMonth;
    // const currentIsCurrentMonth = isCurrentMonth;
    let monthName;
    let tbody;
    let daysByWeeks = [];
    const getMonthLength = function(year, month) {
        return 33 - new Date(year, month, 33).getDate();
    };
    const getFirstDay = function (year, month) {
        const firstDay = new Date(year, month, 1).getDay() - 1;
        if (firstDay === -1) {
            return 6;
        }
        return firstDay;
    };
    const getLastDay = function (year, month) {
        const lastDay = new Date(year, month, getMonthLength(year, month)).getDay() - 1;
        if (lastDay === -1) {
            return 6;
        }
        return lastDay;
    };
    const setDays = function (year, month) {
        let days = [];
        //записываем дни месяца в массив
        for (let i = 1; i <= getMonthLength(year, month); i++) {
            days.push(i);
        }
        //сдвигаем первый день месяца на нужную позицию
        for (let i = 0; i < getFirstDay(year, month); i++) {
            days.unshift('');
        }
        //добавляем пустые элементы в конец массива, чтобы длина массива дней была кратна 7
        const emptyCellsCount = calendarData.dayNames.length - (days.length % 7);
        if (getLastDay(year, month) !== 6) {
            for (let i = 0; i < emptyCellsCount; i++) {
                days.push('');
            }
        }
        //разбиваем массив дней на недели
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
    this.render = function (year, month, isCurrentMonth, isPreviousMonth) {
        monthName.innerText = calendarData.monthNames[month] + ', ' + year;
        tbody.innerText = '';
        daysByWeeks = [];
        const tbodyData = setDays(year, month);
        for (let i = 0; i < tbodyData.length; i++) {
            let tbodyTr = createNewElementAppend('tr', tbody, '');
            for (let j = 0; j < tbodyData[i].length; j++) {
                let tbodyDay = createNewElementAppend('td', tbodyTr, 'calendar-day');
                let tbodyDayDate = createNewElementAppend('span', tbodyDay, 'calendar-day-date');
                tbodyDayDate.innerText = tbodyData[i][j];
                if (isCurrentMonth && tbodyData[i][j] === new Date().getDate()) {
                    tbodyDay.classList.add('current');
                }
                if ((isCurrentMonth && tbodyData[i][j] < new Date().getDate()) || isPreviousMonth) {
                    tbodyDay.classList.add('before');
                }
            }
        }
    };
    this.createNew = function (year, month, isCurrentMonth, isPreviousMonth) {
        const wrapper = createNewElementAppend('div', app, 'calendar-wrapper');
        monthName = createNewElementAppend('h1', wrapper, 'calendar-month');
        const table = createNewElementAppend('table', wrapper, 'calendar');
        createHeaderHTML(table);
        tbody = createNewElementAppend('tbody', table, '');
        this.render(year, month, isCurrentMonth, isPreviousMonth);
    };
}
let monthNumber = new Date().getMonth();
let isCurrentMonth = true;
let isPreviousMonth = false;
const currentCalendar = new Calendar();
currentCalendar.createNew(new Date().getFullYear(), monthNumber, isCurrentMonth, isPreviousMonth);

const btnsWrapper = createNewElementAppend('div', app, 'btns-wrapper');
const btnPrev = createNewElementAppend('button', btnsWrapper, 'btn-prev');
btnPrev.innerText = '←';
btnPrev.addEventListener('click', function() {
    if (btnNext.getAttribute('disabled')) {
        btnNext.removeAttribute("disabled");
    }
    monthNumber--;
    isCurrentMonth = monthNumber === new Date().getMonth();
    isPreviousMonth = monthNumber < new Date().getMonth();
    currentCalendar.render(new Date().getFullYear(), monthNumber, isCurrentMonth, isPreviousMonth);
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
    isCurrentMonth = monthNumber === new Date().getMonth();
    isPreviousMonth = monthNumber < new Date().getMonth();
    currentCalendar.render(new Date().getFullYear(), monthNumber, isCurrentMonth, isPreviousMonth);
    if (monthNumber === 11) {
        this.setAttribute("disabled", true);
    }
});

