const auth = require('../../data/auth.json');
const { uid } = require('rand-token');
const jwt = require('jsonwebtoken');

module.exports = function (params = {}) {
    return {
        bearerToken: jwt.sign(params, auth.secret, {
            expiresIn: auth.expiresIn
        }),
        expiresIn: auth.expiresIn,
        refreshToken: uid(256)
    }
}