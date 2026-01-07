const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context");
const { tagsCommonTests, fulfillmentsCommonTests, quoteCommonTests, providerCommonTests, paymentsCommonTests, itemsCommonTests, xinputForGeneral } = require("./commonTests")
const response_verification = require("../../centralizedUtilities/responseVerification");

async function on_init({ context, message } = {}, step, flowId, logs = [], constants = {}) {
    try {
        let action = "on_init";
        const testSuite = new Mocha.Suite(`on_init Request Verification`);
        const responseTestSuite = response_verification({ context, message }, logs, constants);


        contextTests(context, "on_init", testSuite);

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

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.status' which is a string", function () {
            expect(message.order.status).to.exist.and.to.be.a("string").and.to.be.oneOf(["CREATED", "ACCEPTED", "REJECTED"]);
        }));

        providerCommonTests(message, messageTestSuite);

        itemsCommonTests(message, messageTestSuite, flowId, action, step);

        fulfillmentsCommonTests(message, messageTestSuite, logs, flowId, action, step);

        if ((flowId !== "INVESTMENT_3" && flowId !== "INVESTMENT_13" && flowId !== "INVESTMENT_5" && flowId !== "INVESTMENT_12" && flowId !== "INVESTMENT_9" && flowId !== "INVESTMENT_7A" && flowId !== "INVESTMENT_7B" && flowId !== "INVESTMENT_7C" && flowId !== "INVESTMENT_7D") && (flowId === "INVESTMENT_1" || flowId === "INVESTMENT_2" || flowId === "INVESTMENT_6" || flowId === "INVESTMENT_20")) {
            xinputForGeneral(message, messageTestSuite, flowId, action, step);
        }
        if (flowId !== "INVESTMENT_7A" && flowId !== "INVESTMENT_7B" && flowId !== "INVESTMENT_7C" && flowId !== "INVESTMENT_7D") {
            paymentsCommonTests(message, messageTestSuite, logs, flowId, action, step);
        }

        quoteCommonTests(message, messageTestSuite, flowId, action, step);

        tagsCommonTests(message, messageTestSuite, action)

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string", function () {
            expect(message.order.created_at).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string", function () {
            expect(message.order.updated_at).to.exist.and.to.be.a("string");
        }));

        return [testSuite, responseTestSuite];
    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = {
    on_init
}