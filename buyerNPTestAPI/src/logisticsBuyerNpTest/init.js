const Mocha = require("mocha");
const contextTests = require("./context");
const initSchema = require("./schema/init.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function initMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, initSchema, "Verification of Message for Init");

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function init({ context, message }, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("init request verification");


        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(initMessageTests(message));
        const responseTestSuite = response_verification({ context, message }, logs, constants);

        return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}
