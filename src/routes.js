const express = require('express');
const routes = express.Router();

const Start = require('./controllers/Start');
const Stop = require('./controllers/Stop');
const Restart = require('./controllers/Restart');
const Props = require('./controllers/Props');

const Authorize = require('./controllers/Authorize');
const Register = require('./controllers/Register');
const Auth = require('./middlewares/Auth');

routes.get('/authorize', Authorize);
routes.post('/register', Auth, Register);

routes.get('/start', Auth, Start);
routes.get('/stop', Auth, Stop);
routes.get('/restart', Auth, Restart);
routes.post('/props', Auth, Props);

module.exports = routes;