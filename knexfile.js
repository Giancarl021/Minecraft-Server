const path = require('path');
const fs = require('fs');

const pathToDb = path.resolve(__dirname, 'data', 'db');

if (!fs.existsSync(pathToDb)) fs.mkdirSync(pathToDb, { recursive: true });

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.join(pathToDb, 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },

    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },

    useNullAsDefault: true
};