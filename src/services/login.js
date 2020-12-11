const bcrypt = require('bcrypt');
const USERNAME = process.env.ADMIN_USERNAME || 'admin';
const PASSWORD =  bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'changeme', Math.floor(Math.random() * 8))

module.exports = function (username) {
    if (USERNAME === username) return {
        username,
        password: PASSWORD
    };
    else return null;
}