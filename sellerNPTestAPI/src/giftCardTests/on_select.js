const Mocha = require("mocha");
const contextTests = require("./context");
const onSelectSchema = require("./schema/on_select.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function onSelectMessageTests(message) {
    try {
        // generating the tests using recursive methods
        
        const messageTestSuite = generateTests(message, onSelectSchema, "Verification of Message");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_select({ context, message,logs = [],constants = {} }) {
    try {
        const testSuite = new Mocha.Suite("on_select request verification");
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(onSelectMessageTests(message));

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}