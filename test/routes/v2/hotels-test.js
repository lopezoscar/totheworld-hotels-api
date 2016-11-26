'use strict';

const request = require('supertest')('http://localhost:3000');// TODO Dynamic Conf

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

describe('GET /v2/hotels', function () {
    it('/v2/hotels', function (done) {
        request
            .get('/v2/hotels')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                res.body.should.have.all.keys(['docs', 'total','limit','page','pages']);
                err ? done(err) : done();
            });
    });
});

