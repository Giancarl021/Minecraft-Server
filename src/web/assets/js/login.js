async function login() {
    const username = getValue('#username');
    const password = getValue('#password');

    if(!username || !password) {
        invalidResponse('Fill all the fields');
        return;
    }

    const response = await get('authorize', {
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

    const { bearer_token, expires_in, refresh_token } = response;

    const now = new Date(Date.now());

    const expireBearer = new Date(now);
    expireBearer.setSeconds(expireBearer.getSeconds() + expires_in);

    const expireRefresh = new Date(now);
    expireRefresh.setDate(expireRefresh.getDate() + 14);

    document.cookie = `bearer_token=${bearer_token} expires=${expireBearer.toUTCString()}; path=/`
    document.cookie = `refresh_token=${refresh_token} expires=${expireRefresh.toUTCString()} path=/`;

    document.location.href = document.location.href.replace(/login.*$/, '');

    function getValue(selector) {
        return document.querySelector(selector).value;
    }

    function invalidResponse(message) {
        Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: message
        });
    }
}