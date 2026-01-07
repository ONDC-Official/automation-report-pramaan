const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests  = require("./context");

async function cancel({ context, message } = {}, step) {
    try {
        const testSuite = new Mocha.Suite(`cancel (${step}) Request Verification`);
        contextTests(context, "cancel", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order_id' which is a string", function () {
            expect(message.order_id).to.exist.that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.cancellation_reason_id' which is a string", function () {
            expect(message.cancellation_reason_id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.descriptor' object", function () {
            expect(message.descriptor).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.descriptor.name' which is a string", function () {
            expect(message.descriptor.name).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.descriptor.code' which is a string", function () {
            expect(message.descriptor.code).to.exist.and.to.be.a("string");
        }));

        return testSuite;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    cancel
};