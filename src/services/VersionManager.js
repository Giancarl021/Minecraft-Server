const axios = require('axios').default;
const connection = require('../database/connection');
const createCache = require('../util/cache');
const BASE_URL = 'https://launchermeta.mojang.com/mc/game/version_manifest.json';

module.exports = function () {
    let status = false;
    const cache = createCache('temp/version.lock', 3600);

    async function fetch() {
        status = true;

        const local = await connection('version')
            .select('*');

        const remote = (await _get(BASE_URL))
            .versions
            .map(version => ({
                id: version.id,
                uri: version.url
            }));

        const inserts = remote
            .filter(_difference(local));

        if (!inserts.length) {
            status = false;
            return;
        }

        console.log(`Fetching ${inserts.length} versions into database...`);

        for (const version of inserts) {
            const row = await _fetchVersionUri(version);

            await connection('version')
                .insert([ row ]);
        }

        console.log('Database updated successfully');

        status = false;
        cache.set(true);
    }

    async function get(versionName) {
        needUpdate();
        return (await connection('version')
            .where('id', versionName)
            .select('*'))[0] || null;
    }

    async function list() {
        needUpdate();
        return (
            await connection('version')
                .select('id')
            ).map(version => version.id);
    }

    function isFetching() {
        return status;
    }

    function needUpdate() {
        if (!cache.has()) fetch();
    }

    function _difference(base) {
        const baseIds = base.map(version => version.id);

        return version => !baseIds.includes(version.id);

        function doesNotExists(version) {
            return !baseIds.includes(version.id);
        }

        function hasDifferentUri(version) {
            const baseItem = fromId(version.id);
            if (!baseItem) return true;
            return baseItem.uri !== version.uri;
        }

        function fromId(id) {
            const index = baseIds.indexOf(id);
            return index !== -1 ? base[index] : null;
        }
    }

    async function _fetchVersionUri(version) {
        const { downloads } = await _get(version.uri);
        const uri = downloads ? (downloads.server ? (downloads.server.url ? downloads.server.url : false) : false) : false;

        return {
            id: version.id,
            uri
        }
    }

    async function _get(uri) {
        return (await axios.get(uri)).data;
    }


    return {
        isFetching,
        fetch,
        get,
        list
    }
}