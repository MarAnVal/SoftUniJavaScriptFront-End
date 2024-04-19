function solve(x1, x2, y1, y2) {

    console.log(`{${x1}, ${y1}} to {0, 0} is ${isValidDistance(x1, y1)}`);
    console.log(`{${x2}, ${y2}} to {0, 0} is ${isValidDistance(x2, y2)}`);
    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${isValidDistance(getRealLength(x1, x2), getRealLength(y1, y2))}`)

    function isValidDistance(x, y) {
        let distance = Math.sqrt(Math.abs(x) ** 2 + Math.abs(y) ** 2);

        if (Number.isInteger(distance)) {
            return 'valid';
        }
        return 'invalid';
    }

    function getRealLength(a, b) {
        if ((a < 0 && b > 0) || (a > 0 && b < 0)) {
            return Math.abs(a) + Math.abs(b);
        }
        return Math.abs(a - b)
    }
}

solve(3, 0, 0, 4);
solve(-2, 1, 1, 1);
solve(-2, -1, -1, -1);