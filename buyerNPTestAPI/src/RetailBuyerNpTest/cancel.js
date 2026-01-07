const Mocha = require("mocha");
const contextTests = require("./context");
const cancelSchema = require("./schema/cancel.schema");
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

function cancelMessageTests({ context, message } = {}, constants = {}, logs = []) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, cancelSchema, "Verification of Message", constants);
        const confirmLog = lastActionLog(logs, "confirm");
        previousItemId = confirmLog?.message?.order?.items.map((item) => item.id)
        if (message?.order?.items && message?.order?.items.length > 0) {
            message?.order?.items.forEach((item, itemIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${itemIndex}]' should be a string and to be equal to previous call item_id`, function () {
                    expect(item.id).to.be.a("string").to.be.oneOf(previousItemId);
                }));
            })
        }
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function cancel({ context, message }, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("cancel request verification");
        constants = { ...constants, action: "cancel" };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(cancelMessageTests({ context, message }, constants, logs));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}
