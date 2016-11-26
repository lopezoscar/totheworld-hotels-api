'use strict';

const express = require('express');
const router = express.Router();
const users = require('../../lib/users');// TODO Cambiar pasaje de modules.
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || require('../../.credentials/jwt.json').secret;// TODO Validar

// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
// router.use( function index (req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, secret, function (err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//       success: false,
//       message: 'No token provided.'
//     });
//   }
// });

router.post('/', function(req, res) {

  //TODO Validate username and password.
  //TODO encrypt the password.

  // find the user
  users.getUserByUsername(req.body.name).then( function(user) {

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, secret, {
          expiresIn: '1d'// expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Token OK',
          token: token
        });
      }
    }
  }).catch(function(err){
    console.log(err);
    res.json({ success: false, message: 'Authentication failed. User not found.' });
  });
});

module.exports = router;
