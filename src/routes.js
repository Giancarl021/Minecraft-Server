const express = require('express');
const routes = express.Router();

const Start = require('./controllers/Start');
const Stop = require('./controllers/Stop');
const Restart = require('./controllers/Restart');
const Props = require('./controllers/Props');

const Authorize = require('./controllers/Authorize');
const Register = require('./controllers/Register');
const ResetPassword = require('./controllers/ResetPassword');

const Auth = require('./middlewares/Auth');
const Refresh = require('./middlewares/Refresh');

routes.get('/authorize', Authorize);
routes.get('/refresh', Refresh, Authorize);
routes.post('/register', Auth, Register);
routes.post('/reset', Auth, ResetPassword);

routes.get('/start', Auth, Start);
routes.get('/stop', Auth, Stop);
routes.get('/restart', Auth, Restart);
routes.post('/props', Auth, Props);

module.exports = routes;