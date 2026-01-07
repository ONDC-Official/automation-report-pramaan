const Mocha = require("mocha");
const contextTests = require("./context");
const onSearchOneSchema = require("./schema/on_search_one.schema");
const onSearchTwoSchema =  require("./schema/on_search_two.schema");
const onSearchThreeSchema = require("./schema/on_search_three.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

///const { checkVariant, checkCustomization } = require("./businessTests");

function onSearchOneMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onSearchOneSchema, "Verification of Message", constants);
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function onSearchTwoMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onSearchTwoSchema, "Verification of Message", constants);
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


function onSearchThreeMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onSearchThreeSchema, "Verification of Message", constants);
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}



module.exports = async function on_search({ context, message }, step="", logs = [], constants = {}) {
    try {
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        const testSuite = new Mocha.Suite(`on_search (${step}) request verification`);
        constants = {
            ...constants,
            action: "on_search",
            version: "2.0.0",
            step:step
        };

        testSuite.addSuite(contextTests(context, constants, logs));
       // testSuite.addSuite(onSearchOneMessageTests({ context, message }, constants));
       switch (step) {
        case "I":
            testSuite.addSuite(onSearchOneMessageTests({ context, message }, constants));
            break;
        case "II":
            testSuite.addSuite(onSearchTwoMessageTests({ context, message }, constants));
            break;
        case "III":
            testSuite.addSuite(onSearchThreeMessageTests({ context, message }, constants));
            break;
        default:
            break;
    }

        return [ testSuite,responseTestSuite];;
    } catch (err) {
        console.log(err);
    }
}