function solve(typeOfDay, age) {
    let price;
    if (age < 0 || age > 122) {
       return console.log('Error!');
    } else if (age <= 18) {
        price = getPricesBasedOnTypeOfDay(typeOfDay)[0];
    } else if (age <= 64) {
        price = getPricesBasedOnTypeOfDay(typeOfDay)[1];
    } else {
        price = getPricesBasedOnTypeOfDay(typeOfDay)[2];
    }

    console.log(`${price}$`);

    function getPricesBasedOnTypeOfDay(day) {
        switch (day) {
            case 'Weekday':
                return [12, 18, 12];
            case 'Weekend':
                return [15, 20, 15];
            case 'Holiday':
                return [5, 12, 10];
        }
    }
}

solve('Weekday', 42);
solve('Holiday', -12);
solve('Holiday', 15);
