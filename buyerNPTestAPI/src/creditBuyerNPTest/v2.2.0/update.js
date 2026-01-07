const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");
async function update({ context, message } = {}, step, testCaseId, logs = []) {
    const testSuite = new Mocha.Suite(`Update (${step}) Request (Fulfillment Monitoring Consent) Verification`);
    try {
        contextTests(context, "update", testSuite, logs);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of message");


        let testcaseCounter = 1;

        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };


        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message' in the request body is not null and undefined`, function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.update_target' is 'fulfillment'`, function () {
            expect(message.update_target).to.be.equal("fulfillments");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message' has a property 'order' which is an object`, function () {
            expect(message).to.have.a.property("order").which.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.order' has a property 'id'`, function () {
            expect(message.order).to.have.property("id");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.order' has a property 'fulfillments' which is an array`, function () {
            expect(message.order).to.have.property("fulfillments").which.is.an("array");
        }));

        message?.order?.fulfillments.forEach((ele, index) => {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.order.fulfillments[${index}]' has a property 'state'`, function () {
                expect(ele).to.exist;
                expect(ele).to.have.property("state");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.order.fulfillments[${index}].state' has a property 'descriptor'`, function () {
                expect(ele.state).to.exist;
                expect(ele.state).to.have.property('descriptor');
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.order.fulfillments[${index}].state.descriptor' has a property 'code' which is equal to 'DELIVERED'`, function () {
                expect(ele.state.descriptor).to.exist;
                expect(ele.state.descriptor).to.have.property('code').which.is.equal('DELIVERED');
            }));
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.order.fulfillments[${index}]' has a property 'id'`, function () {
                expect(ele).to.have.property("id");
            }));
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'message.order.fulfillments[${index}].id' is not empty`, function () {
                expect(ele.id).to.be.a("string").and.not.be.empty;
            }));
        });

        return testSuite;
    } catch (err) {
        testSuite.addTest(new Mocha.Test("update request failed to be verified because of some missing payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return testSuite;
    }
}

module.exports = {
    update
}