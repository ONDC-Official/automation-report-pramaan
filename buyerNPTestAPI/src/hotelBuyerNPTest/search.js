const Mocha = require("mocha");
const contextTests = require("./context");
const searchSchema = require("./schema/search.schema");
const searchcatalogSchema = require("./schema/searchcatalog.schema");
const searchtimerangeSchema = require("./schema/searchtimerange.schema");
const searchoptionalSchema = require("./schema/searchoptional.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");


function searchMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, searchSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function searchMessageCatalogTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, searchcatalogSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function searchMessageTimerangeTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, searchtimerangeSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function searchMessageOptionalTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, searchoptionalSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function runResponseVerification(context, message, logs, constants) {
    return response_verification({ context, message }, logs, constants);
}

module.exports = async function search({ context, message } = {}, step, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`search (${step}) request verification`);

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(searchMessageTests({ context, message }, constants));


        switch (step) {
            case "I":
                testSuite.addSuite(searchMessageTests({ context, message }, constants));
                break;
            case "II":
                testSuite.addSuite(searchMessageCatalogTests({ context, message }, constants));
                break;
            case "III":
                testSuite.addSuite(searchMessageTimerangeTests({ context, message }, constants));
                break;
            case "IV":
                testSuite.addSuite(searchMessageOptionalTests({ context, message }, constants));
                break;
            default:
                break;
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
        if (responseTestSuite) {
            return [testSuite, responseTestSuite];
        } else { return [testSuite] }
    } catch (err) {
        console.log(err);
    }
}