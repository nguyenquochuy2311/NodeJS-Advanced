/*Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.*/

var lengthOfLongestSubstring = function(s) {
    let result = [];
    let temp = [];
    let max = 0;
    s.split("").forEach((e) => {
        if(temp.includes(e)) {
            let slice1 = temp.slice(0, temp.indexOf(e) + 1);
            let slice2 = temp.slice(temp.indexOf(e) + 1);
            result.push(slice1);
            temp = slice2;
        }
        temp.push(e);
        if(temp.length > max)
            max = temp.length;
    });
    return max;
};

console.log(lengthOfLongestSubstring(""));