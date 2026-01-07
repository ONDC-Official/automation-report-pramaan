const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { quoteTests } = require("./commonTest")
const { itemsCommonFieldsTests } = require("./commonTest")
const { providerTests } = require("./commonTest")
const { xinputOnStatusGeneral } = require("./commonTest")
const response_verification = require("../../centralizedUtilities/responseVerification");

const codePattern = /^[A-Z_]+$/;

function messageTests(message, step, testCaseId, action = "on_select") {
    const messageTestSuite = new Mocha.Suite("on_select Request Verification");
    try {
        
        let testcaseCounter = 1;
        const action = "on_select";
        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message' properties exist`, function () {
            expect(message, "Message object shouldn't be null or undefined").to.exist;
            expect(message).to.exist;
        }))

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message' contains 'order'`, function () {
            expect(message).to.have.property("order");
            expect(message.order).to.exist.and.to.be.an("object");
        }));


        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.order' contains "'provider', 'items' and 'quote'`, function () {
            expect(message.order).to.include.all.keys("provider", "items", "quote");
        }));


        providerTests(message, messageTestSuite, testCaseId);

        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_188] Verify if 'message.order.items' is an array that is not empty`, function () {
            expect(message.order.items).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, index) => {

                messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_188] 'message.order.items[${index}].category_ids' should be an array, that should not be empty`, function () {
                    expect(item.category_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.category_ids && item?.category_ids.length > 0) {
                    item.category_ids.forEach((categoryID, categoryIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_188] 'message.order.items[${index}].category_ids[${categoryIDIndex}]' should be string`, function () {
                            expect(categoryID).to.be.a("string");
                        }));
                    })
                };


                itemsCommonFieldsTests(item, index, messageTestSuite, testCaseId);


                if (step === "III") {
                    xinputOnStatusGeneral(item, messageTestSuite, index, testCaseId)
                }

                if (action === "on_select") {


                    messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_285] Verify if 'message.order.items[${index}].xinput' contains necessary keys`, function () {

                        // expect(item.xinput).to.include.all.keys("head", "form", "required");
                        expect(item.xinput.form).to.exist.and.to.be.an("object");
                        if (step !== "III") {
                            expect(item.xinput.head).to.exist.and.to.be.an("object");

                            expect(item.xinput.required).to.exist.and.to.be.an("boolean");
                        }
                    }));
                    if (step !== "III") {
                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_286] Verify if 'message.order.items[${index}].xinput.head' contains necessary keys`, function () {
                            expect(item.xinput.head).to.include.all.keys("descriptor", "index", "headings");
                            expect(item.xinput.head.descriptor).to.exist.and.to.be.an("object");
                            expect(item.xinput.head.index).to.exist.and.to.be.an("object");
                            expect(item.xinput.head.headings).to.exist.and.to.be.an("array");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_287] Verify if 'message.order.items[${index}].xinput.head.descriptor.name' is a string`, function () {
                            expect(item.xinput.head.descriptor.name).to.be.a("string")/* .and.to.equal("Customer Information") */;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_288] Verify if 'message.order.items[${index}].xinput.head.index' contains necessary keys`, function () {
                            expect(item.xinput.head.index).to.include.all.keys("cur", "max");
                            expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                            expect(item.xinput.head.index.cur).to.exist.and.to.be.a("number");
                            expect(item.xinput.head.index.max).to.exist.and.to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_289] Verify if 'message.order.items[${index}].items.xinput.head.index.min'(OPTIONAL)`, function () {
                            expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_290] Verify if 'message.order.items[${index}].xinput.head.index.min' is equal to '0'`, function () {
                            expect(item.xinput.head.index.min).to.equal(0);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_291] Verify if 'message.order.items[${index}].xinput.head.index.cur' is equal to one of [0, 1]`, function () {
                            switch (step) {
                                case "II":
                                    expect(item.xinput.head.index.cur).to.equal(1);
                                    break;
                                case "III":
                                    expect(item.xinput.head.index.cur).to.equal(1);
                                    break;
                            }
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_292] Verify if 'message.order.items[${index}].xinput.head.index.max' is equal to '1'`, function () {
                            expect(item.xinput.head.index.max).to.equal(1);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_293] Verify if 'message.order.items[${index}].xinput.head.headings' has length '2'`, function () {
                            expect(item.xinput.head.headings).to.have.lengthOf(2);
                        }))

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_294] Verify if 'message.order.items[${index}].xinput.head.headings' is equal to ["SET_DOWN_PAYMENT", "KYC"]`, function () {
                            expect(item.xinput.head.headings).to.eql(["SET_DOWN_PAYMENT", "KYC"]);
                        }));

                    };

                    messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_295] Verify if 'message.order.items[${index}].xinput.form' contains necessary keys`, function () {
                        // expect(item.xinput.form).to.include.all.keys("id", "mime_type", "url", "resubmit", "multiple_sumbissions");
                        expect(item.xinput.form.id).to.exist;
                        if (step !== "III") {
                            expect(item.xinput.form.mime_type).to.exist;
                            expect(item.xinput.form.url).to.exist;
                            expect(item.xinput.form.resubmit).to.exist;
                            expect(item.xinput.form.multiple_sumbissions).to.exist;
                        }
                    }));
                    if (step !== "III") {
                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_296] Verify if 'message.order.items[${index}].xinput.form.resubmit' is a boolean`, function () {
                            expect(item.xinput.form.resubmit).to.be.a('boolean');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_297] Verify if 'message.order.items[${index}].xinput.form.multiple_sumbissions' is a boolean`, function () {
                            expect(item.xinput.form.multiple_sumbissions).to.be.a('boolean');;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id:ONDC:FIS14_PURCHASE_FINANCE_on_select_message_test_298] 'message.order.items[${index}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                            if (item?.xinput?.head?.index?.cur == 0) {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                            } else {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("application/html");
                            }
                        }));
                    }
                } else if (action === "on_status") {
                    xinputOnStatusGeneral(item, messageTestSuite, index, testCaseId)
                }

            });
        }


        quoteTests(message, messageTestSuite, testCaseId)


         return messageTestSuite;
    } catch (error) {
        messageTestSuite.addTest(new Mocha.Test("on_select request message object failed to be verified because of some missing payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return messageTestSuite;
    }
}
async function on_select({ context, message } = {}, step, testCaseId,logs =[],constants ={}) {
    const testSuite = new Mocha.Suite(`on_select (${step}) Request Verification`);
    const responseTestSuite = response_verification({ context, message }, logs,constants);

    const contextTestSuite = contextTests(context, 'on_select');
    const messageTestSuite = messageTests(message, step, testCaseId,);

    testSuite.addSuite(contextTestSuite);
    testSuite.addSuite(messageTestSuite);

    return [testSuite,responseTestSuite];
}

module.exports = {
    on_select,
    onSelectMessageTests: messageTests
}
