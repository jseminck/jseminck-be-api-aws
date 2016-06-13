'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__recreate = exports.create = exports.findAll = undefined;


/**
 * Find all modules
 */

var findAll = exports.findAll = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _db2.default.oneOrNone('select * modules');

                    case 3:
                        return _context.abrupt('return', _context.sent);

                    case 6:
                        _context.prev = 6;
                        _context.t0 = _context['catch'](0);
                        throw _context.t0;

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 6]]);
    }));

    return function findAll() {
        return ref.apply(this, arguments);
    };
}();

/**
 * Create a new mpdule.
 *
 * @param {Object} module
 *   @param {String} module.name
 */


var create = exports.create = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(module) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _db2.default.none('insert into modules\n                (name)\n            values\n                ($/name/)', module);

                    case 3:
                        return _context2.abrupt('return', _context2.sent);

                    case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2['catch'](0);

                        console.log("Error creating module: ", _context2.t0); // eslint-disable-line no-console

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 6]]);
    }));

    return function create(_x) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Drop and recreate the users table. This will remove all data!
 */


var __recreate = exports.__recreate = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _db2.default.none('drop table if exists modules;');

                    case 2:
                        _context3.next = 4;
                        return _db2.default.none('create table modules (\n        id serial not null,\n        name varchar(64) not null\n    )');

                    case 4:
                        return _context3.abrupt('return', _context3.sent);

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function __recreate() {
        return ref.apply(this, arguments);
    };
}();

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }