const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onUpdateSchema = require("./schema/on_update.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");
const {
    lastActionLog,
    verifyProviderIdMatchesSearch,
    verifyItemAndLocationIdsMatchSearch,
    verifyFulfillmentIdsAndCoordsMatchSearch,
    verifyQuotePriceTrail,
    verifyOrderState,
    verifyTimestamps,
    verifyOrderIdMatches,
    verifyReadyToShipTag,
    IMMEDIATE_DELIVERY_FLOW_IDS,
} = require("./orderReferenceChecks");

function paymentMessageTests(message, testCaseId, flowId) {

    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    const testSuite = new Mocha.Suite("Search Validation");
    if (flowId === "LOG11_1") {
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.@ondc/org/linked_order' should be a non-empty object`, function () {
            expect(message.order["@ondc/org/linked_order"]).to.exist.and.to.be.a("object");
        }));

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.@ondc/org/linked_order.provider' should be a non-empty object`, function () {
            expect(message.order["@ondc/org/linked_order"].provider).to.exist.and.to.be.a("object");
        }));
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.@ondc/org/linked_order.provider.descriptor' should be a non-empty object`, function () {
            expect(message.order["@ondc/org/linked_order"].provider.descriptor).to.exist.and.to.be.a("object");
        }));
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.@ondc/org/linked_order.provider.descriptor.name' should be a non-empty string`, function () {
            expect(message.order["@ondc/org/linked_order"].provider.descriptor.name).to.exist.and.to.be.a("string");
        }));
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.@ondc/org/linked_order.provider.address.street' should be a non-empty string`, function () {
            expect(message.order["@ondc/org/linked_order"].provider.address.street).to.exist.and.to.be.a("string");
        }));
    }
    return testSuite;
}

function onUpdateMessageTests({ context, message }, testCaseId, flowId, logs) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onUpdateSchema, "Verification of Message");
        messageTestSuite.addSuite(paymentMessageTests(message, testCaseId, flowId));

        const onSearchLog = lastActionLog(logs, "on_search");
        const confirmLog = lastActionLog(logs, "confirm");
        const updateLog = lastActionLog(logs, "update");
        const onInitLog = lastActionLog(logs, "on_init");
        const isImmediateFlow = IMMEDIATE_DELIVERY_FLOW_IDS.includes(flowId);

        // "update" (the outgoing request the harness itself sent) - GitHub issue #265
        if (updateLog) {
            verifyItemAndLocationIdsMatchSearch(messageTestSuite, updateLog.message, onSearchLog, "'update' request: ");
            verifyFulfillmentIdsAndCoordsMatchSearch(messageTestSuite, updateLog.message, onSearchLog, "'update' request: ");
            verifyOrderState(messageTestSuite, updateLog.message, ["Created", "Accepted"], "'update' request: ");
            if (!isImmediateFlow) {
                verifyReadyToShipTag(messageTestSuite, updateLog.message, "yes", "'update' request: ");
            }
        }

        // on_update (the seller's response) - GitHub issue #265
        verifyProviderIdMatchesSearch(messageTestSuite, message, onSearchLog);
        verifyItemAndLocationIdsMatchSearch(messageTestSuite, message, onSearchLog);
        verifyFulfillmentIdsAndCoordsMatchSearch(messageTestSuite, message, onSearchLog);
        verifyQuotePriceTrail(messageTestSuite, message, onInitLog);
        verifyOrderState(messageTestSuite, message, ["In-progress"]);
        verifyTimestamps(messageTestSuite, message, context, { createdMatchesLog: confirmLog });
        verifyOrderIdMatches(messageTestSuite, message, confirmLog);
        if (!isImmediateFlow) {
            verifyReadyToShipTag(messageTestSuite, message, "yes");
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_update({ context, message } = {}, logs = [], flowId, testCaseId) {
    try {
        const testSuite = new Mocha.Suite("on_update request verification");
        const constants = { action: "on_update", core_version: "1.2.5", testCaseId, flowId };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onUpdateMessageTests({ context, message }, testCaseId, flowId, logs));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}
