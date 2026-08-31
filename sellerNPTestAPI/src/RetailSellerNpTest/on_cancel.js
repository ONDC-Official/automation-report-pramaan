const Mocha = require("mocha");
const contextTests = require("./context");
const onCancelSchema = require("./schema/on_cancel.schema");
const { generateTests } = require("./common");
const { expect } = require('chai');
const response_verification = require("../centralizedUtilities/responseVerification");

function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);

        return log && log.length ? log?.pop()?.request : false;
    } catch (err) {
        console.log(err);
    }
}
function onCancelMessageTests({ context, message }, constants, logs) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onCancelSchema, "Verification of Message", constants);

        const SNP_CANCELLATION_REASON_CODES = ["002", "021", "022", "023", "024", "011", "013", "014", "016", "018"];
        const reasonId = message?.order?.cancellation?.reason?.id;
        // Who actually cancelled can't be determined by comparing NP ids -
        // context.bap_id/bpp_id can be identical in a workbench-to-workbench
        // self-test. Instead, check transaction history: if the buyer's own
        // 'cancel' request is present in this transaction's logs, this is a
        // buyer-initiated cancellation and reason.id must be the exact value
        // the buyer sent - not just any buyer-side code. Otherwise this must
        // be a seller/merchant-initiated cancellation.
        const cancelLog = lastActionLog(logs, "cancel");
        const buyerReasonId = cancelLog?.message?.cancellation_reason_id;
        messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation.reason.id' should match whoever actually initiated the cancellation", function () {
            if (cancelLog) {
                expect(reasonId).to.equal(buyerReasonId);
            } else {
                expect(reasonId).to.be.oneOf(SNP_CANCELLATION_REASON_CODES);
            }
        }));

        const initLogs = lastActionLog(logs, "init")
        const initCreatedAt = initLogs?.message?.order?.billing?.created_at
        const initUpdatedAt = initLogs?.message?.order?.billing?.updated_at
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.created_at' which is an object", function () {
            expect(message.order.billing.created_at).to.be.a("string").and.to.be.equal(initCreatedAt);
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.updated_at' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.updated_at).to.exist.and.to.be.a("string").and.to.be.equal(initUpdatedAt);
        }));


        if (constants?.flow === "RET_1b") {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment' which is an object`, function () {
                expect(message.order.payment).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.status' which is a string`, function () {
                expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.equal("NOT-PAID");
            }));
        }
        if (constants.flow === "RET_1") {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment' which is an object`, function () {
                expect(message.order.payment).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.status' which is a string to be PAID`, function () {
                expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.equal("PAID");
            }));

        }
        if (constants.flow !== "RET_1" && constants.flow !== "RET_1b") {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment' which is an object`, function () {
                expect(message.order.payment).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.status' which is a string to be PAID`, function () {
                expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.oneOf(["PAID", "NOT-PAID"]);
            }));
        }
        const confirmLogs = lastActionLog(logs, "confirm")
        const confirmCreatedAt = confirmLogs?.message?.order?.created_at
        const confirmUpdatedAt = confirmLogs?.message?.order?.updated_at
        const cancelTimestamp = context?.timestamp
        const updatedAtDate = new Date(message.order.updated_at);
        const cancelDate = new Date(cancelTimestamp);
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is an object", function () {
            expect(message.order.created_at).to.be.a("string").and.to.be.equal(confirmCreatedAt);
        }));
        // messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string (OPTIONAL)", function () {
        //     // expect(message.order.updated_at).to.exist.and.to.be.a("string").and.to.be.greaterThanOrEqual(cancelTimestamp);
        // }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string (OPTIONAL)", function () {
            expect(message.order.updated_at).to.exist.and.to.be.a("string");
            expect(updatedAtDate).to.be.greaterThanOrEqual(cancelDate);
        }));
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function on_cancel({ context, message } = {}, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite("on_cancel request verification");
    try {
        constants = {
            ...constants,
            action: "on_cancel",
            state: "Cancelled",
        };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(response_verification.own_sync_response_verification({ context }, logs));
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onCancelMessageTests({ context, message }, constants, logs));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_cancel payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return [testSuite];
    }
}