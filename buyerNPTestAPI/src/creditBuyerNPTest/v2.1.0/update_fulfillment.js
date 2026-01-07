const Mocha = require("mocha");
const contextTests = require("../v2.1.0/context");
const { expect } = require("chai");

module.exports = async function updateFulfillment({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite("Update Request (Fulfillment Monitoring Consent) Verification");

        contextTests(context, "update", testSuite, logs);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of message");

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message' in the request body is not null and undefined", function() {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.update_target' is 'fulfillment'", function() {
            expect(message.update_target).to.be.equal("fulfillment");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message' has a property 'order'", function() {
            expect(message).to.have.a.property("order");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order' has a property 'id'", function() {
            expect(message.order).to.have.property("id");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order' has a property 'fulfillments' which is an array", function() {
            expect(message.order).to.have.property("fulfillments").which.is.an("array");
        }));

        message?.order?.fulfillments.forEach((ele, index) => {
            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.fulfillments[${index}]' has a property 'state'`, function() {
                expect(ele).to.exist;
                expect(ele).to.have.property("state");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.fulfillments[${index}].state' has a property 'descriptor'`, function() {
                expect(ele.state).to.exist;
                expect(ele.state).to.have.property('descriptor');
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.fulfillments[${index}].state.descriptor' has a property 'code' which is equal to 'APPROVED'`, function() {
                expect(ele.state.descriptor).to.exist;
                expect(ele.state.descriptor).to.have.property('code').which.is.equal('APPROVED');
            }));
        });

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
