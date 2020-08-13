module.exports = function(socket, server) {
    const command = server.exec.bind(server);
    socket.on('connection', socket => {
        server.onMessage(message => socket.emit('out', message.toString()));
        socket.on('in', command);
    });
}