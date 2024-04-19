function solve(char1, char2) {
    let start = char1.charCodeAt(0);
    let end = char2.charCodeAt(0);
    let result = '';

    if (end < start) {
        let buffer = start;
        start = end;
        end = buffer;
    }

    for (let i = start + 1; i < end; i++) {
        result += String.fromCharCode(i) + ' ';
    }

    console.log(result.trim());
}

solve('C',
    '#')