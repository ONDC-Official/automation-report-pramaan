const Mocha = require("mocha");
const contextTests = require("./context");
const onConfirmSchema = require("./schema/on_confirm.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function onConfirmMessageTests(message ) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, onConfirmSchema, "Verification of Message");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_confirm({ context, message,logs = [],constants= {} }) {
    try {
        const testSuite = new Mocha.Suite("on_confirm request verification");
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(onConfirmMessageTests(message));

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}