'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var post = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, username, password, user, passwordEqual, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$body = req.body;
                        username = _req$body.username;
                        password = _req$body.password;
                        _context.prev = 3;
                        _context.next = 6;
                        return User.findOneByUsername({ username: username });

                    case 6:
                        user = _context.sent;

                        if (user) {
                            _context.next = 9;
                            break;
                        }

                        return _context.abrupt('return', res.status(500).send({
                            success: false,
                            message: 'User has not been found.',
                            errorFields: ['username', 'password']
                        }));

                    case 9:
                        _context.next = 11;
                        return Password.verify(password, user.password);

                    case 11:
                        passwordEqual = _context.sent;

                        if (passwordEqual) {
                            _context.next = 14;
                            break;
                        }

                        return _context.abrupt('return', res.status(401).send({
                            success: false,
                            message: 'Incorrect password',
                            errorFields: ['password']
                        }));

                    case 14:
                        token = _jsonwebtoken2.default.sign(user, this.get('jwtKey'), {
                            expiresIn: 3600
                        });
                        _context.next = 17;
                        return User.updateLastLogin({ username: user.username });

                    case 17:
                        return _context.abrupt('return', res.send({
                            success: true,
                            message: 'You have been logged in!',
                            username: user.username,
                            token: token
                        }));

                    case 20:
                        _context.prev = 20;
                        _context.t0 = _context['catch'](3);
                        return _context.abrupt('return', res.status(500).send({ err: _context.t0 }));

                    case 23:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[3, 20]]);
    }));

    return function post(_x, _x2) {
        return ref.apply(this, arguments);
    };
}();

exports.default = configureAuthenticationRoutes;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('./../models/User');

var User = _interopRequireWildcard(_User);

var _password = require('./../models/user/password');

var Password = _interopRequireWildcard(_password);

var _verifyJwtToken = require('./../util/verifyJwtToken');

var _verifyJwtToken2 = _interopRequireDefault(_verifyJwtToken);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function verify(req, res) {
    var verifiedKey = (0, _verifyJwtToken2.default)(req, res, this);

    if (verifiedKey.success) {
        res.status(200).send(verifiedKey);
    } else {
        res.status(500).send(verifiedKey);
    }
}

function configureAuthenticationRoutes(app) {
    app.route('/api/login').post(post.bind(app));

    app.route('/api/login/verify').get(verify.bind(app));
}