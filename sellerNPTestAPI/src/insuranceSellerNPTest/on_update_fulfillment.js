const Mocha = require("mocha");
const { contextTests } = require("./context");
const { expect } = require("chai");
const { documentsTests, fulfillmentsTests, paymentsTests, quoteCommonTests } = require("./commonTest");

async function on_update_fulfillment({ context, message } = {}, step, descriptor) {
    try {
        const testSuite = new Mocha.Suite(`on_update (${step}) Request Verification`);

        testSuite.addSuite(contextTests(context, "on_update"));

        const messageTestSuite = new Mocha.Suite.create(testSuite, 'Verification of Message');

        messageTestSuite.addTest(new Mocha.Test("should have 'message' properties", function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }));
        switch (descriptor) {
            case 'HEALTH_INSURANCE':
                on_update_fulfillment_insurance(message, messageTestSuite);
                break;
            case 'MARINE_INSURANCE':
                marineOn_update(message, messageTestSuite);
                break;
            case 'MOTOR_INSURANCE':
                motorOn_update(message, messageTestSuite, logs);
                break;
            default:
            // throw new Error("Invalid select type");
        }

        return testSuite;

    } catch (error) {
        console.log(error);
        return error;
    }
}

async function on_update_fulfillment_insurance(message, messageTestSuite, step) {
    try {
        // messageTestSuite.addTest(new Mocha.Test("should verify the contents of 'message.order'", function () {
        //     expect(message.order).to.include.all.keys("id", "provider", "items", "quote", "fulfillments", "payments", "documents");
        // }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.id'should be present and must be a string", function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.status'should be present and must be a string", function () {
            expect(message.order.status).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
            expect(message.order.items).to.be.an('array');
        }));

        //message.order.items
        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an('object');
                }));
                //message.order.items.id
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a string`, function () {
                    expect(item.id).to.be.a('string');
                }));
                //message.order.items.parent_item_id...
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].parent_item_id' should be a string`, function () {
                    expect(item.parent_item_id).to.be.a('string');
                }));
                //message.order.items.category_ids....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids' should be an array, that should not be empty`, function () {
                    expect(item.category_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.category_ids && item?.category_ids.length > 0) {
                    item.category_ids.forEach((categoryID, categoryIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIDIndex}]' should be string`, function () {
                            expect(categoryID).to.be.a("string");
                        }));
                    })
                }

                //message.order.items.fulfillment_ids....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                    expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                    item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIDIndex}]' should be string`, function () {
                            expect(fulfillmentID).to.be.a("string");
                        }));
                    })
                }

                //message.order.items.descriptor....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor' should be an object`, function () {
                    expect(item.descriptor).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.name' should be a string`, function () {
                    expect(item.descriptor.name).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.short_desc' should be a string`, function () {
                    expect(item.descriptor.short_desc).to.be.a('string');
                }));
                //message.order.items.price...

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price' should be an object`, function () {
                    expect(item.price).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.currency' should be a string`, function () {
                    expect(item.price.currency).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.value' should be a string`, function () {
                    expect(item.price.value).to.be.a('string');
                }));
                //message.order.items.tags....
                const arr = [{ code: "GENERAL_INFO", name: " General Information" }];
                arr.forEach((ele) => {
                    const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                    const tagItem = item?.tags[tagIndex];
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    }));

                    if (tagIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                            expect(tagItem).to.have.property("descriptor").that.is.an("object");
                            expect(tagItem).to.have.property("list").that.is.an("array");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                            expect(tagItem.descriptor.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));

                        let generalInformationArr = [{ code: "COVERAGE_AMOUNT" }, { code: "CO_PAYMENT" }, { code: "ROOM_RENT_CAP" }, { code: "RESTORATION_BENEFIT" }, { code: "CLAIM_SETTLEMENT_RATIO" }, { code: "PRE_HOSPITALIZATION_COVERAGE_DAYS" }, { code: "POST_HOSPITALIZATION_COVERAGE_DAYS" }, { code: "MATERNITY_COVERAGE" }, { code: "INITIAL_WAITING_PERIOD" }, { code: "CASHLESS_HOSPITAL" }, { code: "ROOM_CATEGORY" }, { code: "PROPOSAL_ID" }];

                        let array;
                        switch (tagItem?.descriptor?.code) {
                            case "GENERAL_INFO":
                                array = generalInformationArr;
                                break;

                            default:
                                break;
                        }

                        if (array) {
                            array.forEach((it) => {
                                const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                const listItem = tagItem?.list[listItemIndex];

                                if (tagItem?.descriptor?.code === "GENERAL_INFO") {
                                    // Optional test for GENERAL_INFO
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' have an object '${it.code}'(OPTIONAL)`, function () {
                                        if (listItem !== undefined) {
                                            expect(listItem).to.be.an("object");
                                        }
                                    }));

                                } else {
                                    // Required test for other tags like VAHAN_DETAILS
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));
                                }

                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));
                                }
                            });
                        }
                    }
                });
                //message.catalog.providers.items.time
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time' should be an object`, function () {
                    expect(item.time).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.duration' should be a string`, function () {
                    expect(item.time.duration).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.label' should be an object`, function () {
                    expect(item.time.label).to.be.a('string');
                }));
                //message.order.items.xinput
                (messageTestSuite);
                //message.order.items.add_ons
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons' should be an array`, function () {
                    expect(item.add_ons).to.be.an('array');
                }));
                if (item?.add_ons && item?.add_ons.length > 0) {
                    item.add_ons.forEach((add_ons, add_onsIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}]' should be an object`, function () {
                            expect(add_ons).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].id' should be a string`, function () {
                            expect(add_ons.id).to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price' should be an object`, function () {
                            expect(add_ons.price).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string`, function () {
                            expect(add_ons.price.currency).to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.value' should be a string`, function () {
                            expect(add_ons.price.value).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity' should be an object`, function () {
                            expect(add_ons.quantity).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected' should be an object`, function () {
                            expect(add_ons.quantity.selected).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected.count' should be a number`, function () {
                            expect(add_ons.quantity.selected.count).to.be.a("number");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor' should be an object`, function () {
                            expect(add_ons.descriptor).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.name' should be a string`, function () {
                            expect(add_ons.descriptor.name).to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.code' should be a string`, function () {
                            expect(add_ons.descriptor.code).to.be.a("string");
                        }));

                    })
                }
            })
        }

        //message.order.fulfillments

        fulfillmentsTests(message, messageTestSuite);

        message?.order?.fulfillments.forEach((ele, index) => {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}]' has a property 'state'`, function () {
                expect(ele).to.exist;
                expect(ele).to.have.property("state");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].state' has a property 'descriptor'`, function () {
                expect(ele.state).to.exist;
                expect(ele.state).to.have.property('descriptor');
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].state.descriptor' has a property 'code' which is equal to 'GRANTED'`, function () {
                expect(ele.state.descriptor).to.exist;
                expect(ele.state.descriptor).to.have.property('code').and.to.be.oneOf(["GRANTED", "INITIATED", "PROCESSING", "PROCESSED"]);
            }));
        });


        //message.order.payments

        paymentsTests(message, messageTestSuite);

        //message.order.provider

        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
            expect(message.order.provider).to.be.an("object");
        }))
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'descriptor' which is an object", function () {
            expect(message.order.provider.descriptor).to.be.an("object");
        }))
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'long_desc' which is a string", function () {
            expect(message.order.provider.descriptor.long_desc).to.be.a("string");
        }))
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'name' which is a string", function () {
            expect(message.order.provider.descriptor.name).to.be.a("string");
        }))
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'short_desc' which is a string", function () {
            expect(message.order.provider.descriptor.short_desc).to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor.images' should be an array", function () {
            expect(message.order.provider.descriptor.images).to.be.an('array');
        }));
        if (message?.order?.provider?.descriptor?.images && message?.order?.provider?.descriptor?.images.length > 0) {
            message.order.provider.descriptor.images.forEach((image, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}]' should be an object`, function () {
                    expect(image).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].url' should be a string`, function () {
                    expect(image.url).to.be.a('string');
                }));
            })

        }
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'id' which is a string", function () {
            expect(message.order.provider.id).to.be.a("string");
        }))

        //message.order.quote...

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
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));
            }
        })
        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'id' which is a string", function () {
            expect(message.order.quote).to.have.a.property("id").that.is.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.ttl' should be a string", function () {
            expect(message.order.quote.ttl).to.be.a('string');
        }));


        // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}]' should be an object`, function () {

        //     expect(`message.order.quote.breakup[${4}]`).to.be.an("object");
        // }));
        messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].title' should be a string`, function () {

            expect(`message.order.quote.breakup[${4}].title`).to.be.a("string");
        }));
        // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item' should be an object`, function () {

        //     expect(`message.order.quote.breakup[${4}].item`).to.be.an("object");
        // }));
        messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.id' should be a string`, function () {

            expect(`message.order.quote.breakup[${4}].item.id`).to.be.a("string");
        }));
        // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.add_ons' should be an array`, function () {

        //     expect(`message.order.quote.breakup[${4}].item.add_ons`).to.be.an("array");
        // }));
        // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.add_ons[${0}]' should be an object`, function () {

        //     expect(`message.order.quote.breakup[${4}].item.add_ons[${0}]`).to.be.an("object");
        // }));
        messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.add_ons[${0}].id' should be a string`, function () {

            expect(`message.order.quote.breakup[${4}].item.add_ons[${0}].id`).to.be.a("string");
        }));
        // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].price' should be an object`, function () {

        //     expect(`message.order.quote.breakup[${4}].price`).to.be.an("object");
        // }));
        messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].price.value' should be a string`, function () {

            expect(`message.order.quote.breakup[${4}].price.value`).to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].price.currency' should be a string`, function () {

            expect(`message.order.quote.breakup[${4}].price.currency`).to.be.a("string");
        }));

        //message.order.documents

        documentsTests(message, messageTestSuite);


        // return testSuite;

    } catch (error) {
        console.log(error);
        return error;
    }
}

async function marineOn_update(message, messageTestSuite, step) {
    try {
        messageTestSuite.addTest(new Mocha.Test("should verify the contents of 'message.order'", function () {
            expect(message.order).to.include.all.keys("id", "provider", "items", "quote", "fulfillments", "payments", "documents");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.id'should be present and must be a string", function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.status'should be present and must be a string", function () {
            expect(message.order.status).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
            expect(message.order.items).to.be.an('array');
        }));

        //message.order.fulfillments
        {
            fulfillmentsTests(message, messageTestSuite);

            message?.order?.fulfillments.forEach((ele, index) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}]' has a property 'state'`, function () {
                    expect(ele).to.exist;
                    expect(ele).to.have.property("state");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].state' has a property 'descriptor'`, function () {
                    expect(ele.state).to.exist;
                    expect(ele.state).to.have.property('descriptor');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].state.descriptor' has a property 'code' which is equal to 'GRANTED'`, function () {
                    expect(ele.state.descriptor).to.exist;
                    expect(ele.state.descriptor).to.have.property('code').and.to.be.oneOf(["GRANTED", "INITIATED", "PROCESSING", "PROCESSED"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${index}].customer.person' should be an object`, function () {
                    expect(ele.customer.person).to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${index}].customer.person.dob' should be a string`, function () {
                    expect(ele.customer.person.dob).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${index}].customer.person.gender' should be a string`, function () {
                    expect(ele.customer.person.gender).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${index}].customer.person.name' should be a string`, function () {
                    expect(ele.customer.person.name).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillment[${index}].customer.person.tags' should be an array`, function () {
                    expect(ele.customer.person.tags).to.be.an('array');
                }));
                if (ele?.customer?.person?.tags) {
                    const arr = [{ code: "PERSON_ADDITIONAL_DETAILS" }];
                    arr.forEach((it) => {
                        const tagIndex = ele?.customer?.person?.tags?.findIndex((tag) => tag?.descriptor?.code === it.code);
                        const tagItem = ele?.customer?.person?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));

                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags[${tagIndex}].descriptor.code' should have be equal to '${it.code}'`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(it.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));


                            const personAdditionDetailsArr = [{ code: "POLITICALLY_EXPOSED_PERSON" }, { code: "GSTIN" }];

                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "PERSON_ADDITIONAL_DETAILS":
                                    array = personAdditionDetailsArr;
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].customer.person.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));
                                    }
                                });
                            }
                        }

                    })
                }
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${index}].customer.organization' should be an object`, function () {
                    expect(ele.customer.organization).to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${index}].customer.organization.address' should be a object`, function () {
                    expect(ele.customer.organization.address).to.be.a("string");
                }));
            });
        }
        //message.order.items
        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an('object');
                }));
                //message.order.items.id
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a string`, function () {
                    expect(item.id).to.be.a('string');
                }));
                //message.order.items.parent_item_id...
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].parent_item_id' should be a string`, function () {
                    expect(item.parent_item_id).to.be.a('string');
                }));
                //message.order.items.category_ids....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids' should be an array, that should not be empty`, function () {
                    expect(item.category_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.category_ids && item?.category_ids.length > 0) {
                    item.category_ids.forEach((categoryID, categoryIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIDIndex}]' should be string`, function () {
                            expect(categoryID).to.be.a("string");
                        }));
                    })
                }

                //message.order.items.fulfillment_ids....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                    expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                    item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIDIndex}]' should be string`, function () {
                            expect(fulfillmentID).to.be.a("string");
                        }));
                    })
                }

                //message.order.items.descriptor....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor' should be an object`, function () {
                    expect(item.descriptor).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.name' should be a string`, function () {
                    expect(item.descriptor.name).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.short_desc' should be a string`, function () {
                    expect(item.descriptor.short_desc).to.be.a('string');
                }));
                //message.order.items.price...

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price' should be an object`, function () {
                    expect(item.price).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.currency' should be a string`, function () {
                    expect(item.price.currency).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.value' should be a string`, function () {
                    expect(item.price.value).to.be.a('string');
                }));
                //message.order.items.tags....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should be an array`, function () {
                    expect(item.tags).to.be.an('array');
                }));
                if (item.tags && item.tags.length > 0) {
                    item.tags.forEach((tag, tagIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should be an object`, function () {
                            expect(tag).to.be.an('object');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should be an object`, function () {
                            expect(tag.descriptor).to.be.an('object');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.name' should be a string`, function () {
                            expect(tag.descriptor.name).to.be.a('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.code' should be a string`, function () {
                            expect(tag.descriptor.code).to.be.a('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should be an array`, function () {
                            expect(tag.list).to.be.an('array');
                        }));
                        if (tag.list && tag.list.length > 0) {
                            tag.list.forEach((listItem, listIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listIndex}]' should be an object`, function () {
                                    expect(listItem).to.be.an('object');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listIndex}].descriptor' should be an object`, function () {
                                    expect(listItem.descriptor).to.be.an('object');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listIndex}].descriptor.code' should be a string`, function () {
                                    expect(listItem.descriptor.code).to.be.a('string');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listIndex}].value' should be a string`, function () {
                                    expect(listItem.value).to.be.a('string');
                                }));
                            })
                        }
                    })
                }

                //message.catalog.providers.items.time
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time' should be an object`, function () {
                    expect(item.time).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.duration' should be a string`, function () {
                    expect(item.time.duration).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.label' should be an object`, function () {
                    expect(item.time.label).to.be.a('string');
                }));
                //message.order.items.xinput
                (messageTestSuite);
                //message.order.items.add_ons
                // messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons' should be an array`, function () {
                //     expect(item.add_ons).to.be.an('array');
                // }));
                // if (item?.add_ons && item?.add_ons.length > 0) {
                //     item.add_ons.forEach((add_ons, add_onsIndex) => {
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}]' should be an object`, function () {
                //             expect(add_ons).to.be.an("object");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].id' should be a string`, function () {
                //             expect(add_ons.id).to.be.a("string");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price' should be an object`, function () {
                //             expect(add_ons.price).to.be.an("object");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string`, function () {
                //             expect(add_ons.price.currency).to.be.a("string");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.value' should be a string`, function () {
                //             expect(add_ons.price.value).to.be.a("string");
                //         }));

                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity' should be an object`, function () {
                //             expect(add_ons.quantity).to.be.an("object");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected' should be an object`, function () {
                //             expect(add_ons.quantity.selected).to.be.an("object");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected.count' should be a number`, function () {
                //             expect(add_ons.quantity.selected.count).to.be.a("number");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor' should be an object`, function () {
                //             expect(add_ons.descriptor).to.be.an("object");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.name' should be a string`, function () {
                //             expect(add_ons.descriptor.name).to.be.a("string");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.code' should be a string`, function () {
                //             expect(add_ons.descriptor.code).to.be.a("string");
                //         }));

                //     })
                // }
            })
        }
        //message.order.payments
        {
            paymentsTests(message, messageTestSuite);
        }
        //message.order.provider
        {
            messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
                expect(message.order.provider).to.be.an("object");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'descriptor' which is an object", function () {
                expect(message.order.provider.descriptor).to.be.an("object");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'long_desc' which is a string", function () {
                expect(message.order.provider.descriptor.long_desc).to.be.a("string");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'name' which is a string", function () {
                expect(message.order.provider.descriptor.name).to.be.a("string");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'short_desc' which is a string", function () {
                expect(message.order.provider.descriptor.short_desc).to.be.a("string");
            }));
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor.images' should be an array", function () {
                expect(message.order.provider.descriptor.images).to.be.an('array');
            }));
            if (message?.order?.provider?.descriptor?.images && message?.order?.provider?.descriptor?.images.length > 0) {
                message.order.provider.descriptor.images.forEach((image, i) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}]' should be an object`, function () {
                        expect(image).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].url' should be a string`, function () {
                        expect(image.url).to.be.a('string');
                    }));
                })

            }
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'id' which is a string", function () {
                expect(message.order.provider.id).to.be.a("string");
            }))
        }
        //message.order.quote...
        {

            //  quoteCommonTests(message, messageTestSuite);
            const arr = [
                { title: "PROCESSING_FEE", name: "processing fee" },
                { title: "BASE_PRICE", name: "base price" },
                { title: "TAX", name: "tax" },

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
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                        expect(breakupItem.title).to.be.equal(ele.title);
                    }));
                }
            })
            messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'id' which is a string", function () {
                expect(message.order.quote).to.have.a.property("id").that.is.a("string");
            }));
            // messageTestSuite.addTest(new Mocha.Test("'message.order.quote.ttl' should be a string", function () {
            //     expect(message.order.quote.ttl).to.be.a('string');
            // }));


            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}]' should be an object`, function () {

            //     expect(`message.order.quote.breakup[${4}]`).to.be.an("object");
            // }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].title' should be a string`, function () {

            //     expect(`message.order.quote.breakup[${4}].title`).to.be.a("string");
            // }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item' should be an object`, function () {

            //     expect(`message.order.quote.breakup[${4}].item`).to.be.an("object");
            // }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.id' should be a string`, function () {

            //     expect(`message.order.quote.breakup[${4}].item.id`).to.be.a("string");
            // }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.add_ons' should be an array`, function () {

            //     expect(`message.order.quote.breakup[${4}].item.add_ons`).to.be.an("array");
            // }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.add_ons[${0}]' should be an object`, function () {

            //     expect(`message.order.quote.breakup[${4}].item.add_ons[${0}]`).to.be.an("object");
            // }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.add_ons[${0}].id' should be a string`, function () {

            //     expect(`message.order.quote.breakup[${4}].item.add_ons[${0}].id`).to.be.a("string");
            // }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].price' should be an object`, function () {

            //     expect(`message.order.quote.breakup[${4}].price`).to.be.an("object");
            // }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].price.value' should be a string`, function () {

            //     expect(`message.order.quote.breakup[${4}].price.value`).to.be.a("string");
            // }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].price.currency' should be a string`, function () {

            //     expect(`message.order.quote.breakup[${4}].price.currency`).to.be.a("string");
            // }));
        }
        //message.order.documents
        {
            documentsTests(message, messageTestSuite);
        }

        // return testSuite;

    } catch (error) {
        console.log(error);
        return error;
    }
}

async function motorOn_update(message, messageTestSuite, logs = [])  {

     function lastActionLog(logs, action) {
        try {
            const log = logs?.filter((log) => log?.request?.context?.action === action);
            return log && log.length ? log?.pop()?.request : false;
        } catch (err) {
            console.log(err);
        }
    }

    try {
        messageTestSuite.addTest(new Mocha.Test("should verify the contents of 'message.order'", function () {
            expect(message.order).to.include.all.keys("id", "provider", "items", "quote", "fulfillments", "payments", "documents");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.id'should be present and must be a string", function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.status'should be present and must be a string", function () {
            expect(message.order.status).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
            expect(message.order.items).to.be.an('array');
        }));

        //message.order.fulfillments
        {
            fulfillmentsTests(message, messageTestSuite);

            message?.order?.fulfillments.forEach((ele, index) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}]' has a property 'state'`, function () {
                    expect(ele).to.exist;
                    expect(ele).to.have.property("state");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].state' has a property 'descriptor'`, function () {
                    expect(ele.state).to.exist;
                    expect(ele.state).to.have.property('descriptor');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].state.descriptor' has a property 'code' which is equal to 'GRANTED'`, function () {
                    expect(ele.state.descriptor).to.exist;
                    expect(ele.state.descriptor).to.have.property('code').and.to.be.oneOf(["GRANTED", "INITIATED", "PROCESSING", "PROCESSED"]);
                }));
            });
        }
        //message.order.items
        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an('object');
                }));
                //message.order.items.id
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a string`, function () {
                    expect(item.id).to.be.a('string');
                }));
                //message.order.items.parent_item_id...
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].parent_item_id' should be a string`, function () {
                    expect(item.parent_item_id).to.be.a('string');
                }));
                //message.order.items.category_ids....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids' should be an array, that should not be empty`, function () {
                    expect(item.category_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.category_ids && item?.category_ids.length > 0) {
                    item.category_ids.forEach((categoryID, categoryIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIDIndex}]' should be string`, function () {
                            expect(categoryID).to.be.a("string");
                        }));
                    })
                }

                //message.order.items.fulfillment_ids....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                    expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                    item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIDIndex}]' should be string`, function () {
                            expect(fulfillmentID).to.be.a("string");
                        }));
                    })
                }

                //message.order.items.descriptor....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor' should be an object`, function () {
                    expect(item.descriptor).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.name' should be a string`, function () {
                    expect(item.descriptor.name).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.short_desc' should be a string`, function () {
                    expect(item.descriptor.short_desc).to.be.a('string');
                }));
                //message.order.items.price...

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price' should be an object`, function () {
                    expect(item.price).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.currency' should be a string`, function () {
                    expect(item.price.currency).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.value' should be a string`, function () {
                    expect(item.price.value).to.be.a('string');
                }));
                //message.order.items.tags....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should be an array`, function () {
                    expect(item.tags).to.be.an('array');
                }));
                if (item.tags && item.tags.length > 0) {
                    item.tags.forEach((tag, tagIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should be an object`, function () {
                            expect(tag).to.be.an('object');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should be an object`, function () {
                            expect(tag.descriptor).to.be.an('object');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.name' should be a string`, function () {
                            expect(tag.descriptor.name).to.be.a('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.code' should be a string`, function () {
                            expect(tag.descriptor.code).to.be.a('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should be an array`, function () {
                            expect(tag.list).to.be.an('array');
                        }));
                        if (tag.list && tag.list.length > 0) {
                            tag.list.forEach((listItem, listIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listIndex}]' should be an object`, function () {
                                    expect(listItem).to.be.an('object');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listIndex}].descriptor' should be an object`, function () {
                                    expect(listItem.descriptor).to.be.an('object');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listIndex}].descriptor.code' should be a string`, function () {
                                    expect(listItem.descriptor.code).to.be.a('string');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listIndex}].value' should be a string`, function () {
                                    expect(listItem.value).to.be.a('string');
                                }));
                            })
                        }
                    })
                }

                //message.catalog.providers.items.time
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time' should be an object`, function () {
                    expect(item.time).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.duration' should be a string`, function () {
                    expect(item.time.duration).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.label' should be an object`, function () {
                    expect(item.time.label).to.be.a('string');
                }));
                //message.order.items.xinput
                (messageTestSuite);
                //message.order.items.add_ons
                // messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons' should be an array`, function () {
                //     expect(item.add_ons).to.be.an('array');
                // }));
                // if (item?.add_ons && item?.add_ons.length > 0) {
                //     item.add_ons.forEach((add_ons, add_onsIndex) => {
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}]' should be an object`, function () {
                //             expect(add_ons).to.be.an("object");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].id' should be a string`, function () {
                //             expect(add_ons.id).to.be.a("string");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price' should be an object`, function () {
                //             expect(add_ons.price).to.be.an("object");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string`, function () {
                //             expect(add_ons.price.currency).to.be.a("string");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.value' should be a string`, function () {
                //             expect(add_ons.price.value).to.be.a("string");
                //         }));

                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity' should be an object`, function () {
                //             expect(add_ons.quantity).to.be.an("object");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected' should be an object`, function () {
                //             expect(add_ons.quantity.selected).to.be.an("object");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected.count' should be a number`, function () {
                //             expect(add_ons.quantity.selected.count).to.be.a("number");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor' should be an object`, function () {
                //             expect(add_ons.descriptor).to.be.an("object");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.name' should be a string`, function () {
                //             expect(add_ons.descriptor.name).to.be.a("string");
                //         }));
                //         messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.code' should be a string`, function () {
                //             expect(add_ons.descriptor.code).to.be.a("string");
                //         }));

                //     })
                // }
            })
        }
        //message.order.payments
        {
            paymentsTests(message, messageTestSuite);
        }
        //message.order.provider
        {
            messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
                expect(message.order.provider).to.be.an("object");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'descriptor' which is an object", function () {
                expect(message.order.provider.descriptor).to.be.an("object");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'long_desc' which is a string", function () {
                expect(message.order.provider.descriptor.long_desc).to.be.a("string");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'name' which is a string", function () {
                expect(message.order.provider.descriptor.name).to.be.a("string");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'short_desc' which is a string", function () {
                expect(message.order.provider.descriptor.short_desc).to.be.a("string");
            }));
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor.images' should be an array", function () {
                expect(message.order.provider.descriptor.images).to.be.an('array');
            }));
            if (message?.order?.provider?.descriptor?.images && message?.order?.provider?.descriptor?.images.length > 0) {
                message.order.provider.descriptor.images.forEach((image, i) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}]' should be an object`, function () {
                        expect(image).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].url' should be a string`, function () {
                        expect(image.url).to.be.a('string');
                    }));
                })

            }
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'id' which is a string", function () {
                expect(message.order.provider.id).to.be.a("string");
            }))
        }
        //message.order.quote...
        {
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
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                        expect(breakupItem.title).to.be.equal(ele.title);
                    }));
                }
            })
            messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'id' which is a string", function () {
                expect(message.order.quote).to.have.a.property("id").that.is.a("string");
            }));
            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.ttl' should be a string", function () {
                expect(message.order.quote.ttl).to.be.a('string');
            }));


            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}]' should be an object`, function () {

            //     expect(`message.order.quote.breakup[${4}]`).to.be.an("object");
            // }));
            messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].title' should be a string`, function () {

                expect(`message.order.quote.breakup[${4}].title`).to.be.a("string");
            }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item' should be an object`, function () {

            //     expect(`message.order.quote.breakup[${4}].item`).to.be.an("object");
            // }));
            messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.id' should be a string`, function () {

                expect(`message.order.quote.breakup[${4}].item.id`).to.be.a("string");
            }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.add_ons' should be an array`, function () {

            //     expect(`message.order.quote.breakup[${4}].item.add_ons`).to.be.an("array");
            // }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.add_ons[${0}]' should be an object`, function () {

            //     expect(`message.order.quote.breakup[${4}].item.add_ons[${0}]`).to.be.an("object");
            // }));
            messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].item.add_ons[${0}].id' should be a string`, function () {

                expect(`message.order.quote.breakup[${4}].item.add_ons[${0}].id`).to.be.a("string");
            }));
            // messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].price' should be an object`, function () {

            //     expect(`message.order.quote.breakup[${4}].price`).to.be.an("object");
            // }));
            messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].price.value' should be a string`, function () {

                expect(`message.order.quote.breakup[${4}].price.value`).to.be.a("string");
            }));
            messageTestSuite.addTest(new Mocha.Test(` 'message.order.quote.breakup[${4}].price.currency' should be a string`, function () {

                expect(`message.order.quote.breakup[${4}].price.currency`).to.be.a("string");
            }));
        }
        //message.order.documents
        {
            documentsTests(message, messageTestSuite);
        }

        const prevLog = lastActionLog(logs, "on_confirm"); // previous log for on_update should be on_confirm

if (prevLog) {

    // ✅ Provider ID Check
    const prevProviderId = prevLog?.message?.order?.provider?.id;
    const currProviderId = message?.order?.provider?.id;

    messageTestSuite.addTest(new Mocha.Test(`Verify that 'message.order.provider.id' matches provider.id from previous log (curr: ${currProviderId}, prev: ${prevProviderId})`, function () {
        expect(currProviderId).to.be.a("string").and.to.equal(prevProviderId);
    }));


    // ✅ Item IDs Check
    const prevItems = prevLog?.message?.order?.items || [];
    const currItems = message?.order?.items || [];

    currItems.forEach((item, index) => {
        const prevItemId = prevItems[index]?.id;
        const currItemId = item?.id;

        messageTestSuite.addTest(new Mocha.Test(`Verify that 'message.order.items[${index}].id' matches previous items id (curr: ${currItemId}, prev: ${prevItemId})`, function () {
            expect(currItemId).to.be.a("string").and.to.equal(prevItemId);
        }));
    });


    // ✅ Fulfillment IDs Check
    const prevFulfillments = prevLog?.message?.order?.fulfillments || [];
    const currFulfillments = message?.order?.fulfillments || [];

    currFulfillments.forEach((ffm, index) => {
        const prevFulfillmentId = prevFulfillments[index]?.id;
        const currFulfillmentId = ffm?.id;

        messageTestSuite.addTest(new Mocha.Test(`Verify that 'message.order.fulfillments[${index}].id' matches previous fulfillment id (curr: ${currFulfillmentId}, prev: ${prevFulfillmentId})`, function () {
            expect(currFulfillmentId).to.be.a("string").and.to.equal(prevFulfillmentId);
        }));
    });

}

        // return testSuite;

    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = {
    on_update_fulfillment
}
