const path = require('path');

module.exports = function(pathToFile) {
    if(path.isAbsolute(pathToFile)) return pathToFile;
    return path.resolve(__dirname, '..', '..', pathToFile);
};