const Mocha = require("mocha");
const contextTests = require("./context");
const cancelSchema = require("./schema/cancel.schema");
const { generateTests } = require("./common");

function cancelMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, cancelSchema, "Verification of Message for cancel");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function cancel({ context, message } = {}) {
    try {
        const testSuite = new Mocha.Suite("cancel request verification");
        const constants = { action: "cancel", version: "2.3.0" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(cancelMessageTests(message));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
