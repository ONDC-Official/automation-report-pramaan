const Mocha = require("mocha");
const contextTests = require("./context");
const initSchema = require("./schema/init.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function initMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, initSchema, "Verification of Message for Init", constants);
        
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function init({ context, message } = {}, logs = [],constants ={}) {
    const testSuite = new Mocha.Suite("init request verification");
    try {
        // const constants = { action: "init", version: "2.0.0" };
        
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(initMessageTests({ context, message }, constants));
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        

         return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("init payload could not be verified due to some payload missing or internal error", function () {
            expect(true).to.equal(false);
        }))
        return testSuite;
    }
}
