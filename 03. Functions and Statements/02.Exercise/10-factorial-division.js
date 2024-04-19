function solve(firstNumber, secondNumber) {
    let firstFactorial = getFactorial(firstNumber);
    let secondFactorial = getFactorial(secondNumber);
    let division = firstFactorial/secondFactorial;

    console.log(`${division.toFixed(2)}`);

    function getFactorial(number) {
      if(number === 1){
          return 1;
      }  else {
          return getFactorial(number - 1) * number;
      }
    }
}

solve(6,
    2);