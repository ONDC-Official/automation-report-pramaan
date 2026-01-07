const Mocha = require("mocha");
const contextTests = require("./context");
const onStatusSchema = require("./schema/on_status.schema");
const { generateTests } = require("./common");


function onStatusMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, onStatusSchema, "Verification of Message");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_status({ context, message }) {
    try {
        const testSuite = new Mocha.Suite("on_status request verification");
        const constants = { action: "on_status", version: "2.0.0" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(onStatusMessageTests(message));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}