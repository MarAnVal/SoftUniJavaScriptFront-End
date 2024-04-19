function solve(array) {
    sortAscending(array);
    return array;

    function sortAscending(arr) {
        for (let i = 0; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                let buffer = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = buffer;
            }

            let smallestItem = arr[i];
            let biggestItem = arr[i + 1]
            let smallestIndex = i;
            let biggestIndex = i + 1;

            for (let j = i + 2; j < arr.length; j++) {
                if (smallestItem > arr[j]) {
                    smallestItem = arr[j];
                    smallestIndex = j;
                } else if (biggestItem < arr[j]) {
                    biggestItem = arr[j];
                    biggestIndex = j;
                }
            }

            if (smallestIndex !== i) {
                let buffer = arr[i];
                arr[i] = arr[smallestIndex];
                arr[smallestIndex] = buffer;
            }
            if (biggestIndex !== i + 1) {
                let buffer = arr[i + 1];
                arr[i + 1] = arr[biggestIndex];
                arr[biggestIndex] = buffer;
            }
        }
    }
}

solve([22, 9, 63, 3, 2, 19, 54, 11, 21, 18])