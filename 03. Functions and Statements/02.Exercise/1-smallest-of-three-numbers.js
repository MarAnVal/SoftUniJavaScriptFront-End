function solve(numOne, numTwo, numThree) {
    let smallestNumberOfAll = smallestNumber(smallestNumber(numOne, numTwo), numThree);

    console.log(smallestNumberOfAll)

    function smallestNumber(a, b) {
        if(a > b){
            return b;
        }
        return a;
    }
}