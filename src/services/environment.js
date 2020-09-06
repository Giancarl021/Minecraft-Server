const fs = require('fs');
const locate = require('../util/locate');
const files = require('./files');

module.exports = function () {
    const dirs = ['bin', 'data', 'temp'];

    dirs.forEach(dir => {
        const path = locate(dir);
        if(!fs.existsSync(path)) fs.mkdirSync(path);
    });

    for (const file in files) {
        const path = locate(file);
        const content = files[file];
        const _content = _parseFunctions(content);

        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify(_content, null, 4));
            return;
        }

        const fileContent = JSON.parse(fs.readFileSync(path, 'utf8'));
        fillObject(fileContent, _content);

        fs.writeFileSync(path, JSON.stringify(fileContent, null, 4));
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