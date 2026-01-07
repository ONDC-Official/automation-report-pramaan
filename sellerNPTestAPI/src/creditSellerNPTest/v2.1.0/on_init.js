const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require('./context');
const { itemsCommonFieldsTests, quoteTests, providerTests, cancellationTermsTests, fulfillmentTests, xinputOnStatusGeneral, paymentCommonTests } = require('./commonTests');
const response_verification = require("../../centralizedUtilities/responseVerification");

const indexMap = {
    "I": 0,
    "II": 1,
    "III": 2,
    "IV": 3
}

function messageTests(message, action = "on_init", step = "") {
    try {
        
        const messageTestSuite = new Mocha.Suite('Verification of Message');

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
                    expect(item).to.include.all.keys("id", "parent_item_id", "descriptor", "price", "tags", "xinput");
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

                    let max = 2;
                    let headingsArray = ["Account Information", "Emandate", "Loan Agreement"];
                    if (!item?.descriptor?.code.includes("PERSONAL_LOAN")) {
                        max++;
                        headingsArray.unshift("Entity KYC");
                    }

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.head.descriptor.name' should be ${headingsArray[indexMap[step]]}`, function () {
                        expect(item.xinput.head.descriptor.name).to.be.a("string").and.to.equal(headingsArray[indexMap[step]]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.order.items[${index}].xinput.index'`, function () {
                        expect(item.xinput.head.index).to.include.all.keys("min", "cur", "max");
                        expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                        expect(item.xinput.head.index.cur).to.exist.and.to.be.a("number");
                        expect(item.xinput.head.index.max).to.exist.and.to.be.a("number");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.head.index.min' should be equal to '0'`, function () {
                        expect(item.xinput.head.index.min).to.equal(0);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.head.index.cur' should be equal ${indexMap[step]}`, function () {
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

                    if (item.descriptor.code.includes("PERSONAL_LOAN")) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                            if (item.xinput.head.index.cur == 0) {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                            } else {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("application/html");
                            }
                        }));
                    } else {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                            if (item.xinput.head.index.cur == 1) {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                            } else {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("application/html");
                            }
                        }));
                    }

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.url' should be a string`, function () {
                        expect(item.xinput.form.url).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.resubmit should be a 'boolean' `, function () {
                        expect(item.xinput.form.resubmit).to.be.a("boolean");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.multiple_sumbissions should be a 'boolean' `, function () {
                        expect(item.xinput.form.multiple_sumbissions).to.be.a("boolean");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.xinput' should be 'boolean'`, function () {
                        expect(item.xinput.required).to.be.a('boolean');
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

            cancellationTermsTests(message, messageTestSuite);
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


async function on_init({ context, message } = {}, step,logs=[],constants ={}) {
    const testSuite = new Mocha.Suite(`on_init (${step}) Request Verification`);
    const responseTestSuite = response_verification({ context, message }, logs,constants);

    const contextTestSuite = contextTests(context, 'on_init');
    const messageTestSuite = messageTests(message, "on_init", step);

    testSuite.addSuite(contextTestSuite);
    testSuite.addSuite(messageTestSuite);

    return [testSuite,responseTestSuite];
};


module.exports = {
    on_init,
    onInitMessageTests: messageTests
}