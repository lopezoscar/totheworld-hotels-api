'use strict';

const request = require('supertest')('http://localhost:3000');// TODO Dynamic Conf

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

describe('GET /v1/hotels', function () {
  it('/v1/hotels', function (done) {
    request
            .get('/v1/hotels')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              res.body.should.have.all.keys(['hotels']);
              err ? done(err) : done();
            });
  });
});

