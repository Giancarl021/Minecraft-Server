const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/assets', express.static(__dirname + '/web/assets'));

module.exports = app;