const Static = require('../controllers/Static');
const loadJson = require('../util/loadJson');

module.exports = async function (request, response, next) {
    const { version } = loadJson('data/server.json');
    if (dl.isDownloading()) {
        return Static('wait.html')(request, response);
    } else if (ms.status() === 'Disabled' && !['/startup', '/login'].some(e => request.path.includes(e))) {
        if(!version) return response.redirect('/startup');
        else return Static('error.html')(request, response);
    } else {
        return next();
    }
}