const Mocha = require("mocha");
const contextTests = require("./context");
const initSchema = require("./schema/init.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function initMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        if (constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_01E" || constants?.flow === "RET_ENH_00A" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_COMBO" || constants?.flow === "RET_ENH_009_DISCOUNT" || constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow === "RET_ENH_009_BUYXGETY_A" || constants?.flow === "RET_ENH_009_SLAB") {


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

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                        expect(fulfillment.type).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end' which is an object`, function () {
                        expect(fulfillment.end).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.contact' which is an object`, function () {
                        expect(fulfillment.end.contact).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.contact.phone' which is an object`, function () {
                        expect(fulfillment.end.contact.phone).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.contact.email' which is an object`, function () {
                        expect(fulfillment.end.contact.email).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location' which is an object`, function () {
                        expect(fulfillment.end.location).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.gps' which is an object`, function () {
                        expect(fulfillment.end.location.gps).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address' which is an object`, function () {
                        expect(fulfillment.end.location.address).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.area_code' which is a string`, function () {
                        expect(fulfillment.end.location.address.area_code).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.name' which is a string`, function () {
                        expect(fulfillment.end.location.address.name).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.building' which is a string`, function () {
                        expect(fulfillment.end.location.address.building).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.city' which is a string`, function () {
                        expect(fulfillment.end.location.address.city).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.locality' which is a string`, function () {
                        expect(fulfillment.end.location.address.locality).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.state' which is a string`, function () {
                        expect(fulfillment.end.location.address.state).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].end.location.address.country' which is a string`, function () {
                        expect(fulfillment.end.location.address.country).to.exist.and.to.be.a("string");
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

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.offers[${o}].tags' which is an array`, function () {
                        expect(offer.tags).to.exist.and.to.be.an("array");
                    }));

                    if (offer?.tags) {
                        const arr = [{ code: "selection" }];

                        arr.forEach((ele) => {
                            const tagIndex = offer?.tags.findIndex((tag) => tag?.code === ele.code);
                            const tagItem = offer?.tags[tagIndex];
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.offers[${o}].tags' should have an object of ${ele.code}`, function () {
                                expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                            }));


                            if (tagIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.offers[${o}].tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                                    expect(tagItem).to.have.property("code").that.is.a("string");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.offers[${o}].tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                                    expect(tagItem).to.have.property("code").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.offers[${o}].tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                                    expect(tagItem.code).to.be.equal(ele.code);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.offers[${o}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));



                                const selectionArr = [{ code: "apply" }];

                                let array = [];
                                switch (tagItem?.code) {
                                    case "selection":
                                        array = selectionArr;
                                        break;
                                    default:
                                        break;
                                }

                                if (array) {
                                    array.forEach((it) => {
                                        const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.code === it.code);
                                        const listItem = tagItem?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.offers[${o}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                            expect(listItem).to.exist.and.to.be.an("object");
                                        }));


                                        if (listItemIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.offers[${o}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                expect(listItem).to.have.property("code").that.is.a("string");
                                                expect(listItem).to.have.property("value").that.is.a("string");
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.offers[${o}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                expect(listItem).to.have.property("code").that.is.a("string");
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.offers[${o}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                expect(listItem.code).to.be.equal(it.code);
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.offers[${o}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
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

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].fulfillment_id' which is a string`, function () {
                        expect(item.fulfillment_id).to.exist.and.to.be.a("string");
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
                        const arr3 = [{ code: "type" }, { code: "np_fees" }];
                        let arr = [];
                        if (item?.location_id) {
                            if (constants?.flow === "RET_ENH_00A") {
                                arr = arr3;
                            } else {
                                arr = arr1;
                            }
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
                                const npFeesArr = [{ code: "id" }];


                                let array;
                                switch (tagItem?.code) {
                                    case "type":
                                        array = typeArr;
                                        break;
                                    case "parent":
                                        array = parentArr;
                                        break;
                                    case "np_fees":
                                        array = npFeesArr;
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

            if (constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow === "RET_ENH_009_BUYXGETY_A") {

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags' which is an array`, function () {
                    expect(message.order.tags).to.exist.and.to.be.an("array");
                }));
                if (message?.order?.tags) {
                    const arr = [{ code: "bap_terms" }, { code: "bpp_terms" }];
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



                            const bppTermsArr = [{ code: "np_type" }, { code: "tax_number" }, { code: "provider_tax_number" }, { code: "max_liability" }, { code: "max_liability_cap" }, { code: "mandatory_arbitration" }, { code: "court_jurisdiction" }];
                            const bapTermsArr = [{ code: "tax_number" }, { code: "accept_bpp_terms" }];

                            let array;
                            switch (tagItem?.code) {
                                case "bap_terms":
                                    array = bapTermsArr;
                                    break;
                                case "bpp_terms":
                                    array = bppTermsArr;
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
            }
            return messageTestSuite;
        } else {
            const messageTestSuite = generateTests({ context, message }, initSchema, "Verification of Message", constants);
            return messageTestSuite;
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = async function init({ context, message } = {}, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("init request verification");
        constants = { ...constants, action: "init" };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(initMessageTests({ context, message }, constants));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}
