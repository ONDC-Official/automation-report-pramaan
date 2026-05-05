const Mocha = require("mocha");
const contextTests = require("./context");
const trackSchema = require("./schema/track.schema"); 
const { generateTests } = require("./common");

function trackMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, trackSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function track({ context, message }, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("track request verification");
        constants = { ...constants, action: "track" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(trackMessageTests({ context, message }, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
