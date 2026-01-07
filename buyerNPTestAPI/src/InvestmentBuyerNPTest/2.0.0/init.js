const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const response_verification = require("../../centralizedUtilities/responseVerification");

module.exports = async function init({ context, message } = {}, testCaseId, flowId, logs = [],constants ={}) {
    try {
        let testcaseCounter = 1;

        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };
        const testSuite = new Mocha.Suite(`init Request Verification`);
        contextTests(context, "init", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        const responseTestSuite = response_verification({ context, message }, logs,constants);

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]Verify the presence of 'message' object`, function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message' should have a property named 'order' which is an object`, function () {
            expect(message).to.have.property("order").that.is.an("object");
        }));

        // Verify 'message.order.provider' properties
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order' should have a property named 'provider' which is an object`, function () {
            expect(message.order).to.have.property("provider").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.provider' should have a property named 'id' which is a string`, function () {
            expect(message.order.provider).to.have.property("id").that.is.a("string");
        }));

        // Verify 'message.order.items' properties
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order' should have a property named 'items' which is an array`, function () {
            expect(message.order).to.have.property("items").that.is.an("array");
        }));

        if (message?.order?.items && message?.order?.items?.length > 0) {
            message.order.items.forEach((item, itemIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}]' should have a property 'id' which is a string`, function () {
                    expect(item).to.have.property("id").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}]' should have a property 'quantity' which is an object`, function () {
                    expect(item).to.have.property("quantity").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}].quantity' should have a property 'selected' which is an object`, function () {
                    expect(item.quantity).to.have.property("selected").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}].quantity.selected' should have a property 'measure' which is an object`, function () {
                    expect(item.quantity.selected).to.have.property("measure").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}].quantity.selected.measure' should have a property named 'value' which is a string`, function () {
                    expect(item.quantity.selected.measure).to.have.property("value").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}].quantity.selected.measure' should have a property named 'unit' which is a string`, function () {
                    expect(item.quantity.selected.measure).to.have.property("unit").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}]' should have a property 'fulfillment_ids' which is an array (OPTIONAL)`, function () {
                    expect(item).to.have.property("fulfillment_ids").that.is.an("array");
                }));
            });
        }

        // Verify 'message.order.fulfillments' properties
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order' should have a property named 'fulfillments' which is an array`, function () {
            expect(message.order).to.have.property("fulfillments").that.is.an("array");
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}]' should have a property 'id' which is a string`, function () {
                    expect(fulfillment).to.have.property("id").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}]' should have a property 'type' which is a string`, function () {
                    expect(fulfillment).to.have.property("type").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}]' should have a property 'customer' which is an object`, function () {
                    expect(fulfillment).to.have.property("customer").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].customer' should have a property 'person' which is an object`, function () {
                    expect(fulfillment.customer).to.have.property("person").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].customer.person' should have a property 'id' which is a string`, function () {
                    expect(fulfillment.customer.person).to.have.property("id").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].customer.person' should have a property 'creds' which is an array`, function () {
                    expect(fulfillment.customer.person).to.have.property("creds").that.is.an("array");
                }));
                if (fulfillment?.customer?.person?.creds) {
                    if (flowId === "INVESTMENT_1" || flowId === "INVESTMENT_2" || flowId === "INVESTMENT_3" || flowId === "INVESTMENT_5" || flowId === "INVESTMENT_6" || flowId === "INVESTMENT_7" || flowId === "INVESTMENT_20") {

                        fulfillment?.customer?.person?.creds.forEach((cred, credIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credIndex}]' should have properties 'id' and 'type'`, function () {
                                expect(cred).to.have.property("id").that.is.a("string");
                                expect(cred).to.have.property("type").that.is.a("string");
                            }));
                        });
                    }
                }

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}]' should have a property 'agent' which is an object`, function () {
                    expect(fulfillment).to.have.property("agent").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].agent' should have a property 'person' which is an object`, function () {
                    expect(fulfillment.agent).to.have.property("person").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].agent.person' should have a property 'id' which is a string (OPTIONAL)`, function () {
                    expect(fulfillment.agent.person).to.have.property("id").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].agent' should have a property 'organization' which is an object`, function () {
                    expect(fulfillment.agent).to.have.property("organization").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].agent.organization' should have a property 'creds' which is an array`, function () {
                    expect(fulfillment.agent.organization).to.have.property("creds").that.is.an("array");
                }));

                fulfillment?.agent?.organization?.creds.forEach((cred, credIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].agent.organization.creds[${credIndex}]' should have properties 'id' and 'type'`, function () {
                        expect(cred).to.have.property("id").that.is.a("string");
                        expect(cred).to.have.property("type").that.is.a("string");
                    }));

                    if (fulfillment.customer?.contact) {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].customer' should have a property named 'contact' which is an object`, function () {
                            expect(fulfillment.customer).to.have.property("contact").that.is.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].customer.contact' should have a property named 'phone' which is a string`, function () {
                            expect(fulfillment.customer.contact).to.have.property("phone").that.is.a("string");
                        }));
                    }

                    if (flowId == "INVESTMENT_7") {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags' should be an array`, function () {
                            expect(fulfillment).to.have.property("tags").that.is.an("array");
                        }));

                        if (fulfillment?.tags && fulfillment.tags.length > 0) {
                            fulfillment.tags.forEach((tag, tagIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should be an object`, function () {
                                    expect(tag).to.be.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have a property named 'descriptor' which is an object`, function () {
                                    expect(tag).to.have.property("descriptor").that.is.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                                    expect(tag.descriptor).to.have.property("name").that.is.a("string");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                    expect(tag.descriptor).to.have.property("code").that.is.a("string");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have a property named 'list' which is an array`, function () {
                                    expect(tag).to.have.property("list").that.is.an("array");
                                }));

                                tag.list.forEach((listItem, listIndex) => {
                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listIndex}]' should be an object`, function () {
                                        expect(listItem).to.be.an("object");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listIndex}]' should have a property named 'descriptor' which is an object`, function () {
                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listIndex}]' should have a property named 'value' which is a string`, function () {
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));
                                });
                            });
                        }
                    }


                    if (flowId !== "INVESTMENT_5" && flowId !== "INVESTMENT_6" && flowId !== "INVESTMENT_7" && flowId !== "INVESTMENT_9" && flowId !== "INVESTMENT_20") {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].stops' should be an array`, function () {
                            expect(fulfillment).to.have.property("stops").that.is.an("array");
                        }));

                        // Tests for 'stops' array
                        if (fulfillment?.stops && fulfillment.stops.length > 0) {
                            fulfillment.stops.forEach((stop, stopIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' should be an object`, function () {
                                    expect(stop).to.be.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' should have a property named 'time' which is an object`, function () {
                                    expect(stop).to.have.property("time").that.is.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' should have a property named 'schedule' which is an object`, function () {
                                    expect(stop.time).to.have.property("schedule").that.is.an("object");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.schedule' should have a property named 'frequency' which is a string (OPTIONAL)`, function () {
                                    expect(stop.time.schedule).to.have.property("frequency").that.is.a("string");
                                }));
                            });
                        }
                    }
                });
            });
        }

        // Verify 'message.order.payments' properties
        if (flowId !== "INVESTMENT_7") {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order' should have a property named 'payments' which is an array`, function () {
                expect(message.order).to.have.property("payments").that.is.an("array");
            }));

            if (message?.order?.payments && message?.order?.payments.length > 0) {
                message.order.payments.forEach((payment, paymentIndex) => {


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

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}]' should have a property 'type' which is a string (OPTIONAL)`, function () {
                        expect(payment).to.have.property("type").that.is.a("string");
                    }));

                    if (flowId === "INVESTMENT_1" || flowId === "INVESTMENT_2" || flowId === "INVESTMENT_3" || flowId === "INVESTMENT_5" || flowId === "INVESTMENT_6" || flowId === "INVESTMENT_20") {

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags' should exist and should be an array that is not empty`, function () {
                            expect(payment.tags).to.exist.and.to.be.an("array").that.is.not.empty;
                        }));

                        const arr = [{ code: "PAYMENT_METHOD", name: "Payment Method" }];

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

                                const PaymentMethodArr = [{ code: "MODE" }];
                                // const settlementTermsArr = [{ code: "DELAY_INTEREST", name: "delay interest" }, { code: "STATIC_TERMS", name: "static terms" }, { code: "SETTLEMENT_AMOUNT", name: "settlement amount" }, { code: "SETTLEMENT_TYPE", name: "settlement type" }, { code: "OFFLINE_CONTRACT", name: "offline contract" }];

                                let array;
                                switch (tagItem?.descriptor?.code) {
                                    case "PAYMENT_METHOD":
                                        array = PaymentMethodArr;
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

                                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty (OPTIONAL)`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));

                                        }
                                    });
                                }
                            }
                        });
                    }
                });

            }
        }

        if (message?.order?.documents && message?.order?.documents.length > 0) {
            message.order.documents.forEach((document, documentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents[${documentIndex}]' should have a property 'descriptor' which is an object`, function () {
                    expect(document).to.have.property("descriptor").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents[${documentIndex}].descriptor' should have properties 'name' and 'code' (OPTIONAL)`, function () {
                    expect(document.descriptor).to.have.property("name").that.is.a("string");
                    expect(document.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents[${documentIndex}]' should have properties 'url' and 'mime_type' (OPTIONAL)`, function () {
                    expect(document).to.have.property("url").that.is.a("string");
                    expect(document).to.have.property("mime_type").that.is.a("string");
                }));
            });
        }

        // Verify 'message.order.tags' properties
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order' should have a property named 'tags' which is an array`, function () {
            expect(message.order).to.have.property("tags").that.is.an("array");
        }));

        if (message?.order?.tags && message?.order?.tags.length > 0) {
            message.order.tags.forEach((tag, tagIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}]' should have a property 'display' which is a boolean`, function () {
                    expect(tag).to.have.property("display").that.is.a("boolean");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}]' should have a property 'descriptor' which is an object`, function () {
                    expect(tag).to.have.property("descriptor").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                    expect(tag.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                    expect(tag.descriptor).to.have.property("name").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}]' should have a property 'list' which is an array`, function () {
                    expect(tag).to.have.property("list").that.is.an("array");
                }));

                tag.list.forEach((listItem, listItemIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].list[${listItemIndex}]' should have a property 'descriptor' which is an object`, function () {
                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                        expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].list[${listItemIndex}]' should have a property 'value' which is a string`, function () {
                        expect(listItem).to.have.property("value").that.is.a("string");
                    }));

                });
            });
        }

        return [testSuite, responseTestSuite];
    } catch (error) {
        console.log(error);
        return error;
    }
};
