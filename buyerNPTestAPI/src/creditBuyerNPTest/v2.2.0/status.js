const Mocha = require('mocha');
const contextTests = require('./context');
const { expect } = require('chai');
async function status({ context, message } = {}, testCaseId, logs = []) {
    const testSuite = new Mocha.Suite("Status Request Verification");

    contextTests(context, 'status', testSuite, logs);

    const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");


    let testcaseCounter = 1;

    const getNextTestcaseId = () => {
        return testcaseCounter++;
    };


    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]Verify the presence of 'message' object`, function () {
        expect(message, "Request body shouldn't be null and undefined").to.exist;
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]Verify if 'message.ref_id' exists and is a string`, function () {
        const refId = message?.ref_id;
        expect(refId, "Ref ID should exist and be a string").to.exist.and.to.be.a('string');
    }));

    return testSuite;
};

module.exports = {
    status
}