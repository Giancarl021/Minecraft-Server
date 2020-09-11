const fs = require('fs');
const locate = require('./locate');
const loadJson = require('./loadJson');
const writeJson = require('./writeJson');

module.exports = function (path, timeToLive = 3600) {
    const _path = locate(path);

    function has() {
        if(!fs.existsSync(_path)) {
            return false;
        }
        const now = new Date(Date.now());
        const cache = loadJson(_path);

        if(now >= cache.expiresIn) {
            fs.unlinkSync(_path);
            return false;
        }

        return true;
    }   

    function get() {
        if(!has()) throw new Error('Cache does not exists');

        return loadJson(_path).data;
    }

    function set(data) {
        writeJson(_path, {
            data,
            expiresIn: new Date(Date.now() + (timeToLive * 1000))
        });
    }

    return {
        has,
        set,
        get
    }
}