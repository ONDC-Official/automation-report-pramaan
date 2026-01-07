const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { providerTests } = require('./commonTest');
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function search({ context, message } = {}, step, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`Search (${step}) Request Verification`);
        contextTests(context, "search", testSuite);
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

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'intent' which is an object", function () {
            expect(message).to.have.property("intent").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.intent' should have a property named 'category' which is an object", function () {
            expect(message.intent).to.have.property("category").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.intent.category' should have a property named 'descriptor' which is an object", function () {
            expect(message.intent.category).to.have.property("descriptor").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if code exists in 'message.intent.category.descriptor' object and is of type string", function () {
            expect(message.intent.category.descriptor?.code, "Category descriptor code should exist and be a string").to.exist.and.to.be.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.intent' should have a property named 'payment' which is an object", function () {
            expect(message.intent).to.have.property("payment").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'collected_by' property exists in 'message.intent.payment' object and is of type string (OPTIONAL)", function () {
            expect(message.intent.payment.collected_by, "Collected by should exist and be a string").to.exist.and.to.be.a('string');
        }));

        const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];

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

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].display' should have be equal to false`, function () {
                    expect(tagItem.display).to.be.equal(false);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.payment.tags[${tagIndex}].list' should have be a non empty array`, function () {
                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                }));


                const buyerFinderFeeType = tagItem?.list?.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
                const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }]
                const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];
                const settlementTermsArr = [{ code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "DELAY_INTEREST" }, { code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];
                let array;
                switch (tagItem.descriptor.code) {
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
                        const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
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
                    })
                }
            }
        });

        if (step === "II") {
            providerTests(message, messageTestSuite);
        }

        if (responseTestSuite) {
            return [testSuite, responseTestSuite];
        } else { return [testSuite] }
    } catch (err) {
        console.log(err);
    }
}



