const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context");
const { onSearchtagsCommonTests } = require("./commonTests")
const { mutualFundCategories } = require("../../utils/constants");
const response_verification = require("../../centralizedUtilities/responseVerification");

async function on_search({ context, message } = {},logs = [],constants = {}) {
    try {
        const responseTestSuite = response_verification({ context, message }, logs,constants);
       const testSuite = new Mocha.Suite(`on_search Request Verification`);

        contextTests(context, "on_search", testSuite);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog' which is an object", function () {
            expect(message.catalog).to.exist.and.to.be.an("object");
        }));

        //message.catalog.descriptor
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog.descriptor' which is an object", function () {
            expect(message.catalog.descriptor).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.catalog.descriptor' should have a property named 'name' which is a string", function () {
            expect(message.catalog.descriptor.name).to.be.a("string");
        }));


        //message.catalog.provider
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog.providers' which is an array", function () {
            expect(message.catalog.providers).to.exist.and.to.be.an("array");
        }));

        if (message?.catalog?.providers && message?.catalog?.providers.length > 0) {
            message?.catalog?.providers.forEach((provider, providerIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}]' which is an object`, function () {
                    expect(provider).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].id' which is a string`, function () {
                    expect(provider.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}]' should have a property named 'descriptor' which is an object`, function () {
                    expect(provider.descriptor).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                    expect(provider.descriptor.name).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}]' should have a property named 'categories' which is an array`, function () {
                    expect(provider.categories).to.be.an("array");
                }));

                if (provider?.categories && provider?.categories.length > 0) {
                    provider?.categories.forEach((category, categoryIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}]' should be an object`, function () {
                            expect(category).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].id' should be a string`, function () {
                            expect(category.id).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor' should be an object`, function () {
                            expect(category.descriptor).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor.name' should be a string (OPTIONAL)`, function () {
                            expect(category.descriptor.name).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor.code' should be a string`, function () {
                            expect(category.descriptor.code).to.be.a('string').and.to.be.oneOf(mutualFundCategories);
                        }));

                        if (category?.parent_category_id) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].parent_category_id' should be a string`, function () {
                                expect(category.parent_category_id).to.be.a('string');
                            }));
                        }
                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items' which is an array`, function () {
                    expect(provider.items).to.exist.and.to.be.an("array");
                }));

                if (provider?.items && provider?.items.length > 0) {
                    provider?.items.forEach((item, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}]' which is an object`, function () {
                            expect(item).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].id' which is a string (OPTIONAL)`, function () {
                            expect(item.id).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].descriptor' which is an object`, function () {
                            expect(item.descriptor).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].descriptor.name' which is a string (OPTIONAL)`, function () {
                            expect(item.descriptor.name).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].descriptor.code' which is a string (OPTIONAL)`, function () {
                            expect(item.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["SCHEME", "SCHEME_PLAN"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].category_ids' should be an array, that should not be empty (OPTIONAL)`, function () {
                            expect(item.category_ids).to.be.an('array').that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].creator.descriptor.name' should be a non-empty string`, function () {
                            expect(item).to.have.property("creator").that.is.an("object");
                            expect(item.creator).to.have.property("descriptor").that.is.an("object");
                            expect(item.creator.descriptor).to.have.property("name").that.is.a("string").and.to.not.be.empty;
                        }));

                        if (item?.category_ids && item?.category_ids.length > 0) {
                            item?.category_ids.forEach((categoryId, categoryIdIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].category_ids[${categoryIdIndex}]' should be string`, function () {
                                    expect(categoryId).to.be.a("string");
                                }));
                            })
                        }

                        if (item?.parent_item_id) {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].parent_item_id' which is a string (OPTIONAL)`, function () {
                                expect(item.parent_item_id).to.exist.and.to.be.a("string");
                            }));
                        }

                        if (item?.fulfillment_ids) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].fulfillment_ids' should be an array, that should not be empty (OPTIONAL)`, function () {
                                expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                            }));

                            if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                                item?.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be string`, function () {
                                        expect(fulfillmentID).to.be.a("string");
                                    }));

                                })
                            }
                        }

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].matched' should be a boolean `, function () {
                            expect(item.matched).to.be.a('boolean');
                        }));

                        const arr_1 = [{ code: "SCHEME_INFORMATION" }];
                        const arr_2 = [{ code: "PLAN_INFORMATION" }, { code: "PLAN_IDENTIFIERS" }, { code: "PLAN_OPTIONS" }];


                        let arr;
                        switch (item?.descriptor?.code) {
                            case "SCHEME":
                                arr = arr_1;
                                break;
                            case "SCHEME_PLAN":
                                arr = arr_2
                                break;
                            default:
                                break;
                        }

                        arr.forEach((ele) => {
                            const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                            const tagItem = item?.tags[tagIndex];
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags' should have an object of ${ele.code}`, function () {
                                expect(tagItem).to.exist.and.to.be.an("object");
                            }));

                            if (tagIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                    expect(tagItem).to.have.property("display").that.is.a("boolean");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].descriptor.name' should be string '`, function () {
                                    expect(tagItem.descriptor.name).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].display' should be a boolean`, function () {
                                    expect(tagItem.display).to.be.a("boolean");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));

                                const schemeInformationArr = [{ code: "STATUS" }, { code: "LOCKIN_PERIOD_IN_DAYS" }, { code: "NFO_START_DATE" }, { code: "NFO_END_DATE" }, { code: "NFO_ALLOTMENT_DATE" }, { code: "NFO_REOPEN_DATE" }, { code: "ENTRY_LOAD" }, { code: "EXIT_LOAD" }, { code: "OFFER_DOCUMENTS" }];
                                const planInformationArr = [{ code: "CONSUMER_TNC" }];

                                const planIdentifiersArr = [{ code: "ISIN" }, { code: "RTA_IDENTIFIER" }, { code: "AMFI_IDENTIFIER" }];

                                const planOptionsArr = [{ code: "PLAN" }, { code: "OPTION" }, { code: "IDCW_OPTION" }];

                                let array;
                                switch (tagItem?.descriptor?.code) {
                                    case "SCHEME_INFORMATION":
                                        array = schemeInformationArr
                                        break;
                                    case "PLAN_INFORMATION":
                                        array = planInformationArr
                                        break;
                                    case "PLAN_IDENTIFIERS":
                                        array = planIdentifiersArr;
                                        break;
                                    case "PLAN_OPTIONS":
                                        array = planOptionsArr;
                                        break;
                                    default:
                                        break;
                                }

                                if (array) {
                                    array.forEach((it) => {
                                        const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                        const listItem = tagItem?.list[listItemIndex];
                                        if (it?.code === "IDCW_OPTION") {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'(OPTIONAL)`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));
                                        } else {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));
                                        }

                                        if (listItemIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                expect(listItem).to.have.property("value").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                            }));
                                            if (it?.code === "IDCW_OPTION") {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}' (OPTIONAL)`, function () {
                                                    expect(listItem.descriptor.code).to.be.equal(it.code);
                                                }));
                                            } else {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                    expect(listItem.descriptor.code).to.be.equal(it.code);
                                                }));
                                            }
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));
                                        }
                                    });
                                }
                            }
                        });
                    })
                }
                //message.catalog.providers.fulfillments

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments' which is an array`, function () {
                    expect(provider.fulfillments).to.exist.and.to.be.an("array");
                }));

                if (provider?.fulfillments && provider?.fulfillments.length > 0) {
                    provider?.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                            expect(fulfillment).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                            expect(fulfillment.id).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                            expect(fulfillment.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["LUMPSUM", "WITHDRAWL", "INSTANT_REDEMPTION", "SIP", "SWP", "REDEMPTION"]);
                        }));

                        const arr = [{ code: "THRESHOLDS" }]

                        arr.forEach((ele) => {
                            const tagIndex = fulfillment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                            const tagItem = fulfillment?.tags[tagIndex];
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                                expect(tagItem).to.exist.and.to.be.an("object");
                            }));

                            if (tagIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                    expect(tagItem).to.have.property("display").that.is.a("boolean");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.name' should be string '`, function () {
                                    expect(tagItem.descriptor.name).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].display' should be a boolean`, function () {
                                    expect(tagItem.display).to.be.a("boolean");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));

                                const thresholdsArr_1 = [{ code: "AMOUNT_MIN" }, { code: "AMOUNT_MAX" }, { code: "AMOUNT_MULTIPLES" }];

                                const thresholdsArr_2 = [{ code: "FREQUENCY" }, { code: "AMOUNT_MIN" }, { code: "AMOUNT_MAX" }, { code: "AMOUNT_MULTIPLES" }, { code: "INSTALMENTS_COUNT_MIN" }, { code: "INSTALMENTS_COUNT_MAX" }, { code: "CUMULATIVE_AMOUNT_MIN" }];

                                const thresholdsArr_3 = [{ code: "AMOUNT_MIN" }, { code: "AMOUNT_MAX" }, { code: "AMOUNT_MULTIPLES" }, { code: "UNITS_MIN" }, { code: "UNITS_MAX" }, { code: "UNITS_MULTIPLES" }];

                                let array;
                                switch (fulfillment?.type) {
                                    case "LUMPSUM":
                                        array = thresholdsArr_1
                                        break;
                                    case "SIP":
                                        array = thresholdsArr_2;
                                        break;
                                    case "REDEMPTION":
                                        array = thresholdsArr_3;
                                        break;
                                    default:
                                        break;
                                }

                                if (array) {
                                    array.forEach((it) => {
                                        const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                        const listItem = tagItem?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                            expect(listItem).to.exist.and.to.be.an("object");
                                        }));

                                        if (listItemIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                expect(listItem).to.have.property("value").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                expect(listItem.descriptor.code).to.be.equal(it.code);
                                            }));
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.NAME' should be string`, function () {
                                                expect(listItem.descriptor.name).to.be.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));
                                        }
                                    });
                                }
                            }
                        });
                    })
                }
            })
        }

        onSearchtagsCommonTests(message, messageTestSuite)

         return [ testSuite,responseTestSuite];
    } catch (error) {
        console.log(error);
        return error;
    }
}


module.exports = {
    on_search
}




