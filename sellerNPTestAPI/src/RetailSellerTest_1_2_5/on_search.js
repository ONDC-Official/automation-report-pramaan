const Mocha = require("mocha");
const { expect } = require('chai');
const contextTests = require("./context");
const onSearchSchema = require("./schema/on_search.schema");
const { generateTests } = require("./common");
const { checkVariant, checkCustomization } = require("./businessTests");

function onSearchMessageTests({ context, message } = {}, logs = [], constants = {}) {
    try {
        // generating the tests using recursive methods


        if (constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_O1E" || constants?.flow === "RET_ENH_00A" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_DISCOUNT" || constants?.flow === "RET_ENH_009_COMBO" || constants?.flow === "RET_ENH_009_SLAB" || constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow
            === "RET_ENH_009_BUYXGETY_A" || constants?.flow === "RET_ENH_009_DELIVERY"
        ) {
            const testSuite = new Mocha.Suite(`on_search Request Verification`);
            testSuite.addSuite(contextTests(context, constants, logs));
            const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
                expect(message).to.exist;
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog' which is an object", function () {
                expect(message.catalog).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/descriptor' which is an object`, function () {
                expect(message.catalog['bpp/descriptor']).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/descriptor.name' which is a string`, function () {
                expect(message.catalog['bpp/descriptor'].name).to.exist.and.to.be.a("string");
            }));

            if (constants?.flow !== "RET_ENH_009_")

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/descriptor.symbol' which is a string`, function () {
                    expect(message.catalog['bpp/descriptor'].symbol).to.exist.and.to.be.a("string");
                }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/descriptor.short_desc' which is a string`, function () {
                expect(message.catalog['bpp/descriptor'].short_desc).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/descriptor.long_desc' which is a string`, function () {
                expect(message.catalog['bpp/descriptor'].long_desc).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("'message.catalog.bpp/descriptor.images' should be an array", function () {
                expect(message.catalog["bpp/descriptor"].images).to.be.an('array');
            }));

            if (message?.catalog["bpp/descriptor"]?.images && message?.catalog["bpp/descriptor"]?.images.length > 0) {
                message.catalog["bpp/descriptor"].images.forEach((image, i) => {

                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.images[${i}]' should be a string `, function () {
                        expect(image).to.be.a('string');
                    }));

                })

            }

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/descriptor.tags' which is an array`, function () {
                expect(message.catalog['bpp/descriptor'].tags).to.exist.and.to.be.an("array");
            }));
            if (message?.catalog["bpp/descriptor"].tags) {
                const arr = [{ code: "bpp_terms" }];

                arr.forEach((ele) => {
                    const tagIndex = message.catalog['bpp/descriptor'].tags.findIndex((tag) => tag?.code === ele.code);
                    const tagItem = message.catalog['bpp/descriptor'].tags[tagIndex];
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object");
                    }));

                    if (tagIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                            expect(tagItem).to.have.property("code").that.is.a("string");
                            expect(tagItem).to.have.property("list").that.is.an("array");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                            expect(tagItem).to.have.property("code").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                            expect(tagItem.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));

                        const bppTermsArr1 = [{ code: "np_type" }, { code: "tax_number" }, { code: "provider_tax_number" }, { code: "max_liability" }, { code: "max_liability_cap" }, { code: "mandatory_arbitration" }, { code: "court_jurisdiction" }, { code: "delay_interest" }];
                        const bppTermsArr3 = [{ code: "np_type" }, { code: "accept_bap_terms" }, { code: "collect_payment" }];
                        const bppTermsArr2 = [{ code: "np_type" }, { code: "accept_bap_terms" }, { code: "tax_number" }, { code: "provider_tax_number" }, { code: "max_liability" }, { code: "max_liability_cap" }, { code: "mandatory_arbitration" }, { code: "court_jurisdiction" }, { code: "delay_interest" }];
                        let array = [];
                        switch (constants?.flow) {

                            case "RET_ENH_001":
                                array = bppTermsArr2
                                break;
                            case "RET_ENH_009_COMBO":
                            case "RET_ENH_009_SLAB":
                            case "RET_ENH_009_DELIVERY":
                            case "RET_ENH_009_BUYXGETY_B":
                            case "RET_ENH_009_BUYXGETY_A":
                                array = bppTermsArr3;
                                break;
                            case "RET_ENH_01E":
                            case "RET_ENH_00A":
                            case "RET_ENH_009_FREEBIE":
                            case "RET_ENH_009_DISCOUNT":
                                array = bppTermsArr1
                                break;
                            default:
                                break;
                        }

                        if (array) {
                            array.forEach((it) => {
                                const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.code === it.code);
                                const listItem = tagItem?.list[listItemIndex];

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                    expect(listItem).to.exist.and.to.be.an("object");
                                }));
                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'code' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("code").that.is.a("string");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listItem).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.tags[${tagIndex}].list[${listItemIndex}].code' should be equal to '${it.code}'`, function () {
                                        expect(listItem.code).to.be.equal(it.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/descriptor.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));
                                }
                            });
                        }
                    }
                });
            }

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog.bpp/providers' which is an array", function () {
                expect(message.catalog['bpp/providers']).to.exist.and.to.be.an("array");
            }));

            if (message?.catalog['bpp/providers'] && message?.catalog['bpp/providers'].length > 0) {
                message?.catalog['bpp/providers'].forEach((provider, providerIndex) => {

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}]' which is an object`, function () {
                        expect(provider).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].id' which is a string`, function () {
                        expect(provider.id).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].rating' which is a string`, function () {
                        expect(provider.rating).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].ttl' which is a string`, function () {
                        expect(provider.ttl).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].time' which is an object`, function () {
                        expect(provider.time).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].time.label' which is a string`, function () {
                        expect(provider.time.label).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].time.timestamp' which is a string`, function () {
                        expect(provider.time.timestamp).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers.descriptor' which is an object`, function () {
                        expect(provider.descriptor).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers.descriptor.name' which is a string`, function () {
                        expect(provider.descriptor.name).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/descriptor.descriptor.symbol' which is a string`, function () {
                        expect(provider.descriptor.symbol).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers.descriptor.short_desc' which is a string`, function () {
                        expect(provider.descriptor.short_desc).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers.descriptor.long_desc' which is a string`, function () {
                        expect(provider.descriptor.long_desc).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test("'message.catalog.bpp/providers.descriptor.images' should be an array", function () {
                        expect(provider.descriptor.images).to.be.an('array');
                    }));

                    if (provider?.descriptor.images && provider?.descriptor.images.length > 0) {
                        provider.descriptor.images.forEach((image, i) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers.descriptor.images[${i}]' should be a string`, function () {
                                expect(image).to.be.a('string');
                            }));
                        })

                    }

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].fulfillments' which is an array`, function () {
                        expect(provider.fulfillments).to.exist.and.to.be.an("array");
                    }));

                    if (provider?.fulfillments && provider?.fulfillments.length > 0) {
                        provider?.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                                expect(fulfillment).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                                expect(fulfillment.id).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                                expect(fulfillment.type).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].fulfillments[${fulfillmentIndex}].contact' which is an object`, function () {
                                expect(fulfillment.contact).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].fulfillments[${fulfillmentIndex}].contact.phone' which is a string`, function () {
                                expect(fulfillment.contact.phone).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].fulfillments[${fulfillmentIndex}].contact.email' which is a string`, function () {
                                expect(fulfillment.contact.email).to.exist.and.to.be.a("string");
                            }));
                        })

                    }
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].tags' which is an array`, function () {
                        expect(provider.tags).to.exist.and.to.be.an("array");
                    }));

                    const providerArr1 = [{ code: "timing" }, { code: "serviceability" }];
                    const providerArr3 = [{ code: "timing" }, { code: "serviceability" }, { code: "np_fees" }];

                    let providerArr = [];
                    switch (constants?.flow) {
                        case "RET_ENH_001":
                        case "RET_ENH_009_DISCOUNT":
                        case "RET_ENH_009_BUYXGETY_B":
                        case "RET_ENH_009_BUYXGETY_A":
                        case "RET_ENH_009_COMBO":
                        case "RET_ENH_009_SLAB":
                        case "RET_ENH_009_FREEBIE":
                        case "RET_ENH_01E":
                            providerArr = providerArr1;
                            break;
                        case "RET_ENH_00A":
                            providerArr = providerArr3;
                            break;

                        default:
                            break;
                    }
                    providerArr.forEach((ele) => {
                        const tagIndex = provider?.tags.findIndex((tag) => tag?.code === ele.code);
                        const tagItem = provider?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object");
                        }));

                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                                expect(tagItem).to.have.property("code").that.is.a("string");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                                expect(tagItem).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                                expect(tagItem.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            const catalogLinkArr = [{ code: "type" }, { code: "type_value" }, { code: "type_validity" }, { code: "last_update" }];
                            const timingArr = [{ code: "type" }, { code: "location" }, { code: "day_from" }, { code: "day_to" }, { code: "time_from" }, { code: "time_to" }];
                            const serviceabilityArr = [{ code: "type" }, { code: "location" }, { code: "val" }, { code: "unit" }, { code: "category" }];
                            const orderValueArr = [{ code: "min_value" }];
                            const npFeesArr = [{ code: "channel_margin_type" }, { code: "channel_margin_value" }];
                            let array = [];
                            switch (tagItem?.code) {
                                case "timing":
                                    array = timingArr
                                    break;
                                case "serviceability":
                                    array = serviceabilityArr
                                    break;
                                case "order_value":
                                    array = orderValueArr
                                    break;
                                case "np_fees":
                                    array = npFeesArr
                                    break;
                                case "catalog_link":
                                    array = catalogLinkArr
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));
                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'code' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("code").that.is.a("string");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].tags[${tagIndex}].list[${listItemIndex}].code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));
                                    }
                                });
                            }
                        }
                    });

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations' which is an array`, function () {
                        expect(provider.locations).to.exist.and.to.be.an("array");
                    }));
                    if (provider?.locations && provider?.locations.length > 0) {
                        provider?.locations.forEach((location, l) => {

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}]' which is an object`, function () {
                                expect(location).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].id' which is a string`, function () {
                                expect(location.id).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].time' which is an object`, function () {
                                expect(location.time).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].time.label' which is a string`, function () {
                                expect(location.time.label).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].time.timestamp' which is a string`, function () {
                                expect(location.time.timestamp).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].time.schedule' which is an object`, function () {
                                expect(location.time.schedule).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].time.schedule.holidays' which is an array`, function () {
                                expect(location.time.schedule.holidays).to.exist.and.to.be.an("array");
                            }));

                            if (location?.time?.schedule.holidays && location?.time?.schedule?.holidays.length > 0) {
                                location.time.schedule.holidays.forEach((holiday, h) => {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].time.schedule.holidays[${h}]' which is an object`, function () {
                                        expect(holiday).to.exist.and.to.be.an("object");
                                    }));
                                })
                            }
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].gps' which is a string`, function () {
                                expect(location.gps).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].address' which is an object`, function () {
                                expect(location.address).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].address.locality' which is a string`, function () {
                                expect(location.address.locality).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}]y.address.street' which is a string`, function () {
                                expect(location.address.street).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].address.state' which is a string`, function () {
                                expect(location.address.state).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].address.city' which is a string`, function () {
                                expect(location.address.city).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].locations[${l}].address.area_code' which is a string`, function () {
                                expect(location.address.area_code).to.exist.and.to.be.a("string");
                            }));
                        })
                    }

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories' which is an array`, function () {
                        expect(provider.categories).to.exist.and.to.be.an("array");
                    }));
                    if (provider?.categories && provider?.categories.length > 0) {
                        provider?.categories.forEach((category, c) => {

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${c}]' which is an object`, function () {
                                expect(category).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${c}].id' which is a string`, function () {
                                expect(category.id).to.exist.and.to.be.a("string");
                            }));
                            if (category?.parent_category_id) {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${c}].parent_category_id' which is a string (OPTIONAL)`, function () {
                                    expect(category.parent_category_id).to.exist.and.to.be.a("string");
                                }));
                            }

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${c}].descriptor' which is an object`, function () {
                                expect(category.descriptor).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${c}].descriptor.name' which is a string`, function () {
                                expect(category.descriptor.name).to.exist.and.to.be.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${c}].descriptor.short_desc' which is a string (OPTIONAL)`, function () {
                                expect(category.descriptor.short_desc).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${c}].descriptor.long_desc' which is a string (OPTIONAL)`, function () {
                                expect(category.descriptor.long_desc).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].descriptor.images' should be an array (OPTIONAL)`, function () {
                                expect(category.descriptor.images).to.be.an('array');
                            }));

                            if (category?.descriptor?.images && category?.descriptor?.images.length > 0) {
                                category?.descriptor?.images.forEach((image, i) => {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].descriptor.images[${i}]' should be a string (OPTIONAL)`, function () {
                                        expect(image).to.be.a('string');
                                    }));
                                })

                            }

                            const arr1 = [{ code: "display" }, { code: "timing" }, { code: "type" }];
                            const arr2 = [{ code: "type" }, { code: "config" }];
                            const arr3 = [{ code: "type" }, { code: "attr" }];
                            const arr4 = [{ code: "type" }, { code: "config" }, { code: "np_fees" }];
                            let arr = [];
                            if (constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_BUYXGETY_A" || constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow === "RET_ENH_009_DISCOUNT" || constants?.flow === "RET_ENH_009_COMBO" || constants?.flow === "RET_ENH_009_SLAB") {
                                if (category?.descriptor?.long_desc) {
                                    arr = arr1;
                                } else {
                                    arr = arr2;
                                }
                            } else if (constants?.flow === "RET_ENH_01E" || constants?.flow === "RET_ENH_009_COMBO") {
                                arr = arr3;
                            } else if (constants?.flow === "RET_ENH_00A") {
                                if (category?.descriptor?.long_desc) {
                                    arr = arr1;
                                } else {
                                    arr = arr4;
                                }
                            }
                            arr.forEach((ele) => {
                                const tagIndex = category?.tags.findIndex((tag) => tag?.code === ele.code);
                                const tagItem = category?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object");
                                }));

                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                                        expect(tagItem).to.have.property("code").that.is.a("string");
                                        expect(tagItem).to.have.property("list").that.is.an("array");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.code).to.be.equal(ele.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    const timingArr = [{ code: "day_from" }, { code: "day_to" }, { code: "time_from" }, { code: "time_to" }]
                                    const configArr = [{ code: "min" }, { code: "max" }, { code: "input" }, { code: "seq" }]
                                    const typeArr = [{ code: "type" }]
                                    const displayArr = [{ code: "rank" }]
                                    const attrArr = [{ code: "seq" }, { code: "name" }]
                                    const npFeesArr = [{ code: "channel_margin_type" }, { code: "channel_margin_value" }]
                                    let array = [];
                                    switch (tagItem?.code) {
                                        case "timing":
                                            array = timingArr
                                            break;
                                        case "type":
                                            array = typeArr
                                            break;
                                        case "attr":
                                            array = attrArr
                                            break;
                                        case "np_fees_type":
                                            array = npFeesArr
                                            break;
                                        case "display":
                                            array = displayArr
                                            break;
                                        case "config":
                                            array = configArr
                                            break;
                                        default:
                                            break;
                                    }

                                    if (array) {
                                        array.forEach((it) => {
                                            const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.code === it.code);
                                            const listItem = tagItem?.list[listItemIndex];

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));
                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'code' and 'value' which are strings`, function () {
                                                    expect(listItem).to.have.property("code").that.is.a("string");
                                                    expect(listItem).to.have.property("value").that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                    expect(listItem).to.have.property("code").that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].tags[${tagIndex}].list[${listItemIndex}].code' should be equal to '${it.code}'`, function () {
                                                    expect(listItem.code).to.be.equal(it.code);
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].categories[${c}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                }));
                                            }
                                        });
                                    }
                                }
                            });
                        })
                    }

                    if (provider?.items && provider?.items.length > 0) {
                        provider?.items.forEach((item, i) => {

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}]' which is an object`, function () {
                                expect(item).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].id' which is a string (OPTIONAL)`, function () {
                                expect(item.id).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].category_id' which is a string (OPTIONAL)`, function () {
                                expect(item.category_id).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].price' which is an object`, function () {
                                expect(item.price).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.currency' which is a string (OPTIONAL)`, function () {
                                expect(item.price.currency).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.value' which is a string (OPTIONAL)`, function () {
                                expect(item.price.value).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.maximum_value' which is a string (OPTIONAL)`, function () {
                                expect(item.price.maximum_value).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].price' which is an object`, function () {
                                expect(item.price).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags' which is an array`, function () {
                                expect(item.price.tags).to.exist.and.to.be.an("array");
                            }));

                            if (constants?.flow !== "RET_ENH_009_COMBO" && item?.fulfillment_id) {
                                if (item?.price?.tags) {
                                    const itemPriceArr = [{ code: "range" }, { code: "default_selection" }];

                                    itemPriceArr.forEach((ele) => {
                                        const tagIndex = item?.price?.tags.findIndex((tag) => tag?.code === ele.code);
                                        const tagItem = item?.price?.tags[tagIndex];
                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags' should have an object of ${ele.code}`, function () {
                                            expect(tagItem).to.exist.and.to.be.an("object");
                                        }));

                                        if (tagIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                                                expect(tagItem).to.have.property("code").that.is.a("string");
                                                expect(tagItem).to.have.property("list").that.is.an("array");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                                                expect(tagItem).to.have.property("code").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                                                expect(tagItem.code).to.be.equal(ele.code);
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags[${tagIndex}].list' should have be a non empty array`, function () {
                                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                            }));

                                            const rangeArr = [{ code: "lower" }, { code: "upper" }];
                                            const defaultSelectionArr = [{ code: "value" }, { code: "maximum_value" }];
                                            let array = [];
                                            switch (tagItem?.code) {
                                                case "range":
                                                    array = rangeArr;
                                                    break;
                                                case "defalt_selection":
                                                    array = defaultSelectionArr;
                                                    break;
                                                default:
                                                    break;
                                            }

                                            if (array) {
                                                array.forEach((it) => {
                                                    const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.code === it.code);
                                                    const listItem = tagItem?.list[listItemIndex];

                                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                        expect(listItem).to.exist.and.to.be.an("object");
                                                    }));
                                                    if (listItemIndex !== -1) {
                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'code' and 'value' which are strings`, function () {
                                                            expect(listItem).to.have.property("code").that.is.a("string");
                                                            expect(listItem).to.have.property("value").that.is.a("string");
                                                        }));

                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                            expect(listItem).to.have.property("code").that.is.a("string");
                                                        }));

                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags[${tagIndex}].list[${listItemIndex}].code' should be equal to '${it.code}'`, function () {
                                                            expect(listItem.code).to.be.equal(it.code);
                                                        }));

                                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].price.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                        }));
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].quantity' which is an object`, function () {
                                expect(item.quantity).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].quantity.unitized' which is an object`, function () {
                                expect(item.quantity.unitized).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].quantity.unitized.measure' which is an object`, function () {
                                expect(item.quantity.unitized.measure).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].quantity.unitized.measure.value' which is a string`, function () {
                                expect(item.quantity.unitized.measure.value).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].quantity.unitized.measure.unit' which is a string`, function () {
                                expect(item.quantity.unitized.measure.unit).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].quantity.available' which is an object`, function () {
                                expect(item.quantity.available).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].quantity.available.count' which is a string`, function () {
                                expect(item.quantity.available.count).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].quantity.maximum' which is an object`, function () {
                                expect(item.quantity.maximum).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].quantity.maximum.count' which is a string`, function () {
                                expect(item.quantity.maximum.count).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].descriptor' which is an object`, function () {
                                expect(item.descriptor).to.exist.and.to.be.an("object");
                            }));

                            if (constants?.flow === "RET_ENH_009_COMBO") {

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].descriptor.code' which is a string (OPTIONAL)`, function () {
                                    expect(item.descriptor.code).to.exist.and.to.be.a("string");
                                }));
                            }

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].descriptor.name' which is a string (OPTIONAL)`, function () {
                                expect(item.descriptor.name).to.exist.and.to.be.a("string");
                            }));
                            if (item.fulfillment_id) {

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].descriptor.symbol' which is a string (OPTIONAL)`, function () {
                                    expect(item.descriptor.symbol).to.exist.and.to.be.a("string");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].descriptor.short_desc' which is a string (OPTIONAL)`, function () {
                                    expect(item.descriptor.short_desc).to.exist.and.to.be.a("string");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].descriptor.long_desc' which is a string (OPTIONAL)`, function () {
                                    expect(item.descriptor.long_desc).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].descriptor.images' should be an array`, function () {
                                    expect(item.descriptor.images).to.be.an('array');
                                }));

                                if (item?.descriptor.images && item?.descriptor.images.length > 0) {
                                    item.descriptor.images.forEach((image, i) => {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].descriptor.images[${i}]' should be a string`, function () {
                                            expect(image).to.be.a('string');
                                        }));
                                    })

                                }

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].time' which is an object`, function () {
                                    expect(item.time).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].time.label' which is a string`, function () {
                                    expect(item.time.label).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].time.timestamp' which is a string `, function () {
                                    expect(item.time.timestamp).to.exist.and.to.be.a("string");
                                }));

                                if (item?.fulfillment_id) {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].fulfillment_id' which is a string (OPTIONAL)`, function () {
                                        expect(item.fulfillment_id).to.exist.and.to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].location_id' which is a string (OPTIONAL)`, function () {
                                        expect(item.location_id).to.exist.and.to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].rating' which is a string (OPTIONAL)`, function () {
                                        expect(item.rating).to.exist.and.to.be.a("string");
                                    }));
                                }

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].category_ids' which is an array`, function () {
                                    expect(item.category_ids).to.exist.and.to.be.an("array");
                                }));
                                if (item?.category_ids && item?.category_ids.length > 0) {
                                    item?.category_ids.forEach((categoryId, categoryIdIndex) => {

                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].category_ids[${categoryIdIndex}]' which is an string`, function () {
                                            expect(categoryId).to.exist.and.to.be.an("string");
                                        }));
                                    })
                                }
                                if (constants?.flow !== "RET_ENH_009_COMBO") {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].related' which is a boolean`, function () {
                                        expect(item.related).to.exist.and.to.be.a("boolean");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].recommended' which is a boolean`, function () {
                                        expect(item.recommended).to.exist.and.to.be.a("boolean");
                                    }));
                                }

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].@ondc/org/returnable' which is a boolean `, function () {
                                    expect(item["@ondc/org/returnable"]).to.exist.and.to.be.a("boolean");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].@ondc/org/cancellable' which is a boolean `, function () {
                                    expect(item["@ondc/org/cancellable"]).to.exist.and.to.be.a("boolean");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].@ondc/org/seller_pickup_return' which is a boolean `, function () {
                                    expect(item["@ondc/org/seller_pickup_return"]).to.exist.and.to.be.a("boolean");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].@ondc/org/available_on_cod' which is a boolean `, function () {
                                    expect(item["@ondc/org/available_on_cod"]).to.exist.and.to.be.a("boolean");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].@ondc/org/return_window' which is a string `, function () {
                                    expect(item["@ondc/org/return_window"]).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].@ondc/org/time_to_ship' which is a string `, function () {
                                    expect(item["@ondc/org/time_to_ship"]).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].@ondc/org/contact_details_consumer_care' which is a string `, function () {
                                    expect(item["@ondc/org/contact_details_consumer_care"]).to.exist.and.to.be.a("string");
                                }));

                                if (constants?.domain === "ONDC:RET12") {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].replacement_terms' which is an array`, function () {
                                        expect(item.replacement_terms).to.exist.and.to.be.an("array");
                                    }));
                                    if (item?.replacement_terms && item?.replacement_terms.length > 0) {
                                        item?.replacement_terms.forEach((replacementTerm, r) => {

                                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].replacement_terms[${r}]' which is an object`, function () {
                                                expect(replacementTerm).to.exist.and.to.be.an("object");
                                            }));
                                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].replacement_terms[${r}].replace_within' which is an object`, function () {
                                                expect(replacementTerm.replace_within).to.exist.and.to.be.an("object");
                                            }));
                                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].replacement_terms[${r}].replace_within.duration' which is a string`, function () {
                                                expect(replacementTerm.replace_within.duration).to.exist.and.to.be.a("string");
                                            }));
                                        })
                                    }
                                }
                            }
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags' which is an array `, function () {
                                expect(item.tags).to.exist.and.to.be.an("array");
                            }));

                            const itemArr1 = [{ code: "veg_nonveg" }, { code: "type" }, { code: "custom_group" }, { code: "timing" }];
                            const itemArr2 = [{ code: "veg_nonveg" }, { code: "type" }, { code: "parent" }, { code: "child" }];
                            const itemArr3 = [{ code: "veg_nonveg" }, { code: "type" }, { code: "custom_group" }, { code: "np_fees" }];
                            const itemArr4 = [{ code: "type" }, { code: "config" }, { code: "np_fees" }];
                            const itemArr5 = [{ code: "veg_nonveg" }, { code: "image" }, { code: "origin" }];
                            const itemArr6 = [{ code: "veg_nonveg" }, { code: "type" }, { code: "custom_group" }];
                            let arr = [];
                            if (item?.fulfillment_id) {
                                switch (constants?.flow) {
                                    case "RET_ENH_001":
                                    case "RET_ENH_009_FREEBIE":
                                    case "RET_ENH_009_DISCOUNT":
                                    case "RET_ENH_01E":
                                        arr = itemArr1
                                        break;
                                    case "RET_ENH_00A":
                                        arr = itemArr3
                                        break;
                                    case "RET_ENH_009_COMBO":
                                        arr = itemArr5
                                        break;
                                    case "RET_ENH_009_BUYXGETY_B":
                                    case "RET_ENH_009_BUYXGETY_A":
                                    case "RET_ENH_009_SLAB":
                                    case "RET_ENH_009_DELIVERY":
                                        arr = itemArr6
                                        break;
                                }
                            } else {
                                switch (constants?.flow) {
                                    case "RET_ENH_00A":
                                        arr = itemArr4;
                                        break;
                                    default:
                                        arr = itemArr2;
                                        break;
                                }
                            }
                            arr.forEach((ele) => {
                                const tagIndex = item?.tags.findIndex((tag) => tag?.code === ele.code);
                                const tagItem = item?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object");
                                }));

                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                                        expect(tagItem).to.have.property("code").that.is.a("string");
                                        expect(tagItem).to.have.property("list").that.is.an("array");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.code).to.be.equal(ele.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    const timingArr = [{ code: "day_from" }, { code: "day_to" }, { code: "time_from" }, { code: "time_to" }];
                                    const vegNonVegArr = [{ code: "veg" }];
                                    const typeArr = [{ code: "type" }];
                                    const customGroupArr = [{ code: "id" }];
                                    const parentArr = [{ code: "id" }, { code: "default" }];
                                    const imageArr = [{ code: "type" }, { code: "url" }];
                                    const npFeesArr = [{ code: "channel_margin_type" }, { code: "channel_margin_value" }];
                                    const childArr = [{ code: "id" }];
                                    const originArr = [{ code: "country" }];

                                    let array = [];
                                    switch (tagItem?.code) {
                                        case "timing":
                                            array = timingArr
                                            break;
                                        case "veg_nonveg":
                                            array = vegNonVegArr
                                            break;
                                        case "type":
                                            array = typeArr
                                            break;
                                        case "origin":
                                            array = originArr
                                            break;
                                        case "image":
                                            array = imageArr
                                            break;
                                        case "np_fees":
                                            array = npFeesArr
                                            break;
                                        case "parent":
                                            array = parentArr
                                            break;
                                        case "custom_group":
                                            array = customGroupArr
                                            break;
                                        case "child":
                                            array = childArr
                                            break;
                                        default:
                                            break;
                                    }

                                    if (array) {
                                        array.forEach((it) => {
                                            const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.code === it.code);
                                            const listItem = tagItem?.list[listItemIndex];

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));
                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'code' and 'value' which are strings`, function () {
                                                    expect(listItem).to.have.property("code").that.is.a("string");
                                                    expect(listItem).to.have.property("value").that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                    expect(listItem).to.have.property("code").that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].code' should be equal to '${it.code}'`, function () {
                                                    expect(listItem.code).to.be.equal(it.code);
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                }));
                                            }
                                        });
                                    }
                                }
                            });
                        })
                    }

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers' which is an array`, function () {
                        expect(provider.offers).to.exist.and.to.be.an("array");
                    }));
                    if (provider?.offers && provider?.offers.length > 0) {
                        provider?.offers.forEach((offer, o) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}]' which is an object`, function () {
                                expect(offer).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].id' which is a string (OPTIONAL)`, function () {
                                expect(offer.id).to.exist.and.to.be.a("string");
                            }));

                            if (offer?.item_ids && offer?.item_ids.length > 0) {
                                offer?.location_ids.forEach((itemId, itemIdIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].item_ids[${itemIdIndex}]' which is a string`, function () {
                                        expect(itemId).to.exist.and.to.be.a("string");
                                    }));
                                })
                            }
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].descriptor' which is an object`, function () {
                                expect(offer.descriptor).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].descriptor.code' which is a string (OPTIONAL)`, function () {
                                expect(offer.descriptor.code).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].descriptor.images' which is an array`, function () {
                                expect(offer.descriptor.images).to.exist.and.to.be.an("array");
                            }));
                            if (offer?.descriptor?.images && offer?.descriptor?.images.length > 0) {
                                offer?.descriptor?.images.forEach((image, imageIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].descriptor.images[${imageIndex}]' which is a string`, function () {
                                        expect(image).to.exist.and.to.be.a("string");
                                    }));
                                })
                            }

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].location_ids' which is an array`, function () {
                                expect(offer.location_ids).to.exist.and.to.be.an("array");
                            }));

                            if (offer?.loccation_ids && offer?.location_ids.length > 0) {
                                offer?.location_ids.forEach((locationId, locationIdIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].location_ids[${locationIdIndex}]' which is a string`, function () {
                                        expect(locationId).to.exist.and.to.be.a("string");
                                    }));
                                })
                            }

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].item_ids' which is an array`, function () {
                                expect(offer.item_ids).to.exist.and.to.be.an("array");
                            }));

                            if (offer?.item_ids && offer?.item_ids.length > 0) {
                                offer?.item_ids.forEach((itemId, itemIdIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].item_ids[${itemIdIndex}]' which is a string`, function () {
                                        expect(itemId).to.exist.and.to.be.a("string");
                                    }));
                                })
                            }

                            if (offer?.descriptor?.code !== "slab") {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].category_ids' which is an array`, function () {
                                    expect(offer.category_ids).to.exist.and.to.be.an("array");
                                }));

                                if (offer?.category_ids && offer?.category_ids.length > 0) {
                                    offer?.category_ids.forEach((categoryId, categoryIdIndex) => {
                                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].category_ids[${categoryIdIndex}]' which is a string`, function () {
                                            expect(categoryId).to.exist.and.to.be.a("string");
                                        }));
                                    })
                                }
                            }
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].time' which is an object`, function () {
                                expect(offer.time).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].time.label' which is a string`, function () {
                                expect(offer.time.label).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].time.range' which is an object`, function () {
                                expect(offer.time.range).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].time.range.start' which is a string `, function () {
                                expect(offer.time.range.start).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].offers[${o}].time.range.end' which is a string `, function () {
                                expect(offer.time.range.end).to.exist.and.to.be.a("string");
                            }));

                            const arr1 = [{ code: "qualifier" }, { code: "benefit" }, { code: "meta" }];
                            const arr2 = [{ code: "meta" }];
                            const arr3 = [{ code: "meta" }, { code: "finance_terms" }];
                            let arr = [];
                            switch (constants?.flow) {
                                case "RET_ENH_001":
                                case "RET_ENH_009_DISCOUNT":
                                case "RET_ENH_009_COMBO":
                                case "RET_ENH_009_SLAB":
                                case "RET_ENH_009_FREEBIE":
                                case "RET_ENH_009_BUYXGETY_B":
                                case "RET_ENH_009_BUYXGETY_A":
                                    switch (offer.id) {
                                        case "exchange1":
                                        case "financing1":
                                            switch (constants?.flow) {
                                                case "RET_ENH_009_BUYXGETY_B":
                                                case "RET_ENH_009_BUYXGETY_A":
                                                    arr = arr3;
                                                    break;
                                                default:
                                                    arr = arr2;
                                                    break;
                                            }
                                        default:
                                            arr = arr1;
                                            break;
                                    }
                                    break;
                            }
                            arr.forEach((ele) => {
                                const tagIndex = offer?.tags.findIndex((tag) => tag?.code === ele.code);
                                const tagItem = offer?.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].offers[${o}].tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object");
                                }));

                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].offers[${o}].tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                                        expect(tagItem).to.have.property("code").that.is.a("string");
                                        expect(tagItem).to.have.property("list").that.is.an("array");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].offers[${o}].tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].offers[${o}].tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.code).to.be.equal(ele.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].offers[${o}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    const qualifierArr1 = [{ code: "min_value" }];
                                    const qualifierArr3 = [{ code: "item_id" }];
                                    const qualifierArr4 = [{ code: "item_count" }];
                                    const qualifierArr2 = [{ code: "item_count" }, { code: "item_count_upper" }];
                                    const benefitArr1 = [{ code: "value_type" }, { code: "value_cap" }, { code: "value" }];
                                    const benefitArr2 = [{ code: "value_type" }, { code: "value" }];
                                    const benefitArr4 = [{ code: "item_count" }, { code: "item_id" }];
                                    const benefitArr3 = [{ code: "item_count" }, { code: "item_value" }, { code: "item_id" }];
                                    const metaArr = [{ code: "additive" }, { code: "auto" }];
                                    const financeTermsArr = [{ code: "subvention_type" }, { code: "subvention_amount" }];
                                    let array = [];
                                    switch (tagItem?.code) {
                                        case "qualifier":
                                            switch (offer?.id) {

                                                case "slab1":
                                                case "slab2":
                                                    array = qualifierArr2;
                                                    break
                                                case "combo1":
                                                    array = qualifierArr3;
                                                    break
                                                case "buy2get3":
                                                    array = qualifierArr4;
                                                    break
                                                default:
                                                    array = qualifierArr1;
                                                    break;
                                            }
                                            break;
                                        case "benefit":
                                            switch (offer?.id) {
                                                case "dicp60":
                                                case "slab1":
                                                case "slab2":
                                                case "combo1":
                                                case "delivery1":
                                                    array = benefitArr1;
                                                    break
                                                case "flat150":
                                                    array = benefitArr2;
                                                    break
                                                case "buy2get3":
                                                    array = benefitArr3;
                                                    break
                                                case "freebie1":
                                                    array = benefitArr4;
                                                    break
                                            }

                                            break;
                                        case "meta":
                                            array = metaArr
                                            break;
                                        case "finance_terms":
                                            array = financeTermsArr
                                            break;
                                        default:
                                            break;
                                    }

                                    if (array) {
                                        array.forEach((it) => {
                                            const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.code === it.code);
                                            const listItem = tagItem?.list[listItemIndex];

                                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].offers[${o}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));
                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].offers[${o}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'code' and 'value' which are strings`, function () {
                                                    expect(listItem).to.have.property("code").that.is.a("string");
                                                    expect(listItem).to.have.property("value").that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].offers[${o}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                    expect(listItem).to.have.property("code").that.is.a("string");
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].offers[${o}].tags[${tagIndex}].list[${listItemIndex}].code' should be equal to '${it.code}'`, function () {
                                                    expect(listItem.code).to.be.equal(it.code);
                                                }));

                                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].offers[${o}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string`, function () {
                                                    expect(listItem.value).to.be.a('string');
                                                }));
                                            }
                                        });
                                    }
                                }
                            });
                        })
                    }

                    // if (constants?.flow === "RET_ENH_017") {
                    //     messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].creds' which is an array`, function () {
                    //         expect(provider.creds).to.exist.and.to.be.an("array");
                    //     }));
                    //     if (provider?.creds && provider?.creds.length > 0) {
                    //         provider?.creds.forEach((cred, c) => {

                    //             messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].creds[${c}]' which is an object`, function () {
                    //                 expect(cred).to.exist.and.to.be.an("object");
                    //             }));

                    //             messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].creds[${c}].id' which is a string`, function () {
                    //                 expect(cred.id).to.exist.and.to.be.a("string");
                    //             }));
                    //             messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].creds[${c}].url' which is a string`, function () {
                    //                 expect(cred.url).to.exist.and.to.be.a("string");
                    //             }));
                    //             messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].creds[${c}].descriptor' which is an object`, function () {
                    //                 expect(cred.descriptor).to.exist.and.to.be.an("object");
                    //             }));

                    //             messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].creds[${c}].descriptor.code' which is a string`, function () {
                    //                 expect(cred.descriptor.code).to.exist.and.to.be.a("string");
                    //             }));
                    //             messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].creds[${c}].descriptor.short_desc' which is a string`, function () {
                    //                 expect(cred.descriptor.short_desc).to.exist.and.to.be.a("string");
                    //             }));
                    //             messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags' which is an array`, function () {
                    //                 expect(cred.tags).to.exist.and.to.be.an("array");
                    //             }));
                    //             const arr = [{ code: "verification" }];
                    //             arr.forEach((ele) => {
                    //                 const tagIndex = cred?.tags.findIndex((tag) => tag?.code === ele.code);
                    //                 const tagItem = cred?.tags[tagIndex];
                    //                 messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags' should have an object of ${ele.code}`, function () {
                    //                     expect(tagItem).to.exist.and.to.be.an("object");
                    //                 }));

                    //                 if (tagIndex !== -1) {
                    //                     messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                    //                         expect(tagItem).to.have.property("code").that.is.a("string");
                    //                         expect(tagItem).to.have.property("list").that.is.an("array");
                    //                     }));

                    //                     messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                    //                         expect(tagItem).to.have.property("code").that.is.a("string");
                    //                     }));

                    //                     messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                    //                         expect(tagItem.code).to.be.equal(ele.code);
                    //                     }));

                    //                     messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                    //                         expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    //                     }));

                    //                     const verificationArr = [{ code: "verify_url" }, { code: "verifier" }, { code: "issuer" }, { code: "valid_from" }, { code: "valid_to" }];
                    //                     let array = [];
                    //                     switch (tagItem?.code) {
                    //                         case "verification":
                    //                             array = verificationArr
                    //                             break;
                    //                         case "type":
                    //                             array = typeArr
                    //                             break;
                    //                         default:
                    //                             break;
                    //                     }

                    //                     if (array) {
                    //                         array.forEach((it) => {
                    //                             const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.code === it.code);
                    //                             const listItem = tagItem?.list[listItemIndex];

                    //                             messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                    //                                 expect(listItem).to.exist.and.to.be.an("object");
                    //                             }));
                    //                             if (listItemIndex !== -1) {
                    //                                 messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'code' and 'value' which are strings`, function () {
                    //                                     expect(listItem).to.have.property("code").that.is.a("string");
                    //                                     expect(listItem).to.have.property("value").that.is.a("string");
                    //                                 }));

                    //                                 messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                    //                                     expect(listItem).to.have.property("code").that.is.a("string");
                    //                                 }));

                    //                                 messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags[${tagIndex}].list[${listItemIndex}].code' should be equal to '${it.code}'`, function () {
                    //                                     expect(listItem.code).to.be.equal(it.code);
                    //                                 }));

                    //                                 messageTestSuite.addTest(new Mocha.Test(`'message.catalog.bpp/providers[${providerIndex}].creds[${c}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                    //                                     expect(listItem.value).to.be.a('string').that.is.not.empty;
                    //                                 }));
                    //                             }
                    //                         });
                    //                     }
                    //                 }
                    //             });
                    //         })
                    //     }
                    // }

                })
            }

            return messageTestSuite;
        } else {
            const messageTestSuite = generateTests({ context, message }, onSearchSchema, "Verification of Message", constants);
            const providers = message?.catalog['bpp/providers'] || [];
            if (message?.catalog['bpp/providers'] && message?.catalog['bpp/providers'].length > 0) {
                message?.catalog['bpp/providers'].forEach((provider, providerIndex) => {

                    if (provider?.items && provider?.items.length > 0) {
                        provider?.items.forEach((item, i) => {

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}]' which is an object`, function () {
                                expect(item).to.exist.and.to.be.an("object");
                            }));
                            if (item?.fulfillment_id === "1") {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].parent_item_id' which is a string (OPTIONAL)`, function () {
                                    expect(item.parent_item_id).to.exist.and.to.be.a("string").and.to.be.empty;
                                }))
                            }
                            else {
                                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].parent_item_id' which is a string (OPTIONAL)`, function () {
                                    expect(item.parent_item_id).to.exist.and.to.be.a("string");
                                }))
                            }
                        })
                    }
                })
            }
            providers.forEach((provider) => {
                provider?.items?.forEach((item) => {
                    switch (constants?.domain) {
                        case "ONDC:RET11":
                            messageTestSuite.addSuite(checkCustomization({ categories: provider?.categories, item }));
                            break;
                        default:
                            messageTestSuite.addSuite(checkVariant({ categories: provider?.categories, item }));
                            break;
                    }
                })
            });
            return messageTestSuite;
        }

    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_search({ context, message }, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("on_search request verification");
        constants = {
            ...constants,
            action: "on_search"
        };


        testSuite.addSuite(contextTests(context, constants, logs));
        if (constants?.flow === "RET_9_INC_PULL" || constants?.flow === "RET_9_INC_PUSH") {
            testSuite.addTest(new Mocha.Test(`'context.city' should be *`, function () {
                expect(context.city).to.equal("*");
            }))
        } else {
            testSuite.addTest(new Mocha.Test(`'context.city' should not be *`, function () {
                expect(context.city).to.not.equal("*");
            }))
        }
        testSuite.addSuite(onSearchMessageTests({ context, message }, logs, constants));


        return testSuite;
    } catch (err) {
        console.log(err);
    }
}