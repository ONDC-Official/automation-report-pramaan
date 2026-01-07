const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context");
const { tagsCommonTests, fulfillmentsCommonTests, quoteCommonTests, providerCommonTests, paymentsCommonTests, itemsCommonTests, xinputForGeneral } = require("./commonTests")
const response_verification = require("../../centralizedUtilities/responseVerification");

async function on_confirm({ context, message } = {}, flowId, logs = [],constants ={}) {
    try {
        const action = "on_confirm";
        
        const testSuite = new Mocha.Suite(`on_confirm Request Verification`);
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        

        contextTests(context, "on_confirm", testSuite);

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
            expect(message.order.status).to.exist.and.to.be.a("string");
        }));

        providerCommonTests(message, messageTestSuite);

        itemsCommonTests(message, messageTestSuite, flowId, action);

        fulfillmentsCommonTests(message, messageTestSuite, logs, flowId, action);

        if (flowId === "INVESTMENT_4") {
            xinputForGeneral(message, messageTestSuite, flowId, action);
        }

        if (flowId !== "INVESTMENT_7") {
            paymentsCommonTests(message, messageTestSuite, logs, flowId, action);
        }

        quoteCommonTests(message, messageTestSuite, flowId);

        tagsCommonTests(message, messageTestSuite, action)

        if (flowId !== "INVESTMENT_7" || flowId !== "INVESTMENT_9") {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation_terms' and that should be an array", function () {
                expect(message.order.cancellation_terms).to.exist.that.is.an("array");
            }));
            if (message?.order?.cancellation_terms && message?.order?.cancellation_terms.length > 0) {
                message.order.cancellation_terms.forEach((C_terms, C_termsIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}]' and that should be an object`, function () {
                        expect(C_terms).to.exist.that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].reason_required' and that should be a booelan `, function () {
                        expect(C_terms.reason_required).to.exist.that.is.a("boolean");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref' and that should be an object`, function () {
                        expect(C_terms.external_ref).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.mimetype' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.external_ref.mimetype).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.url' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.external_ref.url).to.exist.that.is.a("string");
                    }));
                })
            }
        }

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string", function () {
            expect(message.order.created_at).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string", function () {
            expect(message.order.updated_at).to.exist.and.to.be.a("string");
        }));

        return [ testSuite,responseTestSuite];

    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = {
    on_confirm
}