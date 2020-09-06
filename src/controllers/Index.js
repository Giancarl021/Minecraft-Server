const Static = require('./Static');

module.exports = async function (request, response) {
    if(ms.status() === 'Disabled') {
        return response.redirect('/startup');
    } else {
        return Static('index.html')(request, response);
    }
}