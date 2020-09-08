const loadJson = require('../util/loadJson');

module.exports = async function (_, response) {
    const { version } = loadJson('data/server.json');
    
    return response.json({
        version
    });
}