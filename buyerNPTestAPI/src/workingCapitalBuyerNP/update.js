const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const updateSchema = require("./schema/update.schema");
const { generateTests } = require("./common");

function PrepartpaymentTests(testSuite, message, testCaseId) {

  let testcaseCounter = 10001;
  const getNextTestcaseId = () => testcaseCounter++;

  if (message?.order?.payments && message.order.payments.length > 0) {
    message.order.payments.forEach((payment, paymentIndex) => {
      if (payment?.time?.label === "PRE_PART_PAYMENT") {
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}]' should have a property 'params' which is an object`, function () {
          expect(payment).to.have.property("params").that.is.an("object");
        }
        ));

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].params' should have a property 'amount' which is a string (OPTIONAL)`, function () {
          if (payment.params?.amount) {
            expect(payment.params.amount).to.be.a("string");
          }
        }
        ));

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${paymentIndex}].params' should have a property 'currency' which is a string (OPTIONAL)`, function () {
          if (payment.params?.currency) {
            expect(payment.params.currency).to.be.a("string");
          }
        }
        ));
      }
    });
  }
}

function updateMessageTests(message, testCaseId) {
  try {
    const messageTestSuite = generateTests(message, updateSchema, "Verification of Message for update", testCaseId);
    PrepartpaymentTests(messageTestSuite, message, testCaseId);
    return messageTestSuite;
  } catch (err) {
    console.error("Error in updateMessageTests:", err);
  }
}

module.exports = async function update({ context, message } = {}, step, testCaseId) {
  try {
    const testSuite = new Mocha.Suite(`Update (${step}) Request Verification`);
    const constants = { action: "update", version: "2.3.0" };

    testSuite.addSuite(contextTests(context, constants, testCaseId));
    testSuite.addSuite(updateMessageTests(message, testCaseId));

    return testSuite;
  } catch (err) {
    console.error("Error in update function:", err);
  }
};
