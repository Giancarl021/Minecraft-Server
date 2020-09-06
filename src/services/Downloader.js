const locate = require('../util/locate');
const https = require('https');
const fs = require('fs');

module.exports = function () {

    const _downloading = [];
    const callbacks = {};

    function register(event, callback) {
        callbacks[event] = callback;
    }

    async function download(uri, destination) {
        const path = locate(destination);

        if(_downloading.includes(path)) return;

        const file = fs.createWriteStream(path);
        await new Promise((resolve, reject) => {
            _downloading.push(path);

            if(callbacks.start) callbacks.start({ uri, destination });
            https.get(uri, response => {
                response.pipe(file);
                file.on('finish', () => {
                    _downloading.splice(_downloading.indexOf(path), 1);
                    
                    file.close();
                    if(callbacks.end) callbacks.end({ uri, destination });
                    resolve();
                });
            })
            .on('error', err => {
                _downloading.splice(_downloading.indexOf(path), 1);

                fs.unlink(dest);
                if(callbacks.error) {
                    callbacks.error({ uri, destination, error: err });
                    resolve();
                } else {
                    return reject(err);
                }
            });
        });
    }

    return {
        register,
        download
    }
}