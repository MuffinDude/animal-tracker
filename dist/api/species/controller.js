'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _repository = require('./repository');

var router = new _express.Router();

router.get('/', function (request, response) {
  (0, _repository.findAllSpecies)().then(function (species) {
    return response.status(200).json(species);
  }).catch(function (error) {
    console.log(error); // eslint-disable-line
    response.status(500).send();
  });
});

router.get('/:id', function (request, response) {
  (0, _repository.findById)(request.params.id).then(function (species) {
    return response.status(200).json(species);
  }).catch(function (error) {
    console.log(error); // eslint-disable-line
    response.status(500).send();
  });
});

router.post('/', function (request, response) {
  (0, _repository.createNewSpecies)(request.body.name).then(function (entry) {
    return response.status(200).json(entry);
  }).catch(function (error) {
    console.log(error); // eslint-disable-line
    response.status(500).send();
  });
});

exports.default = router;