import * as password from './../../lib/models/user/password';

describe("passwordGenerator", function() {
    beforeEach(async function() {
        this.firstHash = await password.generate("test123");
        this.secondHash = await password.generate("test123");
    });

    it("creates different hashes", async function() {
        expect(this.hash).not.to.equal(this.secondHash);
    });

    it("can verify the correct password for first hash", async function() {
        const result = await password.verify("test123", this.firstHash);
        expect(result).to.equal(true);
    });

    it("does not verify an incorrect password for first hash", async function() {
        const result = await password.verify("whatever", this.firstHash);
        expect(result).to.equal(false);
    });

    it("can verify the correct password for second hash", async function() {
        const result = await password.verify("test123", this.secondHash);
        expect(result).to.equal(true);
    });

    it("does not verify an incorrect password for second hash", async function() {
        const result = await password.verify("whatever", this.secondHash);
        expect(result).to.equal(false);
    });
});