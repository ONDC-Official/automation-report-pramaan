const Mocha = require("mocha");
const catalogRejectionSchema = require("./schema/catalog_rejection.schema");
const { generateTests } = require("./common");

module.exports = async function catalog_rejection({ context, message } = {}, constants = {}) {
    try {
        const testSuite = new Mocha.Suite("catalog_rejection ACK response check");
        constants = {
            ...constants,
            action: "catalog_rejection"
        };

        const messageTestSuite = generateTests({ context, message }, catalogRejectionSchema, "Verification of Message", constants);
        testSuite.addSuite(messageTestSuite);

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}