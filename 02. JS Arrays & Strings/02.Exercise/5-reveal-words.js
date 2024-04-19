function solve(words, string) {
    let wordsArr = words.split(', ');

    for (let i = 0; i < wordsArr.length; i++) {
        let regex = '*'.repeat(wordsArr[i].length);
        string = string.replace(regex, wordsArr[i]);
    }

    console.log(string)
}

solve('great', 'softuni is ***** place for learning new programming languages');
solve('great, learning', 'softuni is ***** place for ******** new programming languages')