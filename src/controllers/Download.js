const locate = require('../util/locate');
const fs = require('fs');
const writeJSON = require('../util/writeJson');
const { promisify } = require('util');
const mcversions = require('mcversions');
const getVersion = promisify(mcversions.getVersion).bind(mcversions);

module.exports = async function (request, response) {
    const { version, preserveMap, preserveFiles } = request.body;

    if(!version) {
        return response.status(400).json({ 
            error: 'Missing version parameter'
        });
    }

    const data = await getVersion(version);

    if(!data || !data.url || !data.url.server) {
        return response.status(400).json({
            error: 'Invalid server version'
        });
    }

    await ms.disable();

    if(!preserveFiles) {
        
    }

    if(!preserveMap) {
        
    }

    response.json({
        status: 'Download started'
    });

    const temp = locate('temp/server.jar');

    await dl.download(data.url.server, temp);
    fs.renameSync(temp, locate('bin/server.jar'));
    writeJSON('data/server.json', { version }, true);
    ms.enable();
}