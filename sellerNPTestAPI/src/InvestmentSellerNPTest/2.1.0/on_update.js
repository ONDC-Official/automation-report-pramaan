const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context");
const { fulfillmentsCommonTests, quoteCommonTests, tagsCommonTests, providerCommonTests, paymentsCommonTests, itemsCommonTests, xinputForGeneral } = require("./commonTests")

async function on_update({ context, message } = {}, step, logs = [], flowId) {
    try {
        const action = "on_update";
        const testSuite = new Mocha.Suite(`on_update ${step} Request Verification`);
        contextTests(context, "on_update", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));

        if ((flowId === "INVESTMENT_15" || flowId === "INVESTMENT_16") && step === "III" || step === "IV") {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.ref_order_ids' which is an array", function () {
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
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.id' which is a string", function () {
            expect(message.order.id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.status' which is a string", function () {
            expect(message.order.status).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.status' should be string", function () {
            expect(message.order.status).to.oneOf(["ACCEPTED", "COMPLETED", "REJECTED", "CANCELLED", "CREATED"]);
        }));

        providerCommonTests(message, messageTestSuite);

        itemsCommonTests(message, messageTestSuite, flowId, action, step);

        fulfillmentsCommonTests(message, messageTestSuite, logs, flowId, action, step);

        if (flowId !== "INVESTMENT_3" && flowId !== "INVESTMENT_13" && flowId !== "INVESTMENT_7A" && flowId !== "INVESTMENT_7B" && flowId !== "INVESTMENT_7C" && flowId !== "INVESTMENT_7D" && !flowId == "INVESTMENT_5" && !flowId == "INVESTMENT_12" && !flowId == "INVESTMENT_9" && !flowId == "INVESTMENT_14" && !flowId == "INVESTMENT_15" && !flowId == "INVESTMENT_16" && flowId !== "INVESTMENT_16") {
            xinputForGeneral(message, messageTestSuite, flowId, action, step);
        }

        if (flowId !== "INVESTMENT_7A" && flowId !== "INVESTMENT_7B" && flowId !== "INVESTMENT_7C" && flowId !== "INVESTMENT_7D") {
            paymentsCommonTests(message, messageTestSuite, logs, flowId, action, step);
        }

        quoteCommonTests(message, messageTestSuite, flowId, action, step);

        tagsCommonTests(message, messageTestSuite, action)

        if (flowId !== "INVESTMENT_7A" && flowId !== "INVESTMENT_7B" && flowId !== "INVESTMENT_7C" && flowId !== "INVESTMENT_7D") {
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
                    if (flowId === "INVESMENT_14" && step === "III") {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancel_by' and that should be an object`, function () {
                            expect(C_terms.cancel_by).to.exist.that.is.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancel_by.timestamp' and that should be a string (OPTIONAL)`, function () {
                            expect(C_terms.cancel_by.timestamp).to.exist.that.is.a("string");
                        }));
                    }
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

        return testSuite;

    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = {
    on_update
}