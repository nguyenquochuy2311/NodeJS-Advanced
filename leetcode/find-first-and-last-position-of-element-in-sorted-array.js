/*
Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]
*/

nums = [5, 7, 7, 8, 8, 10];
target = 8

var searchRange = function (nums, target) {
    let first = -1;
    let last = -1;
    if (nums && nums.length !== 0) {
        first = nums.indexOf(target);
        last = nums.lastIndexOf(target);
    }
    return [first, last];
};

console.log(searchRange(nums, target));