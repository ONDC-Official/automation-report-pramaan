const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("../v2.1.0/context");
const { providerIdTest } = require('../../bussinessTests/mobilityBussiness');
const response_verification = require("../../centralizedUtilities/responseVerification");

module.exports = async function select({ context, message } = {}, step, logs = [],constants = {}) {
    const testSuite = new Mocha.Suite(`Select (${step}) Request Verification`);

    contextTests(context, "select", testSuite, logs,constants);

    const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
    const responseTestSuite = response_verification({ context, message }, logs);

    messageTestSuite.addTest(new Mocha.Test("should have 'message' properties", function () {
        expect(message, "Request body shouldn't be null and undefined").to.exist;
        expect(message).to.exist;
    }));

    messageTestSuite.addTest(new Mocha.Test("verify if 'message' has the order property", function () {
        expect(message).to.have.property("order").that.is.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test("verify if 'message.order' has 'provider' and 'items' properties", function () {
        expect(message.order).to.include.all.keys("provider", "items");
    }));

    messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should exist and should be an object", function () {
        expect(message.order.provider).to.exist.and.to.be.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property 'id'", function () {
        expect(message.order.provider).to.have.property("id").that.exists;
    }));

    messageTestSuite.addTest(new Mocha.Test("verify that 'message.order.provider.id' should be a string", function () {
        expect(message.order?.provider?.id, "Provider ID should be a string").to.be.a("string");
    }));

    providerIdTest(messageTestSuite, { context, message }, logs);

    messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array that is not empty", function () {
        expect(message.order?.items, "Order items should exist").to.be.an('array').that.is.not.empty;
    }));

    if (message?.order?.items && message?.order?.items.length > 0) {
        message?.order?.items.forEach((item, index) => {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}]' should have a property 'id'`, function () {
                expect(item).to.have.property("id").that.is.a("string").and.has.a.lengthOf.above(0);
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}]' should have a property 'parent_item_id'`, function () {
                expect(item).to.have.property("parent_item_id").that.is.a("string").and.has.a.lengthOf.above(0);
            }));

            if (step === 'II') {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}]' should have a property 'xinput' that is an object`, function () {
                    expect(item).to.have.a.property("xinput").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput' should have a property 'form' that is an object`, function () {
                    expect(item.xinput).to.have.a.property("form").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form' should have a property 'id' that is a string`, function () {
                    expect(item.xinput.form).to.have.a.property("id").that.is.a("string").and.has.a.lengthOf.above(0);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput' should have a property 'form_response' that is an object`, function () {
                    expect(item.xinput).to.have.a.property("form_response").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form_response' should have properties 'status' and 'submission_id' that are strings`, function () {
                    expect(item.xinput.form_response).to.include.all.keys("status", "submission_id");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form_response.status' exists and is of type string (OPTIONAL)`, function () {
                    expect(item.xinput.form_response.status, "'form_response.status' should exist and be a string").to.exist.and.to.be.a('string').that.is.oneOf(["SUCCESS", "APPROVED"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form_response.submission_id' exists and is of type string (OPTIONAL)`, function () {
                    expect(item.xinput.form_response.submission_id, "'form_response.submission_id' should exist and be a string").to.exist.and.to.be.a('string');
                }));
            } 
        })
    }

    return [testSuite, responseTestSuite];
};
