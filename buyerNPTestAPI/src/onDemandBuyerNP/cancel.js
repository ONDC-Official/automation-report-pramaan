const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");

const cancellationReasonIds = [
    '001', '002', '003', '004', '005',
    '011', '012', '013', '014','000'
]

module.exports = async function cancel({ context, message } = {}, step, logs = []) {
    try {
        const testSuite = new Mocha.Suite(`cancel (${step === "cancel_one" ? "Soft" : "Confirm"}) Request Verification`);

        contextTests(context, "cancel", testSuite, logs);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist.that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.cancellation_reason_id' which is a string", function () {
            expect(message.cancellation_reason_id).to.exist.that.is.a("string");
        }));

        switch (step) {
            case "cancel_technical":
                messageTestSuite.addTest(new Mocha.Test("'message.cancellation_reason_id' should equal '000'", function () {
                    expect(message.cancellation_reason_id).to.equal("000");
                }));
                break;
            default:
                messageTestSuite.addTest(new Mocha.Test("'message.cancellation_reason_id' should be a valid cancellation_reason_id", function () {
                    expect(message.cancellation_reason_id).to.be.oneOf(cancellationReasonIds);
                }));
                break;
        }

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.descriptor' which is an object", function () {
            expect(message.descriptor).to.exist.that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.descriptor.name' which is a string", function () {
            expect(message.descriptor.name).to.exist.that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.descriptor.code' which is a string", function () {
            expect(message.descriptor.code).to.exist.that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.descriptor.code' should be one of ['SOFT_CANCEL', 'CONFIRM_CANCEL']", function () {
            expect(message.descriptor.code).to.be.oneOf(["SOFT_CANCEL", "CONFIRM_CANCEL"]);
        }));

        switch (step) {
            case "cancel_two":
            case "cancel_technical":
                messageTestSuite.addTest(new Mocha.Test("'message.descriptor.code' should be equal to 'CONFIRM_CANCEL'", function () {
                    expect(message.descriptor.code).to.equal("CONFIRM_CANCEL");
                }));
                break;
            case "cancel_one":
                messageTestSuite.addTest(new Mocha.Test("'message.descriptor.code' should be equal to 'SOFT_CANCEL'", function () {
                    expect(message.descriptor.code).to.equal("SOFT_CANCEL");
                }));
                break;
            default:
                break;
        }

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order_id' which is a string", function () {
            expect(message.order_id).to.exist.that.is.a("string");
        }));

        return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
}
