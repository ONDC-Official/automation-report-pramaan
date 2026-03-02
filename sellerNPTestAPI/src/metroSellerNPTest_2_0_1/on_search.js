const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { iso8601DurationRegex } = require('../utils/constants');
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_search({ context, message } = {}, step, type = "", logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_search (${step}) Request Verification`);
        const responseTestSuite = response_verification({ context, message }, logs, constants);

        contextTests(context, "on_search", testSuite, logs);

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
        messageTestSuite.addTest(new Mocha.Test("'message.catalog.descriptor.images' should be an array (OPTIONAL)", function () {
            expect(message.catalog.descriptor.images).to.be.an('array');
        }));
        if (message?.catalog?.descriptor?.images && message?.catalog?.descriptor?.images.length > 0) {
            message?.catalog?.descriptor?.images.forEach((image, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.descriptor.images[${i}]' should be an object (OPTIONAL) `, function () {
                    expect(image).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.descriptor.images[${i}].url' should be a string (OPTIONAL)`, function () {
                    expect(image.url).to.be.a('string');
                }));
            })

        }
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

                if (type === "METRO") {
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}]' should have a property named 'categories' which is an array`, function () {
                        expect(provider.categories).to.be.an("array");
                    }));
                    if (provider?.categories && provider?.categories.length > 0) {
                        provider?.categories.forEach((category, categoryIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}]' should be an object`, function () {
                                expect(category).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor' should be an object`, function () {
                                expect(category.descriptor).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor.name' should be a string (OPTIONAL)`, function () {
                                expect(category.descriptor.name).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor.code' should be a string`, function () {
                                expect(category.descriptor.code).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].id' should be a string`, function () {
                                expect(category.id).to.be.a('string');
                            }));
                        })
                    }

                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].time' should be an object`, function () {
                        expect(provider.time).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].time.range' should be an object`, function () {
                        expect(provider.time.range).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].time.range.start' should be a string`, function () {
                        expect(provider.time.range.start).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].time.range.end' should be a string`, function () {
                        expect(provider.time.range.end).to.be.a('string');
                    }));
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}]' should have a property named 'descriptor' which is an object`, function () {
                    expect(provider.descriptor).to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor' should have a property named 'name' which is a string (OPTIONAL)`, function () {
                    expect(provider.descriptor.name).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images' should be an array (OPTIONAL)`, function () {
                    expect(provider.descriptor.images).to.be.an('array');
                }));
                if (provider?.descriptor?.images && provider?.descriptor?.images.length > 0) {
                    provider.descriptor.images.forEach((image, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images[${i}]' should be an object (OPTIONAL)`, function () {
                            expect(image).to.be.an('object');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images[${i}].url' should be a string (OPTIONAL)`, function () {
                            expect(image.url).to.be.a('string');
                        }));
                    })

                }
                //message.catalog.providers.items-->> for step II only 
                if (step === "II") {
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
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].category_ids' should be an array, that should not be empty (OPTIONAL)`, function () {
                                expect(item.category_ids).to.be.an('array').that.is.not.empty;
                            }));
                            if (item?.category_ids && item?.category_ids.length > 0) {
                                item?.category_ids.forEach((categoryId, categoryIdIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].category_ids[${categoryIdIndex}]' should be string`, function () {
                                        expect(categoryId).to.be.a("string");
                                    }));
                                })
                            }
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].descriptor' which is an object`, function () {
                                expect(item.descriptor).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].descriptor.name' which is a string (OPTIONAL)`, function () {
                                expect(item.descriptor.name).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].descriptor.code' which is a string (OPTIONAL)`, function () {
                                expect(item.descriptor.code).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].price' which is an object`, function () {
                                expect(item.price).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].price.currency' which is a string (OPTIONAL)`, function () {
                                expect(item.price.currency).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].price.value' which is a string (OPTIONAL)`, function () {
                                expect(item.price.value).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity' which is an object`, function () {
                                expect(item.quantity).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity.maximum' which is an object`, function () {
                                expect(item.quantity.maximum).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity.maximum.count' which is a number (OPTIONAL)`, function () {
                                expect(item.quantity.maximum.count).to.exist.and.to.be.a("number");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity.minimum' which is an object`, function () {
                                expect(item.quantity.minimum).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].quantity.minimum.count' which is a number (OPTIONAL)`, function () {
                                expect(item.quantity.minimum.count).to.exist.and.to.be.a("number");
                            }));
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
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].time' should be an object`, function () {
                                expect(item.time).to.be.an('object');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${i}].time.label' should be an object (OPTIONAL)`, function () {
                                expect(item.time.label).to.be.a('string');
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${i}].time.duration' which is a valid ISO 8601 duration string(OPTIONAL)`, function () {
                                const durationValue = item?.time?.duration;

                                // ISO 8601 duration format (e.g., "PT2H" for 2 hours)
                                const iso8601DurationPattern = /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/;
                                expect(durationValue).to.exist.and.to.be.a("string");
                                expect(durationValue).to.match(iso8601DurationPattern, "Duration must be a valid ISO 8601 duration string");
                            }));
                        })
                    }
                }
                //message.catalog.providers.fulfillments
                if (step === "I") {
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
                                expect(fulfillment.type).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                                expect(fulfillment.stops).to.exist.and.to.be.an("array");
                            }));
                            if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                                fulfillment?.stops.forEach((stopItem, stopIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                                        expect(stopItem).to.exist.and.to.be.an("object");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                                        expect(stopItem.type).to.exist.and.to.be.a("string");
                                    }));

                                    if (stopIndex !== 0 && stopIndex !== fulfillment?.stops?.length - 1) {
                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions' which is an object (OPTIONAL)`, function () {
                                            expect(stopItem.instructions).to.exist.and.to.be.an("object");
                                        }));
                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions.name' which is a string (OPTIONAL)`, function () {
                                            expect(stopItem.instructions.name).to.exist.and.to.be.a("string");
                                        }));
                                    }

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location' which is an object`, function () {
                                        expect(stopItem.location).to.exist.and.to.be.an("object");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor' which is an object`, function () {
                                        expect(stopItem.location.descriptor).to.exist.and.to.be.an("object");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.code' which is a string (OPTIONAL)`, function () {
                                        expect(stopItem.location.descriptor.code).to.exist.and.to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.gps' which is a string and valid coordinates`, function () {
                                        const gpsValue = stopItem.location.gps;

                                        const gpsPattern = /^-?\d{1,3}\.\d{6}, ?-?\d{1,3}\.\d{6}$/;
                                        expect(gpsValue).to.exist.and.to.be.a("string");
                                        expect(gpsValue).to.match(gpsPattern, "GPS value must be valid coordinates in the format 'lat, long'");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string`, function () {
                                        expect(stopItem.id).to.exist.and.to.be.a("string");
                                    }));

                                    if (stopIndex !== 0) {
                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].parent_stop_id' which is a string (OPTIONAL)`, function () {
                                            expect(stopItem.parent_stop_id).to.exist.and.to.be.a("string");
                                        }));
                                    }
                                })
                            }

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                                expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle.category' which is a string`, function () {
                                expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string");
                            }));
                        })
                    }
                }
                if (step === "II") {
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
                                expect(fulfillment.type).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                                expect(fulfillment.stops).to.exist.and.to.be.an("array");
                            }));
                            if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                                fulfillment?.stops.forEach((stopItem, stopIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                                        expect(stopItem).to.exist.and.to.be.an("object");
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
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.name' which is a string (OPTIONAL)`, function () {
                                        expect(stopItem.location.descriptor.name).to.exist.and.to.be.a("string");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.code' which is a string (OPTIONAL)`, function () {
                                        expect(stopItem.location.descriptor.code).to.exist.and.to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.gps' which is a string and valid coordinates`, function () {
                                        const gpsValue = stopItem.location.gps;

                                        const gpsPattern = /^-?\d{1,3}\.\d{6}, ?-?\d{1,3}\.\d{6}$/;
                                        expect(gpsValue).to.exist.and.to.be.a("string");
                                        expect(gpsValue).to.match(gpsPattern, "GPS value must be valid coordinates in the format 'lat, long'");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string`, function () {
                                        expect(stopItem.id).to.exist.and.to.be.a("string");
                                    }));

                                    if (stopIndex !== 0) {
                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].parent_stop_id' which is a string (OPTIONAL)`, function () {
                                            expect(stopItem.parent_stop_id).to.exist.and.to.be.a("string");
                                        }));
                                    }

                                    if (stopIndex !== 0 && stopIndex !== fulfillment?.stops.length - 1) {
                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions' which is an object (OPTIONAL)`, function () {
                                            expect(stopItem.instructions).to.exist.and.to.be.an("object");
                                        }));
                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions.name' which is a string (OPTIONAL)`, function () {
                                            expect(stopItem.instructions.name).to.exist.and.to.be.a("string");
                                        }));
                                    }
                                })
                            }

                            const passItem = provider?.items?.find((item) => item?.descriptor?.code === "PASS");
                            if (passItem?.fulfillment_ids.includes(fulfillment?.id)) {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags' and that should be an array`, function () {
                                    expect(fulfillment.tags).to.exist.that.is.an("array");
                                }));

                                if (fulfillment?.tags && fulfillment?.tags.length > 0) {
                                    fulfillment?.tags.forEach((tagItem, tagItemIndex) => {
                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagItemIndex}]' and that should be an object`, function () {
                                            expect(tagItem).to.exist.that.is.an("object");
                                        }));
                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagItemIndex}].descriptor' and that should be an object`, function () {
                                            expect(tagItem.descriptor).to.exist.that.is.an("object");
                                        }));
                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagItemIndex}].descriptor.code' and that should be a string`, function () {
                                            expect(tagItem.descriptor.code).to.exist.that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagItemIndex}].list' and that should be an array`, function () {
                                            expect(tagItem.list).to.exist.that.is.an("array");
                                        }));

                                        if (tagItem.list && tagItem.list.length > 0) {
                                            tagItem.list.forEach((listItem, listItemIndex) => {
                                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagItemIndex}].list[${listItemIndex}]' and that should be an object`, function () {
                                                    expect(listItem).to.exist.that.is.an("object");
                                                }));
                                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagItemIndex}].list[${listItemIndex}].descriptor' and that should be an object`, function () {
                                                    expect(listItem.descriptor).to.exist.that.is.an("object");
                                                }));
                                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagItemIndex}].list[${listItemIndex}].descriptor.code' and that should be a string`, function () {
                                                    expect(listItem.descriptor.code).to.exist.that.is.a("string");
                                                }));
                                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].tags[${tagItemIndex}].list[${listItemIndex}].value' and that should be a string`, function () {
                                                    expect(listItem.value).to.exist.that.is.a("string");
                                                }));
                                            })
                                        }
                                    })
                                }
                            }
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                                expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle.category' which is a string`, function () {
                                expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string");
                            }));
                        })
                    }
                }

                //message.catalog.providers.payments
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].payments' which is an array`, function () {
                    expect(provider.payments).to.exist.and.to.be.an("array");
                }));

                if (provider?.payments && provider?.payments.length > 0) {
                    provider?.payments.forEach((payment, z) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payments' should contain payment object`, function () {
                            expect(payment).to.exist;
                            expect(payment).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should have 'message.catalog.payment[${z}].tags' property`, function () {
                            expect(payment.tags).to.exist;
                            expect(payment.tags).to.be.an("array").that.is.not.empty;
                        }));

                        const arr = [{ code: "BUYER_FINDER_FEES" }, { code: "SETTLEMENT_TERMS" }];

                        arr.forEach((ele) => {
                            const tagIndex = payment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele?.code);

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags' should contain ${ele?.code}`, function () {
                                expect(tagIndex, `'message.catalog.payment[${z}].tags' should contain ${ele?.code}`).to.not.equal(-1);
                            }));

                            if (tagIndex !== -1) {
                                const tag = payment?.tags[tagIndex];

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}]' should contain a property 'descriptor' which is an object`, function () {
                                    expect(tag).to.have.property('descriptor').that.is.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].descriptor' should contain a property 'code' which is a string`, function () {
                                    expect(tag.descriptor).to.have.property('code').that.is.a("string");
                                }))

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].descriptor.code' should be equal to ${ele?.code}`, function () {
                                    expect(tag.descriptor.code).to.equal(ele?.code);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}]' should contain a property 'display' which is a boolean`, function () {
                                    expect(tag).to.have.property('display').that.is.a("boolean");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}]' should have a property 'list' which is an array`, function () {
                                    expect(tag).to.have.property('list').that.is.an("array");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list' should not be empty`, function () {
                                    expect(tag.list).to.be.an('array').that.is.not.empty;
                                }));

                                if (ele?.code === "BUYER_FINDER_FEES") {
                                    const buyerFinderFeesFixed = ["BUYER_FINDER_FEES_TYPE", "BUYER_FINDER_FEES_AMOUNT"]
                                    const buyerFinderFeesPercent = ["BUYER_FINDER_FEES_TYPE", "BUYER_FINDER_FEES_PERCENTAGE"]

                                    const buyerFinderFeesType = tag?.list?.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE");

                                    let buyerFinderFeeArr;
                                    switch (buyerFinderFeesType?.descriptor?.code) {
                                        case "amount":
                                            buyerFinderFeeArr = buyerFinderFeesFixed;
                                            break;
                                        default:
                                            buyerFinderFeeArr = buyerFinderFeesPercent;
                                            break;
                                    }

                                    if (buyerFinderFeeArr && buyerFinderFeeArr.length > 0) {
                                        buyerFinderFeeArr.forEach((it) => {
                                            const listItemIndex = tag?.list?.findIndex((listItem) => listItem?.descriptor?.code === it);

                                            if (it === 'BUYER_FINDER_FEES_TYPE') {
                                                if (listItemIndex !== -1) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should contain ${it}`, function () {
                                                        expect(listItemIndex, `'message.catalog.payment[${z}].tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                                    }));
                                                }
                                            } else {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should contain ${it}`, function () {
                                                    expect(listItemIndex, `'message.catalog.payment[${z}].tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                                }));
                                            }

                                            if (listItemIndex !== -1 && tag?.list[listItemIndex]) {
                                                const listItem = tag?.list[listItemIndex];

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'descriptor' which is an object`, function () {
                                                    expect(listItem).to.have.property('descriptor').that.is.an("object");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have property 'code' which is a string`, function () {
                                                    expect(listItem.descriptor).to.have.property('code').that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to ${it}`, function () {
                                                    expect(listItem.descriptor.code).to.equal(it);
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string`, function () {
                                                    expect(listItem).to.have.property('value').that.is.a("string");
                                                }));
                                            }
                                        })
                                    }
                                }

                                if (ele?.code === "SETTLEMENT_TERMS") {
                                    const settlementTermsArr = ["SETTLEMENT_WINDOW", "SETTLEMENT_BASIS", "MANDATORY_ARBITRATION", "COURT_JURISDICTION", "STATIC_TERMS"];

                                    if (settlementTermsArr && settlementTermsArr.length > 0) {
                                        settlementTermsArr.forEach((it) => {
                                            const listItemIndex = tag?.list?.findIndex((listItem) => listItem?.descriptor?.code === it);

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should contain ${it}`, function () {
                                                expect(listItemIndex, `'message.catalog.payment[${z}].tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                            }));

                                            if (listItemIndex !== -1 && tag?.list[listItemIndex]) {
                                                const listItem = tag?.list[listItemIndex];

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'descriptor' which is an object`, function () {
                                                    expect(listItem).to.have.property('descriptor').that.is.an("object");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have property 'code' which is a string`, function () {
                                                    expect(listItem.descriptor).to.have.property('code').that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to ${it}`, function () {
                                                    expect(listItem.descriptor.code).to.equal(it);
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string`, function () {
                                                    expect(listItem).to.have.property('value').that.is.a("string");
                                                }));

                                                switch (listItem?.descriptor?.code) {
                                                    case "SETTLEMENT_WINDOW":
                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.payment[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be in a valid ISO format ${listItem?.descriptor?.code}`, function () {
                                                            expect(listItem?.value).to.exist.and.to.match(iso8601DurationRegex);
                                                        }));
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            }
                                        })
                                    }
                                }
                            }
                        })
                    })
                }

                if (type === "METRO" && provider?.tags && provider?.tags.length > 0) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].tags' and that should be an array`, function () {
                        expect(provider.tags).to.exist.that.is.an("array");
                    }));

                    const arr = ["SCHEDULED_INFO"];

                    arr.forEach((ele) => {
                        const tagIndex = provider?.tags.findIndex((tag) => tag?.descriptor?.code === ele);

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].tags' should contains '${ele}'`, function () {
                            expect(tagIndex, `'message.catalog.providers[${providerIndex}].tags' should contains '${ele}'`).not.to.equal(-1);
                        }));

                        if (tagIndex !== -1) {
                            const tag = provider?.tags[tagIndex];

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.provider[${providerIndex}].tags[${tagIndex}]' should contain a property 'descriptor' which is an object`, function () {
                                expect(tag).to.have.property('descriptor').that.is.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.provider[${providerIndex}].tags[${tagIndex}].descriptor' should contain a property 'code' which is a string`, function () {
                                expect(tag.descriptor).to.have.property('code').that.is.a("string");
                            }))

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.provider[${providerIndex}].tags[${tagIndex}].descriptor.code' should be equal to '${ele}'`, function () {
                                expect(tag.descriptor.code).to.equal(ele);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.provider[${providerIndex}].tags[${tagIndex}]' should contain a property 'display' which is a boolean`, function () {
                                expect(tag).to.have.property('display').that.is.a("boolean");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.provider[${providerIndex}].tags[${tagIndex}]' should have a property 'list' which is an array`, function () {
                                expect(tag).to.have.property('list').that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.provider[${providerIndex}].tags[${tagIndex}].list' should not be empty`, function () {
                                expect(tag.list).to.be.an('array').that.is.not.empty;
                            }));

                            const listArr = ["GTFS"];

                            if (listArr && listArr.length > 0) {
                                listArr.forEach((it) => {
                                    const listItemIndex = tag?.list?.findIndex((listItem) => listItem?.descriptor?.code === it);

                                    messageTestSuite.addTest(new Mocha.Test(`''message.catalog.provider[${providerIndex}].tags[${tagIndex}].list[${listItemIndex}]' should contain '${it}'`, function () {
                                        expect(listItemIndex, `''message.catalog.provider[${providerIndex}].tags[${tagIndex}].list' should contain '${it}'`).to.not.equal(-1);
                                    }));

                                    if (listItemIndex !== -1 && tag?.list[listItemIndex]) {
                                        const listItem = tag?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`''message.catalog.provider[${providerIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'descriptor' which is an object`, function () {
                                            expect(listItem).to.have.property('descriptor').that.is.an("object");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`''message.catalog.provider[${providerIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have property 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property('code').that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`''message.catalog.provider[${providerIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it}'`, function () {
                                            expect(listItem.descriptor.code).to.equal(it);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`''message.catalog.provider[${providerIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string`, function () {
                                            expect(listItem).to.have.property('value').that.is.a("string");
                                        }));
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }

        return [testSuite, responseTestSuite];
    } catch (error) {
        console.log(error);
        return error;
    }
}


module.exports = {
    on_search
}