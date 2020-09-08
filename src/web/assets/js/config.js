let status, select, button, currentVersion, close, preserveMap, preserveData, ram;

async function init() {
    select = document.querySelector('#version > select');
    button = document.querySelector('#download-btn');
    status = document.getElementById('status');
    close = document.getElementById('close');
    preserveMap = document.getElementById('preserve-map');
    preserveData = document.getElementById('preserve-data');

    document.querySelector('#user').innerText = USER;

    getRam();
    const { version } = await call('version');
    currentVersion = version;
    const { versions } = await call('versions');
    setVersions(versions);
}

async function configureSocket() {
    const socket = await getSocket();
    socket.on('download-status', changeStatus);
}

function changeStatus(message) {
    if (message === 'Configured') {
        window.location.reload();
    }
    isLoading();
    status.innerText = message;
}

async function getRam() {
    const { size, format } = await call('ram');
    document.getElementById('ram-' + format.toLowerCase()).checked = true;
    document.getElementById('ram').value = size;
}

async function setRam() {
    const format = [ document.getElementById('ram-g'), document.getElementById('ram-m') ]
        .filter(e => e.checked)
        .shift()
        .id
        .replace('ram-', '')
        .toUpperCase();
    const size = Number(document.getElementById('ram').value);

    await get('/ram', {
        method: 'POST',
        body: {
            size,
            format
        }
    }, await getToken());
}

function setVersions(versions) {
    let str = '';
    for (const version of versions) {
        str += `<option ${currentVersion === version ? 'selected' : ''}>${version}</option>`;
    }

    const parent = select.parentElement;

    select.insertAdjacentHTML('beforeend', str);
    select.removeAttribute('disabled');
    parent.classList.remove('is-loading');
}

function selectVersion(version) {
    if (!version || version === currentVersion) button.style.display = 'none';
    else button.style.display = 'initial';
}

async function download() {
    isLoading();
    const res = await get('/download', {
        method: 'POST',
        body: {
            version: select.value,
            preserveFiles: preserveData.checked,
            preserveMap: preserveMap.checked
        }
    }, await getToken());

    if(res.error) {
        fireError('Request Error', res.error);
    }
}

function isLoading() {
    button.classList.add('is-loading');
    close.removeAttribute('style');
    select.setAttribute('disabled', true);
    button.setAttribute('disabled', true);
}

configureSocket();
document.addEventListener('DOMContentLoaded', init);