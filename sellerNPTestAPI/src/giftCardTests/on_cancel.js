const Mocha = require("mocha");
const contextTests = require("./context");
const onCancelSchema = require("./schema/on_cancel.schema");
const { generateTests } = require("./common");


function onCancelMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, onCancelSchema, "Verification of Message");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_cancel({ context, message }) {
    try {
        const testSuite = new Mocha.Suite("on_cancel request verification");
        const constants = { action: "on_cancel", version: "2.0.0" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(onCancelMessageTests(message));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}