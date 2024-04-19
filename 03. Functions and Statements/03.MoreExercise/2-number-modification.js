function solve(number) {
    let numberStr = number.toString();

    while (getAverageOfAllDigits(numberStr) < 5) {
        numberStr += '9';
    }

    console.log(numberStr);

    function getAverageOfAllDigits(str) {
        let arr = str.split('');
        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += Number(arr[i]);
        }

        return sum / arr.length;
    }
}

solve(101)