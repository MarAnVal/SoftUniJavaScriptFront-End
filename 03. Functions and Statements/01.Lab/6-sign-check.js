function solve(numOne, numTwo, numThree) {
    let isFirstNegative = numOne < 0;
    let isSecondNegative = numTwo < 0;
    let isThirdNegative = numThree < 0;
    if(
        (isFirstNegative && isSecondNegative && !isThirdNegative) ||
        (isFirstNegative && !isSecondNegative && isThirdNegative) ||
        (!isFirstNegative && isSecondNegative && isThirdNegative) ||
        (!isFirstNegative && !isSecondNegative && !isThirdNegative)
    ) {
        return console.log(`Positive`);
    }

    console.log(`Negative`);
}

solve(5,
    12,
    -15);

solve(-6,
    -12,
    14);

solve(-1,
    -2,
    -3);

solve(-5,
    1,
    1)