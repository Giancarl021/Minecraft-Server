let output,
    socket,
    status,
    applyAndRestartBtn,
    terminal;

async function init() {
    output = document.querySelector('.terminal-output');
    status = document.querySelector('#status');
    terminal = document.querySelector('.terminal');
    applyAndRestartBtn = document.querySelector('#apply-restart');

    document.querySelector('#user').innerText = USER;

    socket = await getSocket();

    socket.on('out', receive);
    socket.on('command', commandReceived);
    socket.on('status', changeStatus);

    changeStatus((await call('status')).status);
    loadProps();
}

async function loadProps() {
    const container = document.getElementById('props');
    const { props } = await call('props');

    if(!Object.keys(props).length) {
        container.innerHTML = `
        <h1 class="subtitle has-text-centered">
            Properties file could not be loaded. To generate a new one, start the server and reload this page.
        </h1>
        `;
        return;
    }

    const elements = [];

    for (const key in props) {
        const value = props[key];
        const type = typeof value;
        if(type === 'string') {
            elements.push({
                type: 0,
                element: `
                <div class="field" data-prop="${key.replace(/\s/g, '-').toLowerCase()}">
                    <label class="label">${key}</label>
                    <div class="control">
                        <input class="input" type="text" value="${value}">
                    </div>
                </div>
                `
            })
            ;
        } else if(type === 'number') {
            elements.push({
                type: 1,
                element: `
                <div class="field" data-prop="${key.replace(/\s/g, '-').toLowerCase()}">
                    <label class="label">${key}</label>
                    <div class="control">
                        <input class="input" type="number" value="${value}">
                    </div>
                </div>
                `
            });
        } else if (type === 'boolean') {
            elements.push({
                type: 2,
                element: `
                <div class="field" data-prop="${key.replace(/\s/g, '-').toLowerCase()}">
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" ${value ? 'checked' : ''}>
                            ${key}
                        </label>
                    </div>
                <div>
                `
            });
        }
    }

    const str = elements
        .sort((a, b) => a.type - b.type)
        .map(e => e.element)
        .join('');

    container.innerHTML = str;
}

async function send(command) {
    socket.emit('in', command);
}

function changeStatus(message) {
    status.innerText = message;
    if(message === 'Stopped' || message === 'Stopping...') {
        terminal.style.pointerEvents = 'none';
        terminal.style.opacity = '.6';
        applyAndRestartBtn.style.display = 'none';
    } else {
        terminal.style.pointerEvents = 'all';
        terminal.style.opacity = '1';
        applyAndRestartBtn.style.display = 'initial';
    }
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

function sanitize(html) {
    const p = document.createElement('p');
    p.innerText = DOMPurify.sanitize(html);
    return p.innerHTML;
}

document.addEventListener('DOMContentLoaded', init);