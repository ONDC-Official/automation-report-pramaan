const Mocha = require("mocha");
const contextTests = require("./context");
const onCancelSchema = require("./schema/on_cancel.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function onCancelMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onCancelSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_cancel({ context, message }, type = "", logs = [], flowId) {
    try {
        const testSuite = new Mocha.Suite("on_cancel request verification");
        const constants = { action: "on_cancel", core_version: "1.2.5", state: "Cancelled" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onCancelMessageTests({ context, message }, constants));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}