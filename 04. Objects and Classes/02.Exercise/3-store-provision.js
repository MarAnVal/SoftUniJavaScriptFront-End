function solve(currentStock, orderedProducts) {
    let store = {};

    for (let i = 0; i < currentStock.length - 1; i += 2) {
        store[currentStock[i]] = Number(currentStock[i + 1]);
    }

    for (let i = 0; i < orderedProducts.length - 1; i += 2) {
        if (orderedProducts[i] in store) {
            store[orderedProducts[i]] += Number(orderedProducts[i + 1]);
        } else {
            store[orderedProducts[i]] = Number(orderedProducts[i + 1]);
        }
    }

    for (let key in store) {
        console.log(`${key} -> ${store[key]}`)
    }
}

solve([
        'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
    ],
    [
        'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
    ])