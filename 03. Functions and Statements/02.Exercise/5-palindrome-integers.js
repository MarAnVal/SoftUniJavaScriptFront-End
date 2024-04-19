function solve(numbers){
    for (let i = 0; i < numbers.length; i++) {
        console.log(isPalindrome(numbers[i]));
    }

    function isPalindrome(number){
        let arr = number.toString().split('');
        let middle = Math.floor(arr.length /2);

        for (let i = 0; i < middle; i++) {
            if(arr[i] !== arr[arr.length - i -1]){
                return false;
            }
        }

        return true;
    }
}