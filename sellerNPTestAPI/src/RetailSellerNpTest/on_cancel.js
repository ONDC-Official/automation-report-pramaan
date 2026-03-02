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