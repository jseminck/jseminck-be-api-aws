'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__recreate = exports.remove = exports.create = exports.updateLastLogin = exports.findOneByUsername = undefined;


/**
 * Find a user by username. Returns undefined if nothing found
 *
 * @param {Object} user
 *   @param {String} user.username
 * @returns {Object} user or undefined
 */

var findOneByUsername = exports.findOneByUsername = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref) {
        var username = _ref.username;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return UserModel.findOne({ column: "username", value: username });

                    case 2:
                        return _context.abrupt('return', _context.sent);

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function findOneByUsername(_x) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Update last_login for a user to the current timestamp
 *
 * @param {Object} search object
 *   @param {String} search.key
 *   @param {String|Number} search.value
 */


var updateLastLogin = exports.updateLastLogin = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref2) {
        var username = _ref2.username;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log("updateLastLogin: ", username);
                        _context2.next = 3;
                        return UserModel.update({
                            column: "last_login",
                            value: "current_timestamp",
                            where: { column: "username", value: username }
                        });

                    case 3:
                        return _context2.abrupt('return', _context2.sent);

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function updateLastLogin(_x2) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Create a new user.
 *
 * @param {Object} user
 *   @param {String} user.username
 *   @param {String} user.password
 *   @param {Object} user.data
 */


var create = exports.create = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(user) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return Password.generate(user.password);

                    case 2:
                        user.password = _context3.sent;
                        _context3.next = 5;
                        return UserModel.create(user);

                    case 5:
                        return _context3.abrupt('return', _context3.sent);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function create(_x3) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Remove a user from the database, by username.
 *
 * @param {Object} user
 *   @param {String} user.username
 */


var remove = exports.remove = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref3) {
        var username = _ref3.username;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return UserModel.remove({ column: "username", value: username });

                    case 2:
                        return _context4.abrupt('return', _context4.sent);

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function remove(_x4) {
        return ref.apply(this, arguments);
    };
}();

/**
 * Drop and recreate the users table. This will remove all data!
 */


var __recreate = exports.__recreate = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        return _context5.abrupt('return', UserModel.__recreate());

                    case 1:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function __recreate() {
        return ref.apply(this, arguments);
    };
}();

var _password = require('./user/password');

var Password = _interopRequireWildcard(_password);

var _PGModel = require('./../pg/PGModel');

var _PGModel2 = _interopRequireDefault(_PGModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var UserModel = new _PGModel2.default({
    tableName: "users",
    columns: [{ name: "id", type: "serial" }, { name: "username", type: "varchar(128)" }, { name: "password", type: "varchar(128)" }, { name: "data", type: "jsonb", null: true }, { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" }, { name: "last_login", type: "timestamp", null: true }]
});