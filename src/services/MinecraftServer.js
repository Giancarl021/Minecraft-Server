const locate = require('../util/locate');
const { server } = require('../../data/options.json');
const cp = require('child_process');
const path = require('path');

module.exports = class MinecraftServer {
    constructor() {
        this._path = locate(server.location);
        this._jar = null;
        this._queue = [];
        this._callback = () => {};
    }

    start() {
        if(this._jar) return;
        this._jar = cp.spawn('java', ['-jar', `-Xmx${server.ramSize}`, `-Xms${server.ramSize}`, this._path, 'nogui'], {
            cwd: path.basename(path.dirname(this._path)),
        });

        this._jar.stdout.on('data', this._callback);

        this._execQueue();
    }

    status() {
        return this._jar ? 'Running' : 'Stopped';
    }

    async stop() {
        if(!this._jar) return;
        this.exec('stop');
        await new Promise((resolve, reject) => {
            try {
                this._jar.on('exit', () => {
                    this._jar.stdin.end();
                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        });
        this._jar = null;
    }

    exec(command) {
        if(!this._jar) {
            this._queue.push(command);
            return;
        }
        this._jar.stdin.write(command + '\n');
    }

    onMessage(callback) {
        this._callback = callback;
    }

    async _execQueue() {
        for (const item of this._queue) {
            await this.exec(item);
        }
    }
}