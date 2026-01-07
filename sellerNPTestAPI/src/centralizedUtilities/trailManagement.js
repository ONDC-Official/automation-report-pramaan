const Mocha = require("mocha");
const { expect } = require("chai");

// we'll be overriding the trail according to our logic
// having a copy of the trail -> source of truth 
function updateTrail(trail = {}, currentOrder, operation, error = {}) {
    let items, breakup = [], total = 0;

    switch (operation) {
        case "select":
            return {
                items: currentOrder.items,
                fulfillments: currentOrder.fulfillments,
                quote: {}
            }
        case "on_select":
            // items = selected in /select -> available - not available
            // fulfillments = fulfillments that are mapped to the selected items
            // quote = adding the content of items with price from the selected items and adding rest
            // of the keys
            items = currentOrder.items.map((currentItem) => {
                const isInTrail = trail.items.find((trailItem) => trailItem.id === currentItem.id);

                if (isInTrail) {
                    return {
                        ...currentItem,
                        quantity: isInTrail.quantity
                    }
                }

                return null;
            }).filter((ele) => ele !== null);

            const quoteMap = {};
            items.forEach((item) => {
                // item level charges
                quoteMap[item.id] = currentOrder.quote.breakup.filter((ele) => ele['@ondc/org/item_id'] === item.id).map((ele) => {
                    switch (ele['@ondc/org/title_type']) {
                        case "item":
                            let count = item.quantity.count;

                            // if the item is not available
                            if (typeof error.message) {
                                const itemsNotAvailable = JSON.parse(error.message ?? "[]");
                                const isPartOfNotAvailable = itemsNotAvailable.find((ele) => ele.item_id === item.id);

                                if (isPartOfNotAvailable) {
                                    count = 0;
                                }
                            }

                            return {
                                ...ele,
                                "@ondc/org/item_quantity": {
                                    count: count
                                },
                                price: {
                                    currency: "INR",
                                    value: (Number(ele.item.price.value) * Number(count)).toFixed(2)
                                }
                            };
                    }
                });

                // fulfillment level charges
                quoteMap[item.fulfillment_id] = currentOrder.quote.breakup.filter((ele) => ele['@ondc/org/item_id'] === item.fulfillment_id);
            })

            Object.keys(quoteMap).map((key) => {
                breakup = [...breakup, ...(quoteMap[key] || [])]
            });

            breakup.forEach((ele) => {
                total += Number(ele.price.value);
            })

            return {
                items: items,
                fulfillments: currentOrder.fulfillments.filter((fulfillment) => {
                    return items.find((item) => item.fulfillment_id === fulfillment.id);
                }),
                quote: {
                    price: {
                        currency: "INR",
                        value: total.toFixed(2)
                    },
                    breakup: breakup,
                    ttl: currentOrder.quote.ttl
                }
            }
        case "init":
        case "on_confirm":
        case "confirm":

    }
}

/**
 *  function to validate the tags content
 */
function tagsTests(testSuite, trailTags = [], currentTags = [], prefix) {
    trailTags.forEach((trailTag) => {
        const tagIndex = currentTags.findIndex((tag) => (tag.code === trailTag.code));
        const tag = tagIndex !== -1 ? currentTags[tagIndex] : undefined;

        testSuite.addTest(new Mocha.Test(`${prefix}.tags should have a tag with type: ${trailTag.code}`, function () {
            expect(tag).to.exist.and.to.be.an("object");
        }));

        if (tag) {
            testSuite.addTest(new Mocha.Test(`'${prefix}.tags[${tagIndex}].code' should be ${trailTag.code}`, function () {
                expect(tag.code).to.equal(trailTag.code);
            }));

            trailTag.list((trailListItem) => {
                const listItemIndex = tag.list((listItem) => (listItem.code === trailListItem.code));
                const listItem = listItemIndex !== -1 ? tag.list[listItemIndex] : undefined;

                testSuite.addTest(new Mocha.Test(`'${prefix}.tags[${tagIndex}].list' should have an object with type: ${trailListItem.code}`, function () {
                    expect(listItem).to.exist.and.to.be.an("object");
                }));

                if (listItem) {
                    testSuite.addTest(new Mocha.Test(`'${prefix}.tags[${tagIndex}].list[${listItemIndex}].code' should be ${trailListItem.code}`, function () {
                        expect(listItem.code).to.equal(trailListItem.code);
                    }));

                    testSuite.addTest(new Mocha.Test(`'${prefix}.tags[${tagIndex}].list[${listItemIndex}].value' should be ${trailListItem.value}`, function () {
                        expect(listItem.value).to.equal(trailListItem.value);
                    }));
                }
            })
        }
    })
}

/**
 * trail -> {
 *  items: [],
 *  fulfillments: [],
 *  quote: {}
 * } -> the trail that has been calculated post operation on the order state, whether 
 * it is return or RTO, etc
 * 
 * currentOrder -> current order state
 * metaData -> info like action, etc
 */
function trailTests(trail, currentOrder, metaData) {
    const trailTestSuite = new Mocha.Suite("Trail Tests");
    const prefix = 'message.order';

    const { items: currentItems, fulfillments: currentFulfillments, quote: currentQuote } = currentOrder;
    const { items: trailItems, fulfillments: trailFulfillments, quote: trailQuote } = trail;

    // validating the items
    trailItems.forEach((trailItem) => {
        /** Since there can be multiple entries with same item.id as in case of 
         * - on_update [return]
         * - on_cancel [RTO]
         *  
         *  We'll be relying on the trail data to be the source of truth
         */
        const index = currentItems.findIndex((currentItem) => (currentItem.id === trailItem.id && currentItem.fulfillment_id === trailItem.fulfillment_id));
        const item = index !== -1 ? currentItems[index] : undefined;

        trailTestSuite.addTest(new Mocha.Test(`${prefix}.items should have an item with id: ${trailItem.id} and fulfillment_id ${trailItem.fulfillment_id}`, function () {
            expect(item).to.exist.and.to.be.an("object");
        }));

        if (item) {
            if (["ONDC:RET11"].includes(metaData.domain)) {
                // verifying that the fulfillment_id is same
                trailTestSuite.addTest(new Mocha.Test(`'${prefix}.items[${index}].parent_item_id' should be equal to ${trailItem.parent_item_id}`, function () {
                    expect(item.parent_item_id).to.exist.and.to.equal(trailItem.parent_item_id);
                }));

                // tests for tags
                tagsTests(trailTestSuite, trailItem.tags, item.tags, prefix + `.items[${index}]`);
            }

            // verifying that the fulfillment_id is same
            trailTestSuite.addTest(new Mocha.Test(`'${prefix}.items[${index}].fulfillment_id' should be equal to ${trailItem.fulfillment_id}`, function () {
                expect(item.fulfillment_id).to.exist.and.to.equal(trailItem.fulfillment_id);
            }));

            const isValidFulfillment = currentFulfillments.findIndex((currentFulfillment) => currentFulfillment.id === trailItem.fulfillment_id);
            trailTestSuite.addTest(new Mocha.Test(`'${prefix}.items[${index}].fulfillment_id' should map to a valid fulfillment`, function () {
                expect(isValidFulfillment).to.not.equal(-1);
            }));

            // verifying that the location_id is same
            trailTestSuite.addTest(new Mocha.Test(`'${prefix}.items[${index}].location_id' should be equal to ${trailItem.location_id}`, function () {
                expect(item.location_id).to.exist.and.to.equal(trailItem.location_id);
            }));

            // verifying that the quantity is same
            trailTestSuite.addTest(new Mocha.Test(`'${prefix}.items[${index}].quantity.count' should be equal to ${trailItem.quantity.count}`, function () {
                expect(item.quantity.count).to.exist.and.to.equal(trailItem.quantity.count);
            }))
        }
    });


    // validating the quotes
    trailTestSuite.addSuite(new Mocha.Suite(`'${prefix}.quote.price.currency' should be equal to ${trailQuote.price.currency}`, function () {
        expect(currentQuote.price.currency).to.equal(trailQuote.price.currency);
    }));

    trailTestSuite.addSuite(new Mocha.Suite(`'${prefix}.quote.price.value' should be equal to ${trailQuote.price.value}`, function () {
        expect(currentQuote.price.value).to.equal(trailQuote.price.value);
    }));

    // validating the fulfillments array
    trailFulfillments.forEach((trailFulfillment) => {
        const index = currentFulfillments.findIndex((currentFulfillment) => currentFulfillment.id === trailFulfillment.id);
        const fulfillment = index !== -1 ? currentFulfillments[index] : undefined;

        trailTestSuite.addTest(new Mocha.Test(`'${prefix}.fulfillments[${index}].type' should be equal to: ${trailFulfillment.type}`, function () {
            expect(fulfillment.type).to.equal(trailFulfillment.type);
        }));

        trailTestSuite.addTest(new Mocha.Test(`'${prefix}.fulfillments[${index}].state.descriptor.code' should be equal to: ${trailFulfillment.state.descriptor.code}`, function () {
            expect(fulfillment.state.descriptor.code).to.equal(trailFulfillment.state.descriptor.code);
        }));

        // tags validation
        tagsTests(trailTestSuite, trailFulfillment.tags, fulfillment.tags, prefix + `.fulfillments[${index}]`)
    })

    return trailTestSuite;
}

module.exports = {
    updateTrail,
    trailTests
}