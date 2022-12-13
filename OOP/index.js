class Meetup {
    constructor(name) {
        this._name = name;
    }
    // dong goi
    get name() {
        // Validation can happen on data
        return this._name;
    }
    set name(val) {
        // Validation can happen on data
        this._name = val;
    }
}
let meetup = new Meetup('JS');
console.log("meetup Name: " + meetup.name); // meetup Name: JS
meetup.name = 'Angular';
console.log("meetup Name: " + meetup.name); // meetup Name: Angular


//Ke thua
//Cach 1
class techMeet extends Meetup { }
class sportMeet extends Meetup { }
let js = new techMeet();
console.log(js instanceof techMeet);  // true
console.log(js instanceof Meetup);    // true
console.log(js instanceof Object);    // true

//Cach 2
class Meetup {
    constructor() {
        console.log("inside Meetup constructor");
    }
}
class techMeet extends Meetup {
    constructor() {
        super();
        console.log("inside techMeet constructor");
    }
}
let js2 = new techMeet();
console.log(js2 instanceof techMeet);  // true
console.log(js2 instanceof Meetup);    // true
console.log(js2 instanceof Object);  