const Mocha = require("mocha");
const contextTests = require("./context");
const onUpdateSchema = require("./schema/on_update.schema");
const { generateTests } = require("./common");


function onUpdateMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, onUpdateSchema, "Verification of Message");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_update({ context, message }) {
    try {
        const testSuite = new Mocha.Suite("on_update request verification");
        const constants = { action: "on_update", version: "2.0.0" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(onUpdateMessageTests(message));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}