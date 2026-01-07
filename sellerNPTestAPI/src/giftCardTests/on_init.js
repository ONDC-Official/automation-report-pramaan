const Mocha = require("mocha");
const contextTests = require("./context");
const onInitSchema = require("./schema/on_init.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function onInitMessageTests(message ) {
    try {
        // generating the tests using recursive methods
        
        const messageTestSuite = generateTests(message, onInitSchema, "Verification of Message");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_init({ context, message,logs = [],constants ={} }) {
    try {
        const testSuite = new Mocha.Suite("on_init request verification");
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(onInitMessageTests(message));

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}