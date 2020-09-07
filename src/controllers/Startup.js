const Static = require('./Static');

module.exports = async function (request, response) {
    if(ms.status() !== 'Disabled') {
        return response.redirect('/');
    } else if (dl.isDownloading()){
        return Static('wait.html')(request, response);
    } else {
        return Static('startup.html')(request, response);
    }
}