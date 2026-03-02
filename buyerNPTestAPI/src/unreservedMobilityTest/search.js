const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function search({ context, message } = {}, step, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`search (${step}) Request Verification`);
        contextTests(context, "search", testSuite, logs);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        function runResponseVerification(context, message, logs, constants) {
            return response_verification({ context, message }, logs, constants);
        }
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
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("should have 'message.intent' property", function () {
            expect(message.intent).to.exist;
            expect(message.intent).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("should have 'message.intent.fulfillment' property", function () {
            expect(message.intent.fulfillment).to.exist;
            expect(message.intent.fulfillment).to.be.an("object");
        }));

        if (step === "II") {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.stops' which is an array", function () {
                expect(message.intent.fulfillment.stops).to.exist.and.to.be.an("array");
            }));
            if (message?.intent?.fulfillment?.stops && message?.intent?.fulfillment?.stops.length > 0) {
                message.intent.fulfillment.stops.forEach((stop, stopIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}]' which is an object`, function () {
                        expect(stop).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].type' which is a string (OPTIONAL)`, function () {
                        expect(stop.type).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location' which is an object`, function () {
                        expect(stop.location).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location.descriptor' which is an object`, function () {
                        expect(stop.location.descriptor).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.stops[${stopIndex}].location.decriptor.code' which is a string (OPTIONAL)`, function () {
                        expect(stop.location.descriptor.code).to.exist.and.to.be.a("string");
                    }));
                });

            }
        }

        messageTestSuite.addTest(new Mocha.Test("should have 'message.intent.fulfillment.vehicle' property", function () {
            expect(message.intent.fulfillment.vehicle).to.exist;
            expect(message.intent.fulfillment.vehicle).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("should have 'message.intent.fulfillment.vehicle.category' property", function () {
            expect(message.intent.fulfillment.vehicle.category).to.exist;
            // expect(message.intent.fulfillment.vehicle.category).to.be.a("string").to.equal("METRO");
            expect(message.intent.fulfillment.vehicle.category).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("should have 'message.intent.payment' property", function () {
            expect(message.intent.payment).to.exist;
            expect(message.intent.payment).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("should have 'message.intent.payment.collected_by' property which is a string (OPTIONAL)", function () {
            expect(message.intent.payment).to.have.property("collected_by").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("should have 'message.intent.payment.collected_by' should be one of 'BAP' or 'BPP' (OPTIONAL)", function () {
            expect(message.intent.payment.collected_by).to.be.oneOf(['BAP', 'BPP']);
        }));

        messageTestSuite.addTest(new Mocha.Test("should have 'message.intent.payment.tags' property", function () {
            expect(message.intent.payment.tags).to.exist;
            expect(message.intent.payment.tags).to.be.an("array").that.is.not.empty;
        }));
        if (message?.intent?.payment?.tags) {
            const arr = [{ code: "BUYER_FINDER_FEES" }, { code: "SETTLEMENT_TERMS" }];

            arr.forEach((ele) => {
                const tagIndex = message?.intent?.payment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele?.code);

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags' should contain ${ele?.code}`, function () {
                    expect(tagIndex, `'message.intent.payment.tags' should contain ${ele?.code}`).to.not.equal(-1);
                }));

                if (tagIndex !== -1) {
                    const tag = message?.intent?.payment?.tags[tagIndex];

                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}]' should contain a property 'descriptor' which is an object`, function () {
                        expect(tag).to.have.property('descriptor').that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].descriptor' should contain a property 'code' which is a string`, function () {
                        expect(tag.descriptor).to.have.property('code').that.is.a("string");
                    }))

                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].descriptor.code' should be equal to ${ele?.code}`, function () {
                        expect(tag.descriptor.code).to.equal(ele?.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}]' should contain a property 'display' which is a boolean`, function () {
                        expect(tag).to.have.property('display').that.is.a("boolean");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}]' should have a property 'list' which is an array`, function () {
                        expect(tag).to.have.property('list').that.is.an("array");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list' should not be empty`, function () {
                        expect(tag.list).to.be.an('array').that.is.not.empty;
                    }));

                    if (ele?.code === "BUYER_FINDER_FEES") {
                        const buyerFinderFeesFixed = ["BUYER_FINDER_FEES_TYPE", "BUYER_FINDER_FEES_AMOUNT"]
                        const buyerFinderFeesPercent = ["BUYER_FINDER_FEES_TYPE", "BUYER_FINDER_FEES_PERCENTAGE"]

                        const buyerFinderFeesType = tag?.list?.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE");

                        let buyerFinderFeeArr;
                        switch (buyerFinderFeesType?.value) {
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

                                if (it === "BUYER_FINDER_FEES_TYPE") {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}]' should contain ${it} (OPTIONAL)`, function () {
                                        expect(listItemIndex, `'message.intent.payment.tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                    }));
                                } else {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}]' should contain ${it}`, function () {
                                        expect(listItemIndex, `'message.intent.payment.tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                    }));
                                }

                                if (listItemIndex !== -1 && tag?.list[listItemIndex]) {
                                    const listItem = tag?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}]' should have property 'descriptor' which is an object`, function () {
                                        expect(listItem).to.have.property('descriptor').that.is.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have property 'code' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property('code').that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to ${it}`, function () {
                                        expect(listItem.descriptor.code).to.equal(it);
                                    }));

                                    if (it === "BUYER_FINDER_FEES_TYPE") {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string and is one of ["percent", "amount"]`, function () {
                                            expect(listItem).to.have.property('value').that.is.a("string").and.to.be.oneOf(["percent", "amount"]);
                                        }));
                                    } else {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string`, function () {
                                            expect(listItem).to.have.property('value').that.is.a("string");
                                        }));
                                    }
                                }
                            })
                        }
                    }

                    if (ele?.code === "SETTLEMENT_TERMS") {
                        const settlementTermsArr = ["DELAY_INTEREST", "STATIC_TERMS"];

                        if (settlementTermsArr && settlementTermsArr.length > 0) {
                            settlementTermsArr.forEach((it) => {
                                const listItemIndex = tag?.list?.findIndex((listItem) => listItem?.descriptor?.code === it);

                                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}]' should contain ${it}`, function () {
                                    expect(listItemIndex, `'message.intent.payment.tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                }));

                                if (listItemIndex !== -1 && tag?.list[listItemIndex]) {
                                    const listItem = tag?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}]' should have property 'descriptor' which is an object`, function () {
                                        expect(listItem).to.have.property('descriptor').that.is.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have property 'code' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property('code').that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to ${it}`, function () {
                                        expect(listItem.descriptor.code).to.equal(it);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string`, function () {
                                        expect(listItem).to.have.property('value').that.is.a("string");
                                    }));
                                }
                            })
                        }
                    }
                }
            })
        }

        if (responseTestSuite) {
            return [testSuite, responseTestSuite];
        } else { return [testSuite] }
    } catch (err) {
        console.log(err);
        return err;
    }
}
