const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onConfirmSchema = require("./schema/on_confirm.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function paymentMessageTests(message, testCaseId){

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
    
               testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].type'  should be a string`, function () {
                    expect(payment.type).to.be.a('string').and.to.be.oneOf(["PRE-ORDER", "ON-FULFILLMENT", "PART-PAYMENT"]);
                }));

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].status' should exist and be a non-empty string`, function () {
                    expect(payment.status).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
if(payment?.collected_by){
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].collected_by'  should be a string`, function () {
                    expect(payment.collected_by).to.be.a('string').and.to.be.oneOf(["BPP", "BAP"]);
                }));
            }
    if(payment?.params){
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params' should be an object`, function () {
                    expect(payment.params).to.be.an("object");
                }));
    
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.amount' should exist and be a valid number string`, function () {
                    expect(payment.params.amount).to.exist.and.to.match(/^\d+(\.\d+)?$/);
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.currency' should exist and be a non-empty string`, function () {
                    expect(payment.params.currency).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
                if (payment?.type === "ON-ORDER") {
    
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.transaction_id' should exist and be a non-empty string`, function () {
                        expect(payment.params.transaction_id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));
                }

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.virtual_payment_address' should exist and be a numeric string`, function () {
                        expect(payment.params.virtual_payment_address).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));

                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.bank_account_number' should exist and be a numeric string`, function () {
                        expect(payment.params.bank_account_number).to.exist.and.to.match(/^\d+$/);
                    }));
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.bank_code' should exist and be a non-empty string`, function () {
                        expect(payment.params.bank_code).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));
    
                
            }
               
                    if (Array.isArray(payment.tags)) {
                        payment.tags.forEach((tag, tagIndex) => {
                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor' should be an object`, function () {
                                expect(tag.descriptor).to.exist.and.to.be.an("object");
                            }));

                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor.code' should exist and be a non-empty string`, function () {
                                expect(tag.descriptor.code).to.exist.and.to.be.a("string").with.length.greaterThan(0);
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
                            }}
                        });
                    
                }
            });
        }
    return testSuite;
}


function onConfirmMessageTests({ context, message },testCaseId,) {
    try {
        // generating the tests using recursive methods
        
        const messageTestSuite = generateTests({ context, message }, onConfirmSchema, "Verification of Message");
        messageTestSuite.addSuite(paymentMessageTests(message,  testCaseId));
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_confirm({ context, message } = {},testCaseId,logs = [],constants = {}) {
    const testSuite = new Mocha.Suite("on_confirm request verification");
    try {
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onConfirmMessageTests({ context, message },testCaseId));

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_confirm payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return testSuite;
    }
}