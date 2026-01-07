const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onInitSchema = require("./schema/on_init.schema");
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

function onInitMessageTests({ context, message }, logs) {
    try {
        const messageTestSuite = generateTests({ context, message }, onInitSchema, "Verification of Message");

        const onSearch = lastActionLog(logs, "on_search");
        const init = lastActionLog(logs, "init");
        const onInit = lastActionLog(logs, "on_init");
        
        // const billingUpdatedAt = init?.message?.order?.billing?.updated_at;
        // const billingCreatedAt = init?.message?.order?.billing?.created_at;
        // messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.created_at' which is a string", function () {
        //     expect(message.order.billing.created_at).to.exist.and.to.be.a("string").and.to.be.deep.equal(billingCreatedAt);
        // }));
        // messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.updated_at' which is a string ", function () {
        //     expect(message.order.billing.updated_at).to.exist.and.to.be.a("string").and.to.be.deep.equal(billingUpdatedAt);
        // }));

        if (onSearch && onInit) {
            const searchQuotePrice = onSearch?.message?.catalog?.["bpp/providers"]?.[0]?.items?.[0]?.price;
            const initQuotePrice = onInit?.message?.order?.quote?.price;

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_on_init_message_51] 'quote.price' in on_init should match quote.price in on_search (on_search: ₹${searchQuotePrice?.value} ${searchQuotePrice?.currency} | on_init: ₹${initQuotePrice?.value} ${initQuotePrice?.currency})`, function () {
                expect(searchQuotePrice).to.exist.and.to.be.an("object");
                expect(initQuotePrice).to.exist.and.to.be.an("object");

                expect(initQuotePrice.currency).to.equal(searchQuotePrice.currency, "Currency mismatch in quote.price");
                expect(initQuotePrice.value).to.equal(searchQuotePrice.value, "Value mismatch in quote.price");
            }
            ));

            // messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bap_on_init_message_52] 'quote.price.currency' should be a non-empty string", function () {
            //     expect(initQuotePrice.currency).to.be.a("string").that.is.not.empty;
            // }));

            // messageTestSuite.addTest(new Mocha.Test("[id: b2c_log_bap_on_init_message_53] 'quote.price.value' should be a non-empty string", function () {
            //     expect(initQuotePrice.value).to.be.a("string").that.is.not.empty;
            // }));
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function on_init({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite("on_init request verification");
        const constants = { action: "on_init", core_version: "1.2.0" };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onInitMessageTests({ context, message }, logs));
        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
};