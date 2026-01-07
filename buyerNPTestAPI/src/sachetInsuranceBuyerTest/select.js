const Mocha = require("mocha");
const contextTests = require("./context")
const { expect } = require("chai");
const { quoteTests, itemsCommonFieldsTests, providerWithID, xinputOnStatusGeneral, fulfillmentsTests, itemsWithXinputTests } = require('./commonTest');
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function select({ context, message } = {},logs= [],constants = {}) {
    try {
        const testSuite = new Mocha.Suite("Select  Request Verification");
        contextTests(context, "select", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        const responseTestSuite = response_verification({ context, message }, logs,constants);

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
            expect(message).to.exist.a.property("order").that.is.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'items' which is an array", function () {
            expect(message.order).to.exist;
            expect(message.order).to.be.an("object").that.has.property("items").that.is.an("array").and.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items?.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an("object").that.includes.all.keys("id");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].id' should be an string`, function () {
                    expect(item.id).to.be.an("string");
                }));
            })
        }
        providerWithID(message, messageTestSuite);
    
    return [testSuite, responseTestSuite];
    } catch (err) {
        console.log(err);
        return err;
    }
}