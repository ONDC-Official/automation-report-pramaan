const Mocha = require("mocha");
const contextTests = require("./context");
const onSearchSchema = require("./schema/on_search.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function onSearchMessageTests(message) {
    try {
        // generating the tests using recursive methods
        
        const messageTestSuite = generateTests(message, onSearchSchema, "Verification of Message");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_search({ context, message,logs = [],constants ={} }) {
    try {
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        const testSuite = new Mocha.Suite("on_search request verification");
        

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(onSearchMessageTests(message));

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}