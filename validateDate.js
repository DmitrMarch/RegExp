function getDateStatus(date) {

    date = date.trim();
    let monthLen = 0;

    const monthsRus = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const monthsEngFull = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthsEngShort = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthLens = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function isInt(val) {
        
        return !isNaN(val) && Number.isInteger(+val);
    }

    function validDay(day, monthLen) {
        
        return isInt(day) && +day >= 1 && +day <= monthLen;
    }

    function validMonth(month) {
        
        return isInt(month) && +month >= 1 && +month <= 12;
    }

    function validYear(year) {
        
        return isInt(year) && +year >= 100;
    }

    function leapYear(year) {

        let leap = false;
        year = +year;

        if (year % 4 === 0) {

            if (year % 100 === 0) {

                if (year % 400 === 0) {

                    leap = true;
                }
            }
            else {

                leap = true;
            }
        }

        return leap
    }

    function getMonthLen(m, y, monthList=[]) {

        let monthLen = 0;

        if (monthList.length !== 0) {

            m = monthList.indexOf(m) + 1;
        }

        if (validMonth(m)) {

            monthLen = monthLens[+m - 1];

            if (validYear(y) && leapYear(y) && +m === 2) {

                monthLen = 29
            }
        }

        return monthLen;
    }

    function checkDMY(str, sep) {
        
        const parts = str.split(sep);
        if (parts.length !== 3) return false;
        let [d, m, y] = parts.map(p => p.trim());

        monthLen = getMonthLen(m, y);

        return validDay(d, monthLen) && validMonth(m) && validYear(y);
    }

    function checkYMD(str, sep) {
        
        const parts = str.split(sep);
        if (parts.length !== 3) return false;
        let [y, m, d] = parts.map(p => p.trim());

        monthLen = getMonthLen(m, y);

        return validYear(y) && validMonth(m) && validDay(d, monthLen);
    }

    function checkDayMonthRusYear(str) {
        
        const parts = str.split(" ");
        if (parts.length !== 3) return false;
        let [d, m, y] = parts;

        monthLen = getMonthLen(m, y, monthsRus);

        return validDay(d, monthLen) && monthsRus.includes(m) && validYear(y);
    }

    function checkMonthEngDayYear(str, monthList) {
        
        const parts = str.split(",").map(p => p.trim());
        if (parts.length !== 2) return false;

        const [monthDay, y] = parts;
        const sub = monthDay.split(" ");
        if (sub.length !== 2) return false;

        const [m, d] = sub;

        monthLen = getMonthLen(m, y, monthList);

        return monthList.includes(m) && validDay(d, monthLen) && validYear(y);
    }

    function checkYearMonthEngDay(str, monthList) {
        
        const parts = str.split(",").map(p => p.trim());
        if (parts.length !== 2) return false;

        const [y, monthDay] = parts;
        const sub = monthDay.split(" ");
        if (sub.length !== 2) return false;

        const [m, d] = sub;

        monthLen = getMonthLen(m, y, monthList);
        
        return validYear(y) && monthList.includes(m) && validDay(d, monthLen);
    }

    return [
        checkDMY(date, "."), //1
        checkDMY(date, "/"), //2
        checkDMY(date, "-"), //3
        checkYMD(date, "."), //4
        checkYMD(date, "/"), //5
        checkYMD(date, "-"), //6
        checkDayMonthRusYear(date), //7
        checkMonthEngDayYear(date, monthsEngFull), //8
        checkMonthEngDayYear(date, monthsEngShort),//9
        checkYearMonthEngDay(date, monthsEngFull), //10
        checkYearMonthEngDay(date, monthsEngShort) //11
    ].map(x => x ? 1 : 0);
}
