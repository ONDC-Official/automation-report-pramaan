const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const confirmSchema = require("./schema/confirm.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function addItemsValidationTests(messageTestSuite, message, testCaseId, step) {
    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items' should be a non-empty array`, function () {
        expect(message.order.items).to.exist.and.to.be.a("array");
    }));

    if (message?.order?.items && message?.order?.items.length > 0) {
        message.order.items.forEach((item, i) => {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}]' should be an object`, function () {
                expect(item).to.be.an('object');
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].id' should be a string`, function () {
                expect(item.id).to.be.a('string');
            }));
            if (item?.parent_item_id) {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].parent_item_id' should be a string`, function () {
                    expect(item.parent_item_id).to.be.a('string');
                }));
            }
        })
    }

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments' should be a non-empty array`, function () {
        expect(message.order.fulfillments).to.exist.and.to.be.an("array").that.is.not.empty;
    }));

    if (message?.order?.fulfillments?.length > 0) {
        message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}]' should exist and be an object`, function () {
                expect(fulfillment).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].id' should exist and be a string`, function () {
                expect(fulfillment.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer' should exist and be an object`, function () {
                expect(fulfillment.customer).to.exist.and.to.be.a("object");
            }));

            // Validate customer person details

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person' should exist and be an object`, function () {
                expect(fulfillment.customer.person).to.exist.and.to.be.a("object");
            }));
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person.name' should exist and be a string`, function () {
                expect(fulfillment.customer.person.name).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));
            if (step === "II" || step === "IV") {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person.dob' should exist and be a string`, function () {
                    expect(fulfillment.customer.person.dob).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person.gender' should exist and be a string`, function () {
                    expect(fulfillment.customer.person.gender).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
            };

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'fulfillment.customer.person.creds' should be a non-empty array`, function () {
                expect(fulfillment.customer.person.creds).to.exist.and.to.be.an("array").that.is.not.empty;
            }));

            if (fulfillment?.customer?.person?.creds && fulfillment?.customer?.person?.creds.length > 0) {
                fulfillment.customer.person.creds.forEach((cred, credIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credIndex}].id' should exist and be a string`, function () {
                        expect(cred.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credIndex}].type' should exist and be a string`, function () {
                        expect(cred.type).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));
                });
            }

            // Validate customer contact details
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.contact' should exist and be an object`, function () {
                expect(fulfillment.customer.contact).to.exist.and.to.be.a("object");
            }));
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.contact.email' should exist and be a string`, function () {
                expect(fulfillment.customer.contact.email).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.contact.phone' should exist and be a string`, function () {
                expect(fulfillment.customer.contact.phone).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));
        });
    };

    if (message?.order?.ref_order_ids) {
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.ref_order_ids' should be a non-empty array`, function () {
            expect(message.order.ref_order_ids).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        if (message?.order?.ref_order_ids && message?.order?.ref_order_ids.length > 0) {
            message.order.ref_order_ids.forEach((orderId, index) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.ref_order_ids[${index}]' should be a non-empty string`, function () {
                    expect(orderId).to.exist.and.to.be.a("string").that.is.not.empty;
                }));
            });
        }
    }
}

function confirmMessageTests({ context, message }, constants, testCaseId, step) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, confirmSchema, "Verification of Message for Confirm");
        addItemsValidationTests(messageTestSuite, message, testCaseId, step);
        
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

const stepMap = {
    "confirm_one": "Credit Line Assigned",
    "confirm_drawdown": "Credit Line Drawdown"
}

module.exports = async function confirm({ context, message } = {}, step, testCaseId,logs =[],constants ={}) {
    try {
        const testSuite = new Mocha.Suite(`confirm (${stepMap[step]}) request verification`);
        // const constants = { action: "confirm", version: "2.3.0" };
        

        testSuite.addSuite(contextTests(context, constants, testCaseId));
        testSuite.addSuite(confirmMessageTests({ context, message }, testCaseId, step));
        const responseTestSuite = response_verification({ context, message }, logs,constants);

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}