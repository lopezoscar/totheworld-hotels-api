'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const secret = process.env.JWT_SECRET || require('./.credentials/jwt.json').secret;// TODO Validar existencia del archivo

const debug = require('debug')('api:app');

const users = require('./lib/users');
const jsonwebtoken = require('jsonwebtoken');

app.use(helmet());// Security
app.use(morgan('dev'));// Logs

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(jwt({secret}).unless({path: ['/authenticate']}));

const v1 = require('./routes/v1/hotels');
const v2 = require('./routes/v2/hotels');

app.use('/authenticate', require('./routes/v2/authentication'));
app.use('/v1/hotels', v1);
app.use('/v2/hotels', v2);

module.exports = app;
