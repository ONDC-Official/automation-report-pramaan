const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");
const onInitSchema = require("./schema/on_init.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");
const { updateTrail, trailTests } = require("../centralizedUtilities/trailManagement");


function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);

        return log && log.length ? log[log.length - 1]?.request : false;
    } catch (err) {
        console.log(err);
    }
}
function onInitMessageTests({ context, message }, logs, constants) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onInitSchema, "Verification of Message");
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

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.status' which is a string`, function () {
                expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.equal("NOT-PAID");
            }));
        }
        if (constants.flow === "RET_1") {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment' which is an object`, function () {
                expect(message.order.payment).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payment.status' which is a string to be NOT-PAID`, function () {
                expect(message.order.payment.status).to.exist.and.to.be.a("string").and.to.be.equal("NOT-PAID");
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


module.exports = async function on_init({ context, message } = {}, logs = [], currentTrail = {}, constants = {}) {
    const testSuite = new Mocha.Suite("on_init request verification");
    try {
        constants = {
            ...constants,
            action: "on_init"
        };


        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onInitMessageTests({ context, message }, logs, constants));

        // const trail = updateTrail(currentTrail, message.order, "on_init");
        // testSuite.addSuite(trailTests(trail, message.order, constants));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("on_init payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return [testSuite];
    }
}