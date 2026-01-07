const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require('chai');
const updateSchema = require("./schema/update.schema");
const { lastActionLog } = require("../bussinessTests/mobilityBussiness")
const { generateTests } = require("./common");


function updateMessageTests(message, logs = []) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, updateSchema, "Verification of Message for update");

        const onConfirmLogs = lastActionLog(logs, "on_confirm");
        let fulfillmentId;

        onConfirmLogs?.message?.order?.fulfillments.map((fulfillment) => {
            fulfillmentId = fulfillment?.id;
        });

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                    expect(fulfillment.id).to.exist.and.to.be.a("string").and.to.be.deep.equal(fulfillmentId);
                }));
            })
        }
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function update({ context, message }, logs = []) {
    try {
        const testSuite = new Mocha.Suite("update request verification");
        const constants = { action: "update", version: "1.2.0" };

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(updateMessageTests(message, logs));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
