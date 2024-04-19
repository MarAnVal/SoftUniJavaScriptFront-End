function solve(json) {
    let object = JSON.parse(json)
        Object.entries(object).forEach(e => console.log(`${e[0]}: ${e[1]}`));
}