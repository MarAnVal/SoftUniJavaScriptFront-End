function solve(numberOfPeople, typeOfPeople, typeOfDay) {
    let prices = getPricesListBasedOnTypeOfDay(typeOfDay);
    let pricePerPerson = getPriceBasedOnTypeOfPeople(typeOfPeople, prices);
    let totalPriceFunction = getTotalPriceFunctionWithDiscounts(typeOfPeople, numberOfPeople);
    let totalPrice = totalPriceFunction(pricePerPerson)

    console.log(`Total price: ${totalPrice.toFixed(2)}`);

    function getPricesListBasedOnTypeOfDay(day) {
        switch (day) {
            case 'Friday':
                return [8.45, 10.90, 15];
            case 'Saturday':
                return [9.80, 15.60, 20];
            case 'Sunday':
                return [10.46, 16, 22.50];
        }
    }

    function getPriceBasedOnTypeOfPeople(peopleType, prices) {
        switch (peopleType) {
            case 'Students':
                return prices[0];
            case 'Business':
                return prices[1];
            case 'Regular':
                return prices[2];
        }
    }

    function getTotalPriceFunctionWithDiscounts(peopleType, peopleNumber) {
        switch (peopleType) {
            case 'Students':
                if (peopleNumber >= 30) {
                    return function (price) {
                        return price * numberOfPeople * 0.85;
                    }
                }
                break;
            case 'Business':
                if (numberOfPeople >= 100) {
                    return function (price) {
                        return (numberOfPeople - 10) * price;
                    }
                }
                break;
            case 'Regular':
                if (numberOfPeople >= 10 && numberOfPeople <= 20) {
                    return function (price) {
                        return numberOfPeople * 0.95 * price;
                    }
                }
                break;
        }
        return function (price) {
            return numberOfPeople * price;
        }
    }
}

solve(30, "Students", "Sunday");
solve(40, "Regular", "Saturday")