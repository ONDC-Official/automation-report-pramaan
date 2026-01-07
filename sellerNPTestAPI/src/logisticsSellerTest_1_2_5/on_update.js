const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onUpdateSchema = require("./schema/on_update.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function paymentMessageTests(message, testCaseId, flowId) {

    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    const testSuite = new Mocha.Suite("Search Validation");
    if (flowId === "LOG11_1") {
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.@ondc/org/linked_order' should be a non-empty object`, function () {
            expect(message.order.ondc / org / linked_order).to.exist.and.to.be.a("object");
        }));

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.@ondc/org/linked_order.provider' should be a non-empty object`, function () {
            expect(message.order.ondc / org / linked_order.provider).to.exist.and.to.be.a("object");
        }));
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.@ondc/org/linked_order.provider.descriptor' should be a non-empty object`, function () {
            expect(message.order.ondc / org / linked_order.provider.descriptor).to.exist.and.to.be.a("object");
        }));
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.@ondc/org/linked_order.provider.descriptor.name' should be a non-empty string`, function () {
            expect(message.order.ondc / org / linked_order.provider.descriptor.name).to.exist.and.to.be.a("string");
        }));
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.@ondc/org/linked_order.provider.address.street' should be a non-empty string`, function () {
            expect(message.order.ondc / org / linked_order.provider.address.street).to.exist.and.to.be.a("string");
        }));
    }
    return testSuite;
}

function onUpdateMessageTests({ context, message }, testCaseId, flowId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onUpdateSchema, "Verification of Message");
        messageTestSuite.addSuite(paymentMessageTests(message, testCaseId, flowId));
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_update({ context, message } = {}, logs = [], testCaseId, flowId) {
    try {
        const testSuite = new Mocha.Suite("on_update request verification");
        const constants = { action: "on_update", core_version: "1.2.5", testCaseId, flowId };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onUpdateMessageTests({ context, message }, testCaseId, flowId));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}