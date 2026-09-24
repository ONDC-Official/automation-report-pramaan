const Mocha = require("mocha");
const { expect } = require("chai");

// Immediate-delivery flow ids (per on_search.js's own category map) - the
// one flow where ready_to_ship legitimately flips from the default.
const IMMEDIATE_DELIVERY_FLOW_IDS = ["LOG10_4"];

function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);
        return log && log.length ? log?.pop()?.request : false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

function getSearchProvider(onSearchLog) {
    const providers = onSearchLog?.message?.catalog?.["bpp/providers"];
    return Array.isArray(providers) ? providers[0] : undefined;
}

function verifyProviderIdMatchesSearch(suite, message, onSearchLog, label = "") {
    const provider = getSearchProvider(onSearchLog);
    if (!provider) return;

    suite.addTest(new Mocha.Test(`${label}'message.order.provider.id' should match the provider id returned in on_search`, function () {
        expect(message?.order?.provider?.id).to.equal(provider.id);
    }));
}

function verifyItemAndLocationIdsMatchSearch(suite, message, onSearchLog, label = "") {
    const provider = getSearchProvider(onSearchLog);
    if (!provider) return;

    const searchItemIds = (provider.items || []).map((item) => item?.id);
    const searchLocationIds = (provider.locations || []).map((loc) => loc?.id);

    (message?.order?.items || []).forEach((item, index) => {
        suite.addTest(new Mocha.Test(`${label}'message.order.items[${index}].id' should be an item id returned in on_search`, function () {
            expect(searchItemIds).to.include(item?.id);
        }));
    });

    (message?.order?.fulfillments || []).forEach((fulfillment, index) => {
        ["start", "end"].forEach((leg) => {
            const locationId = fulfillment?.[leg]?.location?.id;
            if (!locationId) return;

            suite.addTest(new Mocha.Test(`${label}'message.order.fulfillments[${index}].${leg}.location.id' should be a location id returned in on_search`, function () {
                expect(searchLocationIds).to.include(locationId);
            }));
        });
    });
}

function verifyFulfillmentIdsAndCoordsMatchSearch(suite, message, onSearchLog, label = "") {
    const provider = getSearchProvider(onSearchLog);
    if (!provider) return;

    const searchFulfillmentIds = new Set((provider.items || []).map((item) => item?.fulfillment_id));
    const locationsById = new Map((provider.locations || []).map((loc) => [loc?.id, loc]));

    (message?.order?.fulfillments || []).forEach((fulfillment, index) => {
        suite.addTest(new Mocha.Test(`${label}'message.order.fulfillments[${index}].id' should be a fulfillment id declared in on_search`, function () {
            expect(searchFulfillmentIds).to.include(fulfillment?.id);
        }));

        ["start", "end"].forEach((leg) => {
            const location = fulfillment?.[leg]?.location;
            const searchLocation = location?.id && locationsById.get(location.id);
            if (!searchLocation) return;

            suite.addTest(new Mocha.Test(`${label}'message.order.fulfillments[${index}].${leg}.location.gps' should be unchanged from on_search`, function () {
                expect(location?.gps).to.equal(searchLocation.gps);
            }));
        });
    });
}

function verifyQuotePriceTrail(suite, message, referenceLog, label = "") {
    const referencePrice = referenceLog?.message?.order?.quote?.price?.value;
    if (referencePrice === undefined) return;

    suite.addTest(new Mocha.Test(`${label}'message.order.quote.price.value' should follow the trail from the prior quote`, function () {
        expect(message?.order?.quote?.price?.value).to.equal(referencePrice);
    }));
}

function verifyQuotePriceMatchesSearchItem(suite, message, onSearchLog, label = "") {
    const provider = getSearchProvider(onSearchLog);
    const searchItem = provider?.items?.[0];
    const searchPrice = searchItem?.price?.value;
    if (searchPrice === undefined) return;

    suite.addTest(new Mocha.Test(`${label}'message.order.quote.price.value' should match the on_search item price (incl. tax)`, function () {
        expect(message?.order?.quote?.price?.value).to.equal(searchPrice);
    }));
}

function verifyOrderState(suite, message, allowedStates, label = "") {
    suite.addTest(new Mocha.Test(`${label}'message.order.state' should be one of [${allowedStates.join(", ")}]`, function () {
        expect(message?.order?.state).to.be.oneOf(allowedStates);
    }));
}

function verifyTimestamps(suite, message, context, { createdMatchesLog, updatedMatchesContext = true } = {}, label = "") {
    if (createdMatchesLog) {
        const referenceCreatedAt = createdMatchesLog?.message?.order?.created_at;
        if (referenceCreatedAt !== undefined) {
            suite.addTest(new Mocha.Test(`${label}'message.order.created_at' should match the prior stage's created_at`, function () {
                expect(message?.order?.created_at).to.equal(referenceCreatedAt);
            }));
        }
    }

    if (updatedMatchesContext) {
        suite.addTest(new Mocha.Test(`${label}'message.order.updated_at' should match 'context.timestamp'`, function () {
            expect(message?.order?.updated_at).to.equal(context?.timestamp);
        }));
    }
}

function verifyOrderIdMatches(suite, message, referenceLog, label = "") {
    const referenceOrderId = referenceLog?.message?.order?.id;
    if (referenceOrderId === undefined) return;

    suite.addTest(new Mocha.Test(`${label}'message.order.id' should match the order id from the confirm request`, function () {
        expect(message?.order?.id).to.equal(referenceOrderId);
    }));
}

// expectedValue: what ready_to_ship should be for a non-immediate flow.
// Immediate-delivery flows (LOG10_4) have their own separate exception
// handling in each caller (confirm/on_confirm expects "yes" there; update/
// on_update uses a different signal entirely) - so this helper is only
// called for the non-immediate default case.
function verifyReadyToShipTag(suite, message, expectedValue, label = "") {
    (message?.order?.fulfillments || []).forEach((fulfillment, index) => {
        const stateTag = (fulfillment?.tags || []).find((tag) => tag?.code === "state");
        const readyToShip = stateTag?.list?.find((entry) => entry?.code === "ready_to_ship");
        if (!readyToShip) return;

        suite.addTest(new Mocha.Test(`${label}'message.order.fulfillments[${index}].tags[state].list[ready_to_ship].value' should be '${expectedValue}'`, function () {
            expect(readyToShip.value).to.equal(expectedValue);
        }));
    });
}

module.exports = {
    lastActionLog,
    verifyProviderIdMatchesSearch,
    verifyItemAndLocationIdsMatchSearch,
    verifyFulfillmentIdsAndCoordsMatchSearch,
    verifyQuotePriceTrail,
    verifyQuotePriceMatchesSearchItem,
    verifyOrderState,
    verifyTimestamps,
    verifyOrderIdMatches,
    verifyReadyToShipTag,
    IMMEDIATE_DELIVERY_FLOW_IDS,
};
