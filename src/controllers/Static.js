const path = require('path');

module.exports = function (file) {
    return (_, res) => res.sendFile(path.resolve(__dirname, '..', 'web', 'pages', file));
}