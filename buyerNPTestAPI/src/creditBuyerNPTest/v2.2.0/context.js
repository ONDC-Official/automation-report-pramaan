const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-uuid"));
const Mocha = require("mocha");
const { iso8601DurationRegex, urlRegex, isoTime } = require("../../utils/constants");
const { contextBussinessTests } = require("../../bussinessTests/commonBussiness");

module.exports = function contextTests(context, action, testSuite, logs) {
    const contextTestSuite = Mocha.Suite.create(testSuite, "Verification of Context");

    contextBussinessTests(contextTestSuite, context, logs);


    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_01] should have 'context' properties", function () {
        expect(context).to.exist;
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_02] should verify the content of 'context.domain'", function () {
        expect(context.domain).to.be.a("string").to.equal("ONDC:FIS12");
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_03] should have 'context.location' property", function () {
        expect(context.location).to.exist;
        expect(context.location).to.be.an("object");
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_04] should have 'context.location.country.code' property", function () {
        expect(context.location?.country?.code).to.be.a("string").to.equal("IND");
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_05] should have 'context.location.city.code' property", function () {
        expect(context.location?.city?.code).to.be.a("string");
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_06] should verify the content of 'context.location.city.code'", function () {
        expect(context.location.city.code).to.exist;
        expect(context.location.city.code).to.be.a("string").to.equal("*");
    }));

    contextTestSuite.addTest(new Mocha.Test(`[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_07] should verify the transaction_id ${context?.transaction_id} of the payload (OPTIONAL)`, function () {
        expect(context.transaction_id).to.exist;
        expect(context.transaction_id).to.be.a.uuid();
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_08] should verify the message_id of the payload (OPTIONAL)", function () {
        expect(context.message_id).to.exist;
        expect(context.message_id).to.be.a.uuid();
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_09] should verify the action of the request payload", function () {
        expect(context.action).to.exist;
        expect(context.action).to.be.a("string").to.equal(action);
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_10] should verify the timestamp of the request payload", function () {
        expect(context.timestamp).to.exist;
        expect(context.timestamp).to.be.a("string").and.matches(isoTime);
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_11] should verify the version of the payload", function () {
        expect(context.version).to.exist;
        expect(context.version).to.be.a("string").to.equal("2.2.0");
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_12] should verify the ttl of the request payload", function () {
        expect(context.ttl).to.exist;
        expect(context.ttl).to.be.a("string").to.match(iso8601DurationRegex);
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_13] should verify the content of context - 'context.bap_id'", function () {
        expect(context.bap_id, "BAP_ID should be defined").to.exist;
    }));

    contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_14] should verify the content of context - 'context.bap_uri'", function () {
        expect(context.bap_uri, "BAP URI should exist").to.be.a("string");
        expect(context.bap_uri, "BAP URI should be a valid URI").to.match(urlRegex);
    }));

    if (action !== "search") {
        contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_15] should verify the content of context - 'context.bpp_id'", function () {
            expect(context.bpp_id, "BPP_ID should be defined").to.exist;
        }));

        contextTestSuite.addTest(new Mocha.Test("[id: ONDC:FIS12_PURCHASE_FINANCE_context_test_16] should verify the content of context - 'context.bpp_uri'", function () {
            expect(context.bpp_uri, "BPP URI should exist").to.be.a("string");
            expect(context.bpp_uri, "BPP URI should be a valid URI").to.match(urlRegex);
        }));
    }
}
