module.exports = async function (request, response, next) {
    const user = request.token;
    console.log(user);
    return next();
}