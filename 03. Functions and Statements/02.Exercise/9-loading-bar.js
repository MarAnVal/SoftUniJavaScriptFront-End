function solve(number) {
    let bar = getLoadingBar(number);
    if (number < 100) {
        console.log(`${number}% [${bar}]`);
        console.log(`Still loading...`)
    } else {
        console.log(`100% Complete!`);
        console.log(`[%%%%%%%%%%]`)
    }

    function getLoadingBar(n) {
        let result = '';
        for (let i = 0; i < 10; i++) {
            if (i < Math.floor(n / 10)) {
                result += '%';
            } else {
                result += '.';
            }
        }
        return result;
    }
}

solve(30);