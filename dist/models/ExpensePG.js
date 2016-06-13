"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__recreate = exports.remove = exports.create = exports.findAllBetween = undefined;


/**
 * Find all expenses between two given dates
 *
 * @param {Object} search
 *   @param {String} search.start
 *   @param {String} search.end
 * @returns {Object[]} all found expenses (can be none)
 */

var findAllBetween = exports.findAllBetween = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref) {
        var start = _ref.start;
        var end = _ref.end;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _db2.default.manyOrNone("select * from expenses where purchaseDate between $1 and $2", [start, end]);

                    case 3:
                        return _context.abrupt("return", _context.sent);

                    case 6:
                        _context.prev = 6;
                        _context.t0 = _context["catch"](0);
                        throw _context.t0;

                    case 9:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 6]]);
    }));

    return function findAllBetween(_x) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Create a new expense.
 *
 * @param {Object} expense
 *   @param {Date} expense.purchaseDate
 *   @param {String} expense.category
 *   @param {Number} expense.price
 *   @param {String} expense.description
 *   @param {Object} expense.data
 */


var create = exports.create = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(expense) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _db2.default.none("insert into expenses (purchaseDate, category, price, description, data) values ($/purchaseDate/, $/category/, $/price/, $/description/, $/data/)", expense);

                    case 3:
                        return _context2.abrupt("return", _context2.sent);

                    case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2["catch"](0);

                        console.log("Error creating expense: ", _context2.t0); // eslint-disable-line no-console

                    case 9:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 6]]);
    }));

    return function create(_x2) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Remove an expense from the database by id.
 *
 * @param {Object} expense
 *   @param {Number} expense.id
 */


var remove = exports.remove = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref2) {
        var id = _ref2.id;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _db2.default.none("delete from users where id = $1", id);

                    case 3:
                        return _context3.abrupt("return", _context3.sent);

                    case 6:
                        _context3.prev = 6;
                        _context3.t0 = _context3["catch"](0);
                        throw _context3.t0;

                    case 9:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[0, 6]]);
    }));

    return function remove(_x3) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Drop and recreate the expenses table. This will remove all data!
 */


var __recreate = exports.__recreate = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _db2.default.none('drop table if exists expenses;');

                    case 2:
                        _context4.next = 4;
                        return _db2.default.none("create table expenses (\n        id serial not null,\n        purchaseDate timestamp not null,\n        category varchar(128) not null,\n        price decimal not null,\n        description varchar(256) npt null,\n        data jsonb,\n        created_at timestamp not null default CURRENT_TIMESTAMP,\n    )");

                    case 4:
                        return _context4.abrupt("return", _context4.sent);

                    case 5:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function __recreate() {
        return ref.apply(this, arguments);
    };
}();

var _db = require("../db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }