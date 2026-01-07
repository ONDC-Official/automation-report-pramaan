const Mocha = require("mocha");
const contextTests = require("./context");
const onSelectSchema = require("./schema/on_select.schema");
const { generateTests } = require("./common");
const { expect } = require("chai");
const response_verification = require("../centralizedUtilities/responseVerification");


function onSelectMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        
       const messageTestSuite = generateTests({ context, message }, onSelectSchema, "Verification of Message", constants);
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_select({ context, message, error } = {},  test = "on_select",logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("on_select request verification");
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        constants = {
            ...constants,
            action: "on_select",
            version: "2.0.0"
        };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onSelectMessageTests({ context, message }, constants));

        

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}