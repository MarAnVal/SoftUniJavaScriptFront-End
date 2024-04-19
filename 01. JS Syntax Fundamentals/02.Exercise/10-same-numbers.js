function solve(number) {
    let areSameDigits = true;
    let sum = 0;
    let currentDigit, lastDigit;

    lastDigit = number % 10;
    sum += lastDigit;
    number = Math.floor(number / 10);

    while (number > 0) {
        currentDigit = number % 10;
        sum += currentDigit;
        number = Math.floor(number / 10);

        if (areSameDigits && lastDigit !== currentDigit) {
            areSameDigits = false;
        }

    }

    console.log(areSameDigits);
    console.log(sum);
}

solve(2222222);
solve(2221222);
