const Mocha = require("mocha");
const { expect } = require("chai");
const onSearchSchema = require("./schema/on_search.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function onSearchMessageTests({ context, message, flowId }) {
    try {
        const messageTestSuite = generateTests({ context, message }, onSearchSchema, "Verification of Message");

        const categoryFlowMap = [
            { flowId: "LOG10_1", expected: "Standard Delivery" },
            { flowId: "LOG10_2", expected: "Same Day Delivery" },
            { flowId: "LOG10_3", expected: "Next Day Delivery" },
            { flowId: "LOG10_4", expected: "Immediate Delivery" },
            { flowId: "LOG10_5", expected: "Express Delivery" }
        ];


        categoryFlowMap.forEach(({ flowId: mappedFlowId, expected }) => {
            if (flowId === mappedFlowId) {
                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_21] message.catalog.bpp/providers[0].categories[0].id should be '${expected}'`, function () {
                    const providers = message?.catalog?.["bpp/providers"];
                    const categoryId = providers?.[0]?.categories?.[0]?.id;

                    expect(categoryId, `Expected categoryId '${expected}', but got '${categoryId}'`).to.equal(expected);
                }));
            }
        });

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
                messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_53] message.catalog.bpp/providers[0].items[0].category_id should be '${expected}'`, function () {
                    const providers = message?.catalog?.["bpp/providers"];
                    const categoryId = providers?.[0]?.items?.[0]?.category_id;
                    console.log(categoryId)
                    expect(categoryId, `Expected category_id '${expected}', but got '${categoryId}'`).to.equal(expected);
                }));
            }
        });


        // bpp/descriptor tests
        {
            const bppTagArr = [{ code: "bpp_terms" }];
            bppTagArr.forEach((ele) => {
                const tagIndex = message?.catalog?.["bpp/descriptor"]?.tags?.findIndex(tag => tag?.code === ele.code);
                const tagItem = message?.catalog?.["bpp/descriptor"]?.tags?.[tagIndex];

                messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_05] 'bpp/descriptor.tags' should have an object with code '${ele.code}'`, function () {
                    expect(tagItem).to.exist.and.to.be.an("object");
                }));

                if (tagIndex !== -1) {
                    messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_06] 'bpp/descriptor.tags[${tagIndex}].code' should be '${ele.code}'`, function () {
                        expect(tagItem.code).to.equal(ele.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_07] 'bpp/descriptor.tags[${tagIndex}].list' should be a non-empty array`, function () {
                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    }));

                    const listItems = [{ code: "static_terms" }, { code: "static_terms_new" }, { code: "effective_date" }];
                    listItems.forEach((li) => {
                        const listIndex = tagItem?.list.findIndex(entry => entry?.code === li.code);
                        const listItem = tagItem?.list[listIndex];

                        messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_08_${li.code}] 'bpp/descriptor.tags[${tagIndex}].list' should include code '${li.code}'`, function () {
                            expect(listItem).to.exist.and.to.be.an("object");
                        }));

                        if (listItem) {
                            messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_09_${li.code}] 'bpp/descriptor.tags[${tagIndex}].list[${listIndex}].code' should be '${li.code}'`, function () {
                                expect(listItem.code).to.equal(li.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_10_${li.code}] 'bpp/descriptor.tags[${tagIndex}].list[${listIndex}].value' should be a string`, function () {
                                expect(listItem.value).to.be.a("string");
                            }));

                            if (li.code === "static_terms_new") {
                                messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_11_${li.code}] 'bpp/descriptor.tags[${tagIndex}].list[${listIndex}].value' should be a valid URL`, function () {
                                    expect(listItem.value).to.match(/^https?:\/\/[^\s]+$/);
                                }));
                            }

                            if (li.code === "effective_date") {
                                messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_10_${li.code}] 'bpp/descriptor.tags[${tagIndex}].list[${listIndex}].value' should be a valid ISO date string`, function () {
                                    expect(listItem.value).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
                                }));
                            }
                        }
                    });
                }
            });
        }

        // Tags
        {
            const providerTagArr = [
                {
                    code: "lsp_features",
                    list: [
                        { code: "009", value: "yes" },
                        { code: "008", value: "yes" }
                    ]
                },
                // {
                //     code: "special_req",
                //     list: [
                //         { code: "cod_order", value: "yes" }
                //     ]
                // }
            ];

            providerTagArr.forEach((ele) => {
                const tagIndex = message?.catalog?.["bpp/providers"]?.[0]?.tags?.findIndex(tag => tag?.code === ele.code);
                const tagItem = message?.catalog?.["bpp/providers"]?.[0]?.tags?.[tagIndex];

                messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_67] 'bpp/providers[0].tags' should have an object with code '${ele.code}' (OPTIONAL))`, function () {
                    expect(tagItem).to.exist.and.to.be.an("object");
                }));

                if (tagItem && Array.isArray(ele.list)) {
                    messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_68] 'bpp/providers[0].tags[${tagIndex}].code' should be '${ele.code}'(OPTIONAL)`, function () {
                        expect(tagItem.code).to.equal(ele.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_69] 'bpp/providers[0].tags[${tagIndex}].list' should be a non-empty array (OPTIONAL)`, function () {
                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    }));

                    ele.list.forEach((li) => {
                        const listIndex = tagItem.list.findIndex(entry => entry?.code === li.code);
                        const listItem = tagItem.list[listIndex];

                        messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_70] 'bpp/providers[0].tags[${tagIndex}].list' should include code '${li.code}'(OPTIONAL)`, function () {
                            expect(listItem).to.exist.and.to.be.an("object");
                        }));

                        if (listItem) {
                            messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_71] 'bpp/providers[0].tags[${tagIndex}].list[${listIndex}].code' should be '${li.code}'(OPTIONAL)`, function () {
                                expect(listItem.code).to.equal(li.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[ id: b2c_log_bpp_on_search_message_72] 'bpp/providers[0].tags[${tagIndex}].list[${listIndex}].value' should be '${li.value}'(OPTIONAL)`, function () {
                                expect(listItem.value).to.equal(li.value);
                            }));
                        }
                    });
                }
            });
        }


        // Only for ("LOG11")
        {
            if (flowId?.startsWith("LOG11")) {
                const providers = message?.catalog?.["bpp/providers"] || [];

                providers.forEach((provider, pIndex) => {
                    const locations = provider?.locations;

                    messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_40] 'message.catalog["bpp/providers"][${pIndex}].locations' should be a non-empty array`, function () {
                        expect(locations).to.be.an("array").that.is.not.empty;
                    }));

                    locations?.forEach((location, lIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_41] locations[${lIndex}] should be an object`, function () {
                            expect(location).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_42] locations[${lIndex}].id should be a non-empty string`, function () {
                            expect(location?.id).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_43] locations[${lIndex}].gps should be a non-empty string`, function () {
                            expect(location?.gps).to.be.a("string").that.is.not.empty;
                        }));

                        const address = location?.address;
                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_44] locations[${lIndex}].address should be an object`, function () {
                            expect(address).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_45] locations[${lIndex}].address.street should be a non-empty string`, function () {
                            expect(address?.street).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_46] locations[${lIndex}].address.city should be a non-empty string`, function () {
                            expect(address?.city).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_47] locations[${lIndex}].address.area_code should be a non-empty string`, function () {
                            expect(address?.area_code).to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: b2c_log_bpp_on_search_message_48] locations[${lIndex}].address.state should be a non-empty string`, function () {
                            expect(address?.state).to.be.a("string").that.is.not.empty;
                        }));
                    });
                });
            }
        }

        if (message?.catalog['bpp/providers'] && message?.catalog['bpp/providers'].length > 0) {
            message?.catalog['bpp/providers'].forEach((provider, providerIndex) => {

                if (provider?.items && provider?.items.length > 0) {
                    provider?.items.forEach((item, i) => {

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}]' which is an object`, function () {
                            expect(item).to.exist.and.to.be.an("object");
                        }));
                        if (item?.fulfillment_id === "1") {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].parent_item_id' which is a string (OPTIONAL)`, function () {
                                expect(item.parent_item_id).to.exist.and.to.be.a("string").and.to.be.empty;
                            }))
                        }
                        else {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].items[${i}].parent_item_id' which is a string (OPTIONAL)`, function () {
                                expect(item.parent_item_id).to.exist.and.to.be.a("string");
                            }))
                        }
                    })
                }
            })
        }
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_search({ context, message } = {}, logs = [], flowId = "", testCaseId = "") {
    try {
        const testSuite = new Mocha.Suite("on_search request verification");
        const constants = { action: "on_search", core_version: "1.2.5" };

        const contextTests = require("./context");
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onSearchMessageTests({ context, message, flowId }));
        const responseTestSuite = response_verification({ context, message }, logs);

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
};
