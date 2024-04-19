function solve(array) {
    let value = 0;
    for (let i = 0; i < array.length; i++) {
        let valueChange = getValueChange(array[i]);
        value = valueChange(value);
    }

    console.log(`The car is ${value.toFixed(2)}% clean.`)

    function getValueChange(operation) {
        switch (operation) {
            case 'soap':
                return function (sum) {
                    return sum + 10;
                }

            case 'water':
                return function (sum) {
                    return sum * 1.2;
                }
            case 'vacuum cleaner':
                return function (sum) {
                    return sum * 1.25;
                }
            case 'mud':
                return function (sum) {
                    return sum * 0.9;
                }
        }
    }
}

solve(["soap", "water", "mud", "mud", "water", "mud", "vacuum cleaner"])