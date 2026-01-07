const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require('./context');
const { providerTests, fulfillmentTests, quoteTests, cancellationTermsTests, itemsCommonFieldsTests, paymentCommonTests } = require('./commonTests');
const response_verification = require("../../centralizedUtilities/responseVerification");

function messageTests(message) {
    try {
        const messageTestSuite = new Mocha.Suite('Verification of Message');

        messageTestSuite.addTest(new Mocha.Test("should have 'message' properties", function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("should verify the contents of 'message.order'", function () {
            expect(message.order).to.include.all.keys("id", "provider", "items", "quote", "fulfillments", "payments", "cancellation_terms");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.id'should be present and must be a string", function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }))

        providerTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array that is not empty", function () {
            expect(message.order.items).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, index) => {
                messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.items[${index}]'`, function () {
                    expect(item).to.include.all.keys("id", "parent_item_id", "descriptor", "price", "tags");
                }));

                itemsCommonFieldsTests(item, index, messageTestSuite);
            });
        }

        fulfillmentTests(message, messageTestSuite, { code: ["SANCTIONED", "INITIATED"], name: ["Loan Sanctioned", "Loan Initiated"] })

        quoteTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("'message.order.payments' should be an array", function () {
            expect(message.order.payments).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.payments && message?.order?.payments.length > 0) {

            const platFormFeeAndSecurityFee = message?.order?.payments.find((payment) => payment?.tags);
            messageTestSuite.addTest(new Mocha.Test(`message.order.payments should have an object containing buyer finder fee and security fee`, function () {
                expect(platFormFeeAndSecurityFee).to.exist.and.to.be.an("object");
            }));

            message?.order?.payments.forEach((payment, index) => {
                if (payment?.tags) {
                    paymentCommonTests(payment, index, messageTestSuite);
                } else {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have a property 'type' that is 'POST_FULFILLMENT'`, function () {
                        expect(payment).to.have.property('type').that.is.a('string').and.to.be.oneOf(["ON_ORDER", "ON_FULFILLMENT", 'POST_FULFILLMENT']);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have a valid 'id' that is a string`, function () {
                        expect(payment).to.have.property('id').that.is.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have 'params' property with 'amount' and 'currency'`, function () {
                        expect(payment).to.have.property('params').that.is.an('object');
                        expect(payment.params).to.have.property('amount').that.is.a('string');
                        expect(payment.params).to.have.property('currency').that.is.a('string').and.equals('INR');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have a valid 'status' that is a string and is 'NOT-PAID'`, function () {
                        expect(payment).to.have.property('status').that.is.a('string').and.equals('NOT-PAID');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have a valid 'time' property`, function () {
                        expect(payment).to.have.property('time').that.is.an('object');
                        expect(payment.time).to.have.property('label').that.is.a('string').and.equals('INSTALLMENT');
                        expect(payment.time).to.have.property('range').that.is.an('object');
                        expect(payment.time.range).to.have.property('start').that.is.a('string');
                        expect(payment.time.range).to.have.property('end').that.is.a('string');
                    }));
                }
            });
        }

        messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation_terms' should be an array", function () {
            expect(message.order.cancellation_terms).to.be.an("array");
        }));

        cancellationTermsTests(message, messageTestSuite);

        return messageTestSuite;
    } catch (error) {
        console.error("Error in messageTests:", error);
        throw error;
    }
}


function amountChangeTest(message, amount) {
    try {
        const amountSuite = new Mocha.Suite('Verification of Amount Change');
        amountSuite.addTest(new Mocha.Test(`'message.order.quote.price.value' should be equal to ${amount}`, function () {
            expect(message.order.quote.price.value).to.be.equal(amount);
        }));

        return amountSuite;
    } catch (err) {
        console.log(err);
    }
}

async function on_confirm({ context, message } = {}, amount = "", flow_id,logs = [],constants ={}) {
    const testSuite = new Mocha.Suite('on_confirm Request Verification');
    const responseTestSuite = response_verification({ context, message }, logs,constants);
    const contextTestSuite = contextTests(context, 'on_confirm');
    const messageTestSuite = messageTests(message);

    if (amount !== "" && (flow_id === "CRD_7" || flow_id === "CRD_13")) {
        const amountSuite = amountChangeTest(message, amount);
        testSuite.addSuite(amountSuite);
    }

    testSuite.addSuite(contextTestSuite);
    testSuite.addSuite(messageTestSuite);

    return [testSuite,responseTestSuite];
};

module.exports = {
    on_confirm,
    onConfirmMessageTests: messageTests
}
