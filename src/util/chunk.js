module.exports = async function (callbacks, ticks, echo = false) {
    const result = [];
    const promises = [];
    let j = 1;
    const l = callbacks.length;
    if (echo) console.log(`Executing chunk${l <= ticks ? '' : ` ${j}`}...`);
    for (let i = 0; i < l; i++) {
        const callback = callbacks[i];

        if (i && i % ticks === 0) {
            result.push(...await Promise.all(promises));
            promises.length = 0;
            if (echo) console.log(`Executing chunk ${++j}...`);
        }

        promises.push(callback());
    }

    result.push(...await Promise.all(promises));

    return result;
}