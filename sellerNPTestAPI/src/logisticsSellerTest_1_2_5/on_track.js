const Mocha = require("mocha");
const contextTests = require("./context");
const onTrackSchema = require("./schema/on_track.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function onTrackMessageTests({ context, message }) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onTrackSchema, "Verification of Message");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function on_track({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite("on_track request verification");
        const constants = { action: "on_track", core_version: "1.2.5" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onTrackMessageTests({ context, message }));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}