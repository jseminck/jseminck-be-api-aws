import proxyquire from 'proxyquire';

describe("User", function() {
    beforeEach(function() {
        this.generate = sinon.stub();
        this.generate.onCall(0).returns("encryptedPassword");

        this.PGModel = {
            findOne: sinon.spy(),
            create: sinon.spy(),
            update: sinon.spy(),
            remove: sinon.spy(),
            __recreate: sinon.spy()
        };

        this.User = proxyquire("./../../lib/models/User", {
            './../pg/PGModel': () => this.PGModel,
            './user/password': {
                generate: this.generate
            }
        });
    });

    describe("findOneByUsername()", function() {
        it("finds user by username", async function() {
            await this.User.findOneByUsername({username: "myUser"});

            expect(this.PGModel.findOne).to.have.been.calledWith({
                column: "username",
                value: "myUser"
            });
        });
    });

    describe("updateLastLogin()", function() {
        it("updates last_login field in database for username", async function() {
            await this.User.updateLastLogin({username: "myUser"});

            expect(this.PGModel.update).to.have.been.calledWith({
                column: "last_login",
                value: "current_timestamp",
                where: {column: "username", value: "myUser"}
            });
        });
    });

    describe("remove()", function() {
        it("removes user by username", async function() {
            await this.User.remove({username: "myUser"});

            expect(this.PGModel.remove).to.have.been.calledWith({
                column: "username",
                value: "myUser"
            });
        });
    });

    describe("create()", function() {
        beforeEach(async function() {
            await this.User.create({username: "myUser", password: "myPassword", data: {modules: {}}});
        });

        it("generates password", function() {
            expect(this.generate).to.have.been.calledWith("myPassword");
        });

        it("creates user", function() {
            expect(this.PGModel.create).to.have.been.calledWith({
                username: "myUser",
                password: "encryptedPassword",
                data: {modules: {}}
            });
        });
    });

    describe("__recreate()", function() {
        it("recreates user table", async function() {
            await this.User.__recreate();

            expect(this.PGModel.__recreate).to.have.been.calledWith();
        });
    });
});