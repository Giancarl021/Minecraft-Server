module.exports = async function (request, response, next) {
    const { refresh_token: key } = request.body;

    if(!key) {
        return response.status(401).json({
            error: 'No refresh token provided'
        });
    }

    const user = refreshTokens[key];

    if(!user) {
        return response.status(401).json({
            error: 'Invalid refresh token'
        });
    }

    request.body.username = user.username;
    request.body.password = user.password;

    delete refreshTokens[key];

    next();
}