const Mocha = require('mocha');
const { expect } = require('chai');

function providerTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message.intent' should have a property 'provider' that should be an object", function () {
            expect(message.intent).to.have.a.property("provider").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.intent.provider' should be an object", function () {
            expect(message.intent.provider).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.id' should be a string (OPTIONAL)`, function () {
            expect(message.intent.provider.id).to.be.a('string');
        }));

        if (message?.intent?.provider?.items && message?.intent?.provider?.items.length > 0) {
            message?.intent?.provider?.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${i}].id' should be a string (OPTIONAL)`, function () {
                    expect(item.id).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${i}].xinput' should be an object`, function () {
                    expect(item.xinput).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${i}].xinput.form' should be an object`, function () {
                    expect(item.xinput.form).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${i}].xinput.form.id' should be a string (OPTIONAL)`, function () {
                    expect(item.xinput.form.id).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${i}].xinput.form_response' should be an object (OPTIONAL)`, function () {
                    expect(item.xinput.form_response).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${i}].xinput.form_response.status' should be a string`, function () {
                    expect(item.xinput.form_response.status).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${i}].xinput.form_response.status' should be one of [ 'APPROVED', 'SUCCESS', 'EXPIRED', 'REJECTED', 'PENDING' ]`, function () {
                    expect(item.xinput.form_response.status).to.be.oneOf(['APPROVED', 'SUCCESS', 'EXPIRED', 'REJECTED', 'PENDING']);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.intent.provider.items[${i}].xinput.form_response.submission_id' should be a string (OPTIONAL)`, function () {
                    expect(item.xinput.form_response.submission_id).to.be.a('string');
                }));
            });
        }
    } catch (error) {
        console.error('Error in ProviderTest:', error);
    }

    return messageTestSuite;
}
function itemsCommonFieldsTests(message, messageTestSuite) {
    //Use this function for items,which includes addons in it
    try {
        messageTestSuite.addTest(new Mocha.Test("Verify that 'message.order' has a 'items' property that is an array and is not empty", function () {
            expect(message.order).to.have.property("items").that.is.an("array").and.is.not.empty;
        }));
        if (message?.order?.items && message?.order?.items?.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an("object").that.includes.all.keys("add_ons", "id", "parent_item_id");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].id' should be an string`, function () {
                    expect(item.id).to.be.an("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].parent_item_id' should be an string`, function () {
                    expect(item.parent_item_id).to.be.an("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].add_ons' should be an array`, function () {
                    expect(item.add_ons).to.be.an("array");
                }));

                if (item.add_ons && item.add_ons.length > 0) {
                    item.add_ons.forEach((data, d) => {
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].add_ons[${d}]' should be an object`, function () {
                            expect(data).to.be.an("object").that.includes.all.keys("id", "quantity");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].add_ons[${d}].id' should be a string (OPTIONAL)`, function () {
                            expect(data.id).to.be.an("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].add_ons[${d}].quantity' should be an object`, function () {
                            expect(data.quantity).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].add_ons[${d}].quantity.selected' should be an object`, function () {
                            expect(data.quantity.selected).to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].add_ons[${d}].quantity.selected.count' should be a number (OPTIONAL)`, function () {
                            expect(data.quantity.selected.count).to.be.an("number");
                        }));

                    })
                }
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

}
function xinputOnStatusGeneral(message, messageTestSuite) {

    try {

        message?.order?.items.forEach((item, i) => {

            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].xinput' should be an object`, function () {
                expect(item.xinput).to.be.an("object").that.includes.all.keys("form", "form_response");
            }));
            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].xinput.form' should be an object`, function () {
                expect(item.xinput.form).to.be.an("object");
            }));
            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].xinput.form.id' should be an string`, function () {
                expect(item.xinput.form.id).to.be.an("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}]xinput.form_response' should be an object`, function () {
                expect(item.xinput.form_response).to.be.an("object").that.includes.all.keys("status", "submission_id");
            }));
            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].xinput.form_respose.status' should be an string`, function () {
                expect(item.xinput.form_response.status).to.be.an("string");
            }));
            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].xinput.form_respose.submission_id' should be an string`, function () {
                expect(item.xinput.form_response.submission_id).to.be.an("string");
            }));
        })
    } catch (error) {
        console.log(error);
        return error;

    }
}
function itemsWithXinputTests(message, messageTestSuite) {
    try {
        itemsCommonFieldsTests(message, messageTestSuite);
        xinputOnStatusGeneral(message, messageTestSuite);
    } catch (err) {
        console.log(err);
        return err;
    }
}

//Fulfillments are present in select of Health insurance
function fulfillmentsTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillment' should be an array`, function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message?.order?.fulfillments.forEach((it, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}]' should be an object`, function () {
                    expect(it).to.be.an("object").that.includes.all.keys("customer");
                }));

                if (it?.id) {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].id' should be a string`, function () {
                        expect(it.id).to.be.a("string");
                    }));
                }
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer' should be an object`, function () {
                    expect(it.customer).to.be.an("object").that.includes.all.keys("contact", "person");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact' should be an object`, function () {
                    expect(it.customer.contact).to.be.an("object").that.includes.all.keys("email", "phone");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact.email' should be a string`, function () {
                    expect(it.customer.contact.email).to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.contact.phone' should be a string`, function () {
                    expect(it.customer.contact.phone).to.be.a("string");
                }));
                if (it?.person) {
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillment[${i}].customer.person' should be an object`, function () {
                        expect(it.customer.person).to.be.an("object").that.includes.a.key("name");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.fulfillments[${i}].customer.person.name' should be a string`, function () {
                        expect(it.customer.person.name).to.be.a("string");
                    }));
                }
            })
        }

    } catch (error) {
        console.log(error);
        return err;

    }
}

function providerWithID(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.provider' should be an object`, function () {
            expect(message.order.provider).to.be.an("object").that.includes.a.key("id");
        }));
        messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.provider.id' should be a string`, function () {
            expect(message.order.provider.id).to.be.a("string");
        }));
    } catch (err) {
        console.log(err);
        return err;
    }
}

function paymentsCommonTests(message, messageTestSuite, { step, settlementAmount, previous_on_init_payment_id }) {
    try {
        const buyerFinderFeeAndSettlementTermsObj = message?.order?.payments.find((payment) => payment?.tags);

        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments' have a payment object containing Buyer Finder Fee and Settlement Terms`, function () {
            expect(buyerFinderFeeAndSettlementTermsObj).to.exist.and.to.be.an("object");
        }));

        message?.order?.payments.forEach((payment, index) => {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should be an object`, function () {
                expect(payment).to.exist.and.to.be.an("object");
            }));

            if (payment?.tags) {
                switch (step) {
                    case "I":
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have all the required keys`, function () {
                            expect(payment).to.includes.all.keys("collected_by", "type", "status", "params", "tags");
                        }));
                        break;
                    default:
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}]' should have all the required keys`, function () {
                            expect(payment).to.includes.all.keys("collected_by", "type", "status", "params", "tags");
                        }));
                        // messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].id' should exist and should be a string`, function () {
                        //     expect(payment.id).to.exist.and.to.be.a("string").that.is.not.empty;
                        // }));
                        // messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].id' should exist and be equal to the 'payments.id' sent in the last on_init which is ${previous_on_init_payment_id}`, function () {
                        //     expect(payment.id).to.be.equal(previous_on_init_payment_id);
                        // }));
                        break;
                }

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
                    expect(payment.type).to.be.oneOf(["PRE-ORDER", "PRE-FULFILLMENT", "ON-FULFILLMENT", "POST-FULFILLMENT", "ON-ORDER", "PRE_ORDER", "PRE_FULFILLMENT", "ON_FULFILLMENT", "POST_FULFILLMENT", "ON_ORDER"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].status' should exist and should be a string (OPTIONAL)`, function () {
                    expect(payment.status).to.exist.and.to.be.a("string").that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].status' should be one of [ "PAID", "NOT-PAID", "DELAYED", "DEFERRED" ] (OPTIONAL)`, function () {
                    expect(payment.status).to.be.oneOf(["PAID", "NOT-PAID", "DELAYED", "DEFERRED"]);
                }));

                switch (step) {
                    case "I":
                        break;
                    default:
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params' should exist and should be an object (OPTIONAL)`, function () {
                            expect(payment.params).to.exist.and.to.be.an("object");
                        }));

                        if (payment?.status === "PAID") {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params' should include all the required keys (OPTIONAL)`, function () {
                                expect(payment.params).to.includes.all.keys("amount", "currency", "transaction_id", "bank_code", "bank_account_number");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params.transaction_id' should exist and should be a string that is not empty`, function () {
                                expect(payment.params.transaction_id).to.exist.and.to.be.a("string").that.is.not.empty;
                            }));
                        } else {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params' should include all the required keys (OPTIONAL)`, function () {
                                expect(payment.params).to.includes.all.keys("amount", "currency", "bank_code", "bank_account_number");
                            }));
                        }

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params.amount' should exist and should be a string that is not empty (OPTIONAL)`, function () {
                            expect(payment.params.amount).to.exist.and.to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params.currency' should exist and should be a string that is not empty (OPTIONAL)`, function () {
                            expect(payment.params.currency).to.exist.and.to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params.bank_code' should exist and should be a string that is not empty (OPTIONAL)`, function () {
                            expect(payment.params.bank_code).to.exist.and.to.be.a("string").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].params.bank_account_number' should exist and should be a string that is not empty (OPTIONAL)`, function () {
                            expect(payment.params.bank_account_number).to.exist.and.to.be.a("string").that.is.not.empty;
                        }));
                        break;
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags' should exist and should be an array that is not empty`, function () {
                    expect(payment.tags).to.exist.and.to.be.an("array").that.is.not.empty;
                }));

                const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];

                arr.forEach((ele) => {
                    const tagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                    const tagItem = payment?.tags[tagIndex];
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    }));

                    if (tagIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                            expect(tagItem).to.have.property("descriptor").that.is.an("object");
                            expect(tagItem).to.have.property("display").that.is.a("boolean");
                            expect(tagItem).to.have.property("list").that.is.an("array");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                            expect(tagItem.descriptor.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}].display' should have be equal to false`, function () {
                            expect(tagItem.display).to.be.equal(false);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));

                        const settlementTermsArr = [{ code: "DELAY_INTEREST", name: "delay interest" }, { code: "STATIC_TERMS", name: "static terms" }, { code: "SETTLEMENT_AMOUNT", name: "settlement amount" }, { code: "SETTLEMENT_TYPE", name: "settlement type" }, { code: "OFFLINE_CONTRACT", name: "offline contract" }];

                        const buyerFinderFeeType = tagItem?.list?.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
                        const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }]
                        const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];

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

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                    expect(listItem).to.exist.and.to.be.an("object");
                                }));

                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));

                                    switch (listItem?.descriptor?.code) {
                                        case "SETTLEMENT_AMOUNT":
                                            const ceilVal = Math.ceil(Number(settlementAmount))
                                            const floorVal = Math.floor(Number(settlementAmount))
                                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${tagIndex}].list[${listItemIndex}].value' and to be one of ${[ceilVal.toString(), floorVal.toString(), settlementAmount]} (SETTLEMENT_AMOUNT)`, function () {
                                                expect(listItem.value).and.to.be.oneOf([ceilVal.toString(), floorVal.toString(), settlementAmount]);
                                            }));
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            });
                        }
                    }
                });
            }
        })
    } catch (err) {
        console.log(err);
        return err;
    }
}
function quoteCommonTests(message, messageTestSuite) {
    try {

        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'quote' which is a object", function () {
            expect(message.order).to.have.a.property("quote").that.is.a("object");
        }));

        const arr = [
            { title: "BASE_PRICE", name: "base price" },
            { title: "TAX", name: "tax" },
            { title: "PROCESSING_FEE", name: "processing fee" }
            // { title: "CONVIENCE_FEE", name: "convience fee" },
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
                    // expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                    expect(breakupItem).to.have.property("title").that.is.an("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string (OPTIONAL)`, function () {
                    expect(breakupItem.price).to.have.property("value").that.is.an("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}' (OPTIONAL)`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));
            }
        })

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote' should have a property named as 'price' which is an object", function () {
            expect(message.order.quote).to.have.a.property("price").that.is.a("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote.price' should have a property named as 'currency' which is an string (OPTIONAL)", function () {
            expect(message.order.quote.price).to.have.a.property("currency").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(" 'message.order.quote.price' should have a property named as 'value' which is an string (OPTIONAL)", function () {
            expect(message.order.quote.price).to.have.a.property("value").that.is.a("string");
        }));

    } catch (error) {
        return err;
    }
}

module.exports = {
    providerTests,
    itemsCommonFieldsTests,
    xinputOnStatusGeneral,
    itemsWithXinputTests,
    fulfillmentsTests,
    providerWithID,
    paymentsCommonTests,
    quoteCommonTests

};
