const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_init({ context, message } = {}, settlementAmount, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite(`on_init Request Verification`);
    try {
        const responseTestSuite = response_verification({ context, message }, logs, constants);
        contextTests(context, "on_init", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));


        // message.order.provider

        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
            expect(message.order.provider).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'id' which is a string", function () {
            expect(message.order.provider.id).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'descriptor' which is an object", function () {
            expect(message.order.provider.descriptor).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'name' which is a string", function () {
            expect(message.order.provider.descriptor.name).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor.images' should be an array", function () {
            expect(message.order.provider.descriptor.images).to.be.an('array');
        }));

        if (message?.order?.provider?.descriptor?.images && message?.order?.provider?.descriptor?.images.length > 0) {
            message.order.provider.descriptor.images.forEach((image, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}]' should be an object`, function () {
                    expect(image).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].url' should be a string`, function () {
                    expect(image.url).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].size_type' should be a string`, function () {
                    expect(image.size_type).to.be.a('string');
                }));

            });
        }
        if (message?.order?.provider?.tags) {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags' should be an array `, function () {
                expect(message.order.provider.tags).to.be.an('array');
            }));

            const arr = [{ code: "FARE_TYPE", name: "Fare Type" }];
            arr.forEach((ele) => {
                const tagIndex = message?.order?.provider?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                const tagItem = message?.order?.provider?.tags[tagIndex];
                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags' should have an object of ${ele.code}`, function () {
                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                }));


                if (tagIndex !== -1) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}]' should have properties named 'descriptor', 'list', and 'display'`, function () {
                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                        expect(tagItem).to.have.property("list").that.is.an("array");
                        expect(tagItem).to.have.property("display").that.is.a("boolean");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string").and.to.be.equal(ele.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify the presense of 'message.order.provider.tags[${tagIndex}].descriptor.name' that should be string `, function () {
                        expect(tagItem.descriptor.name);
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].display' should be a boolean`, function () {
                        expect(tagItem.display).to.be.a("boolean");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list' should be a non-empty array`, function () {
                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    }));


                    const fareTypeArr = [
                        { code: "REGULAR" },
                        { code: "STUDENT" },
                        { code: "SENIOR_CITIZEN" },
                        { code: "ARMED_FORCES" },
                        { code: "DOCTORS_NURSES" }
                    ];

                    let array;
                    switch (tagItem?.descriptor?.code) {
                        case "FARE_TYPE":
                            array = fareTypeArr;
                            break;
                        default:
                            break;
                    }

                    if (array) {
                        array.forEach((it) => {
                            const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                            const listItem = tagItem?.list[listItemIndex];

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                expect(listItem).to.exist.and.to.be.an("object");
                            }));


                            if (listItemIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' which is a object`, function () {
                                    expect(listItem).to.have.property("descriptor").that.is.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string and equal to "${it.code}"`, function () {
                                    expect(listItem.descriptor).to.have.property("code").that.is.a("string").to.be.equal(it.code);
                                }));

                            }
                        });
                    }
                }
            });
        }


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

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.code' which is a string`, function () {
                    expect(item.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["ADULT_TICKET", "CHILD_TICKET", "INFANT_TICKET"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price' which is an object`, function () {
                    expect(item.price).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price.currency' which is a string`, function () {
                    expect(item.price.currency).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price.value' which is a string`, function () {
                    expect(item.price.value).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity' which is an object`, function () {
                    expect(item.quantity).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected' which is an object`, function () {
                    expect(item.quantity.selected).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected.count' which is a number`, function () {
                    expect(item.quantity.selected.count).to.exist.and.to.be.a("number");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids' should be an array, that should not be empty (OPTIONAL)`, function () {
                    expect(item.category_ids).to.be.an('array').that.is.not.empty;
                }));


                if (item?.category_ids && item?.category_ids.length > 0) {
                    item.category_ids.forEach((categoryId, categoryIdIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIdIndex}]' should be string`, function () {
                            expect(categoryId).to.be.a("string");
                        }));

                    })
                }
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                    expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                }));

                if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                    item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                        // Test to check if fulfillmentID is a string
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be a string`, function () {
                            expect(fulfillmentID).to.be.a("string");
                        }));

                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time' should be an object`, function () {
                    expect(item.time).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.label' should be a string`, function () {
                    expect(item.time.label).to.be.a('string');
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].time.duration' which is a valid ISO 8601 duration string(OPTIONAL)`, function () {
                    const durationValue = item?.time?.duration;

                    // ISO 8601 duration format (e.g., "PT2H" for 2 hours)
                    const iso8601DurationPattern = /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/;
                    expect(durationValue).to.exist.and.to.be.a("string");
                    expect(durationValue).to.match(iso8601DurationPattern, "Duration must be a valid ISO 8601 duration string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].refund_terms' should be an array`, function () {
                    expect(item.refund_terms).to.be.an('array');
                }));

                if (item?.refund_terms && item?.refund_terms.length > 0) {
                    item.refund_terms.forEach((refundTerm, refundTermIndex) => {
                        // Test to check if fulfillmentID is a string
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].refund_terms[${refundTermIndex}]' should be an object`, function () {
                            expect(refundTerm).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].refund_terms[${refundTermIndex}].refund_eligible' should be a boolean`, function () {
                            expect(refundTerm.refund_eligible).to.be.a("boolean");
                        }));

                    })
                }

                if (item?.parent_item_id) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].parent_item_id' which is a string`, function () {
                        expect(item.parent_item_id).to.exist.and.to.be.a("string");
                    }));
                }

                //Items Add_ons
                if (item?.add_ons) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons' should be an array`, function () {
                        expect(item.add_ons).to.be.an('array');
                    }));

                    if (item?.add_ons && item?.add_ons.length > 0) {
                        item.add_ons.forEach((add_ons, add_onsIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}]' should be an object`, function () {
                                expect(add_ons).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].id' should be a string `, function () {
                                expect(add_ons.id).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity' should be an object`, function () {
                                expect(add_ons.quantity).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected' should be an object`, function () {
                                expect(add_ons.quantity.selected).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected.count' should be a number (OPTIONAL)`, function () {
                                expect(add_ons.quantity.selected.count).to.be.a("number");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor' should be an object`, function () {
                                expect(add_ons.descriptor).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.name' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.descriptor.name).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].descriptor.code' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.descriptor.code).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price' should be an object`, function () {
                                expect(add_ons.price).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.value' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.price.value).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.price.currency).to.be.a("string");
                            }));

                        })
                    }
                }


                //Items Tags
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should be an array`, function () {
                    expect(item.tags).to.be.an('array');
                }));
                if (item?.tags) {
                    const arr = [{ code: "GENERAL_INFO", name: "General Info" }];
                    arr.forEach((ele) => {
                        const tags = item?.tags ?? [];
                        const tagIndex = tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));


                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should have properties named 'descriptor', 'list' and 'display'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                                expect(tagItem).to.have.property("display").that.is.a("boolean");

                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.name' should be a string`, function () {
                                expect(tagItem.descriptor.name).to.be.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].display' should  be a boolean`, function () {
                                expect(tagItem.display).to.be.a("boolean");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));


                            let generalInformationArr = [{ code: "CABIN_BAGGAGE" }, { code: "CHECK_IN_BAGGAGE" }, { code: "PROHIBITED_ITEMS" }]


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

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'(OPTIONAL)`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));


                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are object and string`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be a stirng`, function () {
                                            expect(listItem.descriptor.name).to.be.a("string");
                                        }));

                                        if (listItem?.descriptor?.short_desc) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.short_desc' should be a string`, function () {
                                                expect(listItem.descriptor.short_desc).to.be.a("string");
                                            }));

                                        }

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
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
        //fulfillments

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.fulfillments' which is an array", function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments?.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                    expect(fulfillment).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string `, function () {
                    expect(fulfillment.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string `, function () {
                    expect(fulfillment.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["TICKET", "TRIP", "CONNECT"]);
                }));

                if (fulfillment?.stops) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                        expect(fulfillment.stops).to.exist.and.to.be.an("array");
                    }));

                    if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                        fulfillment.stops.forEach((stopItem, stopIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                                expect(stopItem).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string `, function () {
                                expect(stopItem.id).to.exist.and.to.be.a("string")
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string `, function () {
                                expect(stopItem.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["START", "LAYOVER", "END", "INTERMEDIATE_STOP", "TRANSIT_STOP"]);
                            }));

                            if (stopItem?.instructions) {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions' which is an object`, function () {
                                    expect(stopItem.instructions).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions.name' which is a string `, function () {
                                    expect(stopItem.instructions.name).to.exist.and.to.be.a("string");
                                }));

                            }
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location' which is an object`, function () {
                                expect(stopItem.location).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor' which is an object`, function () {
                                expect(stopItem.location.descriptor).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.name' which is a string `, function () {
                                expect(stopItem.location.descriptor.name).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.code' which is a string `, function () {
                                expect(stopItem.location.descriptor.code).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
                                expect(stopItem.time).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.label' which is a string`, function () {
                                expect(stopItem.time.label).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.timestamp' which is a string`, function () {
                                expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
                            }));

                        })

                    }

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                        expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.category' which is a string `, function () {
                        expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.equal("AIRLINE");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.code' which is a string `, function () {
                        expect(fulfillment.vehicle.code).to.exist.and.to.be.a("string");
                    }));

                }

                if (fulfillment?.customer) {

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer' which is an object`, function () {
                        expect(fulfillment.customer).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person' which is an object`, function () {
                        expect(fulfillment.customer.person).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.name' which is a string`, function () {
                        expect(fulfillment.customer.person.name).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.age' which is a string`, function () {
                        expect(fulfillment.customer.person.age).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.gender' which is a string`, function () {
                        expect(fulfillment.customer.person.gender).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.contact' which is an object`, function () {
                        expect(fulfillment.customer.contact).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.contact.phone' which is a string`, function () {
                        expect(fulfillment.customer.contact.phone).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.contact.email' which is a string`, function () {
                        expect(fulfillment.customer.contact.email).to.exist.and.to.be.a("string");
                    }));
                }


                if (fulfillment?.type === "TRIP") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags' which is an array`, function () {
                        expect(fulfillment.tags).to.exist.and.to.be.an("array");
                    }));
                    if (fulfillment?.tags) {
                        const arr = [{ code: "INFO" }];
                        arr.forEach((ele) => {
                            const tagIndex = (fulfillment?.tags || [])?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should exist (${ele.code})(OPTIONAL)`, function () {
                                expect(tagIndex).not.to.equal(-1);
                            }));

                            if (tagIndex && tagIndex !== -1) {
                                const tagItem = fulfillment?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'descriptor' and 'list'`, function () {
                                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                }));

                                if (tagItem?.descriptor?.name) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                                        expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                                    }));

                                }
                                if (tagItem?.display) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].display' should  be a boolean`, function () {
                                        expect(tagItem.display).to.be.a("boolean");
                                    }));

                                }
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));

                                const infoArr = [{ code: "OPERATED_BY" }];

                                let array;
                                switch (tagItem?.descriptor?.code) {
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


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));

                                        }
                                    });
                                }
                            }
                        });
                    }
                }


                if (fulfillment?.type === "TICKET") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags' which is an array`, function () {
                        expect(fulfillment.tags).to.exist.and.to.be.an("array");
                    }));
                    if (fulfillment?.tags) {
                        const arr = [{ code: "SEAT_GRID" }];
                        arr.forEach((ele) => {
                            const tagIndex = (fulfillment?.tags || []).findIndex((tag) => tag?.descriptor?.code === ele.code);
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should exist (${ele.code})(OPTIONAL)`, function () {
                                expect(tagIndex).not.to.equal(-1);
                            }));

                            if (tagIndex && tagIndex !== -1) {
                                const tagItem = fulfillment?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                }));

                                if (tagItem?.display) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].display' should  be a boolean`, function () {
                                        expect(tagItem.display).to.be.a("boolean");
                                    }));

                                }

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));



                                const seatGridArr = [{ code: "X" }, { code: "Y" }, { code: "Z" }, { code: "SEAT_NUMBER" }, { code: "SELECTED_SEAT" }, { code: "SEAT_PRICE" },];


                                let array;
                                switch (tagItem?.descriptor?.code) {

                                    case "SEAT_GRID":
                                        array = seatGridArr;
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


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));

                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            })
        }

        //message.order.quote
        {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote' which is an object", function () {
                expect(message.order.quote).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price' which is an object", function () {
                expect(message.order.quote.price).to.exist.and.to.be.an("object");
            }));


            // Calculate the total breakup price
            const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
                const priceValue = parseFloat(item?.price?.value);
                return total + (isNaN(priceValue) ? 0 : priceValue);
            }, 0);

            // Create a new test for the messageTestSuite
            messageTestSuite.addTest(new Mocha.Test(`message.order.quote.price.value' should be equal to the sum of 'breakup' prices (${totalBreakupPrice})`, function () {
                // Convert the actual price value to a fixed decimal format
                const actualPriceValue = parseFloat(message.order.quote.price.value).toFixed(2);

                // Assert that the actual price value is one of the expected values
                expect(actualPriceValue).to.be.oneOf([
                    totalBreakupPrice.toFixed(2),
                    Math.floor(totalBreakupPrice).toFixed(2),
                    Math.ceil(totalBreakupPrice).toFixed(2)
                ]);
            }));


            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price.value' which is a string ", function () {
                expect(message.order.quote.price.value).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price.currency' which is a string ", function () {
                expect(message.order.quote.price.currency).to.exist.and.to.be.a("string");
            }));


            const arr = [
                { title: "BASE_FARE" },
                { title: "TAX" },
                { title: "CONVENIENCE_FEE" },
                { title: "SEAT_FARE" },
                { title: "ADD_ONS" }
            ];

            arr.forEach((ele) => {
                const breakupIndex = message?.order?.quote?.breakup.findIndex((breakup) => breakup?.title === ele.title);
                const breakupItem = message?.order?.quote?.breakup[breakupIndex];
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup' should have an object of ${ele.title}(OPTIONAL)`, function () {
                    expect(breakupItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                }));

                if (breakupIndex !== -1) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should be an object`, function () {
                        expect(breakupItem).to.be.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                        expect(breakupItem.title).to.be.equal(ele.title);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                        expect(breakupItem).to.have.property("price").that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string`, function () {
                        expect(breakupItem.price).to.have.property("value").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string`, function () {
                        expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                    }));

                    if (breakupItem?.item) {
                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}] should have an 'item' property`, function () {
                            expect(breakupItem).to.have.property("item");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item should be an object`, function () {
                            expect(breakupItem.item).to.be.an("object");
                        }));

                        if (breakupItem?.item?.id) {
                            messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item should have an 'id' property`, function () {
                                expect(breakupItem.item).to.have.property("id");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.id should be a string (OPTIONAL)`, function () {
                                expect(breakupItem.item.id).to.be.a("string");
                            }));

                        }
                        if (breakupItem?.item?.tags) {
                            const arr = [{ code: "TAX" }];
                            arr.forEach((ele) => {
                                const tagIndex = breakupItem?.item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                const tagItem = breakupItem?.item?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}]' should have an object of ${ele.code}(OPTIONAL)`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                }));


                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}]' should have properties named 'descriptor' and 'list'`, function () {
                                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                        expect(tagItem).to.have.property("list").that.is.an("array");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    let taxArr = [{ name: "cgst" }, { name: "sgst" }, { name: "fuel tax" }, { name: "cess" }];
                                    let array;
                                    switch (tagItem?.descriptor?.code) {
                                        case "TAX":
                                            array = taxArr;
                                            break;
                                        default:
                                            break;
                                    }

                                    if (array) {
                                        array.forEach((it) => {
                                            const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.name === it.name);
                                            const listItem = tagItem?.list[listItemIndex];

                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list' should have an object '${it.name}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));


                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list[${listItemIndex}]' should be an object`, function () {
                                                    expect(listItem).to.be.an("object")
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list[${listItemIndex}].descriptor' should be an object`, function () {
                                                    expect(listItem.descriptor).to.be.an("object")
                                                }));


                                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                                    expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                                }));


                                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be equal to '${it.name}'`, function () {
                                                    expect(listItem.descriptor.name).to.be.equal(it.name);
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list[${listItemIndex}].value' should be a string`, function () {
                                                    expect(listItem.value).to.be.a("string");
                                                }));

                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                    messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].price should be an object`, function () {
                        expect(breakupItem.price).to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].price.currency should be a string `, function () {
                        expect(breakupItem.price.currency).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].price.value should be a string `, function () {
                        expect(breakupItem.price.value).to.be.a("string");
                    }));

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

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].status' which is a string`, function () {
                    expect(payment.status).to.exist.and.to.be.a("string").and.to.be.oneOf(["PAID", "NOT-PAID"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].type' which is a string`, function () {
                    expect(payment.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["PRE-ORDER", "ON-FULFILLMENT", "POST-FULFILLMENT"]);
                }));

                const logs = [];

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params' which is an object`, function () {
                    expect(payment.params).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.amount' which is a string`, function () {
                    expect(payment.params.amount).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.currency' which is a string`, function () {
                    expect(payment.params.currency).to.exist.and.to.be.a("string");
                }));


                // Adding a test case to check that payments.params.price matches quote.price.value
                // const selectlog = logs.filter((ls) => ls.action === "on_select" )
                // console.log("sssssssssssss",selectlog);
                // const payments = onSelectResponse.message.order.payments;
                // const quotePrice = parseFloat(onSelectResponse.message.order.quote.price.value).toFixed(2);
                // console.log("quotePrice:", quotePrice);  // Logging the quotePrice to verify it's fetched correctly

                // payments.forEach((payment, index) => {
                //     messageTestSuite.addTest(new Mocha.Test(`Verify 'message.order.payments[${index}].params.price' matches 'quote.price.value'`, function () {
                //         const paymentPrice = parseFloat(payment.params.price).toFixed(2);
                //         expect(paymentPrice).to.equal(quotePrice);
                //     }));

                // });



                // Iterate through each onSelectLog in the logs
                logs.filter((log) => log.action === "on_select").forEach((onSelectLog, selectIndex) => {
                    // Extract necessary data from the log
                    const onSelectResponse = onSelectLog.response;
                    const payments = onSelectResponse.message.order.payments;
                    const quotePrice = parseFloat(onSelectResponse.message.order.quote.price.value).toFixed(2);

                    // Iterate over payments and add Mocha test cases
                    payments.forEach((payment, paymentIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify 'message.order.payments[${paymentIndex}].params.price' matches 'quote.price.value' for on_select ${selectIndex + 1}`, function () {
                            const paymentPrice = parseFloat(payment.params.price).toFixed(2);
                            expect(paymentPrice).to.equal(quotePrice);
                        }));

                    });
                });

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.bank_code' which is a string`, function () {
                    expect(payment.params.bank_code).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.bank_account_number' which is a string`, function () {
                    expect(payment.params.bank_account_number).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.virtual_payment_address' which is a string`, function () {
                    expect(payment.params.virtual_payment_address).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].tags' which is an array`, function () {
                    expect(payment.tags).to.exist.and.to.be.an("array");
                }));
                if (payment?.tags) {
                    const arr = [
                        { code: "BUYER_FINDER_FEES", name: "buyer finder fees" },
                        { code: "SETTLEMENT_TERMS", name: "settlement terms" }
                    ];

                    arr.forEach((ele) => {
                        const tagIndex = payment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = payment?.tags?.[tagIndex];

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object");
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


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor.code' should be equal to '${ele.code}'`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].display' should be a boolean`, function () {
                                expect(tagItem.display).to.be.a("boolean");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should be a non-empty array`, function () {
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
                                    const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor?.code === it.code);
                                    const listItem = tagItem?.list?.[listItemIndex];

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
                                    // switch (listItem?.descriptor?.code) {
                                    //     case "SETTLEMENT_AMOUNT":
                                    //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be equal to ${settlementAmount.toFixed(2)} (SETTLEMENT_AMOUNT)`, function () {
                                    //             expect(listItem.value).to.be.oneOf([settlementAmount.toFixed(2)]);
                                    //         }));

                                    //         break;
                                    //     default:
                                    //         break;
                                    // }
                                });
                            }
                        }
                    });
                }
            });
        }

        //cancellation terms

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation_terms' and that should be an array", function () {
            expect(message.order.cancellation_terms).to.exist.that.is.an("array");
        }));

        if (message?.order?.cancellation_terms && message?.order?.cancellation_terms.length > 0) {
            message.order.cancellation_terms.forEach((C_terms, C_termsIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}]' and that should be an object`, function () {
                    expect(C_terms).to.exist.that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancel_by' and that should be an object`, function () {
                    expect(C_terms.cancel_by).to.exist.that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancell_by.duration' and that should be a string`, function () {
                    expect(C_terms.cancel_by.duration).to.exist.that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee' and that should be an object`, function () {
                    expect(C_terms.cancellation_fee).to.exist.that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.percentage' and that should be a string`, function () {
                    expect(C_terms.cancellation_fee.percentage).to.exist.that.is.a("string");
                }));


            })
        }

        //message.order.billing
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing' which is an object", function () {
            expect(message.order.billing).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.name' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.name).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.tax_id' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.tax_id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.phone' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.phone).to.exist.and.to.be.a("string");
        }));

        return [testSuite, responseTestSuite];

    } catch (error) {
        testSuite.addTest(new Mocha.Test("on_init request failed to be verified because of some missing payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return testSuite;
    }
}
module.exports = {
    on_init
}



