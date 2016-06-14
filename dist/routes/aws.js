'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stop = exports.start = exports.get = undefined;
exports.default = configureAwsRoutes;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _verifyLogin = require('../verifyLogin');

var _verifyLogin2 = _interopRequireDefault(_verifyLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

_awsSdk2.default.config.region = 'eu-central-1';
_awsSdk2.default.config.accessKeyId = process.env.AWS_ACCESS_KEY;
_awsSdk2.default.config.secretAccessKey = process.env.AWS_SECRET_KEY;

function get(req, res) {
    var instances = [];

    new _awsSdk2.default.EC2().describeInstances(function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }

        data.Reservations.forEach(function (reservation) {
            reservation.Instances.forEach(function (instance) {
                instances.push({
                    id: instance.InstanceId,
                    name: (0, _lodash2.default)(instance.Tags).filter(function (tag) {
                        return tag.Key === "Name";
                    }).first().Value,
                    state: instance.State.Name
                });
            });
        });

        res.send(instances);
    });
}

function start(req, res) {
    validateGetParameter(req, res);

    new _awsSdk2.default.EC2().startInstances({ InstanceIds: [req.body.id] }, awsCallback.bind(res));
}

function stop(req, res) {
    validateGetParameter(req, res);

    new _awsSdk2.default.EC2().stopInstances({ InstanceIds: [req.body.id] }, awsCallback.bind(res));
}

function awsCallback(err, data) {
    if (err) {
        return this.status(500).send(err);
    }

    this.send(data);
}

function validateGetParameter(req, res) {
    var id = req.body.id;


    if (!id) {
        return res.status(500).send({ "error": "Please provide id on the body" });
    }
}

function configureAwsRoutes(app) {
    var _this = this;

    app.all('/api/*', function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (0, _verifyLogin2.default)(req, res);

                        case 2:
                            result = _context.sent;


                            if (result.success) {
                                next();
                            } else {
                                res.status(401).send({
                                    "error": result.message
                                });
                            }

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2, _x3) {
            return ref.apply(this, arguments);
        };
    }());

    app.route('/api/aws').get(get);

    app.route('/api/aws/start').post(start);

    app.route('/api/aws/stop').post(stop);
}

// Exporting the routes for unit testing.
exports.get = get;
exports.start = start;
exports.stop = stop;