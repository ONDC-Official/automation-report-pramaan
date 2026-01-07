const Mocha = require("mocha");
const contextTests = require("./context")
const { expect } = require("chai");
const { quoteCommonTests, itemsCommonFieldsTests, providerWithID, xinputOnStatusGeneral, fulfillmentsTests, itemsWithXinputTests } = require('./commonTest');

async function on_update({ context, message } = {}, flowId, constants = {}) {
    try {
        const testSuite = new Mocha.Suite("on_update  Request Verification");
        contextTests(context, "on_update", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
            expect(message).to.exist.a.property("order").that.is.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object object", function () {
            expect(message.order).to.exist.that.is.an("object");
        }));
        //message.order.id
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.id' which is a string ", function () {
            expect(message.order.id).to.exist.that.is.a("string");
        }));
        //message.order.status
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.status' which is a string ", function () {
            expect(message.order.status).to.exist.that.is.a("string");
        }));
        //message.order.fulfillments
        {
            fulfillmentsTests(message, messageTestSuite);

            if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
                message.order.fulfillments.forEach((it, i) => {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}]' should be an object`, function () {
                        expect(it).to.be.an("object").that.includes.all.keys("customer");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.person' should be an object`, function () {
                        expect(it.customer.person).to.be.an("object").that.includes.a.key("name");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.person.name' should be a string`, function () {
                        expect(it.customer.person.name).to.be.a("string");
                    }));

                    // const arr = [{ code: "PERSON_ADDITIONAL_DETAILS" }];
                    // arr.forEach((ele) => {
                    //     if (it.customer.person?.tags) {
                    //         const tagIndex = it.customer.person.tags.findIndex((tag) => tag.descriptor.code === ele.code);
                    //         const tagItem = it.customer.person.tags[tagIndex];

                    //         messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags' should have an object of ${ele.code}`, function () {
                    //             expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    //         }));

                    //         if (tagIndex !== -1) {
                    //             messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                    //                 expect(tagItem).to.have.property("descriptor").that.is.an("object");
                    //                 expect(tagItem).to.have.property("list").that.is.an("array");
                    //             }));

                    //             messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                    //                 expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                    //             }));

                    //             messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].descriptor.code' should be equal to '${ele.code}'`, function () {
                    //                 expect(tagItem.descriptor.code).to.be.equal(ele.code);
                    //             }));

                    //             messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list' should be a non empty array`, function () {
                    //                 expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    //             }));

                    //             const personalAdditionalDetailsArr = [{ code: "POLITICALLY_EXPOSED_PERSON" }, { code: "GSTIN" }];

                    //             let array;
                    //             switch (tagItem?.descriptor?.code) {
                    //                 case "PERSON_ADDITIONAL_DETAILS":
                    //                     array = personalAdditionalDetailsArr;
                    //                     break;

                    //                 default:
                    //                     break;
                    //             }

                    //             if (array) {
                    //                 array.forEach((it) => {
                    //                     const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                    //                     const listItem = tagItem?.list[listItemIndex];

                    //                     messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                    //                         expect(listItem).to.exist.and.to.be.an("object");
                    //                     }));

                    //                     if (listItemIndex !== -1) {
                    //                         messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                    //                             expect(listItem).to.have.property("descriptor").that.is.an("object");
                    //                             expect(listItem).to.have.property("value").that.is.a("string");
                    //                         }));

                    //                         messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                    //                             expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                    //                         }));

                    //                         messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                    //                             expect(listItem.descriptor.code).to.be.equal(it.code);
                    //                         }));

                    //                         messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                    //                             expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                    //                         }));
                    //                         messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].customer.person.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                    //                             expect(listItem.value).to.be.a('string').that.is.not.empty;
                    //                         }));
                    //                     }
                    //                 });
                    //             }
                    //         }
                    //     }
                    // });
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact' should be an object`, function () {
                        expect(it.customer.contact).to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.contact.phone' should be a string`, function () {
                        expect(it.customer.contact.phone).to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].id' should be a string`, function () {
                        expect(it.id).to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].type' should be a string`, function () {
                        expect(it.type).to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].state' should be an object`, function () {
                        expect(it.state).to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].state.descriptor' should be an object`, function () {
                        expect(it.state.descriptor).to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].state.descriptor.code' should be an string`, function () {
                        expect(it.state.descriptor.code).to.be.an("string");
                    }));
                });
            }
        }

        //message.order.items...
        {
            messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
                expect(message.order.items).to.be.an('array').that.has.lengthOf("1");
            }));
            if (message?.order?.items && message?.order?.items.length > 0) {
                message.order.items.forEach((item, i) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                        expect(item).to.be.an('object');
                    }));
                    //message.order.items.id
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a string`, function () {
                        expect(item.id).to.be.a('string');
                    }));
                    if (item?.parent_item_id) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].parent_item_id' should be a string`, function () {
                            expect(item.parent_item_id).to.be.a("string");
                        }));
                    }
                    // message.order.item.descriptor
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.name' should be a string`, function () {
                        expect(item.descriptor.name).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].descriptor.short_desc' should be a string (OPTIONAL)`, function () {
                        expect(item.descriptor.short_desc).to.be.a('string');
                    }));
                    //message.order.items.category_ids....
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids' should be an array, that should not be empty`, function () {
                        expect(item.category_ids).to.be.an('array').that.is.not.empty;
                    }));
                    if (item?.category_ids && item?.category_ids.length > 0) {
                        item.category_ids.forEach((categoryID, categoryIDIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIDIndex}]' should be string`, function () {
                                expect(categoryID).to.be.a("string");
                            }));
                        })
                    }

                    //message.order.items.price...

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price' should be an object`, function () {
                        expect(item.price).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.currency' should be a string`, function () {
                        expect(item.price.currency).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.value' should be a string`, function () {
                        expect(item.price.value).to.be.a('string');
                    }));

                    if (item?.fulfillment_ids?.length > 0) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array`, function () {
                            expect(item.fulfillment_ids).to.be.an('array');
                        }));
                    }

                    if (item?.payment_ids?.length > 0) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].payment_ids' should be an array`, function () {
                            expect(item.payment_ids).to.be.an('array');
                        }));
                    }
                    //message.order.items.time
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time' should be an object`, function () {
                        expect(item.time).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.label' should be a string`, function () {
                        expect(item.time.label).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.duration' should be a string`, function () {
                        expect(item.time.duration).to.be.an('string');
                    }));

                    //message.order.items.tags...
                    const arr = [{ code: "GENERAL_INFO", name: "General Information" }, { code: "INCLUSIONS", name: "Inclusions" }, { code: "EXCLUSIONS", name: "Exclusions" }];
                    arr.forEach((ele) => {
                        const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = item?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));

                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.name' should have be equal to '${ele.name}'`, function () {
                                expect(tagItem.descriptor.name).to.be.equal(ele.name);
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));
                            let generalInformationArr1 = [{ code: "COVERAGE_AMOUNT" }];
                            let inclusionArr1 = [{ name: "Transit Coverage" }, { name: "Multi-Mode Transport Protection" }, { name: "Natural Calamities" }];
                            let inclusionArr2 = [{ name: "Hospitalization" }, { name: "Surgery" }];
                            let exclusionsArr1 = [{ name: "Ordinary Wear and Tear" }, { name: "Delays" }];
                            let exclusionsArr2 = [{ name: "Physiotherapy" }];
                            let bapinputsArr = [{ code: "BUYER_NAME" }, { code: "BUYER_PHONE_NUMBER" }, { code: "BUYER_PAN_NUMBER" }, { code: "DERIVED_DATA" }, { code: "PRODUCT_CATEGORY" }, { code: "ORDER_ID" }, { code: "ORDER_VALUE" },
                            { code: "ORDER_TYPE" }, { code: "ORDER_WEIGHT" }, { code: "START_ADDRESS" }, { code: "END_ADDRESS" }, { code: "PAYMENT_MODE" }, { code: "TRANSIT_START_DATE" }, { code: "TRANSIT_END_DATE" }, { code: "PACKAGING_TYPE" },
                            { code: "PACKAGING_VIDEO" }, { code: "SEALING_TYPE" }, { code: "WATERPROOFING" }, { code: "MODE_OF_TRANSPORT" }, { code: "LOGISTICS_COST" }, { code: "ORDERS_ONTIME_PCT" },
                            { code: "LOGISTICS_PARTNER_GSTIN" }, { code: "DELIVERY_EXECUTIVE_NAME" }, { code: "DELIVERY_EXECUTIVE_PHONE_NO" }, { code: "DELIVERY_EXECUTIVE_UNIQUE_ID" }, { code: "DELIVERY_EXECUTIVE_VEHICLE_NO" }];

                            let generalInformationArr2 = [{ code: "COVERAGE_AMOUNT" }, { code: "DAILY_CASH_BENEFIT" }, { code: "MAX_HOSPITALIZATION_DAYS" }, { code: "ICU_BENEFIT_PER_DAY" }, { code: "SURGICAL_BENEFIT" }, { code: "CONVALESCENCE_BENEFIT" }, { code: "MINIMUM_DAYS_FOR_CONVALESCENCE_BENEFIT" }, { code: "INITIAL_WAITING_PERIOD" }, { code: "DURATION_OF_COVER" }, { code: "MINIMUM_AGE_LIMIT" }, { code: "MAXIMUM_AGE_LIMIT" }];
                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "GENERAL_INFO":
                                    switch (constants?.insurance_category) {
                                        case "MICRO_TRANSIT_INSURANCE":
                                            array = generalInformationArr1;
                                            break;
                                        default:
                                            array = generalInformationArr2;
                                            break;
                                    }
                                    break;
                                case "INCLUSIONS":
                                    switch (constants?.insurance_category) {
                                        case "MICRO_TRANSIT_INSURANCE":
                                            array = inclusionArr1;
                                            break;
                                        default:
                                            array = inclusionArr2;
                                            break;
                                    }
                                    break;
                                case "EXCLUSIONS":
                                    switch (constants?.insurance_category) {
                                        case "MICRO_TRANSIT_INSURANCE":
                                            array = exclusionsArr1;
                                            break;
                                        default:
                                            array = exclusionsArr2;
                                            break;
                                    }
                                    break;
                                case "BAP_INPUTS":
                                    array = bapinputsArr;
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex1 = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItemIndex2 = tagItem.list.findIndex((listItem) => listItem?.descriptor.name === it.name);
                                    let listItemIndex;
                                    switch (tagItem?.descriptor?.code) {
                                        case "GENERAL_INFO":
                                            listItemIndex = listItemIndex1;
                                            break;
                                        default:
                                            listItemIndex = listItemIndex2;
                                            break;

                                    }
                                    const listItem = tagItem?.list[listItemIndex];

                                    if (tagItem?.descriptor?.code === "INCLUSIONS" || tagItem?.descriptor?.code === "EXCLUSIONS") {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.name}'`, function () {
                                            expect(listItem).to.exist.and.to.be.an("object");
                                        }));
                                    }
                                    if (tagItem?.descriptor?.code === "GENERAL_INFO" || tagItem?.descriptor?.code === "BAP_INPUTS") {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                            expect(listItem).to.exist.and.to.be.an("object");
                                        }));
                                    }

                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' which are object`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                        }));
                                        if (listItem.value) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'value' which are string`, function () {
                                                expect(listItem).to.have.property("value").that.is.a("string");
                                            }));
                                        }
                                        if (listItem.descriptor.name) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                            }));
                                        }
                                        if (listItem.descriptor.short_desc) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'short_desc' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("short_desc").that.is.a("string");
                                            }));
                                        }
                                        if (listItem.code) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                expect(listItem.descriptor.code).to.be.equal(it.code);
                                            }));
                                        }
                                        if (listItem.value) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));
                                        }
                                    }
                                });
                            }
                        }
                    });

                })
            }
        }
        //message.order.payments
        {

            messageTestSuite.addTest(new Mocha.Test("'message.order.payments' should be an array", function () {
                expect(message.order.payments).to.be.an('array');
            }));
            if (message?.order?.payments && message?.order?.payments.length > 0) {
                message.order.payments.forEach((payment, z) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}]' should be an object`, function () {
                        expect(payment).to.be.an('object');
                    }));
                    //collected_by
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].collected_by' should be a string`, function () {
                        expect(payment.collected_by).to.be.a('string');
                    }));
                    //params
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params' should be an object`, function () {
                        expect(payment.params).to.be.an('object');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.amount' should be a string`, function () {
                        expect(payment.params.amount).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.currency' should be a string`, function () {
                        expect(payment.params.currency).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.transaction_id' should be a string`, function () {
                        expect(payment.params.transaction_id).to.be.a('string');
                    }));
                    //status
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].status' should be a string`, function () {
                        expect(payment.status).to.be.a('string').to.be.equal("PAID");
                    }));
                    //type
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].type' should be a string`, function () {
                        expect(payment.type).to.be.a('string').and.to.be.oneOf(["PRE-FULFILLMENT", "ON-ORDER", "PRE-ORDER", "ON-FULFILLMENT"]);
                    }));
                })
            }
        }
        //message.order.provider
        {
            messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
                expect(message.order.provider).to.be.an("object");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'descriptor' which is an object", function () {
                expect(message.order.provider.descriptor).to.be.an("object");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'long_desc' which is a string (OPTIONAL)", function () {
                expect(message.order.provider.descriptor.long_desc).to.be.a("string");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'name' which is a string", function () {
                expect(message.order.provider.descriptor.name).to.be.a("string");
            }))
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'short_desc' which is a string (OPTIONAL)", function () {
                expect(message.order.provider.descriptor.short_desc).to.be.a("string");
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
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.providers[${i}].descriptor.images.size_type' should be a string (OPTIONAL)`, function () {
                        expect(image.size_type).to.be.a("string");
                    }));
                })

            }
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider.tags' should be an array", function () {
                expect(message.order.provider.tags).to.be.an('array');
            }));
            const arr = [{ code: "MASTER_POLICY" }];
            arr.forEach((ele) => {
                const tagIndex = message?.order?.provider?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                const tagprovider = message?.order?.provider?.tags[tagIndex];
                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags' should have an object of ${ele.code}`, function () {
                    expect(tagprovider).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                }));

                if (tagIndex !== -1) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                        expect(tagprovider).to.have.property("descriptor").that.is.an("object");
                        expect(tagprovider).to.have.property("list").that.is.an("array");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(tagprovider.descriptor).to.have.property("code").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                        expect(tagprovider.descriptor.code).to.be.equal(ele.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list' should have be a non empty array`, function () {
                        expect(tagprovider.list).to.be.an("array").that.is.not.empty;
                    }));

                    let masterpolicyArr = [{ code: "POLICY_ID" }];
                    let array;
                    switch (tagprovider?.descriptor?.code) {
                        case "MASTER_POLICY":
                            array = masterpolicyArr;
                            break;
                        default:
                            break;
                    }

                    if (array) {
                        array.forEach((it) => {
                            const listproviderIndex = tagprovider.list.findIndex((listprovider) => listprovider?.descriptor.code === it.code);
                            const listprovider = tagprovider?.list[listproviderIndex];

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                expect(listprovider).to.exist.and.to.be.an("object");
                            }));

                            if (listproviderIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listproviderIndex}]' should have properties named 'descriptor' which are object`, function () {
                                    expect(listprovider).to.have.property("descriptor").that.is.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listproviderIndex}]' should have properties named  'value' which are strings`, function () {
                                    expect(listprovider).to.have.property("value").that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listproviderIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                    expect(listprovider.descriptor).to.have.property("code").that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listproviderIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                    expect(listprovider.descriptor.code).to.be.equal(it.code);
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${tagIndex}].list[${listproviderIndex}].value' should be a string that is not empty`, function () {
                                    expect(listprovider.value).to.be.a('string').that.is.not.empty;
                                }));

                            }
                        });
                    }
                }
            });
        }
        //message.order.provider
        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'quote' which is a object", function () {
            expect(message.order).to.have.a.property("quote").that.is.a("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should have a property named 'id' which is a object", function () {
            expect(message.order.quote).to.have.a.property("id").that.is.a("string");
        }));

        const arr = [
            { title: "BASE_PRICE", name: "base price" },
            { title: "CONVIENCE_FEE", name: "convience fee" },
            { title: "TAX", name: "tax" },
            { title: "PROCESSING_FEE", name: "processing fee" }
            // { title: "CONVIENCE_FEE", name: "convience fee" },
            // { title: "ADD_ONS", name: "add ons" }
        ];

        arr.forEach((ele) => {
            const breakupIndex = message?.order?.quote?.breakup.findIndex((breakup) => breakup?.title === ele.title);
            const breakupItem = message?.order?.quote?.breakup[breakupIndex];
            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup' should have an object of ${ele.title}`, function () {
                expect(breakupItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
            }));
            if (breakupIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should have properties named 'price', 'title'`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                    expect(breakupItem.price).to.have.property("value").that.is.a("string");
                    expect(breakupItem).to.have.property("title").that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string`, function () {
                    expect(breakupItem.price).to.have.property("value").that.is.a("string");
                }));
                // messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string`, function () {
                //     expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                // }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));
            }
        })

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'price' which is an object", function () {
            expect(message.order.quote.price).to.be.a("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote.price' should have a property named as 'currency' which is an string", function () {
            expect(message.order.quote.price.currency).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote.price' should have a property named as 'value' which is an string", function () {
            expect(message.order.quote.price.value).to.be.a("string");
        }));

        const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
            return total + parseFloat(item.price.value);
        }, 0);

        const roundedTotal = Math.round(totalBreakupPrice * 100) / 100;

        const quotePriceValue = parseFloat(message?.order?.quote.price.value);

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
            expect(quotePriceValue).to.be.oneOf([roundedTotal, Math.floor(roundedTotal), Math.ceil(roundedTotal)]);
        }));

        //message.order.cancellation_terms
        {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation_terms' and that should be an array", function () {
                expect(message.order.cancellation_terms).to.exist.that.is.an("array");
            }));
            if (message?.order?.cancellation_terms && message?.order?.cancellation_terms.length > 0) {
                message.order.cancellation_terms.forEach((C_terms, C_termsIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}]' and that should be an object`, function () {
                        expect(C_terms).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref' and that should be an object`, function () {
                        expect(C_terms.external_ref).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.mimetype' and that should be a string `, function () {
                        expect(C_terms.external_ref.mimetype).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.url' and that should be a string `, function () {
                        expect(C_terms.external_ref.url).to.exist.that.is.a("string");
                    }));

                })
            }
        }


        // message.order.documents
        // if (message?.order?.cancellation_terms[1]?.fulfillment_state?.descriptor?.code === "INSURANCE_GRANTED") {
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.documents' and that should be an array", function () {
            expect(message.order.documents).to.exist.that.is.an("array");
        }));
        if (message?.order?.documents && message?.order?.documents.length > 0) {
            message.order.documents.forEach((document, documentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}]' and that should be an object`, function () {
                    expect(document).to.exist.that.is.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor' and that should be an object`, function () {
                    expect(document.descriptor).to.exist.that.is.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.code' and that should be a string`, function () {
                    expect(document.descriptor.code).to.exist.that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.name' and that should be a string`, function () {
                    expect(document.descriptor.name).to.exist.that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.short_desc' and that should be a string`, function () {
                    expect(document.descriptor.short_desc).to.exist.that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].descriptor.long_desc' and that should be a string`, function () {
                    expect(document.descriptor.long_desc).to.exist.that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].mime_type' and that should be a string`, function () {
                    expect(document.mime_type).to.exist.that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.documents[${documentIndex}].url' and that should be a string`, function () {
                    expect(document.url).to.exist.that.is.a("string");
                }));
            })
        }
        // }
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string ", function () {
            expect(message.order.created_at).to.exist.that.is.a("string");
        }));
        //message.order.updated_at
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string ", function () {
            expect(message.order.updated_at).to.exist.that.is.a("string");
        }));


        messageTestSuite.addTest(new Mocha.Test(`'message.order.tags' should exist and be an array`, function () {
            expect(message.order.tags).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        if (message?.order?.tags) {
            const arr = [{ code: "BPP_TERMS" }];

            arr.forEach((ele) => {
                const tagIndex = message?.order?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                const tagItem = message?.order?.tags[tagIndex];
                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags' should have an object of ${ele.code}`, function () {
                    expect(tagItem).to.exist.and.to.be.an("object");
                }));


                if (tagIndex !== -1) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                        expect(tagItem).to.have.property("display").that.is.a("boolean");
                        expect(tagItem).to.have.property("list").that.is.an("array");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].descriptor.name' should be string '`, function () {
                        expect(tagItem.descriptor.name).to.be.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].display' should be a boolean (OPTIONAL)`, function () {
                        expect(tagItem.display).to.be.a("boolean");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list' should have be a non empty array`, function () {
                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    }));


                    const array = [{ code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];

                    if (array) {
                        array.forEach((it) => {
                            const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                            const listItem = tagItem?.list[listItemIndex];

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                expect(listItem).to.exist.and.to.be.an("object");
                            }));


                            if (listItemIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                    expect(listItem).to.have.property("descriptor").that.is.an("object");
                                    expect(listItem).to.have.property("value").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                    expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                    expect(listItem.descriptor.code).to.be.equal(it.code);
                                }));

                                // messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be string`, function () {
                                //     expect(listItem.descriptor.name).to.be.a("string");
                                // }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                }));

                            }
                        });
                    }
                }
            });
        }
        return testSuite;
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = { on_update };

