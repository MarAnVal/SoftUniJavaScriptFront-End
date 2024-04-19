function solve(arr) {
    let str = arr.shift();


    while (arr[0] !== 'Buy') {
        let commandLine = arr.shift();
        let commands = commandLine.split('?');
        let command = commands.shift();

        let resultFunction = getResultFunction(command);
        resultFunction(commands);
    }

    console.log(`The cryptocurrency is: ${str}`);

    function getResultFunction(command) {
        switch (command) {
            case 'TakeEven':
                return function () {
                    let result = '';
                    for (let i = 0; i < str.length; i+=2) {
                        result += str.charAt(i);
                    }
                    str = result;
                    console.log(str);
                }
            case 'ChangeAll':
                return function (arr) {
                    //"ChangeAll?{substring}?{replacement}":
                    // Changes all occurrences of the given substring in the message
                    // with the replacement text and then prints the message.
                    let subStr = arr[0];
                    let replacement = arr[1];
                    while (str.includes(subStr)){
                        str = str.replace(subStr, replacement);
                    }
                    console.log(str);
                }
            case 'Reverse':
                return function (arr) {
                    let subStr = arr[0];
                    if (str.includes(subStr)) {
                        let index = str.indexOf(subStr);
                        str = str.substring(0, index).concat(str.substring(index + subStr.length));
                        subStr = subStr.split('').reverse().join('');
                        str += subStr;
                        console.log(str);
                    } else {
                        console.log('error')
                    }
                }
        }
        return null;
    }
}

solve(["z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscsaaaaaaaaa",
    "TakeEven",
    "Reverse?!nzahc",
    "ChangeAll?m?g",
    "Reverse?adshk",
    "ChangeAll?z?i",
    "Buy"]);