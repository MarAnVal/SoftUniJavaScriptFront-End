function solve(string, word) {
    let censor = '*'.repeat(word.length);
    let result = string.replace(word, censor);

    while (result !== string){
        string = result;
        result = string.replace(word, censor);
    }

    console.log(result)
}

solve('A small sentence with some words', 'small');

solve('Find the hidden word', 'hidden')