function solve(array, numberOfRotation){
    for (let i = 0; i < numberOfRotation; i++) {
        array = rotate(array);
    }

    console.log(array.join(' '));

    function rotate(arr) {
        let last = arr[0];
        for (let i = 0; i < arr.length - 1; i++) {
            arr[i] = arr[i+1]
        }
        arr[arr.length-1] = last;
        return arr;
    }
}

solve([51, 47, 32, 61, 21], 2)