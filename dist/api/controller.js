'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _species = require('./species');

var router = new _express.Router();

router.use('/species', _species.controller);

exports.default = router;