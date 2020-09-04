require('./src/services/global');
const buildEnv = require('./src/services/environment');

buildEnv();

const socket = require('socket.io');
const http = require('http');
const app = require('./src/app');
const socketRoutes = require('./src/services/socket');

const port = 80;

const server = http.createServer(app);
const io = socket(server);

socketRoutes(io, ms);

server.listen(port, () => console.log('Listening on port ' + port));