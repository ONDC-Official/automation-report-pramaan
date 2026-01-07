const Mocha = require("mocha");
const { expect } = require("chai");
const onInitSchema = require("./schema/on_init.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);

        return log && log.length ? log?.pop()?.request : false;
    } catch (err) {
        console.log(err);
    }
}

function onInitMessageTests({ context, message, logs, flowId }) {
    try {
        const messageTestSuite = generateTests({ context, message }, onInitSchema, "Verification of Message");


        //ItemCategoryID

        // const ItemCategoryID = [
        //     { flowId: "LOG10_1", expected: "Standard Delivery" },
        //     { flowId: "LOG10_2", expected: "Same Day Delivery" },
        //     { flowId: "LOG10_3", expected: "Next Day Delivery" },
        //     { flowId: "LOG10_4", expected: "Immediate Delivery" },
        //     { flowId: "LOG10_5", expected: "Express Delivery" }
        // ];

        // ItemCategoryID.forEach(({ flowId: mappedFlowId, expected }) => {
        //     if (flowId === mappedFlowId) {
        //         messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_14] message.order.items[0].category_id should be '${expected}'`, function () {
        //             const categoryId = message?.order?.items?.[0]?.category_id;
        //             expect(categoryId, `Expected category_id '${expected}', but got '${categoryId}'`).to.equal(expected);
        //         }));
        //     }
        // });

        // Fulfillment Tags Tests
        {
            if (Array.isArray(message?.order?.fulfillments)) {
                message.order.fulfillments.forEach((fulfillment, fIndex) => {
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

                    const riderCheckArr = [{ code: "rider_check", list: [{ code: "inline_check_for_rider" }] },
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
                        {
                            code: "fulfill_response", list: [
                                { code: "order_count" }, { code: "rate_basis" }
                            ]
                        }
                    ];

                    let tagArrToUse = [];

                    switch (flowId) {

                        case "LOG10_4":
                            tagArrToUse = riderCheckArr;

                        case "LOG_ENH_006":
                        case "LOG_ENH_007":
                            const fulfillmentType = fulfillment?.type;

                            switch (fulfillmentType) {
                                case "Batch":
                                    tagArrToUse = enhTagArr; // linked_provider, fulfill_request, fulfill_response
                                    break;

                                case "Delivery": // For Delivery fulfillments, check for linked_order
                                    tagArrToUse = [
                                        {
                                            code: "linked_order", list: [
                                                { code: "currency" }, { code: "declared_value" }, { code: "category" },
                                                { code: "weight_unit" }, { code: "weight_value" },
                                                { code: "dim_unit" }, { code: "length" }, { code: "breadth" }, { code: "height" }
                                            ]
                                        }
                                    ];
                                    break;

                                default:
                                    tagArrToUse = enhTagArr;
                                    break;
                            }
                            break;

                        default:
                            tagArrToUse = commonTagArr;
                            break;
                    }

                    const tags = fulfillment?.tags;

                    // Always validate tags is an array first
                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_45] 'order.fulfillments[${fIndex}].tags' should be an array`, function () {
                        expect(tags).to.be.an("array");
                    }));

                    if (!Array.isArray(tags)) return;

                    tagArrToUse.forEach(tag => {
                        const tagIndex = tags.findIndex(t => t?.code === tag.code);
                        const tagItem = tags?.[tagIndex];

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_46] 'order.fulfillments[${fIndex}].tags' should contain object with code '${tag.code}'`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object");
                        }));

                        if (tagItem) {
                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_47] 'order.fulfillments[${fIndex}].tags[${tagIndex}].code' should be '${tag.code}'`, function () {
                                expect(tagItem.code).to.equal(tag.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_48] 'order.fulfillments[${fIndex}].tags[${tagIndex}].list' should be a non-empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            tag.list.forEach(listItem => {
                                const listIndex = tagItem.list.findIndex(entry => entry?.code === listItem.code);
                                const actualListItem = tagItem.list?.[listIndex];

                                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_49] 'order.fulfillments[${fIndex}].tags[${tagIndex}].list' should include code '${listItem.code}'`, function () {
                                    expect(actualListItem).to.exist.and.to.be.an("object");
                                }));

                                if (actualListItem) {
                                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_50] 'order.fulfillments[${fIndex}].tags[${tagIndex}].list[${listIndex}].code' should be '${listItem.code}'`, function () {
                                        expect(actualListItem.code).to.equal(listItem.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_51] 'order.fulfillments[${fIndex}].tags[${tagIndex}].list[${listIndex}].value' should be a non-empty string`, function () {
                                        expect(actualListItem.value).to.be.a("string").that.is.not.empty;
                                    }));
                                }
                            });
                        }
                    });
                });
            }
        }



        // Check cancellation_terms only if LSP features in on_search have code "01A"
        const onSearchRequest = lastActionLog(logs, "on_search");
        const lspTags = onSearchRequest?.message?.catalog?.["bpp/providers"]?.[0]?.tags || [];
        const hasLsp01A = lspTags.some(tag => tag?.descriptor?.code === "lsp_feature" && tag?.list?.some(item => item?.code === "01A"));

        if (hasLsp01A) {
            messageTestSuite.addTest(new Mocha.Test('message.order.cancellation_terms must be a non-empty array', function () {
                expect(message.order).to.have.property('cancellation_terms').that.is.an('array').with.length.greaterThan(0);
            }));

            (message?.order?.cancellation_terms || []).forEach((term, index) => {
                messageTestSuite.addTest(new Mocha.Test(`message.order.cancellation_terms[${index}].fulfillment_state must be an object`, function () {
                    expect(term).to.have.property('fulfillment_state').that.is.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.cancellation_terms[${index}].fulfillment_state.descriptor must be an object`, function () {
                    expect(term.fulfillment_state).to.have.property('descriptor').that.is.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.cancellation_terms[${index}].fulfillment_state.descriptor.code must be a non-empty string`, function () {
                    expect(term.fulfillment_state.descriptor).to.have.property('code').that.is.a('string').and.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.cancellation_terms[${index}].fulfillment_state.descriptor.short_desc must be a non-empty string`, function () {
                    expect(term.fulfillment_state.descriptor).to.have.property('short_desc').that.is.a('string').and.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.cancellation_terms[${index}].cancellation_fee must be an object`, function () {
                    expect(term).to.have.property('cancellation_fee').that.is.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.cancellation_terms[${index}].cancellation_fee.percentage must be a non-empty string`, function () {
                    expect(term.cancellation_fee).to.have.property('percentage').that.is.a('string').and.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.cancellation_terms[${index}].cancellation_fee.amount must be an object`, function () {
                    expect(term.cancellation_fee).to.have.property('amount').that.is.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.cancellation_terms[${index}].cancellation_fee.amount.currency must be a non-empty string`, function () {
                    expect(term.cancellation_fee.amount).to.have.property('currency').that.is.a('string').and.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.cancellation_terms[${index}].cancellation_fee.amount.value must be a non-empty string`, function () {
                    expect(term.cancellation_fee.amount).to.have.property('value').that.is.a('string').and.not.empty;
                }));
            });
        }



        // fulfillments.end
        if (flowId !== "LOG_ENH_006" && flowId !== "LOG_ENH_007") {
            const fulfillments = message?.order?.fulfillments;
            if (Array.isArray(fulfillments)) {
                fulfillments.forEach((fulfillment, i) => {
                    const end = fulfillment?.end;

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_31] 'message.order.fulfillments[${i}].end' should be an object`, function () {
                        expect(end).to.exist.and.to.be.an("object");
                    }));

                    if (end?.person) {
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_32] 'end.person' should be an object`, function () {
                            expect(end?.person).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_33] 'end.person.name' should be a non-empty string`, function () {
                            expect(end?.person?.name).to.be.a("string").that.is.not.empty;
                        }));
                    }

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_34] 'end.location' should be an object`, function () {
                        expect(end?.location).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_35] 'end.location.gps' should be a non-empty string`, function () {
                        expect(end?.location?.gps).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_36] 'end.location.address' should be an object`, function () {
                        expect(end?.location?.address).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_37] 'end.location.address.name' should be a non-empty string`, function () {
                        expect(end?.location?.address?.name).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_38] 'end.location.address.building' should be a non-empty string`, function () {
                        expect(end?.location?.address?.building).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_39] 'end.location.address.locality' should be a non-empty string`, function () {
                        expect(end?.location?.address?.locality).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_40] 'end.location.address.city' should be a non-empty string`, function () {
                        expect(end?.location?.address?.city).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_41] 'end.location.address.state' should be a non-empty string`, function () {
                        expect(end?.location?.address?.state).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_42] 'end.location.address.country' should be a non-empty string`, function () {
                        expect(end?.location?.address?.country).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_43] 'end.location.address.area_code' should be a non-empty string`, function () {
                        expect(end?.location?.address?.area_code).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_44] 'end.contact' should be an object`, function () {
                        expect(end?.contact).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_45] 'end.contact.phone' should be a non-empty string`, function () {
                        expect(end?.contact?.phone).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_46] 'end.contact.email' should be a non-empty string`, function () {
                        expect(end?.contact?.email).to.be.a("string").that.is.not.empty;
                    }));

                    if (end?.instructions) {
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_47] 'end.instructions' should be an object`, function () {
                            expect(end?.instructions).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_48] 'end.instructions.code' should be a non-empty string`, function () {
                            expect(end?.instructions?.code).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_49] 'end.instructions.short_desc' should be a non-empty string`, function () {
                            expect(end?.instructions?.short_desc).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_50] 'end.instructions.additional_desc' should be an object`, function () {
                            expect(end?.instructions?.additional_desc).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_51] 'end.instructions.additional_desc.content_type' should be a non-empty string`, function () {
                            expect(end?.instructions?.additional_desc?.content_type).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_52] 'end.instructions.additional_desc.url' should be a non-empty string`, function () {
                            expect(end?.instructions?.additional_desc?.url).to.be.a("string").that.is.not.empty;
                        }));
                    }

                    if (end?.time) {
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_53] 'end.time' should be an object`, function () {
                            expect(end?.time).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_54] 'end.time.range' should be an object`, function () {
                            expect(end?.time?.range).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_55] 'end.time.range.start' should be a non-empty string`, function () {
                            expect(end?.time?.range?.start).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_init_message_56] 'end.time.range.end' should be a non-empty string`, function () {
                            expect(end?.time?.range?.end).to.be.a("string").that.is.not.empty;
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

module.exports = async function on_init({ context, message } = {}, logs = [], flowId = "", testCaseId = "") {
    try {
        const testSuite = new Mocha.Suite("on_init request verification");
        const constants = { action: "on_init", core_version: "1.2.5" };

        const contextTests = require("./context");
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onInitMessageTests({ context, message, logs, flowId }));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
};