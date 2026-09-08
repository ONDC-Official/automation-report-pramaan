const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onCancelSchema = require("./schema/on_cancel.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");
const { lastActionLog, verifyOrderIdMatches } = require("./orderReferenceChecks");

function onCancelMessageTests({ context, message }, constants, logs) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onCancelSchema, "Verification of Message", constants);

        const cancelLog = lastActionLog(logs, "cancel");
        const confirmLog = lastActionLog(logs, "confirm");

        // "cancel" (the outgoing request the harness itself sent) - GitHub issue #267
        if (cancelLog) {
            messageTestSuite.addTest(new Mocha.Test("'cancel' request: 'message.cancellation_reason_id' should be a non-empty string", function () {
                expect(cancelLog.message?.cancellation_reason_id).to.be.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test("'cancel' request: 'message.order_id' should be a non-empty string", function () {
                expect(cancelLog.message?.order_id).to.be.a("string").that.is.not.empty;
            }));

            const referenceOrderId = confirmLog?.message?.order?.id;
            if (referenceOrderId !== undefined) {
                messageTestSuite.addTest(new Mocha.Test("'cancel' request: 'message.order_id' should match the order id from the confirm request", function () {
                    expect(cancelLog.message?.order_id).to.equal(referenceOrderId);
                }));
            }
        }

        // on_cancel (the seller's response) - GitHub issue #267
        verifyOrderIdMatches(messageTestSuite, message, confirmLog);

        const cancelledBy = message?.order?.cancellation?.cancelled_by;
        const isBuyerInitiated = cancelledBy && context?.bap_id && cancelledBy === context.bap_id;
        if (isBuyerInitiated && cancelLog) {
            messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation.reason.id' should match the reason id sent in the 'cancel' request", function () {
                expect(message?.order?.cancellation?.reason?.id).to.equal(cancelLog.message?.cancellation_reason_id);
            }));
        }

        (message?.order?.fulfillments || []).forEach((fulfillment, index) => {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].state.descriptor.code' should be a non-empty string`, function () {
                expect(fulfillment?.state?.descriptor?.code).to.be.a("string").that.is.not.empty;
            }));
        });

        if (message?.order?.billing?.updated_at !== undefined) {
            messageTestSuite.addTest(new Mocha.Test("'message.order.billing.updated_at' should match 'context.timestamp'", function () {
                expect(message.order.billing.updated_at).to.equal(context?.timestamp);
            }));
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_cancel({ context, message }, type = "", logs = [], flowId) {
    try {
        const testSuite = new Mocha.Suite("on_cancel request verification");
        const constants = { action: "on_cancel", core_version: "1.2.5", state: "Cancelled" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onCancelMessageTests({ context, message }, constants, logs));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}
