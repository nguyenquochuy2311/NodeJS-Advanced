const EXCHANGE = 'workspace_exchange';

module.exports = async(instance, { message, routingKey }) => {
    try {
        await instance.createExchange({
            name: EXCHANGE,
            type: 'direct'
        });
        await instance.publish({ ex: EXCHANGE, routingKey }, message);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}