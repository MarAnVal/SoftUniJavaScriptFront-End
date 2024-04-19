function solve(inputValue) {
    let typeOfInput = typeof(inputValue);

    if(typeOfInput === "number"){
        return console.log(getCircleArea(inputValue).toFixed(2));
    }
    console.log(`We can not calculate the circle area, because we receive a ${typeOfInput}.`);

    function getCircleArea(radius){
        return Math.pow(radius, 2) * Math.PI;
    }
}

solve(5);
solve('error');
solve([1,2])