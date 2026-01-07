const Mocha = require("mocha");
const contextTests = require("./context");
const initSchema = require("./schema/init.schema");
const { generateTests } = require("./common");
const { expect } = require("chai");
const response_verification = require("../centralizedUtilities/responseVerification");

function itemsMessageTests(message, testCaseId, flowId) {

    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    const testSuite = new Mocha.Suite("Init Validation");

    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments' should be a non-empty array`, function () {
        expect(message.order.payments).to.exist.and.to.be.a("array");
    }));
    if (message?.order?.payments && message?.order?.payments.length > 0) {
        message?.order?.payments.forEach((payment, paymentIndex) => {
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}]' should be an object`, function () {
                expect(payment).to.exist.and.to.be.an("object");
            }));
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].collected_by'  should be a string`, function () {
                expect(payment.collected_by).to.be.a('string').and.to.be.oneOf(["BPP", "BAP"]);
            }));
            if (flowId === "LI_1") {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].type'  should be a string`, function () {
                    expect(payment.type).to.be.a('string').and.to.be.oneOf(["PRE-ORDER", "ON-FULFILLMENT", "PART-PAYMENT"]);
                }));

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].status' should exist and be a non-empty string`, function () {
                    expect(payment.status).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
            }
        })
    }

    if (message?.order?.items && message?.order?.items.length > 0) {
        message?.order?.items.forEach((item, itemIndex) => {
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${itemIndex}]' should be an object`, function () {
                expect(item).to.exist.and.to.be.an("object");
            }));


            if (item?.xinput) {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${itemIndex}].xinput' should be an object`, function () {
                    expect(item.xinput).to.exist.and.to.be.an("object");
                }));

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${itemIndex}].xinput.form' should be an object`, function () {
                    expect(item.xinput.form).to.exist.and.to.be.an("object");
                }));

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${itemIndex}].xinput.form.id' should be a string`, function () {
                    expect(item.xinput.form.id).to.exist.and.to.be.a("string");
                }));

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${itemIndex}].xinput.form_response' should be an object`, function () {
                    expect(item.xinput.form_response).to.exist.and.to.be.an("object");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${itemIndex}].xinput.form_response.status' should be a string`, function () {
                    expect(item.xinput.form_response.status).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${itemIndex}].xinput.form_response.submission_id' should be a string`, function () {
                    expect(item.xinput.form_response.submission_id).to.exist.and.to.be.a("string");
                }));

            }
        })
    }

    return testSuite;
}


function initMessageTests({ context, message } = {}, constants = {}, step, testCaseId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, initSchema, "Verification of Message", constants);
        messageTestSuite.addSuite(itemsMessageTests(message, step, testCaseId));
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function init({ context, message } = {}, step = "", flowId = "", testCaseId, logs = [], constants = {},) {
    try {
        const testSuite = new Mocha.Suite(`init (${step}) request verification`);
        constants = { ...constants,  version: "2.0.0",  testCaseId };
        
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(initMessageTests({ context, message }, constants, testCaseId));
        const responseTestSuite = response_verification({ context, message }, logs,constants);

         return [ testSuite,responseTestSuite,];
    } catch (err) {
        console.log(err);
    }
}
