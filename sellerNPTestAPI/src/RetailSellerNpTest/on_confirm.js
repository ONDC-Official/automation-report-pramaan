const Mocha = require("mocha");
const contextTests = require("./context");
const onConfirmSchema = require("./schema/on_confirm.schema");
const { generateTests } = require("./common");
const { expect } = require('chai');
const response_verification = require("../centralizedUtilities/responseVerification");
const { updateTrail, trailTests } = require("../centralizedUtilities/trailManagement");

function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);

        return log && log.length ? log?.pop()?.request : false;
    } catch (err) {
        console.log(err);
    }
}

function onConfirmMessageTests({ context, message }, logs, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onConfirmSchema, "Verification of Message");


        const initLogs = lastActionLog(logs, "init")
        const initCreatedAt = initLogs?.message?.order?.billing?.created_at
        const initUpdatedAt = initLogs?.message?.order?.billing?.updated_at
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.created_at' which is an object", function () {
            expect(message.order.billing.created_at).to.be.a("string").and.to.be.equal(initCreatedAt);
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.updated_at' which is a string (OPTIONAL)", function () {
            expect(message.order.billing.updated_at).to.exist.and.to.be.a("string").and.to.be.equal(initUpdatedAt);
        }));

        const confirmLogs = lastActionLog(logs, "confirm")
        const confirmCreatedAt = confirmLogs?.message?.order?.created_at
        const confirmUpdatedAt = confirmLogs?.message?.order?.updated_at
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is an object", function () {
            expect(message.order.created_at).to.be.a("string").and.to.be.equal(confirmCreatedAt);
        }));
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.updated_at' which is a string (OPTIONAL)", function () {
            expect(message.order.updated_at).to.exist.and.to.be.a("string").and.to.be.equal(confirmUpdatedAt);
        }));

        if (constants?.flow === "RET_1b") {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment' which is an object`, function () {
                expect(message.order.payment).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.status' which is a string`, function () {
                expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.equal("NOT-PAID");
            }));
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
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_confirm({ context, message } = {}, logs = [], currentTrail = {}, constants = {}) {
    const testSuite = new Mocha.Suite("on_confirm request verification");
    try {
        constants = {
            ...constants,
            action: "on_confirm",
        };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onConfirmMessageTests({ context, message }, logs, constants));

        // const trail = updateTrail(currentTrail, message.order, "on_confirm");
        // testSuite.addSuite(trailTests(trail, message.order, constants));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_confirm payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return [testSuite];
    }
}