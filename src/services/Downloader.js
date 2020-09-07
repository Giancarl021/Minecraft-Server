const locate = require('../util/locate');
const writeJson = require('../util/writeJson');
const https = require('https');
const fs = require('fs');

module.exports = function () {

    let _downloading = false;
    const callbacks = {};

    function register(event, callback) {
        callbacks[event] = callback;
    }

    async function download(uri, destination, version) {
        const path = locate(destination);

        if(_downloading) return;

        const file = fs.createWriteStream(path);
        await new Promise((resolve, reject) => {
            _downloading = true;

            if(callbacks.start) callbacks.start({ uri, destination });
            https.get(uri, response => {
                response.pipe(file);
                file.on('finish', () => {
                    _downloading = false;
                    
                    file.close();
                    if(callbacks.downloaded) callbacks.downloaded({ uri, destination });
                    resolve();
                });
            })
            .on('error', err => {
                _downloading = false;
                fs.unlink(dest);
                if(callbacks.error) {
                    callbacks.error({ uri, destination, error: err });
                    resolve();
                } else {
                    return reject(err);
                }
            });
        });

        if(callbacks.configuring) callbacks.configuring();

        fs.renameSync(path, locate('bin/server.jar'));
        writeJson('data/server.json', { version }, true);

        if(callbacks.configured) callbacks.configured();
    }

    function isDownloading() {
        return _downloading;
    }

    return {
        register,
        download,
        isDownloading
    }
}