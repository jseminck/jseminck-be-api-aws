'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExpenseSchema = {
    id: String,
    description: String,
    category: String,
    purchaseDate: Date,
    userId: String,
    price: Number
};

var Expense = _mongoose2.default.model('Expense', ExpenseSchema, 'expenses');

exports.default = Expense;