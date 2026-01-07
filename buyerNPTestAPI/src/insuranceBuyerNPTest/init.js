const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { fulfillmentsTests, providerWithID, paymentsCommonTests, itemsWithXinputTests, xinputOnStatusGeneral, itemsCommonFieldsTests, quoteCommonTests } = require('./commonTest');
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function init({ context, message } = {}, { category, step, settlementAmount, previous_on_init_payment_id } = {}, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite(`Init (${step}) Request Verification`);
    contextTests(context, 'init', testSuite);
    const messageTestSuite = Mocha.Suite.create(testSuite, 'Verification of Message');
    const responseTestSuite = response_verification({ context, message }, logs, constants);


    switch (category) {
        case 'MARINE_INSURANCE':
            marineInitTests(message, messageTestSuite, { step, settlementAmount, previous_on_init_payment_id });
            break;
        case 'HEALTH_INSURANCE':
            healthInitTests(message, messageTestSuite, { step, settlementAmount, previous_on_init_payment_id });
            break;
        case 'MOTOR_INSURANCE':
            motorInitTests(message, messageTestSuite, { step, settlementAmount, previous_on_init_payment_id }, logs)
            break;
        default:
        // throw new Error(`Invalid search type: ${category}`);
    }
    return [testSuite, responseTestSuite];
};

function marineInitTests(message, messageTestSuite, { step, settlementAmount, previous_on_init_payment_id } = {}) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
            expect(message).to.exist.a.property("order").that.is.an("object");
        }));

        fulfillmentsTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'items' which is an array", function () {
            expect(message.order).to.exist.and.to.have.property("items").that.is.an("array").and.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items?.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an("object").that.includes.all.keys("id", "xinput");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].id' should be an string`, function () {
                    expect(item.id).to.be.an("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`veriy that 'message.order.items[${i}].time' should be an object`, function () {
                    expect(item.time).to.be.an("object").that.includes.all.keys("label", "range");
                }));
                messageTestSuite.addTest(new Mocha.Test(`veriy that 'message.order.items[${i}].time.label' exist and is a string`, function () {
                    expect(item.time.label).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify that 'message.order.items[${i}].time.range' exists and is an object`, function () {
                    expect(item.time.range).to.exist.and.to.be.an("object").that.includes.all.keys("start", "end");
                }));
                messageTestSuite.addTest(new Mocha.Test(`veriy that 'message.order.items[${i}].time.range.start' exist and is a string`, function () {
                    expect(item.time.range.start).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`veriy that 'message.order.items[${i}].time.range.end' exist and is a string`, function () {
                    expect(item.time.range.end).to.exist.and.to.be.a("string");
                }));

                xinputOnStatusGeneral(message, messageTestSuite);
            })
        }
        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.payments' is an array that is not empty", function () {
            expect(message.order.payments, "'message.order.payments should be a non-empty array'").to.be.an("array").that.is.not.empty;
        }));

        paymentsCommonTests(message, messageTestSuite, { step, settlementAmount, previous_on_init_payment_id });

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.provider' is an object", function () {
            expect(message.order.provider).to.be.an("object");
        }));

        providerWithID(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.quote' is an object", function () {
            expect(message.order.quote).to.be.an("object");
        }));

        quoteCommonTests(message, messageTestSuite);
    } catch (err) {
        console.log(err);
        return err;
    }
}

function healthInitTests(message, messageTestSuite, { step, settlementAmount, previous_on_init_payment_id } = {}) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
            expect(message).to.exist.a.property("order").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.fulfillments' is an array that is not empty", function () {
            expect(message.order.fulfillments, "'message.order.fulfillmments' should not be empty array").to.be.an("array").that.is.not.empty;
        }));

        fulfillmentsTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.items' is an array that is not empty", function () {
            expect(message.order.items, "'message.order.items' should not be empty array").to.be.an("array").that.is.not.empty;
        }));

        itemsWithXinputTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.payments' is an array that is not empty", function () {
            expect(message.order.payments, "'message.order.payments should be a non-empty array'").to.be.an("array").that.is.not.empty;
        }));

        paymentsCommonTests(message, messageTestSuite, { step, settlementAmount, previous_on_init_payment_id })

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.provider' is an object", function () {
            expect(message.order.provider).to.be.an("object");
        }));

        providerWithID(message, messageTestSuite)
    } catch (err) {
        console.log(err);
        return err;
    }
}

function motorInitTests(message, messageTestSuite, { step, settlementAmount, previous_on_init_payment_id } = {}, logs = []) {

    function lastActionLog(logs, action) {
        try {
            const log = logs?.filter((log) => log?.request?.context?.action === action);

            return log && log.length ? log?.pop()?.request : false;
        } catch (err) {
            console.log(err);
        }
    }

    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
            expect(message).to.exist.a.property("order").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.fulfillments' is an array that is not empty", function () {
            expect(message.order.fulfillments, "'message.order.fulfillmments' should not be empty array").to.be.an("array").that.is.not.empty;
        }));

        fulfillmentsTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.provider' is an object", function () {
            expect(message.order.provider).to.be.an("object");
        }));

        //provider...
        providerWithID(message, messageTestSuite)

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.items' is an array that is not empty", function () {
            expect(message.order.items, "'message.order.payments should be a non-empty array'").to.be.an("array").that.is.not.empty;
        }));

        //items...
        itemsWithXinputTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.items[0].category_ids' is an array, that should not be empty (OPTIONAL)", function () {
            expect(message.order.items[0].category_ids).to.be.an("array").that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify that each category id in 'message.order.items[0].category_ids' is a string (OPTIONAL)", function () {
            const categoryIds = message.order.items[0].category_ids;
            categoryIds.forEach((categoryId, index) => {
                expect(categoryId).to.be.a("string");
            });
        }));

        if (message.order.items[0] && message.order.items[0].fulfillment_ids) {
            messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.items[0].fulfillment_ids' is an array, that should not be empty (OPTIONAL)", function () {
                expect(message.order.items[0].fulfillment_ids).to.be.an("array").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify that each fulfillment id in 'message.order.items[0].fulfillment_ids' is a string (OPTIONAL)", function () {
                const fulfillmentIds = message.order.items[0].fulfillment_ids;

                fulfillmentIds.forEach((fulfillmentId, index) => {
                    expect(fulfillmentId).to.be.a("string");
                });
            }));
        }

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.payments' is an array that is not empty", function () {
            expect(message.order.payments, "'message.order.payments should be a non-empty array'").to.be.an("array").that.is.not.empty;
        }));

        paymentsCommonTests(message, messageTestSuite, { step, settlementAmount, previous_on_init_payment_id });

        const selectLog = lastActionLog(logs, "select");

        if (selectLog) {
            // Provider ID check
            const selectProviderId = selectLog?.message?.order?.provider?.id;
            const initProviderId = message?.order?.provider?.id;

            messageTestSuite.addTest(new Mocha.Test("Verify 'message.order.provider.id' matches provider.id from select", function () {
                expect(initProviderId).to.be.a("string").and.to.equal(selectProviderId);
            }));

            // Item ID check
            const prevItems = selectLog?.message?.order?.items || [];
            const currItems = message?.order?.items || [];

            currItems.forEach((item, index) => {
                const prevItemId = prevItems[index]?.id;
                messageTestSuite.addTest(new Mocha.Test(`Verify 'message.order.items[${index}].id' matches previous item id`, function () {
                    expect(item?.id).to.be.a("string").and.to.equal(prevItemId);
                }));
            });
        }

    } catch (err) {
        console.log(err);
        return err;
    }
}
