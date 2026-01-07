const Mocha = require("mocha");
const contextTests = require("./context");
const searchByItemSchema = require("./schema/searchByItem.schema");
const searchByCategorySchema = require("./schema/searchByCategory.schema");
const { generateTests } = require("./common");



function searchByCatgoryTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, searchByCategorySchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


function searchByItemTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, searchByItemSchema, "Verification of Message", constants);

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function search({ context, message } = {}, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite("search request verification");
    try {
        testSuite.addSuite(contextTests(context, constants, logs));

        const searchBy = Object.keys(message?.intent).includes("item") ? "item" : "category";
        switch (searchBy) {
            case "category":
                testSuite.addSuite(searchByCatgoryTests({ context, message }, constants));
                break;
            case "item":
                testSuite.addSuite(searchByItemTests({ context, message }, constants));
                break;
            default:
                break;
        }


        return testSuite;
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("search could not be verified due to some payload missing or internal error", function () {
            expect(true).to.equal(false);
        }))
        return testSuite;
    }
}