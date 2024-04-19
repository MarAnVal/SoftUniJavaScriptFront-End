function solve(string) {
    for (let i = 0; i < string.length; i++) {
        if ((string.charCodeAt(i) >= 65) && (string.charCodeAt(i) <= 90) && (i !== 0)) {
            string = string.substring(0, i) + ', ' + string.substring(i);
            i += 2;
        }
    }

    console.log(string);
}

solve('SplitMeIfYouCanHaHaYouCantOrYouCan');
solve('HoldTheDoor');
solve('ThisIsSoAnnoyingToDo')