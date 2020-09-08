const express = require('express');
const zip = require('express-zip');
const cors = require('cors');

const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/assets', express.static(__dirname + '/web/assets'));

app.all('*', (_, res) => res.redirect('/'));

app.use(function (error, _, response, next) {
    if (error) {
        console.error(error);
        response
            .status(error.statusCode)
            .json({
                error
            })
    } else {
        return next();
    }
});

module.exports = app;