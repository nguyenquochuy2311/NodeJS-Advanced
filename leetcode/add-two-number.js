/*
Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
*/

const l1 = [2, 4, 3];
const l2 = [5, 6, 4];

var addTwoNumbers = function (l1, l2) {
    let numl1 = Number(l1.toString().split(",").reverse().join(""));
    let numl2 = Number(l2.toString().split(",").reverse().join(""));
    let sum = numl1 + numl2;
    let result = sum.toString().split("").map(str => { return Number(str); });
    return result.reverse();
};

console.log(addTwoNumbers(l1, l2));