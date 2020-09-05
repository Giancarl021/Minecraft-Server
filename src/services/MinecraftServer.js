const locate = require('../util/locate');
const { server } = require('../../data/options.json');
const cp = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = class MinecraftServer {
    constructor() {
        this._path = locate(server.location);
        this._jar = null;
        this._queue = [];
        this._messageCallback = () => {};
        this._statusCallback = () => {};
    }

    start() {
        this._statusCallback('Starting...');
        if(this._jar) return;
        this._jar = cp.spawn('java', ['-jar', `-Xmx${server.ramSize}`, `-Xms${server.ramSize}`, this._path, 'nogui'], {
            cwd: path.basename(path.dirname(this._path)),
        });

        this._jar.stdout.on('data', this._messageCallback);

        this._execQueue();
        this._statusCallback('Running');
    }

    status() {
        return this._jar ? 'Running' : 'Stopped';
    }

    async stop() {
        this._statusCallback('Stopping...');
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
        this._statusCallback('Stopped');
    }

    exec(command) {
        if(!this._jar) {
            this._queue.push(command);
            return;
        }
        this._jar.stdin.write(command + '\n');
    }

    onMessage(callback) {
        this._messageCallback = callback;
    }

    properties() {
        const properties = fs.readFileSync(locate('bin/server.properties'), 'utf8');

        const arr = properties
            .split(/\r?\n/g)
            .map(e => e.trim())
            .filter(e => !e.startsWith('#'))
            .map(e => e.split('='));
    
        const props = {};
    
        for (const [key, value] of arr) {
            const val = isNaN(Number(value)) ?
                (value === 'true' || value === 'false' ?
                    (value === 'false' ? false : true) :
                    value) :
                Number(value);
    
            props[key] = val;
        }
    
        return props;
    }

    onStatusUpdate(callback) {
        this._statusCallback = callback;
    }

    async _execQueue() {
        for (const item of this._queue) {
            await this.exec(item);
        }
    }
}