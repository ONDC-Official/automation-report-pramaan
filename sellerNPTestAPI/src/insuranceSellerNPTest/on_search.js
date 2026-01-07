const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context");
const { xinputForSearch, descriptorInCatalog, paymentsForSearch } = require("./commonTest")
const response_verification = require("../centralizedUtilities/responseVerification");


async function on_search({ context, message } = {}, step,logs = [],constants = {}) {
    try {
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        const testSuite = new Mocha.Suite(`on_search (${step}) Request Verification`);
        testSuite.addSuite(contextTests(context, "on_search"));
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist;
        }));

        if (message && message?.catalog && message?.catalog?.providers[0] && message?.catalog?.providers[0]?.categories) {
            const categories = message.catalog.providers[0].categories;

            const foundCategory = categories.find(category => {
                return category?.descriptor && ['MARINE_INSURANCE', 'HEALTH_INSURANCE', 'MOTOR_INSURANCE'].includes(category?.descriptor?.code);
            });

            if (foundCategory) {
                switch (foundCategory?.descriptor?.code) {
                    case 'MARINE_INSURANCE':
                        marineOn_search(message, messageTestSuite,);
                        break;
                    case 'HEALTH_INSURANCE':
                        healthOn_Search(message, messageTestSuite, step);
                        break;
                    case 'MOTOR_INSURANCE':
                        motorOn_Search(message, messageTestSuite, step);
                        break;
                    default:
                        break;
                }
            }
        }
         return [ testSuite,responseTestSuite];

    } catch (error) {
        console.log(error);
        return error;
    }
}
function marineOn_search(message, messageTestSuite) {
    try {
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

        message.catalog.providers.forEach((provider, p) => {
            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}]' should be an object`, function () {
                expect(provider).to.be.an("object").that.includes.all.keys("categories", "id", "descriptor", "items", "payments");
            }));

            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories' should be an array`, function () {
                expect(provider.categories).to.be.an("array").that.is.not.empty;
            }));

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

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories[${categoryIndex}].descriptor.name' should be 'Marine Insurance'`, function () {
                    expect(category.descriptor.name).to.equal("Marine Insurance");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories[${categoryIndex}].descriptor.code' should be 'MARINE_INSURANCE' or 'INDIVIDUAL_INSURANCE'`, function () {
                    expect(category.descriptor.code).to.be.oneOf(["MARINE_INSURANCE", "INDIVIDUAL_INSURANCE"]);
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].categories[${categoryIndex}].id' should be a string`, function () {
                    expect(category.id).to.be.a("string");
                }));
            });

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

            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].items' should be an array`, function () {
                expect(provider.items).to.be.an("array").that.has.lengthOf("1");
            }));

            provider.items.forEach((item, itemIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].items[${itemIndex}]' should be an object`, function () {
                    expect(item).to.be.an("object").that.includes.all.keys("category_ids", "id", "tags", "xinput");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].items[${itemIndex}].category_ids' should be an array`, function () {
                    expect(item.category_ids).to.be.an("array").that.is.not.empty;
                }));
                //message.catalog.providers.items.tags....
                const arr = [{ code: "GENERAL_INFO", name: "General Information" }];
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

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].descriptor.name' should have be equal to '${ele.name}'`, function () {
                            expect(tagItem.descriptor.name).to.be.a('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                            expect(tagItem.descriptor.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));

                        let generalInformationArr = [{ code: "CO_PAYMENT" }, { code: "LIABILITY_COVERAGE" }, { code: "PROTECTION_AND_INDEMNITY" }, { code: "EXTENDED_COVERAGE" }, { code: "DEDUCTIBLES_AND_EXCESS" }, { code: "INSTITUTE_CARGO_CLAUSE" }];

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

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                    expect(listItem).to.exist.and.to.be.an("object");
                                }));

                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${itemIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));
                                }
                            });
                        }
                    }
                });

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].items[${itemIndex}].xinput' should be an object`, function () {
                    expect(item.xinput).to.be.an("object").that.includes.all.keys("head", "form", "required");
                }));

                // test for xinput
                xinputForSearch(message, messageTestSuite);
            });

            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}].payments' should be an array`, function () {
                expect(provider.payments).to.be.an("array").that.is.not.empty;
            }));

            // test for payments
            paymentsForSearch(message, messageTestSuite, p);
        });

    } catch (error) {
        console.log(error);
        return (error);
    }
}
//Health on_search 
function healthOn_Search(message, messageTestSuite, step) {
    try {
        //catalog
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog' is an object", function () {
            expect(message.catalog).to.exist.and.to.be.an("object");
        }));
        //descriptor
        descriptorInCatalog(message, messageTestSuite);
        //providers...
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog.providers' is an array", function () {
            expect(message.catalog.providers).to.exist.and.to.be.an("array");
        }));

        if (message?.catalog?.providers && message?.catalog?.providers.length > 0) {
            message.catalog.providers.forEach((provider, p) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}]' should be an object`, function () {
                    expect(provider).to.be.an('object');
                }));
                //providers.categories...
                {

                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].categories' should be an array`, function () {
                        expect(provider.categories).to.be.an('array');
                    }));
                    if (provider?.categories && provider?.categories.length > 0) {
                        provider.categories.forEach((category, c) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].category[${c}]' should be an object`, function () {
                                expect(category).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].category[${c}].descriptor' should be an object`, function () {
                                expect(category.descriptor).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].category[${c}].descriptor.name' should be a string`, function () {
                                expect(category.descriptor.name).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].category[${c}].descriptor.code' should be a string`, function () {
                                expect(category.descriptor.code).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].category[${c}].id' should be a string`, function () {
                                expect(category.id).to.be.a('string');
                            }));
                        })
                    }
                }
                //providers.descriptor
                {
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor' should be an object`, function () {
                        expect(provider.descriptor).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.long_desc' should be a string (OPTIONAL)`, function () {
                        expect(provider.descriptor.long_desc).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.name' should be a string`, function () {
                        expect(provider.descriptor.name).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.short_desc' should be a string (OPTIONAL)`, function () {
                        expect(provider.descriptor.short_desc).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images' should be an array`, function () {
                        expect(provider.descriptor.images).to.be.an('array');
                    }));
                    if (provider?.descriptor?.images && provider?.descriptor?.images?.length > 0) {
                        provider.descriptor.images.forEach((image, i) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}]' should be an object`, function () {
                                expect(image).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}].url' should be a string (OPTIONAL)`, function () {
                                expect(image.url).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}].size_type' should be a string (OPTIONAL)`, function () {
                                expect(image.size_type).to.be.a('string');
                            }));
                        })
                    }
                }
                //providers.id...
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].id' should be a string`, function () {
                    expect(provider.id).to.be.a('string');
                }));
                //providers.items...
                {
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items' should be an array`, function () {
                        expect(provider.items).to.be.an('array');
                    }));
                    if (provider?.items && provider?.items.length > 0) {
                        provider.items.forEach((item, i) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}]' should be an object`, function () {
                                expect(item).to.be.an('object');
                            }))
                            if (step === "II") {
                                //if parent_item_id exist....
                                if (item?.parent_item_id) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].parent_item_id' should be a string (OPTIONAL)`, function () {
                                        expect(item.parent_item_id).to.be.a('string');
                                    }))
                                }
                            }
                            //message.catalog.providers.items.category_ids....
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].category_ids' should be an array, that should not be empty`, function () {
                                expect(item.category_ids).to.be.an('array').that.is.not.empty;
                            }));
                            if (item?.category_ids && item?.category_ids.length > 0) {
                                item.category_ids.forEach((categoryID, categoryIDIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].category_ids[${categoryIDIndex}]' should be string`, function () {
                                        expect(categoryID).to.be.a("string");
                                    }));
                                })
                            }

                            //message.catalog.providers.items.descriptor....
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].descriptor' should be an object`, function () {
                                expect(item.descriptor).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].descriptor.name' should be a string`, function () {
                                expect(item.descriptor.name).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].descriptor.short_desc' should be a string`, function () {
                                expect(item.descriptor.short_desc).to.be.a('string');
                            }));
                            //if message.catalog.provider.items.price exists...
                            if (step === "II") {
                                if (item?.price) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].price' should be an object`, function () {
                                        expect(item.price).to.be.an('object');
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].price.currency' should be a string (OPTIONAL)`, function () {
                                        expect(item.price.currency).to.be.a('string');
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].price.value' should be a string (OPTIONAL)`, function () {
                                        expect(item.price.value).to.be.a('string');
                                    }));
                                }
                            }
                            //message.catalog.providers.items.id
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].id' should be a string`, function () {
                                expect(item.id).to.be.a('string');
                            }));
                            //message.catalog.providers.items.tags....
                            const arr = [{ code: "GENERAL_INFO" }];
                            arr.forEach((ele) => {
                                const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                const tagItem = item?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                }));

                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                        expect(tagItem).to.have.property("list").that.is.an("array");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                                        expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].descriptor.name' should have be equal to '${ele.name}'`, function () {
                                        expect(tagItem.descriptor.name).to.be.a("string");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.providers[${p}].items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    let generalInformationArr = [{ code: "COVERAGE_AMOUNT" }, { code: "CO_PAYMENT" }, { code: "ROOM_RENT_CAP" }, { code: "RESTORATION_BENEFIT" }, { code: "CLAIM_SETTLEMENT_RATIO" }, { code: "PRE_HOSPITALIZATION_COVERAGE_DAYS" }, { code: "POST_HOSPITALIZATION_COVERAGE_DAYS" }, { code: "MATERNITY_COVERAGE" }, { code: "INITIAL_WAITING_PERIOD" }, { code: "CASHLESS_HOSPITALS" }, { code: "ROOM_CATEGORY" }];

                                    if (item?.parent_item_id) {
                                        generalInformationArr = [...generalInformationArr, { code: "BASE_PRICE" }, { code: "CONVIENCE_FEE" }, { code: "PROCESSING_FEE" }, { code: "TAX" }, { code: "OFFER_VALIDITY" }];
                                    }

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
                                            if (listItem?.descriptor?.code === "TAX" || listItem?.descriptor?.code === "OFFER_VALIDITY" || listItem?.descriptor?.code === "BASE_PRICE" || listItem?.descriptor?.code === "CONVIENCE_FEE" || listItem?.descriptor?.code === "PROCESSING_FEE") {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list' should have an object '${it.code}' (OPTIONAL)`, function () {
                                                    expect(listItem).to.exist.and.to.be.an("object");
                                                }));

                                                if (listItemIndex !== -1) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings (OPTIONAL)`, function () {
                                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                        expect(listItem).to.have.property("value").that.is.a("string");
                                                    }));

                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string (OPTIONAL)`, function () {
                                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                    }));

                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}' (OPTIONAL)`, function () {
                                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                                    }));

                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty (OPTIONAL)`, function () {
                                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                    }));
                                                }
                                            }
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));

                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                    expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                    expect(listItem).to.have.property("value").that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                    expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                    expect(listItem.descriptor.code).to.be.equal(it.code);
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                }));
                                            }
                                        });
                                    }
                                }
                            });
                            //message.catalog.providers.items.time
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].time' should be an object`, function () {
                                expect(item.time).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].time.duration' should be a string`, function () {
                                expect(item.time.duration).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].time.label' should be an object`, function () {
                                expect(item.time.label).to.be.a('string');
                            }));

                            //message.catalog.providers.items.xinput...
                            if (step === "I") {
                                xinputForSearch(message, messageTestSuite);
                            }
                            //message.catalog.providers.items.add_ons...
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons' should be an array (OPTIONAL)`, function () {
                                expect(item.add_ons).to.be.an('array');
                            }));
                            if (item?.add_ons && item?.add_ons?.length > 0) {
                                item?.add_ons.forEach((add_ons, add_onsIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}]' should be an object (OPTIONAL)`, function () {
                                        expect(add_ons).to.be.an("object");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].id' should be a string (OPTIONAL)`, function () {
                                        expect(add_ons.id).to.be.a("string");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].quantity' should be an object (OPTIONAL)`, function () {
                                        expect(add_ons.quantity).to.be.an("object");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].quantity.available' should be an object (OPTIONAL)`, function () {
                                        expect(add_ons.quantity.available).to.be.an("object");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].quantity.available.count' should be a number (OPTIONAL)`, function () {
                                        expect(add_ons.quantity.available.count).to.be.a("number");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].descriptor' should be an object (OPTIONAL)`, function () {
                                        expect(add_ons.descriptor).to.be.an("object");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].descriptor.name' should be a string (OPTIONAL)`, function () {
                                        expect(add_ons.descriptor.name).to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].descriptor.code' should be one of the specified values (OPTIONAL)`, function () {
                                        expect(add_ons.descriptor.code).to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].price' should be an object (OPTIONAL)`, function () {
                                        expect(add_ons.price).to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].price.value' should be a number (OPTIONAL)`, function () {
                                        expect(add_ons.price.value).to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string (OPTIONAL)`, function () {
                                        expect(add_ons.price.currency).to.be.a("string");
                                    }));
                                })
                            }
                        })
                    }
                }
                //providers.payments...
                paymentsForSearch(message, messageTestSuite, p)
                //payments done
            })
        }

    } catch (error) {
        console.log(error);
        return error;
    }

}
//Motor on_Search
function motorOn_Search(message, messageTestSuite, step) {
    try {
        //catalog
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog' is an object", function () {
            expect(message.catalog).to.exist.and.to.be.an("object");
        }));
        //descriptor
        descriptorInCatalog(message, messageTestSuite);
        //providers...
        {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog.providers' is an array", function () {
                expect(message.catalog.providers).to.exist.and.to.be.an("array");
            }));

            if (message?.catalog?.providers && message?.catalog?.providers.length > 0) {
                message.catalog.providers.forEach((provider, p) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}]' should be an object`, function () {
                        expect(provider).to.be.an('object');
                    }));

                    //providers.id...
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].id' should be a string`, function () {
                        expect(provider.id).to.be.a('string');
                    }));
                    //providers.categories...
                    {

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].categories' should be an array`, function () {
                            expect(provider.categories).to.be.an('array');
                        }));
                        if (provider?.categories && provider?.categories.length > 0) {
                            provider.categories.forEach((category, c) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].category[${c}]' should be an object`, function () {
                                    expect(category).to.be.an('object');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].category[${c}].descriptor' should be an object`, function () {
                                    expect(category.descriptor).to.be.an('object');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].category[${c}].descriptor.name' should be a string`, function () {
                                    expect(category.descriptor.name).to.be.a('string');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].category[${c}].descriptor.code' should be a string`, function () {
                                    expect(category.descriptor.code).to.be.a('string');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].category[${c}].id' should be a string`, function () {
                                    expect(category.id).to.be.a('string');
                                }));
                            })
                        }
                    }
                    //providers.descriptor
                    {
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor' should be an object`, function () {
                            expect(provider.descriptor).to.be.an('object');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.long_desc' should be a string (OPTIONAL)`, function () {
                            expect(provider.descriptor.long_desc).to.be.a('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.name' should be a string`, function () {
                            expect(provider.descriptor.name).to.be.a('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.short_desc' should be a string (OPTIONAL)`, function () {
                            expect(provider.descriptor.short_desc).to.be.a('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images' should be an array`, function () {
                            expect(provider.descriptor.images).to.be.an('array');
                        }));
                        if (provider?.descriptor?.images && provider?.descriptor?.images?.length > 0) {
                            provider.descriptor.images.forEach((image, i) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}]' should be an object`, function () {
                                    expect(image).to.be.an('object');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}].url' should be a string (OPTIONAL)`, function () {
                                    expect(image.url).to.be.a('string');
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}].size_type' should be a string (OPTIONAL)`, function () {
                                    expect(image.size_type).to.be.a('string');
                                }));
                            })
                        }
                    }
                    //providers.items

                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items' should be an array`, function () {
                        expect(provider.items).to.be.an('array');
                    }));

                    if (provider?.items && provider?.items.length > 0) {
                        const baseItems = provider?.items?.filter((it) => {
                            return !it?.parent_item_id && !it?.price;
                        });

                        baseItems?.forEach((item) => {
                            const i = provider?.items?.findIndex((ite) => ite?.id === item?.id);

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}]' should be an object`, function () {
                                expect(item).to.be.an('object');
                            }))

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].id' should be a object`, function () {
                                expect(item.id).to.be.a('string');
                            }))

                            //message.catalog.providers.items.category_ids....
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].category_ids' should be an array, that should not be empty `, function () {
                                expect(item.category_ids).to.be.an('array').that.is.not.empty;
                            }));

                            if (item?.category_ids && item?.category_ids.length > 0) {
                                item.category_ids.forEach((categoryID, categoryIDIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].category_ids[${categoryIDIndex}]' should be string (OPTIONAL)`, function () {
                                        expect(categoryID).to.be.a("string");
                                    }));
                                })
                            }

                            //message.catalog.providers.items.descriptor....
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].descriptor' should be an object`, function () {
                                expect(item.descriptor).to.be.an('object');
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].descriptor.name' should be a string (OPTIONAL)`, function () {
                                expect(item.descriptor.name).to.be.a('string');
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].descriptor.short_desc' should be a string (OPTIONAL)`, function () {
                                expect(item.descriptor.short_desc).to.be.a('string');
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images' should be an array`, function () {
                                expect(provider.descriptor.images).to.be.an('array');
                            }));

                            if (provider?.descriptor?.images && provider?.descriptor?.images?.length > 0) {
                                provider.descriptor.images.forEach((image, i) => {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}]' should be an object`, function () {
                                        expect(image).to.be.an('object');
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}].url' should be a string (OPTIONAL)`, function () {
                                        expect(image.url).to.be.a('string');
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}].size_type' should be a string (OPTIONAL)`, function () {
                                        expect(image.size_type).to.be.a('string');
                                    }));
                                })
                            }

                            //message.catalog.providers.items.tags....
                            const arr = [{ code: "GENERAL_INFO", name: "General Information" }];

                            arr.forEach((ele) => {
                                const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                const tagItem = item?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags' should have an object of ${ele.code} (OPTIONAL)`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                }));

                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                        expect(tagItem).to.have.property("list").that.is.an("array");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${p}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    let generalInformationArr = [{ code: "PERSONAL_ACCIDENT_COVER" }, { code: "DEPRECIATION_COVER" }, { code: "ROAD_SIDE_ASSISTANCE" }, { code: "CONSUMABLES_COVER" }, { code: "ELECTRICAL_ACCESSORIES_COVER" }, { code: "NON_ELECTRICAL_ACCESSORIES_COVER" }, { code: "ENGINE_COVER" }, { code: "EXTERNAL_CNG_OR_LPG_COVER" }, { code: "KEY_COVER" }, { code: "PERSONAL_BAGGAGE_COVER" }, { code: "TYRE_COVER" }, { code: "RETURN_TO_INVOICE" }, { code: "PER_DAY_CASH" }];

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

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'(OPTIONAL)`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));

                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings (OPTIONAL)`, function () {
                                                    expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                    expect(listItem).to.have.property("value").that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string (OPTIONAL)`, function () {
                                                    expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}' (OPTIONAL)`, function () {
                                                    expect(listItem.descriptor.code).to.be.equal(it.code);
                                                }));

                                                // messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string (OPTIONAL)`, function () {
                                                //     expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                                // }));

                                                // messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'short_desc' which is a string (OPTIONAL)`, function () {
                                                //     expect(listItem.descriptor).to.have.property("short_desc").that.is.a("string");
                                                // }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty (OPTIONAL)`, function () {
                                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                }));
                                            }
                                        });
                                    }
                                }
                            });

                            //message.catalog.providers.items.time
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].time' should be an object`, function () {
                                expect(item.time).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].time.duration' should be a string`, function () {
                                expect(item.time.duration).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].time.label' should be an object`, function () {
                                expect(item.time.label).to.be.a('string');
                            }));

                            //message.catalog.providers.items.xinput...
                            if (step === "I") {
                                xinputForSearch(message, messageTestSuite);
                            }

                            //message.catalog.providers.items.add_ons...
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons' should be an array (OPTIONAL)`, function () {
                                expect(item.add_ons).to.be.an('array');
                            }));

                            if (item?.add_ons && item?.add_ons.length > 0) {
                                item.add_ons.forEach((add_ons, add_onsIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}]' should be an object (OPTIONAL)`, function () {
                                        expect(add_ons).to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].id' should be a string (OPTIONAL)`, function () {
                                        expect(add_ons.id).to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].quantity' should be an object (OPTIONAL)`, function () {
                                        expect(add_ons.quantity).to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].quantity.available' should be an object (OPTIONAL)`, function () {
                                        expect(add_ons.quantity.available).to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].quantity.available.count' should be a number (OPTIONAL)`, function () {
                                        expect(add_ons.quantity.available.count).to.be.a("number");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].descriptor' should be an object (OPTIONAL)`, function () {
                                        expect(add_ons.descriptor).to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].descriptor.name' should be a string (OPTIONAL)`, function () {
                                        expect(add_ons.descriptor.name).to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].price' should be an object (OPTIONAL)`, function () {
                                        expect(add_ons.price).to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].price.value' should be a string (OPTIONAL)`, function () {
                                        expect(add_ons.price.value).to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string (OPTIONAL)`, function () {
                                        expect(add_ons.price.currency).to.be.a("string");
                                    }));
                                })
                            }
                        });

                        // checking Offer Items
                        if (step == "II") {
                            baseItems?.forEach((baseItem) => {
                                const i = provider?.items?.findIndex((it) => it?.parent_item_id === baseItem?.id); // offer item index
                                const baseItemIndex = provider?.items?.findIndex((it) => it?.id === baseItem?.id);

                                messageTestSuite.addTest(new Mocha.Test(`message.catalog.providers[${p}].items[${baseItemIndex}] should have a corresponding offer`, function () {
                                    expect(i).to.exist.and.to.not.equal(-1);
                                }));

                                if (i !== -1) {
                                    const item = provider?.items[i];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].parent_item_id' should be a string (OPTIONAL)`, function () {
                                        expect(item.parent_item_id).to.be.a('string');
                                    }))

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].price' should be an object`, function () {
                                        expect(item.price).to.be.an('object');
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].price.currency' should be a string (OPTIONAL)`, function () {
                                        expect(item.price.currency).to.be.a('string');
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].price.value' should be a string (OPTIONAL)`, function () {
                                        expect(item.price.value).to.be.a('string');
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}]' should be an object`, function () {
                                        expect(item).to.be.an('object');
                                    }))

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].id' should be a object`, function () {
                                        expect(item.id).to.be.a('string');
                                    }))

                                    //message.catalog.providers.items.category_ids....
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].category_ids' should be an array, that should not be empty`, function () {
                                        expect(item.category_ids).to.be.an('array').that.is.not.empty;
                                    }));

                                    if (item?.category_ids && item?.category_ids.length > 0) {
                                        item.category_ids.forEach((categoryID, categoryIDIndex) => {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].category_ids[${categoryIDIndex}]' should be string`, function () {
                                                expect(categoryID).to.be.a("string");
                                            }));
                                        })
                                    }

                                    //message.catalog.providers.items.descriptor....
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].descriptor' should be an object`, function () {
                                        expect(item.descriptor).to.be.an('object');
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].descriptor.name' should be a string (OPTIONAL)`, function () {
                                        expect(item.descriptor.name).to.be.a('string');
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].descriptor.short_desc' should be a string (OPTIONAL)`, function () {
                                        expect(item.descriptor.short_desc).to.be.a('string');
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images' should be an array`, function () {
                                        expect(provider.descriptor.images).to.be.an('array');
                                    }));

                                    if (provider?.descriptor?.images && provider?.descriptor?.images?.length > 0) {
                                        provider.descriptor.images.forEach((image, i) => {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}]' should be an object`, function () {
                                                expect(image).to.be.an('object');
                                            }));
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}].url' should be a string (OPTIONAL)`, function () {
                                                expect(image.url).to.be.a('string');
                                            }));
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].descriptor.images[${i}].size_type' should be a string (OPTIONAL)`, function () {
                                                expect(image.size_type).to.be.a('string');
                                            }));
                                        })
                                    }

                                    //message.catalog.providers.items.tags....
                                    const arr = [{ code: "GENERAL_INFO", name: "General Information" }];

                                    arr.forEach((ele) => {
                                        const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                        const tagItem = item?.tags[tagIndex];
                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags' should have an object of ${ele.code}`, function () {
                                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                        }));

                                        if (tagIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                                expect(tagItem).to.have.property("list").that.is.an("array");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                            }));

                                            let generalInformationArr = [{ code: "PERSONAL_ACCIDENT_COVER" }, { code: "DEPRECIATION_COVER" }, { code: "ROAD_SIDE_ASSISTANCE" }, { code: "CONSUMABLES_COVER" }, { code: "ELECTRICAL_ACCESSORIES_COVER" }, { code: "NON_ELECTRICAL_ACCESSORIES_COVER" }, { code: "ENGINE_COVER" }, { code: "EXTERNAL_CNG_OR_LPG_COVER" }, { code: "KEY_COVER" }, { code: "PERSONAL_BAGGAGE_COVER" },
                                            { code: "TYRE_COVER" }, { code: "RETURN_TO_INVOICE" }, { code: "PER_DAY_CASH" }, { code: "BASE_PRICE" }, { code: "CONVIENCE_FEE" }, { code: "PROCESSING_FEE" }, { code: "TAX" }, { code: "OFFER_VALIDITY" }, { code: "MANUAL_REVIEW" }, { code: "IDV_VALUE" }, { code: "IDV_MIN_VALUE" }, { code: "IDV_MAX_VALUE" }
                                            ];

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

                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list' should have an object '${it.code}' (OPTIONAL)`, function () {
                                                        expect(listItem).to.exist.and.to.be.an("object");
                                                    }));

                                                    if (listItemIndex !== -1) {
                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings (OPTIONAL)`, function () {
                                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                            expect(listItem).to.have.property("value").that.is.a("string");
                                                        }));

                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string (OPTIONAL)`, function () {
                                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                        }));

                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}' (OPTIONAL)`, function () {
                                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                                        }));

                                                        // messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string (OPTIONAL)`, function () {
                                                        //     expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                                        // }));

                                                        // messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'short_desc' which is a string (OPTIONAL)`, function () {
                                                        //     expect(listItem.descriptor).to.have.property("short_desc").that.is.a("string");
                                                        // }));

                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty (OPTIONAL)`, function () {
                                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                        }));
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    //message.catalog.providers.items.time
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].time' should be an object`, function () {
                                        expect(item.time).to.be.an('object');
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].time.duration' should be a string`, function () {
                                        expect(item.time.duration).to.be.a('string');
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].time.label' should be an object`, function () {
                                        expect(item.time.label).to.be.a('string');
                                    }));

                                    //message.catalog.providers.items.add_ons...
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons' should be an array (OPTIONAL)`, function () {
                                        expect(item.add_ons).to.be.an('array');
                                    }));

                                    if (item?.add_ons && item?.add_ons.length > 0) {
                                        item.add_ons.forEach((add_ons, add_onsIndex) => {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}]' should be an object (OPTIONAL)`, function () {
                                                expect(add_ons).to.be.an("object");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].id' should be a string (OPTIONAL)`, function () {
                                                expect(add_ons.id).to.be.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].quantity' should be an object (OPTIONAL)`, function () {
                                                expect(add_ons.quantity).to.be.an("object");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].quantity.available' should be an object (OPTIONAL)`, function () {
                                                expect(add_ons.quantity.available).to.be.an("object");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].quantity.available.count' should be a number (OPTIONAL)`, function () {
                                                expect(add_ons.quantity.available.count).to.be.a("number");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].descriptor' should be an object (OPTIONAL)`, function () {
                                                expect(add_ons.descriptor).to.be.an("object");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].descriptor.name' should be a string (OPTIONAL)`, function () {
                                                expect(add_ons.descriptor.name).to.be.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].price' should be an object (OPTIONAL)`, function () {
                                                expect(add_ons.price).to.be.an("object");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].price.value' should be a string (OPTIONAL)`, function () {
                                                expect(add_ons.price.value).to.be.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string (OPTIONAL)`, function () {
                                                expect(add_ons.price.currency).to.be.a("string");
                                            }));
                                        })
                                    }
                                }
                            })
                        }
                    }

                    //providers.payments...
                    paymentsForSearch(message, messageTestSuite, p);
                })
            }
        }

        return messageTestSuite;
    } catch (error) {
        console.log(error);
        return error;
    }

}
module.exports = {
    on_search
}