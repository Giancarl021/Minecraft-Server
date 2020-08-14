const { auth } = require('../../data/options.json');
const jwt = require('jsonwebtoken');

module.exports = function (params = {}) {
    return jwt.sign(params, auth.secret, {
        expiresIn: auth.expiresIn
    });
}