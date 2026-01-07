const Mocha = require("mocha");
const { expect } = require("chai");
const chai = require("chai"); 4
chai.use(require("chai-uuid"));

const actionMap = {
    "search": "on_search",
    "select": "on_select",
    "init": "on_init",
    "confirm": "on_confirm",
    "cancel": "on_cancel",
    "status": "on_status",
    "info": "on_info",
    "issue_status": "on_issue_status",
    "issue": "on_issue",
    "recon": "on_recon",
    "update": "on_update"
}

const actionsThatRequireSyncAPIs = [
    "search",
    "select",
    "init",
    "confirm",
    "info"
]

module.exports = function response_verification({ context, message } = {}, logs = [], constants = {}) {
    const counterLog = logs?.find((log) => (log?.message_id === context?.message_id) && log.action.startsWith("on_"));
    const { context: responseContext, message: responseMessage, error: responseError } = counterLog?.response || {};
    let count = 1;
    let type = constants.type;
    let test_id_template;
    switch (type) {
        case "RETAIL":
            test_id_template = `retail_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "LOGISTICS":
            test_id_template = `b2b_log_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "LOGISTICS_1_2_5":
            test_id_template = `logistics_1_2_5_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "ACCOMMODATION":
            test_id_template = `accommodation_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "AIRLINE":
            test_id_template = `airline_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "PERSONAL_LOAN":
            test_id_template = `personal_loan_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "INVOICE_BASED_LOAN":
            test_id_template = `invoice_based_loan_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "PURCHASE_FINANCE":
            test_id_template = `purchase_finance_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "WORKING_CAPITAL":
            test_id_template = `working_capital_finance_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "ENTRY_PASS":
            test_id_template = `entry_pass_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "MARINE_INSURANCE":
            test_id_template = `marine_insurance_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "HEALTH_INSURANCE":
            test_id_template = `health_insurance_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "MOTOR_INSURANCE":
            test_id_template = `motor_insurance_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "SACHET_INSURANCE":
            test_id_template = `sachet_insurance_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "METRO":
            test_id_template = `metro_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "BUS":
            test_id_template = `bus_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "INTERCITY":
            test_id_template = `intercity_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "GIFTCARD":
            test_id_template = `giftcard_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;
        case "ON_DEMAND":
            test_id_template = `on_demand_bap_sync_${actionMap[context?.action || "-"]}_response`;
            break;

    }
    const testSuite = new Mocha.Suite(`${actionMap[context?.action]} sync response verification`);
    if (actionsThatRequireSyncAPIs.includes(context?.action) && !(counterLog)) {
        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' sync response should exist for the given API`, function () {
            expect(true).to.equal(false);

        }));

        return testSuite;
    }

    if (!(counterLog)) {
        return new Mocha.Suite(`Unsolicited Call`)
    }

    try {
        let count = 1;

        // const test_id_template = `retail_bap_sync_${actionMap[responseContext?.action]}_response`;
        if (/ONDC:RET|ONDC:LOG|nic/.test(context?.domain || "")) {
            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context' should be an object`, function () {
                expect(responseContext).to.be.an("object");
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.domain' should be a string`, function () {
                expect(responseContext.domain).to.be.a("string");
            }));
            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.country' should be a string`, function () {
                expect(responseContext.country).to.be.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.city' should be a string`, function () {
                expect(responseContext.city).to.be.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.core_version' should be a string`, function () {
                expect(responseContext.core_version).to.be.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.action' should be a string`, function () {
                expect(responseContext.action).to.be.a("string");
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.bap_id' should be a string`, function () {
                expect(responseContext.bap_id).to.be.a("string");
            }));
            const uriRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.bap_uri' should be a string`, function () {
                expect(responseContext.bap_uri).to.be.a("string").and.to.match(uriRegex);
            }));

            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.bpp_id' should be a string`, function () {
                expect(responseContext.bpp_id).to.be.a("string");
            }));
            testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'context.bpp_uri' should be a string`, function () {
                expect(responseContext.bpp_uri).to.be.a("string").and.to.match(uriRegex);
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