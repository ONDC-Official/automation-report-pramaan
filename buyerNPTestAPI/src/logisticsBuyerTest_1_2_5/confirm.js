const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const confirmSchema = require("./schema/confirm.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function paymentMessageTests(message, testCaseId, flowId) {

    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    const testSuite = new Mocha.Suite("Search Validation");
    if (message.order.items.descriptor) {
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items' should be a non-empty array`, function () {
            expect(message.order.items).to.exist.and.to.be.a("array");
        }));
        if (message?.order?.items && message?.order?.items?.length > 0) {
            message?.order?.items.forEach((item, itemIndex) => {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${itemIndex}]' should be an object`, function () {
                    expect(item).to.exist.and.to.be.a("object");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${itemIndex}].descriptor' should be an object`, function () {
                    expect(item.descriptor).to.exist.and.to.be.a("object");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${itemIndex}].descriptor.code' should exist and be a non-empty string`, function () {
                    expect(item.descriptor.code).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
            });
        }

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments' should be a non-empty array`, function () {
            expect(message.order.fulfillments).to.exist.and.to.be.a("array");
        }));
        if (message?.order?.fulfillments && message?.order?.fulfillments?.length > 0) {
            message?.order?.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}]' should be an object`, function () {
                    expect(fulfillment).to.exist.and.to.be.a("object");
                }));

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].@ondc/org/awb_no' should exist and be a non-empty string`, function () {
                    expect(fulfillment.ondc / org / awb_no).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
            });
        }

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payment' should be a non-empty object`, function () {
            expect(message.order.payment).to.exist.and.to.be.a("object");
        }));
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payment.@ondc/org/collection_amount' should be a string`, function () {
            expect(message.order.payment.ondc / org / collection_amount).to.exist.and.to.be.a("string");
        }));
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
    }
    return testSuite;
}

function confirmMessageTests(message, constants, testCaseId, flowId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, confirmSchema, "Verification of Message for Confirm", constants);
        messageTestSuite.addSuite(paymentMessageTests(message, testCaseId, flowId));

        //ItemCategoryID
        const ItemCategoryID = [
            { flowId: "LOG10_1", expected: "Standard Delivery" },
            { flowId: "LOG10_2", expected: "Same Day Delivery" },
            { flowId: "LOG10_3", expected: "Next Day Delivery" },
            { flowId: "LOG10_4", expected: "Immediate Delivery" },
            { flowId: "LOG10_5", expected: "Express Delivery" }
        ];

        ItemCategoryID.forEach(({ flowId: mappedFlowId, expected }) => {
            if (flowId === mappedFlowId) {
                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_12] message.order.items[0].category_id should be '${expected}'`, function () {
                    const categoryId = message?.order?.items?.[0]?.category_id;
                    expect(categoryId, `Expected category_id '${expected}', but got '${categoryId}'`).to.equal(expected);
                }));
            }
        });

        // fullfilments.tags

        {
            if (Array.isArray(message?.order?.fulfillments)) {
                message.order.fulfillments.forEach((fulfillment, fIndex) => {
                    const tags = fulfillment?.tags || [];

                    const commonTagArr = [
                        { code: "linked_provider", list: [{ code: "id" }, { code: "name" }] },
                        {
                            code: "linked_order", list: [
                                { code: "currency" }, { code: "declared_value" },
                                //  { code: "category" },
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
                        }, {
                            code: "state",
                            list: [{ code: "ready_to_ship" }]
                        },
                        {
                            code: "rto_action",
                            list: [{ code: "return_to_origin" }]
                        }
                    ];

                    let tagArrToUse = [];

                    switch (flowId) {
                        case "LOG_ENH_006":
                            tagArrToUse = enhTagArr;
                            break;
                        default:
                            tagArrToUse = commonTagArr;
                            break;
                    }

                    tagArrToUse.forEach(tag => {
                        const tagIndex = tags.findIndex(t => t?.code === tag.code);
                        const tagItem = tags?.[tagIndex];

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_init_message_82] 'message.order.fulfillments[${fIndex}].tags' should contain object with code '${tag.code}'`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object");
                        }));

                        if (tagItem) {
                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_init_message_83] 'message.order.fulfillments[${fIndex}].tags[${tagIndex}].code' should be '${tag.code}'`, function () {
                                expect(tagItem.code).to.equal(tag.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_init_message_84] 'message.order.fulfillments[${fIndex}].tags[${tagIndex}].list' should be a non-empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            tag.list.forEach(listItem => {
                                const listIndex = tagItem.list.findIndex(entry => entry?.code === listItem.code);
                                const actualListItem = tagItem.list?.[listIndex];

                                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_init_message_85] 'message.order.fulfillments[${fIndex}].tags[${tagIndex}].list' should include code '${listItem.code}'`, function () {
                                    expect(actualListItem).to.exist.and.to.be.an("object");
                                }));

                                if (actualListItem) {
                                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_init_message_86] 'message.order.fulfillments[${fIndex}].tags[${tagIndex}].list[${listIndex}].code' should be '${listItem.code}'`, function () {
                                        expect(actualListItem.code).to.equal(listItem.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_init_message_87] 'message.order.fulfillments[${fIndex}].tags[${tagIndex}].list[${listIndex}].value' should be a non-empty string`, function () {
                                        expect(actualListItem.value).to.be.a("string").that.is.not.empty;
                                    }));
                                }
                            });
                        }
                    });
                });
            }
        }

        // fullfilments.end
        {
            if (Array.isArray(message?.order?.fulfillments)) {
                message.order.fulfillments.forEach((fulfillment, fIndex) => {
                    if (fulfillment?.end) {
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_59] ' message.order.fulfillments[${fIndex}].end' should be an object`, function () {
                            expect(fulfillment.end).to.be.an("object");
                        }));

                        // Validate end.person
                        if (fulfillment.end.person) {
                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_73] 'end.person' should be an object`, function () {
                                expect(fulfillment.end.person).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_74] 'end.person.name' should be a non-empty string`, function () {
                                expect(fulfillment.end.person?.name).to.be.a("string").that.is.not.empty;
                            }));
                        }

                        // Validate end.location
                        if (fulfillment.end.location) {
                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_60] 'end.location' should be an object`, function () {
                                expect(fulfillment.end.location).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_61] 'end.location.gps' should be a non-empty string`, function () {
                                expect(fulfillment.end.location?.gps).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_62] 'end.location.address' should be an object`, function () {
                                expect(fulfillment.end.location?.address).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_63] 'end.location.address.name' should be a non-empty string`, function () {
                                expect(fulfillment.end.location?.address?.name).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_64] 'end.location.address.building' should be a non-empty string`, function () {
                                expect(fulfillment.end.location?.address?.building).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_65] 'end.location.address.locality' should be a non-empty string`, function () {
                                expect(fulfillment.end.location?.address?.locality).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_66] 'end.location.address.city' should be a non-empty string`, function () {
                                expect(fulfillment.end.location?.address?.city).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_67] 'end.location.address.state' should be a non-empty string`, function () {
                                expect(fulfillment.end.location?.address?.state).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_68] 'end.location.address.country' should be a non-empty string`, function () {
                                expect(fulfillment.end.location?.address?.country).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_69] 'end.location.address.area_code' should be a non-empty string`, function () {
                                expect(fulfillment.end.location?.address?.area_code).to.be.a("string").that.is.not.empty;
                            }));
                        }

                        // Validate end.contact
                        if (fulfillment.end.contact) {
                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_70] 'end.contact' should be an object`, function () {
                                expect(fulfillment.end.contact).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_71] 'end.contact.phone' should be a non-empty string`, function () {
                                expect(fulfillment.end.contact?.phone).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_confirm_message_72] 'end.contact.email' should be a non-empty string`, function () {
                                expect(fulfillment.end.contact?.email).to.be.a("string").that.is.not.empty;
                            }));
                        }
                    }
                });
            }
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function confirm({ context, message }, testCaseId, flowId, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("confirm request verification");


        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(confirmMessageTests(message, constants, testCaseId, flowId));
        const responseTestSuite = response_verification({ context, message }, logs, constants);

        return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}
