const bcrypt = require('bcrypt');

const admin = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'changeme', Math.floor(Math.random() * 8))
}

module.exports = {
    async seed(knex) {
        await knex('user').insert([admin]);
    }
}