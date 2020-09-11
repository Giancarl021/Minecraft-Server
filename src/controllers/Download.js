const locate = require('../util/locate');

const getVersion = () => {};

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
        ms.deleteData();
    }

    if(!preserveMap) {
        ms.deleteMap();
    }

    response.json({
        status: 'Download started'
    });

    const temp = locate('temp/server.jar');

    await dl.download(data.url.server, temp, version);

    ms.enable();
}