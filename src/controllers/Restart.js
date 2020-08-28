module.exports = async function(_, response) {
    try {
        await ms.stop();
    } catch (err) {
        return response.status(500).json({
            error: err.message
        })
    }

    try {
        await ms.start();
    } catch (err) {
        return response.status(500).json({
            error: err.message
        })
    }

    return response.json({
        status: 'Server restarted'
    });
}