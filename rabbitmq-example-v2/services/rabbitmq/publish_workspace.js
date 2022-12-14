const EXCHANGE = 'admin_pannel';

module.exports = async (instance, message, routingKey) => {
    try {
        await instance.createExchange(EXCHANGE, 'direct');
        await instance.publish(EXCHANGE, message, routingKey);
        return Promise.resolve();
    } catch (error) {
        return instance.init();
    }
}