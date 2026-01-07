const chai = require('chai');
const contextTests = require("../v2.1.0/context");
const Mocha = require("mocha");

chai.use(require("chai-uuid"));

chai.Assertion.addMethod('email', function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = this._obj;

    this.assert(
        emailRegex.test(email),
        'expected #{this} to be a valid email address',
        'expected #{this} not to be a valid email address'
    );
});

module.exports = async function support({ context, message } = {}, logs = []) {
    const testSuite = new Mocha.Suite("Support Request Verification");

    contextTests(context, "support", testSuite, logs);

    const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

    messageTestSuite.addTest(new Mocha.Test("Verify if 'message.support.order_id' in the support payload is a valid UUID", async function () {
        expect(message.support.order_id).to.be.a.uuid();
    }));

    messageTestSuite.addTest(new Mocha.Test("Verify if 'message.support.phone' in the support payload is a string", async function () {
        expect(message.support.phone).to.be.a("string");
    }));

    messageTestSuite.addTest(new Mocha.Test("Verify if 'message.support.email' in the support payload is a valid email address", async function () {
        expect(message.support.email).to.be.an.email();
    }));

    return testSuite;
}
