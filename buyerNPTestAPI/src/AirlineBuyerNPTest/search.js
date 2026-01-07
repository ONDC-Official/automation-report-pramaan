const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");

module.exports = async function search({ context, message } = {}) {
    try {

        const testSuite = new Mocha.Suite(`search Request Verification`);
        contextTests(context, "search", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent' which is an object", function () {
            expect(message.intent).to.exist.and.to.be.an("object");
        }));
        //message.intent.category
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.category' which is an object", function () {
            expect(message.intent.category).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.category.desriptor' which is an object", function () {
            expect(message.intent.category.descriptor).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.category.desriptor.code' which is a string", function () {
            expect(message.intent.category.descriptor.code).to.exist.and.to.be.a("string");
        }));
        // //message.intent.fulfillment
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment' which is an object", function () {
            expect(message.intent.fulfillment).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.stops' which is an array", function () {
            expect(message.intent.fulfillment.stops).to.exist.and.to.be.an("array");
        }));
        if (message?.intent?.fulfillment?.stops && message?.intent?.fulfillment?.stops.length > 0) {
            message.intent.fulfillment.stops.forEach((stopItem, stopIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}]' which is an object`, function () {
                    expect(stopItem).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].type' which is a string`, function () {
                    expect(stopItem.type).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location' which is an object`, function () {
                    expect(stopItem.location).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location.descriptor' which is an object`, function () {
                    expect(stopItem.location.descriptor).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location.descriptor.code' which is a string`, function () {
                    expect(stopItem.location.descriptor.code).to.exist.and.to.be.a("string");
                }));
                if (stopItem?.time) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].time' which is an object`, function () {
                        expect(stopItem.time).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].time.label' which is a string (OPTIONAL)`, function () {
                        expect(stopItem.time.label).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].time.timestamp' which is a string (OPTIONAL)`, function () {
                        expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
                    }));
                }

            })
        }
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.vahicle' which is an object", function () {
            expect(message.intent.fulfillment.vehicle).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.vahicle.category' which is a string", function () {
            expect(message.intent.fulfillment.vehicle.category).to.exist.and.to.be.a("string");
        }));
        // //message.intent.provider
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.provider' which is an object", function () {
            expect(message.intent.provider).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.provider.item' which is an array", function () {
            expect(message.intent.provider.items).to.exist.and.to.be.an("array");
        }));

        if (message?.intent?.provider?.items && message.intent.provider.items.length > 0) {
            message.intent.provider.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.provider.items[${i}]' which is an object`, function () {
                    expect(item).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.provider.items[${i}].descriptor' which is an object`, function () {
                    expect(item.descriptor).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.provider.items[${i}].descriptor.name' which is a string`, function () {
                    expect(item.descriptor.name).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.provider.items[${i}].descriptor.code' which is a string`, function () {
                    expect(item.descriptor.code).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.provider.items[${i}].quantity' which is an object`, function () {
                    expect(item.quantity).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.provider.items[${i}].quantity.selected' which is an object`, function () {
                    expect(item.quantity.selected).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.provider.items[${i}].quantity.selected.count' which is a number`, function () {
                    expect(item.quantity.selected.count).to.exist.and.to.be.a("number");
                }));
            })
        }
        //message.intent.payment
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.payment' which is an object", function () {
            expect(message.intent.payment).to.exist.and.to.be.an("object");
        }));
        const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];
        arr.forEach((ele) => {
            const tagIndex = message?.intent?.payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
            const tagItem = message?.intent?.payment?.tags[tagIndex];
            messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}]' should have an object of ${ele.code}`, function () {
                expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
            }));

            if (tagIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                    expect(tagItem).to.have.property("display").that.is.a("boolean");
                    expect(tagItem).to.have.property("list").that.is.an("array");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].display' should  be a boolean`, function () {
                    expect(tagItem.display).to.be.a("boolean");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list' should have be a non empty array`, function () {
                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                }));

                const buyerFinderFeeType = tagItem?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
                const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_PERCENTAGE" }]
                const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];
                const settlementTermsArr = [{ code: "DELAY_INTEREST", name: "delay interest" }, { code: "STATIC_TERMS", name: "static terms" }];

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

                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                            expect(listItem).to.exist.and.to.be.an("object");
                        }));

                        if (listItemIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                expect(listItem).to.have.property("descriptor").that.is.an("object");
                                expect(listItem).to.have.property("value").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                expect(listItem.descriptor.code).to.be.equal(it.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                            }));
                        }
                    });
                }
            }
        });
        return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
}









