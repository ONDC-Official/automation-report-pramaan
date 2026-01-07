const Mocha = require("mocha");
const contextTests = require("./context");
const initSchema = require("./schema/init.schema");
const { expect } = require("chai");
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

function initMessageTests({ context, message } = {}, logs = [], constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, initSchema, "Verification of Message", constants);
        const selectLog = lastActionLog(logs, "select");
        previousItemId = selectLog?.message?.order?.items.map((item) => item.id)
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

module.exports = async function init({ context, message } = {}, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("init request verification");
        constants = { ...constants, action: "init" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(initMessageTests({ context, message }, logs, constants));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}
