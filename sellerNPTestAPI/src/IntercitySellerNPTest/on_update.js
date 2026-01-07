const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
async function on_update({ context, message } = {}, logs = []) {
    try {

        const testSuite = new Mocha.Suite(`on_update Request Verification`);
        contextTests(context, "on_update", testSuite);
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

        messageTestSuite.addTest(new Mocha.Test("'message.order.status' should be a valid string", function () {
            expect(message.order.status).to.be.a('string').and.to.be.oneOf(["ACTIVE", "COMPLETED"]);
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

            })
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
                    expect(item.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["SJT", "SFSJT", "RJT", "PASS", "RIDE", "SEAT", "NON_STOP", "CONNECT"]);
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
            });
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
                    expect(fulfillment.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["TRIP", "TICKET", "DELIVERY"]);
                }));



                if (fulfillment?.type === "TICKET") {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${fulfillmentIndex}].customer' should be an object`, function () {
                        expect(fulfillment.customer).to.be.an("object").that.includes.all.keys("contact");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${fulfillmentIndex}].customer.person' should be an object`, function () {
                        expect(fulfillment.customer.person).to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${fulfillmentIndex}].customer.person.age' should be a string`, function () {
                        expect(fulfillment.customer.person.age).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${fulfillmentIndex}].customer.person.gender' should be a string`, function () {
                        expect(fulfillment.customer.person.gender).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${fulfillmentIndex}].customer.person.name' should be a string`, function () {
                        expect(fulfillment.customer.person.name).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${fulfillmentIndex}].customer.contact' should be an object`, function () {
                        expect(fulfillment.customer.contact).to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${fulfillmentIndex}].customer.contact.phone' should be a string`, function () {
                        expect(fulfillment.customer.contact.phone).to.be.a("string");
                    }));

                }
                if (fulfillment?.type === "TRIP") {

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                        expect(fulfillment.stops).to.exist.and.to.be.an("array");
                    }));

                    if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                        fulfillment.stops.forEach((stopItem, stopIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                                expect(stopItem).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.id).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                                expect(stopItem.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["START", "END", "INTERMEDIATE_STOP", "TRANSIT_STOP", "PICKUP", "DROP"]);

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

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.gps' which is a string `, function () {
                                expect(stopItem.location.gps).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
                                expect(stopItem.time).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.label' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.time.label).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.timestamp' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
                            }));

                            if (stopItem?.authorization) {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization' which is an object`, function () {
                                    expect(stopItem.authorization).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization.type' which is a string (OPTIONAL)`, function () {
                                    expect(stopItem.authorization.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["OTP", "QR"]);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization.token' which is a string (OPTIONAL)`, function () {
                                    expect(stopItem.authorization.token).to.exist.and.to.be.a("string");
                                }));

                            }

                        })

                    }

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                        expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.category' which is a string `, function () {
                        expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.oneOf(["AIRLINE", "BUS", "CAB", "AUTO_RIKSHAW", "METRO"]);
                    }));

                }


                //message.catalog.provider.fulfillments.tags
                if (fulfillment?.type === "TICKET") {
                    const arr = [
                        { code: "SEAT_GRID" }];
                    arr.forEach((ele) => {
                        const tagIndex = fulfillment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = fulfillment?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));


                        if (tagIndex !== -1) {
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



                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            const seatGridArr = [{ code: "X" }, { code: "Y" }, { code: "Z" }, { code: "X_SIZE" }, { code: "Y_SIZE" }, { code: "NUMBER" }, { code: "RESTRICTED_GENDER" }, { code: "SINGLE_SEAT" }, { code: "SEAT_PRICE" }, { code: "SELECTED" }, { code: "SELECTED_SEAT" }, { code: "ITEM_ID" }];
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
            })
        }
        //message.order.quote

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should be an object", function () {
            expect(message.order.quote).to.be.an('object');
        }));


        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price' should be an object", function () {
            expect(message.order.quote.price).to.be.an('object');
        }));


        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be a string (OPTIONAL)", function () {
            expect(message.order.quote.price.value).to.be.a('string');
        }));


        const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
            return total + parseFloat(item.price.value);
        }, 0);
        // Create a new test for the messageTestSuite
        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
            // Convert the actual price value to a fixed decimal format
            const actualPriceValue = parseFloat(message.order.quote.price.value).toFixed(2);

            // Assert that the actual price value is one of the expected values
            expect(actualPriceValue).to.be.oneOf([
                totalBreakupPrice.toFixed(2),
                Math.floor(totalBreakupPrice).toFixed(2),
                Math.ceil(totalBreakupPrice).toFixed(2)
            ]);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.currency' should be a string", function () {
            expect(message.order.quote.price.currency).to.be.a('string');
        }));

        const arr = [
            { title: "BASE_FARE" },
            { title: "TAX" },
            { title: "CONVENIENCE_FEE" },
            { title: "SEAT_FARE" }
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

                messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].price should be an object`, function () {
                    expect(breakupItem.price).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].price.currency should be a string `, function () {
                    expect(breakupItem.price.currency).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].price.value should be a string `, function () {
                    expect(breakupItem.price.value).to.be.a("string");
                }));

                if (breakupItem?.descriptor?.code === "TAX") {
                    messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}] should have an 'item' property`, function () {
                        expect(breakupItem).to.have.property("item");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item should be an object`, function () {
                        expect(breakupItem.item).to.be.an("object");
                    }));
                    const itemArr = [
                        { code: "TAX" }
                    ];

                    itemArr.forEach((ele) => {
                        const itemArrIndex = breakupItem?.item?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const itemArrItem = breakupItem?.item?.tags[itemArrIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}]' should have an object of ${ele.code}`, function () {
                            expect(itemArrItem).to.be.an("object").and.not.to.be.undefined;
                        }));
                        if (itemArrIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}]' should be an object`, function () {
                                expect(itemArrItem).to.be.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].descriptor' should be an object`, function () {
                                expect(itemArrItem.descriptor).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].descriptor.code' should be equal to '${ele.code}'`, function () {
                                expect(itemArrItem.descriptor.code).to.be.equal(ele.code).and.to.be.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list' should be a non-empty array`, function () {
                                expect(itemArrItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            const taxArr = [{ code: "CGST" }, { code: "SGST" }]

                            let array;
                            switch (itemArrItem?.descriptor?.code) {
                                case "TAX":
                                    array = taxArr;
                                    break;
                                default:
                                    break;
                            }
                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = itemArrItem?.list.findIndex((listItem) => listItem?.descriptor?.code === it.code);
                                    const listItem = itemArrItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));
                                    }

                                });
                            }

                        }
                    })

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
                const arr = [
                    { code: "BUYER_FINDER_FEES", name: "buyer finder fees" },
                    { code: "SETTLEMENT_TERMS", name: "settlement terms" }
                ];
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

                        const settlementTermsArr = [{ code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "SETTLEMENT_TYPE" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "DELAY_INTEREST" }, { code: "STATIC_TERMS" }, { code: "SETTLEMENT_AMOUNT" }];


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
            })
        }
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
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {

    on_update
};