const locate = require('../util/locate');
const directory = require('../util/directory-children');
const fs = require('fs');

module.exports = {
    async Get(_, response) {
        const level = ms.properties()['level-name'];

        const regex = new RegExp(`.*?${level}`);

        const path = locate('bin/' + level);

        if (!level || !fs.existsSync(path)) {
            return response.status(400).json({
                error: 'The map is not available'
            });
        }

        const children = directory(path)
            .map(file => ({
                path: file,
                name: file.replace(regex, '')
            }));

        response.zip(children, 'map.zip');
    },

    async Post(request, response) {
        
    }
}