const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { orderTagsTests, cancellationTermsTests, itemCommonTests, lastActionLog, quoteTests, providerTests } = require('./commonTests');
const { iso8601DurationRegex } = require('../utils/constants');
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_select({ context, message } = {}, type = "", logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_select Request Verification`);
        const responseTestSuite = response_verification({ context, message }, logs, constants);
        contextTests(context, "on_select", testSuite, logs);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));

        //message.order.items
        itemCommonTests(messageTestSuite, message, type, logs);

        // message.order.provider
        providerTests(messageTestSuite, message, type, logs);

        //message.order.fulfillments
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.fulfillments' which is an array", function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array");
        }));


        if (message?.order?.fulfillments && message?.order?.fulfillments?.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                    expect(fulfillment).to.exist.and.to.be.an("object");
                }));
                const onSelectlogs = lastActionLog(logs, "on_select")
                let fullfillmentId;
                onSelectlogs.message?.order?.fulfillments?.map((fulfillment) => {
                    fullfillmentId = fulfillment?.id
                })
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                    expect(fulfillment.id).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                    expect(fulfillment.type).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                    expect(fulfillment.stops).to.exist.and.to.be.an("array");
                }));
                if (fulfillment?.stops && fulfillment?.stops?.length > 0) {
                    fulfillment.stops.forEach((stopItem, stopIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                            expect(stopItem).to.exist.and.to.be.an("object");
                        }));

                        if (fulfillment?.type === "TRIP") {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                                expect(stopItem.type).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location' which is an object`, function () {
                                expect(stopItem.location).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor' which is an object`, function () {
                                expect(stopItem.location.descriptor).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.name' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.location.descriptor.name).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.code' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.location.descriptor.code).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.gps' which is a string and valid coordinates`, function () {
                                const gpsValue = stopItem.location.gps;

                                const gpsPattern = /^-?\d{1,3}\.\d{6}, ?-?\d{1,3}\.\d{6}$/;
                                expect(gpsValue).to.exist.and.to.be.a("string");
                                expect(gpsValue).to.match(gpsPattern, "GPS value must be valid coordinates in the format 'lat, long'");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string`, function () {
                                expect(stopItem.id).to.exist.and.to.be.a("string");

                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                                expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.category' which is a string`, function () {
                                expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string");
                            }));

                            if (stopIndex !== 0) {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].parent_stop_id' which is a string (OPTIONAL)`, function () {
                                    expect(stopItem.parent_stop_id).to.exist.and.to.be.a("string");
                                }));
                            }

                            if (stopIndex !== 0 && stopIndex !== fulfillment?.stops.length - 1) {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions' which is an object (OPTIONAL)`, function () {
                                    expect(stopItem.instructions).to.exist.and.to.be.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions.name' which is a string (OPTIONAL)`, function () {
                                    expect(stopItem.instructions.name).to.exist.and.to.be.a("string");
                                }));
                            }
                        }
                        if (fulfillment?.type === "TICKET") {
                            if (stopIndex === 0) {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization' which is an object`, function () {
                                    expect(stopItem.authorization).to.exist.and.to.be.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization.type' which is a string`, function () {
                                    expect(stopItem.authorization.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["OTP", "QR"]);
                                }));
                            }
                        }


                    })
                }


            })
        }

        //message.order.quote
        quoteTests(messageTestSuite, message);

        if (type === "METRO") {
            //message.order.tags
            orderTagsTests(messageTestSuite, message);
            //message.order.cancellation_terms
            cancellationTermsTests(messageTestSuite, message, type);
        }

        return [testSuite, responseTestSuite];
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    on_select
}
