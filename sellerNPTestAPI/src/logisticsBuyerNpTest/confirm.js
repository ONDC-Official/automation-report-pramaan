const Mocha = require("mocha");
const contextTests = require("./context");
const confirmSchema = require("./schema/confirm.schema");
const { generateTests } = require("./common");

function confirmMessageTests(message, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, confirmSchema, "Verification of Message for Confirm", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function confirm({ context, message }) {
    try {
        const testSuite = new Mocha.Suite("confirm request verification");
      
        const constants = { action: "confirm", core_version: "1.2.0", state: "Created" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(confirmMessageTests(message, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
