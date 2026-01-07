const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const searchSchema = require("./schema/search.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function searchMessageTests(message, testCaseId, flowId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, searchSchema, "Verification of Message");

        let testcaseCounter = 1001;
        const getNextTestcaseId = () => testcaseCounter++;

        // payment & fulfillment.authorization tests
        if (message?.intent?.fulfillment?.start?.authorization) {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.fulfillment' should be a non-empty object`, function () {
                expect(message.intent.fulfillment).to.exist.and.to.be.a("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.fulfillment.start.authorization' should be an object`, function () {
                expect(message.intent.fulfillment.start.authorization).to.exist.and.to.be.a("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.fulfillment.start.authorization.type' should be a string`, function () {
                expect(message.intent.fulfillment.start.authorization.type).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.fulfillment.end.authorization' should be an object`, function () {
                expect(message.intent.fulfillment.end.authorization).to.exist.and.to.be.a("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.fulfillment.end.authorization.type' should be a string`, function () {
                expect(message.intent.fulfillment.end.authorization.type).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment' should be a non-empty object`, function () {
                expect(message.intent.payment).to.exist.and.to.be.a("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.@ondc/org/collection_amount' should be a string (Optional)`, function () {
                expect(message.intent.payment["@ondc/org/collection_amount"]).to.be.a("string");
            }));
        }

        // category id checks
        const categoryFlowMap = [
            { flowId: "LOG10_1", expected: "Standard Delivery" },
            { flowId: "LOG10_2", expected: "Same Day Delivery" },
            { flowId: "LOG10_3", expected: "Next Day Delivery" },
            { flowId: "LOG10_4", expected: "Immediate Delivery" },
            { flowId: "LOG10_5", expected: "Express Delivery" }
        ];

        categoryFlowMap.forEach(({ flowId: mappedFlowId, expected }) => {
            if (flowId === mappedFlowId) {
                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_04] message.intent.category.id should be '${expected}'`, function () {
                    const categoryId = message?.intent?.category?.id;
                    expect(categoryId, `Expected categoryId '${expected}', but got '${categoryId}'`).to.equal(expected);
                }));
            }
        });

        // fulfillment.tags checks (same as before).
        if (Array.isArray(message?.intent?.fulfillment?.tags)) {
            const tags = message.intent.fulfillment.tags;

            const commonTagArr = [
                { code: "linked_provider", list: [{ code: "id" }, { code: "name" }] },
                {
                    code: "linked_order", list: [
                        { code: "currency" }, { code: "declared_value" }, { code: "category" },
                        { code: "weight_unit" }, { code: "weight_value" },
                        { code: "dim_unit" }, { code: "length" }, { code: "breadth" }, { code: "height" }
                    ]
                }
            ];

            const enhTagArr = [
                { code: "linked_provider", list: [{ code: "id" }, { code: "name" }] },
                {
                    code: "fulfill_request", list: [
                        { code: "order_count" }, { code: "rate_basis" }, { code: "motorable_distance" },
                        { code: "pickup_slot_start" }, { code: "pickup_slot_end" },
                        { code: "delivery_slot_start" }, { code: "delivery_slot_end" }
                    ]
                }
            ];

            let tagArrToUse = flowId === "LOG_ENH_006" ? enhTagArr : commonTagArr;

            tagArrToUse.forEach(tag => {
                const tagIndex = tags.findIndex(t => t?.code === tag.code);
                const tagItem = tags?.[tagIndex];

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_34] 'intent.fulfillment.tags' should contain object with code '${tag.code}'`, function () {
                    expect(tagItem).to.exist.and.to.be.an("object");
                }));

                if (tagItem) {
                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_35] 'message.intent.fulfillment.tags${tagIndex}].code' should be '${tag.code}'`, function () {
                        expect(tagItem.code).to.equal(tag.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_36] 'message.intent.fulfillment.tags${tagIndex}].list' should be a non-empty array`, function () {
                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    }));

                    tag.list.forEach(listItem => {
                        const listIndex = tagItem.list.findIndex(entry => entry?.code === listItem.code);
                        const actualListItem = tagItem.list?.[listIndex];

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_37] 'message.intent.fulfillment.tags${tagIndex}].list' should include code '${listItem.code}'`, function () {
                            expect(actualListItem).to.exist.and.to.be.an("object");
                        }));

                        if (actualListItem) {
                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_38] 'message.intent.fulfillment.tags${tagIndex}].list[${listIndex}].code' should be '${listItem.code}'`, function () {
                                expect(actualListItem.code).to.equal(listItem.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_39] 'message.intent.fulfillment.tags${tagIndex}].list[${listIndex}].value' should be a non-empty string`, function () {
                                expect(actualListItem.value).to.be.a("string").that.is.not.empty;
                            }));
                        }
                    });
                }
            });
        }

        //fulfillment.end checks
        if (message?.intent?.fulfillment?.end) {
            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_27] 'message.intent.fulfillment.end' should be an object`, function () {
                expect(message.intent.fulfillment.end).to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_28] 'message.intent.fulfillment.end.location' should be an object`, function () {
                expect(message.intent.fulfillment.end.location).to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_29] 'message.intent.fulfillment.end.location.gps' should be a non-empty string`, function () {
                expect(message.intent.fulfillment.end.location?.gps).to.be.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_30] 'message.intent.fulfillment.end.location.address' should be an object`, function () {
                expect(message.intent.fulfillment.end.location?.address).to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_search_message_31] 'message.intent.fulfillment.end.location.address.area_code' should be a non-empty string`, function () {
                expect(message.intent.fulfillment.end.location?.address?.area_code).to.be.a("string").that.is.not.empty;
            }));
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function search({ context, message }, testCaseId, flowId, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("search request verification");

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(searchMessageTests(message, testCaseId, flowId));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
};