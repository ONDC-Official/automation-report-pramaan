const Mocha = require("mocha");
const { expect } = require('chai');
const contextTests = require("./context");
const onConfirmSchema = require("./schema/on_confirm.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function onConfirmMessageTests({ context, message } = {}, logs = [], constants) {
    try {
        // generating the tests using recursive methods
        if (constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_01E" || constants?.flow === "RET_ENH_00A" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_DISCOUNT" || constants?.flow === "RET_ENH_009_COMBO" || constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow === "RET_ENH_009_BUYXGETY_A" || constants?.flow === "RET_ENH_009_DELIVERY") {
            const testSuite = new Mocha.Suite(`on_confirm Request Verification`);
            testSuite.addSuite(contextTests(context, constants, logs));
            const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
                expect(message).to.exist;
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
                expect(message.order).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.id' which is a string`, function () {
                expect(message.order.id).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.state' which is a string`, function () {
                expect(message.order.state).to.exist.and.to.be.a("string");
            }));

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

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity' which is an object`, function () {
                        expect(item.quantity).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.count' which is a number`, function () {
                        expect(item.quantity.count).to.exist.and.to.be.a("number");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].parent_item_id' which is a string`, function () {
                        expect(item.parent_item_id).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_id' should be an string `, function () {
                        expect(item.fulfillment_id).to.be.an('string');
                    }));

                    if (item?.location_id) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].location_id' should be a string `, function () {
                            expect(item.location_id).to.be.a('string');
                        }));
                    }
                    if (constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_00A" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_DISCOUNT") {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].parent_item_id' should be a string `, function () {
                            expect(item.parent_item_id).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].tags' which is an array`, function () {
                            expect(item.tags).to.exist.and.to.be.an("array");
                        }));
                        if (item?.tags) {
                            const arr1 = [{ code: "type" }];
                            const arr2 = [{ code: "type" }, { code: "parent" }];
                            const arr3 = [{ code: "type" }, { code: "np_fees" }];
                            let arr = [];
                            const typeValue = item?.tags?.find((tagItem) => tagItem?.code === "type").list.find((listItem) => listItem?.code === "type")?.value;
                            switch (constants?.flow) {
                                case "RET_ENH_001":
                                case "RET_ENH_009_FREEBIE":
                                case "RET_ENH_009_DISCOUNT":
                                    arr = arr1;
                                    break;
                                case "RET_ENH_00A":
                                    switch (typeValue) {
                                        case "customization":
                                            arr = arr2;
                                            break;

                                        case "item":
                                            arr = arr3;
                                            break;
                                    }
                                    break;
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

                                    let array;
                                    switch (tagItem?.code) {
                                        case "type":
                                            array = typeArr;
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

                    }
                });
            }

            messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should be an object", function () {
                expect(message.order.quote).to.be.an('object');
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

            if (constants?.flow === "RET_ENH_01E" || constants?.flow === "RET_ENH_00A" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_COMBO" || constants?.flow === "RET_ENH_009_SLAB" || constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow === "RET_ENH_009_BUYXGETY_A" || constants?.flow === "RET_ENH_009_DELIVERY") {
                messageTestSuite.addTest(new Mocha.Test("'message.order.quote.ttl' should be a string", function () {
                    expect(message.order.quote.ttl).to.be.a('string');
                }));
            }

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

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].title' which is a string `, function () {
                        expect(breakup.title).to.exist.and.to.be.a("string");
                    }));

                    if (breakup?.item?.parent_item_id && constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_DISCOUNT" || constants?.flow === "RET_ENH_009_COMBO") {

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].@ondc/org/item_quantity' which is an object `, function () {
                            expect(breakup["@ondc/org/item_quantity"]).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].@ondc/org/item_quantity.count' which is a number `, function () {
                            expect(breakup["@ondc/org/item_quantity"].count).to.exist.and.to.be.a("number");
                        }));
                    }


                    if (breakup?.item) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item' should be an object`, function () {
                            expect(breakup.item).to.be.an('object');
                        }));

                        if (breakup?.item?.price) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.price' should be an object`, function () {
                                expect(breakup.item.price).to.be.an('object');
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.price.value' should be a string`, function () {
                                expect(breakup.item.price.value).to.be.a('string');
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.price.currency' should be a string`, function () {
                                expect(breakup.item.price.currency).to.be.a('string');
                            }));

                        }

                        if (breakup?.item?.parent_item_id) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.parent_item_id' should be a string`, function () {
                                expect(breakup.item.parent_item_id).to.be.a('string');
                            }));
                        }

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags' should be an array`, function () {
                            expect(breakup.item.tags).to.be.an('array');
                        }));

                        if (breakup?.item?.tags) {
                            const itemArr1 = [
                                { code: "veg_nonveg" },
                                { code: "type" },
                                { code: "custom_group" },
                                { code: "np_fees" },
                                { code: "timing" },
                            ];
                            const itemArr4 = [
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
                            const itemArr5 = [
                                { code: "quote" }, { code: "np_fees" }
                            ];
                            let itemArr = [];
                            if (breakup?.item?.parent_item_id) {
                                if (itemArr.includes("np_fees")) {
                                    itemArr = itemArr1;
                                } else if ((constants?.flow === "RET_ENH_00A") && (breakup?.item["@ondc/org/title_type"] === "misc" || breakup?.item["@ondc/org/title_type"] === "tax")) {
                                    itemArr = itemArr5;
                                } else {
                                    itemArr = itemArr4;
                                }
                            } else {
                                if (message.order.quote?.["@ondc/org/title_type"] === "offer") {
                                    itemArr = itemArr3;
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
                                    const parentArr = [{ code: "id" }, { code: "default" }]
                                    const childArr = [{ code: "id" }]
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
                                        case "parent":
                                            array = parentArr;
                                        case "child":
                                            array = childArr;
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
                                            switch (breakup?.title) {
                                                case "Item count offer applied":
                                                    array = offerArr1;
                                                    break;
                                                default:
                                                    array = offerArr2;
                                                    break;
                                            }
                                            break;
                                        case "np_fees":
                                            switch (constants?.flow) {
                                                case "RET_ENH_00A":
                                                    switch (breakup.item["@ondc/org/title_type"]) {
                                                        case "tax":
                                                            array = npFeesArr3;
                                                            break;
                                                        case "misc":
                                                            array = npFeesArr2;
                                                            break;
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

                })
            }


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

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                        expect(fulfillment.type).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].@ondc/org/provider_name' which is a string`, function () {
                        expect(fulfillment["@ondc/org/provider_name"]).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].@ondc/org/category' which is a string`, function () {
                        expect(fulfillment["@ondc/org/category"]).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].@ondc/org/TAT' which is a string`, function () {
                        expect(fulfillment["@ondc/org/TAT"]).to.exist.and.to.be.a("string");
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
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start' which is an object`, function () {
                        expect(fulfillment.start).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.time' which is an object`, function () {
                        expect(fulfillment.start.time).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.time.range' which is an object`, function () {
                        expect(fulfillment.start.time.range).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.time.range.start' which is a string`, function () {
                        expect(fulfillment.start.time.range.start).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.time.range.start' which is a string`, function () {
                        expect(fulfillment.start.time.range.start).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.contact' which is an object`, function () {
                        expect(fulfillment.start.contact).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.contact.email' which is a string`, function () {
                        expect(fulfillment.start.contact.email).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.contact.phone' which is a string`, function () {
                        expect(fulfillment.start.contact.phone).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location' which is an object`, function () {
                        expect(fulfillment.start.location).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.id' which is a string`, function () {
                        expect(fulfillment.start.location.id).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.gps' which is a string`, function () {
                        expect(fulfillment.start.location.gps).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.descriptor' which is an object`, function () {
                        expect(fulfillment.start.location.descriptor).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.descriptor.name' which is a string`, function () {
                        expect(fulfillment.start.location.descriptor.name).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.descriptor.images' which is an array`, function () {
                        expect(fulfillment.start.location.descriptor.images).to.exist.and.to.be.an("array");
                    }));

                    if (fulfillment?.start?.location?.descriptor?.images && fulfillment?.start?.location?.descriptor?.images.length > 0) {
                        fulfillment?.start?.location?.descriptor?.images.forEach((image, imageIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.descriptor.images[${imageIndex}]' which is a string`, function () {
                                expect(image).to.exist.and.to.be.a("string");
                            }));

                        })
                    }
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.address' which is an object`, function () {
                        expect(fulfillment.start.location.address).to.exist.and.to.be.an("object");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.address.locality' which is a string`, function () {
                        expect(fulfillment.start.location.address.locality).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.address.city' which is a string`, function () {
                        expect(fulfillment.start.location.address.city).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.address.state' which is a string`, function () {
                        expect(fulfillment.start.location.address.state).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].start.location.address.area_code' which is a string`, function () {
                        expect(fulfillment.start.location.address.area_code).to.exist.and.to.be.a("string");
                    }));


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

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.person' which is an object`, function () {
                        expect(fulfillment.end.person).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.person.name' which is a string`, function () {
                        expect(fulfillment.end.person.name).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.contact' which is an object`, function () {
                        expect(fulfillment.end.contact).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.contact.email' which is a string`, function () {
                        expect(fulfillment.end.contact.email).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.contact.phone' which is a string`, function () {
                        expect(fulfillment.end.contact.phone).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location' which is an object`, function () {
                        expect(fulfillment.end.location).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.gps' which is a string`, function () {
                        expect(fulfillment.end.location.gps).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address' which is an object`, function () {
                        expect(fulfillment.end.location.address).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.name' which is a string`, function () {
                        expect(fulfillment.end.location.address.name).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.building' which is a string`, function () {
                        expect(fulfillment.end.location.address.building).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.locality' which is a string`, function () {
                        expect(fulfillment.end.location.address.locality).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.city' which is a string`, function () {
                        expect(fulfillment.end.location.address.city).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.state' which is a string`, function () {
                        expect(fulfillment.end.location.address.state).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.area_code' which is a string`, function () {
                        expect(fulfillment.end.location.address.area_code).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.country' which is a string`, function () {
                        expect(fulfillment.end.location.address.country).to.exist.and.to.be.a("string");
                    }));



                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tracking' which is a boolean`, function () {
                        expect(fulfillment.tracking).to.exist.and.to.be.a("boolean");
                    }));

                })
            }

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms' which is an array`, function () {
                expect(message.order.cancellation_terms).to.exist.and.to.be.an("array");
            }));

            if (message?.order?.cancellation_terms && message?.order?.cancellation_terms.length > 0) {
                message?.order?.cancellation_terms.forEach((cancellationTerm, c) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${c}]' which is an object`, function () {
                        expect(cancellationTerm).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${c}].fulfillment_state' which is an object`, function () {
                        expect(cancellationTerm.fulfillment_state).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${c}].fulfillment_state.descriptor' which is an object`, function () {
                        expect(cancellationTerm.fulfillment_state.descriptor).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${c}].fulfillment_state.descriptor.code' which is a string`, function () {
                        expect(cancellationTerm.fulfillment_state.descriptor.code).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${c}].fulfillment_state.descriptor.short_desc' which is a string`, function () {
                        expect(cancellationTerm.fulfillment_state.descriptor.short_desc).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${c}].cancellation_fee' which is an object`, function () {
                        expect(cancellationTerm.cancellation_fee).to.exist.and.to.be.an("object");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${c}].cancellation_fee.percentage' which is a string`, function () {
                        expect(cancellationTerm.cancellation_fee.percentage).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${c}].cancellation_fee.amount' which is an object`, function () {
                        expect(cancellationTerm.cancellation_fee.amount).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${c}].cancellation_fee.amount.currency' which is a string`, function () {
                        expect(cancellationTerm.cancellation_fee.amount.currency).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${c}].cancellation_fee.amount.value' which is a string`, function () {
                        expect(cancellationTerm.cancellation_fee.amount.value).to.exist.and.to.be.a("string");
                    }));

                });
            }

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing' which is an object`, function () {
                expect(message.order.billing).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.email' which is a string`, function () {
                expect(message.order.billing.email).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.phone' which is a string`, function () {
                expect(message.order.billing.phone).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.tax_number' which is a string`, function () {
                expect(message.order.billing.tax_number).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.name' which is a string`, function () {
                expect(message.order.billing.name).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.created_at' which is a string`, function () {
                expect(message.order.billing.created_at).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.updated_at' which is a string`, function () {
                expect(message.order.billing.updated_at).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.address' which is an object`, function () {
                expect(message.order.billing.address).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.address.name' which is a string`, function () {
                expect(message.order.billing.address.name).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.address.building' which is a string`, function () {
                expect(message.order.billing.address.building).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.address.locality' which is a string`, function () {
                expect(message.order.billing.address.locality).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.address.city' which is a string`, function () {
                expect(message.order.billing.address.city).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.address.state' which is a string`, function () {
                expect(message.order.billing.address.state).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.address.area_code' which is a string`, function () {
                expect(message.order.billing.address.area_code).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.billing.address.country' which is a string`, function () {
                expect(message.order.billing.address.country).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment' which is an object", function () {
                expect(message.order.payment).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.type' which is a string`, function () {
                expect(message.order.payment.type).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.params' which is an object", function () {
                expect(message.order.payment.params).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.params.amount' which is a string`, function () {
                expect(message.order.payment.params.amount).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.params.currency' which is a string`, function () {
                expect(message.order.payment.params.currency).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.params.transaction_id' which is a string`, function () {
                expect(message.order.payment.params.transaction_id).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.status' which is a string`, function () {
                expect(message.order.payment.status).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.collected_by' which is a string`, function () {
                expect(message.order.payment.collected_by).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order."@ondc/org/buyer_app_finder_fee_type"' which is a string`, function () {
                expect(message.order.payment["@ondc/org/buyer_app_finder_fee_type"]).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/buyer_app_finder_fee_amount' which is a string`, function () {
                expect(message.order.payment["@ondc/org/buyer_app_finder_fee_amount"]).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order."@ondc/org/settlement_basis"' which is a string`, function () {
                expect(message.order.payment["@ondc/org/settlement_basis"]).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_window' which is a string`, function () {
                expect(message.order.payment["@ondc/org/settlement_window"]).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/withholding_amount' which is a string`, function () {
                expect(message.order.payment["@ondc/org/withholding_amount"]).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details' which is an array`, function () {
                expect(message.order.payment["@ondc/org/settlement_details"]).to.exist.and.to.be.an("array");
            }));
            if (message?.order?.payment["@ondc/org/settlement_details"] && message?.order?.payment["@ondc/org/settlement_details"].length > 0) {
                message.order.payment["@ondc/org/settlement_details"].forEach((settlementDetail, settlementIndex) => {

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}]' which is an object`, function () {
                        expect(settlementDetail).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}].settlement_counterparty' which is a string`, function () {
                        expect(settlementDetail.settlement_counterparty).to.exist.and.to.be.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}].settlement_type' which is a string`, function () {
                        expect(settlementDetail.settlement_type).to.exist.and.to.be.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}].settlement_bank_account_no' which is a string`, function () {
                        expect(settlementDetail.settlement_bank_account_no).to.exist.and.to.be.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}].settlement_ifsc_code' which is a string`, function () {
                        expect(settlementDetail.settlement_ifsc_code).to.exist.and.to.be.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}].settlement_phase' which is a string`, function () {
                        expect(settlementDetail.settlement_phase).to.exist.and.to.be.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}].settlement_status' which is a string`, function () {
                        expect(settlementDetail.settlement_status).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}].upi_address' which is a string`, function () {
                        expect(settlementDetail.upi_address).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}].beneficiary_name' which is a string`, function () {
                        expect(settlementDetail.beneficiary_name).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}].bank_name' which is a string`, function () {
                        expect(settlementDetail.bank_name).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.@ondc/org/settlement_details[${settlementIndex}].branch_name' which is a string`, function () {
                        expect(settlementDetail.branch_name).to.exist.and.to.be.a("string");
                    }));


                })
            }

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags' which is an array`, function () {
                expect(message.order.tags).to.exist.and.to.be.an("array");
            }));
            if (message?.order?.tags) {
                const arr = [{ code: "bpp_terms" }, { code: "bap_terms" }];
                arr.forEach((ele) => {
                    const tagIndex = message?.order?.tags.findIndex((tag) => tag?.code === ele.code);
                    const tagItem = message?.order?.tags[tagIndex];
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    }));


                    if (tagIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                            expect(tagItem).to.have.property("code").that.is.a("string");
                            expect(tagItem).to.have.property("list").that.is.an("array");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                            expect(tagItem).to.have.property("code").that.is.a("string");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                            expect(tagItem.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));



                        const bppTermsArr = [{ code: "np_type" }, { code: "tax_number" }, { code: "max_liability" }, { code: "max_liability_cap" }, { code: "mandatory_arbitration" }, { code: "court_jurisdiction" }, { code: "delay_interest" }, { code: "provider_tax_number" }];

                        const bapTermsArr = [{ code: "tax_number" }, { code: "accept_bpp_terms" }];

                        let array;
                        switch (tagItem?.code) {
                            case "bpp_terms":
                                array = bppTermsArr;
                                break;
                            case "bap_terms":
                                array = bapTermsArr;
                                break;
                            default:
                                break;
                        }

                        if (array) {
                            array.forEach((it) => {
                                const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.code === it.code);
                                const listItem = tagItem?.list[listItemIndex];

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                    expect(listItem).to.exist.and.to.be.an("object");
                                }));


                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("code").that.is.a("string");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listItem).to.have.property("code").that.is.a("string");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                        expect(listItem.code).to.be.equal(it.code);
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));

                                }
                            });
                        }
                    }
                });
            }

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.created_at' which is a string`, function () {
                expect(message.order.created_at).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.updated_at' which is a string`, function () {
                expect(message.order.updated_at).to.exist.and.to.be.a("string");
            }));

            return messageTestSuite;

        } else {
            const testSuite = new Mocha.Suite(`on_confirm Request Verification`);
            testSuite.addSuite(contextTests(context, constants, logs));

            const messageTestSuite = generateTests({ context, message }, onConfirmSchema, "Verification of Message");
            return messageTestSuite;
        }

    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_confirm({ context, message } = {}, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite("on_confirm request verification");
    try {
        constants = {
            ...constants,
            action: "on_confirm",
        };

        const responseTestSuite = response_verification({ context, message }, logs, constants);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onConfirmMessageTests({ context, message }, logs, constants));


        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_confirm payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return [testSuite];
    }
}