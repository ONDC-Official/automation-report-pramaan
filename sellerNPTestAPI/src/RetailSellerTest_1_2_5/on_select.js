const Mocha = require("mocha");
const contextTests = require("./context");
const onSelectSchema = require("./schema/on_select.schema");
const { generateTests } = require("./common");
const { expect } = require("chai");
const response_verification = require("../centralizedUtilities/responseVerification");

function onSelectMessageTests({ context, message }, logs = [], constants) {
    try {
        // generating the tests using recursive methods
        if (constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_01E" || constants?.flow === "RET_ENH_00A" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_COMBO" || constants?.flow === "RET_ENH_009_DISCOUNT" || constants?.flow === "RET_ENH_009_BUYXGETY_A" || constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow === "RET_ENH_009_SLAB" || constants?.flow === "RET_ENH_009_DELIVERY") {

            const testSuite = new Mocha.Suite(`on_select Request Verification`);
            testSuite.addSuite(contextTests(context, constants, logs));
            const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
                expect(message).to.exist;
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
                expect(message.order).to.exist.and.to.be.an("object");
            }));


            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments' which is an array`, function () {
                expect(message.order.fulfillments).to.exist.and.to.be.an("array");
            }));

            if (message?.order.fulfillments && message.order.fulfillments.length > 0) {
                message?.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                        expect(fulfillment).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
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


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                        expect(fulfillment.type).to.exist.and.to.be.a("string");
                    }));

                    if (fulfillment?.type !== "Self-Pickup" && fulfillment?.type !== "Buyer-Delivery") {

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end' which is an object`, function () {
                            expect(fulfillment.end).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.time' which is an object`, function () {
                            expect(fulfillment.end.time).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.time.range' which is an object`, function () {
                            expect(fulfillment.end.time.range).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.time.range.start' which is a string`, function () {
                            expect(fulfillment.end.time.range.start).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.time.range.end' which is a string`, function () {
                            expect(fulfillment.end.time.range.end).to.exist.and.to.be.a("string");
                        }));
                    }


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].@ondc/org/provider_name' which is a string`, function () {
                        expect(fulfillment["@ondc/org/provider_name"]).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].@ondc/org/category' which is a string`, function () {
                        expect(fulfillment["@ondc/org/category"]).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].@ondc/org/TAT' which is a string`, function () {
                        expect(fulfillment["@ondc/org/TAT"]).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tracking' which is a boolean`, function () {
                        expect(fulfillment.tracking).to.exist.and.to.be.a("boolean");
                    }));

                    if (fulfillment?.type === "Buyer-Delivery") {


                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tags' which is an array`, function () {
                            expect(fulfillment.tags).to.exist.and.to.be.an("array");
                        }));

                        const arr = [{ code: "order_details" }];
                        arr.forEach((ele) => {
                            const tagIndex = fulfillment?.tags.findIndex((tag) => tag?.code === ele.code);
                            const tagItem = fulfillment?.tags[tagIndex];
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                                expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                            }));


                            if (tagIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                                    expect(tagItem).to.have.property("code").that.is.a("string");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                                    expect(tagItem).to.have.property("code").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                                    expect(tagItem.code).to.be.equal(ele.code);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));



                                const orderDetailsArr = [{ code: "weight_unit" }, { code: "weight_value" }, { code: "dim_unit" }, { code: "height" }, { code: "breadth" }, { code: "length" }];

                                let array;
                                switch (tagItem?.code) {
                                    case "order_details":
                                        array = orderDetailsArr;
                                        break;
                                    default:
                                        break;
                                }

                                if (array) {
                                    array.forEach((it) => {
                                        const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.code === it.code);
                                        const listItem = tagItem?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                            expect(listItem).to.exist.and.to.be.an("object");
                                        }));


                                        if (listItemIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                expect(listItem).to.have.property("code").that.is.a("string");
                                                expect(listItem).to.have.property("value").that.is.a("string");
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                expect(listItem).to.have.property("code").that.is.a("string");
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                expect(listItem.code).to.be.equal(it.code);
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

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider' which is an object", function () {
                expect(message.order.provider).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.provider.id' which is a string`, function () {
                expect(message.order.provider.id).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.provider.locations' which is an array`, function () {
                expect(message.order.provider.locations).to.exist.and.to.be.an("array");
            }));

            if (message?.order?.provider.locations && message?.order?.provider.locations.length > 0) {
                message?.order?.provider.locations.forEach((location, locationIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.provider.locations[${locationIndex}]' which is an object`, function () {
                        expect(location).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.provider.locations[${locationIndex}].id string`, function () {
                        expect(location.id).to.exist.and.to.be.a("string");
                    }));
                })
            }

            if (constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_DISCOUNT" || constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow === "RET_ENH_009_BUYXGETY_A" || constants?.flow === "RET_ENH_009_SLAB" || constants?.flow === "RET_ENH_009_DELIVERY") {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.offers' which is an array`, function () {
                    expect(message.order.offers).to.exist.and.to.be.an("array");
                }));

                if (message?.order?.offers && message?.order?.offers.length > 0) {
                    message?.order?.offers.forEach((offer, o) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.offers[${o}]' which is an object`, function () {
                            expect(offer).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.offers[${o}].id' which is a string`, function () {
                            expect(offer.id).to.exist.and.to.be.a("string");
                        }));
                    })
                }
            }

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items' which is an array`, function () {
                expect(message.order.items).to.exist.and.to.be.an("array");
            }));

            if (message?.order?.items && message?.order?.items.length > 0) {
                message?.order?.items.forEach((item, i) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}]' which is an object`, function () {
                        expect(item).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].id' which is a string`, function () {
                        expect(item.id).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_id' should be a string `, function () {
                        expect(item.fulfillment_id).to.be.a('string');
                    }));
                    if (item?.parent_item_id) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].parent_item_id' should be a string `, function () {
                            expect(item.parent_item_id).to.be.a('string');
                        }));
                    }

                    if (item?.location_id) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].location_id' should be a string `, function () {
                            expect(item.location_id).to.be.a('string');
                        }));
                    }

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].tags' which is an array`, function () {
                        expect(item.tags).to.exist.and.to.be.an("array");
                    }));
                    if (item?.parent_item_id) {
                        const arr1 = [{ code: "type" }];
                        const arr2 = [{ code: "type" }, { code: "parent" }];
                        let arr = [];
                        if (item?.location_id) {
                            arr = arr1;
                        } else {
                            arr = arr2;
                        }
                        arr.forEach((ele) => {
                            const tagIndex = item?.tags.findIndex((tag) => tag?.code === ele.code);
                            const tagItem = item?.tags[tagIndex];
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should have an object of ${ele.code}`, function () {
                                expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                            }));


                            if (tagIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                                    expect(tagItem).to.have.property("code").that.is.a("string");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                                    expect(tagItem).to.have.property("code").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                                    expect(tagItem.code).to.be.equal(ele.code);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));



                                const typeArr = [{ code: "type" }];
                                const parentArr = [{ code: "id" }, { code: "default" }];

                                let array;
                                switch (tagItem?.code) {
                                    case "type":
                                        array = typeArr;
                                        break;
                                    case "parent":
                                        array = parentArr;
                                        break;
                                    default:
                                        break;
                                }

                                if (array) {
                                    array.forEach((it) => {
                                        const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.code === it.code);
                                        const listItem = tagItem?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                            expect(listItem).to.exist.and.to.be.an("object");
                                        }));


                                        if (listItemIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                expect(listItem).to.have.property("code").that.is.a("string");
                                                expect(listItem).to.have.property("value").that.is.a("string");
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                expect(listItem).to.have.property("code").that.is.a("string");
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                expect(listItem.code).to.be.equal(it.code);
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));

                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }

            messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should be an object", function () {
                expect(message.order.quote).to.be.an('object');
            }));
            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.ttl' should be a string", function () {
                expect(message.order.quote.ttl).to.be.a('string');
            }));
            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price' should be an object", function () {
                expect(message.order.quote.price).to.be.an('object');
            }));
            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.currency' should be a string", function () {
                expect(message.order.quote.price.currency).to.be.a('string');
            }));
            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be a string", function () {
                expect(message.order.quote.price.value).to.be.a('string');
            }));

            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.breakup' should be an array", function () {
                expect(message.order.quote.breakup).to.be.an('array');
            }));

            if (message?.order?.quote?.breakup && message?.order?.quote?.breakup.length > 0) {
                message.order.quote.breakup.forEach((breakup, breakupIndex) => {

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should be an object`, function () {
                        expect(breakup).to.be.an('object');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should be an object`, function () {
                        expect(breakup.price).to.be.an('object');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should be a string`, function () {
                        expect(breakup.price.currency).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should be a string`, function () {
                        expect(breakup.price.value).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].@ondc/org/item_id' which is a string `, function () {
                        expect(breakup["@ondc/org/item_id"]).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].@ondc/org/title_type' which is a string `, function () {
                        expect(breakup["@ondc/org/title_type"]).to.exist.and.to.be.a("string");
                    }));

                    if (breakup?.item?.parent_item_id) {

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].@ondc/org/item_quantity' which is an object `, function () {
                            expect(breakup["@ondc/org/item_quantity"]).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].@ondc/org/item_quantity.count' which is a number `, function () {
                            expect(breakup["@ondc/org/item_quantity"].count).to.exist.and.to.be.a("number");
                        }));

                    }

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].title' which is a string `, function () {
                        expect(breakup.title).to.exist.and.to.be.a("string");
                    }));

                    if (breakup["@ondc/org/title_type"] === "item") {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item' should be an object`, function () {
                            expect(breakup.item).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.quantity' should be an object`, function () {
                            expect(breakup.item.quantity).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.quantity.available' should be an object`, function () {
                            expect(breakup.item.quantity.available).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.quantity.available.count' should be a string`, function () {
                            expect(breakup.item.quantity.available.count).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.quantity.maximum' should be an object`, function () {
                            expect(breakup.item.quantity.maximum).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.quantity.maximum.count' should be a string`, function () {
                            expect(breakup.item.quantity.maximum.count).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.price' should be an object`, function () {
                            expect(breakup.item.price).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.price.value' should be a string`, function () {
                            expect(breakup.item.price.value).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.price.currency' should be a string`, function () {
                            expect(breakup.item.price.currency).to.be.a('string');
                        }));

                        if (breakup?.item?.parent_item_id) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.parent_item_id' should be a string`, function () {
                                expect(breakup.item.parent_item_id).to.be.a('string');
                            }));
                        }
                        if (constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_00A" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_COMBO" || constants?.flow === "RET_ENH_009_DISCOUNT" || constants?.flow === "RET_ENH_01E" || constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow === "RET_ENH_009_BUYXGETY_A" || constants?.flow === "RET_ENH_009_SLAB" || constants?.flow === "RET_ENH_009_DELIVERY") {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags' should be an array`, function () {
                                expect(breakup.item.tags).to.be.an('array');
                            }));
                            if (breakup?.item?.tags) {
                                const itemArr1 = [
                                    { code: "veg_nonveg" },
                                    { code: "type" },
                                    { code: "custom_group" },
                                    { code: "np_fees" },
                                    { code: "tiiming" },
                                ];
                                const itemArr5 = [
                                    { code: "veg_nonveg" },
                                    { code: "type" },
                                    { code: "parent" },
                                    { code: "child" }
                                ];
                                const itemArr2 = [
                                    { code: "quote" }
                                ];
                                const itemArr3 = [
                                    { code: "quote" }, { code: "offer" }
                                ];
                                const itemArr4 = [
                                    { code: "quote" }, { code: "np_fees" }
                                ];
                                let itemArr = [];
                                if (breakup?.item?.parent_item_id) {
                                    itemArr = itemArr1;
                                } else {
                                    if (message.order.quote?.["@ondc/org/title_type"] === "offer") {
                                        itemArr = itemArr3;
                                    }
                                    else if (message.order.quote?.["@ondc/org/title_type"] === "tax") {
                                        if (constants?.flow === "RET_ENH_009_COMBO") {
                                            itemArr = itemArr2;
                                        } else {
                                            itemArr = itemArr4;
                                        }
                                    } else { itemArr = itemArr2 };
                                }
                                itemArr.forEach((ele) => {
                                    const itemArrIndex = breakup?.item?.tags?.findIndex((tag) => tag?.code === ele.code);
                                    const itemArrItem = breakup?.item?.tags[itemArrIndex];
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}]' should have an object of ${ele.code}`, function () {
                                        expect(itemArrItem).to.be.an("object").and.not.to.be.undefined;
                                    }));
                                    if (itemArrIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}]' should be an object`, function () {
                                            expect(itemArrItem).to.be.exist.and.to.be.an("object");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].code' should be equal to '${ele.code}'`, function () {
                                            expect(itemArrItem.code).to.be.equal(ele.code).and.to.be.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list' should be a non-empty array`, function () {
                                            expect(itemArrItem.list).to.be.an("array").that.is.not.empty;
                                        }));

                                        const quoteArr = [{ code: "type" }]
                                        const vegNonVegArr = [{ code: "veg" }]
                                        const customGroupArr = [{ code: "id" }]
                                        const typeArr = [{ code: "type" }]
                                        const timingArr = [{ code: "day_from" }, { code: "day_to" }, { code: "time_from" }, { code: "time_to" }]
                                        const offerArr1 = [{ code: "type" }, { code: "additive" }, { code: "auto" }, { code: "item_count" }, { code: "item_id" }, { code: "item_value" }]
                                        const offerArr2 = [{ code: "type" }, { code: "additive" }, { code: "auto" }]
                                        const npFeesArr1 = [{ code: "channel_margin_type" }, { code: "channel_margin_value" }]
                                        const npFeesArr2 = [{ code: "channel_margin_type" }, { code: "channel_margin_value" }, { code: "id" }]
                                        const npFeesArr3 = [{ code: "id" }]

                                        let array = [];
                                        switch (itemArrItem?.code) {
                                            case "quote":
                                                array = quoteArr;
                                            case "veg_nonveg":
                                                array = vegNonVegArr;
                                                break;
                                            case "type":
                                                array = typeArr;
                                                break;
                                            case "custom_group":
                                                array = customGroupArr;
                                                break;
                                            case "timing":
                                                array = timingArr;
                                                break;
                                            case "offer":
                                                switch (constants?.flow) {
                                                    case "RET_ENH_009_COMBO":
                                                    case "RET_ENH_009_SLAB":
                                                    case "RET_ENH_009_DELIVERY":
                                                    case "RET_ENH_009_BUYXGETY_B":
                                                    case "RET_ENH_009_BUYXGETY_A":
                                                    case "RET_ENH_001":
                                                        switch (breakup?.title) {
                                                            case "Item count offer applied":
                                                                array = offerArr1;
                                                                break;
                                                            default:
                                                                array = offerArr2;
                                                                break;
                                                        }
                                                        break;
                                                    default:
                                                        array = offerArr1;
                                                        break;
                                                }
                                                break;
                                            case "np_fees":
                                                switch (constants?.flow) {
                                                    case "RET_ENH_00A":
                                                        switch (message.order.quote?.["@ondc/org/title_type"] === "offer") {
                                                            case "tax":
                                                                array = npFeesArr3;
                                                                break;
                                                            default:
                                                                array = npFeesArr2
                                                        }
                                                    default:
                                                        array = npFeesArr1;
                                                        break;
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                        if (array) {
                                            array.forEach((it) => {
                                                const listItemIndex = itemArrItem?.list.findIndex((listItem) => listItem?.code === it.code);
                                                const listItem = itemArrItem?.list[listItemIndex];

                                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list' should have an object '${it.code}'`, function () {
                                                    expect(listItem).to.exist.and.to.be.an("object");
                                                }));

                                                if (listItemIndex !== -1) {
                                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list[${listItemIndex}]' should have properties named 'code' and 'value' which are strings`, function () {
                                                        expect(listItem).to.have.property("code").that.is.a("string");
                                                        expect(listItem).to.have.property("value").that.is.a("string");
                                                    }));

                                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list[${listItemIndex}]' should have properties named 'code' which is a string`, function () {
                                                        expect(listItem).to.have.property("code").that.is.a("string");
                                                    }));

                                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${itemArrIndex}].list[${listItemIndex}].code' should be equal to '${it.code}'`, function () {
                                                        expect(listItem.code).to.be.equal(it.code);
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
                    }

                })
            }

            return messageTestSuite;
        }
        else {
            const testSuite = new Mocha.Suite(`on_select Request Verification`);
            testSuite.addSuite(contextTests(context, constants, logs));
            const messageTestSuite = generateTests({ context, message }, onSelectSchema, "Verification of Message", constants);
            return messageTestSuite;
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_select({ context, message, error } = {}, logs = [], constants = {}, test = "on_select") {
    try {
        const testSuite = new Mocha.Suite("on_select request verification");
        constants = {
            ...constants,
            action: "on_select"
        };

        const responseTestSuite = response_verification({ context, message }, logs, constants);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onSelectMessageTests({ context, message }, logs, constants));

        let count = 1;
        const test_id_template = "retail_bpp_on_select_errors";
        if (test === "on_select_out_of_stock") {
            const errorsTestSuite = new Mocha.Suite("Verification of error block");

            errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'error' should exist and should be an object`, function () {
                expect(error).to.exist.and.to.be.an("object");
            }));

            errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}]' 'error' should have a property named 'type' that is a string`, function () {
                expect(error).to.have.property("type").that.is.a("string");
            }));

            errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}]' 'error.type' should be equal to 'DOMAIN-ERROR'`, function () {
                expect(error.type).to.equal("DOMAIN-ERROR");
            }));

            errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}]' 'error' should have a property named 'code' that is a string`, function () {
                expect(error).to.have.property("code").that.is.a("string");
            }));

            errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}]' 'error.code' should be equal to '40002'`, function () {
                expect(error.code).to.equal("40002");
            }));

            errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}]' 'error' should have a property named 'message' that is a string`, function () {
                expect(error).to.have.property("message").that.is.a("string");
            }));

            testSuite.addSuite(errorsTestSuite);
        }


        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}