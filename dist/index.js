'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 8080;

var app = (0, _express2.default)();

app.use((0, _bodyParser.json)());
app.use('/api/v1', _api2.default);

var server = _http2.default.createServer(app);
server.listen(PORT, function () {
  return console.log('Server running at ' + PORT);
}); // eslint-disable-line

exports.default = server;