module.exports = async function (_, response) {
    const versions = await vm.list();

    return response.json({
        versions
    });
}