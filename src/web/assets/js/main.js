const PORT = 3000;
const socket = io(`http://localhost:${PORT}/`);

async function init() {
    await term.open(document.getElementById('terminal'));
    fitAddon.fit();

    socket.on('')

    // term.on('data', message => {
    //     socket.emit('in', message);
    // });

    socket.on('out', term.write);
}

document.addEventListener('DOMContentLoaded', init);