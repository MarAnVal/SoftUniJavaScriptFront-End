function solve(number) {
    let sum = 0
    for (let i = 0; i < number; i++) {
        if(number % i === 0) {
            sum = sum + i;
        }
    }

    if (sum === number) {
        console.log(`We have a perfect number!`)
    } else {
        console.log(`It's not so perfect.`)
    }
}