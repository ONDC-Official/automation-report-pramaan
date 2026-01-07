const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_search({ context, message } = {}, isSelfPickup = false,logs = [],constants = {}) {
    const testSuite = new Mocha.Suite(`on_search Request Verification`);
    try {
        const responseTestSuite = response_verification({ context, message }, logs,constants);
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
            message.catalog.providers.forEach((provider, providerIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}]' which is an object`, function () {
                    expect(provider).to.exist.and.to.be.an("object");
                }));

                //message.catalog.providers.fulfillments
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

                        const fulfillmentType = isSelfPickup ? "SELF_PICKUP" : "DELIVERY";
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].type' which is a string and equal to "${fulfillmentType}"`, function () {
                            expect(fulfillment.type).to.be.a("string").and.to.equal(fulfillmentType);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                            expect(fulfillment.stops).to.exist.and.to.be.an("array");
                        }));

                        if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                            fulfillment.stops.forEach((stopItem, stopIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                                    expect(stopItem).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                                    expect(stopItem.type).to.be.a("string").and.to.be.oneOf(["START", "END", "TRANSIT_STOP", "INTERMEDIATE_STOP"]);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location' which is an object (OPTIONAL)`, function () {
                                    expect(stopItem.location).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.gps' which is a string and valid coordinates `, function () {
                                    const gpsValue = stopItem.location.gps;

                                    const gpsPattern = /^-?\d{1,3}\.\d{6}, ?-?\d{1,3}\.\d{6}$/;
                                    expect(gpsValue).to.exist.and.to.be.a("string");
                                    expect(gpsValue).to.match(gpsPattern, "GPS value must be valid coordinates in the format 'lat, long'");
                                }));

                            })
                        }
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                            expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle.category' which is a string `, function () {
                            expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.oneOf(["TWO_WHEELER", "AUTO_RICKSHAW", "CAB"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle.variant' which is a string (OPTIONAL)`, function () {
                            expect(fulfillment.vehicle.variant).to.exist.and.to.be.a("string").and.to.be.oneOf(["EV", "SEDAN", "SUV", "HATCHBACK", "TWO_WHEELER", "AUTO_RICKSHAW"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle.energy_type' which is a string (OPTIONAL)`, function () {
                            expect(fulfillment.vehicle.energy_type).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle.energy_type' should be one of ["ELECTRIC", "PETRO", "DIESEL", "HYDROGEN", "BIOFUELS", "CNG", "LPG"] (OPTIONAL)`, function () {
                            expect(fulfillment.vehicle.energy_type).to.be.oneOf(["ELECTRIC", "PETRO", "DIESEL", "HYDROGEN", "BIOFUELS", "CNG", "LPG"]);
                        }));
                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].id' which is a string`, function () {
                    expect(provider.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items' should be an array`, function () {
                    expect(provider.items).to.be.an('array');
                }));

                if (provider?.items && provider?.items.length > 0) {
                    provider.items.forEach((item, itemIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}]' which is an object`, function () {
                            expect(item).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}]' should have a property named 'descriptor' which is an object`, function () {
                            expect(item.descriptor).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].descriptor' should have a property named 'name' which is a string (OPTIONAL)`, function () {
                            expect(item.descriptor.name).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].descriptor' should have a property named 'code' which is a string (OPTIONAL)`, function () {
                            expect(item.descriptor.code).to.be.a("string").and.to.be.oneOf(["RIDE", "SJT", "SFSJT", "RJT", "PASS", "SEAT", "NON_STOP", "CONNECT"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}]' should have a property named 'fulfillment_ids' which is an array`, function () {
                            expect(item.fulfillment_ids).to.be.an("array");
                        }));

                        if (item?.fulfillment_ids && item.fulfillment_ids.length > 0) {
                            item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].fulfillment_ids[${fulfillmentIdIndex}]' should be a string`, function () {
                                    expect(fulfillmentID).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].fulfillment_ids' should include fulfillment ID '${fulfillmentID}'`, function () {
                                    expect(item.fulfillment_ids).to.include(fulfillmentID);
                                }));
                            });
                        }

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].id' which is a string`, function () {
                            expect(item.id).to.exist.and.to.be.a("string");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}]' should have a property named 'location_ids' which is an array (OPTIONAL)`, function () {
                            expect(item.location_ids).to.be.an("array");
                        }));

                        if (item?.location_ids && item?.location_ids.length > 0) {
                            item.location_ids.forEach((locationId, locationIdIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].location_ids[${locationIdIndex}]'should be a string (OPTIONAL)`, function () {
                                    expect(locationId).to.be.a("string");
                                }));
                            })
                        }

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}]' should have a property named 'price' which is an object`, function () {
                            expect(item.price).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].price' should have a property named 'currency' which is a string (OPTIONAL)`, function () {
                            expect(item.price.currency).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].price' should have a property named 'maximum_value' which is a string (OPTIONAL)`, function () {
                            expect(item.price.maximum_value).to.be.a("string");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].price' should have a property named 'minimum_value' which is a string (OPTIONAL)`, function () {
                            expect(item.price.minimum_value).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].price' should have a property named 'value' which is a string (OPTIONAL)`, function () {
                            expect(item.price.value).to.be.a("string");
                        }));
                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].locations' should be an array (OPTIONAL)`, function () {
                    expect(provider.locations).to.be.an('array');
                }));

                if (provider?.locations && provider?.locations.length > 0) {
                    provider.locations.forEach((locationItem, locationIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].location[${locationIndex}]' should be an object (OPTIONAL)`, function () {
                            expect(locationItem).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].location[${locationIndex}].id' should be a string (OPTIONAL)`, function () {
                            expect(locationItem.id).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].location[${locationIndex}].gps' should be a string and valid coordinates (OPTIONAL)`, function () {
                            const gpsValue = locationItem.gps;

                            const gpsPattern = /^-?\d{1,3}\.\d{6}, ?-?\d{1,3}\.\d{6}$/;
                            expect(gpsValue).to.exist.and.to.be.a("string");
                            expect(gpsValue).to.match(gpsPattern, "GPS value must be valid coordinates in the format 'lat, long'");
                        }));

                    })
                }


                //message.catalog.providers.payments
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].payments' which is an array`, function () {
                    expect(provider.payments).to.exist.and.to.be.an("array");
                }));

                if (provider?.payments && provider?.payments.length > 0) {
                    provider.payments.forEach((payment, z) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].payments[${z}]' which is an object`, function () {
                            expect(payment).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'Verify the presence of 'message.catalog.providers[${providerIndex}].payments[${z}].collected_by' which is a string`, function () {
                            expect(payment.collected_by).to.be.a("string");
                        }));

                        const arr = [{ code: "BUYER_FINDER_FEES" }, { code: "SETTLEMENT_TERMS" }];
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


                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].payments[${z}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}' `, function () {
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
                                const settlementTermsArr = [{ code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "SETTLEMENT_TYPE" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "DELAY_INTEREST" }, { code: "STATIC_TERMS" }];

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
                    })
                }
            })
        }
        return [ testSuite,responseTestSuite];
    } catch (error) {
        testSuite.addTest(new Mocha.Test("on_search request failed to be verified because of some missing payload or some internal error", function() {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return testSuite;
    }
}
module.exports = {
    on_search
}