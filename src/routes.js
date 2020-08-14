const express = require('express');
const routes = express.Router();

const Start = require('./controllers/Start');
const Stop = require('./controllers/Stop');
const Restart = require('./controllers/Restart');
const Props = require('./controllers/Props');

const Authorize = require('./controllers/Authorize');

routes.get('/authorize', Authorize);

routes.get('/start', Start);
routes.get('/stop', Stop);
routes.get('/restart', Restart);
routes.post('/props', Props);

module.exports = routes;