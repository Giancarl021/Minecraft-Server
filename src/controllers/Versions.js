const { promisify } = require('util');
const mcversions = require('mcversions');
const getVersions = promisify(mcversions.getAllVersions).bind(mcversions);

module.exports = async function (_, response) {
    const versions = (await getVersions())
        .filter(version => version.url && version.url.server)
        .map(version => version.id);

    return response.json({
        versions
    });
}