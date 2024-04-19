function solve(array) {
    let bitcoinPrice = 11949.16;
    let oneGramGoldPrice = 67.51;
    let firstPurchaseDay = NaN;
    let sum = 0;

    let bitcoinCount = 0;

    for (let i = 0; i < array.length; i++) {
        if ((i + 1) % 3 === 0) {
            array[i] = array[i] * 0.7;
        }

        sum += array[i] * oneGramGoldPrice;

        if (sum >= bitcoinPrice) {
            let boughtBitcoin = Math.floor(sum / bitcoinPrice)
            sum -= bitcoinPrice * boughtBitcoin;
            bitcoinCount += boughtBitcoin;
            if (isNaN(firstPurchaseDay)) {
                firstPurchaseDay = i + 1;
            }
        }
    }

    console.log(`Bought bitcoins: ${bitcoinCount}`)

    if (!isNaN(firstPurchaseDay)) {
        console.log(`Day of the first purchased bitcoin: ${firstPurchaseDay}`)
    }

    console.log(`Left money: ${sum.toFixed(2)} lv.`)
}

solve([3124.15,
    504.212,
    2511.124])