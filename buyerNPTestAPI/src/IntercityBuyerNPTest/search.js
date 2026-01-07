const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const response_verification = require("../centralizedUtilities/responseVerification");

function runResponseVerification(context, message, logs, constants) {
    return response_verification({ context, message }, logs, constants);
}
async function search({ context, message } = {}, step, logs = [], constants = {}) {
    try {

        const testSuite = new Mocha.Suite(`search (${step}) Request Verification`);
        contextTests(context, "search", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        let responseTestSuite;
        switch (step) {
            case "II":
            case "III":
            case "IV":
                responseTestSuite = runResponseVerification(context, message, logs, constants);
                break;
            default:
                break;
        }
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent' which is an object", function () {
            expect(message.intent).to.exist.and.to.be.an("object");
        }));
        // //message.intent.fulfillment
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment' which is an object", function () {
            expect(message.intent.fulfillment).to.exist.and.to.be.an("object");
        }));
        if (step === "III") {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.id' which is a string", function () {
                expect(message.intent.fulfillment.id).to.exist.and.to.be.a("string");
            }));
        }
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.stops' which is an array", function () {
            expect(message.intent.fulfillment.stops).to.exist.and.to.be.an("array");
        }));
        if (message?.intent?.fulfillment?.stops && message?.intent?.fulfillment?.stops.length > 0) {
            message.intent.fulfillment.stops.forEach((stopItem, stopIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}]' which is an object`, function () {
                    expect(stopItem).to.exist.and.to.be.an("object");
                }));
                if (step === "III") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].id' which is a string`, function () {
                        expect(stopItem.id).to.exist.and.to.be.a("string");
                    }));
                }
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].type' which is a string`, function () {
                    expect(stopItem.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["START", "PICKUP", "DROP", "END", "INTERMEDIATE_STOP", "TRANSIT_STOP"]);
                }));
                if (stopItem?.location) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location' which is an object`, function () {
                        expect(stopItem.location).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location.descriptor' which is an object`, function () {
                        expect(stopItem.location.descriptor).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location.descriptor.code' which is a string (OPTIONAL)`, function () {
                        expect(stopItem.location.descriptor.code).to.exist.and.to.be.a("string");
                    }));
                }
                if (step === "II") {
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
                }
            })
        }
        if (message?.intent?.fulfillment?.vehicle) {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.vehicle' which is an object", function () {
                expect(message.intent.fulfillment.vehicle).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.vehicle.category' which is a string", function () {
                expect(message.intent.fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.oneOf(["BUS", "AIRLINE", "CAB", "AUTO_RICKSHAW", "METRO"]);
            }));
        }
        //message.intent.provider
        if (step === "III") {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.provider' which is an object", function () {
                expect(message.intent.provider).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.provider.id' which is a string", function () {
                expect(message.intent.provider.id).to.exist.and.to.be.a("string");
            }));
        }
        //message.intent.payment
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.payment' which is an object", function () {
            expect(message.intent.payment).to.exist.and.to.be.an("object");
        }));
        const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }];
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
        if (responseTestSuite) {
            return [testSuite, responseTestSuite];
        } else { return [testSuite] }
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    search
};









