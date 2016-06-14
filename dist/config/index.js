'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configure;

var _express = require('./express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('./cors');

var _cors2 = _interopRequireDefault(_cors);

var _env = require('env2');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configure(app) {
    (0, _env2.default)('config.env'); // Load all environment variables

    (0, _express2.default)(app);
    (0, _cors2.default)(app);
}