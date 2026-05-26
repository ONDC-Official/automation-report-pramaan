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


module.exports = async function on_track({ context, message } = {}, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite("on_track request verification");
    try {
        constants = {
            ...constants,
            action: "on_track"
        };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onTrackMessageTests({ context, message }));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.testSuite(`on_track payload could not be verified because of some missing payload or some internal error`, function () {
            expect(true).to.equal(false);
        }));

        return [testSuite];
    }
}