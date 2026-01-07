const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context");
const { fulfillmentsCommonTests, providerCommonTests, tagsCommonTests, orderIdStatus, quoteCommonTests, paymentsCommonTests, itemsCommonTests, xinputForGeneral } = require("./commonTests")

async function on_status({ context, message } = {}, step, logs = [], flowId) {
    try {
        const action = "on_status";

        const testSuite = new Mocha.Suite(`on_status Request Verification`);

        contextTests(context, "on_status", testSuite);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));
        if ((flowId === "INVESTMENT_15" || flowId === "INVESTMENT_4B" || flowId === "INVESTMENT_16" || flowId === "INVESTMENT_4" || flowId === "INVESTMENT_11") && step === "II") {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.ref_order_id' which is an array", function () {
                expect(message.order.ref_order_ids).to.exist.and.to.be.an("array");
            }));

            if (message?.order?.ref_order_id && message?.order?.ref_order_id.length > 0) {
                message.order.ref_order_id.forEach((refId, refIdIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.ref_order_id[${refIdIndex}]' which is an string`, function () {
                        expect(refId).to.exist.and.to.be.a("string");
                    }));
                })
            }
        }
        orderIdStatus(message, messageTestSuite);

        providerCommonTests(message, messageTestSuite);

        itemsCommonTests(message, messageTestSuite, flowId, action, step);

        fulfillmentsCommonTests(message, messageTestSuite, logs, flowId, action, step);

        if ((flowId !== "INVESTMENT_3" && flowId !== "INVESTMENT_13" && flowId !== "INVESTMENT_5" && flowId !== "INVESTMENT_12" && flowId !== "INVESTMENT_9" && flowId !== "INVESTMENT_7" && flowId !== "INVESTMENT_15" && flowId !== "INVESTMENT_4B" && flowId !== "INVESTMENT_16")) {
            xinputForGeneral(message, messageTestSuite, flowId, action, step);
        }

        paymentsCommonTests(message, messageTestSuite, logs, flowId, action, step);

        quoteCommonTests(message, messageTestSuite, flowId, action, step)

        if (flowId === "INVESTMENT_9") {
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
            tagsCommonTests(message, messageTestSuite, action)
        }

        return testSuite;

    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = {
    on_status
}