module.exports = async function (_, response) {
    return response.json({
        players: ms.players(),
        maximum: 20
    });
}