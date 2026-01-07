const Mocha = require("mocha");
const { expect } = require("chai");

function xinputForSearch(message, messageTestSuite) {
    try {
        message?.catalog?.providers?.forEach((provider, i) => {
            provider?.items?.forEach((item, j) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput' should be an object`, function () {
                    expect(item.xinput).to.be.an("object");
                }));

                if (item?.xinput) {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.head' should be an object`, function () {
                        expect(item.xinput.head).to.be.an("object");
                    }));

                    if (item?.xinput?.head) {
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.head.descriptor' should be an object`, function () {
                            expect(item.xinput.head.descriptor).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.head.descriptor.name' should be a 'string' (OPTIONAL)`, function () {
                            expect(item.xinput.head.descriptor.name).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.head.index' should be an object`, function () {
                            expect(item.xinput.head.index).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.head.index.min' should be a number (OPTIONAL)`, function () {
                            expect(item.xinput.head.index.min).to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.head.index.cur' should be a number(OPTIONAL)`, function () {
                            expect(item.xinput.head.index.cur).to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.head.index.max' should be a number (OPTIONAL)`, function () {
                            expect(item.xinput.head.index.max).to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.head.headings' should be an array (OPTIONAL)`, function () {
                            expect(item.xinput.head.headings).to.be.an("array");
                        }));
                        if (item?.xinput?.head.headings && item?.xinput?.head.headings.length > 0) {
                            item?.xinput?.head.headings.forEach((heading, headinIndex) => {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.head.headings[${headinIndex}]' should be a string`, function () {
                                    expect(heading).to.exist.and.to.be.a("string");
                                }));
                            })
                        }

                    }

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.form' should be an object`, function () {
                        expect(item.xinput.form).to.be.an("object");
                    }));

                    if (item?.xinput?.form) {
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.form.id' should be a string (OPTIONAL)`, function () {
                            expect(item.xinput.form.id).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.form.mime_type' should be a 'string' (OPTIONAL)`, function () {
                            expect(item.xinput.form.mime_type).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.form.url' should be a valid URL (OPTIONAL)`, function () {
                            expect(item.xinput.form.url).to.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.form.resubmit' should be boolean (OPTIONAL)`, function () {
                            expect(item.xinput.form.resubmit).to.be.a("boolean");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.form.multiple_sumbissions' should be boolean (OPTIONAL)`, function () {
                            expect(item.xinput.form.multiple_sumbissions).to.be.a("boolean");
                        }));
                    }

                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${i}].items[${j}].xinput.required' should be true (OPTIONAL)`, function () {
                        expect(item.xinput.required).to.be.true;
                    }));
                }
            });
        });
    } catch (error) {
        console.log(error);
        return error;
    }
}


function descriptorInCatalog(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message.catalog.descriptor' should be an object", function () {
            expect(message.catalog.descriptor).to.be.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.catalog.descriptor.name' should be a string (OPTIONAL)", function () {
            expect(message.catalog.descriptor.name).to.be.a("string");
        }));
    } catch (error) {
        console.log(error);
        return error;
    }
}

//providers.payments
function paymentsForSearch(message, messageTestSuite,) {
    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers' should exist and be an array`, function () {
        expect(message.catalog.providers).to.exist.and.to.be.an("array").that.is.not.empty;
    }));
    message?.catalog?.providers.forEach((provider, p) => {
        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.catalog.providers[${p}]' should be an object`, function () {
            expect(provider).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments' should be an array`, function () {
            expect(provider.payments).to.be.an('array');
        }));

        if (provider?.payments && provider?.payments.length > 0) {
            provider.payments.forEach((payment, z) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}]' should be an object`, function () {
                    expect(payment).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].collected_by' should be a string`, function () {
                    expect(payment.collected_by).to.be.a('string');
                }));
                // const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];
                // arr.forEach((ele) => {
                //     const tagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                //     const tagItem = payment?.tags[tagIndex];
                //     messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags' should have an object of ${ele.code}`, function () {
                //         expect(tagItem).to.exist.and.to.be.an("object");
                //     }));

                //     if (tagIndex !== -1) {
                //         messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                //             expect(tagItem).to.have.property("descriptor").that.is.an("object");
                //             expect(tagItem).to.have.property("display").that.is.a("boolean");
                //             expect(tagItem).to.have.property("list").that.is.an("array");
                //         }));

                //         messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                //             expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                //         }));

                //         messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                //             expect(tagItem.descriptor.code).to.be.equal(ele.code);
                //         }));

                //         messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags[${tagIndex}].display' should be a boolean`, function () {
                //             expect(tagItem.display).to.be.a("boolean");
                //         }));

                //         messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                //             expect(tagItem.list).to.be.an("array").that.is.not.empty;
                //         }));

                //         const buyerFinderFeeType = tagItem?.list?.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
                //         const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }]
                //         const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];
                //         const settlementTermsArr = [{ code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "DELAY_INTEREST" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];

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
                //                 const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                //                 const listItem = tagItem?.list[listItemIndex];

                //                 messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                //                     expect(listItem).to.exist.and.to.be.an("object");
                //                 }));

                //                 if (listItemIndex !== -1) {
                //                     messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                //                         expect(listItem).to.have.property("descriptor").that.is.an("object");
                //                         expect(listItem).to.have.property("value").that.is.a("string");
                //                     }));

                //                     messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                //                         expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                //                     }));

                //                     messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                //                         expect(listItem.descriptor.code).to.be.equal(it.code);
                //                     }));

                //                     messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${p}].payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                //                         expect(listItem.value).to.be.a('string').that.is.not.empty;
                //                     }));
                //                 }
                //             });
                //         }
                //     }
                // });
            })
        }
    })
}
//quoteTests
function quoteCommonTests(message, messageTestSuite) {
    try {

        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'quote' which is a object", function () {
            expect(message.order).to.have.a.property("quote").that.is.an("object");
        }));

        const arr = [
            { title: "BASE_PRICE", name: "base price" },
            { title: "CONVIENCE_FEE", name: "convience fee" },
            { title: "TAX", name: "tax" },
            // { title: "PROCESSING_FEE", name: "processing fee" },
            // { title: "ADD_ONS", name: "add ons" }
        ];

        arr.forEach((ele) => {
            const breakupIndex = message?.order?.quote?.breakup.findIndex((breakup) => breakup?.title === ele.title);
            const breakupItem = message?.order?.quote?.breakup[breakupIndex];
            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup' should have an object of ${ele.title}`, function () {
                expect(breakupItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
            }));
            if (breakupIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should have properties named 'price', 'title'`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                    expect(breakupItem.price).to.have.property("value").that.is.a("string");
                    expect(breakupItem).to.have.property("title").that.is.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string`, function () {
                    expect(breakupItem.price).to.have.property("value").that.is.a("string");
                }));
                // messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string`, function () {
                //     expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                // }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));
            }
        })

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'price' which is an object", function () {
            expect(message.order.quote).to.have.a.property("price").that.is.a("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote.price' should have a property named as 'currency' which is an string", function () {
            expect(message.order.quote.price).to.have.a.property("currency").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote.price' should have a property named as 'value' which is an string", function () {
            expect(message.order.quote.price).to.have.a.property("value").that.is.a("string");
        }));

        // const totalBreakupPrice = message.order.quote.breakup.reduce((total, item) => {
        //     return total + parseFloat(item.price.value);
        // }, 0);

        // messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be equal to the sum of 'breakup' prices", function () {
        //     expect(parseFloat(message.order.quote.price.value)).to.equal(totalBreakupPrice);
        // }));


    } catch (error) {
        return err;
    }
}
//order.payments
function paymentsTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments' should be an array`, function () {
            expect(message.order.payments).to.be.an('array');
        }));
        if (message?.order?.payments && message?.order?.payments.length > 0) {
            message.order.payments.forEach((payment, z) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}]' should be an object`, function () {
                    expect(payment).to.be.an('object');
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].collected_by' should be a string`, function () {
                    expect(payment.collected_by).to.be.a('string');
                }));
                const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];
                arr.forEach((ele) => {
                    const tagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                    const tagItem = payment?.tags[tagIndex];
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    }));

                    if (tagIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                            expect(tagItem).to.have.property("descriptor").that.is.an("object");
                            expect(tagItem).to.have.property("display").that.is.a("boolean");
                            expect(tagItem).to.have.property("list").that.is.an("array");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                            expect(tagItem.descriptor.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].display' should  be a boolean`, function () {
                            expect(tagItem.display).to.be.a("boolean");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));

                        const buyerFinderFeeType = tagItem.list?.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
                        const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }]
                        const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];
                        const settlementTermsArr = [{ code: "SETTLEMENT_WINDOW" }, { code: "SETTLEMENT_BASIS" }, { code: "DELAY_INTEREST" }, { code: "MANDATORY_ARBITRATION" }, { code: "COURT_JURISDICTION" }, { code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];

                        let array;
                        switch (tagItem?.descriptor?.code) {
                            case "BUYER_FINDER_FEES":
                                switch (buyerFinderFeeType) {
                                    case "amount":
                                        array = buyerFinderFeeAmountArr;
                                        break;
                                    case "percent":
                                    case "percent-annualized":
                                        array = buyerFinderFeePercent;
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case "SETTLEMENT_TERMS":
                                array = settlementTermsArr;
                                break;
                            default:
                                break;
                        }

                        if (array) {
                            array.forEach((it) => {
                                const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                const listItem = tagItem?.list[listItemIndex];

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                    expect(listItem).to.exist.and.to.be.an("object");
                                }));

                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));
                                }
                            });
                        }
                    }
                });
            })
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}
//fulfillmentsCommonTests
function fulfillmentsTests(message, messageTestSuite) {

    try {
        messageTestSuite.addTest(new Mocha.Test("'message.order.fulfillment' should be an array", function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message?.order?.fulfillments.forEach((it, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}]' should be an object`, function () {
                    expect(it).to.be.an("object").that.includes.all.keys("customer", "id");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer' should be an object`, function () {
                    expect(it.customer).to.be.an("object").that.includes.all.keys("contact");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact' should be an object`, function () {
                    expect(it.customer.contact).to.be.an("object");
                }));
                // messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact.email' should be a string`, function () {
                //     expect(it.customer.contact.email).to.be.a("string");
                // }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact.phone' should be a string`, function () {
                    expect(it.customer.contact.phone).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].id' should be a string`, function () {
                    expect(it.id).to.be.a("string");
                }));


            })
        }

    } catch (error) {
        console.log(error);
        return err;

    }
}
function xinputForGeneral(message, messageTestSuite) {
    try {

        if (message?.order && message?.order?.items) {
            messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array", function () {
                expect(message.order.items).to.be.an('array');
            }));
        }
        if (message?.order?.items && message?.order?.items?.length > 0) {
            message?.order?.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput' should be an object`, function () {
                    expect(item.xinput).to.exist.and.to.be.an("object");
                }));
                //item.xinput.head
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.head' should be an object`, function () {
                    expect(item.xinput.head).to.exist.and.to.be.an("object");
                }));
                //item.xinput.head.descriptor
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.head.descriptor' should be an object`, function () {
                    expect(item.xinput.head.descriptor).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.head.descriptor.name' should be a string`, function () {
                    expect(item.xinput.head.descriptor.name).to.exist.and.to.be.a("string");
                }));

                //item.xinput.head.index
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.head.index' should be an object`, function () {
                    expect(item.xinput.head.index).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.head.index.min' should be  number`, function () {
                    expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.head.index.cur' should be  number`, function () {
                    expect(item.xinput.head.index.cur).to.exist.and.to.be.a("number");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.head.index.max' should be  number`, function () {
                    expect(item.xinput.head.index.max).to.exist.and.to.be.a("number");
                }));
                //item.xinput.head.headings
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.head.headings' should be an array`, function () {
                    expect(item.xinput.head.headings).to.exist.and.to.be.an("array");
                }));
                if (item?.xinput?.head.headings && item?.xinput?.head.headings.length > 0) {
                    item?.xinput?.head.headings.forEach((heading, headinIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.head.headings[${headinIndex}]' should be a string`, function () {
                            expect(heading).to.exist.and.to.be.a("string");
                        }));
                    })
                }
                //item.xinput.form
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form' should be an object`, function () {
                    expect(item.xinput.form).to.exist.and.to.be.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form.id' should be a string`, function () {
                    expect(item.xinput.form.id).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form.mime_type' should be a string`, function () {
                    expect(item.xinput.form.mime_type).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].xinput.form.url' should be a valid URL`, function () {
                    expect(item.xinput.form.url).to.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/);
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form.resubmit' should be a boolean`, function () {
                    expect(item.xinput.form.resubmit).to.exist.and.to.be.a("boolean");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.form.multiple_sumbissions' should be a boolean`, function () {
                    expect(item.xinput.form.multiple_sumbissions).to.exist.and.to.be.a("boolean");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].xinput.required' should be a boolean`, function () {
                    expect(item.xinput.form).to.exist.and.to.be.an("object");
                }));
            })
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
function documentsTests(message, messageTestSuite) {
    if (message?.order?.documents && message?.order?.documentslength > 0) {
        messageTestSuite.addTest(new Mocha.Test("'message.order.documents' should be an array", function () {
            expect(message.order.documents).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        message?.order?.documents.forEach((document, index) => {
            messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.documents[${index}]'`, function () {
                expect(document).to.include.all.keys("descriptor", "mime_type", "url");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${index}].descriptor' should have property 'code'`, function () {
                expect(document.descriptor).to.have.property("code");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${index}].mime_type' should be a string`, function () {
                expect(document.mime_type).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${index}].url' should be a string and start with 'https://'`, function () {
                expect(document.url).to.be.a("string").and.to.match(/^https:\/\//);
            }));

            // Additional tests for document descriptor
            messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${index}].descriptor' should have property 'name'`, function () {
                expect(document.descriptor).to.have.property("name");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${index}].descriptor' should have property 'short_desc'`, function () {
                expect(document.descriptor).to.have.property("short_desc");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${index}].descriptor' should have property 'long_desc'`, function () {
                expect(document.descriptor).to.have.property("long_desc");
            }));
        });
    }
}
function onSearchtagsCommonTests(message, messageTestSuite) {
    try {
        const arr = [{ code: "BPP_TERMS" }];

        arr.forEach((ele) => {
            const tagIndex = message?.catalog?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
            const tagItem = message?.catalog?.tags[tagIndex];
            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags' should have an object of ${ele.code}`, function () {
                expect(tagItem).to.exist.and.to.be.an("object");
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


                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].descriptor.name' should be string '`, function () {
                    expect(tagItem.descriptor.name).to.be.a("string");
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].display' should be a boolean (OPTIONAL)`, function () {
                    expect(tagItem.display).to.be.a("boolean");
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list' should have be a non empty array`, function () {
                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                }));


                const array = [{ code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];

                if (array) {
                    array.forEach((it) => {
                        const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
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

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be string`, function () {
                                expect(listItem.descriptor.name).to.be.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                            }));

                        }
                    });
                }
            }
        });
    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = {
    xinputForSearch,
    descriptorInCatalog,
    paymentsTests,
    paymentsForSearch,
    quoteCommonTests,
    fulfillmentsTests,
    xinputForGeneral,
    documentsTests,
    onSearchtagsCommonTests

}