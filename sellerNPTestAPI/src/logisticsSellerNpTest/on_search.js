const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const onSearchSchema = require("./schema/on_search.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);

        return log?.length ? log[log?.length - 1]?.request : false;
    } catch (err) {
        console.log(err);
    }
}
function onSearchMessageTests({ context, message }, logs = []) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onSearchSchema, "Verification of Message");
        const searchLogs = lastActionLog(logs, "search");
        const categoryId = searchLogs?.message?.intent?.category?.id
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog.bpp/providers' which is an array", function () {
            expect(message.catalog["bpp/providers"]).to.exist.and.to.be.an("array");
        }));

        if (message.catalog["bpp/providers"] && message.catalog["bpp/providers"].length > 0) {
            message.catalog["bpp/providers"].forEach((provider, providerIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories' which is an array`, function () {
                    expect(provider.categories).to.exist.and.to.be.an("array");
                }));

                if (provider?.categories && provider?.categories.length > 0) {
                    provider.categories.forEach((category, categoryIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${categoryIndex}]' which is an object`, function () {
                            expect(category).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${categoryIndex}].id' which is a string and should be equal to the category sent in search call`, function () {
                            expect(category.id).to.exist.and.to.be.a("string").and.to.be.deep.equal(categoryId);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${categoryIndex}].time' which is an object`, function () {
                            expect(category.time).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${categoryIndex}].time.label' which is a string `, function () {
                            expect(category.time.label).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${categoryIndex}].time.timestamp' which is a string `, function () {
                            expect(category.time.timestamp).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.bpp/providers[${providerIndex}].categories[${categoryIndex}].time.duration' which is a string `, function () {
                            expect(category.time.duration).to.exist.and.to.be.a("string")
                        }));

                    })
                }
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


module.exports = async function on_search({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite("on_search request verification");
        const constants = { action: "on_search", core_version: "1.2.0" };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onSearchMessageTests({ context, message }, logs));

        return [responseTestSuite, testSuite];

    } catch (err) {
        console.log(err);
    }
}