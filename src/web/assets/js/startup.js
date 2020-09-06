async function init() {
    const socket = await getSocket();

    document.querySelector('#user').innerText = USER;

    socket.on('download-status', console.log)
    const { versions } = await call('versions', await getToken());
    setVersions(versions);
}

function setVersions(versions) {
    let str = '';
    for (const version of versions) {
        str += `<option>${version}</option>`;
    }

    const parent = document.querySelector('#version');
    const select = parent.querySelector('select');
    select.insertAdjacentHTML('beforeend', str);
    select.removeAttribute('disabled');
    parent.classList.remove('is-loading');
}

function selectVersion(version) {
    if(!version || version === 'null') return;

    document.querySelector('#download-btn').style.display = 'initial';
}

async function download() {
    await get('/download', { 
        method: 'POST',
        body: {
            version: document.querySelector('#version > select').value
        }
    }, await getToken());
}

document.addEventListener('DOMContentLoaded', init);