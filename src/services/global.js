const MinecraftServer = require('./MinecraftServer');
const Downloader = require('./Downloader');
const VersionManager = require('./VersionManager');

const refreshTokens = {};
const ms = new MinecraftServer();
const dl = Downloader();
const vm = VersionManager();

global.ms = ms;
global.refreshTokens = refreshTokens;
global.dl = dl;
global.vm = vm;