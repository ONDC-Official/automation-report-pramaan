const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const updateSchema = require("./schema/update.schema");
const { generateTests } = require("./common");

function updateMessageTests(message, testCaseId, flowId, logs) {
    try {
        const messageTestSuite = generateTests(message, updateSchema, "Verification of Message for update");

        if (flowId === "LOG11_1" || flowId === "LOG10_4") {
            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_100]'message.order.fulfillments' should be a non-empty array`, function () {
                expect(message.order.fulfillments).to.exist.and.to.be.a("array").that.is.not.empty;
            }));

            const searchLog = logs?.find(log => log?.request?.context?.action === "search");

            const hasAuthorizationInSearch = !!searchLog?.request?.message?.intent?.fulfillment?.start?.authorization;


            if (message?.order?.fulfillments?.length > 0) {
                message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_1001]'message.order.fulfillments[${fulfillmentIndex}]' should be an object`, function () {
                        expect(fulfillment).to.exist.and.to.be.an("object");
                    }));

                    // testSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_04]'message.order.fulfillments[${fulfillmentIndex}]['@ondc/org/awb_no'] should exist and be a non-empty string`, function () {
                    //     expect(fulfillment["@ondc/org/awb_no"]).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    // }));

                    if (hasAuthorizationInSearch) {
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_1002]'message.order.fulfillments[${fulfillmentIndex}].start.authorization' should be an object`, function () {
                            expect(fulfillment.start?.authorization).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_1003]'message.order.fulfillments[${fulfillmentIndex}].start.authorization.type' should be a string`, function () {
                            expect(fulfillment.start.authorization.type).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_1004]'message.order.fulfillments[${fulfillmentIndex}].start.authorization.token' should be a string`, function () {
                            expect(fulfillment.start.authorization.token).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_1005]'message.order.fulfillments[${fulfillmentIndex}].start.authorization.valid_from' should be a string`, function () {
                            expect(fulfillment.start.authorization.valid_from).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_1006]'message.order.fulfillments[${fulfillmentIndex}].start.authorization.valid_to' should be a string`, function () {
                            expect(fulfillment.start.authorization.valid_to).to.exist.and.to.be.a("string");
                        }));
                    }
                });
            }
        }
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function update({ context, message }, testCaseId, flowId, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("update request verification");
        const constants = { action: "update", core_version: "1.2.5", testCaseId, flowId };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(updateMessageTests(message, testCaseId, flowId, logs));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}