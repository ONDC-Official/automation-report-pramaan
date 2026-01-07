const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require('./context');
const { itemsCommonFieldsTests, fulfillmentsTests, providerWithID, quoteCommonTests, paymentsCommonTests, itemsWithXinputTests } = require('./commonTest');
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function confirm({ context, message }, { category, settlementAmount, previous_on_init_payment_id } = {}, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite(`Confirm Request Verification`);
    contextTests(context, 'confirm', testSuite);
    const messageTestSuite = Mocha.Suite.create(testSuite, 'Verification of Message');
    const responseTestSuite = response_verification({ context, message }, logs, constants);
    messageTestSuite.addTest(new Mocha.Test("should have 'message' properties", function () {
        expect(message, "Request body shouldn't be null and undefined").to.exist;
        expect(message).to.exist;
    }));

    switch (category) {
        case 'MARINE_INSURANCE':
            marineConfirmTests(message, messageTestSuite, { settlementAmount, previous_on_init_payment_id });
            break;
        case 'HEALTH_INSURANCE':
            healthConfirmTests(message, messageTestSuite, { settlementAmount, previous_on_init_payment_id });
            break;
        case 'MOTOR_INSURANCE':
            motorConfirmTests(message, messageTestSuite, { settlementAmount, previous_on_init_payment_id }, logs)
            break;
        default:
        // throw new Error(`Invalid search type: ${category}`);
    }
    return [testSuite, responseTestSuite];
}

function marineConfirmTests(message, messageTestSuite, { settlementAmount, previous_on_init_payment_id } = {}) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
            expect(message).to.exist.a.property("order").that.is.an("object");
        }));

        //Fulfillments
        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.fulfillments' is an array that is not empty", function () {
            expect(message.order.fulfillments, "'message.order.fulfillments' should not be empty array").to.be.an("array").that.is.not.empty;
        }));

        fulfillmentsTests(message, messageTestSuite);

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message?.order?.fulfillments.forEach((it, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.person.dob' should be a string`, function () {
                    expect(it.customer.person.name).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.person.gender' should be a string`, function () {
                    expect(it.customer.person.gender).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.fulfillments[${i}].customer.person.tags' is an array`, function () {
                    expect(it.customer.person.tags).to.be.an("array");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.fulfillments[${i}].customer.person.tags' is not empty`, function () {
                    expect(it.customer.person.tags).to.not.be.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify that each tag in 'message.order.fulfillments[${i}].customer.person.tags' has a descriptor object with 'code' and 'name' properties`, function () {
                    const tags = message.order.fulfillments[i].customer.person.tags;
                    tags.forEach((tag, index) => {
                        expect(tag.descriptor).to.exist;
                        expect(tag.descriptor).to.be.an("object");
                        expect(tag.descriptor.code).to.be.a("string").that.is.not.empty;
                        expect(tag.descriptor.name).to.be.a("string").that.is.not.empty;
                    });
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify that each tag in 'message.order.fulfillments[${i}].customer.person.tags' has a 'list' property`, function () {
                    const tags = message.order.fulfillments[i].customer.person.tags;
                    tags.forEach((tag, index) => {
                        expect(tag.list).to.exist;
                        expect(tag.list).to.be.an("array").that.is.not.empty;

                        tag.list.forEach((item) => {
                            expect(item.descriptor).to.exist;
                            expect(item.descriptor).to.be.an("object");
                            expect(item.descriptor.code).to.be.a("string").that.is.not.empty;
                            expect(item.descriptor.name).to.be.a("string").that.is.not.empty;
                            expect(item.value).to.exist;
                            expect(item.value).to.be.a("string").that.is.not.empty;
                        });
                    });
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].id' should be a string`, function () {
                    expect(it.id).to.be.a("string");
                }));
            })
        }

        //Items...
        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.items' is an array that is not empty", function () {
            expect(message.order.items, "'message.order.items' should not be empty array").to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message?.order?.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].id' should be a string`, function () {
                    expect(item.id).to.be.an("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].price' should be an object`, function () {
                    expect(item.price).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].price.value' should be a string`, function () {
                    expect(item.price.value).to.be.an("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`veriy that 'message.order.items[${i}].time' should be an object`, function () {
                    expect(item.time).to.be.an("object").that.includes.all.keys("label", "range");
                }));

                messageTestSuite.addTest(new Mocha.Test(`veriy that 'message.order.items[${i}].time.label' exist and is a string`, function () {
                    expect(item.time.label).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[0].time.range' exist and is an object`, function () {
                    expect(item.time.range).to.exist.and.to.be.an("object").that.includes.all.keys("start", "end");
                }));

                messageTestSuite.addTest(new Mocha.Test(`veriy that 'message.order.items[${i}].time.range.start' exist and is a string`, function () {
                    expect(item.time.range.start).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`veriy that 'message.order.items[${i}].time.range.end' exist and is a string`, function () {
                    expect(item.time.range.end).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${i}].tags' is an array`, function () {
                    expect(item.tags).to.be.an("array");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.fulfillments[${i}].tags' is not empty`, function () {
                    expect(item.tags).to.not.be.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify that each tag in 'message.order.items[${i}].tags' has a descriptor object with 'code' and 'name' properties`, function () {
                    const tags = message.order.fulfillments[i].customer.person.tags;
                    tags.forEach((tag, index) => {
                        expect(tag.descriptor).to.exist;
                        expect(tag.descriptor).to.be.an("object");
                        expect(tag.descriptor.code).to.be.a("string").that.is.not.empty;
                        expect(tag.descriptor.name).to.be.a("string").that.is.not.empty;
                    });

                    messageTestSuite.addTest(new Mocha.Test(`Verify that each tag in 'message.order.fulfillments[${i}].customer.person.tags' has a 'value' property`, function () {
                        const tags = message.order.fulfillments[i].customer.person.tags;
                        tags.forEach((tag, index) => {
                            expect(tag.value).to.exist;
                            expect(tag.value).to.be.a("string").that.is.not.empty;
                        });
                    }));
                }));
            })
        }

        //Payments
        message?.order?.payments.forEach((payment, index) => {
            messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.payments' is an array that is not empty", function () {
                expect(message.order.payments, "'message.order.payments' should not be empty array").to.be.an("array").that.is.not.empty;
            }));
        })

        paymentsCommonTests(message, messageTestSuite, { settlementAmount, previous_on_init_payment_id });

        //Quote
        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.quote' is an object", function () {
            expect(message.order.quote, "'message.order.quote'is an object").to.be.an("object");
        }));

        quoteCommonTests(message, messageTestSuite);
    } catch (err) {
        console.log(err);
        return err;
    }
}

function healthConfirmTests(message, messageTestSuite, { settlementAmount, previous_on_init_payment_id } = {}) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
            expect(message).to.exist.a.property("order").that.is.an("object");
        }));

        //Fulfillments
        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.fulfillments' is an array that is not empty", function () {
            expect(message.order.fulfillments, "'message.order.fulfillments' should not be empty array").to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message?.order?.fulfillments.forEach((it, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}]' should be an object`, function () {
                    expect(it).to.be.an("object").that.includes.all.keys("customer", "id");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer' should be an object`, function () {
                    expect(it.customer).to.be.an("object").that.includes.all.keys("contact");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact' should be an object`, function () {
                    expect(it.customer.contact).to.be.an("object").that.includes.all.keys("email", "phone");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact.email' should be a string`, function () {
                    expect(it.customer.contact.email).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact.phone' should be a string`, function () {
                    expect(it.customer.contact.phone).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].id' should be a string`, function () {
                    expect(it.id).to.be.an("string");
                }));
            })
        }

        fulfillmentsTests(message, messageTestSuite);

        //Items...
        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.items' is an array that is not empty", function () {
            expect(message.order.items, "'message.order.items' should not be empty array").to.be.an("array").that.is.not.empty;
        }));

        itemsCommonFieldsTests(message, messageTestSuite);

        //Payments
        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.payments' is an array that is not empty", function () {
            expect(message.order.payments, "'message.order.payments' should not be empty array").to.be.an("array").that.is.not.empty;
        }));

        paymentsCommonTests(message, messageTestSuite, { settlementAmount, previous_on_init_payment_id });

        //Provider
        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.provider' is an object ", function () {
            expect(message.order.provider, "'message.order.provider' should be an object").to.be.an("object");
        }));

        providerWithID(message, messageTestSuite);

        //quote...
        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.quote' is an object ", function () {
            expect(message.order.quote, "'message.order.quote' should be an object").to.be.an("object");

        }));

        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order.quote.id' is a string ", function () {
            expect(message.order.quote.id, "'message.order.quote' should be an object").to.exist.and.to.be.an("string");

        }));

        quoteCommonTests(message, messageTestSuite);

        const arr = [
            { title: "PROCESSING_FEE", name: "processing fee" },
            { title: "ADD_ONS", name: "add ons" }
        ];

        arr.forEach((ele) => {
            const breakupIndex = message?.order?.quote?.breakup.findIndex((breakup) => breakup?.title === ele.title);
            const breakupItem = message?.order?.quote?.breakup[breakupIndex];

            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup' should have an object of ${ele.title}`, function () {
                expect(breakupItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
            }));

            if (breakupIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should have properties named 'price', 'title'`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                    expect(breakupItem.price).to.have.property("value").that.is.a("string");
                    expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                    expect(breakupItem).to.have.property("title").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string`, function () {
                    expect(breakupItem.price).to.have.property("value").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string`, function () {
                    expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                }));

                if (breakupItem?.item?.add_ons && breakupItem?.item?.add_ons.length > 0) {
                    breakupItem.item.add_ons.forEach((add_on, add_onIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.add_ons[${add_onIndex}] should be an object`, function () {
                            expect(add_on).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.add_ons[${add_onIndex}].id should be a string`, function () {
                            expect(add_on.id).to.be.a("string");
                        }));
                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));
            }
        })

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'id' which is a string", function () {
            expect(message.order.quote).to.have.a.property("id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'ttl' which is a string", function () {
            expect(message.order.quote).to.have.a.property("ttl").that.is.a("string");
        }));
    } catch (err) {
        console.log(err);
        return err;
    }
}

function motorConfirmTests(message, messageTestSuite, { settlementAmount, previous_on_init_payment_id } = {}, logs = []) {

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

        //provider
        providerWithID(message, messageTestSuite);

        //Fulfillments
        fulfillmentsTests(message, messageTestSuite);

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message?.order?.fulfillments.forEach((it, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].id' should be an string (OPTIONAL)`, function () {
                    expect(it.id).to.be.an("string");
                }));
            })
        }

        //items...
        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.items' is an array that is not empty", function () {
            expect(message.order.items, "'message.order.items' should be a non-empty array").to.be.an("array").that.is.not.empty;
        }));

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

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.items[0].fulfillment_ids' is an array, that should not be empty", function () {
            expect(message.order.items[0].fulfillment_ids).to.be.an("array").that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify that each fulfillment id in 'message.order.items[0].fulfillment_ids' is a string", function () {
            const fulfillmentIds = message.order.items[0].fulfillment_ids;
            fulfillmentIds.forEach((fulfillmentId, index) => {
                expect(fulfillmentId).to.be.a("string");
            });
        }));

        //payments...
        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.payments' is an array that is not empty", function () {
            expect(message.order.payments, "'message.order.payments' should be a non-empty array").to.be.an("array").that.is.not.empty;
        }));


        paymentsCommonTests(message, messageTestSuite, { settlementAmount, previous_on_init_payment_id });

        const initLog = lastActionLog(logs, "init");

        if (initLog) {
            // Provider ID check
            const initProviderId = initLog?.message?.order?.provider?.id;
            const confirmProviderId = message?.order?.provider?.id;

            messageTestSuite.addTest(new Mocha.Test("Verify 'message.order.provider.id' matches provider.id from init", function () {
                expect(confirmProviderId).to.be.a("string").and.to.equal(initProviderId);
            }));

            // Item ID check
            const prevItems = initLog?.message?.order?.items || [];
            const currItems = message?.order?.items || [];

            currItems.forEach((item, index) => {
                const prevItemId = prevItems[index]?.id;
                messageTestSuite.addTest(new Mocha.Test(`Verify 'message.order.items[${index}].id' matches item id from init`, function () {
                    expect(item?.id).to.be.a("string").and.to.equal(prevItemId);
                }));
            });
        }


    } catch (err) {
        console.log(err);
        return err;
    }
}

