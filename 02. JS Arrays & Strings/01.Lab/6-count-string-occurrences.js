function solve(string, word) {
    let regex = /\w+/g;
    let array = string.match(regex);
    let count = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] === word) {
            count++;
        }
    }

    console.log(count)
}

solve('This is a word and it also is a sentence', 'is')
solve('softuni is great place for learning new programming languages', 'softuni');