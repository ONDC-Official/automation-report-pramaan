const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onCancelSchema = require("./schema/on_cancel.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function addFulfillmentContactValidationTests(messageTestSuite, message) {
    // Add fulfillments array validation
    messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bap_on_cancel_message_100 ]'message.order.fulfillments' should be a non-empty array`, function () {
        expect(message.order.fulfillments).to.exist.and.to.be.a('array').that.is.not.empty;
    }));

    if (Array.isArray(message?.order?.fulfillments)) {
        message.order.fulfillments.forEach((fulfillment, i) => {
            if (fulfillment?.start?.contact) {
                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_58 ]'message.order.fulfillments[${i}].start.contact' should be an object`, function () {
                    expect(fulfillment.start.contact).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_59 ]'message.order.fulfillments[${i}].start.contact.phone' should be a non-empty string`, function () {
                    expect(fulfillment.start.contact.phone).to.exist.and.to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_60 ]'message.order.fulfillments[${i}].start.contact.email' should be a non-empty string`, function () {
                    expect(fulfillment.start.contact.email).to.exist.and.to.be.a('string').that.is.not.empty;
                }));
            }

            if (fulfillment?.type === "Delivery") {
                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_45 ]'message.order.fulfillments[${i}].start.person.name' should be a non-empty string`, function () {
                    expect(fulfillment.start?.person?.name).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_46 ]'message.order.fulfillments[${i}].start.location.gps' should be a valid GPS string`, function () {
                    expect(fulfillment.start?.location?.gps).to.match(/^[-+]?\d{1,2}\.\d+,\s*[-+]?\d{1,3}\.\d+$/);
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_47 ]'message.order.fulfillments[${i}].start.location.address.name' should be a non-empty string`, function () {
                    expect(fulfillment.start?.location?.address?.name).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_48 ]'message.order.fulfillments[${i}].start.location.address.building' should be a non-empty string`, function () {
                    expect(fulfillment.start?.location?.address?.building).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_49 ]'message.order.fulfillments[${i}].start.location.address.locality' should be a non-empty string`, function () {
                    expect(fulfillment.start?.location?.address?.locality).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_50 ]'message.order.fulfillments[${i}].start.location.address.city' should be a non-empty string`, function () {
                    expect(fulfillment.start?.location?.address?.city).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_51 ]'message.order.fulfillments[${i}].start.location.address.state' should be a non-empty string`, function () {
                    expect(fulfillment.start?.location?.address?.state).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_52 ]'message.order.fulfillments[${i}].start.location.address.country' should be a non-empty string`, function () {
                    expect(fulfillment.start?.location?.address?.country).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_53 ]'message.order.fulfillments[${i}].start.location.address.area_code' should be a non-empty string`, function () {
                    expect(fulfillment.start?.location?.address?.area_code).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_56 ]'message.order.fulfillments[${i}].start.instructions.code' should be a non-empty string`, function () {
                    expect(fulfillment.start?.instructions?.code).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_57 ]'message.order.fulfillments[${i}].start.instructions.short_desc' should be a non-empty string`, function () {
                    expect(fulfillment.start?.instructions?.short_desc).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_61 ]'message.order.fulfillments[${i}].start.instructions.long_desc' should be a non-empty string(optional)`, function () {
                    expect(fulfillment.start?.instructions?.long_desc).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_62 ]'message.order.fulfillments[${i}].start.instructions.additional_desc.content_type' should be a non-empty string(optional)`, function () {
                    expect(fulfillment.start?.instructions?.additional_desc?.content_type).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_63 ]'message.order.fulfillments[${i}].start.instructions.additional_desc.url' should be a valid URL(optional)`, function () {
                    expect(fulfillment.start?.instructions?.additional_desc?.url).to.match(/^https?:\/\/[^\s$.?#].[^\s]*$/);
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_64 ]'message.order.fulfillments[${i}].start.time.duration' should be ISO 8601 duration(optional)`, function () {
                    expect(fulfillment.start?.time?.duration).to.match(/^PT\d+M$/);
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_65 ]'message.order.fulfillments[${i}].start.time.range.start' should be a valid datetime`, function () {
                    expect(fulfillment.start?.time?.range?.start).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_66 ]'message.order.fulfillments[${i}].start.time.range.end' should be a valid datetime`, function () {
                    expect(fulfillment.start?.time?.range?.end).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
                }));
            }

            if (fulfillment?.type === "RTO") {
                messageTestSuite.addTest(new Mocha.Test(`[id : b2c_log_bpp_on_cancel_message_67 ]'message.order.fulfillments[${i}].start.time.timestamp' should be a valid datetime`, function () {
                    expect(fulfillment.start?.time?.timestamp).to.be.a('string').that.matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
                }));
            }
        });
    }
}
function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);
        return log && log.length ? log[log.length - 1]?.request : false;
    } catch (err) {
        console.log(err);
    }
}

function onCancelMessageTests({ context, message }, constants, logs) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onCancelSchema, "Verification of Message", constants);
        addFulfillmentContactValidationTests(messageTestSuite, message);
        const init = lastActionLog(logs, "init");
        const confirm = lastActionLog(logs, "confirm");

        const createdAt = confirm?.message?.order?.created_at;
        const updatedAt = confirm?.message?.order?.updated_at;
        const billingUpdatedAt = init?.message?.order?.billing?.updated_at;
        const billingCreatedAt = init?.message?.order?.billing?.created_at;

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.created_at' which is a string and is equal to that of in 'init'", function () {
            expect(message.order.billing.created_at).to.exist.and.to.be.a("string").and.to.be.deep.equal(billingCreatedAt);
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.updated_at' which is a string and is equal to that of in 'init'", function () {
            expect(message.order.billing.updated_at).to.exist.and.to.be.a("string").and.to.be.deep.equal(billingUpdatedAt);
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string and is equal to that of in 'confirm'", function () {
            expect(message.order.created_at).to.exist.and.to.be.a("string").and.to.be.deep.equal(createdAt);
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string and is greater than that of in 'confirm'", function () {
            expect(message.order.updated_at).to.exist;
            expect(message.order.updated_at).to.be.a("string");

            expect(new Date(message.order.updated_at).getTime()).to.be.greaterThan(new Date(updatedAt).getTime());
        }));

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function on_cancel({ context, message }, type = "", logs = []) {
    try {
        const testSuite = new Mocha.Suite("on_cancel request verification");
        const constants = { action: "on_cancel", core_version: "1.2.0", state: "Cancelled" };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onCancelMessageTests({ context, message }, constants, logs));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}