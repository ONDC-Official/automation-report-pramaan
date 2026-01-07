const Mocha = require("mocha");
const contextTests = require("./context");
const searchSchema = require("./schema/search.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");
const { expect } = require("chai");


function searchMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, searchSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
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