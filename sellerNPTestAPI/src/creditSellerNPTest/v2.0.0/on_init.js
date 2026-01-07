const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require('./context');
const { itemsCommonFieldsTests, quoteTests, providerTests, cancellationTermsTests, fulfillmentTests, xinputOnStatusGeneral, paymentCommonTests } = require('./commonTests');
const response_verification = require("../../centralizedUtilities/responseVerification");

const indexMap = {
    "I": 0,
    "II": 1,
    "III": 2,
    "IV": 4
}

function messageTests(message, action = "on_init", step = "", version = "") {
    const messageTestSuite = new Mocha.Suite('Verification of Message');
    try {
        
        messageTestSuite.addTest(new Mocha.Test("should have 'message' properties", function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("should verify the contents of 'message.order'", function () {
            if (action === "on_init") {
                expect(message.order).to.include.all.keys("provider", "items", "quote", "fulfillments", "payments", "cancellation_terms");
            } else if (action === "on_status") {
                expect(message.order).to.include.all.keys("provider", "items", "quote");
            }
        }));

        providerTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array that is not empty", function () {
            expect(message.order.items).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, index) => {
                messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.items[${index}]'`, function () {
                    expect(item).to.include.all.keys("id", "descriptor", "price", "tags", "xinput");
                }));

                itemsCommonFieldsTests(item, index, messageTestSuite);

                if (action === "on_init") {
                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.order.items[${index}].xinput'`, function () {
                        expect(item.xinput).to.include.all.keys("head", "form", "required");
                        expect(item.xinput.head).to.exist.and.to.be.an("object");
                        expect(item.xinput.form).to.exist.and.to.be.an("object");
                        expect(item.xinput.required).to.exist.and.to.be.an("boolean");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.order.items[${index}].xinput.head'`, function () {
                        expect(item.xinput.head).to.include.all.keys("descriptor", "index", "headings");
                        expect(item.xinput.head.descriptor).to.exist.and.to.be.an("object");
                        expect(item.xinput.head.index).to.exist.and.to.be.an("object");
                        expect(item.xinput.head.headings).to.exist.and.to.be.an("array");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.order.items[${index}].xinput.index'`, function () {
                        expect(item.xinput.head.index).to.include.all.keys("min", "cur", "max");
                        expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                        expect(item.xinput.head.index.cur).to.exist.and.to.be.a("number");
                        expect(item.xinput.head.index.max).to.exist.and.to.be.a("number");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].items.xinput.head.index.min'(OPTIONAL)`, function () {
                        expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.head.index.min' should be equal to '0'`, function () {
                        expect(item.xinput.head.index.min).to.equal(0);
                    }));

                    let max = 2;
                    let headingsArray = ["Account Information", "Emandate", "Loan Agreement"];
                    if (!item?.descriptor?.code.includes("PERSONAL_LOAN")) {
                        max++;
                        headingsArray.unshift("Entity KYC");
                    }

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.head.descriptor.name' should be a string that is equal to ${headingsArray[indexMap[step]]}`, function () {
                        expect(item.xinput.head.descriptor.name).to.be.a("string").and.to.equal(headingsArray[indexMap[step]]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.head.index.cur' should be equal to one of ${indexMap[step]}`, function () {
                        expect(item.xinput.head.index.cur).to.equal(indexMap[step]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.head.index.max' should be equal to ${max}`, function () {
                        expect(item.xinput.head.index.max).to.equal(max);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.head.headings' must have length ${headingsArray.length}`, function () {
                        expect(item.xinput.head.headings).to.have.lengthOf(headingsArray.length);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.head.headings' should be equal to ${headingsArray}`, function () {
                        expect(item.xinput.head.headings).to.eql(headingsArray);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.order.items[${index}].xinput.form'`, function () {
                        expect(item.xinput.form).to.include.all.keys("id", "mime_type", "url", "resubmit", "multiple_sumbissions");
                        expect(item.xinput.form.id).to.exist;
                        expect(item.xinput.form.mime_type).to.exist;
                        expect(item.xinput.form.url).to.exist;
                        expect(item.xinput.form.resubmit).to.exist;
                        expect(item.xinput.form.multiple_sumbissions).to.exist;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.id' should be a string`, function () {
                        expect(item.xinput.form.id).to.be.a("string");
                    }));

                    if (item?.descriptor?.code.includes("PERSONAL_LOAN")) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                            if (item?.xinput?.head?.index?.cur == 0) {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                            } else {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("application/html");
                            }
                        }));
                    } else {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                            if (item?.xinput?.head?.index?.cur == 1) {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                            } else {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("application/html");
                            }
                        }));
                    }

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.url' should be a string (OPTIONAL)`, function () {
                        expect(item.xinput.form.url).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.resubmit should be a boolean`, function () {
                        expect(item.xinput.form.resubmit).to.be.a("boolean");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.multiple_sumbissions should be a boolean`, function () {
                        expect(item.xinput.form.multiple_sumbissions).to.be.a("boolean")
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.required' should be a boolean`, function () {
                        expect(item.xinput.required).to.be.a("boolean");
                    }));
                } else if (action === "on_status") {
                    xinputOnStatusGeneral(item, messageTestSuite, index);
                }
            });
        }

        if (action === "on_init") {
            fulfillmentTests(message, messageTestSuite, { code: ["INITIATED"], name: ["Loan Initiated"] });
        }

        quoteTests(message, messageTestSuite);

        if (action === "on_init") {
            messageTestSuite.addTest(new Mocha.Test("'message.order.payments' should be an array", function () {
                expect(message.order.payments).to.exist.and.to.be.an("array").that.is.not.empty;
            }));

            if (message?.order?.payments && message?.order?.payments.length > 0) {

                const platFormFeeAndSecurityFee = message?.order?.payments.find((payment) => payment?.tags);
                messageTestSuite.addTest(new Mocha.Test(`message.order.payments should have an object containing buyer finder fee and security fee`, function () {
                    expect(platFormFeeAndSecurityFee).to.exist.and.to.be.an("object");
                }));

                message.order.payments.forEach((payment, index) => {
                    if (payment?.tags) {
                        paymentCommonTests(payment, index, messageTestSuite);
                    } else {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have a property 'type' that is equal to 'POST_FULFILLMENT'`, function () {
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

            cancellationTermsTests(message, messageTestSuite);
        }

        return messageTestSuite;
    } catch (err) {
        messageTestSuite.addTest(new Mocha.Test("on_init message could not be verified due to some property missing in payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(err);
        return messageTestSuite;
    }
}


async function on_init({ context, message } = {}, step,logs =[],constants= {}) {
    const testSuite = new Mocha.Suite(`on_init (${step}) Request Verification`);
    const responseTestSuite = response_verification({ context, message }, logs,constants);
    const version = context?.version
    const contextTestSuite = contextTests(context, 'on_init');
    const messageTestSuite = messageTests(message, "on_init", step, version);

    testSuite.addSuite(contextTestSuite);
    testSuite.addSuite(messageTestSuite);

    return [testSuite,responseTestSuite];
};


module.exports = {
    on_init,
    onInitMessageTests: messageTests
}