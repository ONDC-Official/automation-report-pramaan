const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require('chai');
const onSearchSchema = require("./schema/on_search.schema");
const { generateTests } = require("./common");
const { checkVariant, checkCustomization } = require("./businessTests");
const { own_sync_response_verification } = require("../centralizedUtilities/responseVerification");

// An item's own tags[] (code:"type", list:[{code:"type", value:...}]) say
// whether it's a real sellable "item" or a "customization" sub-item (a
// crust/size/topping choice within a variant group).
function getTagValue(item, tagCode, listCode) {
    const tag = item?.tags?.find((t) => t?.code === tagCode);
    return tag?.list?.find((l) => l?.code === listCode)?.value;
}

// These operational/fulfillment fields and the non-zero price rule apply to
// every item in every domain EXCEPT an ONDC:RET11 "customization" sub-item
// (crust/size/topping choice) - a real RET11 "item"-type item still needs them.
function isRet11NonItemException(item, domain) {
    return domain === "ONDC:RET11" && getTagValue(item, "type", "type") !== "item";
}

const OPERATIONAL_ITEM_FIELDS = [
    "fulfillment_id",
    "location_id",
    "@ondc/org/returnable",
    "@ondc/org/cancellable",
    "@ondc/org/return_window",
    "@ondc/org/seller_pickup_return",
    "@ondc/org/time_to_ship",
    "@ondc/org/available_on_cod",
    "@ondc/org/contact_details_consumer_care"
];

// Not supported for RET11 (F&B) at all, item type notwithstanding - required
// for every other domain.
const PACKAGED_COMMODITIES_EXEMPT_DOMAINS = ["ONDC:RET11"];

// Only applies to grocery (RET10) and RET18 - not required elsewhere.
const PREPACKAGED_FOOD_REQUIRED_DOMAINS = ["ONDC:RET10", "ONDC:RET18"];

function onSearchMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onSearchSchema, "Verification of Message", constants);
        const providers = message?.catalog['bpp/providers'] || [];

        providers.forEach((provider, providerIndex) => {
            provider?.items?.forEach((item, itemIndex) => {
                switch (constants?.domain) {
                    case "ONDC:RET11":
                        messageTestSuite.addSuite(checkCustomization({ categories: provider?.categories, item }));
                        break;
                    default:
                        messageTestSuite.addSuite(checkVariant({ categories: provider?.categories, item }));
                        break;
                }

                // A zero price, and the operational/fulfillment fields below, are
                // required for every item in every domain EXCEPT an ONDC:RET11
                // "customization" sub-item (crust/size/topping choice) - those can
                // legitimately omit them / have price 0.00 since they're not sold
                // on their own. A RET11 item whose own tag says type "item" still
                // needs all of it, same as any other domain's item.
                if (!isRet11NonItemException(item, constants?.domain)) {
                    const nonZeroPricePattern = /^(?!0+$)(?!0*\.0+$)\d+(\.\d{1,2})?$/;
                    messageTestSuite.addTest(new Mocha.Test(`message.catalog.bpp/providers[${providerIndex}].items[${itemIndex}].price.value should not be zero`, function () {
                        expect(item?.price?.value).to.match(nonZeroPricePattern);
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`message.catalog.bpp/providers[${providerIndex}].items[${itemIndex}].price.maximum_value should not be zero`, function () {
                        expect(item?.price?.maximum_value).to.match(nonZeroPricePattern);
                    }));

                    OPERATIONAL_ITEM_FIELDS.forEach((field) => {
                        messageTestSuite.addTest(new Mocha.Test(`message.catalog.bpp/providers[${providerIndex}].items[${itemIndex}] should have required property '${field}'`, function () {
                            expect(item).to.have.property(field);
                        }));
                    });
                }

                if (!PACKAGED_COMMODITIES_EXEMPT_DOMAINS.includes(constants?.domain)) {
                    messageTestSuite.addTest(new Mocha.Test(`message.catalog.bpp/providers[${providerIndex}].items[${itemIndex}] should have required property '@ondc/org/statutory_reqs_packaged_commodities'`, function () {
                        expect(item).to.have.property("@ondc/org/statutory_reqs_packaged_commodities");
                    }));
                }

                if (PREPACKAGED_FOOD_REQUIRED_DOMAINS.includes(constants?.domain)) {
                    messageTestSuite.addTest(new Mocha.Test(`message.catalog.bpp/providers[${providerIndex}].items[${itemIndex}] should have required property '@ondc/org/statutory_reqs_prepackaged_food'`, function () {
                        expect(item).to.have.property("@ondc/org/statutory_reqs_prepackaged_food");
                    }));
                }
            })
        });

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_search({ context, message }, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("on_search request verification");
        constants = {
            ...constants,
            action: "on_search"
        };


        testSuite.addSuite(contextTests(context, constants, logs));
        if (constants?.flow === "RET_9_INC_PULL" || constants?.flow === "RET_9_INC_PUSH") {
            testSuite.addTest(new Mocha.Test(`'context.city' should be *`, function () {
                expect(context.city).to.equal("*");
            }))
        } else {
            testSuite.addTest(new Mocha.Test(`'context.city' should not be *`, function () {
                expect(context.city).to.not.equal("*");
            }))
        }
        testSuite.addSuite(onSearchMessageTests({ context, message }, constants));
        testSuite.addSuite(own_sync_response_verification({ context }, logs));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}