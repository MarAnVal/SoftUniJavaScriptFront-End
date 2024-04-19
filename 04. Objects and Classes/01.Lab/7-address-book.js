function solve(input) {
    let object = Object
        .fromEntries(
            Object
                .entries(
                    Object
                        .fromEntries(
                            input.map(e => e.split(':'))
                        )
                )
                .sort((a, b) => a[0].localeCompare(b[0]))
        );

    for (const key in object) {
        console.log(`${key} -> ${object[key]}`)
    }
}

solve(['Bob:Huxley Rd',
    'John:Milwaukee Crossing',
    'Peter:Fordem Ave',
    'Bob:Redwing Ave',
    'George:Mesta Crossing',
    'Ted:Gateway Way',
    'Bill:Gateway Way',
    'John:Grover Rd',
    'Peter:Huxley Rd',
    'Jeff:Gateway Way',
    'Jeff:Huxley Rd'])