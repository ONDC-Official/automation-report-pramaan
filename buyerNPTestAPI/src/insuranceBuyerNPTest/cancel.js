const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require('./context');

module.exports = async function cancel({ context, message }, { category } = {}) {

    const testSuite = new Mocha.Suite(`Cancel Request Verification`);
    contextTests(context, 'cancel', testSuite);
    const messageTestSuite = Mocha.Suite.create(testSuite, 'Verification of Message');

    messageTestSuite.addTest(new Mocha.Test("should have 'message' properties", function () {
        expect(message, "Request body shouldn't be null and undefined").to.exist;
        expect(message).to.exist;
    }));
    switch (category) {
        case 'MARINE_INSURANCE':
            marineCancelTests(message, messageTestSuite);
            break;
        case 'HEALTH_INSURANCE':
            healthCancelTests(message, messageTestSuite);
            break;
        case 'MOTOR_INSURANCE':
            motorCancelTests(message, messageTestSuite)
            break;
        default:
        // throw new Error(`Invalid search type: ${category}`);
    }
    return testSuite;
}


function healthCancelTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order_id' which is a string", function () {
            expect(message).to.exist.a.property("order_id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'cancellation_reason_id' which is a string", function () {
            expect(message).to.exist.a.property("cancellation_reason_id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'descriptor' which is an object", function () {
            expect(message).to.exist.a.property("descriptor").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.descriptor.short_desc' is a string ", function () {
            expect(message.descriptor.short_desc, "'message.order.short_desc' should be a string").to.be.a("string");

        }));



    } catch (err) {
        console.log(err);
        return err;
    }
}

function marineCancelTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order_id' which is a string", function () {
            expect(message).to.exist.a.property("order_id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'cancellation_reason_id' which is a string", function () {
            expect(message).to.exist.a.property("cancellation_reason_id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'descriptor' which is an object", function () {
            expect(message).to.exist.a.property("descriptor").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.descriptor.short_desc' is a string ", function () {
            expect(message.descriptor.short_desc, "'message.order.short_desc' should be a string").to.be.a("string");

        }));



    } catch (err) {
        console.log(err);
        return err;
    }
}

function motorCancelTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order_id' which is a string", function () {
            expect(message).to.exist.a.property("order_id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'cancellation_reason_id' which is a string", function () {
            expect(message).to.exist.a.property("cancellation_reason_id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'descriptor' which is an object", function () {
            expect(message).to.exist.a.property("descriptor").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.descriptor.short_desc' is a string ", function () {
            expect(message.descriptor.short_desc, "'message.order.short_desc' should be a string").to.be.a("string");

        }));



    } catch (err) {
        console.log(err);
        return err;
    }
}


