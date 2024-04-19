function solve(input) {
    class Song {
        constructor(string) {
            let arr = string.split('_');
            this.typeList = arr[0];
            this.name = arr[1];
            this.time = arr[2];
        }
    }

    let typeToPrint = input[input.length - 1];
    let songsCount = input[0];
    let songs = [];
    for (let i = 1, j = 0; i <= songsCount; i++, j++) {
        songs[j] = new Song(input[i]);
    }

    songs.forEach(e => {
        if (typeToPrint === 'all' || typeToPrint === e.typeList) {
            console.log(`${e.name}`);
        }
    })
}

solve([3,
    'favourite_DownTown_3:14',
    'favourite_Kiss_4:16',
    'favourite_Smooth Criminal_4:01',
    'favourite'])