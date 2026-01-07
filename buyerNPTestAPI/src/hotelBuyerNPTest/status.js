const Mocha = require("mocha");
const contextTests = require("./context");
const statusSchema = require("./schema/status.schema");
const { generateTests } = require("./common");

function statusMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, statusSchema, "Verification of Message", constants);
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function status({ context, message }, logs = []) {
    try {
        const testSuite = new Mocha.Suite("status request verification");
        const constants = { action: "status", version: "2.0.0" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(statusMessageTests({ context, message }, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
