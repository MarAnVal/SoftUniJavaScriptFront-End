function solve(arr) {
    let n = Number(arr.shift());
    let items = {};

    for (let i = 0; i < n; i++) {
        //{piece}|{composer}|{key}
        let data = arr.shift().split('|');
        items[data[0]] = {
            piece: data[0],
            composer: data[1],
            key: data[2],
        };
    }

    let commandLine = arr.shift();

    while (commandLine !== 'Stop') {
        let data = commandLine.split('|');
        let command = data.shift();

        let resultFunction = getResultFunction(command);
        resultFunction(data);

        commandLine = arr.shift();
    }

    for (let piece in items) {
        //
        console.log(`${items[piece].piece} -> Composer: ${items[piece].composer}, Key: ${items[piece].key}`)
    }

    function getResultFunction(command) {
        switch (command) {
            case 'Add':
                return function (arr) {
                    let piece = arr[0];
                    let composer = arr[1];
                    let key = arr[2];

                    if (!items[piece]) {
                        items[piece] = {piece, composer, key}
                        console.log(`${piece} by ${composer} in ${key} added to the collection!`)
                    } else {
                        console.log(`${piece} is already in the collection!`)
                    }

                }
            case 'Remove':
                return function (arr) {
                    let piece = arr[0];
                    if (items[piece]) {
                        delete items[piece];
                        console.log(`Successfully removed ${piece}!`);
                    } else {
                        console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                    }
                }
            case 'ChangeKey':
                return function (arr) {
                    let piece = arr[0];
                    let newKey = arr[1];
                    if (items[piece]) {
                        items[piece].key = newKey;
                        console.log(`Changed the key of ${piece} to ${newKey}!`);
                    } else {
                        console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                    }
                }
        }
    }
}