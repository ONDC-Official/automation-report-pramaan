const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require('./context');
const { quoteTests } = require("./commonTest")
const { itemsCommonFieldsTests } = require("./commonTest")
const { providerTests } = require("./commonTest")
const { cancellationTermsTests } = require("./commonTest")
const { fulfillmentTests } = require("./commonTest")
const { paymentCommonTests } = require("./commonTest")
const { documentsTests } = require("./commonTest")
const response_verification = require("../../centralizedUtilities/responseVerification");

function messageTests(message, testCaseId) {
    const messageTestSuite = new Mocha.Suite(`on_confirm Request Verification`);
    try {
        const action = "on_confirm";
        let testcaseCounter = 1;

        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should have 'message' properties`, function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }));

        // messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should verify the contents of 'message.order'`, function () {
        //     expect(message.order).to.include.all.keys("id", "provider", "items", "quote", "fulfillments", "payments", "cancellation_terms");
        // }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.status' should be present and must be a string`, function () {
            expect(message.order.status).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.id'should be present and must be a string`, function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }));

        providerTests(message, messageTestSuite, testCaseId);

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items' should be an array that is not empty`, function () {
            expect(message.order.items).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, index) => {
                // messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should verify the contents of 'message.order.items[${index}]'`, function () {
                //     expect(item).to.include.all.keys("id", "descriptor", "category_ids", "price", "tags");

                // }));
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].category_ids' should be an array, that should not be empty`, function () {
                    expect(item.category_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.category_ids && item?.category_ids.length > 0) {
                    item.category_ids.forEach((categoryID, categoryIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].category_ids[${categoryIDIndex}]' should be string`, function () {
                            expect(categoryID).to.be.a("string");
                        }));
                    })
                };
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].fulfillment_ids' should be an array, that should not be empty`, function () {
                    expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                    item.category_ids.forEach((fulfillmentID, fulfillmentIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].fulfillment_ids[${fulfillmentIDIndex}]' should be string`, function () {
                            expect(fulfillmentID).to.be.a("string");
                        }));
                    })
                }

                itemsCommonFieldsTests(item, index, messageTestSuite, testCaseId);

            });
        }

        fulfillmentTests(message, messageTestSuite, { code: ["SANCTIONED", "PLACED"] }, testCaseId)

        quoteTests(message, messageTestSuite, testCaseId)

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments' should be an array`, function () {
            expect(message.order.payments).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.payments && message?.order?.payments.length > 0) {
            const platFormFeeAndSecurityFee = message?.order?.payments.find((payment) => payment?.tags);
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.payments should have an object containing buyer finder fee and security fee`, function () {
                expect(platFormFeeAndSecurityFee).to.exist.and.to.be.an("object");
            }));

            message?.order?.payments.forEach((payment, index) => {
                if (payment?.tags) {
                    paymentCommonTests(payment, index, action, messageTestSuite, testCaseId);

                } else {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should have a property 'type' that is 'POST_FULFILLMENT'`, function () {
                        expect(payment).to.have.property('type').that.is.a('string').and.to.be.oneOf(["ON_ORDER", "POST_FULFILLMENT", "PRE_ORDER"]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should have a valid 'id' that is a string`, function () {
                        expect(payment).to.have.property('id').that.is.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should have 'params' property`, function () {
                        expect(payment).to.have.property('params').that.is.an('object');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should have 'params' property with 'amount' as a string (OPTIONAL) `, function () {
                        expect(payment.params).to.have.property('amount').that.is.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should have 'params' property with 'currency' as 'INR' (OPTIONAL)`, function () {
                        expect(payment.params).to.have.property('currency').that.is.a('string').and.equals('INR');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should have a valid 'status' that is a string and is 'NOT-PAID'`, function () {
                        expect(payment).to.have.property('status').that.is.a('string').and.to.be.oneOf(["PAID", "NOT-PAID"]);
                    }));

                    if (message?.order?.payment?.time) {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].time' should be an object`, function () {
                            expect(payment.time).to.be.an('object');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].time.label' should be a string`, function () {
                            expect(payment.time.label).to.be.a('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].time.range' should be an object`, function () {
                            expect(payment.time.range).to.be.an('object');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].time.range.start' should be a string`, function () {
                            expect(payment.time.range.start).to.be.an('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].time.range.end' should be a string`, function () {
                            expect(payment.time.range.end).to.be.a('string');
                        }));
                    }
                }
            });
        }

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms' should be an array`, function () {
            expect(message.order.cancellation_terms).to.be.an("array");
        }));

        cancellationTermsTests(message, messageTestSuite, testCaseId);

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents' should be an array`, function () {
            expect(message.order.documents).to.be.an("array");
        }));

        documentsTests(message, messageTestSuite, testCaseId);

        return messageTestSuite;
    } catch (err) {
        messageTestSuite.addTest(new Mocha.Test("on_confirm request message object failed to be verified because of some missing payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return messageTestSuite;
    }
}




async function on_confirm({ context, message } = {}, testCaseId, amount = "",logs =[],constants ={}) {
    const testSuite = new Mocha.Suite('on_confirm Request Verification');
    const responseTestSuite = response_verification({ context, message }, logs,constants);
    const contextTestSuite = contextTests(context, 'on_confirm');
    const messageTestSuite = messageTests(message, testCaseId);



    testSuite.addSuite(contextTestSuite);
    testSuite.addSuite(messageTestSuite);

    return [testSuite,responseTestSuite];
};

module.exports = {
    on_confirm,
    onConfirmMessageTests: messageTests
}
