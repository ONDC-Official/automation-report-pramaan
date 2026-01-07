const Mocha = require('mocha');
const { expect } = require('chai');
const { iso8601DurationRegex } = require("../utils/constants");

function providerTests(messageTestSuite, message, type = "", logs) {
    try {
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

        const onSearchlogs = lastActionLog(logs, "on_search")
        let startTime;
        let endTime;
        onSearchlogs.message?.catalog?.providers?.map((provider) => {
            startTime = provider?.time?.range?.start
            endTime = provider?.time?.range?.end
        })
        if (type === "METRO") {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.time' should be an object`, function () {
                expect(message.order.provider.time).to.be.an('object');
            }));
            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.time.range' should be an object`, function () {
                expect(message.order.provider.time.range).to.be.an('object');
            }));
            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.time.range.start' should be a string`, function () {
                expect(message.order.provider.time.range.start).to.be.a('string').and.to.be.deep.equal(startTime);
            }));
            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.time.range.end' should be a string`, function () {
                expect(message.order.provider.time.range.end).to.be.a('string').and.to.be.deep.equal(endTime);
            }));
        }
    } catch (err) {
        console.log(err);
    }
}

function itemCommonTests(messageTestSuite, message, type = "", logs) {
    try {
        //message.order.items
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.items' which is an array", function () {
            expect(message.order.items).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.items && message?.order?.items?.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}]' which is an object`, function () {
                    expect(item).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].id' which is a string`, function () {
                    expect(item.id).to.exist.and.to.be.a("string");
                }));

                if (type === "METRO") {
                    const onSearchlogs = lastActionLog(logs, "on_search")
                    let categoryIds = [];
                    onSearchlogs.message?.catalog?.providers?.map((provider) => {
                        provider?.items?.map((item) => {
                            categoryIds = [...categoryIds, ...item?.category_ids]
                        })
                    })

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids' should be an array, that should not be empty`, function () {
                        expect(item.category_ids).to.be.an('array').that.is.not.empty;
                    }));
                    if (item?.category_ids && item?.category_ids.length > 0) {
                        item.category_ids.forEach((categoryId, categoryIdIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIdIndex}]' should be string`, function () {
                                expect(categoryId).to.be.a("string").and.to.be.oneOf(categoryIds);
                            }));
                        })
                    }
                }

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor' which is an object`, function () {
                    expect(item.descriptor).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.name' which is a string`, function () {
                    expect(item.descriptor.name).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.code' which is a string (OPTIONAL)`, function () {
                    expect(item.descriptor.code).to.exist.and.to.be.a("string");
                }));

                if (type === "BUS") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.images' which is an array (OPTIONAL)`, function () {
                        expect(item.descriptor.images).to.exist.and.to.be.an("array");
                    }));

                    if (item?.descriptor?.images && item?.descriptor?.images.length > 0) {
                        item.descriptor.images.forEach((image, imageIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.images[${imageIndex}]' which is an object`, function () {
                                expect(image).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.images[${imageIndex}].url' which is a object`, function () {
                                expect(image.url).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.images[${imageIndex}].size_type' which is a object`, function () {
                                expect(image.size_type).to.exist.and.to.be.a("string");
                            }));
                        })
                    }
                }


                const onSearchlogs = lastActionLog(logs, "on_search")
                const selectlogs = lastActionLog(logs, "select")
                let itemId;
                selectlogs?.message?.order?.items.map((item) => {
                    itemId = item?.id
                })
                let itemPrice;
                onSearchlogs.message?.catalog?.providers?.map((provider) => {
                    const matchedItem = provider?.items.find((item) => item?.id === itemId)
                    itemPrice = matchedItem?.price?.value
                })

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price' which is an object`, function () {
                    expect(item.price).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price.currency' which is a string`, function () {
                    expect(item.price.currency).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price.value' which is a string`, function () {
                    expect(item.price.value).to.exist.and.to.be.a("string").and.to.be.deep.equal(itemPrice);
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity' which is an object`, function () {
                    expect(item.quantity).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected' which is an object`, function () {
                    expect(item.quantity.selected).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected.count' which is an integer`, function () {
                    expect(item.quantity.selected.count).to.exist.and.to.be.a("number");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                    expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                }));

                // messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array with a length of ${item?.quantity?.selected?.count}`, function () {
                //     expect(item.fulfillment_ids).to.be.an('array').that.has.lengthOf(item?.quantity?.selected?.count);
                // }));

                if (item?.fulfillment_ids && item?.fulfillment_ids?.length > 0) {
                    item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be string`, function () {
                            expect(fulfillmentID).to.be.a("string");
                        }));
                    })
                }
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time' should be an object`, function () {
                    expect(item.time).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.label' should be an object`, function () {
                    expect(item.time.label).to.be.a('string');
                }));

                let itemDuration;
                onSearchlogs.message?.catalog?.providers?.map((provider) => {
                    itemDuration = provider?.item?.time?.duration
                })
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].time.duration' which is a valid ISO 8601 duration string(OPTIONAL)`, function () {
                    const durationValue = item?.time?.duration;

                    // ISO 8601 duration format (e.g., "PT2H" for 2 hours)
                    const iso8601DurationPattern = /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/;
                    expect(durationValue).to.exist.and.to.be.a("string");
                    expect(durationValue).to.match(iso8601DurationPattern, "Duration must be a valid ISO 8601 duration string").and.to.be.equal(itemDuration);
                }));
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

function orderTagsTests(messageTestSuite, message) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags' and that should be an array`, function () {
            expect(message.order.tags).to.exist.that.is.an("array");
        }));

        if (message?.order?.tags && message?.order?.tags.length > 0) {
            const arr = ["SCHEDULED_INFO"];

            arr.forEach((ele) => {
                const tagIndex = message?.order?.tags.findIndex((tag) => tag?.descriptor?.code === ele);

                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags' should contains '${ele}'`, function () {
                    expect(tagIndex, `'message.order.tags' should contains '${ele}'`).not.to.equal(-1);
                }));

                if (tagIndex !== -1) {
                    const tag = message?.order?.tags[tagIndex];

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}]' should contain a property 'descriptor' which is an object`, function () {
                        expect(tag).to.have.property('descriptor').that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].descriptor' should contain a property 'code' which is a string`, function () {
                        expect(tag.descriptor).to.have.property('code').that.is.a("string");
                    }))

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].descriptor.code' should be equal to '${ele}'`, function () {
                        expect(tag.descriptor.code).to.equal(ele);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}]' should contain a property 'display' which is a boolean`, function () {
                        expect(tag).to.have.property('display').that.is.a("boolean");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}]' should have a property 'list' which is an array`, function () {
                        expect(tag).to.have.property('list').that.is.an("array");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list' should not be empty`, function () {
                        expect(tag.list).to.be.an('array').that.is.not.empty;
                    }));

                    const listArr = ["GTFS"];

                    if (listArr && listArr.length > 0) {
                        listArr.forEach((it) => {
                            const listItemIndex = tag?.list?.findIndex((listItem) => listItem?.descriptor?.code === it);

                            messageTestSuite.addTest(new Mocha.Test(`''message.order.tags[${tagIndex}].list[${listItemIndex}]' should contain '${it}'`, function () {
                                expect(listItemIndex, `''message.order.tags[${tagIndex}].list' should contain '${it}'`).to.not.equal(-1);
                            }));

                            if (listItemIndex !== -1 && tag?.list[listItemIndex]) {
                                const listItem = tag?.list[listItemIndex];

                                messageTestSuite.addTest(new Mocha.Test(`''message.order.tags[${tagIndex}].list[${listItemIndex}]' should have property 'descriptor' which is an object`, function () {
                                    expect(listItem).to.have.property('descriptor').that.is.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`''message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have property 'code' which is a string`, function () {
                                    expect(listItem.descriptor).to.have.property('code').that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`''message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it}'`, function () {
                                    expect(listItem.descriptor.code).to.equal(it);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`''message.order.tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string`, function () {
                                    expect(listItem).to.have.property('value').that.is.a("string");
                                }));
                            }
                        })
                    }
                }
            })
        }
    } catch (err) {
        console.log(err);
    }
}

function firstActionLog(logs, action) {
    try {
        const log = logs?.find((log) => log?.request?.context?.action === action);

        return log?.request;
    } catch (err) {
        console.log(err);
    }
}

function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);

        return log && log.length ? log?.pop()?.request : false;
    } catch (err) {
        console.log(err);
    }
}

function paymentsCommonTests(messageTestSuite, message, logs) {
    let action = logs.find(log => log?.request?.context?.action)?.request?.context?.action;

    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payments' which is an array", function () {
        expect(message.order.payments).to.exist.and.to.be.an("array");
    }));
    if (message?.order?.payments && message?.order?.payments?.length > 0) {
        message.order.payments.forEach((payment, z) => {
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
                expect(payment.status).to.exist.and.to.be.a("string").that.is.equal('PAID');
            }));
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].type' which is a string`, function () {
                expect(payment.type).to.exist.and.to.be.a("string");
            }));


            if (!action == "on_init") {

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params' which is a object`, function () {
                    expect(payment.params).to.exist.and.to.be.a("object").and.to.deep.equal(initParams);
                }));

            }

            if (payment?.collected_by === "BPP" && action === "on_init") {

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params' which is a object`, function () {
                    expect(payment.params).to.exist.and.to.be.a("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.bank_code' which is a string`, function () {
                    expect(payment.params.bank_code).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.bank_account_number' which is a string`, function () {
                    expect(payment.params.bank_account_number).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.virtual_payment_address' which is a string (OPTIONAL)`, function () {
                    expect(payment.params.virtual_payment_address).to.exist.and.to.be.a("string");
                }));
            }
        })
    }
}

function orderPaymentTags(messageTestSuite, payment, z, logs = []) {
    try {
        const firstInitLogs = logs?.find((log) => log?.request?.context?.action === "init");
        let settlementWindow;
        firstInitLogs?.request?.message?.order?.payments?.map((payment) => {
            payment?.tags?.map((tag) => {
                tag?.list?.map((ls) => {
                    switch (ls?.descriptor?.code) {
                        case "SETTLEMENT_WINDOW":
                            settlementWindow = ls;
                            break;
                        default:
                            break;
                    }
                })
            })
        });

        const arr = [{ code: "BUYER_FINDER_FEES" }, { code: "SETTLEMENT_TERMS" }];

        arr.forEach((ele) => {
            const tagIndex = payment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele?.code);

            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags' should contain ${ele?.code}`, function () {
                expect(tagIndex, `'message.order.payments[${z}].tags' should contain ${ele?.code}`).to.not.equal(-1);
            }));

            if (tagIndex !== -1) {
                const tag = payment?.tags[tagIndex];

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}]' should contain a property 'descriptor' which is an object`, function () {
                    expect(tag).to.have.property('descriptor').that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor' should contain a property 'code' which is a string`, function () {
                    expect(tag.descriptor).to.have.property('code').that.is.a("string");
                }))

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor.code' should be equal to ${ele?.code}`, function () {
                    expect(tag.descriptor.code).to.equal(ele?.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}]' should contain a property 'display' which is a boolean`, function () {
                    expect(tag).to.have.property('display').that.is.a("boolean");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}]' should have a property 'list' which is an array`, function () {
                    expect(tag).to.have.property('list').that.is.an("array");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should not be empty`, function () {
                    expect(tag.list).to.be.an('array').that.is.not.empty;
                }));

                if (ele?.code === "BUYER_FINDER_FEES") {
                    const buyerFinderFeesFixed = ["BUYER_FINDER_FEES_TYPE", "BUYER_FINDER_FEES_AMOUNT"]
                    const buyerFinderFeesPercent = ["BUYER_FINDER_FEES_TYPE", "BUYER_FINDER_FEES_PERCENTAGE"]

                    const buyerFinderFeesType = tag?.list?.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE");

                    let buyerFinderFeeArr;
                    switch (buyerFinderFeesType?.descriptor?.code) {
                        case "amount":
                            buyerFinderFeeArr = buyerFinderFeesFixed;
                            break;
                        default:
                            buyerFinderFeeArr = buyerFinderFeesPercent;
                            break;
                    }

                    if (buyerFinderFeeArr && buyerFinderFeeArr.length > 0) {
                        buyerFinderFeeArr.forEach((it) => {
                            const listItemIndex = tag?.list?.findIndex((listItem) => listItem?.descriptor?.code === it);

                            if (it === 'BUYER_FINDER_FEES_TYPE') {
                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should contain ${it}`, function () {
                                        expect(listItemIndex, `'message.order.payments[${z}].tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                    }));
                                }
                            } else {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should contain ${it}`, function () {
                                    expect(listItemIndex, `'message.order.payments[${z}].tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                }));
                            }

                            if (listItemIndex !== -1 && tag?.list[listItemIndex]) {
                                const listItem = tag?.list[listItemIndex];

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'descriptor' which is an object`, function () {
                                    expect(listItem).to.have.property('descriptor').that.is.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have property 'code' which is a string`, function () {
                                    expect(listItem.descriptor).to.have.property('code').that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to ${it}`, function () {
                                    expect(listItem.descriptor.code).to.equal(it);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string`, function () {
                                    expect(listItem).to.have.property('value').that.is.a("string");
                                }));
                            }
                        })
                    }
                }

                if (ele?.code === "SETTLEMENT_TERMS") {
                    const settlementTermsArr = ["SETTLEMENT_WINDOW", "SETTLEMENT_BASIS", "MANDATORY_ARBITRATION", "COURT_JURISDICTION", "SETTLEMENT_AMOUNT", "STATIC_TERMS", "SETTLEMENT_TYPE"];

                    if (settlementTermsArr && settlementTermsArr.length > 0) {
                        settlementTermsArr.forEach((it) => {
                            const listItemIndex = tag?.list?.findIndex((listItem) => listItem?.descriptor?.code === it);

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should contain ${it}`, function () {
                                expect(listItemIndex, `'message.order.payments[${z}].tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                            }));

                            if (listItemIndex !== -1 && tag?.list[listItemIndex]) {
                                const listItem = tag?.list[listItemIndex];

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'descriptor' which is an object`, function () {
                                    expect(listItem).to.have.property('descriptor').that.is.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have property 'code' which is a string`, function () {
                                    expect(listItem.descriptor).to.have.property('code').that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to ${it}`, function () {
                                    expect(listItem.descriptor.code).to.equal(it);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string`, function () {
                                    expect(listItem).to.have.property('value').that.is.a("string");
                                }));

                                switch (listItem?.descriptor?.code) {
                                    case "SETTLEMENT_WINDOW":
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be in a valid ISO format ${listItem?.descriptor?.code}`, function () {
                                            expect(listItem?.value).to.exist.and.to.match(iso8601DurationRegex);
                                        }));
                                        if (payment?.collected_by !== "BPP") {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should be equal to the one sent in 'init' call from buyer ${listItem?.descriptor?.code}`, function () {
                                                expect(listItem).to.exist.and.to.deep.equal(settlementWindow);
                                            }));
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            }
                        })
                    }
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
}

function billingTests(messageTestSuite, message) {
    try {
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing' which is an object ( OPTIONAL)", function () {
            expect(message.order.billing).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.name' which is a string(OPTIONAL)", function () {
            expect(message.order.billing.name).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.email' which is a string(OPTIONAL)", function () {
            expect(message.order.billing.email).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.phone' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.phone).to.exist.and.to.be.a("string");
        }));
    } catch (err) {
        console.log(err);
    }
}

function cancellationTermsTests(messageTestSuite, message, type) {
    try {
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation_terms' and that should be an array (OPTIONAL)", function () {
            expect(message.order.cancellation_terms).to.exist.that.is.an("array");
        }));
        if (message?.order?.cancellation_terms && message?.order?.cancellation_terms?.length > 0) {
            if (type === "METRO") {
                message.order.cancellation_terms.forEach((C_terms, C_termsIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}]' and that should be an object (OPTIONAL)`, function () {
                        expect(C_terms).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref' and that should be an object (OPTIONAL)`, function () {
                        expect(C_terms.external_ref).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.mimetype' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.external_ref.mimetype).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.url' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.external_ref.url).to.exist.that.is.a("string");
                    }));
                })
            } else {
                message.order.cancellation_terms.forEach((C_terms, C_termsIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${C_termsIndex}] should have a property 'cancel_by' (OPTIONAL)`, function () {
                        expect(C_terms).to.have.property('cancel_by');
                        expect(C_terms.cancel_by).to.have.property('duration');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${C_termsIndex}].cancel_by.duration' should be a valid ISO 8601 duration string (OPTIONAL)`, function () {
                        expect(C_terms.cancel_by.duration).to.match(iso8601DurationRegex);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.percentage' should be a string (OPTIONAL)`, function () {
                        expect(C_terms).to.have.property('cancellation_fee');
                        expect(C_terms.cancellation_fee).to.have.property('percentage');
                        expect(C_terms.cancellation_fee.percentage).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.percentage' should be a string representing a percentage (OPTIONAL)`, function () {
                        expect(C_terms.cancellation_fee.percentage).to.be.a('string');
                        expect(Number(C_terms.cancellation_fee.percentage)).to.be.at.least(0);
                    }));
                })
            }
        }
    } catch (err) {
        console.log(err);
    }
}

function quoteTests(messageTestSuite, message) {
    try {
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote' which is an object", function () {
            expect(message.order.quote).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price' which is an object", function () {
            expect(message.order.quote.price).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price.value' which is a string", function () {
            expect(message.order.quote.price.value).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price.currency' which is a string", function () {
            expect(message.order.quote.price.currency).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.breakup' which is an array", function () {
            expect(message.order.quote.breakup).to.exist.and.to.be.an("array");
        }));

        const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
            return total + parseFloat(item.price.value);
        }, 0);

        const roundedTotal = Math.round(totalBreakupPrice * 100) / 100;

        const quotePriceValue = parseFloat(message?.order?.quote?.price?.value);

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
            expect(quotePriceValue).to.be.oneOf([roundedTotal, Math.floor(roundedTotal), Math.ceil(roundedTotal)]);
        }));

        if (message?.order?.quote?.breakup && message?.order?.quote?.breakup.length > 0) {
            message.order.quote.breakup.forEach((breakup, breakupIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}]' which is an object`, function () {
                    expect(breakup).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].title' which is a string`, function () {
                    expect(breakup.title).to.exist.and.to.be.a("string");
                }));
                if (breakup?.item) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item' which is an object (OPTIONAL)`, function () {
                        expect(breakup.item).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.id' which is a string (OPTIONAL)`, function () {
                        expect(breakup.item.id).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.price' which is an object`, function () {
                        expect(breakup.item.price).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.price.currency' which is a string`, function () {
                        expect(breakup.item.price.currency).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.price.value' which is a string`, function () {
                        expect(breakup.item.price.value).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.quantity' which is an object`, function () {
                        expect(breakup.item.quantity).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.quantity.selected' which is an object`, function () {
                        expect(breakup.item.quantity.selected).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].item.quantity.selected.count' which is an integer`, function () {
                        expect(breakup.item.quantity.selected.count).to.exist.and.to.be.a("number");
                    }));
                }
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].price' which is an object`, function () {
                    expect(breakup.price).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].price.currency' which is a string (OPTIONAL)`, function () {
                    expect(breakup.price.currency).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.quote.breakup[${breakupIndex}].price.value' which is a string (OPTIONAL)`, function () {
                    expect(breakup.price.value).to.exist.and.to.be.a("string");
                }));
            })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    providerTests,
    orderTagsTests,
    orderPaymentTags,
    billingTests,
    cancellationTermsTests,
    quoteTests,
    firstActionLog,
    lastActionLog,
    paymentsCommonTests,
    itemCommonTests
}