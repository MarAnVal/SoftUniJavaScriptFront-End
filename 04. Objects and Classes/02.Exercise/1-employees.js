function solve(input) {
    class Employee {
        constructor(name) {
            this.name = name;
            this.personalNumber = name.length;
        }
    }

    let employees = input
        .map(e => {return new Employee(e)})
        .forEach(e => console.log(`Name: ${e.name} -- Personal Number: ${e.personalNumber}`));
}