/* eslint-disable snakecasejs/snakecasejs */
const { v4: uuidv4 } = require("uuid");

class Producer {
    static channel;

    static async get_channel() {
        if (!this.channel) {
            const connection = global.rabbit_mq_connection;
            this.channel = await connection.createChannel();
        }
        return this.channel;
    }

    async publish_message(routing_key, signature, message) {
        const channel = await Producer.get_channel();
        await channel.assertExchange(process.env.RABBIT_EXCHANGE, process.env.RABBIT_TYPE_EXCHANGE);

        const properties = {
            type: signature
        };

        const details = {
            uuid: uuidv4(),
            fired_at: new Date(),
            ...message
        };

        await channel.publish(
            process.env.RABBIT_EXCHANGE,
            routing_key,
            Buffer.from(JSON.stringify(details)),
            properties
        );

        console.log(`This message is sent to exchange ${process.env.RABBIT_EXCHANGE}`, message);
    }
}

module.exports = {
    Producer,
    producer_obj: new Producer()
};

