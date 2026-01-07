const Mocha = require("mocha");
const contextTests = require("./context");
const updateSchema = require("./schema/update.schema");
const { generateTests } = require("./common");

function updateMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, updateSchema, "Verification of Message", constants);
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function update({ context, message }, logs = []) {
    try {
        const testSuite = new Mocha.Suite(`update request verification`);
        const constants = { action: "update", version: "2.0.0" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(updateMessageTests({ context, message }, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
