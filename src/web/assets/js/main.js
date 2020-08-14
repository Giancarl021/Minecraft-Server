const PORT = 3000;
const socket = io(`http://localhost:${PORT}/`);
const term = new Terminal({ cursorBlink: true });

async function init() {
    await term.open(document.getElementById('terminal'));

    term.on('data', message => {
        socket.emit('in', message);
    });

    socket.on('out', term.write);
}

document.addEventListener('DOMContentLoaded', init);