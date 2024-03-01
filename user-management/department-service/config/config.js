require("dotenv").config();

module.exports = {
    "local": {
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
    },
    "test": {
        "username": process.env.POSTGRES_USER,
        "password": process.env.POSTGRES_PASSWORD,
        "database": "db-test",
        "host": process.env.DATABASE_HOST,
        "dialect": "postgres",
        "seederStorage": "sequelize",
        "logging": false,
        "define": {
            "underscored": true,
        },
    },
    "development": {
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
    },
    "production": {
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
