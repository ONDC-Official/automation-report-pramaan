const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const confirmSchema = require("./schema/confirm.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);
        return log?.length ? log[log.length - 1]?.request : false;
    } catch (err) {
        console.log(err);
    }
}

function confirmMessageTests(message, logs = [], constants) {
    try {
        const messageTestSuite = generateTests(message, confirmSchema, "Verification of Message for Confirm", constants);

        const initLog = lastActionLog(logs, "init");
        const confirmLog = lastActionLog(logs, "confirm");

        if (initLog && confirmLog) {
            const initBilling = initLog?.message?.order?.billing || {};
            const confirmBilling = confirmLog?.message?.order?.billing || {};

            const initCreatedAt = initBilling?.created_at || "";
            const initUpdatedAt = initBilling?.updated_at || "";
            const confirmCreatedAt = confirmBilling?.created_at || "";
            const confirmUpdatedAt = confirmBilling?.updated_at || "";

            // created_at
            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bap_confirm_message_39] 'message.order.billing.created_at' should be a non-empty string", function () {
                expect(confirmCreatedAt).to.be.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bap_confirm_message_39] 'message.order.billing.created_at' should match /init created_at", function () {
                expect(confirmCreatedAt).to.equal(initCreatedAt);
            }));

            // updated_at
            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bap_confirm_message_40] 'message.order.billing.updated_at' should be a non-empty string", function () {
                expect(confirmUpdatedAt).to.be.a("string").that.is.not.empty;
            }));
            
            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bap_confirm_message_40] 'message.order.billing.updated_at' should match /init updated_at", function () {
                expect(confirmUpdatedAt).to.equal(initUpdatedAt);
            }));
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function confirm({ context, message }, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("confirm request verification");

        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(confirmMessageTests(message, logs, constants));
        const responseTestSuite = response_verification({ context, message }, logs, constants);

        return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
    }
};