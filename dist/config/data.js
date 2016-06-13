'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _users = require('./../../data/users.json');

var _users2 = _interopRequireDefault(_users);

var _User = require('./../models/User');

var User = _interopRequireWildcard(_User);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// import * as Expense from './../models/Expense';

exports.default = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!(process.env.NODE_ENV === "DEVELOPMENT" || process.env.NODE_ENV === "TEST")) {
                            _context2.next = 11;
                            break;
                        }

                        _context2.prev = 1;
                        _context2.next = 4;
                        return User.__recreate();

                    case 4:
                        _users2.default.forEach(function () {
                            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.next = 2;
                                                return User.create(user);

                                            case 2:
                                                return _context.abrupt('return', _context.sent);

                                            case 3:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x) {
                                return ref.apply(this, arguments);
                            };
                        }());

                        // await Expense.__recreate();

                        console.log("Data has been initialized"); // eslint-disable-line no-console
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](1);

                        console.log("Error while initializing data; ", _context2.t0); // eslint-disable-line no-console

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[1, 8]]);
    }));

    function configureData() {
        return ref.apply(this, arguments);
    }

    return configureData;
}();