const orders = [500, 30, 99, 15,223];
let totalBad = 0;
let withTaxBad = [];
let highValueBad = [];

/* Bad */
for( i = 0; i<orders.length; i++) {
    //Reduce
    totalBad+=orders[i];

    //Map
    withTaxBad.push(orders[i] * 1.1);

    //Filter
    if(orders[i] > 100)
        highValueBad.push(orders[i]);
}

console.log(totalBad);
console.log(withTaxBad);
console.log(highValueBad);

/* Good */
let totalGood = orders.reduce((acc, cur) => acc+cur);

let withTaxGood = orders.map(v => v*1.1);

let highValueGood = orders.filter(v => v > 100);

console.log(totalGood);
console.log(withTaxGood);
console.log(highValueGood);