const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require('./context');
const { quoteTests } = require("./commonTest")
const { itemsCommonFieldsTests } = require("./commonTest")
const { providerTests } = require("./commonTest")
const { xinputOnStatusGeneral } = require("./commonTest")
const { cancellationTermsTests } = require("./commonTest")
const { fulfillmentTests } = require("./commonTest")
const { paymentCommonTests } = require("./commonTest")
const response_verification = require("../../centralizedUtilities/responseVerification");

function messageTests(message, step, testCaseId, action = "on_init") {
    const messageTestSuite = new Mocha.Suite("on_init Request Verification");
    try {
        
        const action = "on_init";
        let testcaseCounter = 1;

        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should have 'message' properties`, function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should verify the contents of 'message.order'`, function () {
            if (action === "on_init") {
                expect(message.order).to.include.all.keys("provider", "items", "quote", "fulfillments", "payments", "cancellation_terms");
            } else if (action === "on_status") {
                expect(message.order).to.include.all.keys("provider", "items", "quote");
            }
        }));

        providerTests(message, messageTestSuite, testCaseId);

        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_185] 'message.order.items' should be an array that is not empty`, function () {
            expect(message.order.items).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, index) => {
                // messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should verify the contents of 'message.order.items[${index}]'`, function () {
                //     expect(item).to.include.all.keys("id", "descriptor", "category_ids", "price", "tags", "xinput");

                // }));
                messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_186] 'message.order.items[${index}].category_ids' should be an array, that should not be empty`, function () {
                    expect(item.category_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.category_ids && item?.category_ids.length > 0) {
                    item.category_ids.forEach((categoryID, categoryIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_187]'message.order.items[${index}].category_ids[${categoryIDIndex}]' should be string`, function () {
                            expect(categoryID).to.be.a("string");
                        }));
                    })
                };
                messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_188] 'message.order.items[${index}].fulfillment_ids' should be an array, that should not be empty`, function () {
                    expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                    item.category_ids.forEach((fulfillmentID, fulfillmentIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_189] 'message.order.items[${index}].fulfillment_ids[${fulfillmentIDIndex}]' should be string`, function () {
                            expect(fulfillmentID).to.be.a("string");
                        }));
                    })
                }

                itemsCommonFieldsTests(item, index, messageTestSuite, testCaseId);



                if (step === "III") {
                    xinputOnStatusGeneral(item, messageTestSuite, index, testCaseId)
                }

                if (action === "on_init") {
                    messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_285] should validate the contents of 'message.order.items[${index}].xinput'`, function () {
                        // expect(item.xinput).to.include.all.keys("head", "form", "required");
                        expect(item.xinput.form).to.exist.and.to.be.an("object");
                        if (step !== "III") {
                            expect(item.xinput.head).to.exist.and.to.be.an("object");

                            expect(item.xinput.required).to.exist.and.to.be.an("boolean");
                        }
                    }));
                    if (step !== "III") {
                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_286] should validate the contents of 'message.order.items[${index}].xinput.head'`, function () {
                            expect(item.xinput.head).to.include.all.keys("descriptor", "index", "headings");
                            expect(item.xinput.head.descriptor).to.exist.and.to.be.an("object");
                            expect(item.xinput.head.index).to.exist.and.to.be.an("object");
                            expect(item.xinput.head.headings).to.exist.and.to.be.an("array");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_287] 'message.order.items[${index}].xinput.head.descriptor.name' should be 'Customer Information'`, function () {
                            expect(item.xinput.head.descriptor.name).to.be.a("string").and.to.equal("Customer Information");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_288] should validate the contents of 'message.order.items[${index}].xinput.index'`, function () {
                            expect(item.xinput.head.index).to.include.all.keys("min", "cur", "max");
                            expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                            expect(item.xinput.head.index.cur).to.exist.and.to.be.a("number");
                            expect(item.xinput.head.index.max).to.exist.and.to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_289] Verify if 'message.order.items[${index}].items.xinput.head.index.min'(OPTIONAL)`, function () {
                            expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_290] 'message.order.items[${index}].xinput.head.index.min' should be equal to '0'`, function () {
                            expect(item.xinput.head.index.min).to.equal(0);
                        }));

                        if (item?.descriptor?.code.includes("PERSONAL_LOAN")) {
                            messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_291] 'message.order.items[${index}].xinput.head.index.cur' should be equal to one of [0, 1, 2]`, function () {
                                expect(item.xinput.head.index.cur).to.oneOf([0, 1, 2]);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_292] 'message.order.items[${index}].xinput.head.index.max' should be equal to '1'`, function () {
                                expect(item.xinput.head.index.max).to.equal(1);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_293] 'message.order.items[${index}].xinput.head.headings' must have length '3'`, function () {
                                expect(item.xinput.head.headings).to.have.lengthOf(3);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_294] 'message.order.items[${index}].xinput.head.headings' should be equal to ["Account Information", "Emandate", "Loan Agreement"]`, function () {
                                expect(item.xinput.head.headings).to.eql(["Account Information", "Emandate", "Loan Agreement"]);
                            }));
                        } else {
                            messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_295] 'message.order.items[${index}].xinput.head.index.cur' should be equal to one of [0, 1, 2, 3]`, function () {
                                expect(item.xinput.head.index.cur).to.oneOf([0, 1, 2, 3]);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_296] 'message.order.items[${index}].xinput.head.index.max' should be equal to '1'`, function () {
                                expect(item.xinput.head.index.max).to.equal(1);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_297] 'message.order.items[${index}].xinput.head.headings' must have length '2'`, function () {
                                expect(item.xinput.head.headings).to.have.lengthOf(2);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_298] 'message.order.items[${index}].xinput.head.headings' should be equal to ["EMANDATE","ESIGN"]`, function () {
                                expect(item.xinput.head.headings).to.eql(["EMANDATE", "ESIGN"]);
                            }));
                        };
                    };

                    messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_298] should validate the contents of 'message.order.items[${index}].xinput.form'`, function () {
                        // expect(item.xinput.form).to.include.all.keys("id", "mime_type", "url", "resubmit", "multiple_sumbissions");
                        expect(item.xinput.form.id).to.exist;
                        if (step !== "III") {
                            expect(item.xinput.form.mime_type).to.exist;
                            expect(item.xinput.form.url).to.exist;
                            expect(item.xinput.form.resubmit).to.exist;
                            expect(item.xinput.form.multiple_sumbissions).to.exist;
                        }
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_299] 'message.order.items[${index}].xinput.form.id' should be a string`, function () {
                        expect(item.xinput.form.id).to.be.a("string");
                    }));
                    if (step !== "III") {
                        if (item?.descriptor?.code.includes("PERSONAL_LOAN")) {
                            messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_300] 'message.order.items[${index}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                                if (item?.xinput?.head?.index?.cur == 0) {
                                    expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                                } else {
                                    expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("application/html");
                                }
                            }));
                        } else {
                            messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_301] 'message.order.items[${index}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                                if (item?.xinput?.head?.index?.cur == 1) {
                                    //     expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                                    // } else {
                                    expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("application/html");
                                }
                            }));
                        }

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_302] 'message.order.items[${index}].xinput.form.url' should be a string (OPTIONAL)`, function () {
                            expect(item.xinput.form.url).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_304] 'message.order.items[${index}].xinput.form.resubmit should be a boolean`, function () {
                            expect(item.xinput.form.resubmit).to.be.a("boolean");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_305] 'message.order.items[${index}].xinput.form.multiple_sumbissions should be a boolean`, function () {
                            expect(item.xinput.form.multiple_sumbissions).to.be.a("boolean")
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_init_message_test_306] 'message.order.items[${index}].xinput.required' should be a boolean`, function () {
                            expect(item.xinput.required).to.be.a("boolean");
                        }));

                    }
                } else if (action === "on_status") {
                    xinputOnStatusGeneral(item, messageTestSuite, index, testCaseId);
                }
            });
        }

        if (action === "on_init") {
            fulfillmentTests(message, messageTestSuite, { code: ["INITIATED"] }, testCaseId);

        }

        quoteTests(message, messageTestSuite, testCaseId)

        if (action === "on_init") {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments' should be an array`, function () {
                expect(message.order.payments).to.exist.and.to.be.an("array").that.is.not.empty;
            }));

            if (message?.order?.payments && message?.order?.payments.length > 0) {

                const platFormFeeAndSecurityFee = message?.order?.payments.find((payment) => payment?.tags);
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.payments should have an object containing buyer finder fee and security fee`, function () {
                    expect(platFormFeeAndSecurityFee).to.exist.and.to.be.an("object");
                }));

                message.order.payments.forEach((payment, index) => {
                    if (payment?.tags) {
                        paymentCommonTests(payment, index, action, messageTestSuite, testCaseId);

                    } else {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should have a property 'type' that is equal to 'POST_FULFILLMENT'`, function () {
                            expect(payment).to.have.property('type').that.is.a('string').and.to.be.oneOf(["ON_ORDER", "POST_FULFILLMENT", "PRE_ORDER"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should have a valid 'id' that is a string`, function () {
                            expect(payment).to.have.property('id').that.is.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should have 'params' property `, function () {
                            expect(payment).to.have.property('params').that.is.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].params.amount' should be a string (OPTIONAL)`, function () {
                            expect(payment.params).to.have.property('amount').that.is.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].params.currency' should be 'INR' (OPTIONAL)`, function () {
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

            cancellationTermsTests(message, messageTestSuite, testCaseId);
        }

         return messageTestSuite;
    } catch (err) {
        messageTestSuite.addTest(new Mocha.Test("on_init request message object failed to be verified because of some missing payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return messageTestSuite;
    }
}


async function on_init({ context, message } = {}, step, testCaseId,logs= [],constants ={}) {
    const testSuite = new Mocha.Suite(`on_init (${step}) Request Verification`);
    const responseTestSuite = response_verification({ context, message }, logs,constants);
    
    console.log("logs...",logs);
    const contextTestSuite = contextTests(context, 'on_init');
    const messageTestSuite = messageTests(message, step, testCaseId);

    testSuite.addSuite(contextTestSuite);
    testSuite.addSuite(messageTestSuite);

    return [testSuite,responseTestSuite];
};


module.exports = {
    on_init,
    onInitMessageTests: messageTests
}