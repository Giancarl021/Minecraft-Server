const axios = require('axios').default;
const createCache = require('../util/cache');
const BASE_URL = 'https://launchermeta.mojang.com/mc/game/version_manifest.json';

const cache = createCache('temp/version_cache.json');

async function get(uri) {
    return (await axios.get(uri)).data;
}

async function _getVersions() {
    if (cache.has()) return cache.get();
    const { versions: data } = await get(BASE_URL);
    data.length = 15;
    const versions = (await Promise.all(
        data
        .map(async version => {
            const { id, url } = version;
            const { downloads } = await get(url);

            const uri = downloads ? (downloads.server ? (downloads.server.url ? downloads.server.url : false) : false) : false;

            return { id, uri };
        })
    )).filter(version => version.uri);

    const dict = {};

    for (const version of versions) {
        dict[version.id] = version.uri;
    }

    // cache.set(dict);
    return dict;
}

module.exports = {
    async getVersions() {
        const versions = await _getVersions();
        return Object.keys(versions);
    },

    async getVersion(versionId) {
        const versions = await _getVersions();
        return versions[versionId];
    }
}