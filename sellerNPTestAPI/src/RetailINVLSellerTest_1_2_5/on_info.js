const Mocha = require("mocha");
const contextTests = require("./context");
const onInfoSchema = require("./schema/on_info.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function onInfoMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onInfoSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function on_info({ context, message } = {}, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite("on_info request verification");
    try {
        constants = {
            ...constants,
            action: "on_info",
        };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onInfoMessageTests({ context, message }, constants));


        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_info payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return [testSuite];
    }
}