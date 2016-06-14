'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureRoutes;

var _aws = require('./aws');

var _aws2 = _interopRequireDefault(_aws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureRoutes(app) {
    (0, _aws2.default)(app);
}