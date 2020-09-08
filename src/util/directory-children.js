const fs = require('fs');

module.exports = function (path) {
    function _readFiles(path) {
        const r = [];
        const items = fs.readdirSync(path);
        for (const item of items) {
            if (fs.lstatSync(`${path}/${item}`).isDirectory()) {
                r.push(..._readFiles(`${path}/${item}`));
            } else {
                r.push(`${path}/${item}`);
            }
        }
        return r;
    }

    return _readFiles(path);
}