function solve(data) {
    let n = Number(data.shift());
    let cars = {};

    for (let i = 0; i < n; i++) {
        //{rider}|{fuel capacity}|{position}
        let carData = data[0].split('|');
        let rider = carData[0];
        let fuel = Number(carData[1]);
        if (fuel > 100) {
            fuel = 100;
        }
        let position = Number(carData[2]);

        cars[rider] = {rider, fuel, position};

        data.shift();
    }

    let commandLine = data.shift();

    while (commandLine !== 'Finish') {
        //{command} – {rider} – {minimum fuel} – {changed position}
        let commands = commandLine.split(' - ');
        let command = commands.shift();

        let resultFunction = getResultFunction(command);
        resultFunction(commands);
        commandLine = data.shift();
    }

    for (let rider in cars) {
        console.log(`${rider}`);
        console.log(`  Final position: ${cars[rider].position}`);
    }

    function getResultFunction(command) {
        switch (command) {
            case 'StopForFuel' :
                return function (arr) {
                    let rider = arr[0];
                    let minimumFuel = Number(arr[1]);
                    let changedPosition = Number(arr[2]);
                    
                    if (cars[rider].fuel < minimumFuel) {
                        cars[rider].position = changedPosition;
                        console.log(`${rider} stopped to refuel but lost his position, now he is ${changedPosition}.`);
                    } else {
                        console.log(`${rider} does not need to stop for fuel!`);
                    }
                }
            case 'Overtaking' :
                return function (arr) {
                    let riderLeft = arr[0];
                    let riderRight = arr[1];

                    if (cars[riderLeft].position < cars[riderRight].position) {
                        let buffer = cars[riderLeft].position;
                        cars[riderLeft].position = cars[riderRight].position;
                        cars[riderRight].position = buffer;

                        console.log(`${riderLeft} overtook ${riderRight}!`);
                    }
                    //{rider 1} – {rider 2}
                    //If rider 1 is positioned to the left of rider 2,
                    // it means that rider 1 is ahead of rider 2 in the race,
                    // swap the position of the two riders. Then, print the following:
                    // "{rider 1} overtook {rider 2}!"
                    //???? wtf it means
                }
            case 'EngineFail' :
                return function (arr) {
                    let rider = arr[0];
                    let lapsLeft = arr[1];

                    delete cars[rider];
                    console.log(`${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
                }
        }
    }
}

solve(["4",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|3",
    "Jorge Lorenzo|80|4",
    "Johann Zarco|80|2",
    "StopForFuel - Johann Zarco - 90 - 5",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish"])