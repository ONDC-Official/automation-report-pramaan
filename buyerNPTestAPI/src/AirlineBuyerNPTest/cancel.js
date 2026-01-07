const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function cancel({ context, message } = {}, logs = [], constants = {}) {
    try {
        const cancel_type = constants?.step === "cancel_soft" ? "SOFT_CANCEL" : "CONFIRM_CANCEL";

        const testSuite = new Mocha.Suite(`cancel (${cancel_type}) Request Verification`);
        contextTests(context, "cancel", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        const responseTestSuite = response_verification({ context, message }, logs, constants);

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist;
        }));

        //message.order.id
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order_id' which is a string ", function () {
            expect(message.order_id).to.exist.that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.cancellation_reason_id' which is a string", function () {
            expect(message.cancellation_reason_id).to.exist.that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.descriptor' which is an object", function () {
            expect(message.descriptor).to.exist.that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.descriptor.code' which is a string", function () {
            expect(message.descriptor).to.have.property("code").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.descriptor.code' should be equal to ${cancel_type}`, function () {
            expect(message.descriptor.code).to.equal(cancel_type);
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.descriptor.name' which is a string", function () {
            expect(message.descriptor).to.have.property("name").that.is.a("string");
        }));

        return [testSuite, responseTestSuite];
    }
    catch (error) {
        console.log(error);
        return error;
    }
}