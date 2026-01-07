const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onConfirmSchema = require("./schema/on_confirm.schema");
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

function onConfirmMessageTests({ context, message }, logs, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onConfirmSchema, "Verification of Message", constants);
        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].tracking' which is a boolean and should be 'true' `, function () {
                    expect(fulfillment.tracking).to.be.a("boolean").and.to.be.deep.oneOf([true, false]);
                }));
            })
        }


        const onSearch = lastActionLog(logs, "on_search");
        const init = lastActionLog(logs, "init");
        const onConfirm = lastActionLog(logs, "on_confirm");
        const billingUpdatedAt = init?.message?.order?.billing?.updated_at;
        const billingCreatedAt = init?.message?.order?.billing?.created_at;
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.created_at' which is a string", function () {
            expect(message.order.billing.created_at).to.exist.and.to.be.a("string").and.to.be.deep.equal(billingCreatedAt);
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.updated_at' which is a string ", function () {
            expect(message.order.billing.updated_at).to.exist.and.to.be.a("string").and.to.be.deep.equal(billingUpdatedAt);
        }));
        if (onSearch && onConfirm) {
            const searchQuotePrice = onSearch?.message?.catalog?.["bpp/providers"]?.[0]?.items?.[0]?.price;
            const ConfirmQuotePrice = onConfirm?.message?.order?.quote?.price;

            messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bap_on_confirm_message_94] 'quote.price' in on_Confirm should match quote.price in on_search (on_search: ₹${searchQuotePrice?.value} ${searchQuotePrice?.currency} | on_Confirm: ₹${ConfirmQuotePrice?.value} ${ConfirmQuotePrice?.currency})`, function () {
                expect(searchQuotePrice).to.exist.and.to.be.an("object");
                expect(ConfirmQuotePrice).to.exist.and.to.be.an("object");

                expect(ConfirmQuotePrice.currency).to.equal(searchQuotePrice.currency, "Currency mismatch in quote.price");
                expect(ConfirmQuotePrice.value).to.equal(searchQuotePrice.value, "Value mismatch in quote.price");
            }
            ));

        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_confirm({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite("on_confirm request verification");
        const constants = { action: "on_confirm", core_version: "1.2.0", state: "Accepted" };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onConfirmMessageTests({ context, message }, logs, constants));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}