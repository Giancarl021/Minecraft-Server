const { randomBytes } = require('crypto');

module.exports = {
    'data/server.json': {
        location: 'data/bin/server.jar',
        ramSize: '512M',
        version: ''
    },
    'data/auth.json': {
        expiresIn: 3600,
        secret() {
            return randomBytes(Math.floor((Math.random() * 24) + 16)).toString('hex');
        }
    },
    'data/bin/eula.txt': 'eula=true'
};