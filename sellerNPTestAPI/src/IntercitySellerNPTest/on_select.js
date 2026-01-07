const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_select({ context, message } = {}, step,logs = [],constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_select ${step} Request Verification`);
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        contextTests(context, "on_select", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));

        //message.order.items[]
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items' which is an array`, function () {
            expect(message.order.items).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message?.order?.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}]' which is an object`, function () {
                    expect(item).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].id' which is a string`, function () {
                    expect(item.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor' which is an object`, function () {
                    expect(item.descriptor).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.name' which is a string`, function () {
                    expect(item.descriptor.name).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.code' which is a string`, function () {
                    expect(item.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["SJT", "SFSJT", "RJT", "PASS", "RIDE", "SEAT", "NON_STOP", "CONNECT"]);
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price' should be an object`, function () {
                    expect(item.price).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.currency' should be a string`, function () {
                    expect(item.price.currency).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.value' should be a string`, function () {
                    expect(item.price.value).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity' which is an object`, function () {
                    expect(item.quantity).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected' which is an object`, function () {
                    expect(item.quantity.selected).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected.count' which is a number `, function () {
                    expect(item.quantity.selected.count).to.exist.and.to.be.a("number");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids' should be an array, that should not be empty (OPTIONAL)`, function () {
                    expect(item.category_ids).to.be.an('array').that.is.not.empty;
                }));

                if (item?.category_ids && item?.category_ids.length > 0) {
                    item.category_ids.forEach((categoryID, categoryIdIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIdIndex}]' should be string`, function () {
                            expect(categoryID).to.be.a("string");
                        }));

                    })
                }
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty `, function () {
                    expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                }));


                if (item?.fulfillment_ids && item.fulfillment_ids.length > 0) {
                    item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                        // Test to check if fulfillmentID is a string
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be a string`, function () {
                            expect(fulfillmentID).to.be.a("string");
                        }));

                        // Test to ensure each fulfillmentID in items is present in the fulfillments array
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be present in 'fulfillments' array`, function () {
                            const fulfillments = message?.order?.fulfillments?.map(fulfillment => fulfillment.id) || [];
                            expect(fulfillments).to.include(fulfillmentID);
                        }));
                    });
                }
            });
        }

        //message.order.provider
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.provider' which is an object", function () {
            expect(message.order.provider).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.provider.id' which is a string`, function () {
            expect(message.order.provider.id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.provider' should have a property named 'descriptor' which is an object`, function () {
            expect(message.order.provider.descriptor).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor' should have a property named 'name' which is a string`, function () {
            expect(message.order.provider.descriptor.name).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.descriptor.images' should be an array`, function () {
            expect(message.order.provider.descriptor.images).to.be.an('array');
        }));

        if (message?.order?.provider?.descriptor?.images && message?.order?.provider?.descriptor?.images.length > 0) {
            message.order.provider.descriptor.images.forEach((image, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}]' should be an object`, function () {
                    expect(image).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.descriptor.images[${i}].url ' should be a string `, function () {
                    expect(image.url).to.be.a('string');
                }));

            })
        }


        //message.order.fulfillments
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments' which is an array`, function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array");
        }));

        if (message?.order.fulfillments && message.order.fulfillments.length > 0) {
            message?.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                    expect(fulfillment).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                    expect(fulfillment.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                    expect(fulfillment.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["TRIP", "TICKET", "DELIVERY"]);
                }));


                if (fulfillment?.type === "TRIP") {

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                        expect(fulfillment.stops).to.exist.and.to.be.an("array");
                    }));

                    if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                        fulfillment.stops.forEach((stopItem, stopIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                                expect(stopItem).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.id).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                                expect(stopItem.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["START", "END", "INTERMEDIATE_STOP", "PICKUP", "DROP", "TRANSIT_STOP", "PICKUP"]);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location' which is an object`, function () {
                                expect(stopItem.location).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor' which is an object`, function () {
                                expect(stopItem.location.descriptor).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.name' which is a string`, function () {
                                expect(stopItem.location.descriptor.name).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.descriptor.code' which is a string `, function () {
                                expect(stopItem.location.descriptor.code).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].location.gps' which is a string `, function () {
                                expect(stopItem.location.gps).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
                                expect(stopItem.time).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.label' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.time.label).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.timestamp ' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
                            }));


                        })

                    }

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                        expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.category' which is a string `, function () {
                        expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.oneOf(["AIRLINE", "BUS", "CAB", "AUTO_RIKSHAW", "METRO"]);
                    }));

                }


                if (fulfillment?.type === "TICKET") {
                  if(fulfillment?.tags){

                      const arr = [{ code: "SEAT_GRID" }];
                      arr.forEach((ele) => {
                          const tagIndex = fulfillment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                          const tagItem = fulfillment?.tags[tagIndex];
                          messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                              expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                          }));
  
  
                          if (tagIndex !== -1) {
                              messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'descriptor' and 'list'`, function () {
                                  expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                  expect(tagItem).to.have.property("list").that.is.an("array");
                              }));
  
  
                              messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                  expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                              }));
  
  
                              messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                  expect(tagItem.descriptor.code).to.be.equal(ele.code);
                              }));
  
                              if (tagItem?.display) {
                                  messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].display' should  be a boolean`, function () {
                                      expect(tagItem.display).to.be.a("boolean");
                                  }));
  
                              }
  
                              messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                  expect(tagItem.list).to.be.an("array").that.is.not.empty;
                              }));
  
  
  
                              const seatGridSelect1Arr = [{ code: "X" }, { code: "Y" }, { code: "Z" }, { code: "X_SIZE" }, { code: "Y_SIZE" }, { code: "NUMBER" }, { code: "RESTRICTED_GENDER" }, { code: "SINGLE_SEAT" }, { code: "SEAT_PRICE" }, { code: "AVAILABLE" }, { code: "ITEM_ID" }];
  
                              const seatGridSelect2Arr = [{ code: "X" }, { code: "Y" }, { code: "Z" }, { code: "X_SIZE" }, { code: "Y_SIZE" }, { code: "NUMBER" }, { code: "RESTRICTED_GENDER" }, { code: "SINGLE_SEAT" }, { code: "SEAT_PRICE" }, { code: "SELECTED" }, { code: "SELECTED_SEAT" }, { code: "ITEM_ID" }];
                              let array;
                              switch (step) {
                                  case "I":
                                      array = seatGridSelect1Arr;
                                      break;
                                  case "II":
                                      array = seatGridSelect2Arr;
                                      break;
                                  default:
                                      break;
                              }
  
                              if (array) {
                                  array.forEach((it) => {
                                      const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                      const listItem = tagItem?.list[listItemIndex];
  
                                      messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                          expect(listItem).to.exist.and.to.be.an("object");
                                      }));
  
  
                                      if (listItemIndex !== -1) {
                                          messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                              expect(listItem).to.have.property("descriptor").that.is.an("object");
                                              expect(listItem).to.have.property("value").that.is.a("string");
                                          }));
  
  
                                          messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                              expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                          }));
  
  
                                          messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                              expect(listItem.descriptor.code).to.be.equal(it.code);
                                          }));
  
  
                                          messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                              expect(listItem.value).to.be.a('string').that.is.not.empty;
                                          }));
  
                                      }
                                  });
                              }
                          }
                      });

                  }
   
                }
            })
        }
        if (step === "II") {

            messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should be an object", function () {
                expect(message.order.quote).to.be.an('object');
            }));


            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price' should be an object", function () {
                expect(message.order.quote.price).to.be.an('object');
            }));


            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be a string (OPTIONAL)", function () {
                expect(message.order.quote.price.value).to.be.a('string');
            }));


            const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
                return total + parseFloat(item.price.value);
            }, 0);
            // Create a new test for the messageTestSuite
            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
                // Convert the actual price value to a fixed decimal format
                const actualPriceValue = parseFloat(message.order.quote.price.value).toFixed(2);

                // Assert that the actual price value is one of the expected values
                expect(actualPriceValue).to.be.oneOf([
                    totalBreakupPrice.toFixed(2),
                    Math.floor(totalBreakupPrice).toFixed(2),
                    Math.ceil(totalBreakupPrice).toFixed(2)
                ]);
            }));


            messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.currency' should be a string (OPTIONAL)", function () {
                expect(message.order.quote.price.currency).to.be.a('string');
            }));

            const arr = [
                { title: "BASE_FARE" },
                { title: "TAX" },
                { title: "CONVENIENCE_FEE" },
                { title: "SEAT_FARE" }
            ];

            arr.forEach((ele) => {
                const breakupIndex = message?.order?.quote?.breakup.findIndex((breakup) => breakup?.title === ele.title);
                const breakupItem = message?.order?.quote?.breakup[breakupIndex];
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup' should have an object of ${ele.title}`, function () {
                    expect(breakupItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                }));

                if (breakupIndex !== -1) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should be an object`, function () {
                        expect(breakupItem).to.be.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                        expect(breakupItem.title).to.be.equal(ele.title);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                        expect(breakupItem).to.have.property("price").that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string (OPTIONAL)`, function () {
                        expect(breakupItem.price).to.have.property("value").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string (OPTIONAL)`, function () {
                        expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                    }));

                }
            })

        }
         return [ testSuite,responseTestSuite];
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    on_select,
};