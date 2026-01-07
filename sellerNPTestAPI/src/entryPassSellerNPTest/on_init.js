const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");

const response_verification = require("../centralizedUtilities/responseVerification");

async function on_init({ context, message } = {}, isSelfPickup = false, logs = [], constants = {}) {

    try {
        const testSuite = new Mocha.Suite(`on_init Request Verification`);
        const responseTestSuite = response_verification({ context, message }, logs, constants);
        contextTests(context, "on_init", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));

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
        // message.order.provider
        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
            expect(message.order.provider).to.exist.and.to.be.an("object");
        }));

        if (message?.order?.provider) {
            const provider = message.order.provider;

            messageTestSuite.addTest(new Mocha.Test("Verify message.order.provider.id exists and is string", function () {
                expect(provider.id).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify message.order.provider.descriptor is an object", function () {
                expect(provider.descriptor).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test("Verify message.order.provider.descriptor.name exists", function () {
                expect(provider.descriptor.name).to.exist.and.to.be.a("string");
            }));
            if (provider.descriptor.short_desc) {
                messageTestSuite.addTest(new Mocha.Test("Verify message.order.provider.descriptor.short_desc exists", function () {
                    expect(provider.descriptor.short_desc).to.exist.and.to.be.a("string");
                }));
            }
            // provider.descriptor.images
            if (provider.descriptor?.images && provider.descriptor.images.length > 0) {
                provider.descriptor.images.forEach((img, idx) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.descriptor.images[${idx}].url exists and is string`, function () {
                        expect(img.url).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.descriptor.images[${idx}].size_type exists and is string`, function () {
                        expect(img.size_type).to.exist.and.to.be.a("string");
                    }));
                });
            }

            // provider.locations
            messageTestSuite.addTest(new Mocha.Test("Verify message.order.provider.locations is an array", function () {
                expect(provider.locations).to.exist.and.to.be.an("array");
            }));

            if (provider.locations && provider.locations.length > 0) {
                provider.locations.forEach((loc, locIdx) => {
                    messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.locations[${locIdx}].id exists and is string`, function () {
                        expect(loc.id).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.locations[${locIdx}].gps exists and matches lat,long`, function () {
                        expect(loc.gps).to.match(/^-?\d{1,3}\.\d{1,7}, ?-?\d{1,3}\.\d{1,7}$/);
                    }));

                    // descriptor inside locations
                    messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.locations[${locIdx}].descriptor is object`, function () {
                        expect(loc.descriptor).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.locations[${locIdx}].descriptor.name exists`, function () {
                        expect(loc.descriptor.name).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.locations[${locIdx}].descriptor.short_desc exists`, function () {
                        expect(loc.descriptor.short_desc).to.exist.and.to.be.a("string");
                    }));

                    // additional_desc
                    if (loc.descriptor?.additional_desc) {
                        messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.locations[${locIdx}].descriptor.additional_desc.url exists`, function () {
                            expect(loc.descriptor.additional_desc.url).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.locations[${locIdx}].descriptor.additional_desc.content_type exists`, function () {
                            expect(loc.descriptor.additional_desc.content_type).to.exist.and.to.be.a("string");
                        }));
                    }

                    // images under location descriptor
                    if (loc.descriptor?.images && loc.descriptor.images.length > 0) {
                        loc.descriptor.images.forEach((img, imgIdx) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.locations[${locIdx}].descriptor.images[${imgIdx}].url exists`, function () {
                                expect(img.url).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.locations[${locIdx}].descriptor.images[${imgIdx}].size_type exists`, function () {
                                expect(img.size_type).to.exist.and.to.be.a("string");
                            }));
                        });
                    }

                    // rating
                    messageTestSuite.addTest(new Mocha.Test(`Verify message.order.provider.locations[${locIdx}].rating exists`, function () {
                        expect(loc.rating).to.exist.and.to.be.a("string");
                    }));
                });
            }
        }

        // message.order.billing
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.billing' which is an object", function () {
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

        //message.order.cancellation_terms
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.cancellation_terms' and that should be an array", function () {
            expect(message.order.cancellation_terms).to.exist.that.is.an("array");
        }));

        if (message?.order?.cancellation_terms && message?.order?.cancellation_terms.length > 0) {
            message.order.cancellation_terms.forEach((C_terms, C_termsIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}]' and that should be an object`, function () {
                    expect(C_terms).to.exist.that.is.an("object");
                }));
                if (C_terms.fulfillment_state) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].fulfillment_state' and that should be an object`, function () {
                        expect(C_terms.fulfillment_state).to.exist.that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].fulfillment_state.descriptor' and that should be an object`, function () {
                        expect(C_terms.fulfillment_state.descriptor).to.exist.that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].fulfillment_state.descriptor.code' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.fulfillment_state.descriptor.code).to.exist.that.is.a("string").and.to.be.oneOf(["CONFIRMED", "DRIVER_EN_ROUTE_TO_PICKUP", "RIDE_CONFIRMED", "RIDE_CANCELLED", "PAYMENT_COLLECTED", "RIDE_ENDED", "DRIVER_AT_PICKUP", "RIDE_STARTED", "RIDE_UPDATED", "RIDE_ASSIGNED", "RIDE_ENROUTE_PICKUP", "RIDE_ARRIVED_PICKUP"]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee' and that should be an object`, function () {
                        expect(C_terms.cancellation_fee).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].fulfillment_state.descriptor.code' and that should be a string (OPTIONAL)`, function () {
                        expect(C_terms.fulfillment_state.descriptor.code).to.exist.that.is.a("string").and.to.be.oneOf(["CONFIRMED", "DRIVER_EN_ROUTE_TO_PICKUP", "RIDE_CONFIRMED", "RIDE_CANCELLED", "PAYMENT_COLLECTED", "RIDE_ENDED", "DRIVER_AT_PICKUP", "RIDE_STARTED", "RIDE_UPDATED", "RIDE_ASSIGNED", "RIDE_ENROUTE_PICKUP", "RIDE_ARRIVED_PICKUP"]);
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancel_by' and that should be an object`, function () {
                        expect(C_terms.cancel_by).to.exist.that.is.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancel_by.label' and that should be a string`, function () {
                        expect(C_terms.cancel_by.label).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancel_by.duration' and that should be a string`, function () {
                        expect(C_terms.cancel_by.duration).to.exist.that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee' and that should be an object`, function () {
                        expect(C_terms.cancellation_fee).to.exist.that.is.an("object");
                    }));
                }
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of'message.order.cancellation_terms[${C_termsIndex}].cancellation_eligible' should  be a boolean`, function () {
                    expect(C_terms.cancellation_eligible).to.be.a("boolean");
                }));
                if (C_terms.external_ref) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref' and that should be an object`, function () {
                        expect(C_terms.external_ref).to.exist.that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.mimetype' and that should be a string`, function () {
                        expect(C_terms.external_ref.mimetype).to.exist.that.is.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].external_ref.url' and that should be a string`, function () {
                        expect(C_terms.external_ref.url).to.exist.that.is.a("string");
                    }));
                }


                if (C_terms?.cancellation_fee?.amount) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.amount' and that it is an object`, function () {
                        expect(C_terms.cancellation_fee.amount).to.exist.and.to.be.an("object");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.amount.currency' and that it is a string (OPTIONAL)`, function () {
                        expect(C_terms.cancellation_fee.amount.currency).to.exist.and.to.be.a("string");
                    }));


                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.amount.value' and that it is a string (OPTIONAL)`, function () {
                        expect(C_terms.cancellation_fee.amount.value).to.exist.and.to.be.a("string");
                    }));
                } else {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.cancellation_terms[${C_termsIndex}].cancellation_fee.percentage' and that it is a string (OPTIONAL)`, function () {
                        expect(C_terms.cancellation_fee.percentage).to.exist.and.to.be.a("string");
                    }));

                }
            })
        }

        //message.order.replacement_terms
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.replacement_terms' and that should be an array", function () {
            expect(message.order.replacement_terms).to.exist.that.is.an("array");
        }));

        if (message?.order?.replacement_terms && message?.order?.replacement_terms.length > 0) {
            message.order.replacement_terms.forEach((R_terms, R_termsIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.replacement_terms[${R_termsIndex}]' and that should be an object`, function () {
                    expect(R_terms).to.exist.that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.replacement_terms[${R_termsIndex}].external_ref' and that should be an object`, function () {
                    expect(R_terms.external_ref).to.exist.that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.replacement_terms[${R_termsIndex}].external_ref.mimetype' and that should be a string`, function () {
                    expect(R_terms.external_ref.mimetype).to.exist.that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.replacement_terms[${R_termsIndex}].external_ref.url' and that should be a string`, function () {
                    expect(R_terms.external_ref.url).to.exist.that.is.a("string");
                }));

            })
        }

        //message.order.quote
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote' which is an object", function () {
            expect(message.order.quote).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price' which is an object", function () {
            expect(message.order.quote.price).to.exist.and.to.be.an("object");
        }));

        const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
            return total + parseFloat(item.price.value);
        }, 0);

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
            const quotePriceValue = parseFloat(message.order.quote.price.value).toFixed(2);
            expect(quotePriceValue).to.be.oneOf([
                totalBreakupPrice.toFixed(2),
                Math.floor(totalBreakupPrice).toFixed(2),
                Math.ceil(totalBreakupPrice).toFixed(2)
            ]);
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price.value' which is a string", function () {
            expect(message.order.quote.price.value).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.quote.price.currency' which is a string", function () {
            expect(message.order.quote.price.currency).to.exist.and.to.be.a("string");
        }));

        const arr = [
            { title: "BASE_FARE" },
            { title: "TAX" },
            { title: "ADD_ONS" }
        ];

        arr.forEach((ele) => {
            const breakupIndex = message?.order?.quote?.breakup.findIndex((breakup) => breakup?.title === ele.title);
            const breakupItem = message?.order?.quote?.breakup[breakupIndex];
            if (ele?.title === "ADD_ONS") {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup' should have an object of ${ele.title} (OPTIONAL)`, function () {
                    expect(breakupItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                }));
            } else {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup' should have an object of ${ele.title}`, function () {
                    expect(breakupItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                }));
            }


            if (breakupIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should have properties named 'price', 'title'`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                    expect(breakupItem.price).to.have.property("value").that.is.a("string");
                    expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                    expect(breakupItem).to.have.property("title").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string`, function () {
                    expect(breakupItem.price).to.have.property("value").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should be a positive value`, function () {
                    expect(Number(breakupItem.price.value)).to.be.greaterThanOrEqual(0);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string`, function () {
                    expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));
            }
        })


        // messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.id' which is a string `, function () {
        //     expect(message.order.id).to.exist.and.to.be.a("string");
        // }));

        //message.order.items
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.items' which is an array", function () {
            expect(message.order.items).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, i) => {
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

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.code' which is a string `, function () {
                    expect(item.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["ABSTRACT", "ENTRY_PASS", "ADD_ON"]);
                }));

                //.descriptor.images
                if (item.descriptor?.images && item.descriptor.images.length > 0) {
                    item.descriptor.images.forEach((img, idx) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.images[${idx}].url exists and is string`, function () {
                            expect(img.url).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.images[${idx}].size_type exists and is string`, function () {
                            expect(img.size_type).to.exist.and.to.be.a("string");
                        }));
                    });
                }

                if (item.descriptor.code === "ENTRY_PASS") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price' which is an object`, function () {
                        expect(item.price).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price.currency' which is a string`, function () {
                        expect(item.price.currency).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].price.value' which is a string`, function () {
                        expect(item.price.value).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity' which is an object`, function () {
                        expect(item.quantity).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected' which is an object`, function () {
                        expect(item.quantity.selected).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected.count' which is a number`, function () {
                        expect(item.quantity.selected.count).to.exist.and.to.be.a("number");
                    }));
                }
                if (item.descriptor.code !== "ADD_ON") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].time' which is an object`, function () {
                        expect(item.time).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].time.label' which is a string`, function () {
                        expect(item.time.label).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].time.duration' which is a string`, function () {
                        expect(item.time.duration).to.exist.and.to.be.a("string");
                    }));
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should have a property named 'location_ids' which is an array (OPTIONAL)`, function () {
                    expect(item.location_ids).to.be.an("array");
                }));

                if (item?.location_ids && item?.location_ids.length > 0) {
                    item.location_ids.forEach((locationId, locationIdIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].location_ids[${locationIdIndex}]'should be a string (OPTIONAL)`, function () {
                            expect(locationId).to.be.a("string");
                        }));

                    })
                }

                // items.tags

                const itemTagConfigs = {

                    ENTRY_PASS: [{ code: "FARE_POLICY" }],
                    ABSTRACT: [{ code: "INCLUSIONS" }, { code: "EXCLUSIONS" }],

                };

                const descriptorCode = item?.descriptor?.code;
                const expectedTags = itemTagConfigs[descriptorCode] || [];

                expectedTags.forEach((ele) => {
                    const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                    const tagItem = item?.tags[tagIndex];

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    }));

                    if (tagIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should have properties named 'descriptor' and 'list'`, function () {
                            expect(tagItem).to.have.property("descriptor").that.is.an("object");
                            expect(tagItem).to.have.property("list").that.is.an("array");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.code' should be equal to '${ele.code}'`, function () {
                            expect(tagItem.descriptor.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));

                        const farePolicyArr = [
                            { code: "MIN_AGE" },
                            { code: "MAX_AGE" },
                            { code: "GENDER" },
                            { code: "NATIONALITY" },
                            { code: "ADDITIONAL_DETAILS_REQUIRED" }
                        ];

                        if (ele.code === "FARE_POLICY") {
                            farePolicyArr.forEach((it) => {
                                const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor?.code === it.code);
                                const listItem = tagItem?.list[listItemIndex];

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                    expect(listItem).to.exist.and.to.be.an("object");
                                }));

                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a non-empty string (OPTIONAL)`, function () {
                                        expect(listItem.value).to.be.a("string").and.not.empty;
                                    }));
                                }
                            });
                        }

                        if (ele.code === "INCLUSIONS" || ele.code === "EXCLUSIONS") {
                            tagItem.list.forEach((listItem, listItemIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a non-empty string`, function () {
                                    expect(listItem).to.have.property("value").that.is.a("string").and.not.empty;
                                }));
                            });
                        }
                    }
                });

                if (item.fulfillment_ids) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                        expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                    }));
                    if (item?.fulfillment_ids && item.fulfillment_ids.length > 0) {
                        item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                            // Test to check if fulfillmentID is a string
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be a string`, function () {
                                expect(fulfillmentID).to.be.a("string");
                            }));

                            // Test to ensure each fulfillmentID in items is present in the fulfillments array
                            // messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be present in 'fulfillments' array`, function () {
                            //     const fulfillments = message?.order?.fulfillments?.map(fulfillment => fulfillment.id) || [];
                            //     expect(fulfillments).to.include(fulfillmentID);
                            // }));
                        });
                    }
                }


                if (item.descriptor.code !== "ADD_ON") {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids' should be an array, that should not be empty`, function () {
                        expect(item.category_ids).to.be.an('array').that.is.not.empty;
                    }));
                    if (item?.category_ids && item.category_ids.length > 0) {
                        item.category_ids.forEach((categoryID, categoryIdIndex) => {
                            // Test to check if fulfillmentID is a string
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIdIndex}]' should be a string`, function () {
                                expect(categoryID).to.be.a("string");
                            }));

                            // Test to ensure each fulfillmentID in items is present in the fulfillments array
                            // messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].category_ids[${categoryIdIndex}]' should be present in 'categorys' array`, function () {
                            //     const categorys = message?.order?.categorys?.map(category => category.id) || [];
                            //     expect(categorys).to.include(categoryID);
                            // }));
                        });
                    }
                }
                if (item?.add_ons) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons' which is an array`, function () {
                        expect(item.add_ons).to.exist.and.to.be.an("array");
                    }));
                    if (item.add_ons && item.add_ons.length > 0) {
                        item.add_ons.forEach((addOn, addOnIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons[${addOnIndex}]' which is an object`, function () {
                                expect(addOn).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons[${addOnIndex}].id' which is a string`, function () {
                                expect(addOn.id).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons[${addOnIndex}].descriptor' which is an object`, function () {
                                expect(addOn.descriptor).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons[${addOnIndex}].descriptor.name' which is a string`, function () {
                                expect(addOn.descriptor.name).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons[${addOnIndex}].quantity' which is an object`, function () {
                                expect(addOn.quantity).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons[${addOnIndex}].quantity.selected' which is an object`, function () {
                                expect(addOn.quantity.selected).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons[${addOnIndex}].quantity.selected.count' which is a number`, function () {
                                expect(addOn.quantity.selected.count).to.exist.and.to.be.a("number");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons[${addOnIndex}].price' which is an object`, function () {
                                expect(addOn.price).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons[${addOnIndex}].price.value' which is a string`, function () {
                                expect(addOn.price.value).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].add_ons[${addOnIndex}].price.currency' which is a string`, function () {
                                expect(addOn.price.currency).to.exist.and.to.be.a("string");
                            }));
                        });
                    }
                }
            })
        }


        //message.order.fulfillments
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.fulfillments' which is an array", function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                    expect(fulfillment).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string (OPTIONAL)`, function () {
                    expect(fulfillment.id).to.exist.and.to.be.a("string");
                }));

                const fulfillmentType = isSelfPickup ? "SELF_PICKUP" : "VISIT";
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string and equal to "${fulfillmentType}"`, function () {
                    expect(fulfillment.type).to.be.a("string").and.to.equal(fulfillmentType);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                    expect(fulfillment.stops).to.exist.and.to.be.an("array");
                }));

                if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                    fulfillment.stops.forEach((stopItem, stopIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                            expect(stopItem).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions' which is an object`, function () {
                            expect(stopItem.instructions).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions.additional_desc' which is an object`, function () {
                            expect(stopItem.instructions.additional_desc).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions.additional_desc.url' which is a string `, function () {
                            expect(stopItem.instructions.additional_desc.url).to.exist.and.to.be.a("string");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].instructions.additional_desc.content_type' which is a string (OPTIONAL)`, function () {
                            expect(stopItem.instructions.additional_desc.content_type).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].type' which is a string (OPTIONAL)`, function () {
                            expect(stopItem.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["START", "END", "INTERMEDIATE_STOP", "TRANSIT_STOP"]);
                        }));

                        if (stopItem?.id) {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].id' which is a string`, function () {
                                expect(stopItem.id).to.exist.and.to.be.a("string");
                            }));

                        }
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
                            expect(stopItem.time).to.exist.and.to.be.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.timestamp' which is an object`, function () {
                            expect(stopItem.time.timestamp).to.exist.and.to.be.a("string");
                        }));

                    })
                }
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].' which is an object`, function () {
                    expect(fulfillment.agent).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent' which is an object`, function () {
                    expect(fulfillment.agent).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.organization' which is an object`, function () {
                    expect(fulfillment.agent.organization).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.organization.contact' which is an object`, function () {
                    expect(fulfillment.agent.organization.contact).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.organization.contact.phone' which is a string`, function () {
                    expect(fulfillment.agent.organization.contact.phone).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.organization.contact.email' which is a string`, function () {
                    expect(fulfillment.agent.organization.contact.email).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle' which is an object`, function () {
                    expect(fulfillment.vehicle).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].vehicle.category' which is a string `, function () {
                    expect(fulfillment.vehicle.category).to.exist.and.to.be.a("string").and.to.be.oneOf(["SITE", "TWO_WHEELER", "AUTO_RICKSHAW", "CAB"]);
                }));

            })

        }

        //message.order.payments
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.payments' which is an array", function () {
            expect(message.order.payments).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.payments && message?.order?.payments.length > 0) {
            message.order.payments.forEach((payment, z) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}]' which is an object`, function () {
                    expect(payment).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].id' which is a string`, function () {
                    expect(payment.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].collected_by' which is a string`, function () {
                    expect(payment.collected_by).to.exist.and.to.be.a("string").and.to.be.oneOf(["BAP", "BPP"]);
                }));

                let paymentStatus = [];
                switch (payment?.type) {
                    case "PRE-ORDER":
                    case "ON-ORDER":
                    case "ON-FULFILLMENT":
                    case "POST-FULFILLMENT":
                        paymentStatus = ["NOT-PAID"];
                        break;
                    default:
                        paymentStatus = [...paymentStatus, "PAID", "NOT-PAID"];
                        break;
                }

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].status' which is a string and it is one of ${paymentStatus}`, function () {
                    expect(payment.status).to.exist.and.to.be.a("string").and.to.be.oneOf(paymentStatus);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.payments[${z}].type' which is a string`, function () {
                    expect(payment.type).to.be.a("string").and.to.be.oneOf(["PRE-ORDER", "ON-FULFILLMENT", "POST-FULFILLMENT"]);
                }));
            })
        }

        // settlementTermsListTests(messageTestSuite, { context, message }, logs);
        return [testSuite, responseTestSuite];
    } catch (error) {
        // testSuite.addTest(new Mocha.Test("on_init request failed to be verified because of some missing payload or some internal error", function () {
        //     expect(true).to.equal(false);
        // }));
        console.log(error);
        return testSuite;
    }
}
module.exports = {
    on_init
}