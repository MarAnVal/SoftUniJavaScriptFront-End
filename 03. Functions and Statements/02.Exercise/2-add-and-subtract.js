function solve(numOne, numTwo, numThree) {
    console.log(subtract(sum(numOne, numTwo), numThree))

    function sum(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }
}