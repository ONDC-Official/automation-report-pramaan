const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { cancellationTermsTests, lastActionLog, itemCommonTests } = require('./commonTests');
const { isoTime } = require("../utils/constants");

async function on_cancel({ context, message } = {}, step, type = "", logs = []) {
    try {
        let stepName = "";
        switch (step) {
            case "on_cancel_one":
                stepName = "SOFT";
                break;
            case "on_cancel_two":
                stepName = "CONFIRM";
                break;
            case "on_cancel_merchant":
                stepName = "MERCHANT";
                break;
            case "on_cancel_technical":
                stepName = "CONFIRM";
                break;
            default:
                break;
        }


        const testSuite = new Mocha.Suite(`on_cancel (${stepName}) Request Verification`);
        contextTests(context, "on_cancel", testSuite, logs);
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

        //message.order.items
        itemCommonTests(messageTestSuite, message, type, logs);
        // message.order.provider

        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
            expect(message.order.provider).to.be.an("object");
        }))
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'id' which is a string", function () {
            expect(message.order.provider.id).to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'descriptor' which is an object", function () {
            expect(message.order.provider.descriptor).to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'name' which is a string", function () {
            expect(message.order.provider.descriptor.name).to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor.images' should be an array (OPTIONAL)", function () {
            expect(message.order.provider.descriptor.images).to.be.an('array');
        }));
        if (message?.order?.provider?.descriptor?.images && message?.order?.provider?.descriptor?.images.length > 0) {
            message.order.provider.descriptor.images.forEach((image, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}]' should be an object (OPTIONAL)`, function () {
                    expect(image).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].url' should be a string (OPTIONAL)`, function () {
                    expect(image.url).to.be.a('string');
                }));
            })

        }

        if (type === "METRO") {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.time' should be an object`, function () {
                expect(message.order.provider.time).to.be.an('object');
            }));
            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.time.range' should be an object`, function () {
                expect(message.order.provider.time.range).to.be.an('object');
            }));
            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.time.range.start' should be a string`, function () {
                expect(message.order.provider.time.range.start).to.be.a('string');
            }));
            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.time.range.end' should be a string`, function () {
                expect(message.order.provider.time.range.end).to.be.a('string');
            }));
        }


        //message.order.fulfillments
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.fulfillments' which is an array", function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array");
        }));
        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message?.order?.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                    expect(fulfillment).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                    expect(fulfillment.id).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                    expect(fulfillment.type).to.exist.and.to.be.a("string");
                }));
                if (fulfillment?.type === "TICKET") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the absence of 'message.order.fulfillments[${fulfillmentIndex}].stops'`, function () {
                        expect(fulfillment.stops).to.not.exist;
                    }));
                }
                else {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                        expect(fulfillment.stops).to.exist.and.to.be.an("array");
                    }));
                }
                if (fulfillment.stops && fulfillment.stops.length > 0 && fulfillment?.type === "TRIP") {
                    fulfillment.stops.forEach((stopItem, stopIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                            expect(stopItem).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string (OPTIONAL)`, function () {
                            expect(stopItem.type).to.exist.and.to.be.a("string");
                        }));
                        if (fulfillment?.type === "TRIP") {
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
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.id).to.exist.and.to.be.a("string");
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
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                                expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.category' which is a string (OPTIONAL)`, function () {
                                expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string");
                            }));
                        }

                    })

                }

                if (step === "I") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of ''message.order.fulfillments[${fulfillmentIndex}].tags' and that should be an array`, function () {
                        expect(fulfillment.tags).to.exist.that.is.an("array");
                    }));
                    if (fulfillment?.tags && fulfillment?.tags.length > 0) {
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

                            if (tag?.list && tag?.list.length > 0) {
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
                }
            })
        }

        //message.order.cancellation
        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation' should be an object`, function () {
            expect(message.order.cancellation).to.be.an('object');
        }));
        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.cancelled_by' should be a string`, function () {
            expect(message.order.cancellation.cancelled_by).to.be.a('string');
        }));

        let cancelledBy = "CONSUMER";
        switch (stepName) {
            case "MERCHANT":
                cancelledBy = "MERCHANT";
                break;
            default:
                break;
        }

        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.cancelled_by' should be equal to ${cancelledBy}`, function () {
            expect(message.order.cancellation.cancelled_by).to.equal(cancelledBy);
        }));
        if (step === "on_cancel_technical") {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.reason' should be an object`, function () {
                expect(message.order.cancellation.reason).to.be.an('object');
            }));
            messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.reason.descriptor' should be an object`, function () {
                expect(message.order.cancellation.reason.descriptor).to.be.an('object');
            }));
            messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.reason.descriptor.code' should be a string`, function () {
                expect(message.order.cancellation.reason.descriptor.code).to.be.a('string');
            }));
            messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.reason.descriptor.code' should equal '000'`, function () {
                expect(message.order.cancellation.reason.descriptor.code).to.equal('000');
            }));


        }
        else {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation.time' should be a string`, function () {
                expect(message.order.cancellation.time).to.be.a("string").and.matches(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
            }));
        }

        cancellationTermsTests(messageTestSuite, message, type);

        if (type === "METRO") {
            //message.order.tags
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.tags' and that should be an array", function () {
                expect(message.order.tags).to.exist.that.is.an("array");
            }));
            if (message?.order?.tags && message?.order?.tags?.length > 0) {
                message?.order?.tags.forEach((tag, tagIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}]' and that should be an object`, function () {
                        expect(tag).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].descriptor' and that should be an object`, function () {
                        expect(tag.descriptor).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].descriptor.code' and that should be a string`, function () {
                        expect(tag.descriptor.code).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].display' and that should be a boolean`, function () {
                        expect(tag.display).to.exist.that.is.a("boolean");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].list' and that should be an array`, function () {
                        expect(tag.list).to.exist.that.is.an("array");
                    }));
                    if (tag?.list && tag?.list.length > 0) {
                        tag?.list.forEach((listItem, listItemIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].list[${listItemIndex}]' and that should be an object`, function () {
                                expect(listItem).to.exist.that.is.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' and that should be an object`, function () {
                                expect(listItem.descriptor).to.exist.that.is.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' and that should be a string`, function () {
                                expect(listItem.descriptor.code).to.exist.that.is.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].list[${listItemIndex}].value' and that should be a string`, function () {
                                expect(listItem.value).to.exist.that.is.a("string");
                            }));
                        })
                    }
                })
            }
        }



        //message.order.billing
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing' which is an object", function () {
            expect(message.order.billing).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.name' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.name).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.email' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.email).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.phone' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.phone).to.exist.and.to.be.a("string");
        }));
        //message.order.quote
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote' which is an object", function () {
            expect(message.order.quote).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price' which is an object", function () {
            expect(message.order.quote.price).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price.value' which is a string (OPTIONAL)", function () {
            expect(message.order.quote.price.value).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price.currency' which is a string (OPTIONAL)", function () {
            expect(message.order.quote.price.currency).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.breakup' which is an array", function () {
            expect(message.order.quote.breakup).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.quote?.breakup && message?.order?.quote?.breakup.length > 0) {
            const arr = ["BASE_FARE", "REFUND", "CANCELLATION_CHARGES"];
            arr.forEach((it) => {
                const unit = message?.order?.quote?.breakup.find((ele) => ele?.title === it);

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of '${it}' in 'message.order.quote.breakup' which is an object`, function () {
                    expect(unit).to.exist.and.to.be.an("object");
                }));
            })

            message?.order?.quote?.breakup.forEach((breakup, breakupIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}]' which is an object`, function () {
                    expect(breakup).to.exist.and.to.be.an("object");
                }));

                switch (breakup?.title) {
                    case "BASE_FARE":
                    case "REFUND":
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].title' which is a string`, function () {
                            expect(breakup.title).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item' which is an object`, function () {
                            expect(breakup.item).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.id' which is a string (OPTIONAL)`, function () {
                            expect(breakup.item.id).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.price' which is an object`, function () {
                            expect(breakup.item.price).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.price.currency' which is a string (OPTIONAL)`, function () {
                            expect(breakup.item.price.currency).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.price.value' which is a string (OPTIONAL)`, function () {
                            expect(breakup.item.price.value).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.quantity' which is an object`, function () {
                            expect(breakup.item.quantity).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.quantity.selected' which is an object`, function () {
                            expect(breakup.item.quantity.selected).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.quantity.selected.count' which is a number (OPTIONAL)`, function () {
                            expect(breakup.item.quantity.selected.count).to.exist.and.to.be.a("number");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].price' which is an object`, function () {
                            expect(breakup.price).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].price.currency' which is a string (OPTIONAL)`, function () {
                            expect(breakup.price.currency).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].price.value' which is a string (OPTIONAL)`, function () {
                            expect(breakup.price.value).to.exist.and.to.be.a("string");
                        }));

                        break;
                    case "CANCELLATION_CHARGES":
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].title' which is a string`, function () {
                            expect(breakup.title).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].price' which is an object`, function () {
                            expect(breakup.price).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].price.currency' which is a string (OPTIONAL)`, function () {
                            expect(breakup.price.currency).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].price.value' which is a string (OPTIONAL)`, function () {
                            expect(breakup.price.value).to.exist.and.to.be.a("string");
                        }));

                        break;
                    default:
                        break;
                }
            })
        }
        //message.order.payments
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payments' which is an array", function () {
            expect(message.order.payments).to.exist.and.to.be.an("array");
        }));
        if (message?.order?.payments && message?.order?.payments.length > 0) {
            message?.order?.payments.forEach((payment, z) => {
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
                    expect(payment.status).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].type' which is a string`, function () {
                    expect(payment.type).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params' which is a object`, function () {
                    expect(payment.params).to.exist.and.to.be.a("object");
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
                        const buyerFinderFeeArr = [{ code: "BUYER_FINDER_FEES_PERCENTAGE", name: "buyer finder fees percentage" }];
                        const settlementTermsArr = [{ code: "SETTLEMENT_WINDOW", name: "settlement window" }, { code: "SETTLEMENT_BASIS", name: "settlement basis" }, { code: "MANDATORY_ARBITRATION", name: "mandatory arbitration" }, { code: "COURT_JURISDICTION", name: "court jurisdiction" }, { code: "STATIC_TERMS", name: "static terms" }, { code: "SETTLEMENT_AMOUNT", name: "settlement amount" }];

                        let array;
                        switch (tagItem?.descriptor?.code) {
                            case "BUYER_FINDER_FEES":
                                array = buyerFinderFeeArr;
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
                                }
                            });
                        }
                    }
                });
            })

        }
        //message.order.status
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.status' which is a string", function () {
            expect(message.order.status).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.created_at' should exist, be a string, and follow ISO 8601 format", function () {
            expect(message.order).to.have.property("created_at").that.is.a("string");
            expect(message.order.created_at).to.match(isoTime);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.updated_at' should exist, be a string, and follow ISO 8601 format", function () {
            expect(message.order).to.have.property("updated_at").that.is.a("string");
            expect(message.order.updated_at).to.match(isoTime);
        }));

        return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    on_cancel
}
