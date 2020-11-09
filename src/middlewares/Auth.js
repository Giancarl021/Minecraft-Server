const jwt = require('jsonwebtoken');

module.exports = async function (request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({
            error: 'No authorization token provided'
        });
    }

    const parts = authorization.split(' ');

    if (parts.length !== 2) {
        return response.status(401).json({
            error: 'Invalid Authorization header'
        });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return response.status(401).json({
            error: 'Bad formatted token'
        });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, auth.secret);
    } catch (err) {
        return response.status(401).json({
            error: 'Invalid token'
        });
    }

    request.token = decoded;

    return next();
}