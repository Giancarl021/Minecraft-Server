const loadJson = require('../util/loadJson');
const writeJson = require('../util/writeJson');

module.exports = {
    async Get(_, response) {
        const { ramSize } = loadJson('data/server.json');
    
        const size = Number(ramSize.replace(/\D/g, ''));
        const format = ramSize.replace(/\d/g, '');
    
        return response.json({
            size,
            format
        });
    },

    async Post(request, response) {
        const { size, format: _format } = request.body;
        const format = _format.toUpperCase();

        if(!['M', 'G'].includes(format)) {
            return response.status(400).json({
                error: 'Invalid format'
            });
        }

        if(!size || !Number(size)) {
            return response.status(400).json({
                error: 'Invalid size'
            });
        }

        const ramSize = Number(size) + format;

        writeJson('data/server.json', { ramSize }, true);

        return response.json({
            status: 'Allocated RAM used by server successfully changed'
        })
    }
}