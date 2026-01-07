const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context");
const { quoteCommonTests, xinputForGeneral } = require('./commonTest');
const response_verification = require("../centralizedUtilities/responseVerification");


async function on_select({ context, message } = {}, step, descriptor,logs = [],constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_select (${step}) Request Verification`);
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        testSuite.addSuite(contextTests(context, "on_select"));
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist;
        }));

        switch (descriptor) {
            case 'MARINE_INSURANCE':
                marineOn_select(message, messageTestSuite);
                break;
            case 'HEALTH_INSURANCE':
                healthOn_select(message, messageTestSuite);
                break;
            case 'MOTOR_INSURANCE':
                motorOn_select(message, messageTestSuite);
                break;
            default:
            // throw new Error("Invalid select type");
        }

         return [testSuite,responseTestSuite];

    } catch (error) {
        console.log(error);
        return error;
    }
}

function marineOn_select(message, messageTestSuite, step) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message.order' should exist and be an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        //message.order.items

        messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
            expect(message.order.items).to.be.an('array').that.has.lengthOf("1");
        }));
        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an('object');
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

                //message.order.items.descriptor....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor' should be an object`, function () {
                    expect(item.descriptor).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.name' should be a string`, function () {
                    expect(item.descriptor.name).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.short_desc' should be a string (OPTIONAL)`, function () {
                    expect(item.descriptor.short_desc).to.be.a('string');
                }));
                //message.order.items.id
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a string`, function () {
                    expect(item.id).to.be.a('string');
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
                //message.order.items.tags...
                const arr = [{ code: "POLICY_DETAILS", name: "Policy Details" }];
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

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.name' should have be equal to '${ele.name}'`, function () {
                            expect(tagItem.descriptor.name).to.be.equal(ele.name);
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
                        let policyDetailsArr = [{ code: "COMMODITY_TYPE" }, { code: "SUM_INSURED" }, { code: "MODE_OF_CONVEYANCE" }, { code: "BASIS_OF_VALUATION" }];

                        if (step === "II") {
                            policyDetailsArr = [...policyDetailsArr, { code: "POLICY_START_DATE" }, { code: "INVOICE_NUMBER" }, { code: "INVOICE_DATE" }]
                        }

                        let array;
                        switch (tagItem?.descriptor?.code) {
                            case "POLICY_DETAILS":
                                array = policyDetailsArr;
                                break;
                            default:
                                break;
                        }

                        if (array) {
                            array.forEach((it) => {
                                const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                const listItem = tagItem?.list[listItemIndex];

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                    expect(listItem).to.exist.and.to.be.an("object");
                                }));

                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("name").that.is.a("string");
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
                //message.order.items.xinput....
                xinputForGeneral(message, messageTestSuite);
            })
        }

        //message.order.provider
        {
            messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
                expect(message.order.provider).to.be.an("object");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'descriptor' which is an object", function () {
                expect(message.order.provider.descriptor).to.be.an("object");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'long_desc' which is a string (OPTIONAL)", function () {
                expect(message.order.provider.descriptor.long_desc).to.be.a("string");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'name' which is a string", function () {
                expect(message.order.provider.descriptor.name).to.be.a("string");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'short_desc' which is a string (OPTIONAL)", function () {
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
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].url' should be a string (OPTIONAL)`, function () {
                        expect(image.url).to.be.a('string');
                    }));
                })

            }
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'id' which is a string", function () {
                expect(message.order.provider.id).to.be.a("string");
            }))
        }
        //message.order.quote...

        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'quote' which is a object", function () {
            expect(message.order).to.have.a.property("quote").that.is.a("object");
        }));

        const arr = [
            { title: "BASE_PRICE", name: "base price" },
            { title: "TAX", name: "tax" },
            { title: "PROCESSING_FEE", name: "processing fee" },

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
                    expect(breakupItem).to.have.property("title").that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string`, function () {
                    expect(breakupItem.price).to.have.property("value").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));
            }
        })

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'price' which is an object", function () {
            expect(message.order.quote).to.have.a.property("price").that.is.a("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote.price' should have a property named as 'currency' which is an string", function () {
            expect(message.order.quote.price).to.have.a.property("currency").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote.price' should have a property named as 'value' which is an string", function () {
            expect(message.order.quote.price).to.have.a.property("value").that.is.a("string");
        }));

        const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
            return total + parseFloat(item.price.value);
        }, 0);

        const roundedTotal = Math.round(totalBreakupPrice * 100) / 100;

        const quotePriceValue = parseFloat(message.order.quote.price.value);

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
            expect(quotePriceValue).to.be.oneOf([roundedTotal, Math.floor(roundedTotal), Math.ceil(roundedTotal)]);
        }));


    } catch (error) {
        console.log(error);
        return error;
    }
}

function healthOn_select(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message.order' should exist and be an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        //message.order.items
        messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
            expect(message.order.items).to.be.an('array');
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an('object');
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

                //message.order.items.descriptor....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor' should be an object`, function () {
                    expect(item.descriptor).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.name' should be a string`, function () {
                    expect(item.descriptor.name).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.short_desc' should be a string (OPTIONAL)`, function () {
                    expect(item.descriptor.short_desc).to.be.a('string');
                }));
                //message.order.items.id
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a string`, function () {
                    expect(item.id).to.be.a('string');
                }));
                //message.order.items.parent_item_id
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].parent_item_id' should be a string`, function () {
                    expect(item.parent_item_id).to.be.a('string');
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
                const arr = [{ code: "GENERAL_INFO" }];
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

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.name' should have be equal to '${ele.name}'`, function () {
                            expect(tagItem.descriptor.name).to.be.a("string");
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
                        const generalInformationArr = [{ code: "COVERAGE_AMOUNT" }, { code: "CO_PAYMENT" }, { code: "ROOM_RENT_CAP" }, { code: "RESTORATION_BENEFIT" }, { code: "CLAIM_SETTLEMENT_RATIO" }, { code: "PRE_HOSPITALIZATION_COVERAGE_DAYS" }, { code: "POST_HOSPITALIZATION_COVERAGE_DAYS" }, { code: "MATERNITY_COVERAGE" }, { code: "INITIAL_WAITING_PERIOD" }, { code: "CASHLESS_HOSPITALS" }, { code: "ROOM_CATEGORY" }, { code: "PROPOSAL_ID" }];


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

                                if (it.code !== "PROPOSAL_ID") {
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

                                    if (it.code === "PROPOSAL_ID") {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}' (OPTIONAL)`, function () {
                                            if (listItem) {
                                                expect(listItem.descriptor.code).to.be.equal(it.code);
                                            }
                                        }));
                                    } else {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));
                                    }

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));
                                }
                            });
                        }
                    }
                });
                //message.order.providers.items.time
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time' should be an object`, function () {
                    expect(item.time).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.duration' should be a string`, function () {
                    expect(item.time.duration).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.label' should be an object`, function () {
                    expect(item.time.label).to.be.a('string');
                }));
                //message.order.items.xinput....
                xinputForGeneral(message, messageTestSuite, i);
                //message.order.items.add_ons....

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons' should be an array(OPTIONAL)`, function () {
                    expect(item.add_ons).to.be.an('array');
                }));
                if (item?.add_ons && item?.add_ons.length > 0) {
                    item.add_ons.forEach((add_ons, add_onsIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}]' should be an object (OPTIONAL)`, function () {
                            expect(add_ons).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].id' should be a string (OPTIONAL)`, function () {
                            expect(add_ons.id).to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity' should be an object (OPTIONAL)`, function () {
                            expect(add_ons.quantity).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected' should be an object (OPTIONAL)`, function () {
                            expect(add_ons.quantity.selected).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected.count' should be a number (OPTIONAL)`, function () {
                            expect(add_ons.quantity.selected.count).to.be.a("number");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor' should be an object (OPTIONAL)`, function () {
                            expect(add_ons.descriptor).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.name' should be a string (OPTIONAL)`, function () {
                            expect(add_ons.descriptor.name).to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.code' should be one of the specified values (OPTIONAL)`, function () {
                            expect(add_ons.descriptor.code).to.be.a("string")
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price' should be an object (OPTIONAL)`, function () {
                            expect(add_ons.price).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.value' should be a string (OPTIONAL)`, function () {
                            expect(add_ons.price.value).to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string (OPTIONAL)`, function () {
                            expect(add_ons.price.currency).to.be.a("string");
                        }));
                    })
                }
            })
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
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].size_type' should be a string `, function () {
                        expect(image.size_type).to.be.a('string');
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
                    if (breakupItem?.title === "ADD_ONS") {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should have properties named 'price', 'title'`, function () {
                            expect(breakupItem).to.have.property("price").that.is.an("object");
                            expect(breakupItem.price).to.have.property("value").that.is.a("string");
                            expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                            expect(breakupItem).to.have.property("item").that.is.an("object");
                            expect(breakupItem).to.have.property("title").that.is.a("string");
                        }));
                    }
                    if (breakupItem?.title !== "ADD_ONS") {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should have properties named 'price', 'title'`, function () {
                            expect(breakupItem).to.have.property("price").that.is.an("object");
                            expect(breakupItem.price).to.have.property("value").that.is.a("string");
                            expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                            expect(breakupItem).to.have.property("title").that.is.a("string");
                        }));
                    }
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                        expect(breakupItem).to.have.property("price").that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string`, function () {
                        expect(breakupItem.price).to.have.property("value").that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string`, function () {
                        expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                    }));
                    if (breakupItem?.item) {
                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}] should have an 'item' property`, function () {
                            expect(breakupItem).to.have.property("item");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item should be an object`, function () {
                            expect(breakupItem.item).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item should have an 'id' property`, function () {
                            expect(breakupItem.item).to.have.property("id");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.id should be a string`, function () {
                            expect(breakupItem.item.id).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item should have an 'add_ons' property`, function () {
                            expect(breakupItem.item).to.have.property("add_ons");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.add_ons should be an array`, function () {
                            expect(breakupItem.item.add_ons).to.be.an("array");
                        }));
                        if (breakupItem?.item.add_ons && breakupItem?.item?.add_ons.length > 0) {
                            breakupItem.item.add_ons.forEach((add_on, add_onIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.add_ons[${add_onIndex}] should be an object`, function () {
                                    expect(add_on).to.be.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.add_ons[${add_onIndex}].id should be a string`, function () {
                                    expect(add_on.id).to.be.a("string");
                                }));
                            })
                        }
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

            const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
                return total + parseFloat(item.price.value);
            }, 0);

            const roundedTotal = Math.round(totalBreakupPrice * 100) / 100;

            const quotePriceValue = parseFloat(message.order.quote.price.value);

            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
                expect(quotePriceValue).to.be.oneOf([roundedTotal, Math.floor(roundedTotal), Math.ceil(roundedTotal)]);
            }));

        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

function motorOn_select(message, messageTestSuite) {
    try {
        //order
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        //message.order.items...
        {
            messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
                expect(message.order.items).to.be.an('array');
            }));
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
                    const arr = [{ code: "GENERAL_INFO", name: " General Information" }, { code: "VAHAN_DETAILS", name: "Vahan Details" }];
                    arr.forEach((ele) => {
                        const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = item?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should have an object of ${ele.code} (OPTIONAL)`, function () {
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

                            let generalInformationArr = [{ code: "PERSONAL_ACCIDENT_COVER" }, { code: "DEPRECIATION_COVER" }, { code: "ROAD_SIDE_ASSISTANCE" }, { code: "CONSUMABLES_COVER" }, { code: "ELECTRICAL_ACCESSORIES_COVER" }, { code: "NON_ELECTRICAL_ACCESSORIES_COVER" }, { code: "ENGINE_COVER" }, { code: "EXTERNAL_CNG_OR_LPG_COVER" }, { code: "KEY_COVER" }, { code: "PERSONAL_BAGGAGE_COVER" }, { code: "TYRE_COVER" }, { code: "RETURN_TO_INVOICE" }, { code: "PER_DAY_CASH" }];

                            let vahanDetailsArr = [{ code: "MODEL" }, { code: "MAKE" }, { code: "FUEL_TYPE" }, { code: "VARIANT" }, { code: "REGISTERED_CITY" }, { code: "REGISTERED_DATE" }, { code: "CHASSIS_NUMBER" }, { code: "ENGINE_NUMBER" }, { code: "PREVIOUS_POLICY_NUMBER" }, { code: "PREVIOUS_INSURER" }, { code: "PREVIOUS_POLICY_END_DATE" },]

                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "GENERAL_INFO":
                                    array = generalInformationArr;
                                    break;
                                case "VAHAN_DETAILS":
                                    array = vahanDetailsArr;
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}' (OPTIONAL)`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

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
                    //message.order.providers.items.time
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
                    xinputForGeneral(message, messageTestSuite)

                    //message.order.items.add_ons
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons' should be an array (OPTIONAL)`, function () {
                        expect(item.add_ons).to.be.an('array');
                    }));
                    if (item?.add_ons && item?.add_ons.length > 0) {
                        item.add_ons.forEach((add_ons, add_onsIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}]' should be an object (OPTIONAL)`, function () {
                                expect(add_ons).to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].id' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.id).to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price' should be an object (OPTIONAL)`, function () {
                                expect(add_ons.price).to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.price.currency).to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.value' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.price.value).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity' should be an object (OPTIONAL)`, function () {
                                expect(add_ons.quantity).to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected' should be an object (OPTIONAL)`, function () {
                                expect(add_ons.quantity.selected).to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected.count' should be a number (OPTIONAL)`, function () {
                                expect(add_ons.quantity.selected.count).to.be.a("number");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor' should be an object (OPTIONAL)`, function () {
                                expect(add_ons.descriptor).to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.name' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.descriptor.name).to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.code' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.descriptor.code).to.be.a("string");
                            }));

                        })
                    }
                })
            }
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
            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.ttl' should be a string", function () {
                expect(message.order.quote.ttl).to.be.a('string');
            }));

            const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
                return total + parseFloat(item.price.value);
            }, 0);

            const roundedTotal = Math.round(totalBreakupPrice * 100) / 100;

            const quotePriceValue = parseFloat(message.order.quote.price.value);

            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
                expect(quotePriceValue).to.be.oneOf([roundedTotal, Math.floor(roundedTotal), Math.ceil(roundedTotal)]);
            }));

        }

    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    on_select
}





