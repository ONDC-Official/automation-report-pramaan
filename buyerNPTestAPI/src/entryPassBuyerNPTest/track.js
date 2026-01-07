const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");

module.exports = async function track({ context, message } = {}, logs = []) {
    try {
        const onConfirmOrderId = logs?.find((log) => log?.action === "on_confirm")?.request?.message?.order?.id;

        const testSuite = new Mocha.Suite(`track Request Verification`);

        contextTests(context, "track", testSuite, logs);
        
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order_id' which is a string", function () {
            expect(message.order_id).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order_id' should be equal to the 'message.order.id' sent in /on_confirm API", function () {
            expect(message.order_id).to.equal(onConfirmOrderId);
        }));

        return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
}
