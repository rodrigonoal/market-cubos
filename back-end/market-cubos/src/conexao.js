const knex = require('knex')({
    client: 'pg',
    connection: {
        user: process.env.KNEX_USER,
        host: process.env.KNEX_HOST,
        database: process.env.KNEX_DATABASE,
        password: process.env.KNEX_PASSWORD,
        port: process.env.KNEX_PORT
    }
});


module.exports = knex;