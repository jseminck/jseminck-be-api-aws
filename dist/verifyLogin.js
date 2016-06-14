"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/**
 * Helper function to validate a json web token.
 */

exports.default = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req) {
        var _req$query, requestKey, requestToken, _req$body, bodyKey, bodyToken, token, response, json;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$query = req.query;
                        requestKey = _req$query.key;
                        requestToken = _req$query.token;
                        _req$body = req.body;
                        bodyKey = _req$body.key;
                        bodyToken = _req$body.token;
                        token = requestKey || bodyKey || requestToken || bodyToken;
                        _context.prev = 7;

                        if (token) {
                            _context.next = 10;
                            break;
                        }

                        throw "Please provide a key: ?key= or ?token=";

                    case 10:
                        _context.next = 12;
                        return (0, _nodeFetch2.default)("http://pacific-refuge-84094.herokuapp.com/api/login/verify?token=" + token);

                    case 12:
                        response = _context.sent;
                        _context.next = 15;
                        return response.json();

                    case 15:
                        json = _context.sent;

                        if (json.success) {
                            _context.next = 18;
                            break;
                        }

                        throw "Incorrect key";

                    case 18:
                        _context.next = 23;
                        break;

                    case 20:
                        _context.prev = 20;
                        _context.t0 = _context["catch"](7);
                        return _context.abrupt("return", {
                            success: false,
                            message: _context.t0
                        });

                    case 23:
                        return _context.abrupt("return", {
                            success: true
                        });

                    case 24:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[7, 20]]);
    }));

    function verifyLogin(_x) {
        return ref.apply(this, arguments);
    }

    return verifyLogin;
}();