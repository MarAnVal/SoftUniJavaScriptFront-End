function solve(arr) {
    let n = Number(arr.shift());
    let heros = {};

    for (let i = 0; i < n; i++) {
        //{hero name} {HP} {bullets}
        let dataLine = arr.shift();
        let data = dataLine.split(' ');

        heros[data[0]] = {heroName: data[0], hp: Number(data[1]), bullets: Number(data[2])};
    }

    let actionLine = arr.shift();

    while (actionLine !== 'Ride Off Into Sunset') {
        let actionData = actionLine.split(' - ');
        let action = actionData.shift();

        let resultFunction = getResultFunction(action);
        resultFunction(actionData);
        actionLine = arr.shift();
    }

    for (let heroName in heros) {
        console.log(heroName);
        console.log(` HP: ${heros[heroName].hp}`);
        console.log(` Bullets: ${heros[heroName].bullets}`);
    }

    function getResultFunction(action) {
        switch (action) {
            case 'FireShot':
                return function (arr) {
                    let heroName = arr[0];
                    let target = arr[1];

                    if (heros[heroName].bullets > 0) {
                        heros[heroName].bullets--;
                        console.log(`${heroName} has successfully hit ${target} and now has ${heros[heroName].bullets} bullets!`);
                    } else {
                        console.log(`${heroName} doesn't have enough bullets to shoot at ${target}!`);
                    }
                    //"FireShot - {character name} - {target}"
                    // If the character has bullets, they fire a shot, reducing their bullet count by one. Print this message:
                    // "{character name} has successfully hit {target} and now has {number of bullets left} bullets!"
                    // If the character does not have bullets to shoot, print:
                    // "{character name} doesn't have enough bullets to shoot at {target}!"
                }
            case 'TakeHit':
                return function (arr) {
                    let heroName = arr[0];
                    let damage = Number(arr[1]);
                    let attacker = arr[2];

                    heros[heroName].hp -= damage;
                    if(heros[heroName].hp > 0){
                        console.log(`${heroName} took a hit for ${damage} HP from ${attacker} and now has ${heros[heroName].hp} HP!`);
                    } else {
                        delete heros[heroName];
                        console.log(`${heroName} was gunned down by ${attacker}!`);
                    }
                    //"TakeHit - {character name} - {damage} - {attacker}"
                    // Reduce the character's HP by the given damage amount. If the character is still standing
                    // (their HP is greater than 0), print:
                    // "{character name} took a hit for {damage} HP from {attacker} and now has {current HP} HP!"
                    // If the character has been gunned down, remove them from your posse and print:
                    // "{character name} was gunned down by {attacker}!"
                }
            case 'Reload':
                return function (arr) {
                    let heroName = arr[0];

                    if(heros[heroName].bullets < 6){
                        let reloaded = 6 - heros[heroName].bullets;
                        heros[heroName].bullets = 6;
                        console.log(`${heroName} reloaded ${reloaded} bullets!`);
                    } else {
                        console.log(`${heroName}'s pistol is fully loaded!`);
                    }
                    // TODO is it wit space in front? " {character name}'s pistol is fully loaded!"
                }
            case 'PatchUp':
                return function (arr) {
                    let heroName = arr[0];
                    let amount = Number(arr[1]);
                    let maxHP = 100;

                    if(heros[heroName].hp < 100){
                        heros[heroName].hp += amount;
                        if(heros[heroName].hp > 100){
                            amount = amount - (heros[heroName].hp - maxHP);
                        }
                        console.log(`${heroName} patched up and recovered ${amount} HP!`)
                    } else {
                        console.log(`${heroName} is in full health!`);
                    }
                }
        }
    }
}