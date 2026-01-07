const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");

module.exports = async function search({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite(`Search Request Verification`);
        contextTests(context, "search", testSuite, logs);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent' which is an object", function () {
            expect(message.intent).to.exist.and.to.be.an("object");
        }));

        // message.intent.fulfillment
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment' which is an object", function () {
            expect(message.intent.fulfillment).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.stops' which is an array", function () {
            expect(message.intent.fulfillment.stops).to.exist.and.to.be.an("array");
        }));

        if (message?.intent?.fulfillment?.stops && message.intent.fulfillment.stops.length > 0) {
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

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location.gps' which is a string and valid coordinates`, function () {
                    const gpsValue = stopItem.location.gps;

                    const gpsPattern = /^-?\d{1,3}\.\d{6}, ?-?\d{1,3}\.\d{6}$/;
                    expect(gpsValue).to.exist.and.to.be.a("string");
                    expect(gpsValue).to.match(gpsPattern, "GPS value must be valid coordinates in the format 'lat, long'");
                }));
            });
        }

        // message.intent.payment

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments.collected_by' which is a string`, function () {
            expect(message.intent.payment.collected_by).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.payment' which is an object", function () {
            expect(message.intent.payment).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.payment.tags' which is an array", function () {
            expect(message.intent.payment.tags).to.exist.and.to.be.an("array");
        }));

        const arr = [
            { code: "BUYER_FINDER_FEES", name: "buyer finder fees" },
            { code: "SETTLEMENT_TERMS", name: "settlement terms" }
        ];

        arr.forEach((ele) => {
            const tagIndex = message?.intent?.payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
            const tagItem = message?.intent?.payment?.tags[tagIndex];

            messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags' should have an object of ${ele.code}`, function () {
                expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
            }));

            if (tagIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                    expect(tagItem).to.have.property("display").that.is.a("boolean");
                    expect(tagItem).to.have.property("list").that.is.an("array");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string `, function () {
                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].descriptor.code' should be equal to '${ele.code}' (OPTIONAL)`, function () {
                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].display' should be a boolean (OPTIONAL)`, function () {
                    expect(tagItem.display).to.be.a("boolean");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list' should be a non-empty array`, function () {
                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                }));

                const buyerFinderFeeType = tagItem?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
                const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_PERCENTAGE" }]
                const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];
                const settlementTermsArr = [
                    { code: "DELAY_INTEREST" },
                    { code: "STATIC_TERMS" },
                ];

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

                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}' (OPTIONAL)`, function () {
                                expect(listItem.descriptor.code).to.be.equal(it.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty (OPTIONAL)`, function () {
                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                            }));
                        }
                    });
                }
            }
        });

        return [testSuite];
    } catch (error) {
        console.log(error);
        return error;
    }
}
