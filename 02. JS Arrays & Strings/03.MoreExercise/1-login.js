function solve(array) {
    let username = array[0];
    let password = username.split('').reverse().join('');
    let incorrectPasswordsCount = 0;

    for (let i = 1; i < array.length; i++) {
        if (array[i].localeCompare(password) === 0) {
            return console.log(`User ${username} logged in.`);
        } else {
            incorrectPasswordsCount++;
            if (incorrectPasswordsCount >= 4) {
                return console.log(`User ${username} blocked!`);
            }

            console.log(`Incorrect password. Try again.`);
        }
    }
}

// solve(['Acer', 'login', 'go', 'let me in', 'recA']);
solve(['sunny', 'rainy', 'cloudy', 'sunny', 'not sunny']);