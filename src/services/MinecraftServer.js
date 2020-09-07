const locate = require('../util/locate');
const loadJSON = require('../util/loadJson');
const cp = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = class MinecraftServer {
    constructor() {
        this._server = loadJSON('data/server.json');
        this._path = locate(this._server.location);
        this._jar = null;
        this._disabled = !fs.existsSync(this._path);
        this._messageCallback = () => {};
        this._statusCallback = () => {};
    }

    start() {
        if (this._jar || this.status() === 'Disabled') return;
        this._statusCallback('Starting...');
        this._jar = cp.spawn('java', ['-jar', `-Xmx${this._server.ramSize}`, `-Xms${this._server.ramSize}`, this._path, 'nogui'], {
            cwd: path.basename(path.dirname(this._path)),
        });

        this._jar.stdout.on('data', this._messageCallback);
        this._statusCallback('Running');
    }

    status() {
        return this._disabled ? 'Disabled' :
            (
                fs.existsSync(this._path) ?
                (this._jar ? 'Running' : 'Stopped') :
                'Disabled'
            );
    }

    async disable() {
        if (this.status() === 'Running') await this.stop();
        this._disabled = true;
    }

    enable() {
        this._disabled = false;
    }

    async stop() {
        if (!this._jar) return;
        this._statusCallback('Stopping...');
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
        this._server = loadJSON('data/server.json');
        this._statusCallback('Stopped');
    }

    exec(command) {
        const status = this.status();
        if (status === 'Disabled' || status === 'Stopped') return;

        this._jar.stdin.write(command + '\n');
    }

    onMessage(callback) {
        this._messageCallback = callback;
    }

    properties() {
        const path = locate('bin/server.properties');
        if (this.status() === 'Disabled' || !fs.existsSync(path)) return {};
        const properties = fs.readFileSync(path, 'utf8');

        const arr = properties
            .split(/\r?\n/g)
            .map(e => e.trim())
            .filter(e => e && !e.startsWith('#'))
            .map(e => e.split('='));

        const props = {};

        for (const [key, value] of arr) {
            const val = value === '' ? '' :
                (
                    isNaN(Number(value)) ?
                    (value === 'true' || value === 'false' ?
                        (value === 'false' ? false : true) :
                        value) :
                    Number(value)
                );

            props[key] = val;
        }

        return props;
    }

    setProperties(props) {
        const path = locate('bin/server.properties');
        const r = [];
        for (const key in props) {
            r.push(`${key}=${props[key].toString()}`);
        }

        fs.writeFileSync(path, r.join('\n'));
    }

    onStatusUpdate(callback) {
        this._statusCallback = callback;
    }

    deleteMap() {
        fs.rmdirSync(locate('bin/world'), {
            recursive: true
        });
    }

    changeMap(zipFile) {
        this.deleteMap();
        // Code
    }

    deleteData() {
        const bin = locate('bin');
        const bind = path => bin + '/' + path;
        fs.rmdirSync(bind('logs'), {
            recursive: true
        });
        fs.readdirSync(bin)
            .filter(f => fs.lstatSync(bind(f)).isFile() && !['server.jar', 'eula.txt'].includes(f))
            .forEach(f => fs.unlinkSync(bind(f)));
    }
}