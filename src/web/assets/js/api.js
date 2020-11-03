const isSecure = location.protocol === 'https:';
const URI = window.location.protocol + '//' + window.location.host;
let USER = localStorage.getItem('user');

async function get(url, options, token = null) {
    const Options = options || {};
    const uri = URI + url;
    let _headers = { 'content-type': 'application/json' };
    if (Options.headers) _headers = { ..._headers, ...Options.headers };
    if(token) _headers.authorization = 'Bearer ' + token;

    const _options = {
        file: false,
        ...Options,
        headers: new Headers(_headers),
    };
    if (Options.body) _options.body = JSON.stringify(options.body);

    const response = await fetch(uri, _options);

    return await (_options.file ? response.blob() : response.json());
}

async function call(endpoint) {
    return await get('/' + endpoint, null, await getToken());
}

async function getToken() {
    const bearer = JSON.parse(localStorage.getItem('bearerToken'));
    if(!bearer || Date.now() >= bearer.expiresIn) {
        localStorage.removeItem('bearerToken');
        const refresh = localStorage.getItem('refreshToken');
        
        if(!refresh) {
            clearAuthentication();
        }

        const { bearer_token, refresh_token, expires_in, user } = await get('/refresh', {
            method: 'POST',
            body: {
                refresh_token: refresh
            }
        });

        const expireBearer = new Date(Date.now());
        expireBearer.setSeconds(expireBearer.getSeconds() + expires_in);

        localStorage.setItem('user', user);
        USER = user;

        localStorage.setItem('refreshToken', refresh_token);

        localStorage.setItem('bearerToken', JSON.stringify({
            data: bearer_token,
            expires_in: Number(expireBearer)
        }));

        return bearer_token;
    }

    return bearer.data;
}

async function getSocket() {
    const token = await getToken();
    const socket = io(URI);
    socket.on('authenticated', () => console.log('Connection established with server socket'))
    socket.on('unauthorized', clearAuthentication);

    socket.on('connect', () => {
        socket.emit('authentication', { token });
    });

    return socket;
}

function clearAuthentication() {
    localStorage.clear();
    window.location.href = URI + '/login';
}

function fireError(title, message) {
    Swal.fire({
        icon: 'error',
        title,
        text: message
    });
}

if (!isSecure) console.warn('Insecure connection detected!');