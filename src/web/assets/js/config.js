let status, select, button, currentVersion, close;

async function init() {
    select = document.querySelector('#version > select');
    button = document.querySelector('#download-btn');
    status = document.getElementById('status');
    close = document.getElementById('close');

    document.querySelector('#user').innerText = USER;

    const token = await getToken();

    const { version } = await call('version', token);
    currentVersion = version;
    const { versions } = await call('versions', token);
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
            version: select.value
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