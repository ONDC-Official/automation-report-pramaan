const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_search({ context, message } = {}, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite(`on_search Request Verification`);
    try {
        const responseTestSuite = response_verification({ context, message }, logs, constants);
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

        messageTestSuite.addTest(new Mocha.Test("'message.catalog.descriptor.images' should be an array", function () {
            expect(message.catalog.descriptor.images).to.be.an('array');
        }));

        if (message?.catalog?.descriptor?.images && message?.catalog?.descriptor?.images.length > 0) {
            message.catalog.descriptor.images.forEach((image, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.descriptor.images[${i}]' should be an object`, function () {
                    expect(image).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.descriptor.images[${i}].url' should be a string `, function () {
                    expect(image.url).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.descriptor.images[${i}].size_type' should be a string `, function () {
                    expect(image.size_type).to.be.a('string');
                }));

            })

        }
        //message.catalog.provider
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog.providers' which is an array", function () {
            expect(message.catalog.providers).to.exist.and.to.be.an("array");
        }));


        if (message?.catalog?.providers && message?.catalog?.providers.length > 0) {
            message.catalog.providers.forEach((provider, providerIndex) => {
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

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images' should be an array(OPTIONAL)`, function () {
                    expect(provider.descriptor.images).to.be.an('array');
                }));

                if (provider?.descriptor?.images && provider?.descriptor?.images.length > 0) {
                    provider.descriptor.images.forEach((image, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images[${i}]' should be an object`, function () {
                            expect(image).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images[${i}].url ' should be a string (OPTIONAL)`, function () {
                            expect(image.url).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images[${i}].size_type' should be a string `, function () {
                            expect(image.size_type).to.be.a('string');
                        }));

                    })

                }
                //message.catalog.provider.categories[]
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories' which is an array`, function () {
                    expect(provider.categories).to.exist.and.to.be.an("array");
                }));

                if (provider?.categories && provider?.categories.length > 0) {
                    provider.categories.forEach((category, categoryIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}]' which is an object`, function () {
                            expect(category).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].id' which is a string (OPTIONAL)`, function () {
                            expect(category.id).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor' which is an object`, function () {
                            expect(category.descriptor).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor.name' which is a string (OPTIONAL)`, function () {
                            expect(category.descriptor.name).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor.code' which is a string (OPTIONAL)`, function () {
                            expect(category.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST_CLASS"]);
                        }));

                    })
                }
                //message.catalog.provider.items[]
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items' which is an array`, function () {
                    expect(provider.items).to.exist.and.to.be.an("array");
                }));

                if (provider?.items && provider.items.length > 0) {
                    provider.items.forEach((item, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}]' which is an object`, function () {
                            expect(item).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].id' which is a string`, function () {
                            expect(item.id).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].descriptor' which is an object`, function () {
                            expect(item.descriptor).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].descriptor.name' which is a string`, function () {
                            expect(item.descriptor.name).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].descriptor.code' which is a string`, function () {
                            expect(item.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["ADULT_TICKET", "CHILD_TICKET", "INFANT_TICKET"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].price' should be an object`, function () {
                            expect(item.price).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].price.currency' should be a string`, function () {
                            expect(item.price.currency).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].price.value' should be a string`, function () {
                            expect(item.price.value).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity' which is an object`, function () {
                            expect(item.quantity).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity.selected' which is an object`, function () {
                            expect(item.quantity.selected).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity.selected.count' which is a number `, function () {
                            expect(item.quantity.selected.count).to.exist.and.to.be.a("number");
                        }));



                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].category_ids' should be an array, that should not be empty (OPTIONAL)`, function () {
                            expect(item.category_ids).to.be.an('array').that.is.not.empty;
                        }));

                        if (item?.category_ids && item?.category_ids.length > 0) {
                            item.category_ids.forEach((categoryID, categoryIdIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].category_ids[${categoryIdIndex}]' should be string`, function () {
                                    expect(categoryID).to.be.a("string");
                                }));

                            })
                        }
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                            expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                        }));

                        if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                            item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be a string`, function () {
                                    expect(fulfillmentID).to.be.a("string");
                                }));

                            })
                        }

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons' should be an array`, function () {
                            expect(item.add_ons).to.be.an('array');
                        }));

                        if (item?.add_ons && item?.add_ons.length > 0) {
                            item.add_ons.forEach((add_ons, add_onsIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}]' should be an object`, function () {
                                    expect(add_ons).to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}].id' should be a string (OPTIONAL)`, function () {
                                    expect(add_ons.id).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}].descriptor' should be an object`, function () {
                                    expect(add_ons.descriptor).to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}].descriptor.name' should be a string (OPTIONAL)`, function () {
                                    expect(add_ons.descriptor.name).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}].descriptor.code' should be a string (OPTIONAL)`, function () {
                                    expect(add_ons.descriptor.code).to.be.a("string");
                                }));

                                if (add_ons?.quantity) {

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}].quantity' should be an object`, function () {
                                        expect(add_ons.quantity).to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}].quantity.available' should be an object`, function () {
                                        expect(add_ons.quantity.available).to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}].quantity.available.count' should be a number (OPTIONAL)`, function () {
                                        expect(add_ons.quantity.available.count).to.be.a("number");
                                    }));

                                }
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}].price' should be an object`, function () {
                                    expect(add_ons.price).to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}].price.value' should be a number (OPTIONAL)`, function () {
                                    expect(add_ons.price.value).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string (OPTIONAL)`, function () {
                                    expect(add_ons.price.currency).to.be.a("string");
                                }));

                            })
                        }
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].tags' which is an array`, function () {
                            expect(item.tags).to.exist.and.to.be.an("array");
                        }));
                        if (item?.tags) {
                            const arr = [{ code: "FARE_TYPE" }, { code: "GENERAL_INFO" }];
                            arr.forEach((ele) => {
                                const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                const tagItem = item?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                }));


                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}]' should have properties named 'descriptor',display and 'list'`, function () {
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


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                                        expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].display' should have be a boolean`, function () {
                                        expect(tagItem.display).to.be.a("boolean");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    let fareTypeArr = [{ code: "REGULAR" }, { code: "STUDENT" }, { code: "SENIOR_CITIZEN" }, { code: "ARMED_FORCES" }, { code: "DOCTORS_NURSES" }];
                                    let generalInformationArr = [{ code: "CABIN_BAGGAGE" }, { code: "CHECK_IN_BAGGAGE" }, { code: "PROHIBITED_ITEMS" }];

                                    let array;
                                    switch (tagItem?.descriptor?.code) {
                                        case "FARE_TYPE":
                                            array = fareTypeArr;
                                            break;
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

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list' should have an object '${it.code}(OPTIONAL)'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));


                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should be an object`, function () {
                                                    expect(listItem).to.be.an("object")
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should be an object`, function () {
                                                    expect(listItem.descriptor).to.be.an("object")
                                                }));


                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                    expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                }));


                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                    expect(listItem.descriptor.code).to.be.equal(it.code);
                                                }));

                                                if (listItem?.descriptor?.name && listItem?.descriptor?.short_desc) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                                        expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                                    }));

                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'short_desc' which is a string`, function () {
                                                        expect(listItem.descriptor).to.have.property("short_desc").that.is.a("string");
                                                    }));

                                                }
                                                if (listItem?.value) {

                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                    }));

                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments' which is an array`, function () {
                    expect(provider.fulfillments).to.exist.and.to.be.an("array");
                }));

                if (provider?.fulfillments && provider?.fulfillments.length > 0) {
                    provider.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                            expect(fulfillment).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                            expect(fulfillment.id).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                            expect(fulfillment.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["TRIP", "TICKET", "CONNECT"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                            expect(fulfillment.stops).to.exist.and.to.be.an("array");
                        }));

                        if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                            fulfillment.stops.forEach((stopItem, stopIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                                    expect(stopItem).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string`, function () {
                                    expect(stopItem.id).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                                    expect(stopItem.type).to.exist.and.to.be.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location' which is an object`, function () {
                                    expect(stopItem.location).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor' which is an object`, function () {
                                    expect(stopItem.location.descriptor).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.name' which is a string`, function () {
                                    expect(stopItem.location.descriptor.name).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.code' which is a string `, function () {
                                    expect(stopItem.location.descriptor.code).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
                                    expect(stopItem.time).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.label' which is a string`, function () {
                                    expect(stopItem.time.label).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.timestamp' which is a string(OPTIONAL)`, function () {
                                    expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
                                }));


                            })

                        }
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                            expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle.category' which is a string `, function () {
                            expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.equal("AIRLINE");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle.code' which is a string `, function () {
                            expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string");
                        }));

                        //message.catalog.provider.fulfillments.tags
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags' which is an array`, function () {
                            expect(fulfillment.tags).to.exist.and.to.be.an("array");
                        }));
                        if (fulfillment?.tags) {
                            const arr = [{ code: "INFO" }];
                            arr.forEach((ele) => {
                                const tagIndex = fulfillment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}]' should have a tags array (${ele?.code})`, function () {
                                    expect(tagIndex).not.to.equal(-1);
                                }))

                                if (tagIndex && tagIndex !== -1) {
                                    const tagItem = fulfillment?.tags[tagIndex];
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                    }));

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


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].display' should  be a boolean`, function () {
                                        expect(tagItem.display).to.be.a("boolean");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));
                                    const infoArr_1 = [{ code: "OPERATED_BY" }, { code: "FULFILLMENT_SEQUENCE" }];
                                    const infoArr_2 = [{ code: "OPERATED_BY" }, { code: "PARENT_ID" }];
                                    const infoArr_3 = [{ code: "OPERATED_BY" }];

                                    let array;
                                    switch (tagItem?.descriptor?.code) {
                                        case "INFO":
                                            switch (fulfillment?.type) {
                                                case "CONNECT":
                                                    array = infoArr_1;
                                                    break;
                                                case "TRIP":
                                                    switch (fulfillment?.id) {
                                                        case "F3" || "F4":
                                                            array = infoArr_2;
                                                            break;
                                                        case "F1":
                                                            array = infoArr_3
                                                            break;
                                                    }
                                                    break;
                                            }
                                            break;
                                        default:
                                            break;
                                    }

                                    if (array) {
                                        array.forEach((it) => {
                                            const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
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


                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                }));

                                            }
                                        });
                                    }
                                }
                            });
                        }
                    })
                }
                //message.catalog.providers[${providerIndex}].payments
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].payments' which is an array`, function () {
                    expect(provider?.payments).to.exist.and.to.be.an("array");
                }));

                if (provider?.payments && provider?.payments.length > 0) {
                    provider.payments.forEach((payment, z) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].payments[${z}]' which is an object`, function () {
                            expect(payment).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].tags' which is an array`, function () {
                            expect(payment.tags).to.exist.and.to.be.an("array");
                        }));
                        if (payment?.tags) {
                            const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];
                            arr.forEach((ele) => {
                                const tagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                const tagItem = payment?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                }));


                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                        expect(tagItem).to.have.property("display").that.is.a("boolean");
                                        expect(tagItem).to.have.property("list").that.is.an("array");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}].display' should  be a boolean`, function () {
                                        expect(tagItem.display).to.be.a("boolean");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));


                                    const buyerFinderFeeType = tagItem?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
                                    const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_PERCENTAGE" }]
                                    const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];
                                    const settlementTermsArr = [{ code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "STATIC_TERMS" }];

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
                                                    array = buyerFinderFeePercent;
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

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));


                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                    expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                    expect(listItem).to.have.property("value").that.is.a("string");
                                                }));


                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                    expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                }));


                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                    expect(listItem.descriptor.code).to.be.equal(it.code);
                                                }));


                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                }));

                                            }
                                        });
                                    }
                                }
                            });
                        }
                    })

                }
            })
        };



        return [testSuite, responseTestSuite];
    } catch (error) {
        testSuite.addTest(new Mocha.Test("on_search request failed to be verified because of some missing payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return testSuite;
    }
}
module.exports = {
    on_search
}