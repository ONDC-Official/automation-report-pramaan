const Mocha = require("mocha");
const contextTests = require("./context");
const trackSchema = require("./schema/track.schema");
const { generateTests } = require("./common");

function trackMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, trackSchema, "Verification of Message for track");

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function track({ context, message } = {}, constants) {
    try {
        const testSuite = new Mocha.Suite("track request verification");
        constants = { ...constants, action: "track", core_version: "1.2.0" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(trackMessageTests(message));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
