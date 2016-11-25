'use strict';

const config = require('config');
const mongojs = require('mongojs');
const db = mongojs(config.get('db.stringconn'), config.get('db.collections'));

db.hotels.insert([
  {
    'name': 'Hotel Emperador',
    'stars': '3',
    'price': '1596'
  },
  {
    'name': 'Petit Palace San Bernardo',
    'stars': '4',
    'price': '2145'
  },
  {
    'name': 'Hotel Nuevo Boston',
    'stars': '2',
    'price': '861'
  }
], function (err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
