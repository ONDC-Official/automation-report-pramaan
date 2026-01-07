const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-uuid"));
const Mocha = require("mocha");

module.exports = function contextTests(context, action, testSuite) {
    const contextTestSuite = Mocha.Suite.create(testSuite, "Verification of Context");

    contextTestSuite.addTest(new Mocha.Test("should have 'context' properties", function () {
        expect(context).to.exist;
    }));

    contextTestSuite.addTest(new Mocha.Test("should have 'context.location' property", function () {
        expect(context.location).to.exist;
        expect(context.location).to.be.an("object");
    }));

    contextTestSuite.addTest(new Mocha.Test("should have 'context.location.country.code' property", function () {
        expect(context.location?.country?.code).to.be.a("string").to.equal("IND");
    }));

    contextTestSuite.addTest(new Mocha.Test("should have 'context.location.city.code' property", function () {
        expect(context.location.city.code).to.exist;
        expect(context.location.city.code).to.be.a("string")
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the content of 'context.domain'", function () {
        expect(context.domain).to.be.a("string").to.equal("ONDC:TRV14");
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the timestamp of the request payload", function () {
        expect(context.timestamp).to.exist;
        expect(context.timestamp).to.be.a("string").and.matches(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the content of context - 'context.bap_id'", function () {
        expect(context.bap_id, "BAP_ID should be defined").to.exist;
    }));

    contextTestSuite.addTest(new Mocha.Test(`should verify the transaction_id ${context?.transaction_id} of the payload (OPTIONAL)`, function () {
        expect(context.transaction_id).to.exist;
        expect(context.transaction_id).to.be.a.uuid();
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the message_id of the payload (OPTIONAL)", function () {
        expect(context.message_id).to.exist;
        expect(context.message_id).to.be.a.uuid();
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the version of the payload", function () {
        expect(context.version).to.exist;
        expect(context.version).to.be.a("string").to.equal("2.0.0");
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the action of the request payload", function () {
        expect(context.action).to.exist;
        expect(context.action).to.be.a("string").to.equal(action);
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the content of context - 'context.bap_uri'", function () {
        expect(context.bap_uri, "BAP URI should exist").to.be.a("string");

        // Regular expression for basic URI validation
        const uriRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        expect(context.bap_uri, "BAP URI should be a valid URI").to.match(uriRegex);
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the ttl of the request payload", function () {
        expect(context.ttl).to.exist;
        expect(context.ttl).to.be.a("string").and.match(/^P(?!$)(?:(\d+Y)?(\d+M)?(\d+D)?)(T(?=\d)(\d+H)?(\d+M)?(\d+(?:\.\d+)?S)?)?$/);
    }));


    if (action !== "search") {
        contextTestSuite.addTest(new Mocha.Test("should verify the content of context - 'context.bpp_id'", function () {
            expect(context.bpp_id, "BPP_ID should be defined").to.exist;
        }));

        contextTestSuite.addTest(new Mocha.Test("should verify the content of context - 'context.bpp_uri'", function () {
            expect(context.bpp_uri, "BPP URI should exist").to.be.a("string");

            // Regular expression for basic URI validation
            const uriRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            expect(context.bpp_uri, "BPP URI should be a valid URI").to.match(uriRegex);
        }));
    }
}
