function solve(password) {
    let firstCondition = isValidLength(password);
    let secondCondition = isValidContent(password);
    let thirdCondition = isValidDigitsCount(password)

    if (firstCondition && secondCondition && thirdCondition) {
        console.log(`Password is valid`)
    }

    function isValidLength(str) {
        if (str.length < 6 || str.length > 10) {
            console.log(`Password must be between 6 and 10 characters`);
            return false;
        }
        return true;
    }

    function isValidContent(str) {
        let regex = /[a-zA-z0-9]+/g
        let arr = str.match(regex);

        if (arr === null || arr.join('').localeCompare(str) !== 0) {
            console.log(`Password must consist only of letters and digits`)
            return false;
        }

        return true;
    }

    function isValidDigitsCount(str) {
        let regex = /[0-9]/g
        let arr = str.match(regex);

        if (arr === null || arr.length < 2) {
            console.log(`Password must have at least 2 digits`)
            return false;
        }

        return true;
    }
}

solve('Pa$s$s')