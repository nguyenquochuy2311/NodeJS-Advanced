const obj = {
    name: "Ronaldo",
    clubs: [{ name: "MU" }, { name: "Real" }],
    age: undefined
}

// sallow copy
const copyObj1 = obj;
console.log(copyObj1);

const copyObj2 = { ...obj };
console.log(copyObj2);

const copyObj3 = JSON.parse(JSON.stringify(obj));
console.log(copyObj3);

//Deep clone
//structuredClone is now present in @types/node v17.0.29:
const copyObj4 = structuredClone(obj);
console.log(copyObj4);