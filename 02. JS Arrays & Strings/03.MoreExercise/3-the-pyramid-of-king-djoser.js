function solve(side, step) {
    let height = 0;
    let layerCount = 0;
    let stoneCount = 0;
    let marbleCount = 0;
    let lapisCount = 0;
    let goldCount = 0;

    while (side > 0) {
        height += step;
        layerCount++;

        if (side > 2) {
            if (layerCount % 5 === 0) {
                lapisCount += (side - 1) * 4 * step;
            } else {
                marbleCount += (side - 1) * 4 * step;
            }
            stoneCount += step * (side - 2) ** 2;
        } else {
            goldCount += step * side ** 2;
        }

        side -= 2;
    }

    console.log(`Stone required: ${Math.ceil(stoneCount)}`);
    console.log(`Marble required: ${Math.ceil(marbleCount)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapisCount)}`);
    console.log(`Gold required: ${Math.ceil(goldCount)}`);
    console.log(`Final pyramid height: ${Math.floor(height)}`);
}

solve(12,
    1)