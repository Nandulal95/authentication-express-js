const config = require('../config');
const Sequelize = require('sequelize');

module.exports = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    pool: {
        min: config.db.pool.min,
        max: config.db.pool.max,
        acquire: config.db.pool.acquire,
        idle: config.db.pool.idle
    }
});
