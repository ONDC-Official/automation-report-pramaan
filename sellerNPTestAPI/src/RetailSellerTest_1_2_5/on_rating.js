const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("../RetailSellerNpTest/context");

module.exports = async function on_rating({ context, message } = {}, logs = [], constants = {}) {
    try {

        const testSuite = new Mocha.Suite(`on_rating Request Verification`);
        constants = { ...constants, action: "on_rating" };
        testSuite.addSuite(contextTests(context, constants, logs));

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object (OPTIONAL)", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order_id' which is a string (OPTIONAL)", function () {
            expect(message.order_id).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'feedback_form' which is an object (OPTIONAL)", function () {
            expect(message.feedback_form).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'feedback_form.form' which is an object (OPTIONAL)", function () {
            expect(message.feedback_form.form).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'feedback_form.form.mime_type' which is a string (OPTIONAL)", function () {
            expect(message.feedback_form.form.mime_type).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'feedback_form.form.url' which is a string  (OPTIONAL)", function () {
            expect(message.feedback_form.form.url).to.be.a("string");
        }));


        return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
}
