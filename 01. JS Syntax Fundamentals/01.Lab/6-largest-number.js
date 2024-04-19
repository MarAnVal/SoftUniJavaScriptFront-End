function solve(...numbers) {
    let largestNumber = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if(largestNumber < numbers[i]){
            largestNumber = numbers[i];
        }
    }
    console.log(`The largest number is ${largestNumber}.`);
}

solve(5, -3, 16);
solve(-3, -5, -22.5);