function solve(currentYield) {
    let day = 0;
    let stored = 0;

    while (currentYield >= 100) {
        stored += currentYield;

        currentYield -= 10;
        stored -= 26;
        day++;
    }

    stored -= 26;
    if (stored < 0) {
        stored = 0;
    }

    console.log(day);
    console.log(stored);
}

solve(111);
solve(450);