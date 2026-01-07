const Mocha = require("mocha");
const contextTests = require("./context");
const onStatusSchema = require("./schema/on_status.schema");
const { generateTests } = require("./common");
const { expect } = require("chai");
const response_verification = require("../centralizedUtilities/responseVerification");


function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);

        return log && log.length ? log?.pop()?.request : false;
    } catch (err) {
        console.log(err);
    }
}

function onStatusMessageTests({ context, message }, constants, logs, step = "") {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onStatusSchema, "Verification of Message", constants);

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message?.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                    expect(fulfillment).to.exist.and.to.be.an("object");
                }));
                if (fulfillment?.type === "Cancel") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor.code' which is a string`, function () {
                        expect(fulfillment.state.descriptor.code).to.exist.and.to.be.a("string").and.to.be.equal("Cancelled");
                    }));
                }

            })
        }
        const initLogs = lastActionLog(logs, "init")
        const initCreatedAt = initLogs?.message?.order?.billing?.created_at
        const initUpdatedAt = initLogs?.message?.order?.billing?.updated_at
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.created_at' which is an object", function () {
            expect(message.order.billing.created_at).to.be.a("string").and.to.be.equal(initCreatedAt);
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.updated_at' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.updated_at).to.exist.and.to.be.a("string").and.to.be.equal(initUpdatedAt);
        }));
        if (constants?.flow === "RET_1b") {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment' which is an object`, function () {
                expect(message.order.payment).to.exist.and.to.be.an("object");
            }));

            if (constants?.step !== "Order-delivered") {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.status' which is a string to be equal to NOT-PAID`, function () {
                    expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.equal("NOT-PAID");
                }));
            }
            if (constants?.step === "Order-delivered") {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.status' which is a string to be equal to PAID`, function () {
                    expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.equal("PAID");
                }));
            }
        }
        if (constants.flow === "RET_1") {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment' which is an object`, function () {
                expect(message.order.payment).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.status' which is a string to be PAID`, function () {
                expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.equal("PAID");
            }));

        }
        if (constants.flow !== "RET_1" && constants.flow !== "RET_1b") {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment' which is an object`, function () {
                expect(message.order.payment).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.status' which is a string to be PAID`, function () {
                expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.oneOf(["PAID", "NOT-PAID"]);
            }));
        }
        const confirmLogs = lastActionLog(logs, "confirm")
        const confirmCreatedAt = confirmLogs?.message?.order?.created_at
        const confirmUpdatedAt = confirmLogs?.message?.order?.updated_at
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is an object", function () {
            expect(message.order.created_at).to.be.a("string").and.to.be.equal(confirmCreatedAt);
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string (OPTIONAL)", function () {
            expect(message.order.updated_at).to.exist.and.to.be.a("string").and.to.be.equal(confirmUpdatedAt);
        }));
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
        testSuite.addSuite(onStatusMessageTests({ context, message }, constants, logs));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("Could not verify on_status because either the payload is empty or some internal error occured", function () {
            expect(false).to.equal(true);
        }))
        return [testSuite];
    }
}