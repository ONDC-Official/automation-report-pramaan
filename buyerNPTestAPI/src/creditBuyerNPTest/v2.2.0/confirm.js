const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require('./context');
const { providerIdTest } = require('../../bussinessTests/mobilityBussiness');
const response_verification = require("../../centralizedUtilities/responseVerification");

async function confirm({ context, message } = {}, previous_on_init_payment_id = "", testCaseId, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite('Confirm Request Verification');
    try {
        contextTests(context, 'confirm', testSuite, logs);

        const messageTestSuite = Mocha.Suite.create(testSuite, 'Verification of Message');
        const responseTestSuite = response_verification({ context, message }, logs, constants);

        let testcaseCounter = 1;

        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };


        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify the presence of 'message' object`, function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.order.provider.id' exists and is a string`, function () {
            const providerId = message?.order?.provider?.id;
            expect(providerId, "Provider ID should exist and be a string").to.exist.and.to.be.a('string');
        }));

        providerIdTest(messageTestSuite, { context, message }, logs);

        if (message?.order?.items && message?.order?.items.length > 0) {
            message?.order.items.forEach((item, i) => {

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] verify that 'message.order.items[${i}].id' exists and is a string`, function () {
                    expect(item.id, "Item ID should exist").to.exist.and.to.be.a("string");
                }));
            })
        }

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.order.payments' is an array that is not empty`, function () {
            expect(message.order.payments, "'message.order.payments should be a non-empty array'").to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.payments && message?.order?.payments.length > 0) {
            const buyerFinderFeeAndSettlementTermsObj = message?.order?.payments.find((payment) => payment?.tags);

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments' have a payment object containing Buyer Finder Fee and Settlement Terms`, function () {
                expect(buyerFinderFeeAndSettlementTermsObj).to.exist.and.to.be.an("object");
            }));

            message?.order?.payments.forEach((payment, index) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should be an object`, function () {
                    expect(payment).to.exist.and.to.be.an("object");
                }));

                if (payment?.tags) {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].id' should exist and should be a string`, function () {
                        expect(payment.id).to.exist.and.to.be.a("string").that.is.not.empty;
                    }));

                    if (constants?.flow !== "CRD_2B") {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].id' should exist and be equal to the 'payments.id' sent in the last on_init which is ${previous_on_init_payment_id}`, function () {
                            expect(payment.id).to.be.equal(previous_on_init_payment_id);
                        }));
                    }

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].collected_by' should exist and should be a string`, function () {
                        expect(payment.collected_by).to.exist.and.to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].collected_by' should be one of 'BPP' or 'BAP'`, function () {
                        expect(payment.collected_by).to.be.oneOf(["BPP", "BAP"]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].type' should exist and should be a string (OPTIONAL)`, function () {
                        expect(payment.type).to.exist.and.to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].type' should be a valid ENUM (OPTIONAL)`, function () {
                        expect(payment.type).to.be.oneOf(["PRE-ORDER", "PRE-FULFILLMENT", "ON-FULFILLMENT", "POST-FULFILLMENT", "ON-ORDER", "PRE_ORDER", "PRE_FULFILLMENT", "ON_FULFILLMENT", "POST_FULFILLMENT", "ON_ORDER"]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].status' should exist and should be a string (OPTIONAL)`, function () {
                        expect(payment.status).to.exist.and.to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].status' should be one of [ "PAID", "NOT-PAID", "DELAYED", "DEFERRED" ] (OPTIONAL)`, function () {
                        expect(payment.status).to.be.oneOf(["PAID", "NOT-PAID", "DELAYED", "DEFERRED"]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].params' should exist and should be an object (OPTIONAL)`, function () {
                        expect(payment.params).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].params.bank_code' should exist and should be a string that is not empty`, function () {
                        expect(payment.params.bank_code).to.exist.and.to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].params.bank_account_number' should exist and should be a string that is not empty`, function () {
                        expect(payment.params.bank_account_number).to.exist.and.to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].params.virtual_payment_address' should exist and should be a string that is not empty`, function () {
                        expect(payment.params.virtual_payment_address).to.exist.and.to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags' should exist and should be an array that is not empty`, function () {
                        expect(payment.tags).to.exist.and.to.be.an("array").that.is.not.empty;
                    }));

                    const arr = [{ code: "BAP_TERMS" }, { code: "BPP_TERMS" }];

                    arr.forEach((ele) => {
                        const tagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = payment?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                        }));

                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("display").that.is.a("boolean");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].display' should have be equal to false`, function () {
                                expect(tagItem.display).to.be.equal(false);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            const bppTermsArr = [{ code: "BUYER_FINDER_FEES_TYPE" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }, { code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "STATIC_TERMS" }, { code: "SETTLEMENT_AMOUNT" }, { code: "OFFLINE_CONTRACT" }];

                            const bapTermsArr = [{ code: "BUYER_FINDER_FEES_TYPE" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }, { code: "DELAY_INTEREST" }, { code: "STATIC_TERMS" }, { code: "SETTLEMENT_AMOUNT" }, { code: "SETTLEMENT_TYPE" }, { code: "OFFLINE_CONTRACT" }];
                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "BAP_TERMS":
                                    array = bapTermsArr;
                                    break;
                                case "BPP_TERMS":
                                    array = bppTermsArr;
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));

                                        // switch (listItem?.descriptor?.code) {
                                        //     case "SETTLEMENT_AMOUNT":
                                        //         messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}].value' should be equal to ${settlementAmount.toFixed(2)} (SETTLEMENT_AMOUNT)`, function () {
                                        //             expect(listItem.value).to.be.oneOf([settlementAmount.toFixed(2)]);
                                        //         }));
                                        //         break;
                                        //     default:
                                        //         break;
                                        // }
                                    }
                                });
                            }
                        }
                    });
                }
            })
        }

        return [testSuite, responseTestSuite];
    } catch (error) {
        testSuite.addTest(new Mocha.Test("confirm request failed to be verified because of some missing payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return testSuite;
    }
};

module.exports = {
    confirm
}