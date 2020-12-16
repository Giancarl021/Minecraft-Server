const path = require('path');
const fs = require('fs');

const pathToDb = path.resolve(__dirname, 'data', 'db');

let client = 'sqlite3';
let connection = {
    filename: path.join(pathToDb, 'database.sqlite')
};

if (String(process.env.USE_AZURE_SQL).toLowerCase() === 'true') {
    client = 'mssql';
    connection = {
        server : `${process.env.SQL_SERVER}.database.windows.net`,
        user : process.env.SQL_USERNAME,
        password : process.env.SQL_PASSWORD,
        database : process.env.SQL_DATABASE,
        options: {
            port: 1433,
            encrypt: true
        }
      };
}
else if (!fs.existsSync(pathToDb)) fs.mkdirSync(pathToDb, { recursive: true });

module.exports = {
    client,
    connection,
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },

    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },

    useNullAsDefault: true
};