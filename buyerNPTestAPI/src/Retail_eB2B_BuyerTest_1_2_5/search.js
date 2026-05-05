const Mocha = require("mocha");
const contextTests = require("./context");
const searchSchema = require("./schema/search.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");
const { expect } = require("chai");


function searchMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        if (constants?.flow === "RET_ENH_001" || constants?.flow === "RET_ENH_01E" || constants?.flow === "RET_ENH_00A" || constants?.flow === "RET_ENH_009_FREEBIE" || constants?.flow === "RET_ENH_009_DISCOUNT" || constants?.flow === "RET_ENH_009_COMBO" || constants?.flow === "RET_ENH_009_BUYXGETY_B" || constants?.flow === "RET_ENH_009_BUYXGETY_A" || constants?.flow === "RET_ENH_009_SLAB") {
            const testSuite = new Mocha.Suite(`on_search Request Verification`);
            testSuite.addSuite(contextTests(context, constants, logs));
            const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
                expect(message).to.exist;
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent' which is an object", function () {
                expect(message.intent).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment' which is an object`, function () {
                expect(message.intent.fulfillment).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.fulfillment.type' which is a string`, function () {
                expect(message.intent.fulfillment.type).to.exist.and.to.be.a("string");
            }));

            //not required i.e its optional
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.payment' which is an object`, function () {
                expect(message.intent.payment).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.payment.@ondc/org/buyer_app_finder_fee_type' which is a string`, function () {
                expect(message.intent.payment['@ondc/org/buyer_app_finder_fee_type']).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.payment.@ondc/org/buyer_app_finder_fee_amount' which is a string`, function () {
                expect(message.intent.payment['@ondc/org/buyer_app_finder_fee_amount']).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.intent.tags' which is an array`, function () {
                expect(message.intent.tags).to.exist.and.to.be.an("array");
            }));
            if (message?.intent?.tags) {
                const arr1 = [{ code: "catalog_full" }, { code: "bap_features" }];
                const arr2 = [{ code: "catalog_full" }, { code: "bap_features" }, { code: "bap_terms" }];
                let arr = [];
                switch (constants?.flow) {
                    case "RET_ENH_001":
                        arr = arr1;
                        break;
                    case "RET_ENH_00A":
                    case "RET_ENH_01E":
                    case "RET_ENH_009_DISCOUNT":
                    case "RET_ENH_009_BUYXGETY_B":
                    case "RET_ENH_009_BUYXGETY_A":
                    case "RET_ENH_009_FREEBIE":
                    case "RET_ENH_009_COMBO":
                    case "RET_ENH_009_SLAB":
                        arr = arr2;
                        break;
                }
                arr.forEach((ele) => {
                    const tagIndex = message?.intent?.tags.findIndex((tag) => tag?.code === ele.code);
                    const tagItem = message?.intent?.tags[tagIndex];
                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    }));


                    if (tagIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}]' should have properties named 'code' and 'list'`, function () {
                            expect(tagItem).to.have.property("code").that.is.a("string");
                            expect(tagItem).to.have.property("list").that.is.an("array");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}]' should have a property named 'code' which is a string`, function () {
                            expect(tagItem).to.have.property("code").that.is.a("string");
                        }));


                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].code' should have be equal to '${ele.code}'`, function () {
                            expect(tagItem.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));



                        const bapFeaturesArr = [{ code: "001" }];
                        const catalogArr = [{ code: "payload_type" }];
                        const bapTermsArr = [{ code: "static_terms" }, { code: "static_terms_new" }, { code: "effective_date" }];

                        let array;
                        switch (tagItem?.code) {
                            case "bap_features":
                                array = bapFeaturesArr;
                                break;
                            case "bap_terms":
                                array = bapTermsArr;
                                break;
                            case "catalog_full":
                                array = catalogArr;
                                break;
                            default:
                                break;
                        }
                        if (array) {
                            array.forEach((it) => {
                                const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.code === it.code);
                                const listItem = tagItem?.list[listItemIndex];

                                messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                    expect(listItem).to.exist.and.to.be.an("object");
                                }));


                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("code").that.is.a("string");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listItem).to.have.property("code").that.is.a("string");
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                        expect(listItem.code).to.be.equal(it.code);
                                    }));


                                    messageTestSuite.addTest(new Mocha.Test(`'message.intent.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));

                                }
                            });
                        }
                    }
                });
            }
            return messageTestSuite;
        }
        else {
            const messageTestSuite = generateTests({ context, message }, searchSchema, "Verification of Message", constants);
            return messageTestSuite;
        }
    }
    catch (err) {
        console.log(err);
    }
}

const searchMap = {
    "search": "",
    "search_mode_start": "(Mode Start)",
    "search_mode_stop": "(Mode Stop)"
}
module.exports = async function search({ context, message } = {}, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`search ${searchMap[constants.step]} request verification`);

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
        const intent = message?.intent;
        const providerIdPresent = !!intent?.provider?.id;

        // Provider validation
        if (providerIdPresent) {
            testSuite.addTest(new Mocha.Test(`'message.intent.provider.id' should be a string`, function () {
                expect(intent?.provider?.id).to.be.a("string");
            }));
        } else {
            testSuite.addTest(new Mocha.Test(`'message.intent.provider' should not be present`, function () {
                expect(intent?.provider).to.not.exist;
            }));
        }

        // Fulfillment validation
        testSuite.addTest(new Mocha.Test(`'message.intent.fulfillment.type' should be 'Delivery'`, function () {
            expect(intent?.fulfillment?.type).to.equal("Delivery");
        }));

        const customer = intent?.fulfillment?.customer;

        // Branch 1: Search without provider.id
        if (!providerIdPresent) {
            testSuite.addTest(new Mocha.Test(`'message.intent.payment' should be present`, function () {
                expect(intent?.payment).to.exist.and.to.be.an("object");
            }));

            testSuite.addTest(new Mocha.Test(`'message.intent.payment.@ondc/org/buyer_app_finder_fee_type' should be 'percent'`, function () {
                expect(intent?.payment?.["@ondc/org/buyer_app_finder_fee_type"]).to.equal("percent");
            }));

            testSuite.addTest(new Mocha.Test(`'message.intent.payment.@ondc/org/buyer_app_finder_fee_amount' should be a string`, function () {
                expect(intent?.payment?.["@ondc/org/buyer_app_finder_fee_amount"]).to.be.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'message.intent.tags' should contain 'bap_terms' and 'bap_features'`, function () {
                const tags = intent?.tags;
                expect(tags).to.be.an("array");

                const hasBapTerms = tags.some(tag => tag?.code === "bap_terms");
                const hasBapFeatures = tags.some(tag => tag?.code === "bap_features");

                expect(hasBapTerms).to.be.true;
                expect(hasBapFeatures).to.be.true;
            }));

            testSuite.addTest(new Mocha.Test(`'bap_terms' tag should have required list items`, function () {
                const bapTerms = intent?.tags?.find(tag => tag?.code === "bap_terms");
                expect(bapTerms).to.exist;
                expect(bapTerms?.list).to.be.an("array");

                const staticTerms = bapTerms.list.find(item => item?.code === "static_terms");
                const staticTermsNew = bapTerms.list.find(item => item?.code === "static_terms_new");
                const effectiveDate = bapTerms.list.find(item => item?.code === "effective_date");

                expect(staticTerms).to.exist;
                expect(staticTermsNew).to.exist;
                expect(effectiveDate).to.exist;
            }));

            testSuite.addTest(new Mocha.Test(`'bap_features' tag should have required feature codes`, function () {
                const bapFeatures = intent?.tags?.find(tag => tag?.code === "bap_features");
                expect(bapFeatures).to.exist;
                expect(bapFeatures?.list).to.be.an("array");

                bapFeatures.list.forEach(item => {
                    expect(item?.code).to.be.a("string");
                });
            }));
        }

        // Branch 2: Search with provider.id
        if (providerIdPresent) {
            testSuite.addTest(new Mocha.Test(`'context.bpp_id' should be a string`, function () {
                expect(context.bpp_id).to.be.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'context.bpp_uri' should be a string`, function () {
                expect(context.bpp_uri).to.be.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'message.intent.fulfillment.customer' should be present`, function () {
                expect(customer).to.exist.and.to.be.an("object");
            }));

            const hasCustomerId = !!customer?.id;
            const hasPersonCreds = Array.isArray(customer?.person?.creds) && customer.person.creds.length > 0;

            if (hasCustomerId) {
                testSuite.addTest(new Mocha.Test(`'customer.id' should be a string`, function () {
                    expect(customer?.id).to.be.a("string");
                }));
            } else {
                testSuite.addTest(new Mocha.Test(`'customer.person.creds' should be present`, function () {
                    expect(hasPersonCreds).to.be.true;
                }));

                testSuite.addTest(new Mocha.Test(`'customer.person.creds' should contain id and type`, function () {
                    const creds = customer?.person?.creds || [];
                    // const types = creds.map(c => c?.type);

                    creds.forEach(cred => {
                        expect(cred?.id).to.be.a("string");
                        expect(cred?.type).to.be.a("string");
                    });
                }));

                testSuite.addTest(new Mocha.Test(`'customer.organization' should be present`, function () {
                    expect(customer?.organization).to.exist.and.to.be.an("object");
                }));

                testSuite.addTest(new Mocha.Test(`'customer.organization.descriptor.name' should be a string`, function () {
                    expect(customer?.organization?.descriptor?.name).to.be.a("string");
                }));

                testSuite.addTest(new Mocha.Test(`'customer.organization.address' should be a string`, function () {
                    expect(customer?.organization?.address).to.be.a("string");
                }));

                testSuite.addTest(new Mocha.Test(`'customer.organization.city.code' should be a string`, function () {
                    expect(customer?.organization?.city?.code).to.be.a("string");
                }));

                testSuite.addTest(new Mocha.Test(`'customer.organization.state.code' should be a string`, function () {
                    expect(customer?.organization?.state?.code).to.be.a("string");
                }));

                testSuite.addTest(new Mocha.Test(`'customer.contact.phone' should be a string`, function () {
                    expect(customer?.contact?.phone).to.be.a("string");
                }));
            }
        }

        // Optional: ensure payment is not present when provider is present
        if (providerIdPresent) {
            testSuite.addTest(new Mocha.Test(`'message.intent.payment' should not be present`, function () {
                expect(intent?.payment).to.not.exist;
            }));
        }

        // Optional: validate tags are not used in provider-based customer search
        // Uncomment if your spec says tags/payment should not be sent in this flow.
        // if (providerIdPresent) {
        //     testSuite.addTest(new Mocha.Test(`'message.intent.tags' should not be present`, function () {
        //         expect(intent?.tags).to.not.exist;
        //     }));
        // }
        if (constants?.step === "search_p2p") {
            //context should have bpp_id and bpp_uri
            testSuite.addTest(new Mocha.Test(`'context.bpp_id' should be a string`, function () {
                expect(context.bpp_id).to.be.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'context.bpp_uri' should be a string`, function () {
                expect(context.bpp_uri).to.be.a("string");
            }));

            const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.provider.id'", function () {
                expect(message?.intent?.provider?.id).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.type' as 'Delivery'", function () {
                expect(message?.intent?.fulfillment?.type).to.equal("Delivery");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.intent.fulfillment.customer'", function () {
                expect(message?.intent?.fulfillment?.customer).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify 'customer' has either 'id' or 'person.creds' with valid elements", function () {
                const customer = message?.intent?.fulfillment?.customer;
                const hasId = customer?.id && typeof customer.id === "string";
                const hasCreds = customer?.person?.creds && Array.isArray(customer.person.creds) && customer.person.creds.length > 0;

                expect(hasId || hasCreds, "Customer must have either 'id' or 'person.creds'").to.be.true;

                if (hasCreds) {
                    customer.person.creds.forEach(cred => {
                        expect(cred.id).to.exist.and.to.be.a("string");
                        expect(cred.type).to.exist.and.to.be.a("string");
                    });
                }
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify 'message.intent' does not contain 'payment' tags", function () {
                expect(message?.intent?.payment).to.not.exist;
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify 'message.intent' does not contain 'bap_features' or 'bap_terms' tags", function () {
                const tags = message?.intent?.tags;
                if (tags && Array.isArray(tags)) {
                    const hasBapFeatures = tags.some(tag => tag?.code === 'bap_features');
                    const hasBapTerms = tags.some(tag => tag?.code === 'bap_terms');
                    expect(hasBapFeatures, "Intent tags should not contain 'bap_features'").to.be.false;
                    expect(hasBapTerms, "Intent tags should not contain 'bap_terms'").to.be.false;
                }
            }));
        }

        if (constants?.step !== "search_mode_stop") {
            const responseTestSuite = response_verification({ context, message }, logs);
            return [testSuite, responseTestSuite];
        }

        return [testSuite, messageTestSuite];
    } catch (err) {
        console.log(err);
    }
}