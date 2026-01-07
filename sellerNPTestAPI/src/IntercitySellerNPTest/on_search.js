const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_search({ context, message } = {}, step,logs =[],constants = {}) {
    try {
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        const testSuite = new Mocha.Suite(`on_search ${step} Request Verification`);
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

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor' should have a property named 'name' which is a string `, function () {
                    expect(provider.descriptor.name).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images' should be an array`, function () {
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

                    })

                }
                if (step === "III") {
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
                                expect(category.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST_CLASS", "PASS", "TICKET", "SEATER", "SEMI_SLEEPER", "SLEEPER"]);
                            }));

                        })
                    }
                }
                if (step === "II") {
                    //message.catalog.provider.items[]
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items' which is an array`, function () {
                        expect(provider.items).to.exist.and.to.be.an("array");
                    }));

                    if (provider?.items && provider.items.length > 0) {
                        provider.items.forEach((item, i) => {
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
                                expect(item.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["SJT", "SFSJT", "RJT", "PASS", "RIDE", "SEAT", "NON_STOP", "CONNECT"]);
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].price' should be an object`, function () {
                                expect(item.price).to.be.an('object');
                            }));

                            if (item?.price?.currency) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].price.currency' should be a string (OPTIONAL)`, function () {
                                    expect(item.price.currency).to.be.a('string');
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].price.value' should be a string (OPTIONAL)`, function () {
                                    expect(item.price.value).to.be.a('string');
                                }));

                            }
                            if (item?.price?.minimum_value) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].price.minimum_value' should be a string`, function () {
                                    expect(item.price.minimum_value).to.be.a('string');
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].price.maximum_value' should be a string`, function () {
                                    expect(item.price.maximum_value).to.be.a('string');
                                }));

                            }
                            if (step === "III") {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity' which is an object`, function () {
                                    expect(item.quantity).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity.available' which is an object`, function () {
                                    expect(item.quantity.available).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity.available.count' which is a number (OPTIONAL)`, function () {
                                    expect(item.quantity.available.count).to.exist.and.to.be.a("number");
                                }));

                                if (item?.quantity?.maximum) {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity.maximum' which is an object`, function () {
                                        expect(item.quantity.maximum).to.exist.and.to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity.maximum.count' which is a number (OPTIONAL) `, function () {
                                        expect(item.quantity.maximum.count).to.exist.and.to.be.a("number");
                                    }));

                                }
                            }
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].fulfillment_ids' should be an array, that should not be empty `, function () {
                                expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                            }));

                            if (item?.fulfillment_ids && item.fulfillment_ids.length > 0) {
                                item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be a string`, function () {
                                        expect(fulfillmentID).to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].fulfillment_ids' should include fulfillment ID '${fulfillmentID}'`, function () {
                                        expect(item.fulfillment_ids).to.include(fulfillmentID);
                                    }));
                                });
                            }

                            if (step === "III") {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].category_ids' should be an array, that should not be empty (OPTIONAL)`, function () {
                                    expect(item.category_ids).to.be.an('array').that.is.not.empty;
                                }));

                                if (item?.category_ids && item?.category_ids.length > 0) {
                                    item.category_ids.forEach((categoryID, categoryIdIndex) => {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].category_ids[${categoryIdIndex}]' should be string (OPTIONAL)`, function () {
                                            expect(categoryID).to.be.a("string");
                                        }));

                                    })
                                }
                            }

                        })
                    }
                }
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments' which is an array`, function () {
                    expect(provider.fulfillments).to.exist.and.to.be.an("array");
                }));

                if (provider?.fulfillments && provider?.fulfillments.length > 0) {
                    provider.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                            expect(fulfillment).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].id' which is a string `, function () {
                            expect(fulfillment.id).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].type' which is a string `, function () {
                            expect(fulfillment.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["TRIP", "DELIVERY"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                            expect(fulfillment.stops).to.exist.and.to.be.an("array");
                        }));

                        if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                            fulfillment.stops.forEach((stopItem, stopIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                                    expect(stopItem).to.exist.and.to.be.an("object");
                                }));

                                if (stopItem?.id) {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string (OPTIONAL)`, function () {
                                        expect(stopItem.id).to.exist.and.to.be.a("string");
                                    }));

                                }
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                                    expect(stopItem.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["START", "END", "INTERMEDIATE_STOP", "PICKUP", "DROP", "TRANSIT_STOP"]);
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

                                if (stopItem?.location?.gps) {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.gps' which is a string (OPTIONAL) `, function () {
                                        expect(stopItem.location.gps).to.exist.and.to.be.a("string");
                                    }));

                                }
                                if (stopItem?.time) {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
                                        expect(stopItem.time).to.exist.and.to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.label' which is a string (OPTIONAL)`, function () {
                                        expect(stopItem.time.label).to.exist.and.to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.timestamp' which is a string (OPTIONAL)`, function () {
                                        expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
                                    }));

                                }
                            })
                        }
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                            expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle.category' which is a string (OPTIONAL)`, function () {
                            expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.oneOf(["BUS", "AIRLINE", "METRO", "AUTO_RIKSHAW", "CAB"]);
                        }));

                        //message.catalog.provider.fulfillments.tags
                        if (step === "II") {
                            const arr = [{ code: "VEHICLE_GRID" }, { code: "VEHICLE_AVAIBALITY" }, { code: "VEHICLE_AMENITIES" }];
                            arr.forEach((ele) => {
                                const tagIndex = fulfillment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                const tagItem = fulfillment?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                }));


                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should be an object`, function () {
                                        expect(tagItem).to.be.an("object");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                    }));

                                    if (tagItem?.descriptor?.code === "VEHICLE_GRID" || tagItem?.descriptor?.code === "VEHICLE_AVAIBALITY") {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].display' should  be a boolean`, function () {
                                            expect(tagItem.display).to.be.a("boolean");
                                        }));

                                    }
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    const vehicleGridArr = [{ code: "X_MAX" }, { code: "Y_MAX" }, { code: "Z_MAX" }, { code: "X_LOBBY_START" }, { code: "X_LOBBY_SIZE" }, { code: "Y_LOBBY_START" }, { code: "Y_LOBBY_SIZE" }, { code: "SEAT_SELECTION" }]
                                    const vehicleAvaibalityArr = [{ code: "AVALIABLE_SEATS" }]
                                    const vehicleAmenitiesArr = [{ value: "WATER_BOTTLE" }, { value: "BLANKET" }, { value: "WIFI" }, { value: "CCTV" }]

                                    let array;
                                    switch (tagItem?.descriptor?.code) {
                                        case "VEHICLE_GRID":
                                            array = vehicleGridArr;
                                            break;
                                        case "VEHICLE_AVAIBALITY":
                                            array = vehicleAvaibalityArr;
                                            break;
                                        case "VEHICLE_AMENITIES":
                                            array = vehicleAmenitiesArr;
                                            break;
                                        default:
                                            break;
                                    }

                                    if (array) {
                                        array.forEach((it) => {
                                            const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor?.code === it?.code || listItem?.value === it?.value);
                                            const listItem = tagItem?.list[listItemIndex];

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));


                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should be an object and have properties named 'descriptor' and 'value' which are strings`, function () {
                                                    expect(listItem).to.be.an("object");
                                                }));


                                                if (listItem?.descriptor) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                    }));


                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                                    }));

                                                }

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                }));

                                            }
                                        });
                                    }
                                }
                            });
                        }
                        if (step === "III") {
                            const arr = [{ code: "VEHICLE_GRID" }, { code: "VEHICLE_AVAIBALITY" }, { code: "VEHICLE_AMENITIES" }];
                            arr.forEach((ele) => {
                                const tagIndex = fulfillment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                const tagItem = fulfillment?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                }));


                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should be an object`, function () {
                                        expect(tagItem).to.be.an("object");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                    }));

                                    if (tagItem?.descriptor?.code === "VEHICLE_GRID" || tagItem?.descriptor?.code === "VEHICLE_AVAIBALITY") {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].display' should  be a boolean`, function () {
                                            expect(tagItem.display).to.be.a("boolean");
                                        }));

                                    }


                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    const vehicleGridArr = [{ code: "X_MAX" }, { code: "Y_MAX" }, { code: "Z_MAX" }, { code: "X_LOBBY_START" }, { code: "X_LOBBY_SIZE" }, { code: "Y_LOBBY_START" }, { code: "Y_LOBBY_SIZE" }, { code: "SEAT_SELECTION" }]
                                    const vehicleAvaibalityArr = [{ code: "AVALIABLE_SEATS" }]
                                    const vehicleAmenitiesArr = [{ value: "WATER_BOTTLE" }, { value: "WIFI" }, { value: "BLANKET" }, { value: "CCTV" }]
                                    const seatGridArr = [{ code: "X" }, { code: "Y" }, { code: "Z" }, { code: "X_SIZE" }, { code: "Y_SIZE" }, { code: "NUMBER" }, { code: "RESTRICTED_GENDER" }, { code: "SINGLE_SEAT" }, { code: "SEAT_PRICE" }, { code: "ITEM_ID" }, { code: "AVAILABLE" }]

                                    let array;
                                    switch (tagItem?.descriptor?.code) {
                                        case "VEHICLE_GRID":
                                            array = vehicleGridArr;
                                            break;
                                        case "VEHICLE_AVAIBALITY":
                                            array = vehicleAvaibalityArr;
                                            break;
                                        case "VEHICLE_AMENITIES":
                                            array = vehicleAmenitiesArr;
                                            break;
                                        case "SEAT_GRID":
                                            array = seatGridArr;
                                            break;
                                        default:
                                            break;
                                    }

                                    if (array) {
                                        array.forEach((it) => {
                                            const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor?.code === it?.code || listItem?.value === it?.value);
                                            const listItem = tagItem?.list[listItemIndex];

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));


                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should be an object and have properties named 'descriptor' and 'value' which are strings`, function () {
                                                    expect(listItem).to.be.an("object");
                                                }));


                                                if (listItem?.descriptor) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                    }));


                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                                    }));

                                                }

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
            })
        }

         return [testSuite,responseTestSuite];
    } catch (error) {
        console.log(error)
        return error
    }
}
module.exports = {
    on_search,
};