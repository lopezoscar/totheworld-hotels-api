'use strict';

const express = require('express');
const router = express.Router();
const hotels = require('../../lib/hotels');// TODO Cambiar pasaje de modules.

router.get('/', function index (req, res) {
  hotels.getHotels()
        .then(hotels => res.json({hotels}))
        .catch(function (err) {
          res.json({
            err: 500001,
            message: err
          });
        });
});

module.exports = router;
