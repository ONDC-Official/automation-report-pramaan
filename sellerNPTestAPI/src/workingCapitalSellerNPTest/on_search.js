const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const on_searchOneSchema = require("./schema/on_search_one.schema");
const on_searchThreeSchema = require("./schema/on_search_three.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function validateFulfillments(message, step) {
    const testSuite = new Mocha.Suite("Fulfillments Validation");

    if (message.catalog?.providers && Array.isArray(message.catalog.providers)) {
        message.catalog?.providers.forEach((provider, providerIndex) => {
            if (step === "III") {
                testSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments' should exist and be an array`, function () {
                    expect(provider.fulfillments).to.exist.and.to.be.an("array");
                }));

                if (provider?.fulfillments && provider?.fulfillments?.length > 0) {
                    provider?.fulfillments?.forEach((fulfillment, index) => {
                        testSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].fulfillments[${index}].id' should exist and be a string`, function () {
                            expect(fulfillment.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                        }));

                        if (fulfillment.customer?.person) {
                            const person = fulfillment.customer.person;
                            testSuite.addTest(new Mocha.Test(`'person.name' should exist and be a string`, function () {
                                expect(person.name).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                            }));
                            if (person.dob) {
                                testSuite.addTest(new Mocha.Test(`'person.dob' should be a string`, function () {
                                    expect(person.dob).to.be.a("string").with.length.greaterThan(0);
                                }));
                            }
                            if (person.gender) {
                                testSuite.addTest(new Mocha.Test(`'person.gender' should be a string`, function () {
                                    expect(person.gender).to.be.a("string").with.length.greaterThan(0);
                                }));
                            }
                            if (Array.isArray(person.creds)) {
                                person.creds.forEach((cred, credIndex) => {
                                    testSuite.addTest(new Mocha.Test(`'person.creds[${credIndex}].id' should exist and be a string`, function () {
                                        expect(cred.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                                    }));
                                    testSuite.addTest(new Mocha.Test(`'person.creds[${credIndex}].type' should exist and be a string`, function () {
                                        expect(cred.type).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                                    }));
                                });
                            }
                        }

                        if (Array.isArray(fulfillment.tags)) {
                            fulfillment.tags.forEach((tag, tagIndex) => {
                                if (Array.isArray(tag.list)) {
                                    tag.list.forEach((listItem, listIndex) => {
                                        testSuite.addTest(new Mocha.Test(`'tags[${tagIndex}].list[${listIndex}].descriptor.code' should exist and be a string`, function () {
                                            expect(listItem.descriptor.code).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                                        }));
                                        testSuite.addTest(new Mocha.Test(`'tags[${tagIndex}].list[${listIndex}].descriptor.name' should exist and be a string`, function () {
                                            expect(listItem.descriptor.name).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                                        }));
                                        testSuite.addTest(new Mocha.Test(`'tags[${tagIndex}].list[${listIndex}].value' should exist and be a string`, function () {
                                            expect(listItem.value).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                                        }));
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    return testSuite;
}

function on_searchMessageTests({ context, message } = {}, constants = {}) {
    try {
        let schema;
        const { step } = constants;

        switch (step) {
            case "I":
            case "II":
                schema = on_searchOneSchema;
                break;
            case "III":
                schema = on_searchThreeSchema;
                break;
            default:
                break;
        }

        // Generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, schema, "Verification of Message for on_search", constants);

        message?.catalog?.providers?.forEach((provider, providerIndex) => {
            provider?.items?.forEach((item, itemIndex) => {
                const xinput = item?.xinput;

                if (!xinput) return;

                // only for WC_12 + Step II
                if (constants?.flowId === "WC_12" && constants?.step === "II") {

                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_32] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.form.id' should exist and be a non-empty string`, function () {
                        expect(xinput?.form?.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_33] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.form_response.status' should exist and be a non-empty string`, function () {
                        expect(xinput?.form_response?.status).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_34] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.form_response.submission_id' should exist and be a non-empty string`, function () {
                        expect(xinput?.form_response?.submission_id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));

                } else {
                    // other flows/steps
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_35] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.head.descriptor.name' should exist and be a non-empty string`, function () {
                        expect(xinput?.head?.descriptor?.name).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_33] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.head.index.min' should exist and be a number`, function () {
                        expect(xinput?.head?.index?.min).to.exist.and.to.be.a("number");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_37] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.head.index.cur' should exist and be a number`, function () {
                        expect(xinput?.head?.index?.cur).to.exist.and.to.be.a("number");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_38] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.head.index.max' should exist and be a number`, function () {
                        expect(xinput?.head?.index?.max).to.exist.and.to.be.a("number");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_39] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.head.headings' should exist and be a non-empty array`, function () {
                        expect(xinput?.head?.headings).to.exist.and.to.be.an("array").that.is.not.empty;
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_40] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.form.id' should exist and be a non-empty string`, function () {
                        expect(xinput?.form?.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_41] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.form.mime_type' should exist and be a string`, function () {
                        expect(xinput?.form?.mime_type).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_42] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.form.url' should exist and be a non-empty string`, function () {
                        expect(xinput?.form?.url).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_search_message_43] 'message.catalog.providers[${providerIndex}].items[${itemIndex}].xinput.required' should exist and be a boolean`, function () {
                        expect(xinput?.required).to.exist.and.to.be.a("boolean");
                    }));
                }
            });
        });

        messageTestSuite.addSuite(validateFulfillments(message, step));


        return messageTestSuite;
    } catch (err) {
        console.log(err);
        const errorTestSuite = new Mocha.Suite("Error in verification of message of on_search call");
        errorTestSuite.addTest(new Mocha.Test("Couldn't verify the message of on_search as payload might be missing or Some Internal Error", function () {
            expect(true).to.equal(false);
        }));
        return errorTestSuite;
    }
}

module.exports = async function on_search({ context, message } = {}, step = "", flowId,logs = [],constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_search (${step}) request verification`);
       
        

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(on_searchMessageTests({ context, message }, constants));

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
};
