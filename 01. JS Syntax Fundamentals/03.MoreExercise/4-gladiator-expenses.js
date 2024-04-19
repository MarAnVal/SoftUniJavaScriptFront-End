function solve(lostFightNumber, helmetPrice, swordPrice, shieldPrice, armorPrice) {

    let expenses = Math.floor(lostFightNumber/2)*helmetPrice +
        Math.floor(lostFightNumber/3)*swordPrice +
        Math.floor(lostFightNumber/6)*shieldPrice +
        Math.floor(lostFightNumber/12)*armorPrice;



    console.log(`Gladiator expenses: ${expenses.toFixed(2)} aureus`)
}

solve(7,
    2,
    3,
    4,
    5);
solve(23,
    12.50,
    21.50,
    40,
    200);