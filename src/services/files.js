const { randomBytes } = require('crypto');

module.exports = {
    'data/server.json': {
        location: 'bin/server.jar',
        ramSize: '2G',
        version: ''
    },
    'data/auth.json': {
        expiresIn: 3600,
        secret() {
            return randomBytes(Math.floor((Math.random() * 24) + 16)).toString('hex');
        }
    }
};