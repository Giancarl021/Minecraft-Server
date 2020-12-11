const dotenv = require('dotenv');
const fs = require('fs');
const locate = require('../util/locate');
const files = require('./files');

module.exports = function () {
    dotenv.config();
    if (String(process.env.EULA).toLowerCase() !== 'true') {
        console.log('EULA Environment variable is not set to TRUE\nAborting...');
        process.exit(-1);
    }

    const dirs = ['bin', 'data', 'temp'];

    dirs.forEach(dir => {
        const path = locate(dir);
        if(!fs.existsSync(path)) fs.mkdirSync(path);
    });

    for (const file in files) {
        const isJson = file.endsWith('.json');
        const path = locate(file);
        const content = files[file];
        const _content = isJson ? _parseFunctions(content) : content;

        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, isJson ? JSON.stringify(_content, null, 4) : _content);
            continue;
        }

        const fileContent = isJson ? JSON.parse(fs.readFileSync(path, 'utf8')) : fs.readFileSync(path, 'utf8');

        isJson && fillObject(fileContent, _content);

        fs.writeFileSync(path, isJson ? JSON.stringify(fileContent, null, 4): fileContent);
    }
}

function _parseFunctions(object) {
    let r;
    if (Array.isArray(object)) {
        r = [];
        object.forEach(item => {
            if (typeof item === 'object') {
                r.push(_parseFunctions(item));
            } else if (typeof item === 'function') {
                r.push(item());
            } else {
                r.push(item);
            }
        });
    } else {
        r = {};
        for (const key in object) {
            const item = object[key];
            if (typeof item === 'object') {
                r[key] = _parseFunctions(item);
            } else if (typeof item === 'function') {
                r[key] = item();
            } else {
                r[key] = item;
            }
        }
    }

    return r;
}

function fillObject(object, filler) {
    for (const key in filler) {
        if (typeof filler[key] === 'object') {
            fillObject(object[key], filler[key]);
        } else if (!object.hasOwnProperty(key)) {
            object[key] = filler[key];
        }
    }
}