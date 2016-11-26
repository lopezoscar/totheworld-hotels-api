'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const secret = process.env.JWT_SECRET || require('./.credentials/jwt.json').secret;// TODO Validar existencia del archivo

app.use(helmet());// Security
app.use(morgan('dev'));// Logs

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(jwt({ secret }).unless({path: ['/token', '/authenticate']}));

app.use('/authenticate', require('./routes/v2/authentication'));
app.use('/v1/hotels', require('./routes/v1/hotels'));
app.use('/v2/hotels', require('./routes/v2/hotels'));

module.exports = app;
