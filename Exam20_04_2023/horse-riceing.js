function solve(inputArr) {
    let horses = inputArr.shift().split('|');

    while (inputArr[0] !== 'Finish') {
        let commandLine = inputArr.shift().split(' ');
        let command = commandLine.shift();
        switch (command) {
            case 'Retake':
                let leftHorse = commandLine[0];
                let rightHorse = commandLine[1];
                let leftHorseIndex, rightHorseIndex;

                for (let i = 0; i < horses.length; i++) {
                    if(horses[i] === leftHorse){
                        leftHorseIndex = i;
                    } else if (horses[i] === rightHorse){
                        rightHorseIndex = i;
                    }
                }
                if(leftHorseIndex < rightHorseIndex){
                    horses[leftHorseIndex] = rightHorse;
                    horses[rightHorseIndex] = leftHorse;
                    console.log(`${leftHorse} retakes ${rightHorse}.`);
                }
                break;
            case 'Trouble':
                let horseToDrop = commandLine[0];
                for (let i = 1; i < horses.length; i++) {
                    if (horses[i] === horseToDrop) {
                        horses[i] = horses[i - 1];
                        horses[i-1] = horseToDrop;
                        console.log(`Trouble for ${horseToDrop} - drops one position.`)
                        break;
                    }
                }
                break;
            case 'Rage':
                let horseToRage = commandLine[0];
                for (let i = 0; i < horses.length; i++) {
                    if (horses[i] === horseToRage && i < horses.length - 2) {
                        horses[i] = horses[i + 1];
                        horses[i + 1] = horses[i + 2];
                        horses[i + 2] = horseToRage;
                    } else if (horses[i] === horseToRage && i < horses.length - 1) {
                        horses[i] = horses[i + 1];
                        horses[i + 1] = horseToRage;
                    }
                }
                console.log(`${horseToRage} rages 2 positions ahead.`);
                break;
            case 'Miracle':
                let miracle = horses.shift();
                horses.push(miracle);
                console.log(`What a miracle - ${miracle} becomes first.`);
                break;
        }

    }
    console.log(horses.join('->'));
    console.log(`The winner is: ${horses[horses.length - 1]}`);
}

solve(['Bella|Alexia|Sugar',
    'Retake Alexia Sugar',
    'Rage Bella',
    'Trouble Bella',
    'Finish'])