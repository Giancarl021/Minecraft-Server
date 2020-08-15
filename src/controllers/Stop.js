module.exports = async function (_, response) {
    try {
        await _ms.stop();
    } catch (err) {
        return response.status(500).json({
            error: err.message
        })
    }

    return response.status(200).json({
        status: 'Server stopped'
    });
}