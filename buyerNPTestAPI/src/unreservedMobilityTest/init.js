const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { providerIdTest, settlementTermsListTests } = require("../bussinessTests/mobilityBussiness");
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function init({ context, message } = {}, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`init Request Verification`);

        contextTests(context, "init", testSuite, logs);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        const responseTestSuite = response_verification({ context, message }, logs, constants);

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.items' which is an array", function () {
            expect(message.order.items).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.items && message?.order?.items?.length > 0) {
            message?.order?.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}]' which is an object`, function () {
                    expect(item).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].id' which is a string`, function () {
                    expect(item.id).to.exist.and.to.be.a("string");
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
            })
        }

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider' which is an object", function () {
            expect(message.order.provider).to.exist.and.to.be.an("object");
        }));

        providerIdTest(messageTestSuite, { context, message }, logs);

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider.id' which is a string", function () {
            expect(message.order.provider.id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing' which is an object (OPTIONAL)", function () {
            expect(message.order.billing).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.name (OPTIONAL)' which is a string", function () {
            expect(message.order.billing.name).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.email (OPTIONAL)' which is a string", function () {
            expect(message.order.billing.email).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.phone (OPTIONAL)' which is a string", function () {
            expect(message.order.billing.phone).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payments' which is an array", function () {
            expect(message.order.payments).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.payments && message?.order?.payments.length > 0) {
            message?.order?.payments.forEach((payment, z) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}]' which is an object`, function () {
                    expect(payment).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].collected_by' which is a string`, function () {
                    expect(payment.collected_by).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].collected_by' which is one of "BAP" or "BPP"`, function () {
                    expect(payment.collected_by).to.be.oneOf(["BAP", "BPP"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].status' which is a string`, function () {
                    expect(payment.status).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].type' which is a string`, function () {
                    expect(payment.type).to.exist.and.to.be.a("string");
                }));

                // messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params' which is a object`, function () {
                //     expect(payment.params).to.exist.and.to.be.a("object");
                // }));

                // messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.bank_code' which is a string (OPTIONAL)`, function () {
                //     expect(payment.params.bank_code).to.exist.and.to.be.a("string");
                // }));

                // messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.bank_account_number' which is a string (OPTIONAL)`, function () {
                //     expect(payment.params.bank_account_number).to.exist.and.to.be.a("string");
                // }));

                // messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].params.virtual_payment_address' which is a string (OPTIONAL)`, function () {
                //     expect(payment.params.virtual_payment_address).to.exist.and.to.be.a("string");
                // }));

                const arr = [{ code: "BUYER_FINDER_FEES" }, { code: "SETTLEMENT_TERMS" }];

                arr.forEach((ele) => {
                    const tagIndex = payment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele?.code);

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags' should contain ${ele?.code}`, function () {
                        expect(tagIndex, `'message.order.payment[${z}].tags' should contain ${ele?.code}`).to.not.equal(-1);
                    }));

                    if (tagIndex !== -1) {
                        const tag = payment?.tags[tagIndex];

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}]' should contain a property 'descriptor' which is an object`, function () {
                            expect(tag).to.have.property('descriptor').that.is.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].descriptor' should contain a property 'code' which is a string`, function () {
                            expect(tag.descriptor).to.have.property('code').that.is.a("string");
                        }))

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].descriptor.code' should be equal to ${ele?.code}`, function () {
                            expect(tag.descriptor.code).to.equal(ele?.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}]' should contain a property 'display' which is a boolean`, function () {
                            expect(tag).to.have.property('display').that.is.a("boolean");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}]' should have a property 'list' which is an array`, function () {
                            expect(tag).to.have.property('list').that.is.an("array");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list' should not be empty`, function () {
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

                                    if (it === "BUYER_FINDER_FEES_TYPE") {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should contain ${it} (OPTIONAL)`, function () {
                                            expect(listItemIndex, `'message.order.payment[${z}].tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                        }));
                                    } else {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should contain ${it}`, function () {
                                            expect(listItemIndex, `'message.order.payment[${z}].tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                        }));
                                    }

                                    if (listItemIndex !== -1 && tag?.list[listItemIndex]) {
                                        const listItem = tag?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'descriptor' which is an object`, function () {
                                            expect(listItem).to.have.property('descriptor').that.is.an("object");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have property 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property('code').that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to ${it}`, function () {
                                            expect(listItem.descriptor.code).to.equal(it);
                                        }));

                                        if (it === "BUYER_FINDER_FEES_TYPE") {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string and is one of ["percent", "amount"]`, function () {
                                                expect(listItem).to.have.property('value').that.is.a("string").and.to.be.oneOf(["percent", "amount"]);
                                            }));
                                        } else {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string`, function () {
                                                expect(listItem).to.have.property('value').that.is.a("string");
                                            }));
                                        }
                                    }
                                })
                            }
                        }

                        if (ele?.code === "SETTLEMENT_TERMS") {
                            const settlementTermsArr = ["SETTLEMENT_TYPE", "SETTLEMENT_AMOUNT", "DELAY_INTEREST", "STATIC_TERMS", "COURT_JURISDICTION", "MANDATORY_ARBITRATION"];

                            if (settlementTermsArr && settlementTermsArr.length > 0) {
                                settlementTermsArr.forEach((it) => {
                                    const listItemIndex = tag?.list?.findIndex((listItem) => listItem?.descriptor?.code === it);

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should contain ${it}`, function () {
                                        expect(listItemIndex, `'message.order.payment[${z}].tags[${tagIndex}].list' should contain ${it}`).to.not.equal(-1);
                                    }));

                                    if (listItemIndex !== -1 && tag?.list[listItemIndex]) {
                                        const listItem = tag?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'descriptor' which is an object`, function () {
                                            expect(listItem).to.have.property('descriptor').that.is.an("object");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have property 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property('code').that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to ${it}`, function () {
                                            expect(listItem.descriptor.code).to.equal(it);
                                        }));

                                        if (it === "SETTLEMENT_TYPE") {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string and is one of ["NEFT", "RTGS", "UPI"]`, function () {
                                                expect(listItem).to.have.property('value').that.is.a("string").and.to.be.oneOf(["NEFT", "RTGS", "UPI"]);
                                            }));
                                        } else {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payment[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have property 'value' which is a string`, function () {
                                                expect(listItem).to.have.property('value').that.is.a("string");
                                            }));
                                        }

                                    }
                                })
                            }
                        }
                    }
                })
            })
        }

        // fulfillment
        // messageTestSuite.addTest(new Mocha.Test("should have 'message.order.fulfillments' property", function () {
        //     expect(order.fulfillments, "Expected 'message.order.fulfillments' to exist").to.exist;
        //     expect(order.fulfillments).to.be.an('array').that.is.not.empty;
        // }));

        // if (Array.isArray(message.order.fulfillments) && order.fulfillments.length > 0) {
        //     order.fulfillments.forEach((fulfillment, z) => {
        //         messageTestSuite.addTest(new Mocha.Test(`should have 'message.order.fulfillments[${z}].id' property`, function () {
        //             expect(fulfillment.id, `Expected 'message.order.fulfillments[${z}].id' to exist`).to.exist;
        //             expect(fulfillment.id).to.be.a('string');
        //         }));
        //     });
        // }

        settlementTermsListTests(messageTestSuite, { context, message }, logs);

        return [testSuite, responseTestSuite,];
    } catch (error) {
        console.log(error);
        return error;
    }
}
