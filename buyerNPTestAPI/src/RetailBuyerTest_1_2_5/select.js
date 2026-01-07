const Mocha = require("mocha");
const contextTests = require("./context");
const selectSchema = require("./schema/select.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function selectMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods 
        if (constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_01E" || constants?.flow === "RET_ENH_00A" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_DISCOUNT" || constants?.flow === "RET_ENH_009_COMBO" || constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow === "RET_ENH_009_BUYXGETY_A" || constants?.flow === "RET_ENH_009_SLAB") {

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

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end' which is an object`, function () {
                        expect(fulfillment.end).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address' which is an object`, function () {
                        expect(fulfillment.end.location.address).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.area_code' which is an object`, function () {
                        expect(fulfillment.end.location.address.area_code).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location' which is an object`, function () {
                        expect(fulfillment.end.location).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.gps' which is an object`, function () {
                        expect(fulfillment.end.location.gps).to.exist.and.to.be.an("object");
                    }));

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
            if (constants?.flow !== "RET_ENH_01E") {

            }
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

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.count' which is a string`, function () {
                        expect(item.quantity.count).to.exist.and.to.be.a("string");
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
                    if (item?.tags) {
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

            if (constants?.flow === "RET_ENH_01E" || constants?.flow === "RET_ENH_009_COMBO") {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment' which is an object`, function () {
                    expect(message.order.payment).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.type' which is a string`, function () {
                    expect(message.order.payment.type).to.exist.and.to.be.a("string");
                }));
            }

            return messageTestSuite;
        } else {
            const messageTestSuite = generateTests({ context, message }, selectSchema, "Verification of Message", constants);
            return messageTestSuite;
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function select({ context, message } = {}, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("select request verification");
        constants = { ...constants, action: "select" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(selectMessageTests({ context, message }, constants));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}
