/* eslint-disable snakecasejs/snakecasejs */
const winston = require("winston");
const morgan = require("morgan");

const { combine, timestamp, json } = winston.format;
const logger = winston.createLogger({
    level: "http",
    defaultMeta: {
        service: "user-management-service",
    },
    format: combine(
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        json()
    ),
    transports: [new winston.transports.Console()],
});

const morgan_middleware = morgan(
    function (tokens, req, res) {
        return JSON.stringify({
            url: tokens.url(req, res),
            method: tokens.method(req, res),
            status: Number.parseFloat(tokens.status(req, res)),
            // content_length: tokens.res(req, res, "content-length"),
            response_time: Number.parseFloat(tokens["response-time"](req, res)),
        });
    },
    {
        stream: {
            // Configure Morgan to use our custom logger with the http severity
            write: (message) => {
                const data = JSON.parse(message);
                logger.http("incoming-request", data);
            },
        },
    }
);

module.exports = {
    logger,
    morgan_middleware
};