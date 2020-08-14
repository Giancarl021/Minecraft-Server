const { randomBytes } = require('crypto');

module.exports = {
    'data/options.json': {
        server: {
            location: 'bin/server.jar',
            ramSize: '2G'
        },
        auth: {
            expiresIn: 3600,
            secret() {
                return randomBytes(Math.floor((Math.random() * 24) + 16)).toString('hex');
            }
        }
    }
};