function getDateStatus(date) {

    date = date.trim();

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

    function isInt(val) {
        
        return !isNaN(val) && Number.isInteger(+val);
    }

    function validDay(day) {
        
        return isInt(day) && +day >= 1 && +day <= 31;
    }

    function validMonth(month) {
        
        return isInt(month) && +month >= 1 && +month <= 12;
    }

    function validYear(year) {
        
        return isInt(year) && year.length === 4;
    }

    function checkDMY(str, sep) {
        
        const parts = str.split(sep);
        if (parts.length !== 3) return false;
        let [d, m, y] = parts.map(p => p.trim());
        return validDay(d) && validMonth(m) && validYear(y);
    }

    function checkYMD(str, sep) {
        
        const parts = str.split(sep);
        if (parts.length !== 3) return false;
        let [y, m, d] = parts.map(p => p.trim());
        return validYear(y) && validMonth(m) && validDay(d);
    }

    function checkDayMonthRusYear(str) {
        
        const parts = str.split(" ");
        if (parts.length !== 3) return false;
        let [d, m, y] = parts;
        return validDay(d) && monthsRus.includes(m.toLowerCase()) && validYear(y);
    }

    function checkMonthEngDayYear(str, monthList) {
        
        const parts = str.split(",").map(p => p.trim());
        if (parts.length !== 2) return false;

        const [monthDay, year] = parts;
        const sub = monthDay.split(" ");
        if (sub.length !== 2) return false;

        const [month, day] = sub;
        return monthList.includes(month) && validDay(day) && validYear(year);
    }

    function checkYearMonthEngDay(str, monthList) {
        
        const parts = str.split(",").map(p => p.trim());
        if (parts.length !== 2) return false;

        const [year, monthDay] = parts;
        const sub = monthDay.split(" ");
        if (sub.length !== 2) return false;

        const [month, day] = sub;
        return validYear(year) && monthList.includes(month) && validDay(day);
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
