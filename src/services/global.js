const MinecraftServer = require('./MinecraftServer');

const refreshTokens = {};
const ms = new MinecraftServer();

global.ms = ms;
global.refreshTokens = refreshTokens;