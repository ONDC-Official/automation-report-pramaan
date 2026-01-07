const Mocha = require("mocha");
const contextTests = require("./context");
const confirmSchema = require("./schema/confirm.schema");
const { generateTests } = require("./common");
const { expect } = require("chai");
const response_verification = require("../centralizedUtilities/responseVerification");
function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);
        return log?.length ? log[log.length - 1]?.request : false;
    } catch (err) {
        console.log(err);
    }
}


function confirmMessageTests({ context, message } = {}, logs = [], constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, confirmSchema, "Verification of Message", constants);
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
        const initLog = lastActionLog(logs, "init");
        previousItemId = initLog?.message?.order?.items.map((item) => item.id)
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

module.exports = async function confirm({ context, message } = {}, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("confirm request verification");
        constants = { ...constants, action: "confirm" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(confirmMessageTests({ context, message }, logs, constants));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}
