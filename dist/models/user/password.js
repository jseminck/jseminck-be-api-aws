'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generate = generate;
exports.verify = verify;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generate(password) {
    return new Promise(function (resolve) {
        return _bcrypt2.default.hash(password, 10, function (err, hash) {
            resolve(hash);
        });
    });
}

function verify(password, encryptedPassword) {
    return new Promise(function (resolve) {
        return _bcrypt2.default.compare(password, encryptedPassword, function (err, equal) {
            resolve(equal);
        });
    });
}