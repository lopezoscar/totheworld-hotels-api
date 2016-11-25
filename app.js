'use strict';

const express = require('express');
const app = express();

app.use('/v1/hotels', require('./routes/v1/hotels'));
app.use('/v2/hotels', require('./routes/v2/hotels'));

module.exports = app;
