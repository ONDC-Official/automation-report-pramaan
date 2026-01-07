const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");

module.exports = async function status({ context, message } = {}, step, logs = []) {
    try {
        const testSuite = new Mocha.Suite(`status (${step}) Request Verification`);
       contextTests(context, "status", testSuite, logs);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist.that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.ref_id' or 'message.order_id' which is a string", function () {
            expect(message).to.satisfy(function (message) {
                return (message.hasOwnProperty('ref_id') && typeof message.ref_id === 'string') || (message.hasOwnProperty('order_id') && typeof message.order_id === 'string')
            });
        }));

        return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
}
