/**
 * Concurrency
 */
function add(a, b) {
    return a + b;
}

function print(n) {
    console.log(`Two times the number ${n} is ` + add(n, n));
}

print(5)