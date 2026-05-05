const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");

function catalogRejectionTests(errors = []) {
    try {
        let count = 1;
        const test_id_template = "retail_bap_catalog_rejection_errors";

        const errorsTestSuite = new Mocha.Suite("Verification of Errors");

        errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'errors' should be a non empty array`, function () {
            expect(errors).to.be.an("array").that.is.not.empty;
        }));

        errors.forEach((error, index) => {
            errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'errors[${index}]' should be an object`, function () {
                expect(error).to.be.an("object");
            }));

            ["type", "code", "path", "message"].forEach((prop) => {
                errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}]' 'errors[${index}]' should have a property ${prop}`, function () {
                    expect(error).to.have.property(prop);
                }));

                errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_type]' 'errors[${index}].${prop}' should be a string`, function () {
                    expect(error[prop]).to.be.a("string");
                }));

                errorsTestSuite.addTest(new Mocha.Test(`'[id: ${test_id_template}_${count++}_minLength]''errors[${index}].${prop}' should have at least one character`, function () {
                    expect(error[prop]).to.have.lengthOf.at.least(1);
                }));
            })
        });

        return errorsTestSuite;
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function catalog_rejection({ context, errors } = {}, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite("catalog_rejection request verification");
        constants = { ...constants, action: "catalog_rejection", excludeProps: ["context.ttl"] };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(catalogRejectionTests(errors));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
}
