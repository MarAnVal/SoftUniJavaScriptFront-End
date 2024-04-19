function solve(index, array) {
    let subArray = array.slice(0, index);
    console.log(subArray.reverse().join(' '));
}

solve(3, [10, 20, 30, 40, 50])