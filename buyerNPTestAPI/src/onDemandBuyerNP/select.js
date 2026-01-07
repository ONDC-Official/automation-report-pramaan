const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { providerIdTest } = require("../bussinessTests/mobilityBussiness");
const response_verification = require("../centralizedUtilities/responseVerification");


module.exports = async function select({ context, message } = {}, logs = [],constants ={}) {
    try {
        const testSuite = new Mocha.Suite(`Select Request Verification`);
        contextTests(context, "select", testSuite, logs);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        const responseTestSuite = response_verification({ context, message }, logs,constants);

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
            expect(message).to.exist.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        // message.order.provider
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider' which is an object", function () {
            expect(message.order.provider).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider.id' which is a string", function () {
            expect(message.order.provider.id).to.exist.and.to.be.a("string");
        }));

        providerIdTest(messageTestSuite, { context, message }, logs);

        // message.order.items
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.items' which is an array", function () {
            expect(message.order.items).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.items && message.order.items.length > 0) {
            message.order.items.forEach((item, index) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}]' which is an object`, function () {
                    expect(item).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].id' which is a string`, function () {
                    expect(item.id).to.exist.and.to.be.a("string");
                }));
            });
        }

         return [ testSuite,responseTestSuite];
    } catch (error) {
        console.log(error);
        return error;
    }
}
