const Mocha = require("mocha");
const contextTests = require("./context");
const on_cancelSchema = require("./schema/on_cancel.schema");
const { generateTests } = require("./common");


function on_cancelMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, on_cancelSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_cancel({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite("on_cancel request verification");
        const constants = {
            action: "on_cancel",
            version: "2.3.0",
            state: "Cancelled"
        };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(on_cancelMessageTests({ context, message }, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}