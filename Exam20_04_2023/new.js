function solve(inputArr) {
    let horsesLine = inputArr[0];
    let horses = horsesLine.split('|');

    for (let i = 1; i < inputArr.length; i++) {
        let commandLine = inputArr[i];
        if (commandLine === 'Finish') {
            break;
        }

        let command = commandLine.split(' ')[0];
        let attributes = commandLine.split(' ').slice(1);

        let resultFunction = getResultFunction(command);
        resultFunction(attributes);
    }

    console.log(horses.join('->'));
    console.log(`The winner is: ${horses[horses.length-1]}`)

    function getResultFunction(command) {
        switch (command) {
            case 'Retake':
                return function (arr) {
                    let leftHorse = arr[0];
                    let leftHorseIndex = horses.indexOf(leftHorse);
                    let rightHorse = arr[1];
                    let rightHorseIndex = horses.indexOf(rightHorse);

                    if(leftHorseIndex < rightHorseIndex){
                        horses[leftHorseIndex] = rightHorse;
                        horses[rightHorseIndex] = leftHorse;
                        console.log(`${leftHorse} retakes ${rightHorse}.`);
                    }
                };
            case 'Trouble':
                return function (arr) {
                    let horse = arr[0];
                    let index = horses.indexOf(horse);

                    if(index > 0){
                        horses[index] = horses[index - 1];
                        horses[index - 1] = horse;
                        console.log(`Trouble for ${horse} - drops one position.`);
                    }
                };
            case 'Rage':
                return function (arr) {
                    // {horse-name}
                    let horse = arr[0];
                    let index = horses.indexOf(horse);
                    for (let i = 0; i < 2; i++) {
                        if (index < horses.length - 1) {
                            horses[index] = horses[index + 1];
                            horses[index + 1] = horse;
                            index = horses.indexOf(horse);
                        } else {
                            break;
                        }
                    }
                    console.log(`${horse} rages 2 positions ahead.`)
                };
            case 'Miracle':
                return function (arr) {
                    let horse = horses.shift();
                    horses.push(horse);
                    console.log(`What a miracle - ${horses[horses.length - 1]} becomes first.`)
                };
        }
    }
}

solve(['Onyx|Domino|Sugar|Fiona',
    'Trouble Onyx',
    'Retake Onyx Sugar',
    'Rage Domino',
    'Miracle',
    'Finish'])