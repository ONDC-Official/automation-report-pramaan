const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-uuid"));
const Mocha = require("mocha");
const { iso8601DurationRegex, urlRegex, isoTime } = require("../utils/constants.js");


module.exports = function contextTests(context, action, testSuite, version = "", domain = "") {
    const contextTestSuite = Mocha.Suite.create(testSuite, "Verification of Context");

    contextTestSuite.addTest(new Mocha.Test("should have 'context' properties", function () {
        expect(context).to.exist;
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the content of 'context.domain'", function () {
        expect(context.domain).to.be.a("string").and.to.be.equal(domain);
    }));

    if (/ONDC:RET|ONDC:LOG|nic|AGR/.test(context?.domain || "")) {
        contextTestSuite.addTest(new Mocha.Test("should have 'context.country' property", function () {
            expect(context.country).to.be.a("string").to.equal("IND");
        }));

        contextTestSuite.addTest(new Mocha.Test("should have 'context.city' property", function () {
            expect(context.city).to.be.a("string");
        }));

        contextTestSuite.addTest(new Mocha.Test("should verify the core_version of the payload", function () {
            expect(context.core_version).to.exist;
            expect(context.core_version).to.be.a("string").to.equal(version);
        }));
    } else {
        contextTestSuite.addTest(new Mocha.Test("should have 'context.location' property", function () {
            expect(context.location).to.exist;
            expect(context.location).to.be.an("object");
        }));

        contextTestSuite.addTest(new Mocha.Test("should have 'context.location.country.code' property", function () {
            expect(context.location?.country?.code).to.be.a("string").to.equal("IND");
        }));

        contextTestSuite.addTest(new Mocha.Test("should have 'context.location.city.code' property", function () {
            expect(context.location?.city?.code).to.be.a("string");
        }));

        contextTestSuite.addTest(new Mocha.Test("should verify the content of 'context.location.city.code'", function () {
            expect(context.location.city.code).to.exist;
            expect(context.location.city.code).to.be.a("string");
        }));

        contextTestSuite.addTest(new Mocha.Test("should verify the version of the payload", function () {
            expect(context.version).to.exist;
            expect(context.version).to.be.a("string").to.equal(version);
        }));
    }

    contextTestSuite.addTest(new Mocha.Test("should verify the transaction_id of the payload", function () {
        expect(context.transaction_id).to.exist;
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the message_id of the payload", function () {
        expect(context.message_id).to.exist;
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the action of the request payload", function () {
        expect(context.action).to.exist;
        expect(context.action).to.be.a("string").to.equal(action);
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the timestamp of the request payload", function () {
        expect(context.timestamp).to.exist;
        expect(context.timestamp).to.be.a("string").and.matches(isoTime);
    }));

    // contextTestSuite.addTest(new Mocha.Test("should verify the ttl of the request payload", function () {
    //     expect(context.ttl).to.exist;
    //     expect(context.ttl).to.be.a("string").to.match(iso8601DurationRegex);
    // }));

    contextTestSuite.addTest(new Mocha.Test("should verify the content of context - 'context.bap_id'", function () {
        expect(context.bap_id, "BAP_ID should be defined").to.exist;
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the content of context - 'context.bap_uri'", function () {
        expect(context.bap_uri, "BAP URI should exist").to.be.a("string");
        expect(context.bap_uri, "BAP URI should be a valid URI").to.match(urlRegex);
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the content of context - 'context.bpp_id'", function () {
        expect(context.bpp_id, "BPP_ID should be defined").to.exist;
    }));

    contextTestSuite.addTest(new Mocha.Test("should verify the content of context - 'context.bpp_uri'", function () {
        expect(context.bpp_uri, "BPP URI should exist").to.be.a("string");
        expect(context.bpp_uri, "BPP URI should be a valid URI").to.match(urlRegex);
    }));
}
