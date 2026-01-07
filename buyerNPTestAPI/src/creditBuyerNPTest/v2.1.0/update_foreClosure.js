const Mocha = require("mocha");
const contextTests = require("../v2.1.0/context");
const { expect } = require("chai");

module.exports = async function updatePayments({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite("Update Request (FORECLOSURE) Verification");

        contextTests(context, "update", testSuite, logs);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of message");

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

        const foreClosures = message?.order?.payments.filter(ele => ele.time.label === "FORECLOSURE");

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.payments' has at least one object with property 'time' which has a property 'label' equal to 'FORECLOSURE'", function () {
            expect(foreClosures).to.be.an('array').that.has.lengthOf.at.least(1);
        }));

        if (foreClosures && foreClosures.length > 0) {
            foreClosures.forEach((ele, index) => {
                if (ele?.time?.label === "FORECLOSURE") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.payments[${index}]' has a property 'time'`, function () {
                        expect(ele).to.have.property("time");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.payments[${index}].time' has a property 'label'`, function () {
                        expect(ele.time).to.have.property("label");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.payments[${index}].time.label' is 'FORECLOSURE' (OPTIONAL)`, function () {
                        expect(ele.time.label).to.equal("FORECLOSURE");
                    }));
                }
            })
        }
        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
