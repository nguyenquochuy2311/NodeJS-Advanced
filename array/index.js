let arr1 = [ "a", "b", "c"];

//push
arr2 = [...arr1, "d", "e"];
console.log(arr2);

//shift
arr3 = ["1", "2", ...arr2];
console.log(arr3);

//unsift
arr4 = [ "0", ...arr3, "f"];
console.log(arr4);