module.exports = function(socket) {
    socket.on('connection', () => console.log('Connection detected'));
}