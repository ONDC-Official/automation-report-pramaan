const { expect } = require('chai');
const Mocha = require('mocha');
const contextTests = require("./context");
const { providerIdTest } = require("../bussinessTests/mobilityBussiness");
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function select({ context, message } = {}, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`select Request Verification`);
        contextTests(context, "select", testSuite, logs);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        const responseTestSuite = response_verification({ context, message }, logs, constants);

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("should have 'message.order' property", function () {
            expect(message.order).to.exist;
            expect(message.order).to.be.an('object');
        }));

        if (message?.order) {
            const order = message.order;

            messageTestSuite.addTest(new Mocha.Test("should have 'message.order.items' property", function () {
                expect(order.items).to.exist;
                expect(order.items).to.be.an('array').that.is.not.empty;
            }));

            order.items.forEach((item, index) => {
                messageTestSuite.addTest(new Mocha.Test(`should have 'message.order.items[${index}].id' property`, function () {
                    expect(item.id).to.exist;
                    expect(item.id).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`should have 'message.order.items[${index}].quantity' property`, function () {
                    expect(item.quantity).to.exist;
                    expect(item.quantity).to.be.an('object');
                }));

                if (item.quantity && item.quantity.selected) {
                    messageTestSuite.addTest(new Mocha.Test(`should have 'message.order.items[${index}].quantity.selected.count' property which is an integer`, function () {
                        expect(item.quantity.selected.count).to.exist;
                        expect(item.quantity.selected.count).to.be.a('number');
                    }));
                }
            });

            messageTestSuite.addTest(new Mocha.Test("should have 'message.order.provider' property", function () {
                expect(order.provider).to.exist;
                expect(order.provider).to.be.an('object');
            }));

            providerIdTest(messageTestSuite, { context, message }, logs);

            messageTestSuite.addTest(new Mocha.Test("should have 'message.order.provider.id' property", function () {
                expect(order.provider.id).to.exist;
                expect(order.provider.id).to.be.a('string');
            }));

            // fulfillment
            // messageTestSuite.addTest(new Mocha.Test("should have 'message.order.fulfillments' property", function () {
            //     expect(order.fulfillments, "Expected 'message.order.fulfillments' to exist").to.exist;
            //     expect(order.fulfillments).to.be.an('array').that.is.not.empty;
            // }));

            // if (Array.isArray(order.fulfillments) && order.fulfillments.length > 0) {
            //     order.fulfillments.forEach((fulfillment, z) => {
            //         messageTestSuite.addTest(new Mocha.Test(`should have 'message.order.fulfillments[${z}].id' property`, function () {
            //             expect(fulfillment.id, `Expected 'message.order.fulfillments[${z}].id' to exist`).to.exist;
            //             expect(fulfillment.id).to.be.a('string');
            //         }));
            //     });
            // }
        }

        return [testSuite, responseTestSuite,];
    } catch (error) {
        console.log(error);
        return error;
    }
}
