const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context");
const { quoteCommonTests, fulfillmentsTests } = require('./commonTest');
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_confirm({ context, message } = {}, descriptor, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("on_confirm Request Verification");
        const responseTestSuite = response_verification({ context, message }, logs, constants);
        testSuite.addSuite(contextTests(context, "on_confirm", testSuite));
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist;
        }));

        switch (descriptor) {
            case 'MARINE_INSURANCE':
                marineOn_confirm(message, messageTestSuite);
                break;
            case 'HEALTH_INSURANCE':
                healthOn_confirm(message, messageTestSuite);
                break;
            case 'MOTOR_INSURANCE':
                motorOn_confirm(message, messageTestSuite, logs);
                break;
            default:
            // throw new Error("Invalid confirm type");
        }
        return [testSuite, responseTestSuite];

    } catch (error) {
        console.log(error);
        return error;
    }
}

//marine on_confirm...
function marineOn_confirm(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object object", function () {
            expect(message.order).to.exist.that.is.an("object");
        }));
        //message.order.id
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.id' which is a string ", function () {
            expect(message.order.id).to.exist.that.is.a("string");
        }));
        //message.order.status
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.status' which is a string ", function () {
            expect(message.order.status).to.exist.that.is.a("string");
        }));
        //message.order.fulfillments
        {
            fulfillmentsTests(message, messageTestSuite);

            if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
                message.order.fulfillments.forEach((it, i) => {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}]' should be an object`, function () {
                        expect(it).to.be.an("object").that.includes.all.keys("customer");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.person' should be an object`, function () {
                        expect(it.customer.person).to.be.an("object").that.includes.a.key("name");
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

                    const arr = [{ code: "PERSON_ADDITIONAL_DETAILS" }];
                    arr.forEach((ele) => {
                        if (it.customer.person?.tags) {
                            const tagIndex = it.customer.person.tags.findIndex((tag) => tag.descriptor.code === ele.code);
                            const tagItem = it.customer.person.tags[tagIndex];

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags' should have an object of ${ele.code}`, function () {
                                expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                            }));

                            if (tagIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].descriptor.code' should be equal to '${ele.code}'`, function () {
                                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list' should be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));

                                const personalAdditionalDetailsArr = [{ code: "POLITICALLY_EXPOSED_PERSON" }, { code: "GSTIN" }];

                                let array;
                                switch (tagItem?.descriptor?.code) {
                                    case "PERSON_ADDITIONAL_DETAILS":
                                        array = personalAdditionalDetailsArr;
                                        break;

                                    default:
                                        break;
                                }

                                if (array) {
                                    array.forEach((it) => {
                                        const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                        const listItem = tagItem?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                            expect(listItem).to.exist.and.to.be.an("object");
                                        }));

                                        if (listItemIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                expect(listItem).to.have.property("value").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                expect(listItem.descriptor.code).to.be.equal(it.code);
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                            }));
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));
                                        }
                                    });
                                }
                            }
                        }
                    });
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.organization' should be an object`, function () {
                        expect(it.customer.organization).to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.organization.address' should be a string`, function () {
                        expect(it.customer.organization.address).to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].id' should be a string`, function () {
                        expect(it.id).to.be.a("string");
                    }));
                });
            }
        }

        //message.order.items...
        {
            messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
                expect(message.order.items).to.be.an('array').that.has.lengthOf("1");
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
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.transaction_id' should be a string`, function () {
                        expect(payment.params.transaction_id).to.be.a('string');
                    }));
                    //status
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].status' should be a string`, function () {
                        expect(payment.status).to.be.a('string').to.be.equal("PAID");
                    }));
                    //type
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].type' should be a string`, function () {
                        expect(payment.type).to.be.a('string').and.to.be.oneOf(["PRE-FULFILLMENT", "ON-ORDER", "PRE-ORDER", "ON-FULFILLMENT"]);
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

                    //url
                    if (payment?.url) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].url' should be a string`, function () {
                            expect(payment.url).to.be.a('string');
                        }));
                    }

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
        //message.order.provider
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

        //message.order.cancellation_terms
        {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation_terms' and that should be an array", function () {
                expect(message.order.cancellation_terms).to.exist.that.is.an("array");
            }));
            if (message?.order?.cancellation_terms && message?.order?.cancellation_terms.length > 0) {
                message.order.cancellation_terms.forEach((C_terms, C_termsIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}]' and that should be an object`, function () {
                        expect(C_terms).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].fulfillment_state' and that should be an object`, function () {
                        expect(C_terms.fulfillment_state).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].fulfillment_state.descriptor' and that should be an object`, function () {
                        expect(C_terms.fulfillment_state.descriptor).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].fulfillment_state.descriptor.name' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.fulfillment_state.descriptor.name).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].fulfillment_state.descriptor.code' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.fulfillment_state.descriptor.code).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee' and that should be an object`, function () {
                        expect(C_terms.cancellation_fee).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.percentage' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.cancellation_fee.percentage).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref' and that should be an object`, function () {
                        expect(C_terms.external_ref).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.mimetype' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.external_ref.mimetype).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.url' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.external_ref.url).to.exist.that.is.a("string");
                    }));
                })
            }
        }

        //message.order.documents
        if (message?.order?.cancellation_terms[1]?.fulfillment_state?.descriptor?.code === "INSURANCE_GRANTED") {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.documents' and that should be an array", function () {
                expect(message.order.documents).to.exist.that.is.an("array");
            }));
            if (message?.order?.documents && message?.order?.documents.length > 0) {
                message.order.documents.forEach((document, documentIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}]' and that should be an object`, function () {
                        expect(document).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor' and that should be an object`, function () {
                        expect(document.descriptor).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.code' and that should be a string`, function () {
                        expect(document.descriptor.code).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.name' and that should be a string`, function () {
                        expect(document.descriptor.name).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.short_desc' and that should be a string`, function () {
                        expect(document.descriptor.short_desc).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.long_desc' and that should be a string`, function () {
                        expect(document.descriptor.long_desc).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].mime_type' and that should be a string`, function () {
                        expect(document.mime_type).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].url' and that should be a string`, function () {
                        expect(document.url).to.exist.that.is.a("string");
                    }));
                })
            }
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
//health on_confirm...
function healthOn_confirm(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object object", function () {
            expect(message.order).to.exist.that.is.an("object");
        }));

        //message.order.fulfillments

        fulfillmentsTests(message, messageTestSuite);
        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message?.order?.fulfillments.forEach((it, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}]' should be an object`, function () {
                    expect(it).to.be.an("object").that.includes.all.keys("state");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].state' should be an object`, function () {
                    expect(it.state).to.be.an("object").that.includes.all.keys("descriptor");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].state.descriptor' should be an object`, function () {
                    expect(it.state.descriptor).to.be.an("object").that.includes.all.keys("code");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].state.descriptor.code' should be a string`, function () {
                    expect(it.state.descriptor.code).to.be.a("string");
                }));

            })
        }

        //message.order.items...

        messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
            expect(message.order.items).to.be.an('array');
        }));
        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an('object');
                }));
                //message.order.items.add_ons
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons' should be an array`, function () {
                    expect(item.add_ons).to.be.an('array');
                }));
                if (item?.add_ons && item?.add_ons.length > 0) {
                    try {
                        item.add_ons.forEach((add_ons, add_onsIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}]' should be an object (OPTIONAL)`, function () {
                                expect(add_ons).to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].id' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.id).to.be.a("string");
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

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity' should be an object (OPTIONAL)`, function () {
                                expect(add_ons.quantity).to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected' should be an object (OPTIONAL)`, function () {
                                expect(add_ons.quantity.selected).to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected.count' should be a number (OPTIONAL)`, function () {
                                expect(add_ons.quantity.selected.count).to.be.a("number");
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
                    } catch (error) {
                        return error;
                    }
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

                //message.order.items.id...
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a object`, function () {
                    expect(item.id).to.be.a('string');
                }));

                //message.order.items.parent_item_id...
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].parent_item_id' should be a object`, function () {
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
                //message.order.items.fulfillment_ids....
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                    expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                    item.fulfillment_ids.forEach((fulfillmentId, fulfillmentIdIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be string`, function () {
                            expect(fulfillmentId).to.be.a("string");
                        }));
                    })
                }
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
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}' (OPTIONAL)`, function () {
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
                                    if (it.code === "PROPOSAL_ID") {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));
                                    }

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
            })
        }

        //message.order.id...
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.id' which is a string object", function () {
            expect(message.order.id).to.exist.that.is.a("string");
        }));
        //message.order.payments

        messageTestSuite.addTest(new Mocha.Test("'message.order.payments' should be an array", function () {
            expect(message.order.payments).to.be.an('array');
        }));
        if (message?.order?.payments && message?.order?.payments?.length > 0) {
            message?.order?.payments.forEach((payment, z) => {
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
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.transaction_id' should be a string`, function () {
                    expect(payment.params.transaction_id).to.be.a('string');
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
                            });
                        }
                    }
                });
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
        //message.order.status
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.status' which is a string ", function () {
            expect(message.order.status).to.exist.that.is.a("string");
        }));
        //message.order.documents
        {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.documents' and that should be an array", function () {
                expect(message.order.documents).to.exist.that.is.an("array");
            }));
            if (message?.order?.documents && message?.order?.documents.length > 0) {
                message?.order?.documents.forEach((document, documentIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}]' and that should be an object`, function () {
                        expect(document).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor' and that should be an object`, function () {
                        expect(document.descriptor).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.code' and that should be a string`, function () {
                        expect(document.descriptor.code).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.name' and that should be a string`, function () {
                        expect(document.descriptor.name).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.short_desc' and that should be a string`, function () {
                        expect(document.descriptor.short_desc).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.long_desc' and that should be a string`, function () {
                        expect(document.descriptor.long_desc).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].mime_type' and that should be a string`, function () {
                        expect(document.mime_type).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].url' and that should be a string`, function () {
                        expect(document.url).to.exist.that.is.a("string");
                    }));
                })
            }
        }
        //message.order.created_at
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string ", function () {
            expect(message.order.created_at).to.exist.that.is.a("string");
        }));
        //message.order.updated_at
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string ", function () {
            expect(message.order.updated_at).to.exist.that.is.a("string");
        }));
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
    } catch (error) {
        console.log(error);
        return error;
    }
}
//health on_confirm...
function motorOn_confirm(message, messageTestSuite, logs = []) {

    function lastActionLog(logs, action) {
        try {
            const log = logs?.filter((log) => log?.request?.context?.action === action);
            return log && log.length ? log?.pop()?.request : false;
        } catch (err) {
            console.log(err);
        }
    }

    try {
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, index) => {
                const fulfillmentSuite = Mocha.Suite.create(messageTestSuite, `Fulfillment ${index + 1}`);
                fulfillmentSuite.addTest(new Mocha.Test(`Verify 'message.order.fulfillments[${index}]' should be an object`, function () {
                    expect(fulfillment).to.be.an("object");
                }));
                fulfillmentSuite.addTest(new Mocha.Test(`Verify 'message.order.fulfillments[${index}].id' should be a string`, function () {
                    expect(fulfillment.id).to.be.a("string");
                }));
                fulfillmentSuite.addTest(new Mocha.Test(`Verify 'message.order.fulfillments[${index}].state' should be an object`, function () {
                    expect(fulfillment.state).to.be.an("object").that.includes.all.keys("descriptor");
                }));
                fulfillmentSuite.addTest(new Mocha.Test(`Verify 'message.order.fulfillments[${index}].state.descriptor' should be an object`, function () {
                    expect(fulfillment.state.descriptor).to.be.an("object").that.includes.all.keys("code");
                }));
                fulfillmentSuite.addTest(new Mocha.Test(`Verify 'message.order.fulfillments[${index}].state.descriptor.code' should be a string`, function () {
                    expect(fulfillment.state.descriptor.code).to.be.a("string");
                }));
            });
        }
        //message.order.items
        {
            messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
                expect(message.order.items).to.be.an('array');
            }));
            if (message?.order?.items && message?.order?.items.length > 0) {
                message.order.items.forEach((item, i) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                        expect(item).to.be.an('object');
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

                    //message.order.items.id...
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a object`, function () {
                        expect(item.id).to.be.a('string');
                    }));

                    //message.order.items.parent_item_id...
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].parent_item_id' should be a object`, function () {
                        expect(item.parent_item_id).to.be.a('string');
                    }));
                    //message.order.items.category_ids....
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids' should be an array, that should not be empty`, function () {
                        expect(item.category_ids).to.be.an('array').that.is.not.empty;
                    }));
                    if (item?.category_ids && item?.category_ids.length > 0) {
                        item.category_ids.forEach((categoryId, categoryIdIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIdIndex}]' should be string`, function () {
                                expect(categoryId).to.be.a("string");
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
                    //message.order.items.tags....
                    const arr = [{ code: "GENERAL_INFO", name: " General Information" }, { code: "VAHAN_DETAILS", name: "Vahan Details" }];
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
                    //message.order.items.fulfillment_ids....
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                        expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                    }));
                    if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                        item.fulfillment_ids.forEach((fulfillmentId, fulfillmentIdIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be string`, function () {
                                expect(fulfillmentId).to.be.a("string");
                            }));
                        })
                    }

                })
            }

        }
        //message.order.id
        messageTestSuite.addTest(new Mocha.Test("'message.order.id' should be a object", function () {
            expect(message.order.id).to.be.a('string');
        }));
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
                    //params
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params' should be an object`, function () {
                        expect(payment.params).to.be.an('object');
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
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.transaction_id' should be a string`, function () {
                        expect(payment.params.transaction_id).to.be.a('string');
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
                    expect(breakupItem).to.exist.and.to.be.an("object");
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

            const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
                return total + parseFloat(item.price.value);
            }, 0);

            const roundedTotal = Math.round(totalBreakupPrice * 100) / 100;

            const quotePriceValue = parseFloat(message.order.quote.price.value);

            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
                expect(quotePriceValue).to.be.oneOf([roundedTotal, Math.floor(roundedTotal), Math.ceil(roundedTotal)]);
            }));
        }
        //message.order.status
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.status' which is a string ", function () {
            expect(message.order.status).to.exist.that.is.a("string");
        }));
        //message.order.documents
        {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.documents' and that should be an array", function () {
                expect(message.order.documents).to.exist.that.is.an("array");
            }));
            if (message?.order?.documents && message?.order?.documents.length > 0) {
                message?.order?.documents.forEach((document, documentIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}]' and that should be an object`, function () {
                        expect(document).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor' and that should be an object`, function () {
                        expect(document.descriptor).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.code' and that should be a string`, function () {
                        expect(document.descriptor.code).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.name' and that should be a string`, function () {
                        expect(document.descriptor.name).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.short_desc' and that should be a string`, function () {
                        expect(document.descriptor.short_desc).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.long_desc' and that should be a string`, function () {
                        expect(document.descriptor.long_desc).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].mime_type' and that should be a string`, function () {
                        expect(document.mime_type).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].url' and that should be a string`, function () {
                        expect(document.url).to.exist.that.is.a("string");
                    }));
                })
            }
        }
        //message.order.created_at
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string ", function () {
            expect(message.order.created_at).to.exist.that.is.a("string");
        }));
        //message.order.updated_at
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string ", function () {
            expect(message.order.updated_at).to.exist.that.is.a("string");
        }));

        const prevLog = lastActionLog(logs, "init");

        if (prevLog) {

            //  Provider ID Check
            const prevProviderId = prevLog?.message?.order?.provider?.id;
            const currProviderId = message?.order?.provider?.id;

            messageTestSuite.addTest(new Mocha.Test(`Verify that 'message.order.provider.id' matches provider.id from previous log (curr: ${currProviderId}, prev: ${prevProviderId})`, function () {
                expect(currProviderId).to.be.a("string").and.to.equal(prevProviderId);
            }));


            //  Item IDs Check
            const prevItems = prevLog?.message?.order?.items || [];
            const currItems = message?.order?.items || [];

            currItems.forEach((item, index) => {
                const prevItemId = prevItems[index]?.id;
                const currItemId = item?.id;

                messageTestSuite.addTest(new Mocha.Test(`Verify that 'message.order.items[${index}].id' matches previous items id (curr: ${currItemId}, prev: ${prevItemId})`, function () {
                    expect(currItemId).to.be.a("string").and.to.equal(prevItemId);
                }));
            });


            //  Fulfillment IDs Check
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

    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = { on_confirm }