const locate = require('../util/locate');

module.exports = async function (request, response) {
    const { version, preserveMap, preserveFiles } = request.body;

    if(!version) {
        return response.status(400).json({ 
            error: 'Missing version parameter'
        });
    }

    const { uri } = await vm.get(version);

    if(!uri) {
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

    await dl.download(uri, temp, version);

    ms.enable();
}