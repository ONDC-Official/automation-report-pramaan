const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { settlementTermsListTests } = require('../bussinessTests/rideHailingBusiness');

const cancellationReasonIds = [
    '001', '002', '003', '004', '005',
    '011', '012', '013', '014'
]

async function on_cancel({ context, message } = {}, step, logs = [], type = "", isSelfPickup = false) {
    const testSuite = new Mocha.Suite(`on_cancel (${step}) Request Verification`);
    try {
        contextTests(context, "on_cancel", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        //message.order.cancellation_terms
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

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].fulfillment_state.descriptor.code' and that should be a string (OPTIONAL)`, function () {
                    expect(C_terms.fulfillment_state.descriptor.code).to.exist.that.is.a("string").and.to.be.oneOf(["DRIVER_EN_ROUTE_TO_PICKUP", "RIDE_CONFIRMED", "RIDE_CANCELLED", "PAYMENT_COLLECTED", "RIDE_ENDED", "DRIVER_AT_PICKUP", "RIDE_STARTED", "RIDE_UPDATED", "RIDE_ASSIGNED", "RIDE_ENROUTE_PICKUP", "RIDE_ARRIVED_PICKUP"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].reason_required' and that should be a boolean (OPTIONAL)`, function () {
                    expect(C_terms.reason_required).to.exist.that.is.a("boolean");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee' and that should be an object`, function () {
                    expect(C_terms.cancellation_fee).to.exist.that.is.an("object");
                }));

                if (C_terms?.cancellation_fee?.percentage) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.percentage' and that it is a string (OPTIONAL)`, function () {
                        expect(C_terms.cancellation_fee.percentage).to.exist.and.to.be.a("string");
                    }));

                }

                if (C_terms?.cancellation_fee?.amount) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.amount' and that it is an object`, function () {
                        expect(C_terms.cancellation_fee.amount).to.exist.and.to.be.an("object");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.amount.currency' and that it is a string (OPTIONAL)`, function () {
                        expect(C_terms.cancellation_fee.amount.currency).to.exist.and.to.be.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.amount.value' and that it is a string (OPTIONAL)`, function () {
                        expect(C_terms.cancellation_fee.amount.value).to.exist.and.to.be.a("string");
                    }));

                }
            })
        }

        //message.order.fulfillments
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.fulfillments' which is an array", function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                    expect(fulfillment).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer' which is an object`, function () {
                    expect(fulfillment.customer).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.contact' which is an object`, function () {
                    expect(fulfillment.customer.contact).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.contact.phone' which is a string`, function () {
                    expect(fulfillment.customer.contact.phone).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person' which is an object`, function () {
                    expect(fulfillment.customer.person).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.name' which is a string`, function () {
                    expect(fulfillment.customer.person.name).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string (OPTIONAL)`, function () {
                    expect(fulfillment.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state' which is an object`, function () {
                    expect(fulfillment.state).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor' which is an object`, function () {
                    expect(fulfillment.state.descriptor).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor.code' which is a string`, function () {
                    expect(fulfillment.state.descriptor.code).to.exist.and.to.be.a("string");
                }));

                const fulfillmentType = isSelfPickup ? "SELF_PICKUP" : "DELIVERY";
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string and equal to "${fulfillmentType}"`, function () {
                    expect(fulfillment.type).to.be.a("string").and.to.equal(fulfillmentType);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                    expect(fulfillment.stops).to.exist.and.to.be.an("array");
                }));

                if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                    fulfillment.stops.forEach((stopItem, stopIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                            expect(stopItem).to.exist.and.to.be.an("object");
                        }));

                        if (stopItem?.authorization) {

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization' which is an object`, function () {
                                expect(stopItem.authorization).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization.token' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.authorization.token).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization.type' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.authorization.type).to.exist.and.to.be.a("string");
                            }));

                        }

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string (OPTIONAL)`, function () {
                            expect(stopItem.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["START", "END", "INTERMEDIATE_STOP", "TRANSIT_STOP"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location' which is an object (OPTIONAL)`, function () {
                            expect(stopItem.location).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.gps' which is a string and valid coordinates`, function () {
                            const gpsValue = stopItem.location.gps;

                            const gpsPattern = /^-?\d{1,3}\.\d{6}, ?-?\d{1,3}\.\d{6}$/;
                            expect(gpsValue).to.exist.and.to.be.a("string");
                            expect(gpsValue).to.match(gpsPattern, "GPS value must be valid coordinates in the format 'lat, long'");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.address' which is a string (OPTIONAL)`, function () {
                            expect(stopItem.location.address).to.exist.and.to.be.a("string");
                        }));

                        if (stopItem?.time) {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
                                expect(stopItem.time).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.duration' which is a valid ISO 8601 duration string (OPTIONAL)`, function () {
                                const durationValue = stopItem.time?.duration;

                                // ISO 8601 duration format (e.g., "PT2H" for 2 hours)
                                const iso8601DurationPattern = /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/;
                                expect(durationValue).to.exist.and.to.be.a("string");
                                expect(durationValue).to.match(iso8601DurationPattern, "Duration must be a valid ISO 8601 duration string");
                            }));
                        }

                        if (stopItem?.id) {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string`, function () {
                                expect(stopItem.id).to.exist.and.to.be.a("string");
                            }));

                        }
                    })
                }
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                    expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.category' which is a string `, function () {
                    expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.oneOf(["TWO_WHEELER", "AUTO_RICKSHAW", "CAB"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.variant' which is a string (OPTIONAL)`, function () {
                    expect(fulfillment.vehicle.variant).to.exist.and.to.be.a("string").and.to.be.oneOf(["EV", "SEDAN", "SUV", "HATCHBACK", "TWO_WHEELER", "AUTO_RICKSHAW"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.energy_type' which is a string (OPTIONAL)`, function () {
                    expect(fulfillment.vehicle.energy_type).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].vehicle.energy_type' should be one of ["ELECTRIC", "PETRO", "DIESEL", "HYDROGEN", "BIOFUELS", "CNG", "LPG"] (OPTIONAL)`, function () {
                    expect(fulfillment.vehicle.energy_type).to.be.oneOf(["ELECTRIC", "PETRO", "DIESEL", "HYDROGEN", "BIOFUELS", "CNG", "LPG"]);
                }));

                if (type !== "on_cancel_driver_not_found" && type !== "" && type !== "on_cancel_technical") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.make' which is a string `, function () {
                        expect(fulfillment.vehicle.make).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.model' which is a string (OPTIONAL)`, function () {
                        expect(fulfillment.vehicle.model).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.registration' which is a string `, function () {
                        expect(fulfillment.vehicle.registration).to.exist.and.to.be.a("string");
                    }));
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}]' should have an object named 'tags'`, function () {
                    expect(fulfillment).to.have.property("tags").that.is.an("array");
                }));

                if (fulfillment?.tags && fulfillment?.tags.length > 0) {
                    const arr = [{ code: "ROUTE_INFO" }];
                    arr.forEach((ele) => {
                        const tagIndex = fulfillment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = fulfillment?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));


                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("display").that.is.a("boolean");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));


                            if (tagIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                    expect(tagItem).to.have.property("display").that.is.a("boolean");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                                    expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].display' should  be a boolean`, function () {
                                    expect(tagItem.display).to.be.a("boolean");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));


                                const routeInfoArr = [{ code: "ENCODED_POLYLINE" }, { code: "WAYPOINTS" }];

                                let array;
                                switch (tagItem?.descriptor?.code) {

                                    case "ROUTE_INFO":
                                        array = routeInfoArr;
                                        break;
                                    default:
                                        break;
                                }

                                if (array) {
                                    array.forEach((it) => {
                                        const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                        const listItem = tagItem?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                            expect(listItem).to.exist.and.to.be.an("object");
                                        }));

                                        if (listItemIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                expect(listItem).to.have.property("value").that.is.a("string");
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                expect(listItem.descriptor.code).to.be.equal(it.code);
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));

                                        }
                                    });
                                }
                            }
                        }
                    })
                }
            })

        }

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.id' which is a string `, function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }));

        //message.order.items
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.items' which is an array", function () {
            expect(message.order.items).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}]' which is an object`, function () {
                    expect(item).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].id' which is a string`, function () {
                    expect(item.id).to.exist.and.to.be.a("string");
                }));


                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor' which is an object`, function () {
                    expect(item.descriptor).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.name' which is a string`, function () {
                    expect(item.descriptor.name).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.code' which is a string `, function () {
                    expect(item.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["RIDE", "SJT", "SFSJT", "RJT", "PASS", "SEAT", "NON_STOP", "CONNECT"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price' which is an object`, function () {
                    expect(item.price).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price.currency' which is a string`, function () {
                    expect(item.price.currency).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price.maximum_value' which is a string (OPTIONAL)`, function () {
                    expect(item.price.maximum_value).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price.minimum_value' which is a string (OPTIONAL)`, function () {
                    expect(item.price.minimum_value).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price.value' which is a string`, function () {
                    expect(item.price.value).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should have a property named 'location_ids' which is an array (OPTIONAL)`, function () {
                    expect(item.location_ids).to.be.an("array");
                }));

                if (item?.location_ids && item?.location_ids.length > 0) {
                    item.location_ids.forEach((locationId, locationIdIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].location_ids[${locationIdIndex}]'should be a string (OPTIONAL)`, function () {
                            expect(locationId).to.be.a("string");
                        }));

                    })
                }
                const arr = [{ code: "FARE_POLICY" }, { code: "INFO" }];
                arr.forEach((ele) => {
                    const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                    const tagItem = item?.tags[tagIndex];
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    }));


                    if (tagIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                            expect(tagItem).to.have.property("descriptor").that.is.an("object");
                            expect(tagItem).to.have.property("display").that.is.a("boolean");
                            expect(tagItem).to.have.property("list").that.is.an("array");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                            expect(tagItem.descriptor.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].display' should  be a boolean`, function () {
                            expect(tagItem.display).to.be.a("boolean");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));


                        const farePolicyArr = [{ code: "MIN_FARE" }, { code: "MIN_FARE_DISTANCE_KM" }, { code: "PER_KM_CHARGE" }, { code: "PICKUP_CHARGE" }, { code: "WAITING_CHARGE_PER_MIN" }, { code: "NIGHT_CHARGE_MULTIPLIER" }, { code: "NIGHT_SHIFT_START_TIME" }, { code: "NIGHT_SHIFT_END_TIME" }];
                        const infoArr = [{ code: "DISTANCE_TO_NEAREST_DRIVER_METER" }, { code: "ETA_TO_NEAREST_DRIVER_MIN" }];

                        let array;
                        switch (tagItem?.descriptor?.code) {
                            case "FARE_POLICY":
                                array = farePolicyArr;
                                break;
                            case "INFO":
                                array = infoArr;
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

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                    expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                }));
                if (item?.fulfillment_ids && item.fulfillment_ids.length > 0) {
                    item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                        // Test to check if fulfillmentID is a string
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be a string`, function () {
                            expect(fulfillmentID).to.be.a("string");
                        }));

                        // Test to ensure each fulfillmentID in items is present in the fulfillments array
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be present in 'fulfillments' array`, function () {
                            const fulfillments = message?.order?.fulfillments?.map(fulfillment => fulfillment.id) || [];
                            expect(fulfillments).to.include(fulfillmentID);
                        }));
                    });
                }
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].payment_ids' should be an array, that should not be empty`, function () {
                    expect(item.payment_ids).to.be.an('array').that.is.not.empty;
                }));

                if (item?.payment_ids && item?.payment_ids.length > 0) {
                    item.payment_ids.forEach((paymentID, paymentIDIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].payment_ids[${paymentIDIndex}]' should be string`, function () {
                            expect(paymentID).to.be.a("string");
                        }));

                    })
                }
            })
        }

        //message.order.payments
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payments' which is an array", function () {
            expect(message.order.payments).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.payments && message?.order?.payments.length > 0) {
            message.order.payments.forEach((payment, z) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}]' which is an object`, function () {
                    expect(payment).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].id' which is a string`, function () {
                    expect(payment.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].collected_by' which is a string`, function () {
                    expect(payment.collected_by).to.exist.and.to.be.a("string").and.to.be.oneOf(["BAP", "BPP"]);
                }));

                let paymentStatus = [];
                switch (payment?.type) {
                    case "PRE-ORDER":
                    case "ON-ORDER":
                        paymentStatus.push("PAID");
                        break;
                    case "ON-FULFILLMENT":
                    case "POST-FULFILLMENT":
                        paymentStatus.push("NOT-PAID");
                        break;
                    default:
                        paymentStatus = [...paymentStatus, "PAID", "NOT-PAID"];
                        break;
                }

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].status' which is a string`, function () {
                    expect(payment.status).to.exist.and.to.be.a("string").and.to.be.oneOf(paymentStatus);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].type' which is a string`, function () {
                    expect(payment.type).to.be.a("string").and.to.be.oneOf(["PRE-ORDER", "ON-FULFILLMENT", "POST-FULFILLMENT"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params' which is a object`, function () {
                    expect(payment.params).to.exist.and.to.be.a("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.bank_code' which is a string`, function () {
                    expect(payment.params.bank_code).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.bank_account_number' which is a string`, function () {
                    expect(payment.params.bank_account_number).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.virtual_payment_address' which is a string (OPTIONAL)`, function () {
                    expect(payment.params.virtual_payment_address).to.exist.and.to.be.a("string");
                }));

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


                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].display' should  be a boolean`, function () {
                            expect(tagItem.display).to.be.a("boolean");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));

                        const buyerFinderFeeType = tagItem.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
                        const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_PERCENTAGE" }]
                        const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_AMOUNT" }];
                        const settlementTermsArr = [{ code: "DELAY_INTEREST" }, { code: "SETTLEMENT_TYPE" }, { code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "STATIC_TERMS" }, { code: "SETTLEMENT_AMOUNT" }];

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

                                    if (step !== "I" && it?.code === "SETTLEMENT_AMOUNT") {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be oneOf ["0.00", "0"]`, function () {
                                            expect(listItem.value).to.be.oneOf(["0.00", "0"]);
                                        }));
                                    }
                                }
                            });
                        }
                    }
                });
            })
        }

        if (step === "I") {
            settlementTermsListTests(messageTestSuite, { context, message }, logs);
        }

        // message.order.provider
        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
            expect(message.order.provider).to.be.an("object");
        }))
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'id' which is a string", function () {
            expect(message.order.provider.id).to.be.a("string");
        }));



        //message.order.quote
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote' which is an object", function () {
            expect(message.order.quote).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price' which is an object", function () {
            expect(message.order.quote.price).to.exist.and.to.be.an("object");
        }));


        const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
            return total + parseFloat(item.price.value);
        }, 0);

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
            const quotePriceValue = parseFloat(message.order.quote.price.value).toFixed(2);
            expect(quotePriceValue).to.be.oneOf([
                totalBreakupPrice.toFixed(2),
                Math.floor(totalBreakupPrice).toString(),
                Math.ceil(totalBreakupPrice).toString()
            ]);
        }));


        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price.value' which is a string", function () {
            expect(message.order.quote.price.value).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price.currency' which is a string", function () {
            expect(message.order.quote.price.currency).to.exist.and.to.be.a("string");
        }));


        const arr = [
            { title: "BASE_FARE" },
            { title: "DISTANCE_FARE" },
            { title: "CANCELLATION_CHARGES" },
            { title: "REFUND" }
        ];

        let logIndex = logs.length - 1;
        while (logIndex >= 0) {
            if (logs[logIndex]?.request?.context?.action !== "on_cancel" && logs[logIndex]?.request?.context?.action.startsWith("on_"))
                break;

            logIndex--;
        }

        const fulfillment = logs[logIndex]?.request?.message?.order?.fulfillments?.find((f) => f?.type === "DELIVERY" || f?.type === "SELF_PICKUP");
        const cancellationCharges = message?.order?.cancellation_terms?.find((term) => term?.fulfillment_state?.descriptor?.code === fulfillment?.state?.descriptor?.code);

        let cancellationCharge = 0;
        if (cancellationCharges) {
            if (cancellationCharges?.cancellation_fee?.percentage) {
                cancellationCharge = Number(message?.order?.quote?.price?.value) * (Number(cancellationCharges?.cancellation_fee?.percentage) / 100);
            } else {
                cancellationCharge = Number(cancellationCharges?.cancellation_fee?.amount?.value);
            }
        }

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

                switch (ele?.title) {
                    case "REFUND":
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should be a negative value`, function () {
                            expect(Number(breakupItem.price.value)).to.be.lessThan(0);
                        }));
                        break;
                    default:
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should be a positive value`, function () {
                            expect(Number(breakupItem.price.value)).to.be.at.least(0);
                        }));
                        break;
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string`, function () {
                    expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));

                switch (breakupItem?.title) {
                    case "CANCELLATION_CHARGES":
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' (${breakupItem?.title}) should be valid and should be from 'message.order.cancellation_terms'`, function () {
                            expect(cancellationCharges).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' (${breakupItem?.title}) should be one of ["${cancellationCharge.toFixed(2)}", "${Math.floor(cancellationCharge)}", "${Math.ceil(cancellationCharge)}"]`, function () {
                            expect(breakupItem.price.value).to.be.oneOf([cancellationCharge.toFixed(2), (Math.floor(cancellationCharge)).toString(), (Math.ceil(cancellationCharge)).toString()]);
                        }));
                        break;
                    default:
                        break;
                }
            }
        })

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.ttl' which is a string (OPTIONAL)", function () {
            expect(message.order.quote.ttl).to.exist.and.to.be.a("string");
        }));


        if (step === "I") {
            messageTestSuite.addTest(new Mocha.Test("'message.order.status' should be a valid string and equal to 'SOFT_CANCEL'", function () {
                expect(message.order.status).to.be.a('string').and.to.be.oneOf(["SOFT_CANCEL"]);
            }));
        } else {
            messageTestSuite.addTest(new Mocha.Test("'message.order.status' should be a valid string and equal to 'CANCELLED'", function () {
                expect(message.order.status).to.be.a('string').and.to.be.oneOf(["CANCELLED"]);
            }));
        }

        let OPTIONAL = "";
        // // if it is not soft cancel check for cancellation object and other tests
        // if (step === "I") {
        //     OPTIONAL = " (OPTIONAL)"
        // }

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation' which is an object${OPTIONAL}`, function () {
            expect(message.order.cancellation).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation' should have a property named 'cancelled_by' which is a string${OPTIONAL}`, function () {
            expect(message.order.cancellation).to.have.property('cancelled_by').that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation' should have a property named 'reason' which is an object${OPTIONAL}`, function () {
            expect(message.order.cancellation).to.have.property('reason').that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.reason' should have a property named 'descriptor' which is an object${OPTIONAL}`, function () {
            expect(message.order.cancellation.reason).to.have.property('descriptor').that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.reason.descriptor' should have a property named 'code' which is a string${OPTIONAL}`, function () {
            expect(message.order.cancellation.reason.descriptor).to.have.property('code').that.is.a("string");
        }));

        switch (type) {
            case "on_cancel_merchant":
                messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.reason.descriptor.code' should be oneOf ["011", "012", "013", "014"]${OPTIONAL}`, function () {
                    expect(message.order.cancellation.reason.descriptor.code).to.be.oneOf(["011", "012", "013", "014"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.cancelled_by' should be equal to PROVIDER${OPTIONAL}`, function () {
                    expect(message.order.cancellation.cancelled_by).to.equal("PROVIDER");
                }));
                break;
            case "on_cancel_driver_not_found":
                messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.reason.descriptor.code' should be equal to '011'${OPTIONAL}`, function () {
                    expect(message.order.cancellation.reason.descriptor.code).to.equal("011");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.cancelled_by' should be equal to PROVIDER${OPTIONAL}`, function () {
                    expect(message.order.cancellation.cancelled_by).to.equal("PROVIDER");
                }));
                break;
            case "on_cancel_technical":
                messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.reason.descriptor.code' should be equal to '000'${OPTIONAL}`, function () {
                    expect(message.order.cancellation.reason.descriptor.code).to.equal("000");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.cancelled_by' should be equal to PROVIDER${OPTIONAL}`, function () {
                    expect(message.order.cancellation.cancelled_by).to.equal("CONSUMER");
                }));
                break;
            default:
                messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.reason.descriptor.code' should be a valid reason id${OPTIONAL}`, function () {
                    expect(message.order.cancellation.reason.descriptor.code).to.be.oneOf(cancellationReasonIds);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.cancelled_by' should be equal to CONSUMER${OPTIONAL}`, function () {
                    expect(message.order.cancellation.cancelled_by).to.equal("CONSUMER");
                }));
                break;
        }

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string", function () {
            expect(message.order.created_at).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string", function () {
            expect(message.order.updated_at).to.exist.and.to.be.a("string");
        }));

        let indexOfThisLog = logs?.findIndex((log) => log?.request?.context?.message_id === context?.message_id);
        while (indexOfThisLog > 0) {
            const lastRequest = logs[indexOfThisLog - 1];
            const lastRequestAction = lastRequest?.context?.action;
            if (lastRequestAction === "on_confirm" || lastRequestAction === "on_status" || lastRequestAction === "on_update") {
                break;
            }
            indexOfThisLog--;
        }

        if (indexOfThisLog - 1 >= 0) {
            const lastRequest = logs[indexOfThisLog - 1];

            const lastCreatedAt = lastRequest?.request?.message?.order?.created_at;
            const lastUpdatedAt = lastRequest?.request?.message?.order?.updated_at;

            messageTestSuite.addTest(new Mocha.Test("'message.order.created_at' should be equal to the 'message.order.created_at' of the last request", function () {
                expect(message.order.created_at).to.equal(lastCreatedAt);
            }));

            const timeDifference = new Date(message?.order?.updated_at) - new Date(lastUpdatedAt);
            messageTestSuite.addTest(new Mocha.Test("'message.order.updated_at' should be greater than the 'message.order.updated_at' of the last request", function () {
                expect(timeDifference).to.be.greaterThan(0);
            }));
        }

        return testSuite;
    } catch (error) {
        testSuite.addTest(new Mocha.Test("on_cancel request failed to be verified because of some missing payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return testSuite;
    }
}
module.exports = {
    on_cancel
}