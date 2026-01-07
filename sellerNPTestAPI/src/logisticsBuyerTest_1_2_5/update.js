const Mocha = require("mocha");
const contextTests = require("./context");
const updateSchema = require("./schema/update.schema");
const { generateTests } = require("./common");

function updateMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, updateSchema, "Verification of Message for update");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function update({ context, message }) {
    try {
        const testSuite = new Mocha.Suite("update request verification");
        const constants = { action: "update", core_version: "1.2.5" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(updateMessageTests(message));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
