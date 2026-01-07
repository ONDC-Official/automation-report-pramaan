const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");
const { cancellationTermsTests, providerTests, fulfillmentTests, quoteTests, documentsTests, itemsCommonFieldsTests, paymentCommonTests } = require("./commonTests");

async function prePartPaymentTests({ context, message } = {}) {
    const testSuite = new Mocha.Suite("on_update Request Verification (Pre Part Payment)")
    try {
        const version = context?.version;
        testSuite.addSuite(contextTests(context, "on_update"));

        const messageTestSuite = new Mocha.Suite.create(testSuite, 'Verification of Message');

        messageTestSuite.addTest(new Mocha.Test("should have 'message' properties", function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("should verify the contents of 'message.order'", function () {
            expect(message.order).to.include.all.keys("id", "provider", "items", "quote", "fulfillments", "payments", "cancellation_terms", "documents");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.id'should be present and must be a string", function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }));

        providerTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array that is not empty", function () {
            expect(message.order.items).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message?.order?.items.forEach((item, index) => {
                messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.items[${index}]'`, function () {
                    expect(item).to.include.all.keys("id", "descriptor", "price", "tags");
                }));

                itemsCommonFieldsTests(item, index, messageTestSuite);

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].descriptor.code' should be a string`, function () {
                    expect(item.descriptor.code).to.be.a("string");
                }));
            });
        }

        fulfillmentTests(message, messageTestSuite, { code: ["DISBURSED"], name: ["Loan Disbursed"] })

        quoteTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("'message.order.payments' should be an array", function () {
            expect(message.order.payments).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.payments && message?.order?.payments.length > 0) {
            const prePartPayments = message?.order?.payments.filter(payment => payment?.time?.label === "PRE_PART_PAYMENT");

            messageTestSuite.addTest(new Mocha.Test(`should have atleast one pre part payment`, function () {
                expect(prePartPayments).to.be.an("array").that.is.not.empty;
            }))

            const platFormFeeAndSecurityFee = message?.order?.payments.find((payment) => payment?.tags);
            messageTestSuite.addTest(new Mocha.Test(`message.order.payments should have an object containing buyer finder fee and security fee`, function () {
                expect(platFormFeeAndSecurityFee).to.exist.and.to.be.an("object");
            }));

            message?.order?.payments.forEach((payment, index) => {
                if (payment?.tags) {
                    paymentCommonTests(payment, index, messageTestSuite);;
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



                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have a valid 'status' that is a string and is oneOf 'NOT-PAID' or 'PAID'`, function () {
                        expect(payment).to.have.property('status').that.is.a('string').and.is.oneOf(['NOT-PAID', "DEFERRED", 'PAID']);
                    }));

                    if (payment?.time?.label === "PRE_PART_PAYMENT") {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].time' should have a valid 'label' property`, function () {
                            expect(payment).to.have.property('time').that.is.an('object');
                            expect(payment.time).to.have.property('label').that.is.a('string').and.equals('PRE_PART_PAYMENT');
                        }));
                    } else {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have a valid 'time' property`, function () {
                            expect(payment).to.have.property('time').that.is.an('object');
                            expect(payment.time).to.have.property('label').that.is.a('string').and.is.oneOf(['DEFERRED', 'INSTALLMENT']);
                            expect(payment.time).to.have.property('range').that.is.an('object');
                            expect(payment.time.range).to.have.property('start').that.is.a('string');
                            expect(payment.time.range).to.have.property('end').that.is.a('string');
                        }));
                    }
                }
            });
        }

        messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation_terms' should be an array", function () {
            expect(message.order.cancellation_terms).to.be.an("array");
        }));

        cancellationTermsTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("'message.order.documents' should be an array", function () {
            expect(message.order.documents).to.be.an("array");
        }));

        documentsTests(message, messageTestSuite);

        return testSuite;
    } catch (err) {
        testSuite.addTest(new Mocha.Test("on_update request could not be verified due to some property missing in payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(err);
        return testSuite;
    }
}

module.exports = {
    on_updatePrePartPayment: prePartPaymentTests
}