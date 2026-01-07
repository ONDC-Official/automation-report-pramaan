const Mocha = require("mocha");
const contextTests = require("./context");
const onInitSchema = require("./schema/on_init.schema");
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

    if (message?.order?.items?.xinput) {
        if (message?.order?.items && message?.order?.items?.length > 0) {
            message?.order?.items.forEach((item, i) => {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an('object');
                }));

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput' should be an object`, function () {
                    expect(item.xinput).to.exist.and.to.be.an("object");
                }));
                //item.xinput.head
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.head' should be an object`, function () {
                    expect(item.xinput.head).to.exist.and.to.be.an("object");
                }));
                //item.xinput.head.descriptor
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.head.descriptor' should be an object`, function () {
                    expect(item.xinput.head.descriptor).to.exist.and.to.be.an("object");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.head.descriptor.name' should be a string`, function () {
                    expect(item.xinput.head.descriptor.name).to.exist.and.to.be.a("string");
                }));

                //item.xinput.head.index
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.head.index' should be an object`, function () {
                    expect(item.xinput.head.index).to.exist.and.to.be.an("object");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.head.index.min' should be  number`, function () {
                    expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.head.index.cur' should be  number`, function () {
                    expect(item.xinput.head.index.cur).to.exist.and.to.be.a("number");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.head.index.max' should be  number`, function () {
                    expect(item.xinput.head.index.max).to.exist.and.to.be.a("number");
                }));
                //item.xinput.head.headings
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.head.headings' should be an array`, function () {
                    expect(item.xinput.head.headings).to.exist.and.to.be.an("array");
                }));
                if (item?.xinput?.head.headings && item?.xinput?.head.headings.length > 0) {
                    item?.xinput?.head.headings.forEach((heading, headinIndex) => {
                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.head.headings[${headinIndex}]' should be a string`, function () {
                            expect(heading).to.exist.and.to.be.a("string");
                        }));
                    })
                }
                //item.xinput.form
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.form' should be an object`, function () {
                    expect(item.xinput.form).to.exist.and.to.be.an("object");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.form.id' should be a string`, function () {
                    expect(item.xinput.form.id).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.form.mime_type' should be a string`, function () {
                    expect(item.xinput.form.mime_type).to.exist.and.to.be.a("string");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]verify that 'message.order.items[${i}].xinput.form.url' should be a valid URL`, function () {
                    expect(item.xinput.form.url).to.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/);
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.form.resubmit' should be a boolean`, function () {
                    expect(item.xinput.form.resubmit).to.exist.and.to.be.a("boolean");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.form.multiple_sumbissions' should be a boolean`, function () {
                    expect(item.xinput.form.multiple_sumbissions).to.exist.and.to.be.a("boolean");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.required' should be a boolean`, function () {
                    expect(item.xinput.form).to.exist.and.to.be.an("object");
                }));
            })
        }
    }
    return testSuite;
}


function onInitMessageTests({ context, message } = {}, constants = {}, step, testCaseId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onInitSchema, "Verification of Message", constants);
        messageTestSuite.addSuite(itemsMessageTests(message, step, testCaseId));
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_init({ context, message } = {}, step = "", flowId = "", testCaseId,logs = [],constants ={}) {
    try {
        const testSuite = new Mocha.Suite(`on_init (${step}) request verification`);
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        constants = {
            ...constants,
            action: "on_init",
            version: "2.0.0",
            step: step,
            flow: flowId,
            testCaseId
        };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onInitMessageTests({ context, message }, constants, testCaseId));

        return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_init payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return testSuite;
    }
}