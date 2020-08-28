const PORT = 3000;
const socket = io(`http://localhost:${PORT}/`);
let output;

async function init() {
    output = document.querySelector('.terminal-output');

    socket.on('out', receive);
    socket.on('connect', () => console.log('Connected to API'));
}

async function send(command) {
    socket.emit('in', command);
}

function receive(message, isInput = false) {
    output.insertAdjacentHTML('beforeend', `
    <span class="${isInput ? 'terminal-input-line' : 'terminal-output-line'}">
        ${message}
    </span>
    `);

    output.scrollTop = output.scrollHeight;
}

function sendCommand(element, { key }) {
    if(key !== 'Enter') return;
    const { value } = element;
    send(value);
    receive(time() + ' ' + value, true);
    element.value = '';

    function time() {
        const d = new Date(Date.now());
        const t = [
            d.getHours(),
            d.getMinutes(),
            d.getSeconds()
        ].map(formatNumber);

        return `[${t.join(':')}]`;

        function formatNumber(n) {
            return n < 10 ? '0' + n : n;
        }
    }
}

document.addEventListener('DOMContentLoaded', init);