const Mocha = require('mocha');
const contextTests = require('./context');
const { expect } = require('chai');

module.exports = async function status({ context, message } = {}, logs = [], metaData = {}) {
    const testSuite = new Mocha.Suite("Status Request Verification");

    contextTests(context, testSuite, logs, { action: 'status', ...metaData });

    const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function() {
        expect(message, "Request body shouldn't be null and undefined").to.exist;
    }));

    messageTestSuite.addTest(new Mocha.Test("Verify if 'message.ref_id' exists and is a string", function() {
        const refId = message?.ref_id;
        expect(refId, "Ref ID should exist and be a string").to.exist.and.to.be.a('string');
    }));

    return testSuite;
};
