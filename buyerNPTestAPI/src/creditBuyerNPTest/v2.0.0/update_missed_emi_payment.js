const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");

module.exports = async function updateMissedEmiPayments({ context, message } = {}, logs = [], metaData = {}) {
    try {
        const testSuite = new Mocha.Suite("Update Request (MISSED_EMI_PAYMENT) Verification");

        contextTests(context, testSuite, logs, { action: "update", ...metaData });

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message' in the request body is not null and undefined", function () {
            expect(message, "'message' in request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.update_target' is 'payments'", function () {
            expect(message.update_target).to.be.equal("payments");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order' has a property 'id'", function () {
            expect(message.order).to.have.property("id");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order' has a property 'payments'", function () {
            expect(message.order).to.have.property("payments");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.payments' is an array", function () {
            expect(message.order.payments).to.be.an("array");
        }));

        const missedEMIs = message?.order?.payments?.filter(ele => ele.time.label === "MISSED_EMI_PAYMENT");

        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.payments' has at least an object with property 'time' which has a property 'label' equal to 'MISSED_EMI_PAYMENT'`, function () {
            expect(missedEMIs).to.be.an('array').that.has.lengthOf.at.least(1);
        }));

        if (missedEMIs && missedEMIs.length > 0) {
            missedEMIs.forEach((ele, index) => {
                if (ele?.time?.label === "MISSED_EMI_PAYMENT") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.payments[${index}]' has a property 'time'`, function () {
                        expect(ele).to.have.property("time");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.payments[${index}].time' has a property 'label' with value 'MISSED_EMI_PAYMENT'`, function () {
                        expect(ele.time).to.have.property("label").to.equal("MISSED_EMI_PAYMENT");
                    }));
                }
            });
        }

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
