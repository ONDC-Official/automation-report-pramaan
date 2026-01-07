// const Mocha = require("mocha");
// const contextTests = require("./context");
// const onCancelSchema = require("./schema/on_cancel.schema");
// const { generateTests } = require("./common");


// function onCancelMessageTests(message) {
//     try {
//         // generating the tests using recursive methods
//         const messageTestSuite = generateTests(message, onCancelSchema, "Verification of Message");
//         return messageTestSuite;
//     } catch (err) {
//         console.log(err);
//     }
// }


// module.exports = async function on_cancel({ context, message }) {
//     try {
//         const testSuite = new Mocha.Suite("on_cancel request verification");
//         const constants = { action: "on_cancel", version: "2.0.0" };

//         testSuite.addSuite(contextTests(context, constants));
//         testSuite.addSuite(onCancelMessageTests(message));

//         return testSuite;
//     } catch (err) {
//         console.log(err);
//     }
// }

const Mocha = require("mocha");
const contextTests = require("./context");
const onCancelSchema = require("./schema/on_cancel.schema");
const { generateTests } = require("./common");


function onCancelMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onCancelSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function on_cancel({ context, message } = {}, logs = [], flowId = "") {
    const testSuite = new Mocha.Suite("on_cancel request verification");
    try {
        const constants = {
            action: "on_cancel",
            version: "2.0.0",
            state: "Cancelled",
            domain: context?.domain,
            flow: flowId
        };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onCancelMessageTests({ context, message }, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_cancel payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return testSuite;
    }
}