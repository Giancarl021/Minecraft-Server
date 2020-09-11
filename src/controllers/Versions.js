const mcversions = require('../services/minecraft-versions');

module.exports = async function (_, response) {
    const versions = await mcversions.getVersions();

    return response.json({
        versions
    });
}