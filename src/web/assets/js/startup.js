let status, select, button;

async function init() {
    select = document.querySelector('#version > select');
    button = document.querySelector('#download-btn');
    status = document.getElementById('status');
    const socket = await getSocket();

    document.querySelector('#user').innerText = USER;

    socket.on('download-status', changeStatus)
    const { versions } = await call('versions', await getToken());
    setVersions(versions);
}

function changeStatus(message) {
    isLoading();
    status.innerText = message;
}

function setVersions(versions) {
    let str = '';
    for (const version of versions) {
        str += `<option>${version}</option>`;
    }

    const parent = select.parentElement;

    select.insertAdjacentHTML('beforeend', str);
    select.removeAttribute('disabled');
    parent.classList.remove('is-loading');
}

function selectVersion(version) {
    if(!version || version === 'null') return;

    button.style.display = 'initial';
}

async function download() {
    isLoading();
    await get('/download', { 
        method: 'POST',
        body: {
            version: select.value
        }
    }, await getToken());
}

function isLoading() {
    button.classList.add('is-loading');
    select.setAttribute('disabled', true);
    button.setAttribute('disabled', true);
}

document.addEventListener('DOMContentLoaded', init);