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
    // const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    // const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    let daysByWeek = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    // const monthsLength = calendarData.setMonthLength();
    // const getMonthLength = function () {
    //     return 33 - new Date(currentYear, currentMonth, 33).getDate();
    // };
    const getFirstDay = function () {
        if (new Date(currentYear, currentMonth, 1).getDay() - 1 === -1) {
            return 6;
        }
        return new Date(currentYear, currentMonth, 1).getDay() - 1;
    };
    const getLastDay = function () {
        if (new Date(currentYear, currentMonth, calendarData.setMonthLength()[currentMonth]).getDay() - 1 === -1) {
            return 6;
        }
        return new Date(currentYear, currentMonth, calendarData.setMonthLength()[currentMonth]).getDay() - 1;
    };
    const setDays = function () {
        let days = [];
        //записываем дни месяца в массив
        for (let i = 1; i <= calendarData.setMonthLength()[currentMonth]; i++) {days.push(i);}
        //сдвигаем первый день месяца на нужную позицию
        for (let i = 0; i < getFirstDay(); i++) {days.unshift('');}
        //добавляем пустые элементы в конец массива, чтобы длина массива дней была кратна 7
        const emptyCellsCount = calendarData.dayNames.length - (days.length % 7);
        if (getLastDay() !== 6) {for (let i = 0; i < emptyCellsCount; i++) {days.push('');}}
        //разбиваем массив дней на недели
        while(days.length) {daysByWeek.push(days.splice(0, calendarData.dayNames.length));}
        return daysByWeek;
    };
    const createHTML = function () {
        const monthName = createNewElementAppend('h1', app, 'calendar-month');
        monthName.innerText = calendarData.monthNames[currentMonth] + ', ' + currentYear;
        const table = createNewElementAppend('table', app, 'calendar');
        createHeaderHTML(table);
        createBodyHTML(table);
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
        const tbodyData = setDays();
        for (let i = 0; i < tbodyData.length; i++) {
            let tbodyTr = createNewElementAppend('tr', tbody, '');
            for (let j = 0; j < tbodyData[i].length; j++) {
                let tbodyDay = createNewElementAppend('td', tbodyTr, 'calendar-day');
                let tbodyDayDate = createNewElementAppend('span', tbodyDay, 'calendar-day-date');
                tbodyDayDate.innerText = tbodyData[i][j];
                if (tbodyData[i][j] === currentDate) {
                    tbodyDay.classList.add('current');
                }
                if (tbodyData[i][j] < currentDate) {
                    tbodyDay.classList.add('before');
                }
            }
        }
    };
    this.create = function () {
        createHTML();
    }
}
let currentCalendar = new Calendar().create();
console.log(calendarData.setMonthLength());
