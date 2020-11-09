const jwt = require('jsonwebtoken');
const time = require('../util/time');
const socketAuth = require('socketio-auth');

module.exports = function (socket, server) {
    const users = {};
    const all = socket.sockets;

    socketAuth(socket, {
        authenticate(socket, data, callback) {
            let decoded;
            const { token } = data;
            try {
                decoded = jwt.verify(token, auth.secret);
            } catch (err) {
                return callback(err);
            }

            users[socket.id] = decoded.username;

            return callback(null, decoded.username);
        }
    });

    dl.register('start', () => all.emit('download-status', 'Downloading...'));
    dl.register('downloaded', () => all.emit('download-status', 'Downloaded'));
    dl.register('configuring', () => all.emit('download-status', 'Configuring...'));
    dl.register('configured', () => all.emit('download-status', 'Configured'));
    dl.register('error', ({ error }) => all.emit('download-status', error.message));

    const statusCallback = message => {
        all.emit('status', message);
    };

    server.onStatusUpdate(statusCallback);

    socket.on('connection', socket => {
        server.onMessage(message => all.emit('out', message.toString()));
        socket.on('in', command);

        function command(message) {
            server.exec(message);
            all.emit('command', JSON.stringify([time(), users[socket.id], message]));
        }
    });
}