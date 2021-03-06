'use strict';

const express = require('express');
const router = express.Router();
const users = require('../../lib/users');// TODO Cambiar pasaje de modules.
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || require('../../.credentials/jwt.json').secret;// TODO Validar

router.post('/', function (req, res) {
  // TODO Validate username and password.
  // TODO encrypt the password.

  // find the user
  users.getUserByApiKey(req.body.apikey).then(function (user) {
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      if (user.apikey !== req.body.apikey) {
        res.json({ success: false, message: 'Authentication failed. Wrong apikey.' });
      } else {
        // if user is found and apikey is right
        // create a token
        var token = jwt.sign({ user_id: user._id, limit: user.limit }, secret, {
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
  }).catch(function (err) {
    console.log(err);
    res.json({ success: false, message: 'Authentication failed. User not found.' });
  });
});

module.exports = router;
