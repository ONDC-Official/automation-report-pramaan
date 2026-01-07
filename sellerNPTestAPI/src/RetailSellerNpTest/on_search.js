const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require('chai');
const onSearchSchema = require("./schema/on_search.schema");
const { generateTests } = require("./common");
const { checkVariant, checkCustomization } = require("./businessTests");

function onSearchMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onSearchSchema, "Verification of Message", constants);
        const providers = message?.catalog['bpp/providers'] || [];

        providers.forEach((provider) => {
            provider?.items?.forEach((item) => {
                switch (constants?.domain) {
                    case "ONDC:RET11":
                        messageTestSuite.addSuite(checkCustomization({ categories: provider?.categories, item }));
                        break;
                    default:
                        messageTestSuite.addSuite(checkVariant({ categories: provider?.categories, item }));
                        break;
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

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}