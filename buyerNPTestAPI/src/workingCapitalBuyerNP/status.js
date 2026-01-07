const Mocha = require("mocha");
const contextTests = require("./context");
const statusSchema = require("./schema/status.schema");
const { generateTests } = require("./common");

function statusMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, statusSchema, "Verification of Message for status");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function status({ context, message }) {
    try {
        const testSuite = new Mocha.Suite("status request verification");
        const constants = { action: "status", version: "2.3.0" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(statusMessageTests(message));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
