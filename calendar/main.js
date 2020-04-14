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
function Calendar(year, monthNumber, isPreviousMonth, isCurrentMonth) {
    const currentYear = year;
    const currentMonth = monthNumber;
    const currentIsPreviousMonth = isPreviousMonth;
    const currentIsCurrentMonth = isCurrentMonth;
    let daysByWeeks = [];
    const getMonthLength = function() {
        return 33 - new Date(currentYear, currentMonth, 33).getDate();
    };
    const getFirstDay = function () {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay() - 1;
        if (firstDay === -1) {
            return 6;
        }
        return firstDay;
    };
    const getLastDay = function () {
        const lastDay = new Date(currentYear, currentMonth, getMonthLength()).getDay() - 1;
        if (lastDay === -1) {
            return 6;
        }
        return lastDay;
    };
    const setDays = function () {
        let days = [];
        //записываем дни месяца в массив
        for (let i = 1; i <= getMonthLength(); i++) {
            days.push(i);
        }
        //сдвигаем первый день месяца на нужную позицию
        for (let i = 0; i < getFirstDay(); i++) {
            days.unshift('');
        }
        //добавляем пустые элементы в конец массива, чтобы длина массива дней была кратна 7
        const emptyCellsCount = calendarData.dayNames.length - (days.length % 7);
        if (getLastDay() !== 6) {
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
    const createBodyHTML = function (table) {
        const tbody = createNewElementAppend('tbody', table, '');
        const tbodyData = setDays(currentMonth, currentYear);
        for (let i = 0; i < tbodyData.length; i++) {
            let tbodyTr = createNewElementAppend('tr', tbody, '');
            for (let j = 0; j < tbodyData[i].length; j++) {
                let tbodyDay = createNewElementAppend('td', tbodyTr, 'calendar-day');
                let tbodyDayDate = createNewElementAppend('span', tbodyDay, 'calendar-day-date');
                tbodyDayDate.innerText = tbodyData[i][j];
                if (currentIsCurrentMonth && tbodyData[i][j] === new Date().getDate()) {
                    tbodyDay.classList.add('current');
                }
                if ((currentIsCurrentMonth && tbodyData[i][j] < new Date().getDate()) || currentIsPreviousMonth) {
                    tbodyDay.classList.add('before');
                }
            }
        }
    };
    this.create = function () {
        const wrapper = createNewElementAppend('div', app, 'calendar-wrapper');
        const monthName = createNewElementAppend('h1', wrapper, 'calendar-month');
        monthName.innerText = calendarData.monthNames[currentMonth] + ', ' + currentYear;
        const table = createNewElementAppend('table', wrapper, 'calendar');
        createHeaderHTML(table);
        createBodyHTML(table);
    };
}
for (let i = 0; i < 12; i++) {
    let isCurrentMonth = i === new Date().getMonth();
    let isPreviousMonth = i < new Date().getMonth();
    new Calendar(new Date().getFullYear(), i, isPreviousMonth, isCurrentMonth).create();
}

