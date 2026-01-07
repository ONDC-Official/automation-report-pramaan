const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { providerIdTest } = require('../../bussinessTests/mobilityBussiness');
const response_verification = require("../../centralizedUtilities/responseVerification");

module.exports = async function select({ context, message } = {}, step,  metaData = {},logs = [],constants = {}) {
    const testSuite = new Mocha.Suite(`Select (${step}) Request Verification`);

    contextTests(context, testSuite, logs, { action: "select", ...metaData });

    const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
    const responseTestSuite = response_verification({ context, message }, logs,constants);

    messageTestSuite.addTest(new Mocha.Test("should have 'message' properties", function() {
        expect(message, "Request body shouldn't be null and undefined").to.exist;
        expect(message).to.exist;
    }))

    messageTestSuite.addTest(new Mocha.Test("verify if 'message' has the order property", function() {
        expect(message).to.have.property("order").that.is.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test("verify if 'message.order' has 'provider' and 'items' properties", function() {
        expect(message.order).to.include.all.keys("provider", "items");
    }));

    messageTestSuite.addTest(new Mocha.Test("'message.order' should exist and should be an object", function() {
        expect(message.order.provider).to.exist.and.to.be.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test("should verify the content of message - 'message.order.provider'", function () {
        expect(message.order.provider).to.have.property("id").that.exists;
    }));

    messageTestSuite.addTest(new Mocha.Test("verify that 'message.order.provider.id' should be a string", function () {
        expect(message.order?.provider?.id, "Provider ID should be a string").to.be.a("string");
    }));

    providerIdTest(messageTestSuite, { context, message }, logs);

    messageTestSuite.addTest(new Mocha.Test("should verify the content of message - 'message.order.items'", function () {
        expect(message.order?.items, "Order items should exist").to.be.an('array').that.is.not.empty;
    }));

    if(message?.order?.items && message?.order?.items.length > 0) {
        message?.order.items.forEach((item, i) => {
            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}]' should be an object`, function() {
                expect(item).to.be.an("object").that.includes.all.keys("id", "xinput");
            }));

            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].id' exists and is a string`, function () {
                expect(item.id, "Item ID should exist").to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].xinput' is an object and has properties 'form' and 'form_response'`, function() {
                expect(item.xinput).to.exist.and.to.be.an("object").that.includes.all.keys("form", "form_response");
            }));

            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].xinput.form' is an object and has property 'id'`, function() {
                expect(item.xinput.form).to.exist.and.to.be.an("object").that.has.property("id");
            }));
            
            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].form.id' is a string`, function() {
                expect(item.xinput.form.id).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].xinput.form_response' is an object and has properties 'id' and 'submission_id'`, function() {
                expect(item.xinput.form_response).to.exist.and.to.be.an("object").that.includes.all.keys("status", "submission_id");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form_response.status' should be a string`, function() {
                expect(item.xinput.form_response.status).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form_response.submission_id' should be a string`, function() {
                expect(item.xinput.form_response.submission_id).to.exist.and.to.be.a("string");
            }));
        })
    }
    
    return [testSuite, responseTestSuite];
}