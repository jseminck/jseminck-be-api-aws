import supertest from 'supertest';
import async from 'async';
import jwt from 'jsonwebtoken';

import * as User from './../../lib/models/User';

const app = require('./../../lib/index');

async function createUser(username, password) {
    await User.create({
        username,
        password,
        data: {
            modules: [{"name": "aws"}]
        }
    });
}

async function deleteUser(username) {
    await User.remove({username});
}

describe('/api/login', () => {
    describe('POST', () => {
        beforeEach(() => {
            sinon.spy(User, "updateLastLogin");

            return createUser('test', 'test');
        });

        afterEach(() => {
            User.updateLastLogin.restore();

            return deleteUser('test');
        });

        it("allows login with correct username and password and updates last_login", (done) => {
            supertest(app)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'test',
                    'password': 'test'
                })
                .expect((res) => {
                    res.body.token = '';

                    expect(User.updateLastLogin).to.have.been.calledWith({username: 'test'});
                })
                .expect(200, {
                    success: true,
                    message: 'You have been logged in!',
                    username: 'test',
                    token: ''
                }, done);
        });

        it("does not allow login with non-existing user", (done) => {
            supertest(app)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'not-existing-user',
                    'password': 'test'
                })
                .expect(500, {
                    success: false,
                    message: 'User has not been found.',
                    errorFields: ['username', 'password']
                }, done);
        });

        it("does not allow login with correct user and incorrect password", (done) => {
            supertest(app)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'test',
                    'password': 'wrong-password'
                })
                .expect(401, {
                    success: false,
                    message: 'Incorrect password',
                    errorFields: ['password']
                }, done);
        });
    });

    it('does not support GET', (done) => {
        supertest(app)
            .get('/api/login')
            .expect(404, done);
    });

    it('does not support PUT', (done) => {
        supertest(app)
            .get('/api/login')
            .expect(404, done);
    });

    it('does not support DELETE', (done) => {
        supertest(app)
            .get('/api/login')
            .expect(404, done);
    });
});

describe('/api/login/verify', () => {
    describe('GET', () => {
        it("without key returns error message", (done) => {
            supertest(app)
                .get('/api/login/verify')
                .expect(500, {
                    success: false,
                    message: 'Please provide a key'
                }, done);
        });

        it("without key returns error message", (done) => {
            supertest(app)
                .get('/api/login/verify?key=123')
                .expect(500, {
                    success: false,
                    message: 'Incorrect key'
                }, done);
        });
    });

    it('with correct key from jsonwebtoken returns success', (done) => {
        const token = jwt.sign({}, app.get('jwtKey'), {
            expiresIn: 3600
        });

        supertest(app)
            .get(`/api/login/verify?key=${token}`)
            .expect(200, {
                success: true
            }, done);
    });

    describe("with correct key from user login", function() {
        beforeEach(() => createUser('test', 'test'));
        afterEach(() => deleteUser('test'));

        it("returns success", async (done) => {
            async.waterfall([
                (cb) => supertest(app)
                    .post('/api/login')
                    .set('Content-Type', 'application/json')
                    .send({'username': 'test', 'password': 'test'})
                    .end((err, res) => cb(null, res.body.token)),
                (token, cb) => supertest(app)
                    .get(`/api/login/verify?key=${token}`)
                    .expect(200, {
                        success: true
                    }, cb)
            ], done);
        });
    });

    it('does not support POST', (done) => {
        supertest(app)
            .post('/api/login/verify')
            .expect(404, done);
    });

    it('does not support PUT', (done) => {
        supertest(app)
            .put('/api/login/verify')
            .expect(404, done);
    });

    it('does not support DELETE', (done) => {
        supertest(app)
            .del('/api/login/verify')
            .expect(404, done);
    });
});
