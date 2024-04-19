function solve(number) {
    let oddSum = 0;
    let evenSum = 0;
    while (number > 0) {
        let digit = number % 10;
        number = Math.floor(number / 10);

        if(digit % 2 === 0){
            evenSum += digit;
        } else {
            oddSum += digit;
        }
    }

    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}

solve(1000435)