const Mocha = require("mocha");
const { expect } = require("chai");
const chai = require("chai"); 4
chai.use(require("chai-uuid"));

const actionMap = {
    "on_search": "search",
    "on_select": "select",
    "on_init": "init",
    "on_confirm": "confirm",
    "on_cancel": "cancel",
    "on_status": "status",
    "on_info": "info",
    "on_issue_status": "issue_status",
    "on_issue": "issue",
    "on_recon": "recon",
    "on_update": "update"
}

const actionsThatRequireSyncAPIs = [
    "on_search",
    "on_select",
    "on_init",
    "on_confirm",
    "on_info"
]

module.exports = function response_verification({ context, message } = {}, logs = [], constants = {}) {
    const counterLog = logs?.find((log) => (log?.message_id === context?.message_id) && !log.action.startsWith("on_"));
    const { context: responseContext, message: responseMessage, error: responseError } = counterLog?.response || {};
    let count = 1;
    const domain = logs[0]?.request?.context?.domain
    const responseAction = counterLog?.request?.context?.action;
    let test_id_template = `${domain}_bpp_sync_${actionMap[context?.action || "-"]}_response`;

    const testSuite = new Mocha.Suite(`${actionMap[context?.action]} sync response verification`);
    if (context?.domain === "ONDC:FIS14") {
        if ((constants?.action === "on_confirm" && constants?.step === "I") || (constants?.action === "on_search") || (constants?.action === "on_select") || (constants?.action === "on_init")) {
            if (actionsThatRequireSyncAPIs.includes(context?.action) && !(counterLog)) {
                testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' sync response should exist for the given API`, function () {
                    expect(true).to.equal(false);
                }));
                return testSuite;
            }
        }
    } else {
        if (actionsThatRequireSyncAPIs.includes(context?.action) && !(counterLog)) {
            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' sync response should exist for the given API`, function () {
                expect(true).to.equal(false);

            }));

            return testSuite;
        }
    }
    if (!(counterLog)) {
        return new Mocha.Suite(`Unsolicited Call`)
    }

    try {
        let count = 1;


        const test_id_template = `${domain}_bpp_sync_${actionMap[responseContext?.action]}_response`;

        if (/ONDC:RET|ONDC:LOG|nic/.test(context?.domain || "")) {
            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context' should be an object`, function () {
                expect(responseContext).to.be.an("object");
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.domain' should be a string`, function () {
                expect(responseContext.domain).to.be.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.action' should be a string`, function () {
                expect(responseContext.action).to.be.a("string").and.be.equal(responseAction);
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.bap_id' should be a string`, function () {
                expect(responseContext.bap_id).to.be.a("string");
            }));
            const uriRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.bap_uri' should be a string`, function () {
                expect(responseContext.bap_uri).to.be.a("string").and.to.match(uriRegex);
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.transaction_id' should be a string`, function () {
                expect(responseContext.transaction_id).to.be.a("string").and.to.be.a.uuid();
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.message_id' should be a string`, function () {
                expect(responseContext.message_id).to.be.a("string").and.to.be.a.uuid();
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.timestamp' should be a string`, function () {
                expect(responseContext.timestamp).to.be.a("string").and.matches(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.ttl' should be a string (OPTIONAL)`, function () {
                expect(responseContext.ttl).to.be.a("string");
            }));
        }

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message' should be an object`, function () {
            expect(responseMessage).to.be.an("object");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message' should have a property 'ack' that is an object`, function () {
            expect(responseMessage).to.have.property("ack").that.is.an("object");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message.ack' should have a property 'status' that is a string`, function () {
            expect(responseMessage.ack).to.have.property("status").that.is.a("string");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_enum]' 'message.ack.status' should be one of ['NACK', 'ACK']`, function () {
            expect(responseMessage.ack.status).to.be.oneOf(["NACK", "ACK"]);
        }));

        if (responseError) {
            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'error' should be an object`, function () {
                expect(responseError).to.be.an("object");
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'error' should have a property 'type' that is a string (OPTIONAL)`, function () {
                expect(responseError).to.have.property("type").that.is.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'error' should have a property 'code' that is a string`, function () {
                expect(responseError).to.have.property("code").that.is.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'error' should have a property 'message' that is a string`, function () {
                expect(responseError).to.have.property("message").that.is.a("string");
            }));
        }

        return testSuite;
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("sync response payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return testSuite;
    }
}