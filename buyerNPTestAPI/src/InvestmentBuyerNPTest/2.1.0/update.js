const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");

module.exports = async function update({ context, message } = {}, testCaseId, flowId) {
    try {
        let testcaseCounter = 1;
        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };
        const testSuite = new Mocha.Suite(`update Request Verification`);
        contextTests(context, "update", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]Verify the presence of 'message' object`, function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message' should have a property named 'update_target' which is an string`, function () {
            expect(message).to.have.property("update_target").that.is.an("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message' should have a property named 'order' which is an object`, function () {
            expect(message).to.have.property("order").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order' should have a property named 'id' which is an string`, function () {
            expect(message.order).to.have.property("id").that.is.an("string");
        }));
        if (flowId ===
            'INVESTMENT_9'
        ) {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order' should have a property named 'payments' which is an array`, function () {
                expect(message.order).to.have.property("payments").that.is.an("array");
            }));

            if (message?.order?.payments && message?.order?.payments.length > 0) {
                message.order.payments.forEach((payment, paymentIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}]' should have a property 'id' which is a string (OPTIONAL)`, function () {
                        expect(payment).to.be.a("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}]' should have a property 'collected_by' which is a string (OPTIONAL)`, function () {
                        expect(payment).to.have.property("collected_by").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}]' should have a property 'params' which is an object`, function () {
                        expect(payment).to.have.property("params").that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].params' should have a property 'amount' which is a string (OPTIONAL)`, function () {
                        expect(payment.params).to.have.property("amount").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].params' should have a property 'currency' which is a string (OPTIONAL)`, function () {
                        expect(payment.params).to.have.property("currency").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].params' should have a property 'source_bank_code' which is a string (OPTIONAL)`, function () {
                        expect(payment.params).to.have.property("source_bank_code").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].params' should have a property 'source_bank_account_number' which is a string (OPTIONAL)`, function () {
                        expect(payment.params).to.have.property("source_bank_account_number").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].params' should have a property 'source_bank_account_name' which is a string (OPTIONAL)`, function () {
                        expect(payment.params).to.have.property("source_bank_account_name").that.is.a("string");
                    }));

                    if (!flowId == "INVESTMENT_5") {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].params' should have a property 'transaction_id' which is a string`, function () {
                            expect(payment.params).to.have.property("transaction_id").that.is.a("string");
                        }));
                    }

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}]' should have a property 'type' which is a string (OPTIONAL)`, function () {
                        expect(payment).to.have.property("type").that.is.a("string");
                    }));

                    if (flowId === "INVESTMENT_1" || flowId === "INVESTMENT_2" || flowId === "INVESTMENT_3" || flowId === "INVESTMENT_5" || flowId === "INVESTMENT_9" || flowId === "INVESTMENT_6" || flowId === "INVESTMENT_20") {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags' should exist and should be an array that is not empty`, function () {
                            expect(payment.tags).to.exist.and.to.be.an("array").that.is.not.empty;
                        }));

                        const arr = [{ code: "PAYMENT_METHOD" }, { code: "SOURCE_BANK_ACCOUNT" }];

                        arr.forEach((ele) => {
                            const tagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                            const tagItem = payment?.tags[tagIndex];
                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags' should have an object of ${ele.code}`, function () {
                                expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                            }));

                            if (tagIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}]' should have properties named 'descriptor' and 'list'`, function () {
                                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string (OPTIONAL)`, function () {
                                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));

                                const PaymentMethodArr = [{ code: "MODE" }, { code: "AUTH" }];
                                const sourceBankAccountArr = [{ code: "ACCOUNT_TYPE" }];

                                let array;
                                switch (tagItem?.descriptor?.code) {
                                    case "PAYMENT_METHOD":
                                        array = PaymentMethodArr;
                                        break;
                                    case "SOURCE_BANK_ACCOUNT":
                                        array = sourceBankAccountArr;
                                        break;
                                    default:
                                        break;
                                }

                                if (array) {
                                    array.forEach((it) => {
                                        const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                        const listItem = tagItem?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                            expect(listItem).to.exist.and.to.be.an("object");
                                        }));

                                        if (listItemIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                expect(listItem).to.have.property("value").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string (OPTIONAL)`, function () {
                                                expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                            }));

                                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                expect(listItem.descriptor.code).to.be.equal(it.code);
                                            }));

                                            if (it.code === "ACCOUNT_TYPE") {
                                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be a string'`, function () {
                                                    expect(listItem.descriptor.code).to.be.a("string");
                                                }));
                                            }

                                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty (OPTIONAL)`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));

                                            // switch (listItem?.descriptor?.code) {
                                            //     case "SETTLEMENT_AMOUNT":
                                            //         messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}].value' should be equal to ${settlementAmount.toFixed(2)} (SETTLEMENT_AMOUNT)`, function () {
                                            //             expect(listItem.value).to.be.oneOf([ settlementAmount.toFixed(2) ]);
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
                });

            }
        }
        if (flowId === "INVESTMENT_13") {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.fulfillments' which is an array", function () {
                expect(message.order.fulfillments).to.exist.and.to.be.an("array");
            }));


            if (message?.order?.fulfillments && message?.order?.fulfillments?.length > 0) {
                message?.order?.fulfillments?.forEach((fulfillment, fulfillmentIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                        expect(fulfillment).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state' which is an object`, function () {
                        expect(fulfillment.state).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor' which is an object`, function () {
                        expect(fulfillment.state.descriptor).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor.code' which is a string`, function () {
                        expect(fulfillment.state.descriptor.code).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor.name' which is a string`, function () {
                        expect(fulfillment.state.descriptor.name).to.exist.and.to.be.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                        expect(fulfillment.id).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                        expect(fulfillment.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["LUMPSUM", "WITHDRAWL", "SIP", "SWP", "REDEMPTION"]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer' which is an object`, function () {
                        expect(fulfillment.customer).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person' which is an object`, function () {
                        expect(fulfillment.customer.person).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.id' which is a string`, function () {
                        expect(fulfillment.customer.person.id).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds' which is an array`, function () {
                        expect(fulfillment.customer.person.creds).to.exist.and.to.be.an("array");
                    }));

                    if (fulfillment?.customer?.person?.creds && fulfillment?.customer?.person?.creds.length > 0) {
                        fulfillment?.customer?.person?.creds.forEach((credsItem, credsIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credsIndex}]' which is an object`, function () {
                                expect(credsItem).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credsIndex}].id' which is a string`, function () {
                                expect(credsItem.id).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credsIndex}].type' which is a string`, function () {
                                expect(credsItem.type).to.exist.and.to.be.a("string");
                            }));
                        })
                    }

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.contact' which is an object`, function () {
                        expect(fulfillment.customer.contact).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.contact.phone' which is a string`, function () {
                        expect(fulfillment.customer.contact.phone).to.exist.and.to.be.a("string");
                    }));


                    const arr = [{ code: "CANCELLATION_INFO" }]


                    arr.forEach((ele) => {
                        const tagIndex = fulfillment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = fulfillment?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object");
                        }));


                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'(OPTIONAL)`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.name' should be string (OPTIONAL)'`, function () {
                                expect(tagItem.descriptor.name).to.be.a("string");
                            }));



                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));



                            const cancellationInfoArr = [{ code: "REASON_CODE" }, { code: "CANCELLED_BY" }]
                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "CANCELLATION_INFO":
                                    array = cancellationInfoArr
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));


                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be string`, function () {
                                            expect(listItem.descriptor.name).to.be.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));

                                    }
                                });
                            }
                        }
                    });

                })
            }
        }
        return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
};
