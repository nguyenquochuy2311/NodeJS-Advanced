/*
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
*/

const l1 = [9,9,9,9,9,9,9];
const l2 = [];

var addTwoNumbers = function(l1, l2) {
    let numl1 = Number(l1.toString().split(",").reverse().join(""));
    let numl2 = Number(l2.toString().split(",").reverse().join(""));

    let result = (numl1 + numl2).toString().split("").reverse().map(str => { return Number(str); });
    return result;
};

console.log(addTwoNumbers(l1, l2));