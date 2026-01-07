const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const response_verification = require("../centralizedUtilities/responseVerification");

async function on_search({ context, message } = {}, step, isSelfPickup = false, logs = [], constants = {}) {
  const testSuite = new Mocha.Suite(`on_search (${step}) Request Verification`);
  try {
    const responseTestSuite = response_verification({ context, message }, logs, constants);
    contextTests(context, "on_search", testSuite);
    const messageTestSuite = Mocha.Suite.create(
      testSuite,
      "Verification of Message"
    );

    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
      expect(message).to.exist;
    }));

    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog' which is an object", function () {
      expect(message.catalog).to.exist.and.to.be.an("object");
    }));

    //message.catalog.tag
    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of'message.catalog' should have a property named 'tags' which is an array`, function () {
      expect(message.catalog).to.have.property("tags").that.is.an("array");
    }));

    if (message?.catalog?.tags && message?.catalog?.tags.length > 0) {
      message.catalog.tags.forEach((tag, tagIndex) => {
        messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.catalog.tags[${tagIndex}]' should have properties 'display', 'descriptor', and 'list'`, function () {
          expect(tag).to.have.property("display").that.is.a("boolean");
          expect(tag).to.have.property("descriptor").that.is.an("object");
          expect(tag).to.have.property("list").that.is.an("array");
        }));

        messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.catalog.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
          expect(tag.descriptor).to.have.property("code").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.catalog.tags[${tagIndex}].list' should be a non-empty array`, function () {
          expect(tag.list).to.be.an("array").that.is.not.empty;
        }));

        tag.list.forEach((listItem, listItemIndex) => {
          messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.tags[${tagIndex}].list[${listItemIndex}]' should have properties 'descriptor' and 'value'`, function () {
            expect(listItem).to.have.property("descriptor").that.is.an("object");
            expect(listItem).to.have.property("value").that.is.a("string");
          }));

          messageTestSuite.addTest(new Mocha.Test(` Verify the presence of'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have a property named 'code' which is a string`, function () {
            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
          }));

          messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${listItem.descriptor.code}'`, function () {
            expect(listItem.descriptor.code).to.equal(listItem.descriptor.code);
          }));

          messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
            expect(listItem.value).to.be.a("string").that.is.not.empty;
          }));
        });
      });
    }

    //message.catalog.descriptor
    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog.descriptor' which is an object", function () {
      expect(message.catalog.descriptor).to.exist.and.to.be.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test("'message.catalog.descriptor' should have a property named 'name' which is a string", function () {
      expect(message.catalog.descriptor.name).to.be.a("string");
    }));
    if (message.catalog.descriptor.short_desc) {
      messageTestSuite.addTest(new Mocha.Test("'message.catalog.descriptor' should have a property named 'short_desc' which is a string", function () {
        expect(message.catalog.descriptor.short_desc).to.be.a("string");
      }));
    }

    if (message?.catalog?.descriptor?.images && message?.catalog?.descriptor?.images.length > 0) {
      message.catalog.descriptor.images.forEach((image, i) => {
        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.descriptor.images[${i}]' should be an object`,
          function () {
            expect(image).to.be.an("object");
          }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.descriptor.images[${i}].url' should be a string `,
          function () {
            expect(image.url).to.be.a("string");
          }));
      });
    }

    //message.catalog.provider
    messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.catalog.providers' which is an array", function () {
      expect(message.catalog.providers).to.exist.and.to.be.an("array");
    }));

    if (message?.catalog?.providers && message?.catalog?.providers.length > 0) {
      message?.catalog?.providers.forEach((provider, providerIndex) => {
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}]' which is an object`, function () {
          expect(provider).to.exist.and.to.be.an("object");
        }));


        // message.catalog.providers.items
        if (provider.items) {
          messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items' should be an array`, function () {
            expect(provider.items).to.be.an('array');
          }));

          if (provider?.items && provider?.items.length > 0) {
            provider.items.forEach((item, itemIndex) => {
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}]' which is an object`, function () {
                expect(item).to.exist.and.to.be.an("object");
              }));

              messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}]' should have a property named 'descriptor' which is an object`, function () {
                expect(item.descriptor).to.be.an("object");
              }));

              messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].descriptor' should have a property named 'name' which is a string (OPTIONAL)`, function () {
                expect(item.descriptor.name).to.be.a("string");
              }));


              messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].descriptor' should have a property named 'code' which is a string (OPTIONAL)`, function () {
                expect(item.descriptor.code).to.be.a("string").and.to.be.oneOf(["ABSTRACT", "ENTRY_PASS", "ADD_ON"]);
              }));
              if (item.descriptor.code !== "ADD_ON") {
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}]' should have a property named 'fulfillment_ids' which is an array`, function () {
                  expect(item.fulfillment_ids).to.be.an("array");
                }));

                if (item?.fulfillment_ids && item.fulfillment_ids.length > 0) {
                  item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].fulfillment_ids[${fulfillmentIdIndex}]' should be a string`, function () {
                      expect(fulfillmentID).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].fulfillment_ids' should include fulfillment ID '${fulfillmentID}'`, function () {
                      expect(item.fulfillment_ids).to.include(fulfillmentID);
                    }));
                  });
                }
              }
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].id' which is a string`, function () {
                expect(item.id).to.exist.and.to.be.a("string");
              }));


              messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}]' should have a property named 'location_ids' which is an array (OPTIONAL)`, function () {
                expect(item.location_ids).to.be.an("array");
              }));
              if (item?.add_ons) {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons' which is an array`, function () {
                  expect(item.add_ons).to.exist.and.to.be.an("array");
                }));
                if (item.add_ons && item.add_ons.length > 0) {
                  item.add_ons.forEach((addOn, addOnIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons[${addOnIndex}]' which is an object`, function () {
                      expect(addOn).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons[${addOnIndex}].id' which is a string`, function () {
                      expect(addOn.id).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons[${addOnIndex}].descriptor' which is an object`, function () {
                      expect(addOn.descriptor).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons[${addOnIndex}].descriptor.name' which is a string`, function () {
                      expect(addOn.descriptor.name).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons[${addOnIndex}].quantity' which is an object`, function () {
                      expect(addOn.quantity).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons[${addOnIndex}].quantity.available' which is an object`, function () {
                      expect(addOn.quantity.available).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons[${addOnIndex}].quantity.available.count' which is a number`, function () {
                      expect(addOn.quantity.available.count).to.exist.and.to.be.a("number");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons[${addOnIndex}].price' which is an object`, function () {
                      expect(addOn.price).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons[${addOnIndex}].price.value' which is a string`, function () {
                      expect(addOn.price.value).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].add_ons[${addOnIndex}].price.currency' which is a string`, function () {
                      expect(addOn.price.currency).to.exist.and.to.be.a("string");
                    }));
                  });
                }
              };

              if (item?.location_ids && item?.location_ids.length > 0) {
                item.location_ids.forEach((locationId, locationIdIndex) => {
                  messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].location_ids[${locationIdIndex}]'should be a string (OPTIONAL)`, function () {
                    expect(locationId).to.be.a("string");
                  }));
                })
              }
              if (item.descriptor.code === "ENTRY_PASS") {
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}]' should have a property named 'price' which is an object`, function () {
                  expect(item.price).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].price' should have a property named 'currency' which is a string (OPTIONAL)`, function () {
                  expect(item.price.currency).to.be.a("string");
                }))

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].items[${itemIndex}].price' should have a property named 'value' which is a string (OPTIONAL)`, function () {
                  expect(item.price.value).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].quantity' which is an object`, function () {
                  expect(item.quantity).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].quantity.maximum' which is an object`, function () {
                  expect(item.quantity.maximum).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].quantity.maximum.count' which is a number`, function () {
                  expect(item.quantity.maximum.count).to.exist.and.to.be.a("number");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].quantity.minimum' which is an object`, function () {
                  expect(item.quantity.minimum).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].items[${itemIndex}].quantity.minimum.count' which is a number`, function () {
                  expect(item.quantity.minimum.count).to.exist.and.to.be.a("number");
                }));
              }
            })
          }
        }

        //message.catalog.providers.fulfillments
        if (provider.fulfillments) {
          messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments' which is an array`, function () {
            expect(provider.fulfillments).to.exist.and.to.be.an("array");
          }));

          if (provider?.fulfillments && provider?.fulfillments.length > 0) {
            provider.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                expect(fulfillment).to.exist.and.to.be.an("object");
              }));

              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                expect(fulfillment.id).to.exist.and.to.be.a("string");
              }));

              const fulfillmentType = isSelfPickup ? "SELF_PICKUP" : "VISIT";
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].type' which is a string and equal to "${fulfillmentType}"`, function () {
                expect(fulfillment.type).to.be.a("string").and.to.equal(fulfillmentType);
              }));

              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                expect(fulfillment.stops).to.exist.and.to.be.an("array");
              }));

              if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                fulfillment.stops.forEach((stopItem, stopIndex) => {
                  messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                    expect(stopItem).to.exist.and.to.be.an("object");
                  }));

                  messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string`, function () {
                    expect(stopItem.type).to.be.a("string").and.to.be.oneOf(["START", "END", "TRANSIT_STOP", "INTERMEDIATE_STOP"]);
                  }));

                  messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions' which is an object`, function () {
                    expect(stopItem.instructions).to.exist.and.to.be.an("object");
                  }));
                  messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions.additional_desc' which is an object `, function () {
                    expect(stopItem.instructions.additional_desc).to.exist.and.to.be.an("object");
                  }));
                  messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions.additional_desc.url' which is a string `, function () {
                    expect(stopItem.instructions.additional_desc.url).to.exist.and.to.be.a("string");
                  }));
                  messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions.additional_desc.content_type' which is a string `, function () {
                    expect(stopItem.instructions.additional_desc.content_type).to.exist.and.to.be.a("string");
                  }));
                  //  messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object `, function () {
                  //   expect(stopItem.time).to.exist.and.to.be.an("object");
                  // }));
                  //  messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.timestamp' which is a string `, function () {
                  //   expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
                  // }));

                })
              }
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
              }));

              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].vehicle.category' which is a string `, function () {
                expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.oneOf(["SITE", "TWO_WHEELER", "AUTO_RICKSHAW", "CAB"]);
              }));

              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].agent' which is an object`, function () {
                expect(fulfillment.agent).to.exist.and.to.be.an("object");
              }));
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].agent.organization' which is an object`, function () {
                expect(fulfillment.agent.organization).to.exist.and.to.be.an("object");
              }));
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].agent.organization.contact' which is an object`, function () {
                expect(fulfillment.agent.organization.contact).to.exist.and.to.be.an("object");
              }));
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].agent.organization.contact.phone' which is a string`, function () {
                expect(fulfillment.agent.organization.contact.phone).to.exist.and.to.be.a("string");
              }));
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].fulfillments[${fulfillmentIndex}].agent.organization.contact.email' which is a string`, function () {
                expect(fulfillment.agent.organization.contact.email).to.exist.and.to.be.a("string");
              }));
            })
          }
        }

        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].id' which is a string`, function () {
          expect(provider.id).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}]' should have a property named 'descriptor' which is an object`, function () {
          expect(provider.descriptor).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor' should have a property named 'name' which is a string `, function () {
          expect(provider.descriptor.name).to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor' should have a property named 'short_desc' which is a string `, function () {
          expect(provider.descriptor.short_desc).to.be.a("string");
        }));

        if (provider?.descriptor?.long_desc) {
          messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor' should have a property named 'long_desc' which is a string `, function () {
            expect(provider.descriptor.long_desc).to.be.a("string");
          }));
        }

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images' should be an array`, function () {
          expect(provider.descriptor.images).to.be.an('array');
        }));

        if (provider?.descriptor?.images && provider?.descriptor?.images.length > 0) {
          provider.descriptor.images.forEach((image, i) => {
            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images[${i}]' should be an object`, function () {
              expect(image).to.be.an('object');
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].descriptor.images[${i}].url ' should be a string (OPTIONAL)`, function () {
              expect(image.url).to.be.a('string');
            }));

          })

        }
        //message.catalog.provider.categories[]
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories' which is an array`, function () {
          expect(provider.categories).to.exist.and.to.be.an("array");
        }));

        if (provider?.categories && provider?.categories.length > 0) {
          provider.categories.forEach((category, categoryIndex) => {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}]' which is an object`, function () {
              expect(category).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].id' which is a string (OPTIONAL)`, function () {
              expect(category.id).to.exist.and.to.be.a("string");
            }));
            if (category.parent_category_id) {
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].parent_category_id' which is a string (OPTIONAL)`, function () {
                expect(category.parent_category_id).to.exist.and.to.be.a("string");
              }));
            }

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor' which is an object`, function () {
              expect(category.descriptor).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor.name' which is a string (OPTIONAL)`, function () {
              expect(category.descriptor.name).to.exist.and.to.be.a("string");
            }));

            if (category.descriptor.code) {
              messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].categories[${categoryIndex}].descriptor.code' which is a string (OPTIONAL)`, function () {
                expect(category.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["CULTURE_HERITAGE", "ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST_CLASS", "PASS", "TICKET", "SEATER", "SEMI_SLEEPER", "SLEEPER"]);
              }));
            }

          })
        }


        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}]' should have a property named 'time' which is an object`, function () {
          expect(provider.time).to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].time' should have a property named 'range' which is an object`, function () {
          expect(provider.time.range).to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].time.range' should have a property named 'start' which is a string `, function () {
          expect(provider.time.range.start).to.be.a("string");
        }));
        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].time.range' should have a property named 'end' which is a string`, function () {
          expect(provider.time.range.end).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].locations' should be an array (OPTIONAL)`, function () {
          expect(provider.locations).to.be.an('array');
        }));

        if (provider?.locations && provider?.locations.length > 0) {
          provider.locations.forEach((locationItem, locationIndex) => {
            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].location[${locationIndex}]' should be an object (OPTIONAL)`, function () {
              expect(locationItem).to.be.an('object');
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].location[${locationIndex}].id' should be a string (OPTIONAL)`, function () {
              expect(locationItem.id).to.be.a('string');
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${providerIndex}].location[${locationIndex}].gps' should be a string and valid coordinates (OPTIONAL)`, function () {
              const gpsValue = locationItem.gps;

              const gpsPattern = /^-?\d{1,3}\.\d{6}, ?-?\d{1,3}\.\d{6}$/;
              expect(gpsValue).to.exist.and.to.be.a("string");
              expect(gpsValue).to.match(gpsPattern, "GPS value must be valid coordinates in the format 'lat, long'");
            }));

          })
        }

        //message.catalog.providers.payments
        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].payments' which is an array`, function () {
          expect(provider.payments).to.exist.and.to.be.an("array");
        }));

        if (provider?.payments && provider?.payments.length > 0) {
          provider?.payments.forEach((payment, z) => {
            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.providers[${providerIndex}].payments[${z}]' which is an object`, function () {
              expect(payment).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'Verify the presence of 'message.catalog.providers[${providerIndex}].payments[${z}].collected_by' which is a string`, function () {
              expect(payment.collected_by).to.be.a("string");
            }));


          });
        }
      });


    }
    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.catalog.tags' which is an array`, function () {
      expect(message?.catalog?.tags).to.exist.and.to.be.an("array");
    }));

    if (message?.catalog?.tags) {
      const arr = [
        { code: "BAP_TERMS" },
        { code: "BPP_TERMS" },
        { code: "PAGINATION" }
      ];
      arr.forEach((ele) => {
        const tagIndex = message?.catalog?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
        const tagItem = message?.catalog?.tags[tagIndex];
        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags' should have an object of ${ele.code}`, function () {
          expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
        }));

        if (tagIndex !== -1) {
          messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
            expect(tagItem).to.have.property("descriptor").that.is.an("object");
            expect(tagItem).to.have.property("display").that.is.a("boolean");
            expect(tagItem).to.have.property("list").that.is.an("array");
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}' `, function () {
            expect(tagItem.descriptor.code).to.be.equal(ele.code);
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].display' should  be a boolean`, function () {
            expect(tagItem.display).to.be.a("boolean");
          }));

          messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list' should have be a non empty array`, function () {
            expect(tagItem.list).to.be.an("array").that.is.not.empty;
          }));

          const buyerFinderFeeType = tagItem?.list.find(
            (listItem) =>
              listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE"
          )?.value;
          const buyerFinderFeePercent = [
            { code: "BUYER_FINDER_FEES_PERCENTAGE" },
          ];
          const bapTermsArr = [

            {

              code: "BUYER_FINDER_FEES_TYPE",

            },

            {

              code: "BUYER_FINDER_FEES_PERCENTAGE",

            },

            { code: "STATIC_TERMS" },

            { code: "SETTLEMENT_BASIS" },

            { code: "SETTLEMENT_WINDOW" }

          ];



          const bppTermsArr = [

            {

              code: "BUYER_FINDER_FEES_TYPE",

            },

            {

              code: "BUYER_FINDER_FEES_PERCENTAGE",

            },

            { code: "STATIC_TERMS" },

            { code: "MANDATORY_ARBITRATION" },

            { code: "COURT_JURISDICTION" },

            { code: "DELAY_INTEREST" }

          ];

          const paginationArr = [

            {

              code: "PAGINATION_ID",

            },

            {

              code: "MAX_PAGE_NUMBER",

            }]

          let array;
          switch (tagItem?.descriptor?.code) {
            case "BAP_TERMS":
            array = bapTermsArr;  
              break;
            case "BPP_TERMS":
              array = bppTermsArr;
              break;
            case "PAGINATION":
              array = paginationArr;
              break;
            default:
              break;
          }

          if (array) {
            array.forEach((it) => {
              const listItemIndex = tagItem.list.findIndex(
                (listItem) => listItem?.descriptor.code === it.code
              );
              const listItem = tagItem?.list[listItemIndex];

              messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                expect(listItem).to.exist.and.to.be.an("object");
              }));

              if (listItemIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                  expect(listItem).to.have.property("descriptor").that.is.an("object");
                  expect(listItem).to.have.property("value").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                  expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                  expect(listItem.descriptor.code).to.be.equal(it.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                  expect(listItem.value).to.be.a("string").that.is.not.empty;
                }));
              }
            });
          }
        }
      });
    }

    return [testSuite, responseTestSuite];
  } catch (error) {
    // testSuite.addTest(
    //   new Mocha.Test("on_search request failed to be verified because of some missing payload or some internal error", function () {
    //     expect(true).to.equal(false);
    //   }
    //   )
    // );
    console.log(error);
    return testSuite;
  }
}
module.exports = {
  on_search,
};
