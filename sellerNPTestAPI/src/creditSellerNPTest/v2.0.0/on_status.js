const Mocha = require('mocha');
const { expect } = require('chai');

const contextTests = require('./context');

const { onSearchMessageTests } = require("./on_search");
const { onSelectMessageTests } = require("./on_select");
const { onInitMessageTests } = require("./on_init");
const { onConfirmMessageTests } = require("./on_confirm");
const { providerTests, fulfillmentTests, quoteTests, cancellationTermsTests, itemsCommonFieldsTests, paymentCommonTests, documentsTests } = require('./commonTests');

function messageTests(message, version) {
    const messageTestSuite = new Mocha.Suite('Verification of Message');
    try {
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
                    expect(item).to.include.all.keys("id", "descriptor", "price", "tags");
                }));

                itemsCommonFieldsTests(item, index, messageTestSuite);
            });
        }

        fulfillmentTests(message, messageTestSuite, { code: ["SANCTIONED", "INITIATED", "DISBURSED", "COMPLETED", "REJECTED", "PENDING"] })

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
                        expect(payment).to.have.property('type').that.is.a('string').and.equals('POST_FULFILLMENT');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have a valid 'id' that is a string`, function () {
                        expect(payment).to.have.property('id').that.is.a('string');
                    }));

                    if (payment?.type !== "ON_ORDER") {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have 'params' property (OPTIONAL)`, function () {
                            expect(payment).to.have.property('params').that.is.an('object');
                        }));

                        if (version === "2.0.1") {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params.amount' should be a string (OPTIONAL)`, function () {
                                expect(payment.params).to.have.property('amount').that.is.a('string');
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params.currency' should be a string (OPTIONAL)`, function () {
                                expect(payment.params).to.have.property('currency').that.is.a('string');
                            }));
                        }

                        if (version === "2.0.0") {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params.bank_code' should be a string (OPTIONAL)`, function () {
                                expect(payment.params).to.have.property('bank_code').that.is.a('string');
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params.virtual_payment_address' should be a string (OPTIONAL)`, function () {
                                expect(payment.params).to.have.property('virual_payment_address').that.is.a('string');
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params.bank_account_number' should be 'INR' (OPTIONAL)`, function () {
                                expect(payment.params).to.have.property('bank_account_number').that.is.a('string').and.equals('INR');
                            }));
                        }
                    }


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
        documentsTests(message, messageTestSuite);

        return messageTestSuite;
    } catch (err) {
        messageTestSuite.addTest(new Mocha.Test("on_status message could not be verified due to some property missing in payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(err);
        return messageTestSuite;
    }
}
async function on_status({ context, message } = {}, precedingRequest, aa_mandatory = true) {
    const testSuite = new Mocha.Suite(`${context?.action ? context?.action : "on_status"} Request Verification (${precedingRequest})`);
    const version = context?.version;
    const contextTestSuite = contextTests(context, context?.action);

    testSuite.addSuite(contextTestSuite);

    switch (precedingRequest) {
        case "on_search":
            testSuite.addSuite(onSearchMessageTests(message, "on_status"));
            break;
        case "on_select":
            testSuite.addSuite(onSelectMessageTests(message, "III", aa_mandatory, "on_status"));
            break;
        case "on_init":
            testSuite.addSuite(onInitMessageTests(message, "on_status"));
            break;
        default:
            const messageTestSuite = messageTests(message, version);
            testSuite.addSuite(messageTestSuite);
            break;
    }

    return testSuite;
};


module.exports = {
    on_status
}