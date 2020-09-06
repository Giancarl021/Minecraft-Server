const fs = require('fs');
const locate = require('./locate');

module.exports = function (path) {
    return JSON.parse(
        fs.readFileSync(
            locate(path),
            'utf8'
        )
    );
}