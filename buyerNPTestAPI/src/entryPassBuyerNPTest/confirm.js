const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const { providerIdTest, paymentsBussinessTestsMobility, } = require("../bussinessTests/mobilityBussiness");
const { settlementTermsListTests, } = require("../bussinessTests/rideHailingBussiness");
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function confirm({ context, message } = {}, isSelfPickup = false, logs = [], constants = {}) {
  try{
  const testSuite = new Mocha.Suite(`Confirm Request Verification`);
  contextTests(context, "confirm", testSuite, logs);
  const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
  const responseTestSuite = response_verification({ context, message }, logs, constants);

  messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' object", function () {
    expect(message).to.exist.and.to.be.an("object");
  }));
  messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
    expect(message.order).to.exist.and.to.be.an("object");
  }));

  // message.order.billing
  messageTestSuite.addTest(
    new Mocha.Test("Verify the presence of 'message.order.billing' which is an object", function () {
      expect(message.order.billing).to.exist.and.to.be.an("object");
    }));
  messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.name' which is a string", function () {
    expect(message.order.billing.name).to.exist.and.to.be.a("string");
  }));
  messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.email' which is a string", function () {
    expect(message.order.billing.email).to.exist.and.to.be.a("string");
  }));
  messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing.phone' which is a string", function () {
    expect(message.order.billing.phone).to.exist.and.to.be.a("string");
  }));

  // message.order.fulfillments
  messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order' should have a property named 'fulfillments' which is an array`, function () {
    expect(message.order).to.have.property("fulfillments").that.is.an("array");
  }));

  if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
    message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
      messageTestSuite.addTest(
        new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' should have a property named 'id' which is a string`, function () {
          expect(fulfillment).to.have.property("id").that.is.a("string");
        }));
      messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
        expect(fulfillment.stops).to.exist.and.to.be.an("array");
      }));

      if (fulfillment.stops && fulfillment.stops.length > 0) {
        fulfillment.stops.forEach((stopItem, stopIndex) => {
          messageTestSuite.addTest(
            new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
              expect(stopItem).to.exist.and.to.be.an("object");
            }));
          messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
            expect(stopItem.type).to.exist.and.to.be.a("string");
          }));
          messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
            expect(stopItem.time).to.exist.and.to.be.an("object");
          }));
          messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.timestamp' which is a string`, function () {
            expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
          }));
        });
      }
    });
  }

  // message.order.items
  messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.items' which is an array", function () {
    expect(message.order.items).to.exist.and.to.be.an("array");
  }));

  if (message?.order?.items && message.order.items.length > 0) {
    message.order.items.forEach((item, index) => {
      messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}]' which is an object`, function () {
        expect(item).to.exist.and.to.be.an("object");
      }));
      messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].id' which is a string`, function () {
        expect(item.id).to.exist.and.to.be.a("string");
      }));
      messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].parent_item_id' which is a string`, function () {
        expect(item.parent_item_id).to.exist.and.to.be.a("string");
      }));
      messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].quantity' which is an object`, function () {
        expect(item.quantity).to.exist.and.to.be.an("object");
      }));
      messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].quantity.selected' which is an object`, function () {
        expect(item.quantity.selected).to.exist.and.to.be.an("object");
      }));
      messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].quantity.selected.count' which is a number`, function () {
        expect(item.quantity.selected.count).to.exist.and.to.be.a("number");
      }));
      if (item?.add_ons) {
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons' which is an array`, function () {
          expect(item.add_ons).to.exist.and.to.be.an("array");
        }));
        if (item.add_ons && item.add_ons.length > 0) {
          item.add_ons.forEach((addOn, addOnIndex) => {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons[${addOnIndex}]' which is an object`, function () {
              expect(addOn).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons[${addOnIndex}].id' which is a string`, function () {
              expect(addOn.id).to.exist.and.to.be.a("string");
            }));
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons.quantity[${addOnIndex}]' which is an object`, function () {
              expect(addOn.quantity).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons.quantity.selected[${addOnIndex}]' which is an object`, function () {
              expect(addOn.quantity.selected).to.exist.and.to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons.quantity.selected.count[${addOnIndex}]' which is a number`, function () {
              expect(addOn.quantity.selected.count).to.exist.and.to.be.a("number");
            }));
          });
        }
   } });
    }

    // message.order.items
    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.items' which is an array", function () {
      expect(message.order.items).to.exist.and.to.be.an("array");
    }));

    if (message?.order?.items && message.order.items.length > 0) {
      message.order.items.forEach((item, index) => {
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}]' which is an object`, function () {
          expect(item).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].id' which is a string`, function () {
          expect(item.id).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].parent_item_id' which is a string`, function () {
          expect(item.parent_item_id).to.exist.and.to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].quantity' which is an object`, function () {
          expect(item.quantity).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].quantity.selected' which is an object`, function () {
          expect(item.quantity.selected).to.exist.and.to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].quantity.selected.count' which is a number`, function () {
          expect(item.quantity.selected.count).to.exist.and.to.be.a("number");
        }));
        if (item?.add_ons) {
          messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons' which is an array`, function () {
            expect(item.add_ons).to.exist.and.to.be.an("array");
          }));
          if (item.add_ons && item.add_ons.length > 0) {
            item.add_ons.forEach((addOn, addOnIndex) => {
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons[${addOnIndex}]' which is an object`, function () {
                expect(addOn).to.exist.and.to.be.an("object");
              }));
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons[${addOnIndex}].id' which is a string`, function () {
                expect(addOn.id).to.exist.and.to.be.a("string");
              }));
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons.quantity[${addOnIndex}]' which is an object`, function () {
                expect(addOn.quantity).to.exist.and.to.be.an("object");
              }));
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons.quantity.selected[${addOnIndex}]' which is an object`, function () {
                expect(addOn.quantity.selected).to.exist.and.to.be.an("object");
              }));
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${index}].add_ons.quantity.selected.count[${addOnIndex}]' which is a number`, function () {
                expect(addOn.quantity.selected.count).to.exist.and.to.be.a("number");
              }));
            });
          }
        }
      });
    }

    // message.order.payments
    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payments' which is an array", function () {
      expect(message.order.payments).to.exist.and.to.be.an("array");
    }));

    if (message?.order?.payments && message.order.payments.length > 0) {
      message.order.payments.forEach((payment, paymentIndex) => {
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}]' which is an object`, function () {
          expect(payment).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].id' which is a string`, function () {
          expect(payment.id).to.exist.and.to.be.a("string");
        }));

        paymentsBussinessTestsMobility(messageTestSuite, message, logs);

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].collected_by' which is a string and is one of ["BAP", "BPP"]`, function () {
          expect(payment.collected_by).to.exist.and.to.be.a("string").and.oneOf(["BAP", "BPP"]);
        }));

        if (payment?.collected_by === "BPP") {
          messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params' which is a object`, function () {
            expect(payment.params).to.exist.and.to.be.a("object");
          }));

          const settlementType = payment?.tags
            ?.find((tag) => tag?.descriptor?.code === "SETTLEMENT_TERMS")
            ?.list?.find(
              (ls) => ls?.descriptor?.code === "SETTLEMENT_TYPE"
            )?.value;
          switch (settlementType) {
            case "UPI":
            case "upi":
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params.virtual_payment_address' which is a string`, function () {
                expect(payment.params.virtual_payment_address).to.exist.and.to.be.a("string");
              }));
              break;
            case "NEFT":
            case "neft":
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params.bank_code' which is a string`, function () {
                expect(payment.params.bank_code).to.exist.and.to.be.a("string");
              }));

              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params.bank_account_number' which is a string`, function () {
                expect(payment.params.bank_account_number).to.exist.and.to.be.a("string");
              }));
              break;
            default:
              break;
          }
        }

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].status' which is a string`, function () {
          expect(payment.status).to.exist.and.to.be.a("string").and.to.be.oneOf(["NOT-PAID", "PAID"]);
        }));

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].type' which is a string`, function () {
          expect(payment.type).to.exist.and.to.be.a("string");
        }));
        //     function () {
        //       expect(payment.tags).to.exist.and.to.be.an("array");
        //     }
        //   )
        // );

        // const arr = [
        //     { code: "BUYER_FINDER_FEES", name: "buyer finder fees" },
        //     { code: "SETTLEMENT_TERMS", name: "settlement terms" }
        // ];

        // arr.forEach((ele) => {
        //     const tagIndex = payment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
        //     const tagItem = payment?.tags?.[tagIndex];

        //     messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags' should have an object of ${ele.code}`, function () {
        //         expect(tagItem).to.exist.and.to.be.an("object");
        //     }));

        //     if (tagIndex !== -1) {
        //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
        //             expect(tagItem).to.have.property("descriptor").that.is.an("object");
        //             expect(tagItem).to.have.property("display").that.is.a("boolean");
        //             expect(tagItem).to.have.property("list").that.is.an("array");
        //         }));

        //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
        //             expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
        //         }));

        //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor.code' should be equal to '${ele.code}'`, function () {
        //             expect(tagItem.descriptor.code).to.be.equal(ele.code);
        //         }));

        //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].display' should be a boolean`, function () {
        //             expect(tagItem.display).to.be.a("boolean");
        //         }));

        //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list' should be a non-empty array`, function () {
        //             expect(tagItem.list).to.be.an("array").that.is.not.empty;
        //         }));

        //         const buyerFinderFeeType = tagItem?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
        //         const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_PERCENTAGE" }]
        //         const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];
        //         const settlementTermsArr = [{ code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "SETTLEMENT_TYPE" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "DELAY_INTEREST" }, { code: "STATIC_TERMS" }, { code: "SETTLEMENT_AMOUNT" }];

        //         let array;
        //         switch (tagItem?.descriptor?.code) {
        //             case "BUYER_FINDER_FEES":
        //                 switch (buyerFinderFeeType) {
        //                     case "amount":
        //                         array = buyerFinderFeeAmountArr;
        //                         break;
        //                     case "percent":
        //                     case "percent-annualized":
        //                         array = buyerFinderFeePercent;
        //                         break;
        //                     default:
        //                         array = buyerFinderFeePercent;
        //                         break;
        //                 }
        //                 break;
        //             case "SETTLEMENT_TERMS":
        //                 array = settlementTermsArr;
        //                 break;
        //             default:
        //                 break;
        //         }
        //         if (array) {
        //             array.forEach((it) => {
        //                 const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor?.code === it.code);
        //                 const listItem = tagItem?.list?.[listItemIndex];

        //                 messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
        //                     expect(listItem).to.exist.and.to.be.an("object");
        //                 }));

        //                 if (listItemIndex !== -1) {
        //                     messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
        //                         expect(listItem).to.have.property("descriptor").that.is.an("object");
        //                         expect(listItem).to.have.property("value").that.is.a("string");
        //                     }));

        //                     messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
        //                         expect(listItem.descriptor).to.have.property("code").that.is.a("string");
        //                     }));

        //                     messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
        //                         expect(listItem.descriptor.code).to.be.equal(it.code);
        //                     }));

        //                     messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
        //                         expect(listItem.value).to.be.a('string').that.is.not.empty;
        //                     }));
        //                 }
        //             });
        //         }
        //     }
        // });
      });
    }

    settlementTermsListTests(messageTestSuite, { context, message }, logs);

    // message.order.provider
    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider' which is an object", function () {
      expect(message.order.provider).to.exist.and.to.be.an("object");
    }));
    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider.id' which is a string", function () {
      expect(message.order.provider.id).to.exist.and.to.be.a("string");
    }));

    providerIdTest(messageTestSuite, { context, message }, logs);

    //message.order.tag
    messageTestSuite.addTest(new Mocha.Test(`'message.order.tags' should exist and should be an array that is not empty`, function () {
      expect(message.order.tags).to.exist.and.to.be.an("array").that.is.not.empty;
    }));

    if (message?.order?.tags) {

      const arr = [{ code: "BAP_TERMS" }, { code: "BPP_TERMS" }];

      arr.forEach((ele) => {
        const tagIndex = message?.order?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
        const tagItem = message?.order?.tags[tagIndex];
        messageTestSuite.addTest(new Mocha.Test(`'message.order.tags' should have an object of ${ele.code}`, function () {
          expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
        }));

        if (tagIndex !== -1) {
          messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}]' should have properties named 'descriptor' and 'list'`, function () {
            expect(tagItem).to.have.property("descriptor").that.is.an("object");
            expect(tagItem).to.have.property("list").that.is.an("array");
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string (OPTIONAL)`, function () {
            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
            expect(tagItem.descriptor.code).to.be.equal(ele.code);
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].display' should be a boolean that is not empty (OPTIONAL)`, function () {
                  expect(tagItem.display).to.be.a('boolean');
                }));

          messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list' should have be a non empty array`, function () {
            expect(tagItem.list).to.be.an("array").that.is.not.empty;
          }));

          const bapTermsArr = [{ code: "BUYER_FINDER_FEES_PERCENTAGE" }, { code: "BUYER_FINDER_FEES_TYPE" }, { code: "STATIC_TERMS" }, { code: "SETTLEMENT_BASIS" }, { code: "SETTLEMENT_WINDOW" }];
          const bppTermsArr = [{ code: "BUYER_FINDER_FEES_PERCENTAGE" }, { code: "BUYER_FINDER_FEES_TYPE" }, { code: "STATIC_TERMS" }, { code: "SETTLEMENT_BANK_CODE" }, { code: "SETTLEMENT_TYPE" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "DELAY_INTEREST" }, { code: "SETTLEMENT_AMOUNT" }, { code: "SETTLEMENT_BANK_ACCOUNT_NUMBER" }];

          let array;
          switch (tagItem?.descriptor?.code) {
            case "BAP_TERMS":
              array = bapTermsArr;
              break;
            case "BPP_TERMS":
              array = bppTermsArr;
              break;
            default:
              break;
          }

          if (array) {
            array.forEach((it) => {
              const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
              const listItem = tagItem?.list[listItemIndex];

              messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                expect(listItem).to.exist.and.to.be.an("object");
              }));

              if (listItemIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                  expect(listItem).to.have.property("descriptor").that.is.an("object");
                  expect(listItem).to.have.property("value").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string (OPTIONAL)`, function () {
                  expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                  expect(listItem.descriptor.code).to.be.equal(it.code);
                }));

                // messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].display' should be a boolean that is not empty (OPTIONAL)`, function () {
                //   expect(listItem.display).to.be.a('boolean');
                // }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty (OPTIONAL)`, function () {
                  expect(listItem.value).to.be.a('string').that.is.not.empty;
                }));
              }
            });
          }
        }
      });

    }

     return [testSuite, responseTestSuite];
  } catch (error) {
    console.log(error);
    return error;
  }
}

  // // message.order.payments
  // messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payments' which is an array", function () {
  //   expect(message.order.payments).to.exist.and.to.be.an("array");
  // }));

//   if (message?.order?.payments && message.order.payments.length > 0) {
//     message.order.payments.forEach((payment, paymentIndex) => {
//       messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}]' which is an object`, function () {
//         expect(payment).to.exist.and.to.be.an("object");
//       }));

//       messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].id' which is a string`, function () {
//         expect(payment.id).to.exist.and.to.be.a("string");
//       }));

//       paymentsBussinessTestsMobility(messageTestSuite, message, logs);

//       messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].collected_by' which is a string and is one of ["BAP", "BPP"]`, function () {
//         expect(payment.collected_by).to.exist.and.to.be.a("string").and.oneOf(["BAP", "BPP"]);
//       }));

//       if (payment?.collected_by === "BPP") {
//         messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params' which is a object`, function () {
//           expect(payment.params).to.exist.and.to.be.a("object");
//         }));

//         const settlementType = payment?.tags
//           ?.find((tag) => tag?.descriptor?.code === "SETTLEMENT_TERMS")
//           ?.list?.find(
//             (ls) => ls?.descriptor?.code === "SETTLEMENT_TYPE"
//           )?.value;
//         switch (settlementType) {
//           case "UPI":
//           case "upi":
//             messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params.virtual_payment_address' which is a string`, function () {
//               expect(payment.params.virtual_payment_address).to.exist.and.to.be.a("string");
//             }));
//             break;
//           case "NEFT":
//           case "neft":
//             messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params.bank_code' which is a string`, function () {
//               expect(payment.params.bank_code).to.exist.and.to.be.a("string");
//             }));

//             messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].params.bank_account_number' which is a string`, function () {
//               expect(payment.params.bank_account_number).to.exist.and.to.be.a("string");
//             }));
//             break;
//           default:
//             break;
//         }
//       }

//       messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].status' which is a string`, function () {
//         expect(payment.status).to.exist.and.to.be.a("string").and.to.be.oneOf(["NOT-PAID", "PAID"]);
//       }));

//       messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${paymentIndex}].type' which is a string`, function () {
//         expect(payment.type).to.exist.and.to.be.a("string");
//       }));
//       //     function () {
//       //       expect(payment.tags).to.exist.and.to.be.an("array");
//       //     }
//       //   )
//       // );

//       // const arr = [
//       //     { code: "BUYER_FINDER_FEES", name: "buyer finder fees" },
//       //     { code: "SETTLEMENT_TERMS", name: "settlement terms" }
//       // ];

//       // arr.forEach((ele) => {
//       //     const tagIndex = payment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
//       //     const tagItem = payment?.tags?.[tagIndex];

//       //     messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags' should have an object of ${ele.code}`, function () {
//       //         expect(tagItem).to.exist.and.to.be.an("object");
//       //     }));

//       //     if (tagIndex !== -1) {
//       //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
//       //             expect(tagItem).to.have.property("descriptor").that.is.an("object");
//       //             expect(tagItem).to.have.property("display").that.is.a("boolean");
//       //             expect(tagItem).to.have.property("list").that.is.an("array");
//       //         }));

//       //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
//       //             expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
//       //         }));

//       //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor.code' should be equal to '${ele.code}'`, function () {
//       //             expect(tagItem.descriptor.code).to.be.equal(ele.code);
//       //         }));

//       //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].display' should be a boolean`, function () {
//       //             expect(tagItem.display).to.be.a("boolean");
//       //         }));

//       //         messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list' should be a non-empty array`, function () {
//       //             expect(tagItem.list).to.be.an("array").that.is.not.empty;
//       //         }));

//       //         const buyerFinderFeeType = tagItem?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
//       //         const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_PERCENTAGE" }]
//       //         const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];
//       //         const settlementTermsArr = [{ code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "SETTLEMENT_TYPE" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "DELAY_INTEREST" }, { code: "STATIC_TERMS" }, { code: "SETTLEMENT_AMOUNT" }];

//       //         let array;
//       //         switch (tagItem?.descriptor?.code) {
//       //             case "BUYER_FINDER_FEES":
//       //                 switch (buyerFinderFeeType) {
//       //                     case "amount":
//       //                         array = buyerFinderFeeAmountArr;
//       //                         break;
//       //                     case "percent":
//       //                     case "percent-annualized":
//       //                         array = buyerFinderFeePercent;
//       //                         break;
//       //                     default:
//       //                         array = buyerFinderFeePercent;
//       //                         break;
//       //                 }
//       //                 break;
//       //             case "SETTLEMENT_TERMS":
//       //                 array = settlementTermsArr;
//       //                 break;
//       //             default:
//       //                 break;
//       //         }
//       //         if (array) {
//       //             array.forEach((it) => {
//       //                 const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor?.code === it.code);
//       //                 const listItem = tagItem?.list?.[listItemIndex];

//       //                 messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
//       //                     expect(listItem).to.exist.and.to.be.an("object");
//       //                 }));

//       //                 if (listItemIndex !== -1) {
//       //                     messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
//       //                         expect(listItem).to.have.property("descriptor").that.is.an("object");
//       //                         expect(listItem).to.have.property("value").that.is.a("string");
//       //                     }));

//       //                     messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
//       //                         expect(listItem.descriptor).to.have.property("code").that.is.a("string");
//       //                     }));

//       //                     messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
//       //                         expect(listItem.descriptor.code).to.be.equal(it.code);
//       //                     }));

//       //                     messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
//       //                         expect(listItem.value).to.be.a('string').that.is.not.empty;
//       //                     }));
//       //                 }
//       //             });
//       //         }
//       //     }
//       // });
//     });
//   }

//   settlementTermsListTests(messageTestSuite, { context, message }, logs);

//   // message.order.provider
//   messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider' which is an object", function () {
//     expect(message.order.provider).to.exist.and.to.be.an("object");
//   }));
//   messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider.id' which is a string", function () {
//     expect(message.order.provider.id).to.exist.and.to.be.a("string");
//   }));

//   providerIdTest(messageTestSuite, { context, message }, logs);

//   //message.order.tag
//   messageTestSuite.addTest(new Mocha.Test(`Verify the presence of'message.order' should have a property named 'tags' which is an array`, function () {
//     expect(message.order).to.have.property("tags").that.is.an("array");
//   }));

//   if (message?.order?.tags && message?.order?.tags.length > 0) {
//     message.order.tags.forEach((tag, tagIndex) => {
//       messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.order.tags[${tagIndex}]' should have properties 'display', 'descriptor', and 'list'`, function () {
//         expect(tag).to.have.property("display").that.is.a("boolean");
//         expect(tag).to.have.property("descriptor").that.is.an("object");
//         expect(tag).to.have.property("list").that.is.an("array");
//       }));

//       messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.order.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
//         expect(tag.descriptor).to.have.property("code").that.is.a("string");
//       }));
//       messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.order.tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
//         expect(tag.descriptor).to.have.property("name").that.is.a("string");
//       }));
//       messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.order.tags[${tagIndex}].list' should be a non-empty array`, function () {
//         expect(tag.list).to.be.an("array").that.is.not.empty;
//       }));

//       tag.list.forEach((listItem, listItemIndex) => {
//         messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].list[${listItemIndex}]' should have properties 'descriptor' and 'value'`, function () {
//           expect(listItem).to.have.property("descriptor").that.is.an("object");
//           expect(listItem).to.have.property("value").that.is.a("string");
//         }));
//         messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have a property named 'code' which is a string`, function () {
//           expect(listItem.descriptor).to.have.property("code").that.is.a("string");
//         }));
//         messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${listItem.descriptor.code}'`, function () {
//           expect(listItem.descriptor.code).to.equal(listItem.descriptor.code);
//         }));
//         messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
//           expect(listItem.value).to.be.a("string").that.is.not.empty;
//         }));
//       });
//     });
//   }

//   return [testSuite, responseTestSuite];
// };

