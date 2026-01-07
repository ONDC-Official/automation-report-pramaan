const Mocha = require("mocha");
const contextTests = require("./context");
const initSchema = require("./schema/init.schema");
const { generateTests } = require("./common");

function initMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, initSchema, "Verification of Message for Init");

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function init({ context, message }) {
    try {
        const testSuite = new Mocha.Suite("init request verification");
        const constants = { action: "init", core_version: "1.2.0" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(initMessageTests(message));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
