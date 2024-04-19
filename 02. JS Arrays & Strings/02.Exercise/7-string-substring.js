function solve(originalWord, str) {
    let word = originalWord.toLowerCase();
    str = str.toLowerCase();
    let regex = /\w+/g
    let strArr = str.match(regex);

    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i].localeCompare(word) === 0) {
            return console.log(`${originalWord}`);
        }
    }
    console.log(`${originalWord} not found!`);
}

// solve('java', 'javascript is the best programming language');
solve('javascript', 'JavaScript is the best programming language');
// solve('python', 'JavaScript is the best programming language');