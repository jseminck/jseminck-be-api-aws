'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.del = exports.post = exports.getMonthlyAllowance = exports.getCategory = exports.getGrouped = exports.get = undefined;


/**
 * Request expense data from the API.
 * Usage: /api/expenses?year=2015&month=12
 */

var get = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var _getFirstAndLastDays, first, last, expenses;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        validateGetParameters(req, res);

                        _context.prev = 1;
                        _getFirstAndLastDays = getFirstAndLastDays(req.query);
                        first = _getFirstAndLastDays.first;
                        last = _getFirstAndLastDays.last;
                        _context.next = 7;
                        return _Expense2.default.find({ purchaseDate: { $gte: first, $lte: last } });

                    case 7:
                        expenses = _context.sent;
                        return _context.abrupt('return', res.send(expenses));

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](1);
                        return _context.abrupt('return', res.status(500).send({ 'error': _context.t0 }));

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 11]]);
    }));

    return function get(_x, _x2) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Validate that the parameters "year" and "month" are on the query parameters, and return an
 * error if they are not.
 */


/**
 * Get allowance for a given month.
 */

var getMonthlyAllowance = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var monthlyAllowance;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        validateGetParameters(req, res);

                        _context2.prev = 1;
                        _context2.next = 4;
                        return _MonthlyAllowance2.default.findOne({ year: req.query.year, month: req.query.month });

                    case 4:
                        monthlyAllowance = _context2.sent;
                        return _context2.abrupt('return', res.send(monthlyAllowance));

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](1);
                        return _context2.abrupt('return', res.status(500).send({ 'error': _context2.t0 }));

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[1, 8]]);
    }));

    return function getMonthlyAllowance(_x3, _x4) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Get spending per day for a given month. Includes days where no money was spent.
 */


var getGrouped = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
        var _getFirstAndLastDays2, first, last, expenses;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        validateGetParameters(req, res);

                        _context3.prev = 1;
                        _getFirstAndLastDays2 = getFirstAndLastDays(req.query);
                        first = _getFirstAndLastDays2.first;
                        last = _getFirstAndLastDays2.last;
                        _context3.next = 7;
                        return _Expense2.default.find({ purchaseDate: { $gte: first, $lte: last } });

                    case 7:
                        expenses = _context3.sent;
                        return _context3.abrupt('return', res.send(groupExpensesByDay(expenses)));

                    case 11:
                        _context3.prev = 11;
                        _context3.t0 = _context3['catch'](1);
                        return _context3.abrupt('return', res.status(500).send({ 'error': _context3.t0 }));

                    case 14:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[1, 11]]);
    }));

    return function getGrouped(_x5, _x6) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Create a map of all days for the month (1 to number of days) and the amount spent per day.
 */


/**
 * Get spending per category for a given month.
 */

var getCategory = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
        var _getFirstAndLastDays3, first, last, expenses;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        validateGetParameters(req, res);

                        _context4.prev = 1;
                        _getFirstAndLastDays3 = getFirstAndLastDays(req.query);
                        first = _getFirstAndLastDays3.first;
                        last = _getFirstAndLastDays3.last;
                        _context4.next = 7;
                        return _Expense2.default.find({ purchaseDate: { $gte: first, $lte: last } });

                    case 7:
                        expenses = _context4.sent;
                        return _context4.abrupt('return', res.send(groupExpensesByCategory(expenses)));

                    case 11:
                        _context4.prev = 11;
                        _context4.t0 = _context4['catch'](1);
                        return _context4.abrupt('return', res.status(500).send({ 'error': _context4.t0 }));

                    case 14:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[1, 11]]);
    }));

    return function getCategory(_x7, _x8) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Create a map of all categories and the amount spent per category
 */


/**
 * Create a new expense.
 */

var post = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
        var expense;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return new _Expense2.default(req.body).save();

                    case 3:
                        expense = _context5.sent;
                        return _context5.abrupt('return', res.status(200).send(expense));

                    case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5['catch'](0);
                        return _context5.abrupt('return', res.status(500).send({ 'error': _context5.t0 }));

                    case 10:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[0, 7]]);
    }));

    return function post(_x9, _x10) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Remove an existing expense.
 */


var del = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res) {
        var expense;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return _Expense2.default.findOne({ _id: _mongoose2.default.Types.ObjectId(req.params.id) });

                    case 3:
                        expense = _context6.sent;
                        _context6.next = 6;
                        return _Expense2.default.remove({ '_id': _mongoose2.default.Types.ObjectId(req.params.id) });

                    case 6:
                        res.status(200).send(expense);
                        _context6.next = 12;
                        break;

                    case 9:
                        _context6.prev = 9;
                        _context6.t0 = _context6['catch'](0);

                        res.status(500).send({ 'error': _context6.t0 });

                    case 12:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[0, 9]]);
    }));

    return function del(_x11, _x12) {
        return ref.apply(this, arguments);
    };
}();

exports.default = configureExpenseRoutes;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _verifyJwtToken = require('./../util/verifyJwtToken');

var _verifyJwtToken2 = _interopRequireDefault(_verifyJwtToken);

var _MonthlyAllowance = require('./../models/MonthlyAllowance');

var _MonthlyAllowance2 = _interopRequireDefault(_MonthlyAllowance);

var _Expense = require('./../models/Expense');

var _Expense2 = _interopRequireDefault(_Expense);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function validateGetParameters(req, res) {
    if (!hasMonthAndYearQueryParameters(req.query)) {
        return res.status(500).send({ 'error': 'Missing year and/or month query paramters.' });
    }
}

/**
 * Returns the first and last days of the given month + year.
 */
function getFirstAndLastDays(_ref) {
    var year = _ref.year;
    var month = _ref.month;

    var first = toMoment(year, month).toDate();
    var last = toMoment(year, month).endOf('month').toDate();
    return { first: first, last: last };
}

/**
 * Return a moment.js object for a given year and month.
 */
function toMoment(year, month) {
    return (0, _moment2.default)(year + ' ' + month, 'YYYY MM');
}

/**
 * Validate if the query has month/year get parameters.
 */
function hasMonthAndYearQueryParameters(_ref2) {
    var month = _ref2.month;
    var year = _ref2.year;

    return month && year;
}function groupExpensesByDay(expenses) {
    var grouped = {};

    _lodash2.default.times((0, _moment2.default)(expenses[0].purchaseDate).daysInMonth(), function (day) {
        return grouped[day + 1] = 0;
    });
    expenses.forEach(function (expense) {
        return grouped[(0, _moment2.default)(expense.purchaseDate).date()] += expense.price;
    });

    return grouped;
}function groupExpensesByCategory(expenses) {
    var grouped = {};

    expenses.forEach(function (expense) {
        if (grouped[expense.category]) {
            grouped[expense.category] += expense.price;
        } else {
            grouped[expense.category] = expense.price;
        }
    });

    return grouped;
}function configureExpenseRoutes(app) {
    app.all('/api/expenses*', function (req, res, next) {
        var verifiedKey = (0, _verifyJwtToken2.default)(req, res, app);

        if (verifiedKey.success) {
            next();
        } else {
            res.status(401).send(verifiedKey);
        }
    });

    app.route('/api/expenses').get(get).post(post);

    app.route('/api/expenses/grouped').get(getGrouped);

    app.route('/api/expenses/category').get(getCategory);

    app.route('/api/expenses/allowance').get(getMonthlyAllowance);

    app.route('/api/expenses/:id').delete(del);
}

exports.get = get;
exports.getGrouped = getGrouped;
exports.getCategory = getCategory;
exports.getMonthlyAllowance = getMonthlyAllowance;
exports.post = post;
exports.del = del;