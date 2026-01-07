const Mocha = require("mocha");
const contextTests = require("./context");
const onStatusSchema = require("./schema/on_status.schema");
const { expect } = require("chai");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);
        return log && log.length ? log[log.length - 1]?.request : false;
    } catch (err) {
        console.log(err);
    }
}

function onStatusMessageTests({ context, message }, logs) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onStatusSchema, "Verification of Message");

        //  required if fulfillment state code is "Order-delivered";
        {
            const fulfillments = message?.order?.fulfillments || [];
            fulfillments.forEach((fulfillment, index) => {
                const stateCode = fulfillment?.state?.descriptor?.code;

                if (stateCode === "Order-picked-up" || stateCode === "Out-for-delivery" || stateCode === "Order-delivered") {
                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_65] 'message.order.fulfillments[${index}].start.time.timestamp' should be present and a non-empty string`, function () {
                        const timestamp = fulfillment?.start?.time?.timestamp;
                        expect(timestamp).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_65] 'message.order.fulfillments[${index}].start.time.timestamp' should be a valid ISO 8601 timestamp`, function () {
                        const timestamp = fulfillment?.start?.time?.timestamp;
                        expect(timestamp).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, `Invalid ISO timestamp: '${timestamp}'`);
                    }));

                }
            });
        }

        //  required if fulfillment state code is "Order-delivered";
        {
            const fulfillments = message?.order?.fulfillments || [];
            fulfillments.forEach((fulfillment, index) => {
                const stateCode = fulfillment?.state?.descriptor?.code;

                if (stateCode === "Order-delivered") {
                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_93] 'message.order.fulfillments[${index}].end.time.timestamp' should be present and a non-empty string`, function () {
                        const timestamp = fulfillment?.end?.time?.timestamp;
                        expect(timestamp).to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_status_message_93] 'message.order.fulfillments[${index}].end.time.timestamp' should be a valid ISO 8601 timestamp`, function () {
                        const timestamp = fulfillment?.end?.time?.timestamp;
                        expect(timestamp).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, `Invalid ISO timestamp: '${timestamp}'`);
                    }));
                }
            });
        }

        const onSearch = lastActionLog(logs, "on_search");
        const onStatus = lastActionLog(logs, "on_status");
        const init = lastActionLog(logs, "init");
        const billingUpdatedAt = init?.message?.order?.billing?.updated_at;
        const billingCreatedAt = init?.message?.order?.billing?.created_at;
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.created_at' which is a string", function () {
            expect(message.order.billing.created_at).to.exist.and.to.be.a("string").nested.to.be.deep.equal(billingCreatedAt);
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.updated_at' which is a string ", function () {
            expect(message.order.billing.updated_at).to.exist.and.to.be.a("string").nested.to.be.deep.equal(billingUpdatedAt);
        }));
        if (onSearch && onStatus) {
            const searchQuotePrice = onSearch?.message?.catalog?.["bpp/providers"]?.[0]?.items?.[0]?.price;
            const StatusQuotePrice = onStatus?.message?.order?.quote?.price;

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_on_status_message_95] 'quote.price' in on_status should match quote.price in on_search (on_search: ₹${searchQuotePrice?.value} ${searchQuotePrice?.currency} | on_Status: ₹${StatusQuotePrice?.value} ${StatusQuotePrice?.currency})`, function () {
                expect(searchQuotePrice).to.exist.and.to.be.an("object");
                expect(StatusQuotePrice).to.exist.and.to.be.an("object");

                expect(StatusQuotePrice.currency).to.equal(searchQuotePrice.currency, "Currency mismatch in quote.price");
                expect(StatusQuotePrice.value).to.equal(searchQuotePrice.value, "Value mismatch in quote.price");
            }
            ));

        }
        const confirm = lastActionLog(logs, "confirm");
        const createdAt = confirm?.message?.order?.created_at; messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string ", function () {
            expect(message.order.created_at).to.exist.and.to.be.a("string").nested.to.be.deep.equal(createdAt);
        }));

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_status({ context, message } = {}, state = "", logs = []) {
    try {
        const testSuite = new Mocha.Suite(`on_status (${state}) request verification`);
        const constants = { action: "on_status", core_version: "1.2.0", state: state };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onStatusMessageTests({ context, message }, logs));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}