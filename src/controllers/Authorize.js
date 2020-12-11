const bcrypt = require('bcrypt');
const generateToken = require('../util/generate-token');
const login = require('../services/login');

module.exports = async function (request, response) {
    const { username, password } = request.body;

    if (!username) {
        return response.status(400).json({
            error: 'Missing username'
        });
    }

    const user = login(username);

    if (!user) {
        return response.status(400).json({
            error: 'An user with this username does not exists'
        });
    }

    const result = bcrypt.compareSync(password, user.password);

    if (!result) {
        return response.status(400).json({
            error: 'Wrong password'
        });
    }

    const { bearerToken, expiresIn, refreshToken } = generateToken({
        username
    });

    refreshTokens[refreshToken] = { username, password };

    return response.status(200).json({
        user: username,
        bearer_token: bearerToken,
        expires_in: expiresIn,
        refresh_token: refreshToken
    });
}