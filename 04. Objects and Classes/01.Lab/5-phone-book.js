function solve(input) {
    let object =
    Object.fromEntries(input.map(e =>{
        return e.split(' ')
    }));

    for (const key in object) {
        console.log(`${key} -> ${object[key]}`);
    }
}

solve(['Tim 0834212554',
    'Peter 0877547887',
    'Bill 0896543112',
    'Tim 0876566344'])