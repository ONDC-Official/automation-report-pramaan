const contextTests = require("./context");
const Mocha = require("mocha");
const { expect } = require("chai");

function messageTests(message, testSuite) {
    try {
        const messageTestSuite = Mocha.Suite.create(testSuite, 'Verification of Message');

        messageTestSuite.addTest(new Mocha.Test("'message' should exist and should be an object", function () {
            expect(message).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'issue_id'", function () {
            expect(message).to.have.property("issue_id").that.is.a("string");
        }));
    } catch (err) {
        console.log(err);
        return err;
    }
}


async function issue_status({ context, message } = {}, step, version = "", domain) {
    try {
        const testSuite = new Mocha.Suite(`Issue Status (${step}) Request Verification`);

        contextTests(context, "issue_status", testSuite, version, domain);
        messageTests(message, testSuite, step);

        return testSuite;
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    issue_status
}