const arr = [1, 2, [4, 5], 6, 7, [8]] ;

console.log(arr.flatMap((element) => element));

const arr1 = [1, 2, [3, [4, 5, [6, 7]]]] ;

console.log(arr1.flatMap((element) => element).flat(2)) ;