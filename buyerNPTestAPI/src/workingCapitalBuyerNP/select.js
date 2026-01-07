const Mocha = require("mocha");
const contextTests = require("./context");
const selectOneSchema = require("./schema/select_one.schema");
const selectTwoSchema = require("./schema/select_two.schema");
const selectThreeSchema = require("./schema/select_three.schema");
const response_verification = require("../centralizedUtilities/responseVerification");


const { generateTests } = require("./common");


function selectOneMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, selectOneSchema, "Verification of Message for select");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function selectTwoMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, selectTwoSchema, "Verification of Message for select");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function selectThreeMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, selectThreeSchema, "Verification of Message for select");
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function select({ context, message } = {}, step, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`select (${step}) request verification`);
        

       testSuite.addSuite(contextTests(context, constants, logs));
        // testSuite.addSuite(searchMessageTests({ context, message }, constants));
        switch (step) {
            case "I":
                testSuite.addSuite(selectOneMessageTests({ context, message }, constants));
                break;
            case "II":
                testSuite.addSuite(selectTwoMessageTests({ context, message }, constants));
                break;
            case "III":
                testSuite.addSuite(selectThreeMessageTests({ context, message }, constants));
                break;
            default:
                break;
        }
        const responseTestSuite = response_verification({ context, message }, logs,constants);


        return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}