const { expect } = require("chai");
const Mocha = require("mocha");


module.exports = async function on_search_response({ message } = {}) {
    const testSuite = new Mocha.Suite("on_search response verification");

    let count = 1;
    const test_id_template = "retail_bap_on_search_response";

    testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message' should be an object`, function () {
        expect(message).to.be.an("object");
    }));

    testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message' should have a property 'ack' that is an object`, function () {
        expect(message).to.have.property("ack").that.is.an("object");
    }));

    testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message.ack' should have a property 'status' that is a string`, function () {
        expect(message.ack).to.have.property("status").that.is.a("string");
    }));

    testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_enum]' 'message.ack.status' should be one of ['ACK']`, function () {
        expect(message.ack.status).to.be.oneOf(["ACK"]);
    }));

    testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message' should have a property tags that is an object and that is not null`, function () {
        expect(message).to.have.property("tags").that.is.an("object");
    }));

    testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message.tags' should have property 'code' that is a string`, function () {
        expect(message?.tags).to.have.property("code").that.is.a("string");
    }));

    testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_enum]' 'message.tags.code' should be equal to "CATALOG_PROCESSING"`, function () {
        expect(message?.tags?.code).to.equal("CATALOG_PROCESSING");
    }));

    testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message.tags' should have property 'list' that is an array and is not empty`, function () {
        expect(message?.tags).to.have.property("list").that.is.an("array").and.is.not.empty;
    }));

    [{ code: "MIN_PROCESS_DURATION", test: "duration" }].forEach((ls, listIndex) => {
        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message.tags.list[${listIndex}]' should be an object`, function () {
            expect(message?.tags?.list[listIndex]).to.be.an("object");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message.tags.list[${listIndex}]' should have property 'code' that is a string`, function () {
            expect(message?.tags?.list[listIndex]).to.have.property("code").that.is.a("string");
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_enum]' 'message.tags.list[${listIndex}]' should be equal to '${ls?.code}'`, function () {
            expect(message?.tags?.list[listIndex]?.code).to.equal(ls?.code);
        }));

        testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'message.tags.list[${listIndex}]' should have property 'value' that is a string`, function () {
            expect(message?.tags?.list[listIndex]).to.have.property("value").that.is.a("string");
        }));

        switch (ls?.test) {
            case "duration":
                testSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_format]' 'message.tags.list[${listIndex}].value' should be a valid RFC3339 duration`, function () {
                    expect(message?.tags?.list[listIndex]?.value).to.match(/^P(?:(\d+Y)?(\d+M)?(\d+D)?)(?:T(\d+H)?(\d+M)?(\d+S)?)?$/);
                }));
                break;
            default:
                break;
        }
    })

    return testSuite;
}
