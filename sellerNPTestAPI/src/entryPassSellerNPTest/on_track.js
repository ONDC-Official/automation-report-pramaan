const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");

async function on_track({ context, message } = {}) {
    const testSuite = new Mocha.Suite(`on_track Request Verification`);
    try {
        contextTests(context, "on_track", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.tracking' which is an object", function () {
            expect(message.tracking).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.tracking' should have a property named 'status' which is a string", function () {
            expect(message.tracking.status).to.be.a("string");
        }));

        // message.tracking.location
        messageTestSuite.addTest(new Mocha.Test("'message.tracking' should have a property named 'location' which is an object", function () {
            expect(message.tracking.location).to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.tracking.location' should have a property named 'gps' which is a string", function () {
            expect(message.tracking.location.gps).to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.tracking.location' should have a property named 'updated_at' which is a string", function () {
            expect(message.tracking.location.updated_at).to.be.a("string");
        }));

        return testSuite;
    } catch (error) {
        testSuite.addTest(new Mocha.Test("on_track request failed to be verified because of some missing payload or some internal error", function() {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return testSuite;
    }
}

module.exports = {
    on_track
}
