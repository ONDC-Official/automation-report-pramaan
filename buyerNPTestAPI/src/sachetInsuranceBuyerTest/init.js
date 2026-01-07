const Mocha = require("mocha");
const contextTests = require("./context")
const { expect } = require("chai");
const { quoteCommonTests, itemsCommonFieldsTests, providerWithID, xinputOnStatusGeneral, fulfillmentsTests, itemsWithXinputTests } = require('./commonTest');
const response_verification = require("../centralizedUtilities/responseVerification");
 
module.exports = async function init({ context, message } = {}, logs = [], constants ={}) {
  try {
    

    const testSuite = new Mocha.Suite("Init  Request Verification");
    contextTests(context, "init", testSuite);
    const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
    const responseTestSuite = response_verification({ context, message }, logs,constants);

    messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
      expect(message).to.exist.a.property("order").that.is.an("object");
    }));

    fulfillmentsTests(message, messageTestSuite,constants);

    messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'items' which is an array", function () {
      expect(message.order).to.exist.and.to.have.property("items").that.is.an("array").and.is.not.empty;
    }));

    if (message?.order?.items && message?.order?.items?.length > 0) {
      message.order.items.forEach((item, i) => {
        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}]' should be an object`, function () {
          expect(item).to.be.an("object").that.includes.all.keys("id");
        }));
        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].id' should be an string`, function () {
          expect(item.id).to.be.an("string");
        }));
        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].parent_item_id' should be an string`, function () {
          expect(item.parent_item_id).to.be.an("string");
        }));
      })
    }
    messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.payments' is an array that is not empty", function () {
      expect(message.order.payments, "'message.order.payments should be a non-empty array'").to.be.an("array").that.is.not.empty;
    }));

    message?.order?.payments.forEach((payment, index) => {
      messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should be an object`, function () {
        expect(payment).to.exist.and.to.be.an("object");
      }));

      messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].collected_by' should exist and should be a string`, function () {
        expect(payment.collected_by).to.exist.and.to.be.a("string").that.is.not.empty;
      }));

      messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].collected_by' should be one of 'BPP' or 'BAP'`, function () {
        expect(payment.collected_by).to.be.oneOf(["BPP", "BAP"]);
      }));

      messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].type' should exist and should be a string (OPTIONAL)`, function () {
        expect(payment.type).to.exist.and.to.be.a("string").that.is.not.empty;
      }));

      messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].type' should be a valid ENUM (OPTIONAL)`, function () {
        expect(payment.type).to.be.oneOf(["PRE-ORDER", "PRE-FULFILLMENT", "ON-FULFILLMENT", "POST-FULFILLMENT", "ON-ORDER", "PRE_ORDER", "PRE_FULFILLMENT", "ON_FULFILLMENT", "POST_FULFILLMENT", "ON_ORDER",]);
      }));

      messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].status' should exist and should be a string (OPTIONAL)`, function () {
        expect(payment.status).to.exist.and.to.be.a("string").that.is.not.empty;
      }));

      messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].status' should be one of [ "PAID", "NOT-PAID", "DELAYED", "DEFERRED" ] (OPTIONAL)`, function () {
        expect(payment.status).to.be.oneOf(["PAID", "NOT-PAID", "DELAYED", "DEFERRED",]);
      }));
    });

    messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.provider' is an object", function () {
      expect(message.order.provider).to.be.an("object");
    }));

    providerWithID(message, messageTestSuite);
    // tags....
    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of'message.order' should have a property named 'tags' which is an array`, function () {
      expect(message.order).to.have.property("tags").that.is.an("array");
    }));
    if (message?.order?.tags) {
      const arr = [{ code: "BPP_TERMS" }];

      arr.forEach((ele) => {
        const tagIndex = message?.order?.payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
        const tagItem = message?.order?.payment?.tags[tagIndex];
        messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags' should have an object of ${ele.code}`, function () {
          expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
        }));

        if (tagIndex !== -1) {
          messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
            expect(tagItem).to.have.property("descriptor").that.is.an("object");
            expect(tagItem).to.have.property("display").that.is.a("boolean");
            expect(tagItem).to.have.property("list").that.is.an("array");
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
            expect(tagItem.descriptor.code).to.be.equal(ele.code);
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags[${tagIndex}].display' should have be equal to false`, function () {
            expect(tagItem.display).to.be.equal(false);
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags[${tagIndex}].list' should have be a non empty array`, function () {
            expect(tagItem.list).to.be.an("array").that.is.not.empty;
          }));

          const array = [{ code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];

          if (array) {
            array.forEach((it) => {
              const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
              const listItem = tagItem?.list[listItemIndex];

              messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                expect(listItem).to.exist.and.to.be.an("object");
              }));

              if (listItemIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                  expect(listItem).to.have.property("descriptor").that.is.an("object");
                  expect(listItem).to.have.property("value").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                  expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                  expect(listItem.descriptor.code).to.be.equal(it.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payment.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                  expect(listItem.value).to.be.a('string').that.is.not.empty;
                }));
              }
            })
          }
        }
      });
    }
    return [testSuite, responseTestSuite];
  } catch (err) {
    console.log(err);
    return err;
  }
}