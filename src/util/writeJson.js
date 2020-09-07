const fs = require('fs');
const loadJson = require('./loadJson');
const locate = require('./locate');

module.exports = function (path, data, append = false) {
    const _path = locate(path);
    return fs.writeFileSync(
        _path,
        JSON.stringify(
            append ? {
                ...loadJson(_path),
                ...data
            } :
            data,
            null,
            4
        )
    );
}