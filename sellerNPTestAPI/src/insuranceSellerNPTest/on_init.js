const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context")
const { fulfillmentsTests, quoteCommonTests, xinputForGeneral } = require('./commonTest');
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_init({ context, message } = {}, step, descriptor, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_init (${step}) Request Verification`);
        const responseTestSuite = response_verification({ context, message }, logs, constants);
        testSuite.addSuite(contextTests(context, "on_init"));
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist;
        }));
        switch (descriptor) {
            case 'MARINE_INSURANCE':
                marineOn_init(message, messageTestSuite);
                break;
            case 'HEALTH_INSURANCE':
                healthOn_init(message, messageTestSuite);
                break;
            case 'MOTOR_INSURANCE':
                motorOn_init(message, messageTestSuite, logs);
                break;
            default:
            // throw new Error("Invalid init type");
        }
        return [testSuite, responseTestSuite];

    } catch (error) {
        console.log(error);
        return error;
    }
}
function marineOn_init(message, messageTestSuite) {
    try {
        //order
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        //message.order.fulfillments
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.fulfillments' is an array", function () {
            expect(message.order.fulfillments).to.be.an("array");
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message?.order?.fulfillments.forEach((it, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}]' should be an object`, function () {
                    expect(it).to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer' should be an object`, function () {
                    expect(it.customer).to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact' should be an object`, function () {
                    expect(it.customer.contact).to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact.email' should be a string`, function () {
                    expect(it.customer.contact.email).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact.phone' should be a string`, function () {
                    expect(it.customer.contact.phone).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.person' should be an object`, function () {
                    expect(it.customer.person).to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.person.dob' should be a string`, function () {
                    expect(it.customer.person.dob).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.person.gender' should be a string`, function () {
                    expect(it.customer.person.gender).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.person.name' should be a string`, function () {
                    expect(it.customer.person.name).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.organization' should be an object`, function () {
                    expect(it.customer.organization).to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.organization.address' should be a string`, function () {
                    expect(it.customer.organization.address).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].id' should be a string`, function () {
                    expect(it.id).to.be.a("string");
                }));
            })
        }


        //message.order.items
        {
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
                    //message.order.items.id
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a string`, function () {
                        expect(item.id).to.be.a('string');
                    }));
                    //message.order.items.time
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time' should be an object`, function () {
                        expect(item.time).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.label' should be a string`, function () {
                        expect(item.time.label).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.range' should be an object`, function () {
                        expect(item.time.range).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.range.start' should be a string`, function () {
                        expect(item.time.range.start).to.be.an('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.range.end' should be a string`, function () {
                        expect(item.time.range.end).to.be.a('string');
                    }));
                    //message.order.items.tags....
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
                            let policyDetailsArr = [{ code: "COMMODITY_TYPE" }, { code: "SUM_INSURED" }, { code: "MODE_OF_CONVEYANCE" }, { code: "BASIS_OF_VALUATION" }, { code: "POLICY_START_DATE" }, { code: "INVOICE_NUMBER" }, { code: "INVOICE_DATE" }];

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
                })
            }
        }
        //message.order.payments
        {

            messageTestSuite.addTest(new Mocha.Test("'message.order.payments' should be an array", function () {
                expect(message.order.payments).to.be.an('array');
            }));
            if (message?.order?.payments && message?.order?.payments.length > 0) {
                message.order.payments.forEach((payment, z) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}]' should be an object`, function () {
                        expect(payment).to.be.an('object');
                    }));
                    //collected_by
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].collected_by' should be a string`, function () {
                        expect(payment.collected_by).to.be.a('string');
                    }));
                    //params
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params' should be an object`, function () {
                        expect(payment.params).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.amount' should be a string`, function () {
                        expect(payment.params.amount).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.bank_account_number' should be a string`, function () {
                        expect(payment.params.bank_account_number).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.bank_code' should be a string`, function () {
                        expect(payment.params.bank_code).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.currency' should be a string`, function () {
                        expect(payment.params.currency).to.be.a('string');
                    }));
                    //status
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].status' should be a string`, function () {
                        expect(payment.status).to.be.a('string');
                    }));
                    //time
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].time' should be an object`, function () {
                        expect(payment.time).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].time.range' should be an object`, function () {
                        expect(payment.time.range).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].time.range.end' should be an string`, function () {
                        expect(payment.time.range.end).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].time.range.start' should be a string`, function () {
                        expect(payment.time.range.start).to.be.a('string');
                    }));
                    //type
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].type' should be a string`, function () {
                        expect(payment.type).to.be.a('string').and.to.be.oneOf(["PRE-FULFILLMENT", "ON-ORDER", "PRE-ORDER", "ON-FULFILLMENT"]);
                    }));

                    //url
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].url' should be a string`, function () {
                        expect(payment.url).to.be.a('string');
                    }));

                    //tags  
                    const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];
                    arr.forEach((ele) => {
                        const tagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = payment?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));

                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("display").that.is.a("boolean");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].display' should have be equal to false`, function () {
                                expect(tagItem.display).to.be.equal(false);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            const buyerFinderFeeArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_PERCENTAGE", name: "buyer finder fees percentage" }];
                            const settlementTermsArr = [{ code: "DELAY_INTEREST", name: "delay interest" }, { code: "STATIC_TERMS", name: "static terms" }];

                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "BUYER_FINDER_FEES":
                                    array = buyerFinderFeeArr;
                                    break;
                                case "SETTLEMENT_TERMS":
                                    array = settlementTermsArr;
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));
                                    }
                                    switch (listItem?.descriptor?.code) {
                                        case "SETTLEMENT_AMOUNT":
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be equal to ${settlementAmount.toFixed(2)} (SETTLEMENT_AMOUNT)`, function () {
                                                expect(listItem.value).to.be.oneOf([settlementAmount.toFixed(2)]);
                                            }));
                                            break;
                                        default:
                                            break;
                                    }

                                });
                            }
                        }
                    });
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
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].url' should be a string`, function () {
                        expect(image.url).to.be.a('string');
                    }));
                })

            }
        }
        //message.order.quote
        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'quote' which is a object", function () {
            expect(message.order).to.have.a.property("quote").that.is.a("object");
        }));

        const arr = [
            { title: "BASE_PRICE", name: "base price" },
            { title: "TAX", name: "tax" },
            { title: "PROCESSING_FEE", name: "processing fee" }
            // { title: "CONVIENCE_FEE", name: "convience fee" },
            // { title: "ADD_ONS", name: "add ons" }
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
                // messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string`, function () {
                //     expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                // }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));
            }
        })

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'price' which is an object", function () {
            expect(message.order.quote.price).to.be.a("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote.price' should have a property named as 'currency' which is an string", function () {
            expect(message.order.quote.price.currency).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote.price' should have a property named as 'value' which is an string", function () {
            expect(message.order.quote.price.value).to.be.a("string");
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
        console.log(error)
        return error;
    }
}
function healthOn_init(message, messageTestSuite, step) {
    try {
        //order
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        //message.order.fulfillments
        fulfillmentsTests(message, messageTestSuite);
        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message?.order?.fulfillments.forEach((it, i) => {
                // messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}]' should be an object`, function () {
                //     expect(it).to.be.an("object");
                // }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].id' should be a string`, function () {
                    expect(it.id).to.be.a("string");
                }));
            })
        }
        if (step === "II") {
            if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
                message?.order?.fulfillments.forEach((it, i) => {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}]' should be an object`, function () {
                        expect(it).to.be.an("object").that.includes.all.keys("customer");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.person' should be an object`, function () {
                        expect(it.customer.person).to.be.an("object").that.includes.a.key("name");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.person.name' should be a string`, function () {
                        expect(it.customer.person.name).to.be.a("string");
                    }));
                })
            }
        }
        //message.order.items..

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
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.short_desc' should be a string`, function () {
                    expect(item.descriptor.short_desc).to.be.a('string');
                }));
                //message.order.items.id
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a string`, function () {
                    expect(item.id).to.be.a('string');
                }));
                //message.order.items.parent_item_id...
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
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should have properties named 'descriptor',  and  'list'`, function () {
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

                                // messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                //     expect(listItem).to.exist.and.to.be.an("object");
                                // }));

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
                //message.order.tems.xinput
                xinputForGeneral(message, messageTestSuite, i);
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
                            expect(add_ons.descriptor.code).to.be.a("string");
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
        //message.order.payments
        {

            messageTestSuite.addTest(new Mocha.Test("'message.order.payments' should be an array", function () {
                expect(message.order.payments).to.be.an('array');
            }));
            if (message?.order?.payments && message?.order?.payments.length > 0) {
                message?.order?.payments.forEach((payment, z) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}]' should be an object`, function () {
                        expect(payment).to.be.an('object');
                    }));
                    //collected_by
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].collected_by' should be a string`, function () {
                        expect(payment.collected_by).to.be.a('string');
                    }));
                    //url
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].url' should be a string`, function () {
                        expect(payment.url).to.be.a('string');
                    }));
                    //status
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].status' should be a string`, function () {
                        expect(payment.status).to.be.a('string');
                    }));

                    //type
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].type' should be a string`, function () {
                        const validTypes = ["PRE-FULFILLMENT", "ON-ORDER", "PRE-ORDER", "ON-FULFILLMENT"];
                        expect(payment.type).to.be.a('string').and.to.be.oneOf(validTypes);
                    }));

                    //params
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params' should be an object`, function () {
                        expect(payment.params).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.amount' should be a string (OPTIONAL)`, function () {
                        expect(payment.params.amount).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.bank_account_number' should be a string`, function () {
                        expect(payment.params.bank_account_number).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.bank_code' should be a string`, function () {
                        expect(payment.params.bank_code).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.currency' should be a string`, function () {
                        expect(payment.params.currency).to.be.a('string');
                    }));
                    //tags  
                    const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];
                    arr.forEach((ele) => {
                        const tagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = payment?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));

                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("display").that.is.a("boolean");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].display' should have be equal to false`, function () {
                                expect(tagItem.display).to.be.equal(false);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            const buyerFinderFeeType = tagItem.list?.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
                            const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }]
                            const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];
                            const settlementTermsArr = [{ code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "DELAY_INTEREST" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];

                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "BUYER_FINDER_FEES":
                                    switch (buyerFinderFeeType) {
                                        case "amount":
                                            array = buyerFinderFeeAmountArr;
                                            break;
                                        case "percent":
                                        case "percent-annualized":
                                            array = buyerFinderFeePercent;
                                            break;
                                        default:
                                            break;
                                    }
                                    break;
                                case "SETTLEMENT_TERMS":
                                    array = settlementTermsArr;
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));
                                    }
                                    switch (listItem?.descriptor?.code) {
                                        case "SETTLEMENT_AMOUNT":
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be equal to ${settlementAmount.toFixed(2)} (SETTLEMENT_AMOUNT)`, function () {
                                                expect(listItem.value).to.be.oneOf([settlementAmount.toFixed(2)]);
                                            }));
                                            break;
                                        default:
                                            break;
                                    }
                                });
                            }
                        }
                    });
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
                message?.order?.provider.descriptor.images.forEach((image, i) => {
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
                        expect(breakupItem).to.have.property("title").that.is.a("string").and.equal(ele.title);
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

                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.id should be a string (OPTIONAL)`, function () {
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
            messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'ttl' which is a string ", function () {
                expect(message.order.quote).to.have.a.property("ttl").that.is.a("string");
            }));

        }
    } catch (error) {
        console.log(error)
        return error;
    }
}
function motorOn_init(message, messageTestSuite, logs = []) {

    function lastActionLog(logs, action) {
        try {
            const log = logs?.filter((log) => log?.request?.context?.action === action);
            return log && log.length ? log?.pop()?.request : false;
        } catch (err) {
            console.log(err);
        }
    }

    try {
        //order
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        //message.order.fulfillments
        {
            messageTestSuite.addTest(new Mocha.Test("'message.order.fulfillment' should be an array", function () {
                expect(message.order.fulfillments).to.exist.and.to.be.an("array").that.is.not.empty;
            }));

            if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
                message?.order?.fulfillments.forEach((it, i) => {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}]' should be an object`, function () {
                        expect(it).to.be.an("object").that.includes.all.keys("customer", "id");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].id' should be a string`, function () {
                        expect(it.id).to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].type' should be a string`, function () {
                        expect(it.type).to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.person' should be an object`, function () {
                        expect(it.customer.person).to.be.an("object").that.includes.a.key("name");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.person.name' should be a string`, function () {
                        expect(it.customer.person.name).to.be.a("string");
                    }));

                })
            }
        }
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
                    //message.order.item.fulfillment_id
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array`, function () {
                        expect(item.fulfillment_ids).to.be.an('array');
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
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.images' should be an array`, function () {
                        expect(item.descriptor.images).to.be.an('array');
                    }));
                    if (item?.descriptor?.images && item?.descriptor?.images?.length > 0) {
                        item.descriptor.images.forEach((image, imageIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.images[${imageIndex}]' should be an object`, function () {
                                expect(image).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.images[${imageIndex}].url' should be a string (OPTIONAL)`, function () {
                                expect(image.url).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.images[${imageIndex}].size_type' should be a string (OPTIONAL)`, function () {
                                expect(image.size_type).to.be.a('string');
                            }));
                        })
                    }

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
                    //message.order.items.xinput
                    xinputForGeneral(i, messageTestSuite);
                    //message.order.items.tags....
                    const arr = [{ code: "GENERAL_INFO", name: " General Information" }];
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

                            let generalInformationArr = [{ code: "PERSONAL_ACCIDENT_COVER" }, { code: "DEPRECIATION_COVER" }, { code: "ROAD_SIDE_ASSISTANCE" }, { code: "CONSUMABLES_COVER" }, { code: "ELECTRICAL_ACCESSORIES_COVER" }, { code: "NON_ELECTRICAL_ACCESSORIES_COVER" }, { code: "ENGINE_COVER" }, { code: "EXTERNAL_CNG_OR_LPG_COVER" }, { code: "KEY_COVER" }, { code: "PERSONAL_BAGGAGE_COVER" }, { code: "TYRE_COVER" }, { code: "RETURN_TO_INVOICE" }, { code: "PER_DAY_CASH" }, { code: "MANUAL_REVIEW" }, { code: "IDV_VALUE" }];


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

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'(OPTIONAL)`, function () {
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
                })
            }
        }
        //message.order.payments...
        {

            messageTestSuite.addTest(new Mocha.Test("'message.order.payments' should be an array", function () {
                expect(message.order.payments).to.be.an('array');
            }));
            if (message?.order?.payments && message?.order?.payments.length > 0) {
                message?.order?.payments.forEach((payment, z) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}]' should be an object`, function () {
                        expect(payment).to.be.an('object');
                    }));
                    //collected_by
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].collected_by' should be a string`, function () {
                        expect(payment.collected_by).to.be.a('string');
                    }));
                    //url
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].url' should be a string`, function () {
                        expect(payment.url).to.be.a('string');
                    }));

                    //params
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params' should be an object`, function () {
                        expect(payment.params).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.amount' should be a string`, function () {
                        expect(payment.params.amount).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.bank_account_number' should be a string`, function () {
                        expect(payment.params.bank_account_number).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.bank_code' should be a string`, function () {
                        expect(payment.params.bank_code).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.currency' should be a string`, function () {
                        expect(payment.params.currency).to.be.a('string');
                    }));
                    //status
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].status' should be a string`, function () {
                        expect(payment.status).to.be.a('string');
                    }));

                    //type
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].type' should be a string`, function () {
                        expect(payment.type).to.be.a('string').and.to.be.oneOf(["PRE-FULFILLMENT", "ON-ORDER", "PRE-ORDER", "ON-FULFILLMENT"]);
                    }));
                    //tags  
                    const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];
                    arr.forEach((ele) => {
                        const tagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = payment?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));

                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("display").that.is.a("boolean");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].display' should have be equal to false`, function () {
                                expect(tagItem.display).to.be.equal(false);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            const buyerFinderFeeArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_PERCENTAGE", name: "buyer finder fees percentage" }];
                            const settlementTermsArr = [{ code: "DELAY_INTEREST", name: "delay interest" }, { code: "STATIC_TERMS", name: "static terms" }];

                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "BUYER_FINDER_FEES":
                                    array = buyerFinderFeeArr;
                                    break;
                                case "SETTLEMENT_TERMS":
                                    array = settlementTermsArr;
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));
                                    }
                                    switch (listItem?.descriptor?.code) {
                                        case "SETTLEMENT_AMOUNT":
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be equal to ${settlementAmount.toFixed(2)} (SETTLEMENT_AMOUNT)`, function () {
                                                expect(listItem.value).to.be.oneOf([settlementAmount.toFixed(2)]);
                                            }));
                                            break;
                                        default:
                                            break;
                                    }
                                });
                            }
                        }
                    });
                })
            }
            //message.order.provider
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider' is an object", function () {
                expect(message.order.provider).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider.id' is a string", function () {
                expect(message.order.provider.id).to.exist.and.to.be.a("string");
            }));
        }
        //message.order.quote...
        {
            quoteCommonTests(message, messageTestSuite);
            const arr = [
                { title: "PROCESSING_FEE" },
                { title: "BASE_PRICE" },
                { title: "TAX" },
                { title: "CONVIENCE_FEE" },
                { title: "ADD_ONS" }
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
        }
        //message.order.cancellation_terms...
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation_terms' and that should be an array", function () {
            expect(message.order.cancellation_terms).to.exist.that.is.an("array");
        }));
        if (message?.order?.cancellation_terms && message?.order?.cancellation_terms.length > 0) {
            message.order.cancellation_terms.forEach((C_terms, C_termsIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}]' and that should be an object`, function () {
                    expect(C_terms).to.exist.that.is.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref' and that should be an object`, function () {
                    expect(C_terms.external_ref).to.exist.that.is.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.mimetype' and that should be a string`, function () {
                    expect(C_terms.external_ref.mimetype).to.exist.that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.url' and that should be a string`, function () {
                    expect(C_terms.external_ref.url).to.exist.that.is.a("string");
                }));
            })
        }


        const selectLog = lastActionLog(logs, "select");

        if (selectLog) {

            //  Provider ID Check
            const prevProviderId = selectLog?.message?.order?.provider?.id;
            const currProviderId = message?.order?.provider?.id;

            messageTestSuite.addTest(new Mocha.Test(`Verify that 'message.order.provider.id' matches provider.id from previous log (curr: ${currProviderId}, prev: ${prevProviderId})`, function () {
                expect(currProviderId).to.be.a("string").and.to.equal(prevProviderId);
            }
            ));


            //  Item IDs Check
            const prevItems = selectLog?.message?.order?.items || [];
            const currItems = message?.order?.items || [];

            currItems.forEach((item, index) => {
                const prevItemId = prevItems[index]?.id;
                const currItemId = item?.id;

                messageTestSuite.addTest(new Mocha.Test(`Verify that 'message.order.items[${index}].id' matches previous items id (curr: ${currItemId}, prev: ${prevItemId})`, function () {
                    expect(currItemId).to.be.a("string").and.to.equal(prevItemId);
                }
                ));
            });


            //  Fulfillment IDs Check
            const prevFulfillments = selectLog?.message?.order?.fulfillments || [];
            const currFulfillments = message?.order?.fulfillments || [];

            currFulfillments.forEach((ffm, index) => {
                const prevFulfillmentId = prevFulfillments[index]?.id;
                const currFulfillmentId = ffm?.id;

                messageTestSuite.addTest(new Mocha.Test(`Verify that 'message.order.fulfillments[${index}].id' matches previous fulfillment id (curr: ${currFulfillmentId}, prev: ${prevFulfillmentId})`, function () {
                    expect(currFulfillmentId).to.be.a("string").and.to.equal(prevFulfillmentId);
                }
                ));
            });

        }


    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = {
    on_init
}