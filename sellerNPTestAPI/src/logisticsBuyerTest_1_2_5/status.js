const Mocha = require("mocha");
const contextTests = require("./context");
const statusSchema = require("./schema/status.schema");
const { generateTests } = require("./common");

function statusMessageTests(message, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, statusSchema, "Verification of Message for status", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function status({ context, message, constants }) {
    try {
        const testSuite = new Mocha.Suite("status request verification");
        const constants = { action: "status", core_version: "1.2.5" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(statusMessageTests(message, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
