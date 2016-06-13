'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MonthlyAllowanceSchema = {
    id: String,
    month: Number,
    year: Number,
    allowance: Number
};

var MonthlyAllowance = _mongoose2.default.model('MonthlyAllowance', MonthlyAllowanceSchema, 'monthlyAllowance');

exports.default = MonthlyAllowance;