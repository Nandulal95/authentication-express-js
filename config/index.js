module.exports = {
    port:process.env.PORT,
    db: {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        user:'postgres',
        database: 'auction_bazaar',
        password:"",
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000
        }
    }
}