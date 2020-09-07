const path = require('path');

module.exports = {
    async Get(_, response) {
        return response.json({
            props: ms.properties()
        })
    },

    async Post(request, response) {
        const props = ms.properties();
        const update = request.body;
        const updateKeys = Object.keys(update);

        const keys = Object.keys(props).filter(prop => updateKeys.includes(prop));

        for (const key of keys) {
            if(typeof update[key] !== typeof props[key]) {
                return response.status(400).json({
                    error: `Wrong type on property ${key}`
                });
            }

            props[key] = update[key];
        }

        ms.setProperties(props);

        return response.json({
            status: `Properties ${parseKeys(keys)} successfully updated`
        });
    }
}

function parseKeys(keys) {
    if (keys.length === 2) {
        return `${keys[0]} and ${keys[1]}`;
    } else if (keys.length > 2) {
        const part = keys.slice(0, -1);
        return `${part.join(', ')} and ${keys[keys.length - 1]}`;
    } else {
        return `${keys.join('')}`;
    }
}