function solve(year) {
    if ((year % 4 !== 0) || (year % 100 === 0 && year % 400 !== 0)) {
        return console.log(`no`);
    }
    console.log(`yes`);
}