import proxyquire from 'proxyquire';

const awsSdk = {
    describeInstances: sinon.stub(),
    startInstances: sinon.stub(),
    stopInstances: sinon.stub()
};

var stubs = {
    'aws-sdk': {
        EC2: () => {
            return awsSdk;
        },
        '@global': true
    }
};

var aws = proxyquire('./../../lib/routes/aws', stubs);

describe('/api/aws', function () {
    beforeEach(function() {
        this.response = {
            send: sinon.spy(),
            status: sinon.stub()
        };

        // Make sure that res.status() returns res.send()
        this.response.status.returns({send: this.response.send});
    });

    describe('GET with data', function() {
        beforeEach(function() {
            var describeInstancesMock = {
                Reservations: [{
                    Instances: [{
                        InstanceId: "1",
                        State: {Name: "myStateOne"},
                        Tags: [{Key: "Name", Value: "FirstName"}]
                    }]
                }, {
                    Instances: [{
                        InstanceId: "2",
                        State: {Name: "myStateTwo"},
                        Tags: [{Key: "Name", Value: "SecondName"}]
                    }]
                }]
            };

            awsSdk.describeInstances.callsArgWith(0, false, describeInstancesMock);

            aws.get({}, this.response);
        });

        it("returns instances from AWS", function() {
            expect(this.response.send).to.have.been.calledWith([{
                id: "1",
                name: "FirstName",
                state: "myStateOne"
            }, {
                id: "2",
                name: "SecondName",
                state: "myStateTwo"
            }]);
        });
    });

    function returnsInternalServerErrorWithMessage({errorMessage}) {
        it("returns a status 500", function() {
            expect(this.response.status).to.have.been.calledWith(500);
        });

        it("returns a error message", function() {
            expect(this.response.send).to.have.been.calledWith({error: errorMessage});
        });
    }

    describe('GET with error', function() {
        beforeEach(function() {
            awsSdk.describeInstances.callsArgWith(0, {error: "myError"}, {});

            aws.get({}, this.response);
        });

        returnsInternalServerErrorWithMessage({errorMessage: "myError"});
    });



    describe('/start POST', function() {
        beforeEach(function() {
            this.awsStart = function(body) {
                return aws.start({body}, this.response);
            };
        });

        describe("when given an id and no error on aws side", function() {
            beforeEach(function() {
                awsSdk.startInstances.callsArgWith(1, false, {data: "myData"});
                this.awsStart({id: "123"});
            });

            it("returns data from aws-sdk", function() {
                expect(this.response.send).to.have.been.calledWith({data: "myData"});
            });
        });

        describe("when given an id and error on aws side", function() {
            beforeEach(function() {
                awsSdk.startInstances.callsArgWith(1, {error: "myError"}, {data: "myData"});
                this.awsStart({id: "123"});
            });

            returnsInternalServerErrorWithMessage({errorMessage: "myError"});
        });

        describe("when not given an id", function() {
            beforeEach(function() {
                 this.awsStart({});
            });

            returnsInternalServerErrorWithMessage({errorMessage: "Please provide id on the body"});
        });
    });

    describe('/stop POST', function() {
        beforeEach(function() {
            this.awsStop = function(body) {
                return aws.stop({body}, this.response);
            };
        });

        describe("when given an id and no error on aws side", function() {
            beforeEach(function() {
                awsSdk.stopInstances.callsArgWith(1, false, {data: "myData"});
                this.awsStop({id: "123"});
            });

            it("returns data from aws-sdk", function() {
                expect(this.response.send).to.have.been.calledWith({data: "myData"});
            });
        });

        describe("when given an id and error on aws side", function() {
            beforeEach(function() {
                awsSdk.stopInstances.callsArgWith(1, {error: "myError"}, {data: "myData"});
                this.awsStop({id: "123"});
            });

            returnsInternalServerErrorWithMessage({errorMessage: "myError"});
        });

        describe("when not given an id", function() {
            beforeEach(function() {
                 this.awsStop({});
            });

            returnsInternalServerErrorWithMessage({errorMessage: "Please provide id on the body"});
        });
    });
});