const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("../v2.1.0/context");
const response_verification = require("../../centralizedUtilities/responseVerification");

module.exports = async function search({ context, message } = {}, step, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite(`Search (${step}) Request Verification`);

    contextTests(context, "search", testSuite, logs, constants);

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
    messageTestSuite.addTest(new Mocha.Test("Verify the presence and type of 'message' object", function () {
        expect(message).to.exist;
    }));

    messageTestSuite.addTest(new Mocha.Test("'message' should contain a property 'intent' which is an object", function () {
        expect(message).to.have.property("intent").that.is.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test("'message.intent' should contain a property 'category' which is an object", function () {
        expect(message.intent).to.have.property("category").that.is.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test("'message.intent.category' should contain a property 'descriptor' which is an object", function () {
        expect(message.intent.category).to.have.property("descriptor").that.is.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test("'message.intent.category.descriptor' should contain a property 'code' which is a string", function () {
        expect(message.intent.category.descriptor).to.have.property("code").that.is.a("string");
    }));

    messageTestSuite.addTest(new Mocha.Test("Verify if 'message.intent.category.descriptor' is one of PERSONAL_LOAN or INVOICE_BASED_LOAN", function () {
        expect(message.intent?.category?.descriptor?.code, "Category descriptor code should exist and be a string").to.be.oneOf(["PERSONAL_LOAN", "INVOICE_BASED_LOAN"]);
    }));

    if (step === 'II' || step === 'III') {
        messageTestSuite.addTest(new Mocha.Test("'message.intent' should contain a property 'provider'", function () {
            expect(message.intent).to.have.property("provider").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.intent.provider.id' exists and is of type string (OPTIONAL)", function () {
            const providerId = message?.intent?.provider?.id;
            expect(providerId, "Provider ID should exist and be a string").to.exist.and.to.be.a('string');
        }));

        const providerItems = message?.intent?.provider?.items;

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.intent.provider.items' is an array with at least one item", function () {
            expect(providerItems, "Provider items should exist and be an array").to.exist.and.to.be.an('array').that.is.not.empty;
        }));

        if (providerItems && providerItems.length > 0) {
            providerItems.forEach((item, index) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${index}]' should have a property 'id'`, function () {
                    expect(item).to.have.property("id").that.is.a("string").and.has.a.lengthOf.above(0);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${index}]' should have a property 'xinput' that is an object`, function () {
                    expect(item).to.have.a.property("xinput").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${index}].xinput' should have a property 'form' that is an object`, function () {
                    expect(item.xinput).to.have.a.property("form").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${index}].xinput.form' should have a property 'id' that is a string`, function () {
                    expect(item.xinput.form).to.have.a.property("id").that.is.a("string").and.has.a.lengthOf.above(0);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${index}].xinput' should have a property 'form_response' that is an object`, function () {
                    expect(item.xinput).to.have.a.property("form_response").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${index}].xinput.form_response' should have a properties 'status' and 'submission_id' that are strings`, function () {
                    expect(item.xinput.form_response).to.include.all.keys("status", "submission_id");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.intent.provider.items[${index}].xinput.form_response.status' exists and is of type string (OPTIONAL)`, function () {
                    expect(item.xinput.form_response.status, "'form_response.status' should exist and be a string").to.exist.and.to.be.a('string').that.is.oneOf(["SUCCESS", "APPROVED"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.intent.provider.items[${index}].xinput.form_response.submission_id' exists and is of type string (OPTIONAL)`, function () {
                    expect(item.xinput.form_response.submission_id, "'form_response.submission_id' should exist and be a string").to.exist.and.to.be.a('string');
                }));
            })
        }
    }

    messageTestSuite.addTest(new Mocha.Test("'message.intent' should contain another property 'payment' which is an object", function () {
        expect(message.intent).to.have.property("payment").that.is.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test("Verify if 'collected_by' property exists in 'message.intent.payment' object and is of type string", function () {
        expect(message.intent?.payment?.collected_by, "Collected by should exist and be a string").to.exist.and.to.be.a('string');
    }));

    const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];

    arr.forEach((ele) => {
        const tagIndex = message?.intent?.payment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
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

            const settlementTermsArr = [{ code: "DELAY_INTEREST", name: "delay interest" }, { code: "STATIC_TERMS", name: "static terms" }, { code: "OFFLINE_CONTRACT", name: "offline contract" }];

            const buyerFinderFeeType = tagItem?.list?.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
            const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }]
            const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];

            let array;
            switch (tagItem?.descriptor?.code) {
                case "BUYER_FINDER_FEES":
                    switch (buyerFinderFeeType) {
                        case "amount":
                            array = buyerFinderFeeAmountArr;
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
                    array = [];
                    break;
            }

            array?.forEach((it) => {
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
    });


    if (responseTestSuite) {
        return [testSuite, responseTestSuite];
    } else { return [testSuite] }
};
