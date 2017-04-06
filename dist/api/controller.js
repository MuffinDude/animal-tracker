'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _species = require('./species');

var _animals = require('./animals');

var router = new _express.Router();

router.use('/species', _species.controller);
router.use('/animals', _animals.controller);

exports.default = router;