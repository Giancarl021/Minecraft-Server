module.exports = async function (_, response) {
    return response.json({
        status: ms.status()
    });
}