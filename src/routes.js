const express = require('express');
const routes = express.Router();

const Start = require('./controllers/Start');
const Stop = require('./controllers/Stop');
const Restart = require('./controllers/Restart');
const Status = require('./controllers/Status');
const Props = require('./controllers/Props');

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
routes.post('/props', Auth, Props);

// Dashboard
routes.get('/', Static('index.html'));
routes.get('/login', Static('login.html'));
// routes.get('/properties', Static('properties.html'));
// routes.get('/users', Static('users.html'));

module.exports = routes;