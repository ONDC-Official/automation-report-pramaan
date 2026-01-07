const Mocha = require("mocha");
const contextTests = require("./context");
const selectSchema = require("./schema/select.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function selectMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, selectSchema, "Verification of Message", constants);
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function select({ context, message } = {}, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("select request verification");
        constants = { ...constants, action: "select" };
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(selectMessageTests({ context, message }, constants));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}
