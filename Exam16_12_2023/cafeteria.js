function solve(input) {
    let n = input.shift();
    let team = {};

    for (let i = 0; i < n; i++) {
        //"{barista name} {shift} {coffee type 1,coffee type 2,...}"
        let barista = {};
        let baristaData = input.shift().split(' ');
        barista.shift = baristaData[1];
        barista.coffeeTypes = baristaData[2].split(',');

        team[baristaData[0]] = barista;
    }

    while (input[0] !== 'Closed') {
        //"Prepare / {barista name} / {shift} / {coffee type}"
        let commandline = input.shift();
        let commandData = commandline.split(' / ');
        let command = commandData.shift();
        let commandOperation = getCommandOperation(command);
        commandOperation(commandData);
    }

    function getCommandOperation(operation) {
        switch (operation) {
            case 'Prepare':
                return function (data) {
                    let name = data[0];
                    let shift = data[1];
                    let coffeeType = data[2];
                    if (team[name] && team[name].shift === shift && team[name].coffeeTypes.includes(coffeeType)) {
                        console.log(`${name} has prepared a ${coffeeType} for you!`);
                    } else {
                        console.log(`${name} is not available to prepare a ${coffeeType}.`)
                    }
                }
            case 'Change Shift':
                return function (data) {
                    let name = data[0];
                    let shift = data[1];
                    if(team[name]){
                        team[name].shift = shift;
                        console.log(`${name} has updated his shift to: ${shift}`);
                    }
                }
            case 'Learn':
                return function (data) {
                    let name = data[0];
                    let coffeeType = data[1];
                    if (team[name] && !team[name].coffeeTypes.includes(coffeeType)) {
                        team[name].coffeeTypes.push(coffeeType);
                        console.log(`${name} has learned a new coffee type: ${coffeeType}.`);
                    } else {
                        console.log(`${name} knows how to make ${coffeeType}.`);
                    }
                }
        }
    }

    for (let name in team) {
        console.log(`Barista: ${name}, Shift: ${team[name].shift}, Drinks: ${team[name].coffeeTypes.join(', ')}`)
    }
}

solve([
    '3',
    'Alice day Espresso,Cappuccino',
    'Bob night Latte,Mocha',
    'Carol day Americano,Mocha',
    'Prepare / Alice / day / Espresso',
    'Change Shift / Bob / night',
    'Learn / Carol / Latte',
    'Learn / Bob / Latte',
    'Prepare / Bob / night / Latte',
    'Closed']);