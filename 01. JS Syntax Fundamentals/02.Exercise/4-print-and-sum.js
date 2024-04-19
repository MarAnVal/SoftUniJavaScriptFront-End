function solve(start, end) {
    let numbersStr = '';
    let sum = 0;

    for (let i = start; i <= end; i++) {
        numbersStr += i + ' ';
        sum += i;
    }

    console.log(numbersStr.trim());
    console.log(`Sum: ${sum}`);
}