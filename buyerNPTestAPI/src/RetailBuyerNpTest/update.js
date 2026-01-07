const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const updateSchema = require("./schema/update.schema");
const { generateTests } = require("./common");

function paymentMessageTests(message, testCaseId) {
    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    const testSuite = new Mocha.Suite("Payments Validation");
    if (message?.order?.payment) {
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payment' should be an object`, function () {
            expect(message.order.payment).to.exist.and.to.be.an("object");
        }));
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payment.@ondc/org/settlement_details' should be an array`, function () {
            expect(message.order.payment?.["@ondc/org/settlement_details"]).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.payment?.["@ondc/org/settlement_details"] && message?.order?.payment?.["@ondc/org/settlement_details"]?.length > 0) {
            message?.order?.payment?.["@ondc/org/settlement_details"].forEach((ondc, ondcIndex) => {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payment.@ondc/org/settlement_details[${ondcIndex}]' should be an object`, function () {
                    expect(ondc).to.exist.and.to.be.a("object");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payment.@ondc/org/settlement_details[${ondcIndex}].settlement_timestamp' should be a string`, function () {
                    expect(ondc.settlement_timestamp).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payment.@ondc/org/settlement_details[${ondcIndex}].settlement_counterparty' should be a string`, function () {
                    expect(ondc.settlement_counterparty).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payment.@ondc/org/settlement_details[${ondcIndex}].settlement_phase' should be a string`, function () {
                    expect(ondc.settlement_phase).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payment.@ondc/org/settlement_details[${ondcIndex}].settlement_type' should be a string`, function () {
                    expect(ondc.settlement_type).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payment.@ondc/org/settlement_details[${ondcIndex}].settlement_amount' should be a string`, function () {
                    expect(ondc.settlement_amount).to.exist.and.to.be.a("string");
                }));

            })
        }
    }



    return testSuite;
}

function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);
        return log?.length ? log[log.length - 1]?.request : false;
    } catch (err) {
        console.log(err);
    }
}
function updateMessageTests({ context, message } = {}, logs = [], constants = {}, testCaseId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, updateSchema, "Verification of Message", constants);
        messageTestSuite.addSuite(paymentMessageTests(message, testCaseId));
        const confirmLog = lastActionLog(logs, "confirm");
        previousItemId = confirmLog?.message?.order?.items.map((item) => item.id)
        if (message?.order?.items && message?.order?.items.length > 0) {
            message?.order?.items.forEach((item, index) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}]' should be a string and to be equal to previous call item_id`, function () {
                    expect(item.id).to.be.a("string").to.be.oneOf(previousItemId);
                }));
            })
        }
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function update({ context, message }, logs = [], type = "", constants = {}, testCaseId) {
    try {
        const testSuite = new Mocha.Suite(`update (${type}) request verification`);
        constants = { ...constants, action: "update", testCaseId };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(updateMessageTests({ context, message }, logs, constants, testCaseId));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
