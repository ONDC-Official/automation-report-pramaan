const Mocha = require("mocha");
const contextTests = require("./context");
const cancelSchema = require("./schema/cancel.schema");
const { generateTests } = require("./common");

function cancelMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, cancelSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function cancel({ context, message }, logs = []) {
    try {
        const testSuite = new Mocha.Suite("cancel request verification");
        const constants = { action: "cancel", version: "2.0.0" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(cancelMessageTests({ context, message }, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
