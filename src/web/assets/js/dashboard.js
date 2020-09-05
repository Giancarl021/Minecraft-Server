let output, socket;

async function init() {
    output = document.querySelector('.terminal-output');
    const token = await getToken();

    document.querySelector('#user').innerText = USER;

    socket = io(URI);

    socket.on('out', receive);
    socket.on('command', commandReceived);
    
    socket.on('authenticated', () => console.log('Connection established with server socket'))
    socket.on('unauthorized', clearAuthentication);

    socket.on('connect', () => {
        socket.emit('authentication', { token });
    });
}

async function send(command) {
    socket.emit('in', command);
}

function commandReceived(message) {
    const [time, user, command] = JSON.parse(message);
    output.insertAdjacentHTML('beforeend', `
    <span class="terminal-input-line ${user === USER ? 'terminal-own-command' : ''}">
        ${time} (${user === USER ? 'You' : user}) ${sanitize(command)}
    </span>
    `);

    output.scrollTop = output.scrollHeight;
}

function receive(message) {
    output.insertAdjacentHTML('beforeend', `
    <span class="terminal-output-line">
        ${message}
    </span>
    `);

    output.scrollTop = output.scrollHeight;
}

function sendCommand(element, { key }) {
    if(key !== 'Enter') return;
    const { value } = element;
    send(value);
    element.value = '';
}

async function call(endpoint) {
    await get('/' + endpoint, null, await getToken());
}

function sanitize(html) {
    const p = document.createElement('p');
    p.innerText = DOMPurify.sanitize(html);
    return p.innerHTML;
}

document.addEventListener('DOMContentLoaded', init);