function solve(input) {
    let moviesNames = [];
    let j = 0;
    for (let i = 0; i < input.length; i++) {
        let element = input[i];
        if (input[i].indexOf('addMovie ') > -1) {
            moviesNames[j] = input[i].substring('addMovie '.length);
            j++
        }
    }

    let directedBy = [];
    j = 0;
    for (let i = 0; i < input.length; i++) {
        let element = input[i];
        if (input[i].indexOf(' directedBy ') > -1) {
            directedBy[j] = input[i].split(' directedBy ');
            j++
        }
    }

    let onDate = [];
    j = 0;
    for (let i = 0; i < input.length; i++) {
        let element = input[i];
        if (input[i].indexOf(' onDate ') > -1) {
            onDate[j] = input[i].split(' onDate ');
            j++
        }
    }

    for (let i = 0; i < moviesNames.length; i++) {
        let movie = {};
        movie.name = moviesNames[i];
        let isValid = true;

        for (let k = 0; k < directedBy.length; k++) {
            let currentName = directedBy[k][0]
            if (currentName === movie.name) {
                movie.director = directedBy[k][1];
                break;
            } else if (k === directedBy.length - 1) {
                isValid = false
            }
        }

        if (isValid) {
            for (let k = 0; k < onDate.length; k++) {
                let currentName = onDate[k][0]
                if (currentName === movie.name) {
                    movie.date = onDate[k][1];
                    break;
                } else if (k === onDate.length - 1) {
                    isValid = false
                }
            }
        }

        if (isValid) {
            console.log(JSON.stringify(movie))
        }
    }
}

solve([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
])