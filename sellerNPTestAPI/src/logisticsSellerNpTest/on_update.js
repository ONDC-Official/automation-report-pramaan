const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");
const onUpdateSchema = require("./schema/on_update.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);
        return log && log.length ? log[log.length - 1]?.request : false;
    } catch (err) {
        console.log(err);
    }
}
function onUpdateMessageTests({ context, message }, logs = []) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, onUpdateSchema, "Verification of Message");
        const init = lastActionLog(logs, "init");
        const update = lastActionLog(logs, "update");
        const confirm = lastActionLog(logs, "confirm");
        const createdAt = confirm?.message?.order?.created_at;
        const updatedAt = update?.message?.order?.updated_at;
        const billingUpdatedAt = init?.message?.order?.billing?.updated_at;
        const billingCreatedAt = init?.message?.order?.billing?.created_at;
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.created_at' which is a string", function () {
            expect(message.order.billing.created_at).to.exist.and.to.be.a("string").and.to.be.deep.equal(billingCreatedAt);
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.updated_at' which is a string ", function () {
            expect(message.order.billing.updated_at).to.exist.and.to.be.a("string").and.to.be.deep.equal(billingUpdatedAt);
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string ", function () {
            expect(message.order.created_at).to.exist.and.to.be.a("string").and.to.be.deep.equal(createdAt);
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.created_at' which is a string ", function () {
            expect(message.order.updated_at).to.exist.and.to.be.a("string").and.to.be.greaterThan(updatedAt);
        }));

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


module.exports = async function on_update({ context, message } = {}, logs = []) {
    try {
        const testSuite = new Mocha.Suite("on_update request verification");
        const constants = { action: "on_update", core_version: "1.2.0" };

        const responseTestSuite = response_verification({ context, message }, logs);
        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(onUpdateMessageTests({ context, message }, logs));

        return [responseTestSuite, testSuite];
    } catch (err) {
        console.log(err);
    }
}