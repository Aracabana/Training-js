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
    dayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    getMonthLength: function (year, month) {
        return 33 - new Date(year, month, 33).getDate();
    },
    setMonthLength: function () {
        let monthsLength = [];
        for (let i = 0; i < 12; i++) {
            let currentMonthLength = this.getMonthLength(new Date().getFullYear(), i);
            monthsLength.push(currentMonthLength);
        }
        return monthsLength;
    }
};
function Calendar() {
    let daysByWeeks = [];
    const getFirstDay = function (monthNumber, year) {
        if (new Date(year, monthNumber, 1).getDay() - 1 === -1) {return 6;}
        return new Date(year, monthNumber, 1).getDay() - 1;
    };
    const getLastDay = function (monthNumber, year) {
        if (new Date(year, monthNumber, calendarData.setMonthLength()[monthNumber]).getDay() - 1 === -1) {return 6;}
        return new Date(year, monthNumber, calendarData.setMonthLength()[monthNumber]).getDay() - 1;
    };
    const setDays = function (monthNumber, year) {
        let days = [];
        //записываем дни месяца в массив
        for (let i = 1; i <= calendarData.setMonthLength()[monthNumber]; i++) {days.push(i);}
        //сдвигаем первый день месяца на нужную позицию
        for (let i = 0; i < getFirstDay(monthNumber, year); i++) {days.unshift('');}
        //добавляем пустые элементы в конец массива, чтобы длина массива дней была кратна 7
        const emptyCellsCount = calendarData.dayNames.length - (days.length % 7);
        if (getLastDay(monthNumber, year) !== 6) {for (let i = 0; i < emptyCellsCount; i++) {days.push('');}}
        //разбиваем массив дней на недели
        while(days.length) {daysByWeeks.push(days.splice(0, calendarData.dayNames.length));}
        return daysByWeeks;
    };
    const createHTML = function (monthNumber, year, isPreviousMonth, isCurrentMonth) {
        const wrapper = createNewElementAppend('div', app, 'calendar-wrapper');
        const monthName = createNewElementAppend('h1', wrapper, 'calendar-month');
        monthName.innerText = calendarData.monthNames[monthNumber] + ', ' + year;
        const table = createNewElementAppend('table', wrapper, 'calendar');
        createHeaderHTML(table);
        createBodyHTML(table, monthNumber, year, isPreviousMonth, isCurrentMonth);
    };
    const createHeaderHTML = function (table) {
        const thead = createNewElementPrepend('thead', table, '');
        const theadTr = createNewElementPrepend('tr', thead, '');
        for (let i = 0; i < calendarData.dayNames.length; i++) {
            let theadDay = createNewElementAppend('th', theadTr, 'calendar-day-name');
            theadDay.innerText = calendarData.dayNames[i];
        }
    };
    const createBodyHTML = function (table, monthNumber, year, isPreviousMonth, isCurrentMonth) {
        const tbody = createNewElementAppend('tbody', table, '');
        const tbodyData = setDays(monthNumber, year);
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
    this.create = function (monthNumber, year, isPreviousMonth, isCurrentMonth) {
        createHTML(monthNumber, year, isPreviousMonth, isCurrentMonth);
    }
}
for (let i = 0; i < 12; i++) {
    let isCurrentMonth = false;
    if (i === new Date().getMonth()){isCurrentMonth = true;}
    let isPreviousMonth = false;
    if (i < new Date().getMonth()){isPreviousMonth = true;}
    new Calendar().create(i, new Date().getFullYear(), isPreviousMonth, isCurrentMonth);
}

