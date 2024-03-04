/* eslint-disable snakecasejs/snakecasejs */
const processors = {};

async function consume_messages() {
    try {
        const connection = global.rabbit_mq_connection;
        const channel = await connection.createChannel();
        await channel.assertExchange(process.env.RABBIT_EXCHANGE, process.env.RABBIT_TYPE_EXCHANGE);
        const q = await channel.assertQueue(process.env.RABBIT_QUEUE, { durable: true });
        await channel.bindQueue(process.env.RABBIT_QUEUE, process.env.RABBIT_ROUTING_KEY, "");

        console.log(`Waiting for messages in ${process.env.RABBIT_QUEUE}`);
        
        channel.consume(q?.queue, async (msg) => {
            console.log("\n\n================= NEW MESSAGE CONSUMING ====================");
            console.log("type: ", msg?.properties?.type, "\n");

            const handle_processor = processors[msg?.properties?.type];
            if (handle_processor) {
                try {
                    const data = JSON.parse(msg?.content?.toString());
                    console.log("Data", data);
                    // handeling processor here...
                    await handle_processor(data);
                    channel.ack(msg);
                } catch (error) {
                    console.log(error);
                    channel.nack(msg, false, false);
                }
            } else {
                console.log("Messages ignore");
                channel.nack(msg, false, false);
            }
        });
    } catch (err) {
        console.log("Error in consume messages: ", err);
    }
}

module.exports = {
    consume_messages
};

