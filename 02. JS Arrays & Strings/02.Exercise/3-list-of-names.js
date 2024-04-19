function solve(array) {
    for (let i = 0; i < array.length; i++) {
        let smallestItem = array[i];
        let smallestIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            if (smallestItem > array[j]) {
                smallestItem = array[j];
                smallestIndex = j;
            }
        }

        if(smallestIndex !== i){
            let buffer = array[i];
            array[i] = array[smallestIndex];
            array[smallestIndex] = buffer;
        }
    }

    for (let i = 0; i < array.length; i++) {
        console.log(`${i + 1}.${array[i]}`)
    }
}

solve(["John", "Bob", "Boby", "Christina", "Ema"])