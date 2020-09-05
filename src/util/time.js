module.exports = function () {
    const d = new Date(Date.now());
    const t = [
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ].map(formatNumber);

    return `[${t.join(':')}]`;

    function formatNumber(n) {
        return n < 10 ? '0' + n : n;
    }
}