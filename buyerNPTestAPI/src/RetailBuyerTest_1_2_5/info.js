const Mocha = require("mocha");
const contextTests = require("./context");
const infoSchema = require("./schema/info.schema");
const { generateTests } = require("./common");

function infoMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, infoSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function info({ context, message } = {}, logs, constants = {}) {
    try {
        const testSuite = new Mocha.Suite("info request verification");
        constants = { ...constants, action: "info" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(infoMessageTests({ context, message }, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
