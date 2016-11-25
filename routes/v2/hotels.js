'use strict';

const express = require('express');
const router = express.Router();
const hotels = require('../../lib/hotels');// TODO Cambiar pasaje de modules.

router.get('/', function index (req, res) {

  // Todo validate input
  let limit = Number(req.query.limit) || 10;
  let page = Number(req.query.page) || 1;
  let filters = {};
  let sort = {};

  hotels.getHotels({limit, page}, filters, sort)
        .then(hotels => res.json(hotels))
        .catch(function (err) {
          res.json({
            err: 500001,
            message: err
          });
        });
});

module.exports = router;
