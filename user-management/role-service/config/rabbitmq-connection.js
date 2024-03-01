const amqp = require("amqplib");
let timeout, connection;
const { consume_messages } = require("../workers/consumer");

async function connect_rabbit_mq() {
  try {
    const config_params = { credentials: amqp.credentials.plain(process.env.RABBIT_USERNAME, process.env.RABBIT_PASSWORD), heartbeat: 30 };
    const connection_string = `${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}/${process.env.RABBIT_VHOST}`;
    connection = await amqp.connect(connection_string, config_params);

    // eslint-disable-next-line snakecasejs/snakecasejs
    connection.addListener("close", () => {
      console.log("Disconnected from RabbitMQ");
      if (timeout) clearTimeout(timeout);
      reconnect();
    });

    // eslint-disable-next-line snakecasejs/snakecasejs
    connection.addListener("error", (e) => {
      console.log("Error in RabbitMQ connection", e);
      if (timeout) clearTimeout(timeout);
      reconnect();
    });
    
    console.log("RabbitMQ is connected.");
    if (timeout) clearTimeout(timeout);

    global.rabbit_mq_connection = connection;
    consume_messages();
    return connection;
  } catch (error) {
    console.error("Error establishing connection to RabbitMQ:", error.message);
    if (timeout) clearTimeout(timeout);
    reconnect();
  }
}

function reconnect() {
  timeout = setTimeout(async () => {
    console.log("Reconnecting to RabbitMQ...");
    const rabbit_mq_connection = await connect_rabbit_mq();
    global.rabbit_mq_connection = rabbit_mq_connection;
  }, 5000); // Wait for 5 seconds before attempting to reconnect
}

module.exports = {
  connect_rabbit_mq,
  reconnect,
};
