const Mocha = require("mocha");
const contextTests = require("./context");
const onStatusSchema = require("./schema/on_status.schema");
const { generateTests } = require("./common");
const { expect } = require("chai");
const response_verification = require("../centralizedUtilities/responseVerification");

function onStatusMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onStatusSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_status({ context, message } = {}, step = "", logs = [], constants = {}) {
    const testSuite = new Mocha.Suite(`on_status (${step}) request verification`);
    try {
        let orderState = "In-progress";
        switch (step) {
            case "Order-delivered":
                orderState = "Completed";
                break;
            case "RTO-Delivered":
                orderState = "Cancelled";
                break;
            default:
                orderState = "In-progress";
                break;
        }

        constants = {
            ...constants,
            action: "on_status",
            step: step,
            orderState: orderState,
        };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onStatusMessageTests({ context, message }, constants));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("Could not verify on_status because either the payload is empty or some internal error occured", function () {
            expect(false).to.equal(true);
        }))
        return [testSuite];
    }
}