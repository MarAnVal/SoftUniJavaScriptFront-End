function solve(arr) {
    let n = Number(arr.shift());
    let astronauts = {};

    for (let i = 0; i < n; i++) {
        let dataLine = arr.shift();
        // {astronaut name} {oxygen level} {energy reserves}
        let data = dataLine.split(' ');
        let name = data[0];
        let oxygen = Number(data[1]);
        let energy = Number(data[2]);
        astronauts[name] = {
            name,
            oxygen,
            energy
        };
    }

    let commandLine = arr.shift();
    while (commandLine !== 'End') {
        let commandArr = commandLine.split(' - ')
        let command = commandArr.shift();

        let resultFunction = getResultFunction(command);
        resultFunction(commandArr);

        commandLine = arr.shift();
    }

    for (let name in astronauts) {
        console.log(`Astronaut: ${name}, Oxygen: ${astronauts[name].oxygen}, Energy: ${astronauts[name].energy}`);
    }

    function getResultFunction(command) {
        switch (command) {
            case 'Explore':
                return function (arr) {
                    let name = arr[0];
                    let energy = Number(arr[1]);
                    let astronaut = astronauts[name];

                    if(astronaut.energy >= energy){
                        astronaut.energy -= energy;
                        console.log(`${name} has successfully explored a new area and now has ${astronaut.energy} energy!`)
                    } else {
                        console.log(`${name} does not have enough energy to explore!`);
                    }
                }
            case 'Refuel':
                return function (arr) {
                    let name = arr[0];
                    let energyAmount = Number(arr[1]);
                    let astronaut = astronauts[name];

                    astronaut.energy += energyAmount;
                    if(astronaut.energy > 200){
                        energyAmount = 200 - astronaut.energy + energyAmount;
                        astronaut.energy = 200;

                    }
                    console.log(`${name} refueled their energy by ${energyAmount}!`);
                }
            case 'Breathe':
                return function (arr) {
                    let name = arr[0];
                    let oxygenAmount = Number(arr[1]);
                    let astronaut = astronauts[name];

                    astronaut.oxygen += oxygenAmount;
                    if(astronaut.oxygen > 100){
                        oxygenAmount = 100 - astronaut.oxygen + oxygenAmount;
                        astronaut.oxygen = 100;
                    }
                    console.log(`${name} took a breath and recovered ${oxygenAmount} oxygen!`);
                }
        }
    }
}

solve(['4',
    'Alice 60 100',
    'Bob 40 80',
    'Charlie 70 150',
    'Dave 80 180',
    'Explore - Bob - 60',
    'Refuel - Alice - 30',
    'Breathe - Charlie - 50',
    'End'])