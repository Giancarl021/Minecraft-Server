const MinecraftServer = require('./MinecraftServer');
const Downloader = require('./Downloader');

const refreshTokens = {};
const ms = new MinecraftServer();
const dl = Downloader();

global.ms = ms;
global.refreshTokens = refreshTokens;
global.dl = dl;