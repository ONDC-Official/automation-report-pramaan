const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const response_verification = require("../../centralizedUtilities/responseVerification");

module.exports = async function select({ context, message } = {}, step, testCaseId, flowId, logs = [],constants ={}) {
    try {
        let testcaseCounter = 1;

        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };
        const testSuite = new Mocha.Suite(`select (${step}) Request Verification`);
        contextTests(context, "select", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        const responseTestSuite = response_verification({ context, message }, logs,constants);

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify the presence of 'message' object`, function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message' should have a property named 'order' which is an object`, function () {
            expect(message).to.have.property("order").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order' should have a property named 'provider' which is an object`, function () {
            expect(message.order).to.have.property("provider").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider' should have a property named 'id' which is a string`, function () {
            expect(message.order.provider).to.have.property("id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order' should have a property named 'items' which is an array`, function () {
            expect(message.order).to.have.property("items").that.is.an("array");
        }));

        if (message?.order?.items && message?.order?.items?.length > 0) {
            message.order.items.forEach((item, itemIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}]' should have a property named 'id' which is a string`, function () {
                    expect(item).to.have.property("id").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}]' should have a property named 'quantity' which is an object`, function () {
                    expect(item).to.have.property("quantity").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}].quantity' should have a property named 'selected' which is an object`, function () {
                    expect(item.quantity).to.have.property("selected").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}].quantity.selected' should have a property named 'measure' which is an object`, function () {
                    expect(item.quantity.selected).to.have.property("measure").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}].quantity.selected.measure' should have a property named 'value' which is a string`, function () {
                    expect(item.quantity.selected.measure).to.have.property("value").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}].quantity.selected.measure' should have a property named 'unit' which is a string`, function () {
                    expect(item.quantity.selected.measure).to.have.property("unit").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${itemIndex}].fulfillment_ids' (OPTIONAL): if present, should be a non-empty array of strings`, function () {
                    if (item.hasOwnProperty("fulfillment_ids")) {
                        expect(item.fulfillment_ids).to.be.an("array").that.is.not.empty;
                        item.fulfillment_ids.forEach((id) => {
                            expect(id).to.be.a("string");
                        });
                    }
                }));
            });
        }

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order' should have a property named 'fulfillments' which is an array`, function () {
            expect(message.order).to.have.property("fulfillments").that.is.an("array");
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}]' should have a property named 'id' which is a string`, function () {
                    expect(fulfillment).to.have.property("id").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}]' should have a property named 'type' which is a string`, function () {
                    expect(fulfillment).to.have.property("type").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}]' should have a property named 'customer' which is an object`, function () {
                    expect(fulfillment).to.have.property("customer").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].customer' should have a property named 'person' which is an object`, function () {
                    expect(fulfillment.customer).to.have.property("person").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].customer.person' should have a property named 'id' which is a string`, function () {
                    expect(fulfillment.customer.person).to.have.property("id").that.is.a("string");
                }));

                if (flowId == "INVESTMENT_7") {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].customer.person' should have a property 'creds' which is an array`, function () {
                        expect(fulfillment.customer.person).to.have.property("creds").that.is.an("array");
                    }));

                    fulfillment.customer.person.creds.forEach((cred, credIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credIndex}]' should have properties 'id' and 'type'`, function () {
                            expect(cred).to.have.property("id").that.is.a("string");
                            expect(cred).to.have.property("type").that.is.a("string");
                        }));
                    });
                }

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}]' should have a property named 'agent' which is an object`, function () {
                    expect(fulfillment).to.have.property("agent").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].agent' should have a property named 'person' which is an object`, function () {
                    expect(fulfillment.agent).to.have.property("person").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].agent.person' should have a property named 'id' which is a string (OPTIONAL) `, function () {
                    expect(fulfillment.agent.person).to.have.property("id").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}]' should have a property named 'organization' which is an object`, function () {
                    expect(fulfillment.agent).to.have.property("organization").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].agent.organization' should have a property named 'creds' which is an array`, function () {
                    expect(fulfillment.agent.organization).to.have.property("creds").that.is.an("array");
                }));

                fulfillment.agent.organization.creds.forEach((cred, credIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].agent.organization.creds[${credIndex}]' should have a property named 'id' which is a string`, function () {
                        expect(cred).to.have.property("id").that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${fulfillmentIndex}].agent.organization.creds[${credIndex}]' should have a property named 'type' which is a string`, function () {
                        expect(cred).to.have.property("type").that.is.a("string");
                    }));
                });

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
        }

        if (step === 'II' || step === 'III' || step === 'IV') {

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.xinput' should be an object`, function () {
                expect(message.order).to.have.property("xinput").that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.xinput' should have a property named 'form' which is an object`, function () {
                expect(message.order.xinput).to.have.property("form").that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.xinput.form' should have a property named 'id' which is a string (OPTIONAL)`, function () {
                expect(message.order.xinput.form).to.have.property("id").that.is.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.xinput' should have a property named 'form_response' which is an object`, function () {
                expect(message.order.xinput).to.have.property("form_response").that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.xinput.form_response' should have a property named 'submission_id' which is a string (OPTIONAL)`, function () {
                expect(message.order.xinput.form_response).to.have.property("submission_id").that.is.a("string");
            }));
        }

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order' should have a property named 'tags' which is an array`, function () {
            expect(message.order).to.have.property("tags").that.is.an("array");
        }));

        if (message?.order?.tags && message?.order?.tags.length > 0) {
            message.order.tags.forEach((tag, tagIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}]' should have a property named 'display' which is a boolean`, function () {
                    expect(tag).to.have.property("display").that.is.a("boolean");
                }));
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}]' should have a property named 'descriptor' which is an object`, function () {
                    expect(tag).to.have.property("descriptor").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                    expect(tag.descriptor).to.have.property("name").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                    expect(tag.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}]' should have a property named 'list' which is an array`, function () {
                    expect(tag).to.have.property("list").that.is.an("array");
                }));

                tag.list.forEach((listItem, listItemIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].list[${listItemIndex}]' should have a property named 'descriptor' which is an object`, function () {
                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].list[${listItemIndex}]' should have a property named 'value' which is a string`, function () {
                        expect(listItem).to.have.property("value").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                        expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                    }));

                });
            });
        }

        return [testSuite, responseTestSuite];
    } catch (error) {
        console.log(error);
        return error;
    }
}
