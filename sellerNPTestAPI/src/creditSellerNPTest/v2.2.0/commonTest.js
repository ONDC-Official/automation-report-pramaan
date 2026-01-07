const Mocha = require("mocha");
const { expect } = require("chai");

const codePattern = /^[A-Z_]+$/;

function providerTests(message, messageTestSuite, testCaseId) {
  try {
    let testcaseCounter = 101;

    const getNextTestcaseId = () => {
      return testcaseCounter++;
    };

    if (message?.order?.provider) {
      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider' should be an object`, function () {
        expect(message.order.provider).to.be.an("object");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.id' should be a string`, function () {
        expect(message.order.provider.id).to.be.a("string");
      }));

      if (message?.order?.provider?.descriptor) {
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.descriptor' should be an object`, function () {
          expect(message.order.provider.descriptor).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.descriptor.name' should be an object`, function () {
          expect(message.order.provider.descriptor.name).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.descriptor.short_desc' should be a string (OPTIONAL)`, function () {
          expect(message.order.provider.descriptor.short_desc).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.descriptor.long_desc' should be a string (OPTIONAL)`, function () {
          expect(message.order.provider.descriptor.long_desc).to.exist.and.to.be.a("string");
        }));

        if (message?.order?.provider?.descriptor?.images && message?.order?.provider?.descriptor?.images.length > 0) {
          message.order.provider.descriptor.images.forEach((image, i) => {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.descriptor.images[${i}]' should have url and size_type`, function () {
              expect(image).to.include.all.keys("url", "size_type");
              expect(image.url).to.be.a("string");
              expect(image.size_type).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.descriptor.images[${i}].url' should be a string (OPTIONAL)`, function () {
              expect(image.url).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.descriptor.images[${i}].size_type' should be a string (OPTIONAL)`, function () {
              expect(image.size_type).to.be.a("string");
            }));
          });
        }

        const arr = [{ code: "CONTACT_INFO" }, { code: "LSP_INFO" }];
        arr.forEach((ele) => {
          const tagIndex = message?.order?.provider?.tags.findIndex(
            (tag) => tag?.descriptor?.code === ele.code
          );
          const tagItem = message?.order?.provider?.tags[tagIndex];
          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags' should have an object of ${ele.code}`, function () {
            expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
          }));

          if (tagIndex !== -1) {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags[${tagIndex}].descriptor' should have descriptor and list`, function () {
              expect(tagItem).to.have.property("descriptor").that.is.an("object");
              expect(tagItem).to.have.property("list").that.is.an("array");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags[${tagIndex}].descriptor.name' should be a string`, function () {
              expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags[${tagIndex}].descriptor.code' should be '${ele.code}'`, function () {
              expect(tagItem.descriptor.code).to.be.equal(ele.code);
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags[${tagIndex}].list' should be a non-empty array`, function () {
              expect(tagItem.list).to.be.an("array").that.is.not.empty;
            }));

            let contactInfoArr = [
              { code: "GRO_NAME" },
              { code: "GRO_EMAIL" },
              { code: "GRO_CONTACT_NUMBER" },
              { code: "CUSTOMER_SUPPORT_LINK" },
              { code: "CUSTOMER_SUPPORT_CONTACT_NUMBER" },
              { code: "CUSTOMER_SUPPORT_EMAIL" },
            ];
            let lspInfoArr = [
              { code: "LSP_NAME" },
              { code: "LSP_EMAIL" },
              { code: "LSP_CONTACT_NUMBER" },
              { code: "LSP_ADDRESS" },
            ];

            let array;
            switch (tagItem?.descriptor?.code) {
              case "CONTACT_INFO":
                array = contactInfoArr;
                break;
              case "LSP_INFO":
                array = lspInfoArr;
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

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                  expect(listItem).to.exist.and.to.be.an("object");
                }));

                if (listItemIndex !== -1) {
                  messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have descriptor and value`, function () {
                    expect(listItem).to.have.property("descriptor").that.is.an("object");
                    expect(listItem).to.have.property("value").that.is.a("string");
                  }));

                  messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be a string`, function () {
                    expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                  }));

                  messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be '${it.code}'`, function () {
                    expect(listItem.descriptor.code).to.be.equal(it.code);
                  }));

                  messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags[${tagIndex}].list[${listItemIndex}].value' should be a non-empty string`, function () {
                    expect(listItem.value).to.be.a("string").that.is.not.empty;
                  }));
                }
              });
            }
          }
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function itemsCommonFieldsTests(item, index, messageTestSuite, testCaseId) {
  try {
    let testcaseCounter = 190;

    const getNextTestcaseId = () => {
      return testcaseCounter++;
    };
    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].id' should be a string`, function () {
      expect(item.id).to.exist;
      expect(item.id).to.be.a("string");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].descriptor' should exist and be an object`, function () {
      expect(item.descriptor).to.exist.and.to.be.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].descriptor' should have properties 'code' and 'name'`, function () {
      expect(item.descriptor).to.include.all.keys("code", "name");
      expect(item.descriptor.code).to.exist.and.to.be.a("string");
      expect(item.descriptor.name).to.exist.and.to.be.a("string");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].descriptor.code' should be 'LOAN'`, function () {
      expect(item.descriptor.code).to.equal("LOAN");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].descriptor.name' should be a string`, function () {
      expect(item.descriptor.name).to.be.a("string");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].price' should exist and be an object`, function () {
      expect(item.price).to.exist.and.to.be.an("object");
      expect(item.price.currency).to.exist.and.to.be.a("string");
      expect(item.price.value).to.exist.and.to.be.a("string");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].price.currency' should be 'INR'`, function () {
      expect(item.price.currency).to.equal("INR");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].price.value' should match a decimal pattern`, function () {
      expect(item.price.value).to.match(/^[+-]?([0-9]*[.])?[0-9]+$/, "'price.value' does not match the required pattern");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].tags' should exist and be an array`, function () {
      expect(item.tags).to.exist.and.to.be.an("array");
    }));

    if (item?.tags) {
      const arr = [{ code: "INFO" }, { code: "CHECKLISTS" }];
      arr.forEach((ele) => {
        const tagIndex = item?.tags.findIndex(
          (tag) => tag?.descriptor?.code === ele.code
        );
        const tagItem = item?.tags[tagIndex];
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags' should have an object of ${ele.code}`, function () {
          expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
        }));

        if (tagIndex !== -1) {
          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].descriptor' should have descriptor and list`, function () {
            expect(tagItem).to.have.property("descriptor").that.is.an("object");
            expect(tagItem).to.have.property("list").that.is.an("array");
          }));

          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].descriptor.name' should be a string`, function () {
            expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
          }));

          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].descriptor.code' should be '${ele.code}'`, function () {
            expect(tagItem.descriptor.code).to.be.equal(ele.code);
          }));

          if (tagItem?.descriptor?.short_desc) {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].descriptor.short_desc' should be a string'`, function () {
              expect(tagItem.descriptor.short_desc).to.be.a("string");
            }));
          }

          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].display' should be a boolean (OPTIONAL)`, function () {
            expect(tagItem.display).to.be.a("boolean");
          }));
          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].list' should be a non-empty array`, function () {
            expect(tagItem.list).to.be.an("array").that.is.not.empty;
          }));

          let infoArr = [
            { code: "INTEREST_RATE" },
            { code: "TERM" },
            { code: "INTEREST_RATE_TYPE" },
            { code: "APPLICATION_FEE" },
            { code: "FORECLOSURE_FEE" },
            { code: "INTEREST_RATE_CONVERSION_CHARGE" },
            { code: "DELAY_PENALTY_FEE" },
            { code: "OTHER_PENALTY_FEE" },
            { code: "ANNUAL_PERCENTAGE_RATE" },
            { code: "REPAYMENT_FREQUENCY" },
            { code: "NUMBER_OF_INSTALLMENTS" },
            { code: "TNC_LINK" },
            { code: "COOL_OFF_PERIOD" },
            { code: "INSTALLMENT_AMOUNT" },
            { code: "MINIMUM_DOWNPAYMENT" },
            { code: "SUBVENTION_RATE" }
          ];
          let checklistsArr = [
            { code: "SET_DOWN_PAYMENT" },
            { code: "KYC" },
            { code: "EMANDATE" },
            { code: "ESIGN" },
          ];

          let array;
          switch (tagItem?.descriptor?.code) {
            case "INFO":
              array = infoArr;
              break;
            case "CHECKLISTS":
              array = checklistsArr;
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

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                expect(listItem).to.exist.and.to.be.an("object");
              }));

              if (listItemIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have descriptor and value`, function () {
                  expect(listItem).to.have.property("descriptor").that.is.an("object");
                  expect(listItem).to.have.property("value").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be a string`, function () {
                  expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be '${it.code}'`, function () {
                  expect(listItem.descriptor.code).to.be.equal(it.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] message.order.items[${index}].tags[${tagIndex}].list[${listItemIndex}].value' should be a non-empty string`, function () {
                  expect(listItem.value).to.be.a("string").that.is.not.empty;
                }));
              }
            });
          }
        }
      });
    }


  } catch (err) {
    console.error(err);
  }
}

function fulfillmentTests(message, messageTestSuite, loanState, testCaseId) {
  try {
    let testcaseCounter = 501;

    const getNextTestcaseId = () => {
      return testcaseCounter++;
    };
    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments' should be an array`, function () {
      expect(message.order.fulfillments).to.exist.and.to.be.an("array");
      // .that.is.not.empty;
    }));
    if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
      message.order.fulfillments.forEach((fulfillment, index) => {
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}]' should include 'customer' and 'state'`, function () {
          expect(fulfillment).to.include.all.keys("customer", "state");
          expect(fulfillment.customer).to.exist.and.to.be.an("object");
          expect(fulfillment.state).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].customer' should include 'person' and 'contact'`, function () {
          expect(fulfillment.customer).to.include.all.keys("person", "contact");
          expect(fulfillment.customer.person).to.exist.and.to.be.an("object");
          expect(fulfillment.customer.contact).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].customer.person.name' should exist and be a string`, function () {
          expect(fulfillment.customer.person).to.have.property("name").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].customer.contact' should include 'phone' and 'email'`, function () {
          expect(fulfillment.customer.contact).to.have.property("phone").that.is.a("string");
          expect(fulfillment.customer.contact).to.have.property("email").that.is.a("string").and.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].state.descriptor' should exist and be an object`, function () {
          expect(fulfillment.state).to.have.property("descriptor").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].state.descriptor.code' should exist and be a string`, function () {
          expect(fulfillment.state.descriptor).to.have.property("code").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].state.type' should exist and be a string`, function () {
          expect(fulfillment).to.have.property("type").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].state.id' should exist and be a string`, function () {
          expect(fulfillment).to.have.property("id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].state.descriptor.code' should match expected loan state code`, function () {
          expect(fulfillment.state.descriptor.code).to.be.a("string").and.to.be.oneOf(loanState.code);
        }));


        if (fulfillment?.state?.descriptor?.code === "DISBURSED") {
          if (fulfillment?.tags && fulfillment.tags.length > 0) {
            fulfillment.tags.forEach((tag, tagIndex) => {
              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}]' should include 'customer' and 'state'`, function () {
                expect(fulfillment).to.include.all.keys("customer", "state");
                expect(fulfillment.customer).to.exist.and.to.be.an("object");
                expect(fulfillment.state).to.exist.and.to.be.an("object");
              }));

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].customer' should include 'person' and 'contact'`, function () {
                expect(fulfillment.customer).to.include.all.keys("person", "contact");
                expect(fulfillment.customer.person).to.exist.and.to.be.an("object");
                expect(fulfillment.customer.contact).to.exist.and.to.be.an("object");
              }));

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].customer.person.name' should exist and be a string`, function () {
                expect(fulfillment.customer.person).to.have.property("name").that.is.a("string");
              }));

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].customer.contact' should include 'phone' and 'email'`, function () {
                expect(fulfillment.customer.contact).to.have.property("phone").that.is.a("string");
                expect(fulfillment.customer.contact).to.have.property("email").that.is.a("string").and.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
              }));

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].state.descriptor' should exist and be an object`, function () {
                expect(fulfillment.state).to.have.property("descriptor").that.is.an("object");
              }));

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].state.descriptor.code' should exist and be a string`, function () {
                expect(fulfillment.state.descriptor).to.have.property("code").that.is.a("string");
              }));

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].state.type' should exist and be a string`, function () {
                expect(fulfillment).to.have.property("type").that.is.a("string");
              }));

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].state.id' should exist and be a string`, function () {
                expect(fulfillment).to.have.property("id").that.is.a("string");
              }));

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].state.descriptor.code' should match expected loan state code`, function () {
                expect(fulfillment.state.descriptor.code).to.be.a("string").and.to.be.oneOf(loanState.code);
              }));

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}]' should include 'descriptor' and 'list'`, function () {
                expect(tag).to.include.all.keys("descriptor", "list");
                expect(tag.descriptor).to.exist.and.to.be.an("object");
                expect(tag.list).to.exist.and.to.be.an("array");
              }));

              messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].descriptor' should include 'code' and 'name'`, function () {
                expect(tag.descriptor.code).to.exist.and.to.be.a("string");
                expect(tag.descriptor.name).to.exist.and.to.be.a("string");
              }));

              if (tag.list && tag.list.length > 0) {
                tag.list.forEach((listItem, listItemIndex) => {
                  messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].list[${listItemIndex}]' should include 'descriptor' and 'value'`, function () {
                    expect(listItem).to.include.all.keys("descriptor", "value");
                    expect(listItem.descriptor).to.exist.and.to.be.an("object");
                    expect(listItem.value).to.exist.and.to.be.a("string");
                  }));

                  messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should include 'code', 'name', and 'short_desc'`, function () {
                    expect(listItem.descriptor).to.include.all.keys("code", "name", "short_desc");
                    expect(listItem.descriptor.code).to.exist.and.to.be.a("string");
                    expect(listItem.descriptor.name).to.exist.and.to.be.a("string");
                    expect(listItem.descriptor.short_desc).to.exist.and.to.be.a("string");
                  }));
                });
              }

            });
          }

          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags' should exist and be an array`, function () {
            expect(fulfillment.tags).to.exist.and.to.be.an("array");
          }));
          const arr = [{ code: "INFO" }];
          arr.forEach((ele) => {
            const tagIndex = fulfillment?.tags.findIndex(
              (tag) => tag?.descriptor?.code === ele.code
            );
            const tagItem = fulfillment?.tags[tagIndex];

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags' should have an '${ele.name}' object`, function () {
              expect(tagItem).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}]' should include 'descriptor' and 'list'`, function () {
              expect(tagItem).to.include.all.keys("descriptor", "list");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].descriptor.code' should exist`, function () {
              expect(tagItem.descriptor).to.have.property("code");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].descriptor.code' should equal ${ele.code}`, function () {
              expect(tagItem.descriptor.code).to.equal(ele?.code);
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].descriptor.name' should be a string`, function () {
              expect(tagItem.descriptor.name).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].list' should be a non-empty array`, function () {
              expect(tagItem.list).to.be.an("array").that.is.not.empty;
            }));

            const infoArr = [{ code: "REFERENCE_NUMBER" }];
            let array;
            switch (ele.code) {
              case "INFO":
                array = infoArr;
                break;
              default:
                break;
            }

            if (array) {
              array.forEach((it) => {
                const listIndex = tagItem.list.findIndex(
                  (listItem) => listItem.descriptor.code === it.code
                );
                const listItem = tagItem.list[listIndex];

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].list' should have an '${it.name}' object`, function () {
                  expect(listItem).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].list[${listIndex}]' should include 'descriptor' and 'value' (${it.code})`, function () {
                  expect(listItem).to.include.all.keys("descriptor", "value");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].list[${listIndex}].descriptor.code' should exist (${it.code})`, function () {
                  expect(listItem.descriptor).to.have.property("code");
                  expect(listItem.descriptor.code).to.exist;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.fulfillments[${index}].tags[${tagIndex}].list[${listIndex}].value' should exist and be a string`, function () {
                  expect(listItem.value).to.exist.and.to.be.a("string");
                }));
              });
            }
          });
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}


function quoteTests(message, messageTestSuite, testCaseId) {
  try {
    let testcaseCounter = 700

    const getNextTestcaseId = () => {
      return testcaseCounter++;
    };
    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.quote' should be an object`, function () {
      expect(message.order.quote).to.exist.and.to.be.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.quote' should have 'id' property`, function () {
      expect(message.order.quote, "'message.order.quote.id' should exist").to.have.property("id").that.is.a("string");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.quote.price' should be an object`, function () {
      expect(message.order.quote.price).to.exist.and.to.be.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.quote' should have 'price' property with 'currency' and 'value'`, function () {
      expect(message.order.quote.price).to.exist;
      expect(message.order.quote.price).to.have.property("currency").that.equals("INR");
      expect(message.order.quote.price).to.have.property("value").that.is.a("string");
    }));
    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.quote' should have 'breakup' property as an array`,
      function () {
        expect(message.order.quote, "Breakup array should exist")
          .to.have.property("breakup")
          .that.is.an("array").not.empty;
      }
    )
    );
    const arr = [
      { code: "PRINCIPAL_AMOUNT" },
      { code: "INTEREST_AMOUNT" },
      { code: "PROCESSING_FEE" },
      { code: "OTHER_UPFRONT_CHARGES" },
      { code: "INSURANCE_CHARGES" },
      { code: "NET_DISBURSED_AMOUNT" },
      { code: "OTHER_CHARGES" },
    ];

    arr.forEach((ele) => {
      const breakUpItemIndex = message?.order?.quote?.breakup.findIndex(
        (breakUpItem) => breakUpItem.title === ele.code
      );
      const breakUpItem = message?.order?.quote?.breakup[breakUpItemIndex];

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.quote.breakup[${breakUpItemIndex}]' (${ele.code}) should have 'title' and 'price' properties`, function () {
        expect(breakUpItem).to.have.property("title").that.is.a("string");
        expect(breakUpItem).to.have.property("price").that.is.an("object");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}'message.order.quote.breakup[${breakUpItemIndex}].title' should be equal to '(${ele.code})'`, function () {
        expect(breakUpItem.title).to.be.equal(ele.code);
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.quote.breakup[${breakUpItemIndex}].price.currency' should be 'INR' (OPTIONAL)  (${ele.code})`, function () {
        expect(breakUpItem.price)
          .to.have.property("currency")
          .that.equals("INR");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.quote.breakup[${breakUpItemIndex}].price.value' should be a string (OPTIONAL) (${ele.code})`, function () {
        expect(breakUpItem.price)
          .to.have.property("value")
          .that.is.a("string");
      }));
    });

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.quote' should have 'ttl' property with valid duration format`, function () {
      expect(message.order.quote.ttl).to.exist;
      // expect(message.order.quote.ttl).to.match(/^PT\d+[HD]?(\d+M)?$/);
      expect(message.order.quote.ttl).to.be.a("string");
    }));
  } catch (err) {
    console.error(err);
  }
}

function cancellationTermsTests(message, messageTestSuite, testCaseId) {
  try {
    let testcaseCounter = 751;

    const getNextTestcaseId = () => {
      return testcaseCounter++;
    };
    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms' should be an array that is not empty`, function () {
      expect(message?.order?.cancellation_terms).to.exist.and.to.be.an("array");
      // .that.is.not.empty;
    }));

    if (message?.order?.cancellation_terms && message?.order?.cancellation_terms.length > 0) {
      message?.order?.cancellation_terms.forEach((ele, index) => {
        if (ele?.fulfillment_state) {
          if (ele?.fulfillment_state?.descriptor?.code === "SANCTIONED") {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms[${index}]' should have properties 'fulfillment_state' and 'cancellation_fee'`, function () {
              expect(ele).to.have.property("fulfillment_state").that.is.an("object");
              expect(ele).to.have.property("cancellation_fee").that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms[${index}].fulfillment_state' should have a property 'descriptor'`, function () {
              expect(ele.fulfillment_state).to.have.property("descriptor").that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms[${index}].fulfillment_state.descriptor' should have a property 'code' that is equal to 'SANCTIONED'`, function () {
              expect(ele.fulfillment_state.descriptor).to.have.property("code").that.is.equal("SANCTIONED");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms[${index}].cancellation_fee' should have a property 'percentage'`, function () {
              expect(ele.cancellation_fee).to.have.property("percentage").that.is.a("string");
            }));
          }

          if (ele?.fulfillment_state?.descriptor?.code === "DISBURSED") {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms[${index}]' should have properties 'fulfillment_state' and 'cancellation_fee'`, function () {
              expect(ele).to.have.property("fulfillment_state").that.is.an("object");
              expect(ele).to.have.property("cancellation_fee").that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms[${index}].fulfillment_state' should have a property 'descriptor'`, function () {
              expect(ele.fulfillment_state).to.have.property("descriptor").that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms[${index}].fulfillment_state.descriptor' should have a property 'code' that is equal to 'DISBURSED'`, function () {
              expect(ele.fulfillment_state.descriptor).to.have.property("code").that.is.equal("DISBURSED");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms[${index}].cancellation_fee' should have a property 'percentage'`, function () {
              expect(ele.cancellation_fee).to.have.property("percentage").that.is.a("string");
            }));
          }
        }

        if (ele?.external_ref) {
          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms[${index}]' should have property 'external_ref'`, function () {
            expect(ele).to.have.property("external_ref").that.is.an("object");
          }));

          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.cancellation_terms[${index}].external_ref' should have property 'mimetype' and 'url'`, function () {
            expect(ele.external_ref).to.have.property("mimetype").that.is.a("string");
            expect(ele.external_ref).to.have.property("url").that.is.a("string");
          }));
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

function xinputOnStatusGeneral(item, messageTestSuite, index, testCaseId) {
  try {
    let testcaseCounter = 480;

    const getNextTestcaseId = () => {
      return testcaseCounter++;
    };
    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].xinput' should have a property form_reponse which is an object`, function () {
      expect(item.xinput).to.have.property("form_response").that.is.an("object");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].xinput.form_reponse' should have properties 'status' and 'submission_id'`, function () {
      expect(item.xinput.form_response).to.have.property("status").that.is.a("string");
      expect(item.xinput.form_response).to.have.property("submission_id").that.is.a("string");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].xinput.form_reponse.status' should have be one of ["APPROVED","PENDING", "REJECTED"]`,
      function () {
        expect(item.xinput.form_response.status).to.be.oneOf([
          "APPROVED",
          "PENDING",
          "REJECTED",
          "SUCCESS",
          "EXPIRED",]);
      })
    );

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.items[${index}].xinput.form_reponse.submission_id' should be a string`, function () {
      expect(item.xinput.form_response.submission_id).to.be.a("string");
    }));
  } catch (err) {
    console.log(err);
  }
}

function documentsTests(message, messageTestSuite, testCaseId) {
  let testcaseCounter = 390;

  const getNextTestcaseId = () => {
    return testcaseCounter++;
  };
  if (message?.order?.documents && message?.order?.documents.length > 0) {
    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents' should be an array`, function () {
      expect(message.order.documents).to.exist.and.to.be.an("array").that.is
        .not.empty;
    }));
    message.order.documents.forEach((document, index) => {
      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should verify the contents of 'message.order.documents[${index}]'`, function () {
        expect(document).to.include.all.keys(
          "descriptor",
          "mime_type",
          "url"
        );
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents[${index}].descriptor' should have property 'code'`, function () {
        expect(document.descriptor).to.have.property("code");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents[${index}].mime_type' should be a string`, function () {
        expect(document.mime_type).to.be.a("string");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents[${index}].url' should be a string and start with 'https://'`, function () {
        expect(document.url)
          .to.be.a("string")
          .and.to.match(/^https:\/\//);
      }));

      // Additional tests for document descriptor
      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents[${index}].descriptor' should have property 'name'`, function () {
        expect(document.descriptor).to.have.property("name");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents[${index}].descriptor' should have property 'short_desc'`, function () {
        expect(document.descriptor).to.have.property("short_desc");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.documents[${index}].descriptor' should have property 'long_desc'`, function () {
        expect(document.descriptor).to.have.property("long_desc");
      }));
    });
  }
}
function paymentCommonTests(payment, index, action, messageTestSuite, testCaseId) {
  try {
    let testcaseCounter = 910;

    const getNextTestcaseId = () => {
      return testcaseCounter++;
    };

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].id' should have a valid 'id' that is a string`, function () {
      expect(payment.id).that.is.a("string");
    }));

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].type should be either 'ON_ORDER' or 'POST_FULFILLMENT'`, function () {
      expect(payment.type).to.be.a("string").and.to.be.oneOf(["ON_ORDER", "POST_FULFILLMENT", "PRE_ORDER"]);
    }));

    if (payment?.type === "POST_FULFILLMENT") {
      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].params' should have a valid 'params' that is an object`, function () {
        expect(payment.params).that.is.an("object");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].params.amount' should have a valid 'amount' that is a string`, function () {
        expect(payment.params.amount).that.is.an("string");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].params.currency' should have a valid 'currency' that is a string`, function () {
        expect(payment.params.currency).that.is.an("string");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].time' should have a valid 'time' that is an object`, function () {
        expect(payment.time).that.is.an("object");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].time.label' should have a valid 'label' that is a string`, function () {
        expect(payment.time.label).that.is.an("string");
      }));

      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].time.range' should have a valid 'range' that is an object`, function () {
        expect(payment.time.range).that.is.an("object");
      }));
    }

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}]' should have a valid 'status' that is a string and is oneOf ['NOT-PAID', 'PAID', 'DEFERRED', 'DELAYED']`, function () {
      expect(payment).to.have.property("status").that.is.a("string").and.to.be.oneOf(["NOT-PAID", "PAID", "DEFERRED", 'DELAYED']);
    }));

    if (payment?.type === "ON_ORDER") {
      messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].collected_by should be 'BPP'`, function () {
        expect(payment.collected_by).to.be.a("string").and.to.equal("BPP");
      }));
    }

    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags' should be an array with length not equal 0`, function () {
      expect(payment.tags).to.exist.and.to.be.an("array").to.have.length.above(0);
    }));
    if (payment?.tags) {

      let arr;
      const arr1 = [{ code: "BPP_TERMS" }];
      const arr3 = [{ code: "BREAKUP" }];
      const arr2 = [{ code: "BPP_TERMS" }, { code: "BAP_TERMS" }];
      switch (payment?.type) {
        case "POST_FULFILLMENT":
          arr = arr3;
          break;
        case "ON_ORDER":
          switch (action) {
            case "on_select":
            case "on_init":
              arr = arr1;
              break;
            default:
              arr = arr2;
              break;
          }
          break;
      }

      arr.forEach((ele) => {
        const eleIndex = payment?.tags.findIndex(tag => tag?.descriptor?.code === ele.code);
        const tag = payment?.tags[eleIndex];

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags' should have an '${ele.name}' object`, function () {
          expect(tag).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should verify the contents of 'message.order.payments[${index}].tags[${eleIndex}]'`, function () {
          expect(tag).to.include.all.keys("descriptor", "list");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${eleIndex}].descriptor' should have property 'code'`, function () {
          expect(tag.descriptor).to.have.property("code");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${eleIndex}].descriptor.code' should be ${ele.code}`, function () {
          expect(tag.descriptor.code).to.equal(ele?.code);
        }));

        if (payment?.type === "ON_ORDER") {
          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${eleIndex}].display' should be a boolean (OPTIONAL)`, function () {
            expect(tag.display).to.be.a("boolean");
          }));
        }

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${eleIndex}].list' should be an array that is not empty`, function () {
          expect(tag.list).to.be.an("array").that.is.not.empty;
        }));

        const bapTermsArr = [{ code: "BUYER_FINDER_FEES_TYPE" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }, { code: "SETTLEMENT_AMOUNT" }, { code: "SETTLEMENT_TYPE" }, { code: "DELAY_INTEREST" }, { code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }]
        const bppTermsArr = [{ code: "BUYER_FINDER_FEES_TYPE" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }, { code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "SETTLEMENT_AMOUNT" }, { code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }]
        const breakupArr = [{ code: "INTEREST_AMOUNT" }, { code: "PRINCIPAL_AMOUNT" }]
        let array;
        switch (tag?.descriptor?.code) {
          case "BAP_TERMS":
            array = bapTermsArr
            break
          case "BPP_TERMS":
            array = bppTermsArr
            break
          case "BREAKUP":
            array = breakupArr;
            break
        }

        array.forEach((it) => {
          const listItemIndex = tag?.list.findIndex((listItem) => listItem?.descriptor?.code === it?.code);
          const listItem = tag?.list[listItemIndex];

          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${eleIndex}].list' should have an '${it.code}' object`, function () {
            expect(listItem).to.exist.and.to.be.an("object");
          }));

          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${eleIndex}].list.descriptor' should be an object`, function () {
            expect(listItem.descriptor).to.be.an("object");
          }));

          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${eleIndex}].list.descriptor' should have properties named 'code' which is a string`, function () {
            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
          }));


          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${eleIndex}].list.descriptor.code' should be equal to '${it.code}' (OPTIONAL)`, function () {
            expect(listItem.descriptor.code).to.be.equal(it.code);
          }));

          messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.payments[${index}].tags[${eleIndex}].list.value' should be a string`, function () {
            expect(listItem).to.have.property("value").that.is.a("string");
          }));

        });


      });
    }


  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  providerTests,
  itemsCommonFieldsTests,
  fulfillmentTests,
  paymentCommonTests,
  quoteTests,
  cancellationTermsTests,
  xinputOnStatusGeneral,
  documentsTests,
};
