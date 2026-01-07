const Mocha = require("mocha");
const contextTests = require("./context");
const onStatusSchema = require("./schema/on_status.schema");
const { generateTests } = require("./common");
const { expect } = require("chai");

function itemsMessageTests(message, testCaseId) {

    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    const testSuite = new Mocha.Suite("status Validation");

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

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].type'  should be a string`, function () {
                expect(payment.type).to.be.a('string').and.to.be.oneOf(["PRE-ORDER", "ON-FULFILLMENT", "PART-PAYMENT"]);
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].status' should exist and be a non-empty string`, function () {
                expect(payment.status).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));

            if (payment?.params) {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params' should be an object`, function () {
                    expect(payment.params).to.exist.and.to.be.an("object");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.amount' should be a string`, function () {
                    expect(payment.params.amount).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.currency' should be a string`, function () {
                    expect(payment.params.currency).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.transaction_id' should be a string`, function () {
                    expect(payment.params.transaction_id).to.exist.and.to.be.a("string");
                }));

            }
        })
    }

    if (message?.order?.items?.xinput) {
        if (message?.order?.items && message?.order?.items?.length > 0) {
            message?.order?.items.forEach((item, i) => {
                testSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an('object');
                }));

                testSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput' should be an object`, function () {
                    expect(item.xinput).to.exist.and.to.be.an("object");
                }));
                //item.xinput.form
                testSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form' should be an object`, function () {
                    expect(item.xinput.form).to.exist.and.to.be.an("object");
                }));
                testSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form.id' should be a string`, function () {
                    expect(item.xinput.form.id).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form_response' should be an object`, function () {
                    expect(item.xinput.form_response).to.exist.and.to.be.an("object");
                }));

                testSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form_response.status' should be a string`, function () {
                    expect(item.xinput.form_response.status).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form_response.submission_id' should be a string`, function () {
                    expect(item.xinput.form_response.submission_id).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.required' should be a boolean`, function () {
                    expect(item.xinput.form).to.exist.and.to.be.an("object");
                }));
            })
        }
    }
    return testSuite;
}


function onStatusMessageTests({ context, message } = {}, constants = {}, step, testCaseId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onStatusSchema, "Verification of Message", constants);
        messageTestSuite.addSuite(itemsMessageTests(message, step, testCaseId));
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_status({ context, message } = {}, step = "", logs = [], constants = {}, testCaseId) {

    try {
        const testSuite = new Mocha.Suite(`on_status (${step}) request verification`);

        constants = {
            ...constants,
            action: "on_status",
            version: "2.0.0",
            step: step,
            testCaseId
        };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onStatusMessageTests({ context, message }, constants, testCaseId));

        return testSuite;
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("Could not verify on_status because either the payload is empty or some internal error occured", function () {
            expect(false).to.equal(true);
        }))
        return testSuite;
    }
}