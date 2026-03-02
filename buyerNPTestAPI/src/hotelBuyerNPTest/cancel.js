const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const cancelSchema = require("./schema/cancel.schema");
const { generateTests } = require("./common");

function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);
        return log?.length ? log[log.length - 1]?.request : false;
    } catch (err) {
        console.log(err);
    }
}

function cancelMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, cancelSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function cancel({ context, message }, logs = []) {
    try {
        const testSuite = new Mocha.Suite("cancel request verification");
        const constants = { action: "cancel", version: "2.0.0" };
        const onConfirmLog = lastActionLog(logs, "on_confirm");

        testSuite.addSuite(contextTests(context, constants, logs));
        const messageSuite = cancelMessageTests({ context, message }, constants);
        messageSuite.addTest(new Mocha.Test(`'message.order_id' should be the same as in on_confirm'`, function () {
            expect(message?.order_id).to.equal(onConfirmLog?.message?.order?.id);
        }));
        testSuite.addSuite(messageSuite);

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
