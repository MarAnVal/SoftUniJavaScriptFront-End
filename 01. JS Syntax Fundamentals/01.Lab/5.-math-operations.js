function solve(operand1, operand2, operator) {
    let operandFunction = getOperatorFunction(operator);

    operandFunction(operand1, operand2);

    function getOperatorFunction(operand) {
        switch (operator) {
            case '+':
                return function (operandA, operandB) {
                    console.log(operandA + operandB);
                };
            case '-':
                return function (operandA, operandB) {
                    console.log(operandA - operandB);
                };
            case '*':
                return function (operandA, operandB) {
                    console.log(operandA * operandB);
                };
            case '/':
                return function (operandA, operandB) {
                    console.log(operandA / operandB);
                };
            case '%':
                return function (operandA, operandB) {
                    console.log(operandA % operandB);
                };
            case '**':
                return function (operandA, operandB) {
                    console.log(operandA ** operandB);
                };
        }
        console.log('Error! Wrong operator!')
    }
}

solve(5, 6, '+');
solve(3, 5.5, '*');