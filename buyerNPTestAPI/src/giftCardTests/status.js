const Mocha = require("mocha");
const contextTests = require("./context");
const statusSchema = require("./schema/status.schema");
const { generateTests } = require("./common");

function statusMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, statusSchema, "Verification of Message for status", constants);
        
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function status({ context, message } = {}, logs = []) {
    const testSuite = new Mocha.Suite("status request verification");
    try {
        const constants = { action: "status", version: "2.0.0" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(statusMessageTests({ context, message }, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("status payload could not be verified due to some payload missing or internal error", function () {
            expect(true).to.equal(false);
        }))
        return testSuite;
    }
}
