function solve(string) {

    string = string.toUpperCase();
    string = string.trim();

    const regex = /\w+/g;

    let result = string.match(regex);

    console.log(result.join(', '));
}

solve('Hi, how are you?');
solve('hello');
solve('Functions in JS can be nested, i.e. hold other functions');