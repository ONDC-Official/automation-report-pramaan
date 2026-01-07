const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");

module.exports = async function updateFulfillment({ context, message } = {}) {
    try {
        const testSuite = new Mocha.Suite("Update Fulfillment Request Verification");

        contextTests(context, "update", testSuite);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of message");

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message' in the request body is not null and undefined", function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.update_target' is 'fulfillment'", function () {
            expect(message.update_target).to.be.equal("fulfillment");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message' has a property 'order'", function () {
            expect(message).to.have.a.property("order");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order' has a property 'id'", function () {
            expect(message.order).to.have.property("id");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order' has a property 'fulfillments' which is an array", function () {
            expect(message.order).to.have.property("fulfillments").which.is.an("array");
        }));

        message?.order?.fulfillments.forEach((fulfillment, index) => {
            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.fulfillments[${index}]' is an object`, function () {
                expect(fulfillment, `'fulfillments[${index}]' should be an object`).to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.fulfillments[${index}].customer' is an object`, function () {
                expect(fulfillment.customer, `'fulfillments[${index}].customer' should be an object`).to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.fulfillments[${index}].customer.contact' is an object`, function () {
                expect(fulfillment.customer.contact, `'fulfillments[${index}].customer.contact' should be an object`).to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.fulfillments[${index}].customer.contact.phone' is a string`, function () {
                expect(fulfillment.customer.contact.phone, `'fulfillments[${index}].customer.contact.phone' should be a string`).to.be.a("string");
            }));
        });

        return testSuite;
    } catch (error) {
        console.log(error);
        return error;

    }
}
