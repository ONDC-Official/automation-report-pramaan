const Mocha = require("mocha");
const contextTests = require("./context");
const confirmSchema = require("./schema/confirm.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function confirmMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, confirmSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function confirm({ context, message } = {},   logs = [],constants ={}) {
    try {
        const testSuite = new Mocha.Suite("confirm request verification");
        constants = { ...constants,  version:"2.0.0" };
        

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(confirmMessageTests({ context, message }, constants));
        const responseTestSuite = response_verification({ context, message }, logs,constant);

          return [ testSuite,responseTestSuite,];
    } catch (err) {
        console.log(err);
    }
}
