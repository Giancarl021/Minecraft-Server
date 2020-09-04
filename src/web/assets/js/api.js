async function get(url, options) {
    const uri = 'http://localhost/' + url;
    
    const _options = {
        ...options,
        headers: new Headers({'content-type': 'application/json'}),
    };
    if(options.body) _options.body = JSON.stringify(options.body);

    return await (await fetch(uri, _options)).json();
}