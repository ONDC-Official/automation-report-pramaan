const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onConfirmSchema = require("./schema/on_confirm.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function paymentMessageTests(message, flowId, testCaseId) {

    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    const testSuite = new Mocha.Suite("Search Validation");

    if (message?.order?.items?.descriptor) {
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
    }
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


function onConfirmMessageTests({ context, message }, constants, flowId, testCaseId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onConfirmSchema, "Verification of Message", constants);
        messageTestSuite.addSuite(paymentMessageTests(message, flowId, testCaseId));
        console.log(flowId)


        //ItemCategoryID
        {
            const ItemCategoryID = [
                { flowId: "LOG10_1", expected: "Standard Delivery" },
                { flowId: "LOG10_2", expected: "Same Day Delivery" },
                { flowId: "LOG10_3", expected: "Next Day Delivery" },
                { flowId: "LOG10_4", expected: "Immediate Delivery" },
                { flowId: "LOG10_5", expected: "Express Delivery" }
            ];

            ItemCategoryID.forEach(({ flowId: mappedFlowId, expected }) => {
                if (flowId === mappedFlowId) {
                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_14] message.order.items[0].category_id should be '${expected}'`, function () {
                        const categoryId = message?.order?.items?.[0]?.category_id;
                        expect(categoryId, `Expected category_id '${expected}', but got '${categoryId}'`).to.equal(expected);
                    }));
                }
            });
        }

        // Fulfillment Tags Tests

        {
            if (Array.isArray(message?.order?.fulfillments)) {
                message.order.fulfillments.forEach((fulfillment, fIndex) => {

                    const commonTagArr = [
                        { code: "linked_provider", list: [{ code: "id" }, { code: "name" }] },
                        {
                            code: "linked_order", list: [
                                { code: "currency" }, { code: "declared_value" },
                                { code: "weight_unit" }, { code: "weight_value" },
                                { code: "dim_unit" }, { code: "length" }, { code: "breadth" }, { code: "height" },
                                { code: "shipment_type" }, { code: "id" }
                            ]
                        },
                        { code: "state", list: [{ code: "ready_to_ship" }] },
                        { code: "rto_action", list: [{ code: "return_to_origin" }] },
                        { code: "weather_check", list: [{ code: "raining" }] }
                    ];

                    const enhTagArr = [
                        { code: "linked_provider", list: [{ code: "id" }, { code: "name" }] },
                        {
                            code: "fulfill_request", list: [
                                { code: "order_count" }, { code: "rate_basis" }, { code: "motorable_distance" },
                                { code: "pickup_slot_start" }, { code: "pickup_slot_end" },
                                { code: "delivery_slot_start" }, { code: "delivery_slot_end" }
                            ]
                        },
                        { code: "state", list: [{ code: "ready_to_ship" }] },
                        { code: "rto_action", list: [{ code: "return_to_origin" }] },
                        { code: "weather_check", list: [{ code: "raining" }] }
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
                        const tagIndex = fulfillment?.tags?.findIndex(t => t?.code === tag.code);
                        const tagItem = fulfillment?.tags?.[tagIndex];

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_${tag.code}_exists] 'order.fulfillments[${fIndex}].tags' should contain object with code '${tag.code}'`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object");
                        }));

                        if (tagItem) {
                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_${tag.code}_code] 'tags[${tagIndex}].code' should be '${tag.code}'`, function () {
                                expect(tagItem.code).to.equal(tag.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_${tag.code}_list] 'tags[${tagIndex}].list' should be a non-empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            tag.list.forEach(listItem => {
                                const listIndex = tagItem.list.findIndex(entry => entry?.code === listItem.code);
                                const actualListItem = tagItem.list?.[listIndex];

                                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_${tag.code}_${listItem.code}_exists] 'tags[${tagIndex}].list' should include code '${listItem.code}'`, function () {
                                    expect(actualListItem).to.exist.and.to.be.an("object");
                                }));

                                if (actualListItem) {
                                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_${tag.code}_${listItem.code}_code] 'tags[${tagIndex}].list[${listIndex}].code' should be '${listItem.code}'`, function () {
                                        expect(actualListItem.code).to.equal(listItem.code);
                                    }));

                                    // Special validation for LOG10_4: ready_to_ship === 'yes'
                                    if (tag.code === "state" && listItem.code === "ready_to_ship" && flowId === "LOG10_4") {
                                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_${tag.code}_${listItem.code}_value_should_be_yes] 'tags[${tagIndex}].list[${listIndex}].value' should be 'yes'`, function () {
                                            expect(actualListItem.value).to.equal("yes");
                                        }));
                                    } else {
                                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_${tag.code}_${listItem.code}_value] 'tags[${tagIndex}].list[${listIndex}].value' should be a non-empty string`, function () {
                                            expect(actualListItem.value).to.be.a("string").that.is.not.empty;
                                        }));
                                    }
                                }
                            });
                        }
                    });
                });
            }
        }

        //@ondc/org/linked_order
        if (flowId !== "LOG_ENH_006" && flowId !== "LOG_ENH_007") {


            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_confirm_message_138] 'message.order[\"@ondc/org/linked_order\"]' should be an object", function () {
                expect(message.order["@ondc/org/linked_order"]).to.exist.and.to.be.an("object");
            }));

            const linkedOrder = message?.order["@ondc/org/linked_order"];

            if (linkedOrder?.items && Array.isArray(linkedOrder.items)) {
                messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_confirm_message_139] 'linked_order.items' should be a non-empty array", function () {
                    expect(linkedOrder.items).to.be.an("array").that.is.not.empty;
                }));

                linkedOrder.items.forEach((item, index) => {
                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_140] 'linked_order.items[${index}]' should be an object`, function () {
                        expect(item).to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_141] 'linked_order.items[${index}].category_id' should be a non-empty string`, function () {
                        expect(item.category_id).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_143] 'linked_order.items[${index}].descriptor.name' should be a non-empty string`, function () {
                        expect(item.descriptor?.name).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_145] 'linked_order.items[${index}].quantity.count' should be a number`, function () {
                        expect(item.quantity?.count).to.be.a("number");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_147] 'linked_order.items[${index}].quantity.measure.unit' should be a non-empty string`, function () {
                        expect(item.quantity?.measure?.unit).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_148] 'linked_order.items[${index}].quantity.measure.value' should be a number`, function () {
                        expect(item.quantity?.measure?.value).to.be.a("number");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_150] 'linked_order.items[${index}].price.currency' should be a non-empty string`, function () {
                        expect(item.price?.currency).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_151] 'linked_order.items[${index}].price.value' should be a non-empty string`, function () {
                        expect(item.price?.value).to.be.a("string").that.is.not.empty;
                    }));
                });
            }

            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_confirm_message_155] 'linked_order.provider.address' should exist and be an object", function () {
                expect(linkedOrder.provider?.address).to.exist.and.to.be.an("object");
            }));

            ["name", "building", "locality", "city", "state", "area_code"].forEach((field, idx) => {
                const id = 156 + idx;
                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_${id}] 'linked_order.provider.address.${field}' should be a non-empty string`, function () {
                    expect(linkedOrder.provider?.address?.[field]).to.be.a("string").that.is.not.empty;
                }));
            });

            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_confirm_message_163] 'linked_order.order.id' should be a non-empty string", function () {
                expect(linkedOrder.order?.id).to.be.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_confirm_message_165] 'linked_order.order.weight.unit' should be a non-empty string", function () {
                expect(linkedOrder.order?.weight?.unit).to.be.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_confirm_message_166] 'linked_order.order.weight.value' should be a number", function () {
                expect(linkedOrder.order?.weight?.value).to.be.a("number");
            }));

            ["length", "breadth", "height"].forEach((dim, i) => {
                const base = 168 + (i * 3)
                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_${base + 1}] 'linked_order.order.dimensions.${dim}.unit' should be a non-empty string`, function () {
                    expect(linkedOrder.order?.dimensions?.[dim]?.unit).to.be.a("string").that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_${base + 2}] 'linked_order.order.dimensions.${dim}.value' should be a number`, function () {
                    expect(linkedOrder.order?.dimensions?.[dim]?.value).to.be.a("number");
                }));
            });

        }

        // fulfillments.end

        if (flowId !== "LOG_ENH_006" && flowId !== "LOG_ENH_007") {
            const fulfillments = message?.order?.fulfillments;
            if (Array.isArray(fulfillments)) {
                fulfillments.forEach((fulfillment, i) => {
                    const end = fulfillment?.end;

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_72] 'message.order.fulfillments[${i}].end' should be an object`, function () {
                        expect(end).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_73] 'end.person' should be an object`, function () {
                        expect(end?.person).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_74] 'end.person.name' should be a non-empty string`, function () {
                        expect(end?.person?.name).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_75] 'end.location' should be an object`, function () {
                        expect(end?.location).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_76] 'end.location.gps' should be a non-empty string`, function () {
                        expect(end?.location?.gps).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_77] 'end.location.address' should be an object`, function () {
                        expect(end?.location?.address).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_78] 'end.location.address.name' should be a non-empty string`, function () {
                        expect(end?.location?.address?.name).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_79] 'end.location.address.building' should be a non-empty string`, function () {
                        expect(end?.location?.address?.building).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_80] 'end.location.address.locality' should be a non-empty string`, function () {
                        expect(end?.location?.address?.locality).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_81] 'end.location.address.city' should be a non-empty string`, function () {
                        expect(end?.location?.address?.city).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_82] 'end.location.address.state' should be a non-empty string`, function () {
                        expect(end?.location?.address?.state).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_83] 'end.location.address.country' should be a non-empty string`, function () {
                        expect(end?.location?.address?.country).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_84] 'end.location.address.area_code' should be a non-empty string`, function () {
                        expect(end?.location?.address?.area_code).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_85] 'end.contact' should be an object`, function () {
                        expect(end?.contact).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_86] 'end.contact.phone' should be a non-empty string`, function () {
                        expect(end?.contact?.phone).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_87] 'end.contact.email' should be a non-empty string`, function () {
                        expect(end?.contact?.email).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_88] 'end.instructions' should be an object`, function () {
                        expect(end?.instructions).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_89] 'end.instructions.code' should be a non-empty string`, function () {
                        expect(end?.instructions?.code).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_90] 'end.instructions.short_desc' should be a non-empty string`, function () {
                        expect(end?.instructions?.short_desc).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_91] 'end.instructions.additional_desc' should be an object`, function () {
                        expect(end?.instructions?.additional_desc).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_92] 'end.instructions.additional_desc.content_type' should be a non-empty string`, function () {
                        expect(end?.instructions?.additional_desc?.content_type).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_93] 'end.instructions.additional_desc.url' should be a non-empty string`, function () {
                        expect(end?.instructions?.additional_desc?.url).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_94] 'end.time' should be an object(OPTIONAL)`, function () {
                        expect(end?.time).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_95] 'end.time.range' should be an object(OPTIONAL)`, function () {
                        expect(end?.time?.range).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_96] 'end.time.range.start' should be a non-empty string(OPTIONAL)`, function () {
                        expect(end?.time?.range?.start).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_confirm_message_97] 'end.time.range.end' should be a non-empty string(OPTIONAL)`, function () {
                        expect(end?.time?.range?.end).to.be.a("string").that.is.not.empty;
                    }));
                });
            }

        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_confirm({ context, message } = {}, logs = [], flowId, testCaseId) {
    try {
        const testSuite = new Mocha.Suite("on_confirm request verification");
        const constants = { action: "on_confirm", core_version: "1.2.5", state: "Accepted", flowId, testCaseId };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onConfirmMessageTests({ context, message }, constants, flowId, testCaseId));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}