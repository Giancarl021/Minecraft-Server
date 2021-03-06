const buildEnv = require('./src/services/environment');
buildEnv().then(() => {
    const bindGlobals = require('./src/services/global');
    bindGlobals();

    const socket = require('socket.io');
    const http = require('http');
    const app = require('./src/app');
    const socketRoutes = require('./src/services/socket');

    const port = process.env.PORT || 80;

    const server = http.createServer(app);
    const io = socket(server);

    socketRoutes(io, ms);
    vm.fetch();

    server.listen(port, () => console.log('Listening on port ' + port));
});