const locate = require('../util/locate');
const { server } = require('../../data/options.json');
const cp = require('child_process');
const path = require('path');

module.exports = class MinecraftServer {
    constructor() {
        this._path = locate(server.location);
    }

    start() {
        this._jar = cp.spawn('java', ['-jar', `-Xmx${server.ramSize}`, `-Xms${server.ramSize}`, this._path, 'nogui'], {
            cwd: path.basename(path.dirname(this._path)),
        });
    }

    async stop() {
        this.exec('stop');
        this._jar.stdin.end();
        await new Promise((resolve, reject) => {
            try {
                this._jar.on('exit', resolve);
            } catch(err) {
                reject(err);
            }
        });
    }

    exec(command) {
        this._jar.stdin.write(command + '\n');
    }

    onMessage(callback) {
        this._jar.stdout.on('data', callback);
    }
}