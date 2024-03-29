const redis = require("ioredis");

const redis_config = {
  "host": process.env.REDIS_HOST,
  "port": process.env.REDIS_PORT,
  "password": process.env.REDIS_PASSWORD,
};

function connect_redis_client() {
  let redis_client = new redis(redis_config);

  redis_client.on("error", (err) => {
    console.log("Redis error: ", err);
    process.exit(1);
  });

  redis_client.on("connect", () => {
    console.log("Redis is connected");
  });

  global.redis_client = redis_client;
  return redis_client;
}

module.exports = {
  connect_redis_client,
};
