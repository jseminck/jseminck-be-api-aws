'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pgPromise = require('pg-promise');

var _pgPromise2 = _interopRequireDefault(_pgPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cn = {
    host: 'localhost',
    port: 5432,
    database: 'aws',
    username: 'postgres',
    password: ''
};

console.log('Connecting to: ' + (process.env.DATABASE_URL || cn));

exports.default = (0, _pgPromise2.default)()(process.env.DATABASE_URL || cn);