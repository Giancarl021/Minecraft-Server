async function login() {
    const username = getValue('#username');
    const password = getValue('#password');

    if(!username || !password) {
        invalidResponse('Fill all the fields');
        return;
    }

    const response = await get('/authorize', {
        method: 'POST',
        body: {
            username,
            password
        }
    });

    if (response.error) {
        invalidResponse(response.error);
        return;
    }

    const { bearer_token, expires_in, refresh_token, user } = response;

    const now = new Date(Date.now());

    const expireBearer = new Date(now);
    expireBearer.setSeconds(expireBearer.getSeconds() + expires_in);

    const expireRefresh = new Date(now);
    expireRefresh.setDate(expireRefresh.getDate() + 14);

    localStorage.setItem('user', user);
    USER = user;

    localStorage.setItem('refreshToken', refresh_token);

    localStorage.setItem('bearerToken', JSON.stringify({
        data: bearer_token,
        expires_in: Number(expireBearer)
    }));

    document.location.href = URI;

    function getValue(selector) {
        return document.querySelector(selector).value;
    }
}

function invalidResponse(error) {
    fireError('Authentication Error', error);
}

function init() {
    const form = document.querySelector('.section.container');

    form.addEventListener('keypress', ({ key }) => {
        if(key === 'Enter') login();
    });
}

document.addEventListener('DOMContentLoaded', init);