const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");

module.exports = async function update({ context, message } = {}, category, settlementAmount) {
    try {

        const testSuite = new Mocha.Suite(`update Request Verification`);
        contextTests(context, "update", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.id' which is a string", function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing' which is an object", function () {
            expect(message.order.billing).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.name' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.name).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.email' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.email).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.phone' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.phone).to.exist.and.to.be.a("string");
        }));


        return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
}