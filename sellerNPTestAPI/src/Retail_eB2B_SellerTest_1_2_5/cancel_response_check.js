const Mocha = require("mocha");
const { expect } = require("chai");

module.exports = async function cancel_response_check({ message, error } = {}) {
    const testSuite = new Mocha.Suite("cancel response verification");
    try {
        const error = {
            type: "DOMAIN_ERROR",
            code: "50001",
            message: "Cancellation not possible for an order with non_cancellable items ordered."
        }

        let count = 1;
        const test_id_template = "retail_bpp_cancel_response";

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message' should be an object`, function () {
            expect(message).to.be.an("object");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message' should have a property 'ack' that is an object`, function () {
            expect(message).to.have.property("ack").that.is.an("object");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message.ack' should have a property 'status' that is a string`, function () {
            expect(message.ack).to.have.property("status").that.is.a("string");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_enum]' 'message.ack.status' should be one of ['NACK']`, function () {
            expect(message.ack.status).to.be.oneOf(["NACK"]);
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'error' should be an object`, function () {
            expect(error).to.be.an("object");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'error' should have a property 'type' that is a string`, function () {
            expect(error).to.have.property("type").that.is.a("string");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_enum]' 'error.type' should equal 'DOMAIN_ERROR'`, function () {
            expect(error.type).to.equal("DOMAIN_ERROR");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'error' should have a property 'code' that is a string`, function () {
            expect(error).to.have.property("code").that.is.a("string");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_enum]' 'error.code' should equal '50001'`, function () {
            expect(error.code).to.equal("50001");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'error' should have a property 'message' that is a string`, function () {
            expect(error).to.have.property("message").that.is.a("string");
        }));

        return testSuite;
    } catch (err) {
        console.log(err);
        testSuite.addTest(new Mocha.Test("cancel response payload could not be verified due to something missing or internal error", function () {
            expect(true).to.equal(false);
        }));
        return testSuite;
    }
}