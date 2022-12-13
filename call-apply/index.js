const obj = {
    firstName: "Huy",
    fullName: function (lastName, engName) {
        console.log("Full name:", this.firstName, lastName, engName);
    }
}

obj.fullName("Hi", "Men");
obj.fullName.call({ firstName: "Hoang" }, "Nguyen", "Custom");
obj.fullName.apply({ firstName: "Henry" }, ["Nguyen", "custom"]);