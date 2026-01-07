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

        testSuite.addSuite(searchMessageTests({ context, message }, constants));

        if (constants?.step !== "search_mode_stop") {
            const responseTestSuite = response_verification({ context, message }, logs);
            return [testSuite, responseTestSuite];
        }

        return [testSuite];
    } catch (err) {
        console.log(err);
    }
}