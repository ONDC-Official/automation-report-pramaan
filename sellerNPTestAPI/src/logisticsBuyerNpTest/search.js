const Mocha = require("mocha");
const contextTests = require("./context");
const searchSchema = require("./schema/search.schema");
const { generateTests } = require("./common");


function searchMessageTests(message) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests(message, searchSchema, "Verification of Message");

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function search({ context, message }) {
    try {
        const testSuite = new Mocha.Suite("search request verification");
        const constants = { action: "search", core_version: "1.2.0" };
      
        testSuite.addSuite(contextTests(context, constants));
        testSuite.addSuite(searchMessageTests(message));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}