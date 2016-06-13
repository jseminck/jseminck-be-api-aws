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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    app.route('/api/aws').get(get);

    app.route('/api/aws/start').post(start);

    app.route('/api/aws/stop').post(stop);
}

// Exporting the routes for unit testing.
exports.get = get;
exports.start = start;
exports.stop = stop;