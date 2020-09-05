const path = require('path');

module.exports = async function (_, response) {
    return response.json({
        props: ms.properties()
    });
}