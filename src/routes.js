const express = require('express');
const routes = express.Router();

const Start = require('./controllers/Start');
const Stop = require('./controllers/Stop');
const Restart = require('./controllers/Restart');
const Status = require('./controllers/Status');
const Props = require('./controllers/Props');
const Index = require('./controllers/Index');
const Startup = require('./controllers/Startup');
const Versions = require('./controllers/Versions');
const Download = require('./controllers/Download');

const Authorize = require('./controllers/Authorize');
const Register = require('./controllers/Register');
const ResetPassword = require('./controllers/ResetPassword');

const Auth = require('./middlewares/Auth');
const Refresh = require('./middlewares/Refresh');

const Static = require('./controllers/Static');

// Authentication
routes.post('/authorize', Authorize);
routes.post('/refresh', Refresh, Authorize);
routes.post('/register', Auth, Register);
routes.post('/reset', Auth, ResetPassword);

// Server
routes.get('/start', Auth, Start);
routes.get('/stop', Auth, Stop);
routes.get('/restart', Auth, Restart);
routes.get('/status', Auth, Status);
routes.get('/props', Auth, Props);
routes.get('/versions', Auth, Versions);
routes.post('/download', Auth, Download);
// Dashboard
routes.get('/', Index);
// routes.get('/startup', Startup);
routes.get('/startup', Static('startup.html')); // DEBUG
routes.get('/login', Static('login.html'));
// routes.get('/properties', Static('properties.html'));
// routes.get('/users', Static('users.html'));

module.exports = routes;