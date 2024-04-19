function solve(input) {
    input.map(e => {
        let data = e.split(' | ');
        return  {
            town: data[0],
            latitude: Number(data[1]).toFixed(2),
            longitude: Number(data[2]).toFixed(2),
        }

    })
        .forEach(e => console.log(e));
}