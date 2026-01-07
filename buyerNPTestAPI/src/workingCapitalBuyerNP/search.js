const Mocha = require("mocha");
const contextTests = require("./context");
const searchOneSchema = require("./schema/search_one.schema");
const searchTwoSchema = require("./schema/search_two.schema");
const searchThreeSchema = require("./schema/search_three.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function searchOneMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, searchOneSchema, "Verification of Message for search");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function searchTwoMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, searchTwoSchema, "Verification of Message for search");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function searchThreeMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, searchThreeSchema, "Verification of Message for search");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function search({ context, message } = {}, step, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`search (${step}) request verification`);



        testSuite.addSuite(contextTests(context, constants, logs));
        switch (step) {
            case "I":
                testSuite.addSuite(searchOneMessageTests({ context, message }, constants));
                break;
            case "II":
                testSuite.addSuite(searchTwoMessageTests({ context, message }, constants));
                break;
            case "III":
                testSuite.addSuite(searchThreeMessageTests({ context, message }, constants));
                break;
            default:
                break;
        }
        function runResponseVerification(context, message, logs, constants) {
            return response_verification({ context, message }, logs, constants);
        }
        let responseTestSuite;
        switch (step) {
            case "II":
            case "III":
            case "IV":
                responseTestSuite = runResponseVerification(context, message, logs, constants);
                break;
            default:
                break;
        }
        // testSuite.addSuite(searchMessageTests({ context, message }, constants));



        if (responseTestSuite) {
            return [testSuite, responseTestSuite];
        } else { return [testSuite] }
    } catch (err) {
        console.log(err);
    }
}