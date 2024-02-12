const { Sequelize } = require("sequelize");
const event_emitter = require("events");
const db_event_emitter = new event_emitter();

const { sequelize_config } = require("./config.js");
const sequelize = new Sequelize(sequelize_config);

const check_connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        db_event_emitter.emit("connection");
        return true;
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
check_connection();

module.exports = {
    sequelize,
    check_connection,
    db_event_emitter,
};
