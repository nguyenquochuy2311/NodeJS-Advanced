function Animal(name, weight) {
    this.name = name;
    this.weight = weight;
}

function Chicken(name, weight, legs) {
    Animal.call(this, name, weight);
    this.legs = legs;
}

const chicken = new Chicken("Ga", 4, 2)

console.log(chicken)