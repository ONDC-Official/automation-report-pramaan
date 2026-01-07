const Mocha = require("mocha");
const { expect } = require('chai');
const contextTests = require("./context");
const cancelSchema = require("./schema/cancel.schema");
const { generateTests } = require("./common");

function cancelMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, cancelSchema, "Verification of Message for cancel");

        messageTestSuite.addTest(new Mocha.Test("Verify that the 'message.order.cancellation_reason_id' should be a valid enum", function () {
            expect(message.cancellation_reason_id).to.exist.and.to.be.oneOf(["004", "005", "007", "996"]);
        }));


        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function cancel({ context, message }) {
    try {
        const testSuite = new Mocha.Suite("cancel request verification");
        const constants = { action: "cancel", core_version: "1.2.5" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(cancelMessageTests(message));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
