const Mocha = require("mocha");
const contextTests = require("./context");
const onUpdateSchema = require("./schema/on_update.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function onUpdateMessageTests({ context, message }) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onUpdateSchema, "Verification of Message");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_update({ context, message } = {}, step = "", logs = [], constants = {}) {
    const testSuite = new Mocha.Suite(`on_update (${step}) request verification`);
    try {
        constants = {
            ...constants,
            action: "on_update"
        };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onUpdateMessageTests({ context, message }));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_update payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return [testSuite];
    }
}