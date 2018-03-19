'use strict';
const Calendar = function (props) {
    const table = new Table(props.date);
    table.getDaysOfMonth(table.getYear(), table.getMonth());
    return (<div className="ui-datepicker">
        <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{table.getDayName()}</div>
            <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{table.getDate}</div>
                <div className="ui-datepicker-material-month">{table.getMonthName()}</div>
                <div className="ui-datepicker-material-year">{table.getYear()}</div>
            </div>
        </div>
        <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{table.getMonthName()}</span>&nbsp;<span
                className="ui-datepicker-year">{table.getYear()}</span>
            </div>
        </div>
        <table className="ui-datepicker-calendar">
            <colgroup>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
                <col className="ui-datepicker-week-end"/>
                <col className="ui-datepicker-week-end"/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col" title="Понедельник">Пн</th>
                <th scope="col" title="Вторник">Вт</th>
                <th scope="col" title="Среда">Ср</th>
                <th scope="col" title="Четверг">Чт</th>
                <th scope="col" title="Пятница">Пт</th>
                <th scope="col" title="Суббота">Сб</th>
                <th scope="col" title="Воскресенье">Вс</th>
            </tr>
            </thead>
            <tbody>
            {table.getDaysOfMonth(table.getYear(), table.getMonth())}
            </tbody>
        </table>
    </div>);
};

class Table {
    constructor(date) {
        this.date = date;
        this.days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверш', 'Пятница', 'Суббота'];
        this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентбрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    }

    getLastDayOfMonth(year, month) {
        var date = new Date(year, month + 1, 0);
        return date.getDate();
    }

    getDaysOfMonth(year, month) {
        const table = [];
        const currentMonthFirstDay = new Date(year, month, 1);
        let firstDay = currentMonthFirstDay.getDay();
        let lastMDate = this.getLastDayOfMonth(year, month);
        let rowsAmount;
        let currentDayInCalendar;
        if (firstDay !== 1) {
            table.push(this.getFirstRow(currentMonthFirstDay.getDay(), this.getLastDayOfMonth(year, month - 1)));
            currentDayInCalendar = 7 - firstDay + 1;
            rowsAmount = Math.floor((lastMDate - (7 - firstDay + 1)) / 7);
        }
        else {
            currentDayInCalendar = 0;
            rowsAmount = Math.floor(lastMDate / 7);
        }
        for (let i = 0; i < rowsAmount; i++) {
            table.push(this.getRow(currentDayInCalendar));
            currentDayInCalendar += 7;
        }
        if (currentDayInCalendar < lastMDate) {
            table.push(this.getLastRow(currentDayInCalendar, lastMDate));
        }
        return table;

    }

    getLastRow(day, lastDay) {
        const days = [];
        for (let i = day; i < lastDay; i++) {
            days.push(<td className={this.isToday(i+1)}>{i + 1}</td>);
        }
        let i = 1;
        while (days.length < 7) {
            days.push(<td className="ui-datepicker-other-month">{i}</td>);
            i++;
        }

        return (
            <tr>{days}</tr>
        )
    }

    getFirstRow(firstDay, lastDate) {
        const days = [];
        firstDay = firstDay == 0 ? 7 : firstDay;
        for (let i = 0; i < firstDay - 1; i++) {
            days.push(<td className="ui-datepicker-other-month">{lastDate - i}</td>);
        }
        for (let i = 0; i < 7 - firstDay + 1; i++) {
            days.push(<td className={this.isToday(i+1)}>{i + 1}</td>);
        }
        return (
            <tr>{days}</tr>
        )
    }

    getRow(startDate) {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(<td className={this.isToday(startDate+i + 1)}>{startDate + i + 1}</td>);
        }
        return (
            <tr>{days}</tr>
        )
    }

    getDayName() {
        return this.days[this.date.getDay()];
    }

    getMonthName() {
        return this.months[this.date.getMonth()];
    }

    getYear() {
        return this.date.getFullYear();
    }

    getDate() {
        return this.date.getDate();
    }

    getMonth() {
        return this.date.getMonth();
    }

    isToday(day) {
        if (day == this.getDate()) {
            return 'ui-datepicker-today';
        }
        else return '';
    }
}


