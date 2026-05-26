const Mocha = require("mocha");
const contextTests = require("./context");
const onStatusSchema = require("./schema/on_status.schema");
const { generateTests } = require("./common");
const { expect } = require("chai");
const response_verification = require("../centralizedUtilities/responseVerification");

const INVL_PAYMENT_TYPES = ["ON-ORDER", "ON-FULFILLMENT", "PART-PAYMENT"];

function addRetinvlPaymentsTests(messageTestSuite, order = {}) {
    const payments = order?.payments;
    const paymentIds = Array.isArray(payments)
        ? payments.map((payment) => payment?.id).filter(Boolean)
        : [];

    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payments' which is an array", function () {
        expect(payments).to.exist.and.to.be.an("array").that.is.not.empty;
    }));

    if (!Array.isArray(payments)) {
        return;
    }

    payments.forEach((payment, paymentIndex) => {
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}]' which is an object`, function () {
            expect(payment).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].id' which is a string`, function () {
            expect(payment?.id).to.exist.and.to.be.a("string").that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].type' which is a valid RETINVL payment type`, function () {
            expect(payment?.type).to.be.a("string").and.to.be.oneOf(INVL_PAYMENT_TYPES);
        }));

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].tags' which is an array`, function () {
            expect(payment?.tags).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (payment?.type === "PART-PAYMENT") {
            const linkedPaymentTagIndex = payment?.tags?.findIndex((tag) => tag?.descriptor?.code === "LINKED-PAYMENTS") ?? -1;
            const linkedPaymentTag = payment?.tags?.[linkedPaymentTagIndex];

            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags' should contain LINKED-PAYMENTS`, function () {
                expect(linkedPaymentTag).to.exist.and.to.be.an("object");
            }));

            if (linkedPaymentTagIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${linkedPaymentTagIndex}].list' should be a non-empty array`, function () {
                    expect(linkedPaymentTag?.list).to.be.an("array").that.is.not.empty;
                }));

                linkedPaymentTag?.list?.forEach((listItem, listItemIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${linkedPaymentTagIndex}].list[${listItemIndex}].descriptor.code' should be a string`, function () {
                        expect(listItem?.descriptor?.code).to.exist.and.to.be.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${linkedPaymentTagIndex}].list[${listItemIndex}].descriptor.code' should reference a payment id`, function () {
                        expect(paymentIds).to.include(listItem?.descriptor?.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${linkedPaymentTagIndex}].list[${listItemIndex}].value' should be a string`, function () {
                        expect(listItem?.value).to.exist.and.to.be.a("string").that.is.not.empty;
                    }));
                });
            }

            return;
        }

        if (payment?.type === "ON-ORDER" || payment?.type === "ON-FULFILLMENT") {
            const expectedTagCode = payment.type === "ON-ORDER" ? "ADV-DEPOSIT" : "FINAL-PAYMENT";
            const paymentTagIndex = payment?.tags?.findIndex((tag) => tag?.descriptor?.code === expectedTagCode) ?? -1;
            const paymentTag = payment?.tags?.[paymentTagIndex];

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].collected_by' which is BAP or BPP`, function () {
                expect(payment?.collected_by).to.exist.and.to.be.a("string").and.to.be.oneOf(["BAP", "BPP"]);
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].status' which is a valid payment status`, function () {
                expect(payment?.status).to.exist.and.to.be.a("string").and.to.be.oneOf(["PAID", "NOT-PAID"]);
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params' which is an object`, function () {
                expect(payment?.params).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params.amount' which is a string`, function () {
                expect(payment?.params?.amount).to.exist.and.to.be.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params.currency' which is a string`, function () {
                expect(payment?.params?.currency).to.exist.and.to.be.a("string").that.is.not.empty;
            }));

            if (payment?.params?.transaction_id) {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params.transaction_id' which is a string`, function () {
                    expect(payment.params.transaction_id).to.be.a("string").that.is.not.empty;
                }));
            }

            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags' should contain ${expectedTagCode}`, function () {
                expect(paymentTag).to.exist.and.to.be.an("object");
            }));
        }
    });
}

function onStatusMessageTests({ context, message }, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onStatusSchema, "Verification of Message", constants);
        const isRetinvl = constants?.domain === "ONDC:RETINVL" || context?.domain === "ONDC:RETINVL";

        if (isRetinvl) {
            addRetinvlPaymentsTests(messageTestSuite, message.order);
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_status({ context, message } = {}, step = "", logs = [], constants = {}) {
    const testSuite = new Mocha.Suite(`on_status (${step}) request verification`);
    try {
        let orderState = "In-progress";
        switch (step) {
            case "Order-delivered":
                orderState = "Completed";
                break;
            case "RTO-Delivered":
                orderState = "Cancelled";
                break;
            default:
                orderState = "In-progress";
                break;
        }

        constants = {
            ...constants,
            action: "on_status",
            step: step,
            orderState: orderState,
        };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onStatusMessageTests({ context, message }, constants));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("Could not verify on_status because either the payload is empty or some internal error occured", function () {
            expect(false).to.equal(true);
        }))
        return [testSuite];
    }
}
