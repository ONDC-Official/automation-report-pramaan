const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { providerIdTest } = require('../../bussinessTests/mobilityBussiness');
const response_verification = require("../../centralizedUtilities/responseVerification");

async function select({ context, message } = {}, step, testCaseId, logs = [],constants ={}) {
    const testSuite = new Mocha.Suite(`Select (${step}) Request Verification`);

    contextTests(context, "select", testSuite, logs);

    const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
    const responseTestSuite = response_verification({ context, message }, logs,constants);

    let testcaseCounter = 1;

    const getNextTestcaseId = () => {
        return testcaseCounter++;
    };


    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should have 'message' properties`, function () {
        expect(message, "Request body shouldn't be null and undefined").to.exist;
        expect(message).to.exist;
    }))

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] verify if 'message' has the order property`, function () {
        expect(message).to.have.property("order").that.is.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order' should exist and should be an object`, function () {
        expect(message.order.provider).to.exist.and.to.be.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should verify the content of message - 'message.order.provider'`, function () {
        expect(message.order.provider).to.have.property("id").that.exists;
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] verify that 'message.order.provider.id' should be a string`, function () {
        expect(message.order?.provider?.id, "Provider ID should be a string").to.be.a("string");
    }));

    providerIdTest(messageTestSuite, { context, message }, logs);

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should verify the content of message - 'message.order.items'`, function () {
        expect(message.order?.items, "Order items should exist").to.be.an('array').that.is.not.empty;
    }));

    if (message?.order?.items && message?.order?.items.length > 0) {
        message?.order.items.forEach((item, i) => {

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] verify that 'message.order.items[${i}].id' exists and is a string`, function () {
                expect(item.id, "Item ID should exist").to.exist.and.to.be.a("string");
            }));

            if (step === "II" || step === "III") {

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] verify that 'message.order.items[${i}].xinput.form' is an object and has property 'id'`, function () {
                    expect(item.xinput.form).to.exist.and.to.be.an("object").that.has.property("id");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] verify that 'message.order.items[${i}].form.id' is a string`, function () {
                    expect(item.xinput.form.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${i}].xinput.form_response.status' should be a string`, function () {
                    expect(item.xinput.form_response.status).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${i}].xinput.form_response.submission_id' should be a string`, function () {
                    expect(item.xinput.form_response.submission_id).to.exist.and.to.be.a("string");
                }));
            }
        })
    }

     return [testSuite, responseTestSuite];
}
module.exports = {
    select
}