const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context");
const { fulfillmentsCommonTests, quoteCommonTests, providerCommonTests, paymentsCommonTests, itemsCommonTests, xinputForGeneral, tagsCommonTests } = require("./commonTests")

async function on_cancel({ context, message } = {}, logs = [], flowId) {
    try {
        const action = "on_cancel";

        const testSuite = new Mocha.Suite(`on_cancel Request Verification`);
        contextTests(context, "on_cancel", testSuite);
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

        if (flowId === "INVESTMENT_6") {

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.ref_order_ids' which is an array", function () {
                expect(message.order.ref_order_ids).to.exist.and.to.be.an("array");
            }));

            if (message?.order?.ref_order_ids && message?.order?.ref_order_ids.length > 0) {
                message?.order?.ref_order_ids.forEach((refOrderId, refOrderIdIndex) => {

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.ref_order_ids[${refOrderIdIndex}]' which is a string`, function () {
                        expect(refOrderId).to.exist.and.to.be.a("string");
                    }));
                })
            }

        }

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.status' which is a string", function () {
            expect(message.order.status).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.status' should be equal to 'CANCELLED'", function () {
            expect(message.order.status).to.equal("CANCELLED");
        }));

        providerCommonTests(message, messageTestSuite);

        itemsCommonTests(message, messageTestSuite, flowId, action);

        fulfillmentsCommonTests(message, messageTestSuite, logs, flowId, action);

        if (!flowId == "INVESTMENT_3" && !flowId == "INVESTMENT_6" && !flowId == "INVESTMENT_7") {
            xinputForGeneral(message, messageTestSuite);
        }

        if (flowId !== "INVESTMENT_7") {
            paymentsCommonTests(message, messageTestSuite, logs, flowId, action);
        }

        quoteCommonTests(message, messageTestSuite, flowId);

        if (flowId !== "INVESTMENT_7" && flowId !== "INVESTMENT_6") {
            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation' and that should be an object", function () {
                expect(message.order.cancellation).to.exist.that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation.time' and that should be a string", function () {
                expect(message.order.cancellation.time).to.exist.that.is.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation.cancelled_by' and that should be a string", function () {
                expect(message.order.cancellation.cancelled_by).to.exist.that.is.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation.reason' and that should be an object", function () {
                expect(message.order.cancellation.reason).to.exist.that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation.reason.id' and that should be a string", function () {
                expect(message.order.cancellation.reason.id).to.exist.that.is.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation.reason.descriptor' and that should be an object", function () {
                expect(message.order.cancellation.reason.descriptor).to.exist.that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation.reason.descriptor.name' and that should be a string", function () {
                expect(message.order.cancellation.reason.descriptor.name).to.exist.that.is.a("string");
            }));

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
        tagsCommonTests(message, messageTestSuite, action);

        return testSuite;

    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = {
    on_cancel
}