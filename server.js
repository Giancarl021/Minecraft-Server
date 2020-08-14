const buildEnv = require('./src/services/environment');
buildEnv();

const MinecraftServer = require('./src/services/MinecraftServer');
const ms = new MinecraftServer();
global._ms = ms;

const socket = require('socket.io');
const http = require('http');
const app = require('./src/app');
const socketRoutes = require('./src/services/socket');

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socket(server);

socketRoutes(io, ms);

server.listen(port, () => console.log('Listening on port ' + port));