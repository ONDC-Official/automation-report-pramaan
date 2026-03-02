const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { orderTagsTests, orderPaymentTags, cancellationTermsTests, itemCommonTests, quoteTests, billingTests, providerTests, lastActionLog } = require('./commonTests');
const { iso8601DurationRegex, isoTime } = require('../utils/constants');
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_confirm({ context, message } = {}, type = "", logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_confirm Request Verification`);
        const responseTestSuite = response_verification({ context, message }, logs, constants);
        contextTests(context, "on_confirm", testSuite, logs);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.id' which is a string", function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.status' which is a string", function () {
            expect(message.order.status).to.exist.and.to.be.a("string");
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
            message?.order?.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
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
                    fulfillment?.stops.forEach((stopItem, stopIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                            expect(stopItem).to.exist.and.to.be.an("object");
                        }));

                        if (fulfillment?.type === "TRIP") {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string (OPTIONAL)`, function () {
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

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.gps' which is a string and valid coordinates (OPTIONAL)`, function () {
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
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization.token' which is a string (OPTIONAL)`, function () {
                                    expect(stopItem.authorization.token).to.exist.and.to.be.a("string");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization.valid_to (OPTIONAL)' which is a string`, function () {
                                    expect(stopItem.authorization.valid_to).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization.status' which is a string (OPTIONAL)`, function () {
                                    expect(stopItem.authorization.status).to.exist.and.to.be.a("string").and.to.be.oneOf(["UNCLAIMED", "CLAIMED"]);
                                }));
                            }
                        }

                    })
                }



                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of ''message.order.fulfillments[${fulfillmentIndex}].tags' and that should be an array`, function () {
                    expect(fulfillment.tags).to.exist.that.is.an("array");
                }));

                if (fulfillment?.tags && fulfillment?.tags?.length > 0) {
                    fulfillment?.tags.forEach((tag, tagIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' and that should be an object`, function () {
                            expect(tag).to.exist.that.is.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' and that should be an object`, function () {
                            expect(tag.descriptor).to.exist.that.is.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' and that should be a string`, function () {
                            expect(tag.descriptor.code).to.exist.that.is.a("string");
                        }));

                        if (type === "METRO") {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].display' and that should be a boolean`, function () {
                                expect(tag.display).to.exist.that.is.a("boolean");
                            }));
                        }

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' and that should be an array`, function () {
                            expect(tag.list).to.exist.that.is.an("array");
                        }));

                        if (tag?.list && tag?.list?.length > 0) {
                            tag?.list.forEach((listItem, listItemIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}]' and that should be an object`, function () {
                                    expect(listItem).to.exist.that.is.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' and that should be an object`, function () {
                                    expect(listItem.descriptor).to.exist.that.is.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' and that should be a string`, function () {
                                    expect(listItem.descriptor.code).to.exist.that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' and that should be a string`, function () {
                                    expect(listItem.value).to.exist.that.is.a("string");
                                }));
                            })
                        }
                    })
                }
            })
        }
        //message.order.billing
        billingTests(messageTestSuite, message);

        //message.order.quote
        quoteTests(messageTestSuite, message);

        //message.order.payments
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payments' which is an array", function () {
            expect(message.order.payments).to.exist.and.to.be.an("array");
        }));
        if (message?.order?.payments && message?.order?.payments?.length > 0) {
            message.order.payments.forEach((payment, z) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}]' which is an object`, function () {
                    expect(payment).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].id' which is a string`, function () {
                    expect(payment.id).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].collected_by' which is a string`, function () {
                    expect(payment.collected_by).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].status' which is a string`, function () {
                    expect(payment.status).to.exist.and.to.be.a("string").that.is.equal('PAID');
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].type' which is a string`, function () {
                    expect(payment.type).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params' which is a object`, function () {
                    expect(payment.params).to.exist.and.to.be.a("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.transaction_id' which is a string`, function () {
                    expect(payment.params.transaction_id).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.currency' which is a string`, function () {
                    expect(payment.params.currency).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.amount' which is a string`, function () {
                    expect(payment.params.amount).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.bank_code' which is a string (OPTIONAL)`, function () {
                    expect(payment.params.bank_code).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.bank_account_number' which is a string (OPTIONAL)`, function () {
                    expect(payment.params.bank_account_number).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.virtual_payment_address' which is a string (OPTIONAL)`, function () {
                    expect(payment.params.virtual_payment_address).to.exist.and.to.be.a("string");
                }));

                orderPaymentTags(messageTestSuite, payment, z, logs);
            })
        }

        //message.order.cancellation_terms
        cancellationTermsTests(messageTestSuite, message, type);

        if (type === "METRO") {
            //message.order.tags
            orderTagsTests(messageTestSuite, message);
        }

        messageTestSuite.addTest(new Mocha.Test("'message.order.created_at' should exist, be a string, and follow ISO 8601 format", function () {
            expect(message.order).to.have.property("created_at").that.is.a("string");
            expect(message.order.created_at).to.match(isoTime);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.updated_at' should exist, be a string, and follow ISO 8601 format", function () {
            expect(message.order).to.have.property("updated_at").that.is.a("string");
            expect(message.order.updated_at).to.match(isoTime);
        }));

        return [testSuite, responseTestSuite];
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    on_confirm
}
