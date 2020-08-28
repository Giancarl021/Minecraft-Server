module.exports = function(socket, server) {
    const command = server.exec.bind(server);
    const all = socket.sockets;
    socket.on('connection', socket => {
        server.onMessage(message => all.emit('out', message.toString()));
        socket.on('in', command);
    });
}