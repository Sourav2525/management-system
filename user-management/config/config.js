require("dotenv").config();


module.exports = function ({ env }) {
    if (env == "production") {
        return {
            redis_config: {
                "host": process.env.REDIS_HOST,
                "port": process.env.REDIS_PORT,
                "password": process.env.REDIS_PASSWORD,
            },
            sequelize_config: {
                "username": process.env.POSTGRES_USER,
                "password": process.env.POSTGRES_PASSWORD,
                "database": process.env.POSTGRES_DB,
                "host": process.env.DATABASE_HOST,
                "dialect": "postgres",
                "seederStorage": "sequelize",
                "logging": false,
                "define": {
                    "underscored": true,
                },
            }
        };
    } else if (env == "development") {
        return {
            redis_config: {
                "host": process.env.REDIS_HOST,
                "port": process.env.REDIS_PORT,
                "password": process.env.REDIS_PASSWORD,
            },
            sequelize_config: {
                "username": process.env.POSTGRES_USER,
                "password": process.env.POSTGRES_PASSWORD,
                "database": process.env.POSTGRES_DB,
                "host": process.env.DATABASE_HOST,
                "dialect": "postgres",
                "seederStorage": "sequelize",
                "logging": false,
                "define": {
                    "underscored": true,
                },
            }
        };
    } else {
        return {
            redis_config: {
                "host": process.env.REDIS_HOST,
                "port": process.env.REDIS_PORT,
                "password": process.env.REDIS_PASSWORD,
            },
            sequelize_config: {
                "username": process.env.POSTGRES_USER,
                "password": process.env.POSTGRES_PASSWORD,
                "database": process.env.POSTGRES_DB,
                "host": process.env.DATABASE_HOST,
                "dialect": "postgres",
                "seederStorage": "sequelize",
                "logging": false,
                "define": {
                    "underscored": true,
                },
            }
        };
    }
}({ env: process.env.ENV });