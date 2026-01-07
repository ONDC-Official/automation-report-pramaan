const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const { providerTests } = require("./commonTest");
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function search({ context, message } = {}, step, logs = [], constants = {}) {
    try {
        function runResponseVerification(context, message, logs, constants) {
            return response_verification({ context, message }, logs, constants);
        }

        const testSuite = new Mocha.Suite(`Search (${step}) Request Verification`);
        contextTests(context, "search", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        let responseTestSuite;
        switch (step) {
            case "II":
            case "III":
            case "IV":
                responseTestSuite = runResponseVerification(context, message, logs, constants);
                break;
            default:
                break;
        }
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'intent' which is an object", function () {
            expect(message).to.have.property("intent").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.intent' should have a property named 'category' which is an object", function () {
            expect(message.intent).to.have.property("category").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.intent.category' should have a property named 'descriptor' which is an object", function () {
            expect(message.intent.category).to.have.property("descriptor").that.is.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.category.descriptor.code' which is a string`, function () {
            expect(message.intent.category.descriptor.code).to.be.a("string").and.to.oneOf(["MICRO_TRANSIT_INSURANCE", "MICRO_HOSPICASH_INSURANCE"]);
        }));
        // message.intent.fulfillment
        if (message?.intent?.fulfillment) {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment' which is an object", function () {
                expect(message.intent.fulfillment).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.agent' which is an object", function () {
                expect(message.intent.fulfillment.agent).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.agent.person' which is an object", function () {
                expect(message.intent.fulfillment.agent.person).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillemt.agent.person.id' which is a string`, function () {
                expect(message.intent.fulfillment.agent.person.id).to.exist.and.to.be.a("string");
            }));
        }
        //message.intent.tags
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of'message.intent' should have a property named 'tags' which is an array`, function () {
            expect(message.intent).to.have.property("tags").that.is.an("array");
        }));
        if (message?.intent?.tags) {
            const arr = [{ code: "BPP_TERMS" }];

            arr.forEach((ele) => {
                const tagIndex = message?.intent?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                const tagItem = message?.intent?.tags[tagIndex];
                messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags' should have an object of ${ele.code}`, function () {
                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                }));

                if (tagIndex !== -1) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                        expect(tagItem).to.have.property("display").that.is.a("boolean");
                        expect(tagItem).to.have.property("list").that.is.an("array");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].display' should have be equal to false`, function () {
                        expect(tagItem.display).to.be.equal(false);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list' should have be a non empty array`, function () {
                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    }));

                    const array = [{ code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];

                    if (array) {
                        array.forEach((it) => {
                            const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                            const listItem = tagItem?.list[listItemIndex];

                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                expect(listItem).to.exist.and.to.be.an("object");
                            }));

                            if (listItemIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                    expect(listItem).to.have.property("descriptor").that.is.an("object");
                                    expect(listItem).to.have.property("value").that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                    expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                    expect(listItem.descriptor.code).to.be.equal(it.code);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                }));
                            }
                        })
                    }
                }
            });
        }
        if (step !== "I") {
            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.intent.providers' should be an object`, function () {
                expect(message.intent.provider).to.be.an("object");
            }));
            if (step === "III") {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.intent.providers.items' should be an array`, function () {
                    expect(message.intent.provider.items).to.be.an("array");
                }));
                if (message?.intent?.provider?.items && message?.intent?.provider?.items.length > 0) {
                    message?.intent?.provider?.items.forEach((item, itemIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.intent.providers.items[${itemIndex}]' should be an object`, function () {
                            expect(item).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].id' should be a string`, function () {
                            expect(item.id).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags' should be an array`, function () {
                            expect(item.tags).to.be.an('array');
                        }));

                        //message.intent.providers.items.tags....
                        if (item?.tags) {
                            const arr = [{ code: "BAP_INPUTS" }];
                            arr.forEach((ele) => {
                                const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                const tagItem = item?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                }));

                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                        expect(tagItem).to.have.property("list").that.is.an("array");
                                    }));
                                    if (tagItem.descriptor.name) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                                            expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].descriptor.name' should have be equal to '${ele.name}'`, function () {
                                            expect(tagItem.descriptor.name).to.be.a('string');
                                        }));
                                    }
                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.providers.items[${itemIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    let bapinputsArr1 = [{ code: "BUYER_NAME" }, { code: "BUYER_PHONE_NUMBER" }, { code: "BUYER_PAN_NUMBER" }, { code: "DERIVED_DATA" }, { code: "PRODUCT_CATEGORY" }, { code: "ORDER_ID" }, { code: "ORDER_VALUE" },
                                    { code: "ORDER_TYPE" }, { code: "ORDER_WEIGHT" }, { code: "START_ADDRESS" }, { code: "END_ADDRESS" }, { code: "PAYMENT_MODE" }, { code: "TRANSIT_START_DATE" }, { code: "TRANSIT_END_DATE" }, { code: "PACKAGING_TYPE" },
                                    { code: "PACKAGING_VIDEO" }, { code: "SEALING_TYPE" }, { code: "WATERPROOFING" }, { code: "MODE_OF_TRANSPORT" }, { code: "LOGISTICS_COST" }, { code: "ORDERS_ONTIME_PCT" },
                                    { code: "LOGISTICS_PARTNER_GSTIN" }, { code: "DELIVERY_EXECUTIVE_NAME" }, { code: "DELIVERY_EXECUTIVE_PHONE_NO" }, { code: "DELIVERY_EXECUTIVE_UNIQUE_ID" }, { code: "DELIVERY_EXECUTIVE_VEHICLE_NO" }];


                                    let bapinputsArr2 = [{ code: "BUYER_NAME" }, { code: "BUYER_PHONE_NUMBER" }, { code: "BUYER_PAN_NUMBER" }, { code: "BUYER_DOB" }, { code: "BUYER_GENDER" }, { code: "SUM_INSURED" }, { code: "BUYER_EMAIL" }, { code: "TENURE" }];
                                    let array;
                                    switch (tagItem?.descriptor?.code) {
                                        case "BAP_INPUTS":
                                            switch (constants?.insurance_category) {
                                                case "MICRO_TRANSIT_INSURANCE":
                                                    array = bapinputsArr1;
                                                    break;
                                                case "MICRO_HOSPICASH_INSURANCE":
                                                    array = bapinputsArr2;
                                                    break;
                                            }
                                        default:
                                            break;
                                    }

                                    if (array) {
                                        array.forEach((it) => {
                                            const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                            const listItem = tagItem?.list[listItemIndex];

                                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));

                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' which are object`, function () {
                                                    expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                }));
                                                if (listItem.value) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named  'value' which are strings`, function () {
                                                        expect(listItem).to.have.property("value").that.is.a("string");
                                                    }));
                                                }
                                                if (listItem.descriptor.name) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                                        expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                                    }));
                                                }
                                                if (listItem.descriptor.code) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                    }));

                                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                                    }));
                                                }
                                                if (listItem.value) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.providers.items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                    }));
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            }


            if (step !== "I") {
                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags' should exist and be an array`, function () {
                    expect(message.intent.provider.tags).to.exist.and.to.be.an("array").that.is.not.empty;
                }));

                if (message?.intent?.provider?.tags && Array.isArray(message?.intent?.provider?.tags)) {
                    const arr = [{ code: "MASTER_POLICY" }];
                    arr.forEach((ele) => {
                        const tagIndex = message.intent.provider.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagprovider = message.intent.provider.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags' should have an object of ${ele.code}`, function () {
                            expect(tagprovider).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));

                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                                expect(tagprovider).to.have.property("descriptor").that.is.an("object");
                                expect(tagprovider).to.have.property("list").that.is.an("array");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagprovider.descriptor).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                expect(tagprovider.descriptor.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagprovider.list).to.be.an("array").that.is.not.empty;
                            }));

                            let masterpolicyArr = [{ code: "POLICY_ID" }];
                            let array;
                            switch (tagprovider?.descriptor?.code) {
                                case "MASTER_POLICY":
                                    array = masterpolicyArr;
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listproviderIndex = tagprovider.list.findIndex((listprovider) => listprovider?.descriptor.code === it.code);
                                    const listprovider = tagprovider?.list[listproviderIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listprovider).to.exist.and.to.be.an("object");
                                    }));

                                    if (listproviderIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags[${tagIndex}].list[${listproviderIndex}]' should have properties named 'descriptor' which are object`, function () {
                                            expect(listprovider).to.have.property("descriptor").that.is.an("object");
                                        }));
                                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags[${tagIndex}].list[${listproviderIndex}]' should have properties named  'value' which are strings`, function () {
                                            expect(listprovider).to.have.property("value").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags[${tagIndex}].list[${listproviderIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listprovider.descriptor).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags[${tagIndex}].list[${listproviderIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listprovider.descriptor.code).to.be.equal(it.code);
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.tags[${tagIndex}].list[${listproviderIndex}].value' should be a string that is not empty`, function () {
                                            expect(listprovider.value).to.be.a('string').that.is.not.empty;
                                        }));

                                    }
                                });
                            }
                        }
                    });
                }
            }
        }

        //message.intent.payments
        messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment' should be an object`, function () {
            expect(message.intent.payment).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.collected_by' should be one of 'BPP' or 'BAP'`, function () {
            expect(message.intent.payment.collected_by).to.be.oneOf(["BPP", "BAP"]);
        }));

        if (responseTestSuite) {
            return [testSuite, responseTestSuite];
        } else { return [testSuite] }
    } catch (err) {
        console.log(err);
    }
};
