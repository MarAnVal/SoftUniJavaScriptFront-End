function solve(string) {
    let regex = /#[a-zA-z]+/g
    let words = string.match(regex);

    for (let i = 0; i < words.length; i++) {
        console.log(words[i].substring(1));
    }
}

solve('Nowadays everyone uses # to tag a #special word in #socialMedia');

solve('The symbol # is known #variously in English-speaking #regions as the #number sign')