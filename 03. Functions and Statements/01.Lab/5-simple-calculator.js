function solve(operand1, operand2, operator) {
    let resultFunction = operation(operator);
    console.log(resultFunction(operand1, operand2));

    function operation(operator) {
        switch (operator) {
            case 'multiply':
                return function (a, b) {
                    return a * b;
                }

            case 'divide':
                return function (a, b) {
                    return a / b;
                }

            case 'add':
                return function (a, b) {
                    return a + b;
                }
            case 'subtract':
                return function (a, b) {
                    return a - b;
                }
        }
    }
}