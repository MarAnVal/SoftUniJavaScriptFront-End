function solve(operand1, operator, operand2) {
    let operandFunction = getOperatorFunction(operator);

    operandFunction(operand1, operand2);

    function getOperatorFunction(operation) {
        switch (operation) {
            case '+':
                return function (operandA, operandB) {
                    console.log((operandA + operandB).toFixed(2));
                };
            case '-':
                return function (operandA, operandB) {
                    console.log((operandA - operandB).toFixed(2));
                };
            case '*':
                return function (operandA, operandB) {
                    console.log((operandA * operandB).toFixed(2));
                };
            case '/':
                return function (operandA, operandB) {
                    console.log((operandA / operandB).toFixed(2));
                };
            case '%':
                return function (operandA, operandB) {
                    console.log((operandA % operandB).toFixed(2));
                };
            case '**':
                return function (operandA, operandB) {
                    console.log((operandA ** operandB).toFixed(2));
                };
        }
        console.log('Error! Wrong operator!')
    }
}