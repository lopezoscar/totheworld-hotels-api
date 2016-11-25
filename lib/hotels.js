'use strict';

const config = require('config');
const mongojs = require('mongojs');
const db = mongojs(config.get('db.stringconn'), config.get('db.collections'));

module.exports = {
  getHotels () {
    return new Promise(function pCb (resolve, reject) {
      db.hotels.find({}, function cb (err, docs) {
        err ? reject(err) : resolve(docs);
      });
    });
  }
};
