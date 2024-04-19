function solve(input) {
    let arr = input.map(e =>{
        return e.split(' ')
    })
    let object = {};

    for (const e of arr) {
        if(e[0] in object){
            console.log(`Conflict on ${e[0]}!`);
        } else {
            object[e[0]] = e[1];
            console.log(`Scheduled for ${e[0]}`);
        }
    }

    for (const key in object) {
        console.log(`${key} -> ${object[key]}`);
    }
}