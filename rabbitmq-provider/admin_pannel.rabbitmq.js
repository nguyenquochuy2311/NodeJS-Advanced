const RabbitMQ = require('./rabbitmq.helpers');
const { ADMIN_PANNEL_QUEUE } = require('./admin_pannel_constant');

class AdminPannelRabbitMQ extends RabbitMQ {

    /**
	 * @constructor
	 * @param
	 */
    constructor() {
        super();
    }

    /**
	 * @param   
	 * @return  object
	 */
    async consumeWorkspaceSignup() {
        this.consume(ADMIN_PANNEL_QUEUE.WORKSPACE_SIGNUP, function (data) {
            console.log(data); 
        });
    }

    /**
	 * @param   
	 * @return  object
	 */
     async consumeWorkspaceSignin() {
        this.consume(ADMIN_PANNEL_QUEUE.WORKSPACE_SIGNIN, function (data) {
            console.log(data); 
        });
    }
}

module.exports = AdminPannelRabbitMQ;