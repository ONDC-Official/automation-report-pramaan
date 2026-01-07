const Mocha = require("mocha");
const contextTests = require("./context");
const initOneSchema = require("./schema/init_one.schema");
const initTwoSchema = require("./schema/init_two.schema");
const { expect } = require("chai");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function addItemsValidationTests(messageTestSuite, message, testCaseId, step) {
    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    if (message?.order?.provider) {
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.provider' should exist and be an object`, function () {
            expect(message.order.provider).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.provider.id' should exist and be a string`, function () {
            expect(message.order.provider.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
        }));
    }

    if (message?.order?.items) {

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

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput' should be an object`, function () {
                    expect(item.xinput).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.form' should be an object`, function () {
                    expect(item.xinput.form).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.form.id' should be a string`, function () {
                    expect(item.xinput.form.id).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.form_response' should be an object`, function () {
                    expect(item.xinput.form_response).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.form_response.status' should be a string`, function () {
                    expect(item.xinput.form_response.status).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].xinput.form_response.submission_id' should be a string`, function () {
                    expect(item.xinput.form_response.submission_id).to.be.a('string');
                }));
                if (item?.parent_item_id) {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].parent_item_id' should be a string`, function () {
                        expect(item.parent_item_id).to.be.a('string');
                    }));
                }
            })
        }
    }

    if (message?.order?.fulfillments) {
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
    }

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

    if (message?.order?.payments) {
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments' should be a non-empty array`, function () {
            expect(message.order.payments).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        if (message?.order?.payments && message.order.payments.length > 0) {
            message.order.payments.forEach((payment, paymentIndex) => {

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}]' should have a property 'params' which is an object`, function () {
                    expect(payment).to.have.property("params").that.is.an("object");
                }
                ));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].params' should have a property 'amount' which is a string (OPTIONAL)`, function () {
                    if (payment.params?.amount) {
                        expect(payment.params.amount).to.be.a("string");
                    }
                }
                ));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].params' should have a property 'currency' which is a string (OPTIONAL)`, function () {
                    if (payment.params?.currency) {
                        expect(payment.params.currency).to.be.a("string");
                    }
                }
                ));

            });
        }
    }
}

function initOneMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, initOneSchema, "Verification of Message for Init");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function initTwoMessageTests({ context, message }, step, testCaseId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, initTwoSchema, "Verification of Message for Init");

        // Add items validation tests directly to the message test suite
        addItemsValidationTests(messageTestSuite, message, testCaseId, step);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

// function on_initMessageTests(message, step) {
//     let schema;

//     switch (step) {
//         case "I":
//             schema = initOneSchema;
//             break;
//         case "II":
//         case "III":
//         case "IV":
//             schema = initTwoSchema;
//             break;
//         case "init_initiate_drawdown":
//             schema = initTwoSchema;
//             break;
//         case "init_upload_invoice":
//             schema = initTwoSchema;
//             break;
//         default:
//             break;
//     }

//     try {
//         const messageTestSuite = generateTests(message, schema, "Verification of Message for on_init");
//         return messageTestSuite;
//     } catch (err) {
//         console.log(err);
//     }
// }

const stepMap = {
    "I": "I",
    "II": "II",
    "III": "III",
    "IV": "IV",
    "init_initiate_drawdown": "Initiate Drawdown",
    "init_upload_invoice": "Upload Invoice"
}

module.exports = async function init({ context, message } = {}, step, testCaseId, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`init (${stepMap[step]}) request verification`);

        testSuite.addSuite(contextTests(context, constants, logs));

        switch (step) {
            case "I":
                testSuite.addSuite(initOneMessageTests({ context, message }, constants));
                break;
            case "II":
            case "III":
            case "IV":
                testSuite.addSuite(initTwoMessageTests({ context, message }, step, testCaseId));
                break;
            case "init_initiate_drawdown":
            case "init_upload_invoice":
                testSuite.addSuite(initTwoMessageTests({ context, message }, step, testCaseId));
                break;
            default:
                break;
        }
        const responseTestSuite = response_verification({ context, message }, logs, constants);


        return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}