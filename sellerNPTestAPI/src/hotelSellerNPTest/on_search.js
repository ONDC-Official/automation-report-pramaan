const Mocha = require("mocha");
const contextTests = require("./context");
const onSearchSchema = require("./schema/on_search.schema");
const onSearchcatalogSchema = require("./schema/on_searchcatalog.schema");
const onSearchtimerangeSchema = require("./schema/on_searchtimerange.schema");
const onSearchoptionalSchema = require("./schema/on_searchoptional.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

//const { checkVariant, checkCustomization } = require("./businessTests");

function onSearchMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        
        const messageTestSuite = generateTests({ context, message }, onSearchSchema, "Verification of Message", constants);
       
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function onSearchMessageCatalogTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onSearchcatalogSchema, "Verification of Message", constants);
       
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function onSearchMessageTimerangeTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onSearchtimerangeSchema, "Verification of Message", constants);
       
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

function onSearchMessageOptionalTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onSearchoptionalSchema, "Verification of Message", constants);
       
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_search({ context, message }, step,  logs = [],constants = {}) {
    try {
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        const testSuite = new Mocha.Suite("on_search request verification");
        

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onSearchMessageTests({ context, message }, constants));
        switch (step) {
            case "I":
                testSuite.addSuite(onSearchMessageCatalogTests({ context, message }, constants));
                break;
            case "II":
                testSuite.addSuite(onSearchMessageCatalogTests({ context, message }, constants));
                break;
             case "III":
                 testSuite.addSuite(onSearchMessageTimerangeTests({ context, message }, constants));
                 break;
             case "IV":
                 testSuite.addSuite(onSearchMessageOptionalTests({ context, message }, constants));
                 break;
             default:
                break;
        }

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}