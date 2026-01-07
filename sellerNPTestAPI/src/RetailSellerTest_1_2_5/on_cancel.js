const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require('chai');
const onCancelSchema = require("./schema/on_cancel.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function onCancelMessageTests({ context, message }, step, constants) {
    try {
        // generating the tests using recursive methods
        if (constants?.flow !== "RET_ENH_005") {

            const messageTestSuite = generateTests({ context, message }, onCancelSchema, "Verification of Message", constants);
            return messageTestSuite;
        }
        if (constants?.flow === "RET_ENH_005") {

            if (constants.step === "on_cancel_one") {
                const testSuite = new Mocha.Suite(`on_cancel ${step} Request Verification`);
                const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
                    expect(message).to.exist;
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.ack' which is an object", function () {
                    expect(message.ack).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.ack.status' which is a string", function () {
                    expect(message.ack.status).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.error' which is an object", function () {
                    expect(message.error).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.error.code' which is a string", function () {
                    expect(message.error.code).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.error.message' which is a string", function () {
                    expect(message.error.message).to.be.a("string");
                }));
                return messageTestSuite;
            }
            if (constants.step !== "on_cancel_one") {
                const testSuite = new Mocha.Suite(`on_cancel ${step} Request Verification`);
                const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
                    expect(message).to.exist;
                }));
                messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
                    expect(message.order).to.be.an("object");
                }))
                messageTestSuite.addTest(new Mocha.Test("'message.order.id'should be present and must be a string", function () {
                    expect(message.order.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("'message.order.state'should be present and must be a string", function () {
                    expect(message.order.state).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
                    expect(message.order.provider).to.be.an("object");
                }))


                messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'locations' which is an array", function () {
                    expect(message.order.provider.locations).to.be.an("array");
                }))

                if (message?.order?.provider?.locations && message?.order?.provider?.locations?.length > 0) {
                    message.order.provider.locations.forEach((location, locationIndex) => {

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.locations[${locationIndex}]' should have a property named 'provider' which is an object`, function () {
                            expect(location).to.be.an("object");
                        }))

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.locations[${locationIndex}]' should have a property named 'id' which is a string`, function () {
                            expect(location.id).to.be.a("string");
                        }))

                    })
                }

                messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'items' which is an array", function () {
                    expect(message.order.items).to.be.an("array");
                }))

                if (message?.order?.items && message?.order?.items.length > 0) {
                    message.order.items.forEach((item, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                            expect(item).to.be.an('object');
                        }));
                        //message.order.items.id
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].id' should be a string`, function () {
                            expect(item.id).to.be.a('string');
                        }));

                        //message.order.items.descriptor....
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].quantity' should be an object`, function () {
                            expect(item.quantity).to.be.an('object');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].quantity.count' should be a number`, function () {
                            expect(item.quantity.count).to.be.a('number');
                        }));
                        //message.order.items.fulfillment_ids....
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_id' should be a string`, function () {
                            expect(item.fulfillment_id).to.be.a('string');
                        }));

                    })
                }

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing' which is an object ( OPTIONAL)", function () {
                    expect(message.order.billing).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.address' which is an object ( OPTIONAL)", function () {
                    expect(message.order.billing.address).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.address.name' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.address.name).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.address.building' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.address.building).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.address.city' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.address.city).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.address.locality' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.address.locality).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.address.state' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.address.state).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.address.country' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.address.country).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.address.area_code' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.address.area_code).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.name' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.name).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.email' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.email).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.phone' which is a string (OPTIONAL)", function () {
                    expect(message.order.billing.phone).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.tax_number' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.tax_number).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.created_at' which is a string(OPTIONAL)", function () {
                    expect(message.order.billing.created_at).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.updated_at' which is a string (OPTIONAL)", function () {
                    expect(message.order.billing.updated_at).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment' which is an object (OPTIONAL)", function () {
                    expect(message.order.payment).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.type' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment.type).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.@ondc/org/buyer_app_finder_fee_type' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment["@ondc/org/buyer_app_finder_fee_type"]).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.@ondc/org/buyer_app_finder_fee_amount' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment["@ondc/org/buyer_app_finder_fee_amount"]).to.exist.and.to.be.a("string");
                }));

                if (
                    message?.order?.payment["@ondc/org/settlement_details"] && message?.order?.payment["@ondc/org/settlement_details"].length > 0) {
                    message.order.payment["@ondc/org/settlement_details"].forEach((settlement, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}]' should be an object`, function () {
                            expect(settlement).to.be.an('object');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}].settlement_counterparty' should be a string`, function () {
                            expect(settlement.settlement_counterparty).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}].upi_address' should be a string`, function () {
                            expect(settlement.upi_address).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}].beneficiary_name' should be a string`, function () {
                            expect(settlement.beneficiary_name).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}].settlement_type' should be a string`, function () {
                            expect(settlement.settlement_type).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}].settlement_bank_account_no' should be a string`, function () {
                            expect(settlement.settlement_bank_account_no).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}].settlement_ifsc_code' should be a string`, function () {
                            expect(settlement.settlement_ifsc_code).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}].settlement_phase' should be a string`, function () {
                            expect(settlement.settlement_phase).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}].settlement_status' should be a string`, function () {
                            expect(settlement.settlement_status).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}].bank_name' should be a string`, function () {
                            expect(settlement.bank_name).to.be.a('string');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment["@ondc/org/settlement_details"][${i}].branch_name' should be a string`, function () {
                            expect(settlement.branch_name).to.be.a('string');
                        }));
                    });
                }

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.collected_by' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment.collected_by).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.@ondc/org/settlement_basis' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment["@ondc/org/settlement_basis"]).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.@ondc/org/settlement_window' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment["@ondc/org/settlement_window"]).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.@ondc/org/withholding_amount' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment["@ondc/org/withholding_amount"]).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.params' which is an object (OPTIONAL)", function () {
                    expect(message.order.payment.params).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.params.amount' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment.params.amount).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.params.currency' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment.params.currency).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.params.transaction_id' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment.params.transaction_id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payment.status' which is a string (OPTIONAL)", function () {
                    expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.oneOf(["PAID", "NOT-PAID"]);
                }));

                messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'fulfillments' which is an array", function () {
                    expect(message.order.fulfillments).to.be.an("array");
                }))
                if (
                    message?.order?.fulfillments && message.order.fulfillments.length > 0) {
                    message.order.fulfillments.forEach((fulfillment, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}]' should be an object`, function () {
                            expect(fulfillment).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].id' should be a string`, function () {
                            expect(fulfillment.id).to.be.a("string");
                        }));
                        if (fulfillment?.type !== "Cancel") {

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}]["@ondc/org/provider_name"]' should be a string`, function () {
                                expect(fulfillment["@ondc/org/provider_name"]).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}]["@ondc/org/category"]' should be a string`, function () {
                                expect(fulfillment["@ondc/org/category"]).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}]["@ondc/org/TAT"]' should be a string`, function () {
                                expect(fulfillment["@ondc/org/TAT"]).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tracking' should be a boolean`, function () {
                                expect(fulfillment.tracking).to.be.a("boolean");
                            }));

                            // Start
                            const start = fulfillment.start;
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start' should be an object`, function () {
                                expect(start).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.location.id' should be a string`, function () {
                                expect(start.location?.id).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.location.gps' should be a string`, function () {
                                expect(start.location?.gps).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.location.descriptor.name' should be a string`, function () {
                                expect(start.location?.descriptor?.name).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.location.descriptor.images' should be an array`, function () {
                                expect(start.location?.descriptor?.images).to.be.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.location.address.locality' should be a string`, function () {
                                expect(start.location?.address?.locality).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.location.address.city' should be a string`, function () {
                                expect(start.location?.address?.city).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.location.address.area_code' should be a string`, function () {
                                expect(start.location?.address?.area_code).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.location.address.state' should be a string`, function () {
                                expect(start.location?.address?.state).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.time.range.start' should be a string`, function () {
                                expect(start.time?.range?.start).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.time.range.end' should be a string`, function () {
                                expect(start.time?.range?.end).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.contact.phone' should be a string`, function () {
                                expect(start.contact?.phone).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].start.contact.email' should be a string`, function () {
                                expect(start.contact?.email).to.be.a("string");
                            }));

                            // End
                            const end = fulfillment.end;

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.location.gps' should be a string`, function () {
                                expect(end.location?.gps).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.location.address.name' should be a string`, function () {
                                expect(end.location?.address?.name).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.location.address.building' should be a string`, function () {
                                expect(end.location?.address?.building).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.location.address.locality' should be a string`, function () {
                                expect(end.location?.address?.locality).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.location.address.city' should be a string`, function () {
                                expect(end.location?.address?.city).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.location.address.state' should be a string`, function () {
                                expect(end.location?.address?.state).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.location.address.country' should be a string`, function () {
                                expect(end.location?.address?.country).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.location.address.area_code' should be a string`, function () {
                                expect(end.location?.address?.area_code).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.contact.phone' should be a string`, function () {
                                expect(end.contact?.phone).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.contact.email' should be a string`, function () {
                                expect(end.contact?.email).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.person.name' should be a string`, function () {
                                expect(end.person?.name).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.time.range.start' should be a string`, function () {
                                expect(end.time?.range?.start).to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].end.time.range.end' should be a string`, function () {
                                expect(end.time?.range?.end).to.be.a("string");
                            }));

                        }

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].state.descriptor.code' should be a string`, function () {
                            expect(fulfillment.state.descriptor?.code).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].type' should be a string`, function () {
                            expect(fulfillment.type).to.be.a("string");
                        }));

                        const arr1 = [{ code: "cancel_request" }, { code: "precancel_state" }];
                        const arr2 = [{ code: "quote_trail" }];
                        let arr = [];
                        switch (fulfillment.tags[0]?.code) {
                            case "cancel_request":
                            case "precancel_state":
                                arr = arr1;
                                break;
                            case "quote_trail":
                                arr = arr2;
                                break;
                        }
                        arr.forEach((ele) => {
                            const tagIndex = fulfillment?.tags?.findIndex((tag) => tag?.code === ele.code);
                            const tagItem = fulfillment?.tags[tagIndex];
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tags' should have an object of ${ele.code}`, function () {
                                expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                            }));


                            if (tagIndex !== -1) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                                    expect(tagItem).to.have.property("code").that.is.a("string");
                                    expect(tagItem).to.have.property("list").that.is.an("array");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                                    expect(tagItem).to.have.property("code").that.is.a("string");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                                    expect(tagItem.code).to.be.equal(ele.code);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));

                                const cancelRequestArr = [{ code: "reason_id" }, { code: "initiated_by" }];
                                const preCancelRequestArr = [{ code: "fulfillment_state" }, { code: "updated_at" }];
                                const quoteTrailArr = [{ code: "type" }, { code: "id" }, { code: "currency" }, { code: "value" }];
                                let array;
                                switch (tagItem?.code) {
                                    case "cancel_request":
                                        array = cancelRequestArr;
                                        break;
                                    case "precancel_state":
                                        array = preCancelRequestArr;
                                        break;
                                    case "quote_trail":
                                        array = quoteTrailArr;
                                        break;
                                    default:
                                        break;
                                }

                                if (array) {
                                    array.forEach((it) => {
                                        const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.code === it.code);
                                        const listItem = tagItem?.list[listItemIndex];

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                            expect(listItem).to.exist.and.to.be.an("object");
                                        }));


                                        if (listItemIndex !== -1) {
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'code' and 'value' which are strings`, function () {
                                                expect(listItem).to.have.property("code").that.is.a("string");
                                                expect(listItem).to.have.property("value").that.is.a("string");
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'code' which is a string`, function () {
                                                expect(listItem).to.have.property("code").that.is.a("string");
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tags[${tagIndex}].list[${listItemIndex}].code' should be equal to '${it.code}'`, function () {
                                                expect(listItem.code).to.be.equal(it.code);
                                            }));


                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                                            }));
                                        }
                                    });
                                }
                            }
                        });


                    });
                }
                messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'cancellation' which is an object", function () {
                    expect(message.order.cancellation).to.be.an("object");
                }))

                messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation' should have a property named 'cancelled_by' which is an string", function () {
                    expect(message.order.cancellation.cancelled_by).to.be.an("string");
                }))

                messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation' should have a property named 'reason' which is an object", function () {
                    expect(message.order.cancellation.reason).to.be.an("object");
                }))
                messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation.reason' should have a property named 'id' which is an string", function () {
                    expect(message.order.cancellation.reason.id).to.be.an("string");
                }))

                messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'quote' which is an object", function () {
                    expect(message.order.quote).to.be.an("object");
                }))
                messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should have a property named 'price' which is an object", function () {
                    expect(message.order.quote.price).to.be.an("object");
                }))

                messageTestSuite.addTest(new Mocha.Test("verify that 'message.order.quote.price.currency' should be a string", function () {
                    expect(message.order.quote.price.currency).to.be.a("string");
                }))

                messageTestSuite.addTest(new Mocha.Test("verify that 'message.order.quote.price.value' should be a string", function () {
                    expect(message.order.quote.price.value).to.be.a("string");
                }))

                messageTestSuite.addTest(new Mocha.Test("verify that 'message.order.quote.breakup' should be an array", function () {
                    expect(message.order.quote.breakup).to.be.an("array");
                }))

                if (message?.order?.quote?.breakup && message.order.quote.breakup.length > 0) {
                    message.order.quote.breakup.forEach((breakupItem, breakupIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}]' to be an object' `, function () {
                            expect(breakupItem).to.be.an("object");
                        }))
                        if (breakupItem?.title !== "Delivery charges" && breakupItem?.title !== "Tax") {
                            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].@ondc/org/item_quantity' to be an object' `, function () {
                                expect(breakupItem["@ondc/org/item_quantity"]).to.be.an("object");
                            }))

                            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].@ondc/org/item_quantity.count' to be an number' `, function () {
                                expect(breakupItem["@ondc/org/item_quantity"].count).to.be.a("number");
                            }))
                            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].item.price' to be an object`, function () {
                                expect(breakupItem.item.price).to.be.an("object");
                            }))

                            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].item.price.currency' to be an string`, function () {
                                expect(breakupItem.item.price.currency).to.be.a("string");
                            }))

                            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].item.price.value' to be an string`, function () {
                                expect(breakupItem.item.price.value).to.be.a("string");
                            }))

                        }
                        if (breakupItem?.title === "Tax") {
                            const arr = [{ code: "quote" }];

                            arr.forEach((ele) => {
                                const tagIndex = breakupItem.item.tags.findIndex((tag) => tag?.code === ele.code);
                                const tagItem = breakupItem.item.tags[tagIndex];
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags' should have an object of ${ele.code}`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                                }));


                                if (tagIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                                        expect(tagItem).to.have.property("code").that.is.a("string");
                                        expect(tagItem).to.have.property("list").that.is.an("array");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                                        expect(tagItem).to.have.property("code").that.is.a("string");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                                        expect(tagItem.code).to.be.equal(ele.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list' should have be a non empty array`, function () {
                                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                    }));

                                    const quoteArr = [{ code: "type" }];
                                    let array;
                                    switch (tagItem?.descriptor?.code) {

                                        case "quote":
                                            array = quoteArr;
                                            break;
                                        default:
                                            break;
                                    }

                                    if (array) {
                                        array.forEach((it) => {
                                            const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.code === it.code);
                                            const listItem = tagItem?.list[listItemIndex];

                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                expect(listItem).to.exist.and.to.be.an("object");
                                            }));


                                            if (listItemIndex !== -1) {
                                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                    expect(listItem).to.have.property("code").that.is.a("string");
                                                    expect(listItem).to.have.property("value").that.is.a("string");
                                                }));


                                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'code' which is a string`, function () {
                                                    expect(listItem).to.have.property("code").that.is.a("string");
                                                }));


                                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list[${listItemIndex}].code' should be equal to '${it.code}'`, function () {
                                                    expect(listItem.code).to.be.equal(it.code);
                                                }));


                                                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                }));
                                            }
                                        });
                                    }
                                }
                            });
                        }

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].@ondc/org/item_id' to be an string' `, function () {
                            expect(breakupItem["@ondc/org/item_id"]).to.be.a("string");
                        }))
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].@ondc/org/title_type' to be an string' `, function () {
                            expect(breakupItem["@ondc/org/title_type"]).to.be.a("string");
                        }))
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].title' to be an string' `, function () {
                            expect(breakupItem.title).to.be.a("string");
                        }))
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].price' to be an object`, function () {
                            expect(breakupItem.price).to.be.an("object");
                        }))

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].price.currency' to be an string`, function () {
                            expect(breakupItem.price.currency).to.be.a("string");
                        }))

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.quote.breakup[${breakupIndex}].price.value' to be an string`, function () {
                            expect(breakupItem.price.value).to.be.a("string");
                        }))


                    })
                }

                messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'created_at' which is an string", function () {
                    expect(message.order.created_at).to.be.an("string");
                }))
                messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'updated_at' which is an string", function () {
                    expect(message.order.updated_at).to.be.an("string");
                }))
                return messageTestSuite;

            }

        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function on_cancel({ context, message } = {}, step, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite("on_cancel request verification");
    try {
        constants = {
            ...constants,
            action: "on_cancel",
            state: "Cancelled",
        };

        const responseTestSuite = response_verification({ context, message }, logs, constants);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onCancelMessageTests({ context, message }, step, constants));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_cancel payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return [testSuite];
    }
}