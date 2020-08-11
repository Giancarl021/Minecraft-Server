const express = require('express');
const routes = express.Router();

routes.get('/', (_, res) => res.json({ status: 'ok' }));

module.exports = routes;