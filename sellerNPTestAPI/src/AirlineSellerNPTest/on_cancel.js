const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
async function on_cancel({ context, message } = {}, constants = {}) {
    const cancel_type = constants.step === "cancel_soft" ? "SOFT_CANCEL" : (constants.step === "cancel_merchant" ? "MERCHANT" : "CONFIRM_CANCEL");

    const testSuite = new Mocha.Suite(`on_cancel (${cancel_type}) Request Verification`);
    try {
        contextTests(context, "on_cancel", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.id' which is a object", function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }));

        //message.order.provider
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider' which is an object", function () {
            expect(message.order.provider).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.provider.id' which is a string`, function () {
            expect(message.order.provider.id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.provider' should have a property named 'descriptor' which is an object`, function () {
            expect(message.order.provider.descriptor).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor' should have a property named 'name' which is a string`, function () {
            expect(message.order.provider.descriptor.name).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images' should be an array`, function () {
            expect(message.order.provider.descriptor.images).to.be.an('array');
        }));

        if (message?.order?.provider?.descriptor?.images && message?.order?.provider?.descriptor?.images.length > 0) {
            message.order.provider.descriptor.images.forEach((image, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}]' should be an object`, function () {
                    expect(image).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].url ' should be a string `, function () {
                    expect(image.url).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].size_type' should be a string `, function () {
                    expect(image.size_type).to.be.a('string');
                }));

            })
        }
        messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags' should be an array `, function () {
            expect(message.order.provider.tags).to.be.an('array');
        }));
        if (message?.order?.provider?.tags) {

            const arr = [{ code: "FARE_TYPE" }];
            arr.forEach((ele) => {
                const tagIndex = message?.order?.provider?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                const tagItem = message?.order?.provider?.tags[tagIndex];
                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags' should have an object of ${ele.code}`, function () {
                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                }));


                if (tagIndex !== -1) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}]' should have properties named 'descriptor',display and 'list'`, function () {
                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                        expect(tagItem).to.have.property("display").that.is.a("boolean");
                        expect(tagItem).to.have.property("list").that.is.an("array");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                        expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].display' should have be a boolean`, function () {
                        expect(tagItem.display).to.be.a("boolean");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list' should have be a non empty array`, function () {
                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    }));

                    let fareTypeArr = [{ code: "REGULAR" }, { code: "STUDENT" }, { code: "SENIOR_CITIZEN" }, { code: "ARMED_FORCES" }, { code: "DOCTORS_NURSES" }];
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
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listItemIndex}]' should be an object`, function () {
                                    expect(listItem).to.be.an("object")
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listItemIndex}].descriptor' should be an object`, function () {
                                    expect(listItem.descriptor).to.be.an("object")
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                    expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                    expect(listItem.descriptor.code).to.be.equal(it.code);
                                }));

                            }
                        });
                    }
                }
            });
        }
        //message.order.items[]
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items' which is an array`, function () {
            expect(message.order.items).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.items && message.order.items.length > 0) {
            message?.order.items.forEach((item, i) => {
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


                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price' should be an object`, function () {
                    expect(item.price).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.currency' should be a string`, function () {
                    expect(item.price.currency).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.value' should be a string`, function () {
                    expect(item.price.value).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity' which is an object`, function () {
                    expect(item.quantity).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected' which is an object`, function () {
                    expect(item.quantity.selected).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected.count' which is a number `, function () {
                    expect(item.quantity.selected.count).to.exist.and.to.be.a("number");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids' should be an array, that should not be empty (OPTIONAL)`, function () {
                    expect(item.category_ids).to.be.an('array').that.is.not.empty;
                }));

                if (item?.category_ids && item?.category_ids.length > 0) {
                    item.category_ids.forEach((categoryID, categoryIdIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIdIndex}]' should be string`, function () {
                            expect(categoryID).to.be.a("string");
                        }));

                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty `, function () {
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
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.label.duration' should be a string`, function () {
                    expect(item.time.duration).to.be.a('string');
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

                if (item?.add_ons) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons' should be an array`, function () {
                        expect(item.add_ons).to.be.an('array');
                    }));

                    if (item?.add_ons && item?.add_ons.length > 0) {
                        item.add_ons.forEach((add_ons, add_onsIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}]' should be an object`, function () {
                                expect(add_ons).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].id' should be a string (OPTIONAL) `, function () {
                                expect(add_ons.id).to.be.a("string");
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

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity' should be an object`, function () {
                                expect(add_ons.quantity).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected' should be an object`, function () {
                                expect(add_ons.quantity.selected).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].quantity.selected.count' should be a number (OPTIONAL)`, function () {
                                expect(add_ons.quantity.selected.count).to.be.a("number");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price' should be an object`, function () {
                                expect(add_ons.price).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.value' should be a number (OPTIONAL)`, function () {
                                expect(add_ons.price.value).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].add_ons[${add_onsIndex}].price.currency' should be a string (OPTIONAL)`, function () {
                                expect(add_ons.price.currency).to.be.a("string");
                            }));

                        })
                    }
                }
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should be an array`, function () {
                    expect(item.tags).to.be.an('array');
                }));
                if (item?.tags) {
                    const arr = [{ code: "GENERAL_INFO" }];
                    arr.forEach((ele) => {
                        const tags = item?.tags ?? [];
                        const tagIndex = tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));


                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should have properties named 'descriptor',display and 'list'`, function () {
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

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].display' should have be a boolean`, function () {
                                expect(tagItem.display).to.be.a("boolean");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));


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

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}' (OPTIONAL)`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));


                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should be an object`, function () {
                                            expect(listItem).to.be.an("object")
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should be an object`, function () {
                                            expect(listItem.descriptor).to.be.an("object")
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'(OPTIONAL)`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        if (listItem?.descriptor?.name && listItem?.descriptor?.short_desc) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'short_desc' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("short_desc").that.is.a("string");
                                            }));

                                        }
                                        if (listItem?.value) {

                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
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

        //message.order.fulfillments
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments' which is an array`, function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                    expect(fulfillment).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                    expect(fulfillment.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                    expect(fulfillment.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["TICKET", "TRIP", "CONNECT"]);
                }));

                if (fulfillment?.type === "TRIP") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                        expect(fulfillment.stops).to.exist.and.to.be.an("array");
                    }));

                    if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                        fulfillment.stops.forEach((stopItem, stopIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                                expect(stopItem).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string`, function () {
                                expect(stopItem.id).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                                expect(stopItem.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["START", "LAYOVER", "END", "INTERMEDIATE_STOP", "TRANSIT_STOP"]);

                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location' which is an object`, function () {
                                expect(stopItem.location).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor' which is an object`, function () {
                                expect(stopItem.location.descriptor).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.name' which is a string`, function () {
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
                if (fulfillment?.type === "TRIP") {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${fulfillmentIndex}].customer' should be an object`, function () {
                        expect(fulfillment.customer).to.be.an("object").that.includes.all.keys("contact");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${fulfillmentIndex}].customer.person' should be an object (OPTIONAL)`, function () {
                        expect(fulfillment.customer.person).to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${fulfillmentIndex}].customer.person.age' should be a string (OPTIONAL)`, function () {
                        expect(fulfillment.customer.person.age).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${fulfillmentIndex}].customer.person.gender' should be a string (OPTIONAL)`, function () {
                        expect(fulfillment.customer.person.gender).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${fulfillmentIndex}].customer.person.name' should be a string (OPTIONAL)`, function () {
                        expect(fulfillment.customer.person.name).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${fulfillmentIndex}].customer.contact' should be an object (OPTIONAL)`, function () {
                        expect(fulfillment.customer.contact).to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${fulfillmentIndex}].customer.contact.email' should be a string (OPTIONAL)`, function () {
                        expect(fulfillment.customer.contact.email).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${fulfillmentIndex}].customer.contact.phone' should be a string (OPTIONAL)`, function () {
                        expect(fulfillment.customer.contact.phone).to.be.a("string");
                    }));
                }

                //message.catalog.provider.fulfillments.tags
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags' which is an array `, function () {
                    expect(fulfillment.tags).to.exist.and.to.be.an("array");
                }));


                if (fulfillment?.type === "TRIP") {
                    if (fulfillment?.tags) {
                        const arr = [{ code: "INFO" }];
                        arr.forEach((ele) => {
                            const tagIndex = (fulfillment?.tags || [])?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should exist (${ele.code})`, function () {
                                expect(tagIndex).not.to.equal(-1);
                            }));

                            if (tagIndex && tagIndex !== -1) {
                                const tagItem = fulfillment?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
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

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags' which is an array `, function () {
                    expect(fulfillment.tags).to.exist.and.to.be.an("array");
                }));

                if (fulfillment?.type === "TICKET") {
                    if (fulfillment?.tags) {
                        const arr = [
                            { code: "SEAT_GRID" }];
                        arr.forEach((ele) => {
                            const tagIndex = (fulfillment?.tags || []).findIndex((tag) => tag?.descriptor?.code === ele.code);
                            const tagItem = fulfillment?.tags[tagIndex];
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code} (OPTIONAL)`, function () {
                                expect(tagItem).to.exist.and.to.be.an("object");
                            }));

                            if (tagIndex !== -1) {
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

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should be an object", function () {
            expect(message.order.quote).to.be.an('object');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price' should be an object", function () {
            expect(message.order.quote.price).to.be.an('object');
        }));

        const cancellationCharges = message?.order?.quote?.breakup.find((cancellation_charges) => cancellation_charges?.title === "CANCELLATION_CHARGES")?.price?.value;

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be a string", function () {
            expect(message.order.quote.price.value).to.be.a('string').and.to.be.equal(cancellationCharges);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.currency' should be a string", function () {
            expect(message.order.quote.price.currency).to.be.a('string');
        }));

        const arr = [
            { title: "BASE_FARE" },
            { title: "TAX" },
            { title: "CONVENIENCE_FEE" },
            { title: "ADD_ONS" },
            { title: "SEAT_FARE" },
            { title: "REFUND" },
            { title: "OTHER_CHARGES" },
            { title: "CANCELLATION_CHARGES" },
        ];

        arr.forEach((ele) => {
            const breakupIndex = message?.order?.quote?.breakup.findIndex((breakup) => breakup?.title === ele.title);
            const breakupItem = message?.order?.quote?.breakup[breakupIndex];
            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup' should have an object of ${ele.title}`, function () {
                expect(breakupItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
            }));

            if (breakupIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should be an object`, function () {
                    expect(breakupItem).to.be.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));

                if (breakupItem?.title !== "OTHER_CHARGES") {

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                        expect(breakupItem).to.have.property("price").that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string`, function () {
                        expect(breakupItem.price).to.have.property("value").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string`, function () {
                        expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                    }));

                }


                if (breakupItem?.item) {
                    messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}] should have an 'item' property`, function () {
                        expect(breakupItem).to.have.property("item");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item should be an object`, function () {
                        expect(breakupItem.item).to.be.an("object");
                    }));

                    if (breakupItem?.item?.quanity) {
                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.quantity should be an object`, function () {
                            expect(breakupItem.item.quantity).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.quantity.selected should be an object`, function () {
                            expect(breakupItem.item.quantity.selected).to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.quantity.selected.count should be an string`, function () {
                            expect(breakupItem.item.quantity.selected.count).to.be.an("string");
                        }));
                    }



                    if (breakupItem?.item?.id) {
                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item should have an 'id' property`, function () {
                            expect(breakupItem.item).to.have.property("id");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.id should be a string (OPTIONAL)`, function () {
                            expect(breakupItem.item.id).to.be.a("string");
                        }));

                    }
                    if (breakupItem?.item?.tags) {

                        const taxArr = [{ code: "TAX" }];
                        const otherChargesArr = [{ code: "OTHER_CHARGES" }];

                        let arr;

                        switch (breakupItem?.title) {
                            case "TAX":
                                arr = taxArr;
                                break;
                            case "OTHER_CHARGES":
                                arr = otherChargesArr;
                                break;
                            default:
                                break;
                        }
                        arr.forEach((ele) => {
                            const tagIndex = breakupItem?.item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                            const tagItem = breakupItem?.item?.tags[tagIndex];
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}]' should have an object of ${ele.code}`, function () {
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
            }
        })


        //message.order.payments
        messageTestSuite.addTest(new Mocha.Test("'message.order.payments' should be an array", function () {
            expect(message.order.payments).to.be.an('array');
        }));

        if (message?.order?.payments && message?.order?.payments.length > 0) {
            message.order.payments.forEach((payment, z) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}]' should be an object`, function () {
                    expect(payment).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].id' should be a string`, function () {
                    expect(payment.id).to.be.a('string');
                }));

                //collected_by
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].collected_by' should be a string`, function () {
                    expect(payment.collected_by).to.be.a('string').and.to.be.oneOf(["BPP", "BAP"]);
                }));

                //status
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].status' should be a string`, function () {
                    expect(payment.status).to.be.a('string').and.to.be.oneOf(["PAID", "NOT-PAID"]);
                }));


                //type
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].type' should be a string`, function () {
                    expect(payment.type).to.be.a('string').and.to.be.oneOf(["PRE-ORDER", "ON-FULFILLMENT", "POST-FULFILLMENT"]);
                }));

                //params
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params' should be an object`, function () {
                    expect(payment.params).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.transaction_id' should be a string`, function () {
                    expect(payment.params.transaction_id).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.currency' should be a string`, function () {
                    expect(payment.params.currency).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.amount' should be a string`, function () {
                    expect(payment.params.amount).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.bank_code' should be a string`, function () {
                    expect(payment.params.bank_code).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.bank_account_number' should be a string`, function () {
                    expect(payment.params.bank_account_number).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.virtual_payment_address' should be a string`, function () {
                    expect(payment.params.virtual_payment_address).to.be.a('string');
                }));




                //tags  
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags' should be an array`, function () {
                    expect(payment.tags).to.be.an('array');
                }));
                if (payment?.tags) {
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


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].display' should have be equal to false`, function () {
                                expect(tagItem.display).to.be.equal(false);
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have be a non empty array`, function () {
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
            })
        }

        messageTestSuite.addTest(new Mocha.Test("'message.order.status' should be a valid string", function () {
            expect(message.order.status).to.be.a('string').and.to.be.oneOf(["ACTIVE", "COMPLETED", "CANCELLED"]);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation' should be an object", function () {
            expect(message.order.cancellation).to.be.an('object');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation.cancelled_by' should be a string", function () {
            expect(message.order.cancellation.cancelled_by).to.be.an('string');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation.time' should be a string", function () {
            expect(message.order.cancellation.time).to.be.a('string');
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

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string", function () {
            expect(message.order.created_at).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string", function () {
            expect(message.order.updated_at).to.exist.and.to.be.a("string");
        }));

        return testSuite;
    }
    catch (error) {
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