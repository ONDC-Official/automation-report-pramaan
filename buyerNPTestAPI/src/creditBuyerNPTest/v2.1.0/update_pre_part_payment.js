const Mocha = require("mocha");
const contextTests = require("../v2.1.0/context");
const { expect } = require("chai");

module.exports = async function updatePrePartPayment({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite("Update Request (PRE_PART_PAYMENT) Verification");

        contextTests(context, "update", testSuite, logs);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message' in the request body is not null and undefined", function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
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

        const prePartPayments = message?.order?.payments.filter(ele => ele.time.label === "PRE_PART_PAYMENT");

        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.payments' has at least an object with property 'time' which has a property 'label' equal to 'FORECLOSURE'`, function () {
            expect(prePartPayments).to.be.an('array').that.has.lengthOf.at.least(1);
        }));

        if (prePartPayments && prePartPayments.length > 0) {
            prePartPayments.forEach((ele, index) => {
                if (ele?.time?.label === "PRE_PART_PAYMENT") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.payments[${index}]' has properties 'params' and 'time'`, function () {
                        expect(ele).to.have.property("params");
                        expect(ele).to.have.property("time");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.payments[${index}].params' has properties 'amount' and 'currency'`, function () {
                        expect(ele.params).to.have.property("amount");
                        expect(ele.params).to.have.property("currency");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.payments[${index}].time' has a property 'label' with value 'PRE_PART_PAYMENT'`, function () {
                        expect(ele.time).to.have.property("label").to.equal("PRE_PART_PAYMENT");
                    }));
                }
            });
        }

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
