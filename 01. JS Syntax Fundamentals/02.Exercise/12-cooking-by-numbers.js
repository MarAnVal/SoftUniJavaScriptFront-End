function solve(number, ...operations) {
    for (let i = 0; i < operations.length; i++) {
        number = operate(number, operations[i]);
        console.log(number);
    }

    function operate(number, operation){
        switch (operation){
            case 'chop':
                return number / 2;
            case 'dice':
                return Math.sqrt(number);
            case 'spice':
                return number + 1;
            case 'bake':
                return number * 3;
            case 'fillet':
                return number * 0.8;
        }
    }
}