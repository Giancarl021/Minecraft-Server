const express = require('express');
const routes = express.Router();

const Start = require('./controllers/Start');
const Stop = require('./controllers/Stop');
const Restart = require('./controllers/Restart');
const Status = require('./controllers/Status');
const Props = require('./controllers/Props');
const Startup = require('./controllers/Startup');
const Versions = require('./controllers/Versions');
const Version = require('./controllers/Version');
const Ram = require('./controllers/Ram');
const Download = require('./controllers/Download');
const Map = require('./controllers/Map');

const Authorize = require('./controllers/Authorize');

const Auth = require('./middlewares/Auth');
const Refresh = require('./middlewares/Refresh');
const Wait = require('./middlewares/Wait');

const Static = require('./controllers/Static');

// Authentication
routes.post('/authorize', Authorize);
routes.post('/refresh', Refresh, Authorize);

// Server
routes.get('/start', Auth, Start);
routes.get('/stop', Auth, Stop);
routes.get('/restart', Auth, Restart);
routes.get('/status', Auth, Status);
routes.post('/download', Auth, Download);
routes.get('/version', Auth, Version);
routes.get('/versions', Auth, Versions);
routes.get('/map', Auth, Map.Get);

routes.get('/ram', Auth, Ram.Get);
routes.post('/ram', Auth, Ram.Post);

routes.get('/props', Auth, Props.Get);
routes.post('/props', Auth, Props.Post);

// Dashboard
routes.get('/', Wait, Static('dashboard.html'));
routes.get('/login', Wait, Static('login.html'));
routes.get('/config', Wait, Static('config.html'));

routes.get('/startup', Wait, Startup);

module.exports = routes;