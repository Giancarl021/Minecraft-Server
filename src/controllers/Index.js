const Static = require('./Static');

module.exports = async function (request, response) {
    if(ms.status() === 'Disabled') {
        return response.redirect('/startup');
    } else {
        return Static('dashboard.html')(request, response);
    }
}