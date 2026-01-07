const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onUpdateSchema = require("./schema/on_update.schema");
const { generateTests } = require("./common");

function paymentMessageTests(message,  testCaseId){

    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    const testSuite = new Mocha.Suite("Payments Validation");

    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments' should be a non-empty array`, function () {
        expect(message.order.payments).to.exist.and.to.be.a("array");
    }));

      if (message?.order?.payments && message?.order?.payments?.length > 0) {
            message?.order?.payments.forEach((payment, paymentIndex) => {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}]' should be an object`, function () {
                    expect(payment).to.exist.and.to.be.a("object");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].id' should exist and be a non-empty string`, function () {
                    expect(payment.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
    
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].status' should exist and be a non-empty string`, function () {
                    expect(payment.status).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
                if(payment?.collected_by){
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].collected_by'  should be a string`, function () {
                    expect(payment.collected_by).to.be.a('string').and.to.be.oneOf(["BPP", "BAP"]);
                }));
            }
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].type'  should be a string`, function () {
                    expect(payment.type).to.be.a('string').and.to.be.oneOf(["PRE-ORDER", "ON-FULFILLMENT", "PART-PAYMENT"]);
                }));

                if (payment?.type !== "PART-PAYMENT") {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params' should be an object`, function () {
                    expect(payment.params).to.be.an("object");
                }));
    
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.amount' should exist and be a valid number string`, function () {
                    expect(payment.params.amount).to.exist.and.to.match(/^\d+(\.\d+)?$/);
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.currency' should exist and be a non-empty string`, function () {
                    expect(payment.params.currency).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
    
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.transaction_id' should exist and be a non-empty string`, function () {
                        expect(payment.params.transaction_id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));

                     testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.virtual_payment_address' should exist and be a numeric string`, function () {
                        expect(payment.params.virtual_payment_address).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                })); 
    
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.bank_account_number' should exist and be a numeric string`, function () {
                        expect(payment.params.bank_account_number).to.exist.and.to.match(/^\d+$/);
                    }));
                   
    
                }
    
       
        if (payment?.type !== "ON-FULFILLMENT") {
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags' should be an array with length not equal 0`, function () {
                expect(payment.tags).to.exist.and.to.be.an("array").to.have.length.above(0);
              }));
                    if (Array.isArray(payment.tags)) {
                        payment.tags.forEach((tag, tagIndex) => {
                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor' should be an object`, function () {
                                expect(tag.descriptor).to.exist.and.to.be.an("object");
                            }));
                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor.code' should be a string`, function () {
                                expect(tag.descriptor.code).to.exist.and.to.be.an("string");
                            }));
                            if (payment?.type === "PART-PAYMENT") {
                            if (Array.isArray(tag.list)) {
                                tag.list.forEach((listItem, listIndex) => {
                                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listIndex}].descriptor.code' should exist and be a non-empty string`, function () {
                                        expect(listItem.descriptor.code).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                                    }));
                                    
                                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listIndex}].value' should exist and be a non-empty string`, function () {
                                        expect(listItem.value).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                                    }));
                                });
                            }
                        }
                        });
                    
                }
            }
            });
        }
        return testSuite;

}

function onUpdateMessageTests({ context, message },testCaseId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onUpdateSchema, "Verification of Message");
        messageTestSuite.addSuite(paymentMessageTests(message, testCaseId));
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_update({ context, message } = {},  logs = [], flowId = "",testCaseId) {
    const testSuite = new Mocha.Suite(`on_update  request verification`);
    try {
        const constants = {
            action: "on_update",
            version: "2.0.0",
            domain: context?.domain,
            flow: flowId,
            testCaseId
        };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onUpdateMessageTests({ context, message },testCaseId));

        return testSuite;
    } catch (err) {
        console.log(err);
        return testSuite;
    }
}