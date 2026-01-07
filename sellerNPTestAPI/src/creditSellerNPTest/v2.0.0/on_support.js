const chai = require('chai');
const { expect } = require('chai');
chai.use(require("chai-uuid"));
const contextTests = require("./context");
const Mocha = require("mocha");

chai.Assertion.addMethod('email', function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = this._obj;

    this.assert(
        emailRegex.test(email),
        'expected #{this} to be a valid email address',
        'expected #{this} not to be a valid email address'
    );
});

async function on_support({ context, message }) {
    const testSuite = new Mocha.Suite("on_support Request Verification");

    contextTests(context, "on_support");

    const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

    messageTestSuite.addTest(new Mocha.Test("should verify the content of 'message.support.order_id' in the support payload", async function () {
        expect(message.support.order_id).to.be.a.uuid();
    }));

    messageTestSuite.addTest(new Mocha.Test("should verify the content of 'message.support.phone' in the support payload", async function () {
        expect(message.support.phone).to.be.a("string");
    }));

    messageTestSuite.addTest(new Mocha.Test("should verify the content of 'message.support.email' in the support payload", async function () {
        expect(message.support.email).to.be.an.email();
    }));

    messageTestSuite.addTest(new Mocha.Test("should verify the content of 'message.support.email' in the support payload", async function () {
        expect(message.support.url).to.be.a("string");
    }));

    return testSuite;
}

module.exports = {
    on_support
}