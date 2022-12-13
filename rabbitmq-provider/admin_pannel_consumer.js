const Consumer = require("./rabbitmq/consumer");

class AdminPannelConsumer extends Consumer {

    constructor() {
        super();
    }
}

module.exports = AdminPannelConsumer;