const Static = require('./Static');

module.exports = async function (request, response) {
    if(ms.status() !== 'Disabled') {
        return response.redirect('/');
    } else {
        return Static('startup.html')(request, response);
    }
}