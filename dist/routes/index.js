'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureRoutes;

var _aws = require('./aws');

var _aws2 = _interopRequireDefault(_aws);

var _authentication = require('./authentication');

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureRoutes(app) {
    (0, _authentication2.default)(app);
    (0, _aws2.default)(app);
}