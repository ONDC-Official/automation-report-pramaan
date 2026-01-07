const Mocha = require("mocha");
const contextTests = require("./context");
const onConfirmSchema = require("./schema/on_confirm.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function onConfirmMessageTests({ context, message }) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onConfirmSchema, "Verification of Message");

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_confirm({ context, message } = {}, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite("on_confirm request verification");
    try {
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        constants = {
            ...constants,
            action: "on_confirm",
            version: "2.0.0"
        };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onConfirmMessageTests({ context, message }));

         return [testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_confirm payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return testSuite;
    }
}