const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { providerIdTest } = require("../bussinessTests/mobilityBussiness");
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function select({ context, message } = {},  step,logs = [],constants ={}) {
    try {
        const testSuite = new Mocha.Suite(`Select (${step}) Request Verification`);
        contextTests(context, "select", testSuite, logs);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        const responseTestSuite = response_verification({ context, message }, logs,constants);

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        // message.order.provider
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider' which is an object", function () {
            expect(message.order.provider).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider.id' which is a string", function () {
            expect(message.order.provider.id).to.exist.and.to.be.a("string");
        }));

        providerIdTest(messageTestSuite, { context, message }, logs);

          //message.order.fulfillments
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order' should have a property named 'fulfillments' which is an array`, function () {
            expect(message.order).to.have.property("fulfillments").that.is.an("array");
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' should have a property named 'id' which is a string`, function () {
                    expect(fulfillment).to.have.property("id").that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                    expect(fulfillment.stops).to.exist.and.to.be.an("array");
                }));

                if (fulfillment.stops && fulfillment.stops.length > 0) {
                    fulfillment.stops.forEach((stopItem, stopIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                            expect(stopItem).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                            expect(stopItem.type).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
                            expect(stopItem.time).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.timestamp' which is a string`, function () {
                            expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
                        }));
                    });
                }
            });
        }  //message.order.fulfillments
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order' should have a property named 'fulfillments' which is an array`, function () {
            expect(message.order).to.have.property("fulfillments").that.is.an("array");
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' should have a property named 'id' which is a string`, function () {
                    expect(fulfillment).to.have.property("id").that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                    expect(fulfillment.stops).to.exist.and.to.be.an("array");
                }));

                if (fulfillment.stops && fulfillment.stops.length > 0) {
                    fulfillment.stops.forEach((stopItem, stopIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                            expect(stopItem).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                            expect(stopItem.type).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
                            expect(stopItem.time).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.timestamp' which is a string`, function () {
                            expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
                        }));
                    });
                }
            });
        }

        // message.order.items
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.items' which is an array", function () {
            expect(message.order.items).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message?.order?.items.forEach((item, index) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}]' which is an object`, function () {
                    expect(item).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].id' which is a string`, function () {
                    expect(item.id).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].parent_item_id' which is a string`, function () {
                    expect(item.parent_item_id).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].quantity' which is an object`, function () {
                    expect(item.quantity).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].quantity.selected' which is an object`, function () {
                    expect(item.quantity.selected).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].quantity.selected.count' which is a number`, function () {
                    expect(item.quantity.selected.count).to.exist.and.to.be.a("number");
                }));
                if (item?.add_ons) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons' which is an array`, function () {
                        expect(item.add_ons).to.exist.and.to.be.an("array");
                    }));
                    if (item.add_ons && item.add_ons.length > 0) {
                        item.add_ons.forEach((addOn, addOnIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons[${addOnIndex}]' which is an object`, function () {
                                expect(addOn).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons[${addOnIndex}].id' which is a string`, function () {
                                expect(addOn.id).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons.quantity[${addOnIndex}]' which is an object`, function () {
                                expect(addOn.quantity).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons.quantity.selected[${addOnIndex}]' which is an object`, function () {
                                expect(addOn.quantity.selected).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons.quantity.selected.count[${addOnIndex}]' which is a number`, function () {
                                expect(addOn.quantity.selected.count).to.exist.and.to.be.a("number");
                            }));
                        });
                    }
                }
                 if (item?.xinput) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].xinput' which is a object`, function () {
                        expect(item.xinput).to.exist.and.to.be.a("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].xinput.form' which is a object`, function () {
                        expect(item.xinput.form).to.exist.and.to.be.a("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].xinput.form.id' which is a string`, function () {
                        expect(item.xinput.form.id).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].xinput.form_response' which is a object`, function () {
                        expect(item.xinput.form_response).to.exist.and.to.be.a("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].xinput.form_response.status' which is a string`, function () {
                        expect(item.xinput.form_response.status).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].xinput.form_response.submission_id' which is a string`, function () {
                        expect(item.xinput.form_response.submission_id).to.exist.and.to.be.a("string");
                    }));
                }
            });
        }
        
         return [testSuite, responseTestSuite];
    } catch (error) {
        console.log(error);
        return error;
    }
}
