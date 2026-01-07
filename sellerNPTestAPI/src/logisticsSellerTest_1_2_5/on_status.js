const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onStatusSchema = require("./schema/on_status.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function paymentMessageTests(message, flowId, testCaseId) {

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


function onStatusMessageTests({ context, message }, flowId, testCaseId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onStatusSchema, "Verification of Message");
        messageTestSuite.addSuite(paymentMessageTests(message, flowId, testCaseId));

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
                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_18] message.order.items[0].category_id should be '${expected}'`, function () {
                    const categoryId = message?.order?.items?.[0]?.category_id;
                    expect(categoryId, `Expected category_id '${expected}', but got '${categoryId}'`).to.equal(expected);
                }));
            }
        });

        const orderState = message?.order?.state;

        if (orderState === "Completed") {
            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_136] 'message.order.payment.time.timestamp' should be present and a non-empty string`, function () {
                const timestamp = message?.order?.payment?.time?.timestamp;
                expect(timestamp).to.be.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_137] 'message.order.payment.time.timestamp' should be a valid ISO 8601 format`, function () {
                const timestamp = message?.order?.payment?.time?.timestamp;
                expect(timestamp).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, `Expected valid ISO timestamp, got '${timestamp}'`);
            }));
        }

        if (orderState === "Cancelled") {
            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_05] 'message.order.cancellation' should be present and an object`, function () {
                const cancellation = message?.order?.cancellation;
                expect(cancellation).to.be.an("object").that.is.not.null;
            }));

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_06] 'message.order.cancellation.cancelled_by' should be present and a non-empty string`, function () {
                const cancelledBy = message?.order?.cancellation?.cancelled_by;
                expect(cancelledBy).to.be.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_07] 'message.order.cancellation.reason' should be present and an object`, function () {
                const reason = message?.order?.cancellation?.reason;
                expect(reason).to.be.an("object").that.is.not.null;
            }));

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_08] 'message.order.cancellation.reason.id' should be present and a non-empty string`, function () {
                const reasonId = message?.order?.cancellation?.reason?.id;
                expect(reasonId).to.be.a("string").that.is.not.empty;
            }));
        }

        //  required if fulfillment state code is "Order-delivered";
        {
            const fulfillments = message?.order?.fulfillments || [];
            fulfillments.forEach((fulfillment, index) => {
                const stateCode = fulfillment?.state?.descriptor?.code;

                if (stateCode === "Order-delivered") {
                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_104] 'message.order.fulfillments[${index}].end.time.timestamp' should be present and a non-empty string`, function () {
                        const timestamp = fulfillment?.end?.time?.timestamp;
                        expect(timestamp).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_104] 'message.order.fulfillments[${index}].end.time.timestamp' should be a valid ISO 8601 timestamp`, function () {
                        const timestamp = fulfillment?.end?.time?.timestamp;
                        expect(timestamp).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, `Invalid ISO timestamp: '${timestamp}'`);
                    }));
                }
            });
        }

        // fulfillments.end

        if (flowId !== "LOG_ENH_006" && flowId !== "LOG_ENH_007") {

            const fulfillments = message?.order?.fulfillments;
            if (Array.isArray(fulfillments)) {
                fulfillments.forEach((fulfillment, i) => {
                    if (fulfillment?.type === "delivery") {
                        const end = fulfillment?.end;

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_84] 'message.order.fulfillments[${i}].end' should be an object`, function () {
                            expect(end).to.exist.and.to.be.an("object");
                        }));

                        if (end?.person) {
                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_85] 'end.person' should be an object`, function () {
                                expect(end?.person).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_86] 'end.person.name' should be a non-empty string`, function () {
                                expect(end?.person?.name).to.be.a("string").that.is.not.empty;
                            }));
                        }

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_87] 'end.location' should be an object`, function () {
                            expect(end?.location).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_88] 'end.location.gps' should be a non-empty string`, function () {
                            expect(end?.location?.gps).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_89] 'end.location.address' should be an object`, function () {
                            expect(end?.location?.address).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_90] 'end.location.address.name' should be a non-empty string`, function () {
                            expect(end?.location?.address?.name).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_91] 'end.location.address.building' should be a non-empty string`, function () {
                            expect(end?.location?.address?.building).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_92] 'end.location.address.locality' should be a non-empty string`, function () {
                            expect(end?.location?.address?.locality).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_93] 'end.location.address.city' should be a non-empty string`, function () {
                            expect(end?.location?.address?.city).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_94] 'end.location.address.state' should be a non-empty string`, function () {
                            expect(end?.location?.address?.state).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_95] 'end.location.address.country' should be a non-empty string`, function () {
                            expect(end?.location?.address?.country).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_96] 'end.location.address.area_code' should be a non-empty string`, function () {
                            expect(end?.location?.address?.area_code).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_97] 'end.contact' should be an object`, function () {
                            expect(end?.contact).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_98] 'end.contact.phone' should be a non-empty string`, function () {
                            expect(end?.contact?.phone).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_99] 'end.contact.email' should be a non-empty string`, function () {
                            expect(end?.contact?.email).to.be.a("string").that.is.not.empty;
                        }));

                        if (end?.instructions) {
                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_100] 'end.instructions' should be an object`, function () {
                                expect(end?.instructions).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_101] 'end.instructions.code' should be a non-empty string`, function () {
                                expect(end?.instructions?.code).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_102] 'end.instructions.short_desc' should be a non-empty string`, function () {
                                expect(end?.instructions?.short_desc).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_103] 'end.instructions.additional_desc' should be an object`, function () {
                                expect(end?.instructions?.additional_desc).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_104] 'end.instructions.additional_desc.content_type' should be a non-empty string`, function () {
                                expect(end?.instructions?.additional_desc?.content_type).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_105] 'end.instructions.additional_desc.url' should be a non-empty string`, function () {
                                expect(end?.instructions?.additional_desc?.url).to.be.a("string").that.is.not.empty;
                            }));
                        }

                        if (end?.time) {
                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_106] 'end.time' should be an object`, function () {
                                expect(end?.time).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_107] 'end.time.range' should be an object`, function () {
                                expect(end?.time?.range).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_108] 'end.time.range.start' should be a non-empty string`, function () {
                                expect(end?.time?.range?.start).to.be.a("string").that.is.not.empty;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_109] 'end.time.range.end' should be a non-empty string`, function () {
                                expect(end?.time?.range?.end).to.be.a("string").that.is.not.empty;
                            }));
                        }
                    }
                });
            }
        }

        // @ondc/org/linked_order
        if (flowId !== "LOG_ENH_006" && flowId !== "LOG_ENH_007") {

            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_status_message_161] 'message.order[\"@ondc/org/linked_order\"]' should be an object", function () {
                expect(message.order["@ondc/org/linked_order"]).to.exist.and.to.be.an("object");
            }));

            const linkedOrder = message?.order["@ondc/org/linked_order"];

            if (linkedOrder?.items && Array.isArray(linkedOrder.items)) {
                messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_status_message_162] 'linked_order.items' should be a non-empty array", function () {
                    expect(linkedOrder.items).to.be.an("array").that.is.not.empty;
                }));

                linkedOrder.items.forEach((item, index) => {
                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_163] 'linked_order.items[${index}]' should be an object`, function () {
                        expect(item).to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_164] 'linked_order.items[${index}].category_id' should be a non-empty string`, function () {
                        expect(item.category_id).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_166] 'linked_order.items[${index}].descriptor.name' should be a non-empty string`, function () {
                        expect(item.descriptor?.name).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_168] 'linked_order.items[${index}].quantity.count' should be a number`, function () {
                        expect(item.quantity?.count).to.be.a("number");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_170] 'linked_order.items[${index}].quantity.measure.unit' should be a non-empty string`, function () {
                        expect(item.quantity?.measure?.unit).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_171] 'linked_order.items[${index}].quantity.measure.value' should be a number`, function () {
                        expect(item.quantity?.measure?.value).to.be.a("number");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_173] 'linked_order.items[${index}].price.currency' should be a non-empty string`, function () {
                        expect(item.price?.currency).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_174] 'linked_order.items[${index}].price.value' should be a non-empty string`, function () {
                        expect(item.price?.value).to.be.a("string").that.is.not.empty;
                    }));
                });
            }

            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_status_message_178] 'linked_order.provider.address' should be an object", function () {
                expect(linkedOrder.provider?.address).to.exist.and.to.be.an("object");
            }));

            [
                { field: "name", id: 179 },
                { field: "building", id: 180 },
                { field: "locality", id: 182 },
                { field: "city", id: 183 },
                { field: "state", id: 184 },
                { field: "area_code", id: 185 }
            ].forEach(({ field, id }) => {
                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_${id}] 'linked_order.provider.address.${field}' should be a non-empty string`, function () {
                    expect(linkedOrder.provider?.address?.[field]).to.be.a("string").that.is.not.empty;
                }));
            });

            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_status_message_187] 'linked_order.order.id' should be a non-empty string", function () {
                expect(linkedOrder.order?.id).to.be.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_status_message_189] 'linked_order.order.weight.unit' should be a non-empty string", function () {
                expect(linkedOrder.order?.weight?.unit).to.be.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bpp_on_status_message_190] 'linked_order.order.weight.value' should be a number", function () {
                expect(linkedOrder.order?.weight?.value).to.be.a("number");
            }));

            ["length", "breadth", "height"].forEach((dim, i) => {
                const unitId = 193 + i * 3;
                const valueId = 194 + i * 3;

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_${unitId}] 'linked_order.order.dimensions.${dim}.unit' should be a non-empty string`, function () {
                    expect(linkedOrder.order?.dimensions?.[dim]?.unit).to.be.a("string").that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_${valueId}] 'linked_order.order.dimensions.${dim}.value' should be a number`, function () {
                    expect(linkedOrder.order?.dimensions?.[dim]?.value).to.be.a("number");
                }));
            });
        }


        // cancellation terms
        {
            const cancellationTerms = message?.order?.cancellation_terms || [];

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_208] 'message.order.cancellation_terms' should be present as a non-empty array`, function () {
                expect(cancellationTerms).to.be.an("array").that.is.not.empty;
            }));

            cancellationTerms?.forEach((term, index) => {

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_209] 'message.order.cancellation_terms[${index}]' should have 'fulfillment_state' object`, function () {
                    expect(term).to.have.property("fulfillment_state").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_210] 'message.order.cancellation_terms[${index}].fulfillment_state' should have 'descriptor' object`, function () {
                    expect(term.fulfillment_state).to.have.property("descriptor").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_211] 'message.order.cancellation_terms[${index}].fulfillment_state.descriptor.code' should be a string`, function () {
                    expect(term.fulfillment_state.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_212] 'message.order.cancellation_terms[${index}].fulfillment_state.descriptor.short_desc' should be a string`, function () {
                    expect(term.fulfillment_state.descriptor).to.have.property("short_desc").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_213] 'message.order.cancellation_terms[${index}]' should have 'cancellation_fee' object`, function () {
                    expect(term).to.have.property("cancellation_fee").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_214] 'message.order.cancellation_terms[${index}].cancellation_fee.percentage' should be a string`, function () {
                    expect(term.cancellation_fee).to.have.property("percentage").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_215] 'message.order.cancellation_terms[${index}].cancellation_fee.amount' should be an object`, function () {
                    expect(term.cancellation_fee).to.have.property("amount").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_216] 'message.order.cancellation_terms[${index}].cancellation_fee.amount.currency' should be a string`, function () {
                    expect(term.cancellation_fee.amount).to.have.property("currency").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_217] 'message.order.cancellation_terms[${index}].cancellation_fee.amount.value' should be a string`, function () {
                    expect(term.cancellation_fee.amount).to.have.property("value").that.is.a("string");
                }));

            });
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_status({ context, message } = {}, state = "", logs = [], testCaseId, flowId) {
    try {
        const testSuite = new Mocha.Suite(`on_status (${state}) request verification`);
        const constants = { action: "on_status", core_version: "1.2.5", state: state, testCaseId, flowId };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onStatusMessageTests({ context, message }, testCaseId, flowId));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}