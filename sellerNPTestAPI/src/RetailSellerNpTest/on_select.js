const Mocha = require("mocha");
const contextTests = require("./context");
const onSelectSchema = require("./schema/on_select.schema");
const { generateTests } = require("./common");
const { expect } = require("chai");
const response_verification = require("../centralizedUtilities/responseVerification");
const {
  updateTrail,
  trailTests,
} = require("../centralizedUtilities/trailManagement");

function onSelectMessageTests({ context, message }, constants) {
  try {
    // generating the tests using recursive methods
    const messageTestSuite = generateTests(
      { context, message },
      onSelectSchema,
      "Verification of Message",
      constants
    );
    return messageTestSuite;
  } catch (err) {
    console.log(err);
  }
}

module.exports = async function on_select(
  { context, message, error } = {},
  logs = [],
  currentTrail = {},
  constants = {},
  test = "on_select"
) {
  try {
    const testSuite = new Mocha.Suite("on_select request verification");
    constants = {
      ...constants,
      action: "on_select",
    };

    const responseTestSuite = response_verification({ context, message }, logs);
    testSuite.addSuite(contextTests(context, constants, logs));
    testSuite.addSuite(onSelectMessageTests({ context, message }, constants));

    // const trail = updateTrail(currentTrail, message.order, "on_select", error);
    // testSuite.addSuite(trailTests(trail, message.order, constants));

    let count = 1;
    const test_id_template = "retail_bpp_on_select_errors";
    if (test === "on_select_out_of_stock") {
      const errorsTestSuite = new Mocha.Suite("Verification of error block");

      errorsTestSuite.addTest(
        new Mocha.Test(
          `'[id: ${test_id_template}_${count++}_type]' 'error' should exist and should be an object`,
          function () {
            expect(error).to.exist.and.to.be.an("object");
          }
        )
      );

      errorsTestSuite.addTest(
        new Mocha.Test(
          `'[id: ${test_id_template}_${count++}]' 'error' should have a property named 'type' that is a string`,
          function () {
            expect(error).to.have.property("type").that.is.a("string");
          }
        )
      );

      errorsTestSuite.addTest(
        new Mocha.Test(
          `'[id: ${test_id_template}_${count++}]' 'error.type' should be equal to 'DOMAIN-ERROR'`,
          function () {
            expect(error.type).to.equal("DOMAIN-ERROR");
          }
        )
      );

      errorsTestSuite.addTest(
        new Mocha.Test(
          `'[id: ${test_id_template}_${count++}]' 'error' should have a property named 'code' that is a string`,
          function () {
            expect(error).to.have.property("code").that.is.a("string");
          }
        )
      );

      errorsTestSuite.addTest(
        new Mocha.Test(
          `'[id: ${test_id_template}_${count++}]' 'error.code' should be equal to '40002'`,
          function () {
            expect(error.code).to.equal("40002");
          }
        )
      );

      errorsTestSuite.addTest(
        new Mocha.Test(
          `'[id: ${test_id_template}_${count++}]' 'error' should have a property named 'message' that is a string`,
          function () {
            expect(error).to.have.property("message").that.is.a("string");
          }
        )
      );

      testSuite.addSuite(errorsTestSuite);
    }

    return [responseTestSuite, testSuite];
  } catch (err) {
    console.log(err);
  }
};
