import _ from 'lodash';
import AWS from 'aws-sdk';

AWS.config.region = 'eu-central-1';
AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY;
AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY;

function get(req, res) {
    let instances = [];

    new AWS.EC2().describeInstances((err, data) => {
        if (err) {
            return res.status(500).send(err);
        }

        data.Reservations.forEach(reservation => {
            reservation.Instances.forEach(instance => {
                instances.push({
                    id: instance.InstanceId,
                    name: _(instance.Tags).filter(tag => tag.Key === "Name").first().Value,
                    state: instance.State.Name
                });
            });
        });

        res.send(instances);
    });
}

function start(req, res) {
    validateGetParameter(req, res);

    new AWS.EC2().startInstances({InstanceIds: [req.body.id]}, awsCallback.bind(res));
}

function stop(req, res) {
    validateGetParameter(req, res);

    new AWS.EC2().stopInstances({InstanceIds: [req.body.id]}, awsCallback.bind(res));
}

function awsCallback(err, data) {
    if (err) {
        return this.status(500).send(err);
    }

    this.send(data);
}

function validateGetParameter(req, res) {
    const {id} = req.body;

    if (!id) {
        return res.status(500).send({"error": "Please provide id on the body"});
    }
}

export default function configureAwsRoutes (app) {
    app.all('/api/*', (req, res, next) => {
        next();
    });

    app.route('/api/aws')
        .get(get);

    app.route('/api/aws/start')
        .post(start);

    app.route('/api/aws/stop')
        .post(stop);
}

// Exporting the routes for unit testing.
export { get, start, stop };
