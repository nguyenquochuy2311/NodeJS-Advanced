const EventEmitter = require("events");
const util = require("util");

function Dialog() {
    this.message = "Hello 1";
}

util.inherits(Dialog, EventEmitter);

Dialog.prototype.sayHello = function () {
    console.log(this.message);
    this.emit("addEventEmitter");
}

const dialog = new Dialog();

dialog.on("addEventEmitter", function () {
    console.log("Hello 2");
});

dialog.sayHello("...Say");