const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const { paymentsForSearch, onSearchtagsCommonTests, providerWithID, xinputOnStatusGeneral, fulfillmentsTests, itemsWithXinputTests } = require('./commonTest');
const response_verification = require("../centralizedUtilities/responseVerification");
async function on_search({ context, message } = {}, step, flowId, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_search (${step}) Request Verification`);
        contextTests(context, "on_search", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        const responseTestSuite = response_verification({ context, message }, logs, constants);

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test(`'message.catalog' should exist and be an object`, function () {
            expect(message.catalog).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.descriptor' should exist and be an object`, function () {
            expect(message.catalog.descriptor).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.descriptor.name' should exist and be a string`, function () {
            expect(message.catalog.descriptor.name).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers' should exist and be an array`, function () {
            expect(message.catalog.providers).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        if (message?.catalog?.providers && message?.catalog?.providers.length > 0) {
            message.catalog.providers.forEach((provider, p) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}]' should be an object`, function () {
                    expect(provider).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories' should be an array`, function () {
                    expect(provider.categories).to.be.an("array").that.is.not.empty;
                }));
                if (provider?.categories && provider?.categories.length > 0) {
                    provider.categories.forEach((category, categoryIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories[${categoryIndex}]' should be an object`, function () {
                            expect(category).to.be.an("object").that.includes.all.keys("descriptor", "id");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories[${categoryIndex}].descriptor' should be an object`, function () {
                            expect(category.descriptor).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories[${categoryIndex}].descriptor' includes all keys 'name' and 'code'`, function () {
                            expect(category.descriptor).to.include.all.keys("name", "code");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories[${categoryIndex}].descriptor.name' should be 'MICRO_INSURANCE' or 'MICRO_TRANSIT_INSURANCE'`, function () {
                            expect(category.descriptor.name).to.oneOf(["Micro Insurance", "Micro Transit Insurance", "Micro Hospicash Insurance"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories[${categoryIndex}].descriptor.code' should be 'MICRO_TRANSIT_INSURANCE' or 'MICRO_INSURANCE'`, function () {
                            expect(category.descriptor.code).to.be.oneOf(["MICRO_TRANSIT_INSURANCE", "MICRO_INSURANCE", "MICRO_HOSPICASH_INSURANCE"]);
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories[${categoryIndex}].id' should be a string`, function () {
                            expect(category.id).to.be.a("string");
                        }));
                        if (category?.parent_category_id) {
                            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories[${categoryIndex}].parent_category_id' should be a string`, function () {
                                expect(category.parent_category_id).to.be.a("string");
                            }));
                        }
                    });
                }

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].descriptor' should be an object`, function () {
                    expect(provider.descriptor).to.be.an("object").that.includes.all.keys("images", "name", "short_desc", "long_desc");
                }));

                provider.descriptor.images.forEach((image, imageIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].descriptor.images[${imageIndex}]' should be an object`, function () {
                        expect(image).to.be.an("object").that.includes.all.keys("url", "size_type");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].descriptor.images[${imageIndex}].url' should be a valid URL (OPTIONAL)`, function () {
                        expect(image.url).to.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].descriptor.images[${imageIndex}].size_type' should be a string (OPTIONAL)`, function () {
                        expect(image.size_type).to.be.a("string");
                    }));
                });

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].descriptor.name' should be a string`, function () {
                    expect(provider.descriptor.name).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].descriptor.short_desc' should be a string (OPTIONAL)`, function () {
                    expect(provider.descriptor.short_desc).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].descriptor.long_desc' should be a string (OPTIONAL)`, function () {
                    expect(provider.descriptor.long_desc).to.be.a("string");
                }));
                if (step === "III") {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].items' should be an array`, function () {
                        expect(provider.items).to.be.an("array");
                    }));
                    if (provider?.items && provider?.items.length > 0) {
                        provider?.items.forEach((item, itemIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].items[${itemIndex}]' should be an object`, function () {
                                expect(item).to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].id' should be a string`, function () {
                                expect(item.id).to.be.a('string');
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].items[${itemIndex}].category_ids' should be an array`, function () {
                                expect(item.category_ids).to.be.an("array").that.is.not.empty;
                            }));
                            //message.catalog.providers.items.descriptor....
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].descriptor' should be an object`, function () {
                                expect(item.descriptor).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].descriptor.name' should be a string`, function () {
                                expect(item.descriptor.name).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].descriptor.short_desc' should be a string`, function () {
                                expect(item.descriptor.short_desc).to.be.a('string');
                            }));

                            if (item?.price) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].price' should be an object`, function () {
                                    expect(item.price).to.be.an('object');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].price.currency' should be a string (OPTIONAL)`, function () {
                                    expect(item.price.currency).to.be.a('string');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].price.value' should be a string (OPTIONAL)`, function () {
                                    expect(item.price.value).to.be.a('string');
                                }));
                            }
                            //message.catalog.providers.items.tags....
                            if (item?.tags) {
                                const arr1 = [{ code: "GENERAL_INFO", name: "General Information" }, { code: "INCLUSIONS", name: "Inclusions" }, { code: "EXCLUSIONS", name: "Exclusions" }];
                                const arr2 = [{ code: "BAP_INPUTS" }];
                                let arr;
                                switch (step) {
                                    case "II":
                                        arr = arr2;
                                        break;
                                    default:
                                        arr = arr1;
                                }
                                arr.forEach((ele) => {
                                    const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                    const tagItem = item?.tags[tagIndex];
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags' should have an object of ${ele.code}`, function () {
                                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                    }));

                                    if (tagIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                                            expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                            expect(tagItem).to.have.property("list").that.is.an("array");
                                        }));
                                        if (tagItem.descriptor.name) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                                                expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].descriptor.name' should have be equal to '${ele.name}'`, function () {
                                                expect(tagItem.descriptor.name).to.be.a('string');
                                            }));
                                        }
                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                            expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                        }));

                                        let generalInformationArr1 = [{ code: "COVERAGE_AMOUNT" }, { code: "BASE_PRICE" }, { code: "CONVIENCE_FEE" }, { code: "PROCESSING_FEE" }, { code: "TAX" }, { code: "OFFER_VALIDITY" }];
                                        let inclusionArr1 = [{ name: "Transit Coverage" }, { name: "Multi-Mode Transport Protection" }, { name: "Natural Calamities" }];
                                        let inclusionArr2 = [{ name: "Hospitalization" }, { name: "Surgery" }];
                                        let exclusionsArr1 = [{ name: "Ordinary Wear and Tear" }, { name: "Delays" }];
                                        let exclusionsArr2 = [{ name: "Physiotherapy" }];
                                        let bapinputsArr = [{ code: "BUYER_NAME" }, { code: "BUYER_PHONE_NUMBER" }, { code: "BUYER_PAN_NUMBER" }, { code: "DERIVED_DATA" }, { code: "PRODUCT_CATEGORY" }, { code: "ORDER_ID" }, { code: "ORDER_VALUE" },
                                        { code: "ORDER_TYPE" }, { code: "ORDER_WEIGHT" }, { code: "START_ADDRESS" }, { code: "END_ADDRESS" }, { code: "PAYMENT_MODE" }, { code: "TRANSIT_START_DATE" }, { code: "TRANSIT_END_DATE" }, { code: "PACKAGING_TYPE" },
                                        { code: "PACKAGING_VIDEO" }, { code: "SEALING_TYPE" }, { code: "WATERPROOFING" }, { code: "MODE_OF_TRANSPORT" }, { code: "LOGISTICS_COST" }, { code: "ORDERS_ONTIME_PCT" },
                                        { code: "LOGISTICS_PARTNER_GSTIN" }, { code: "DELIVERY_EXECUTIVE_NAME" }, { code: "DELIVERY_EXECUTIVE_PHONE_NO" }, { code: "DELIVERY_EXECUTIVE_UNIQUE_ID" }, { code: "DELIVERY_EXECUTIVE_VEHICLE_NO" }];

                                        let generalInformationArr2 = [{ code: "COVERAGE_AMOUNT" }, { code: "BASE_PRICE" }, { code: "CONVIENCE_FEE" }, { code: "PROCESSING_FEE" }, { code: "TAX" }, { code: "OFFER_VALIDITY" }, { code: "DAILY_CASH_BENEFIT" }, { code: "MAX_HOSPITALIZATION_DAYS" }, { code: "ICU_BENEFIT_PER_DAY" }, { code: "SURGICAL_BENEFIT" }, { code: "CONVALESCENCE_BENEFIT" }, { code: "MINIMUM_DAYS_FOR_CONVALESCENCE_BENEFIT" }, { code: "INITIAL_WAITING_PERIOD" }, { code: "DURATION_OF_COVER" }, { code: "MINIMUM_AGE_LIMIT" }, { code: "MAXIMUM_AGE_LIMIT" }];
                                        let array;
                                        switch (tagItem?.descriptor?.code) {
                                            case "GENERAL_INFO":
                                                switch (constants?.insurance_category) {
                                                    case "MICRO_TRANSIT_INSURANCE":
                                                        array = generalInformationArr1;
                                                        break;
                                                    default:
                                                        array = generalInformationArr2;
                                                        break;
                                                }
                                                break;
                                            case "INCLUSIONS":
                                                switch (constants?.insurance_category) {
                                                    case "MICRO_TRANSIT_INSURANCE":
                                                        array = inclusionArr1;
                                                        break;
                                                    default:
                                                        array = inclusionArr2;
                                                        break;
                                                }
                                                break;
                                            case "EXCLUSIONS":
                                                switch (constants?.insurance_category) {
                                                    case "MICRO_TRANSIT_INSURANCE":
                                                        array = exclusionsArr1;
                                                        break;
                                                    default:
                                                        array = exclusionsArr2;
                                                        break;
                                                }
                                                break;
                                            case "BAP_INPUTS":
                                                array = bapinputsArr;
                                                break;
                                            default:
                                                break;
                                        }

                                        if (array) {
                                            array.forEach((it) => {
                                                const listItemIndex1 = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                                const listItemIndex2 = tagItem.list.findIndex((listItem) => listItem?.descriptor.name === it.name);
                                                let listItemIndex;
                                                switch (tagItem?.descriptor?.code) {
                                                    case "GENERAL_INFO":
                                                        listItemIndex = listItemIndex1;
                                                        break;
                                                    default:
                                                        listItemIndex = listItemIndex2;
                                                        break;

                                                }
                                                const listItem = tagItem?.list[listItemIndex];

                                                if (tagItem?.descriptor?.code === "INCLUSIONS" || tagItem?.descriptor?.code === "EXCLUSIONS") {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list' should have an object '${it.name}'`, function () {
                                                        expect(listItem).to.exist.and.to.be.an("object");
                                                    }));
                                                }
                                                if (tagItem?.descriptor?.code === "GENERAL_INFO" || tagItem?.descriptor?.code === "BAP_INPUTS") {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                        expect(listItem).to.exist.and.to.be.an("object");
                                                    }));
                                                }

                                                if (listItemIndex !== -1) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' which are object`, function () {
                                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                    }));
                                                    if (listItem.value) {
                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named  'value' which are strings`, function () {
                                                            expect(listItem).to.have.property("value").that.is.a("string");
                                                        }));
                                                    }
                                                    if (listItem.descriptor.name) {
                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                                            expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                                        }));
                                                    }
                                                    if (listItem.descriptor.short_desc) {
                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'short_desc' which is a string`, function () {
                                                            expect(listItem.descriptor).to.have.property("short_desc").that.is.a("string");
                                                        }));
                                                    }
                                                    if (listItem.descriptor.code) {
                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                        }));

                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                                        }));
                                                    }
                                                    if (listItem.value) {
                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                        }));
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].time' should be an object`, function () {
                                expect(item.time).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].time.duration' should be a string`, function () {
                                expect(item.time.duration).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].time.label' should be an object`, function () {
                                expect(item.time.label).to.be.a('string');
                            }));
                        });
                    }
                }

                // if(provider?.tags) {
                const arr = [{ code: "MASTER_POLICY" }];
                arr.forEach((ele) => {
                    const tagIndex = provider?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                    const tagprovider = provider?.tags[tagIndex];
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].tags' should have an object of ${ele.code}`, function () {
                        expect(tagprovider).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    }));

                    if (tagIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                            expect(tagprovider).to.have.property("descriptor").that.is.an("object");
                            expect(tagprovider).to.have.property("list").that.is.an("array");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                            expect(tagprovider.descriptor).to.have.property("code").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                            expect(tagprovider.descriptor.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.providers[${p}].tags[${tagIndex}].list' should have be a non empty array`, function () {
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

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                    expect(listprovider).to.exist.and.to.be.an("object");
                                }));

                                if (listproviderIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].tags[${tagIndex}].list[${listproviderIndex}]' should have properties named 'descriptor' which are object`, function () {
                                        expect(listprovider).to.have.property("descriptor").that.is.an("object");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].tags[${tagIndex}].list[${listproviderIndex}]' should have properties named  'value' which are strings`, function () {
                                        expect(listprovider).to.have.property("value").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].tags[${tagIndex}].list[${listproviderIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listprovider.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].tags[${tagIndex}].list[${listproviderIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                        expect(listprovider.descriptor.code).to.be.equal(it.code);
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].tags[${tagIndex}].list[${listproviderIndex}].value' should be a string that is not empty`, function () {
                                        expect(listprovider.value).to.be.a('string').that.is.not.empty;
                                    }));

                                }
                            });
                        }
                    }
                });
                // }
                // messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].payments' should be an array`, function () {
                //     expect(provider.payments).to.be.an("array").that.is.not.empty;
                // }));

                // test for payments
                paymentsForSearch(message, messageTestSuite, p);
            });
        }

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags' should exist and be an array`, function () {
            expect(message.catalog.tags).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        if (message?.catalog?.tags) {
            const arr = [{ code: "BPP_TERMS" }];

            arr.forEach((ele) => {
                const tagIndex = message?.catalog?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                const tagItem = message?.catalog?.tags[tagIndex];
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags' should have an object of ${ele.code}`, function () {
                    expect(tagItem).to.exist.and.to.be.an("object");
                }));


                if (tagIndex !== -1) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                        expect(tagItem).to.have.property("display").that.is.a("boolean");
                        expect(tagItem).to.have.property("list").that.is.an("array");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].descriptor.name' should be string '`, function () {
                        expect(tagItem.descriptor.name).to.be.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].display' should be a boolean (OPTIONAL)`, function () {
                        expect(tagItem.display).to.be.a("boolean");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list' should have be a non empty array`, function () {
                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    }));


                    const array = [{ code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];

                    if (array) {
                        array.forEach((it) => {
                            const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                            const listItem = tagItem?.list[listItemIndex];

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                expect(listItem).to.exist.and.to.be.an("object");
                            }));


                            if (listItemIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                    expect(listItem).to.have.property("descriptor").that.is.an("object");
                                    expect(listItem).to.have.property("value").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                    expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                    expect(listItem.descriptor.code).to.be.equal(it.code);
                                }));

                                // messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be string`, function () {
                                //     expect(listItem.descriptor.name).to.be.a("string");
                                // }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                }));

                            }
                        });
                    }
                }
            });

        }

        return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
        return (err);
    }
}

module.exports = { on_search };