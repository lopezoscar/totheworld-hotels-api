'use strict';

const express = require('express');
const app = express();

app.use('/v1/hotels', require('./routes/v1/hotels'));

module.exports = app;
