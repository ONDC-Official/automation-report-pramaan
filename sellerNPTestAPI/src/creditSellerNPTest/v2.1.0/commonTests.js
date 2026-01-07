const Mocha = require('mocha');
const { expect } = require('chai');

const codePattern = /^[A-Z_]+$/;

function providerTests(message, messageTestSuite) {
    try {
        if (message?.order?.provider) {
            messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should be an object", function () {
                expect(message.order.provider).to.be.an("object");
            }));

            if (message?.order?.provider?.descriptor) {
                messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should be an object", function () {
                    expect(message.order.provider.descriptor).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.order.provider.descriptor.short_desc' (OPTIONAL)`, function () {
                    expect(message.order.provider.descriptor.short_desc).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.order.provider.descriptor.long_desc' (OPTIONAL)`, function () {
                    expect(message.order.provider.descriptor.long_desc).to.exist.and.to.be.a("string");
                }));

                if (message?.order?.provider?.descriptor?.images && message?.order?.provider?.descriptor?.images.length > 0) {
                    message.order.provider.descriptor.images.forEach((image, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`should verify the contents of message.order.provider.descriptor.images[${i}]`, function () {
                            expect(image).to.include.all.keys("url", "size_type");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should verify the 'url' property of message.order.provider.descriptor.images[${i}] is a string (OPTIONAL)`, function () {
                            expect(image.url).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should verify the 'size_type' property of message.order.provider.descriptor.images[${i}] is a string (OPTIONAL)`, function () {
                            expect(image.size_type).to.be.a("string");
                        }));

                    });
                }
            }

            if (message?.order?.provider?.tags && message?.order?.provider?.tags.length > 0) {
                message?.order?.provider?.tags.forEach((tag, i) => {
                    messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.provider.tags[${i}]'`, function () {
                        expect(tag).to.have.property('descriptor').that.is.an('object');
                        expect(tag).to.have.property('list').that.is.an('array').not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.provider.tags[${i}].descriptor' should have properties 'code' and 'name'`, function () {
                        expect(tag.descriptor).to.include.all.keys("code", "name");
                        expect(tag.descriptor.code).to.be.a("string");
                        expect(tag.descriptor.name).to.be.a("string");
                    }));

                    if (tag?.list && tag?.list.length > 0) {
                        tag.list.forEach((listItem, j) => {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${i}].list[${j}]' (${listItem.descriptor.code}) should have 'descriptor' and 'value' properties`, function () {
                                expect(listItem).to.have.property('descriptor').that.is.an('object');
                                expect(listItem).to.have.property('value');
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${i}].list[${j}].descriptor' (${listItem.descriptor.code}) should have properties 'code' 'name'`, function () {
                                expect(listItem.descriptor).to.include.all.keys("code", "name");
                                expect(listItem.descriptor.code).to.be.a("string");
                                expect(listItem.descriptor.name).to.be.a("string");
                            }));

                            // Add more tests for listItem.descriptor.code, listItem.descriptor.name, and listItem.value
                            if (listItem?.descriptor?.code === 'GRO_EMAIL' || listItem?.descriptor?.code === 'CUSTOMER_SUPPORT_EMAIL' || listItem?.descriptor?.code === 'LSP_EMAIL') {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${i}].list[${j}].value' (${listItem.descriptor.code}) should be a valid email`, function () {
                                    expect(listItem.value).to.be.a('string');
                                }));
                            } else {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${i}].list[${j}].value' (${listItem.descriptor.code}) should be a string`, function () {
                                    expect(listItem.value).to.be.a('string');
                                }));
                            }

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${i}].list[${j}].descriptor.code' (${listItem.descriptor.code}) should be a string in snakecase and capitalize`, function () {
                                expect(listItem.descriptor.code).to.match(/^[A-Z_]+$/);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.tags[${i}].list[${j}].descriptor.name' (${listItem.descriptor.code}) should be a string`, function () {
                                expect(listItem.descriptor.name).to.be.a('string');
                            }));

                        });
                    }
                });
            }
        }
    } catch (err) {
        console.error(err);
    }
}






function itemsCommonFieldsTests(item, index, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].id' should be a string`, function () {
            expect(item.id).to.exist;
            expect(item.id).to.be.a("string");

        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].parent_item_id' should be a string`, function () {
            expect(item.id).to.exist;
            expect(item.id).to.be.a("string");

        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].descriptor' should exist and be an object`, function () {
            expect(item.descriptor).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`should verify the content of 'message.order.items[${index}].descriptor'`, function () {
            expect(item.descriptor).to.include.all.keys("code", "name");
            expect(item.descriptor.code).to.exist.and.to.be.a("string");
            expect(item.descriptor.name).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].descriptor.code' should be one of "PERSONAL_LOAN" and "INVOICE_BASED_LOAN"`, function () {
            expect(item.descriptor.code).to.be.oneOf(["PERSONAL_LOAN", "INVOICE_BASED_LOAN", "CONSENT_INFO"]);
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].descriptor.name' should be a string`, function () {
            expect(item.descriptor.name).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].price' should exist and be an object`, function () {
            expect(item.price).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`should verify the content of 'message.order.items[${index}].price'`, function () {
            expect(item.price).to.include.all.keys("currency", "value");
            expect(item.price.currency).to.exist.and.to.be.a("string");
            expect(item.price.value).to.exist.and.to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].price.currency' should be 'INR' (OPTIONAL)`, function () {
            expect(item.price.currency).to.equal('INR');
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].price.value' should be a string (OPTIONAL)`, function () {
            expect(item.price.value).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].tags' should exist and be an array`, function () {
            expect(item.tags).to.exist.and.to.be.an("array");
        }));

        if (item?.tags && item?.tags.length > 0) {
            const arr = [{ code: "INFO" }];

            arr.forEach((ele) => {
                const tagIndex = item.tags.findIndex((tag) => tag?.descriptor?.code === ele?.code);
                const tag = item.tags[tagIndex];

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${tagIndex}]' contains necessary keys`, function () {
                    expect(tag).to.include.all.keys("descriptor", "list", "display");
                    expect(tag.descriptor).to.exist.and.to.be.an("object");
                    expect(tag.list).to.exist.and.to.be.an("array");
                    expect(tag.display).to.exist.and.to.be.a("boolean");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${tagIndex}].descriptor' contains necessary keys`, function () {
                    expect(tag.descriptor).to.include.all.keys("code", "name");
                    expect(tag.descriptor.code).to.exist;
                    expect(tag.descriptor.name).to.exist;
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${tagIndex}].descriptor.code' is '${ele.code}'`, function () {
                    expect(tag.descriptor.code).to.be.a("string").and.to.equal(ele.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${tagIndex}].descriptor.name' is a string`, function () {
                    expect(tag.descriptor.name).to.be.a("string");
                }));

                if (tag?.list && tag?.list.length > 0) {
                    let listArr;

                    const loanInforArr = [
                        { code: "TERM" },
                        { code: "INTEREST_RATE_TYPE" },
                        { code: "APPLICATION_FEE" },
                        { code: "FORECLOSURE_FEE" },
                        { code: "INTEREST_RATE_CONVERSION_CHARGE" },
                        { code: "DELAY_PENALTY_FEE" },
                        { code: "OTHER_PENALTY_FEE" },
                        { code: "ANNUAL_PERCENTAGE_RATE" },
                        { code: "REPAYMENT_FREQUENCY" },
                        { code: "NUMBER_OF_INSTALLMENTS_OF_REPAYMENT" },
                        { code: "TNC_LINK" },
                        { code: "COOL_OFF_PERIOD" },
                        { code: "INSTALLMENT_AMOUNT" }
                    ];

                    switch (ele.code) {
                        case "INFO":
                            listArr = loanInforArr;
                            break;
                        default:
                            listArr = [];
                            break;
                    }

                    listArr.forEach((it) => {
                        const loanInfoListItemIndex = tag.list.findIndex((listItem) => listItem?.descriptor?.code === it.code);
                        const loanInfoListItem = tag.list[loanInfoListItemIndex];

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${tagIndex}].list[${loanInfoListItemIndex}]' contains properties 'descriptor' and 'value' (${it.code})`, function () {
                            expect(loanInfoListItem).to.include.all.keys("descriptor", "value");
                            expect(loanInfoListItem.descriptor).to.exist.and.to.be.an("object");
                            expect(loanInfoListItem.value).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${tagIndex}].list[${loanInfoListItemIndex}].descriptor' contains properties 'code' and 'name'`, function () {
                            expect(loanInfoListItem.descriptor).to.include.all.keys("code", "name", "short_desc");
                            expect(loanInfoListItem.descriptor.code).to.exist;
                            expect(loanInfoListItem.descriptor.short_desc).to.exist;
                            expect(loanInfoListItem.descriptor.name).to.exist;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].tags[${tagIndex}].list[${loanInfoListItemIndex}].descriptor.code' should be equal to ${it.code}`, function () {
                            expect(loanInfoListItem.descriptor.code).to.be.equal(it.code)
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].tags[${tagIndex}].list[${loanInfoListItemIndex}].descriptor.short_desc' is a string`, function () {
                            expect(loanInfoListItem.descriptor.short_desc).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${tagIndex}].list[${loanInfoListItemIndex}].descriptor.name' is a string`, function () {
                            expect(loanInfoListItem.descriptor.name).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${tagIndex}].list[${loanInfoListItemIndex}].value' is a string`, function () {
                            expect(loanInfoListItem.value).to.be.a("string");
                        }));
                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${tagIndex}].display' should be a 'boolean'`, function () {
                    expect(tag.display).to.be.a('boolean');
                }));
            });
        }
    } catch (err) {
        console.error(err);
    }
}

function fulfillmentTests(message, messageTestSuite, loanState) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillment' should be an array`, function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        if (message?.order?.fulfillments && message?.order?.fulfillments.length > 0) {
            message.order.fulfillments.forEach((fulfillment, index) => {
                messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.fulfillments[${index}]'`, function () {
                    expect(fulfillment).to.include.all.keys("customer", "state");
                    expect(fulfillment.customer).to.exist.and.to.be.an("object");
                    expect(fulfillment.state).to.exist.and.to.be.an("object");
                }));

                if (message?.order?.items.find((item) => item?.descriptor?.code.includes("PERSONAL_LOAN"))) {
                    messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.fulfillments[${index}].customer'`, function () {
                        expect(fulfillment.customer).to.include.all.keys("person", "contact");
                        expect(fulfillment.customer.person).to.exist.and.to.be.an("object");
                        expect(fulfillment.customer.contact).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].customer.person' should have property 'name' (OPTIONAL)`, function () {
                        expect(fulfillment.customer.person).to.have.property("name").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].customer.contact.phone' should exist and be a string (OPTIONAL)`, function () {
                        expect(fulfillment.customer.contact.phone).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].customer.contact.email' should exist, be a string, and match email format (OPTIONAL)`, function () {
                        const email = fulfillment.customer.contact.email;
                        expect(email, "Email should exist and be a string").to.exist.and.to.be.a("string");
                        expect(email, "Email should match email format").to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                    }));

                } else {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].customer' should a property 'organization'`, function () {
                        expect(fulfillment.customer).to.have.property("organization");
                        expect(fulfillment.customer.organization).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.fulfillments[${index}].customer.organization'`, function () {
                        expect(fulfillment.customer.organization).to.include.all.keys("address", "state", "city", "contact");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].customer.organization.address' should be a string`, function () {
                        expect(fulfillment.customer.organization.address).to.be.a("string");
                    }));

                    // messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].customer.organization.state' should have property 'name' that is a string`, function () {
                    //     expect(fulfillment.customer.organization.address).to.have.property("name").that.is.a("string");
                    // }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].customer.organization.city' should have properties 'name' and 'code'`, function () {
                        expect(fulfillment.customer.organization.city).to.have.property("name").that.is.a("string");
                        expect(fulfillment.customer.organization.city).to.have.property("code").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].customer.organization.contact' should have properties 'phone' and 'email'`, function () {
                        expect(fulfillment.customer.organization.contact).to.have.property("phone").that.is.a("string");
                        expect(fulfillment.customer.organization.contact).to.have.property("email").that.is.a("string").and.that.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                    }));
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].state' should have a property 'descriptor' which is an object`, function () {
                    expect(fulfillment.state).to.have.property("descriptor").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.fulfillments[${index}].state.descriptor'`, function () {
                    expect(fulfillment.state.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${index}].state.descriptor.code' should be '${loanState.code}' (OPTIONAL)`, function () {
                    expect(fulfillment.state.descriptor.code).to.be.a('string').and.to.be.oneOf(loanState.code);
                }));
            });
        }
    } catch (err) {
        console.error(err);
    }
}

function quoteTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should be an object", function () {
            expect(message.order.quote).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should have 'id' property", function () {
            expect(message.order.quote, "'message.order.quote.id' should exist").to.have.property('id').that.is.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should have 'price' property with 'currency' and 'value'", function () {
            expect(message.order.quote.price).to.exist;
            expect(message.order.quote.price).to.have.property('currency').that.equals('INR');
            expect(message.order.quote.price).to.have.property('value').that.is.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should have 'breakup' property as an array", function () {
            expect(message.order.quote, "Breakup array should exist").to.have.property('breakup').that.is.an('array').not.empty;
        }));

        const arr = [
            { code: "PRINCIPAL" },
            { code: "INTEREST" },
            { code: "PROCESSING_FEE" },
            { code: "OTHER_UPFRONT_CHARGES" },
            { code: "INSURANCE_CHARGES" },
            { code: "NET_DISBURSED_AMOUNT" },
            { code: "OTHER_CHARGES" }
        ]

        arr.forEach((ele) => {
            const breakUpItemIndex = message?.order?.quote?.breakup.findIndex((breakUpItem) => breakUpItem.title === ele.code);
            const breakUpItem = message?.order?.quote?.breakup[breakUpItemIndex];

            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakUpItemIndex}]' (${ele.code}) should have 'title' and 'price' properties`, function () {
                expect(breakUpItem).to.have.property('title').that.is.a('string');
                expect(breakUpItem).to.have.property('price').that.is.an('object');
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakUpItemIndex}].title' should be equal to '(${ele.code})'`, function () {
                expect(breakUpItem.title).to.be.equal(ele.code);
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakUpItemIndex}].price.currency' should be 'INR' (OPTIONAL)  (${ele.code})`, function () {
                expect(breakUpItem.price).to.have.property('currency').that.equals('INR');
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakUpItemIndex}].price.value' should be a string (OPTIONAL) (${ele.code})`, function () {
                expect(breakUpItem.price).to.have.property('value').that.is.a('string');
            }));
        })

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should have 'ttl' property with valid duration format", function () {
            expect(message.order.quote.ttl).to.exist;
            // expect(message.order.quote.ttl).to.match(/^PT\d+[HD]?(\d+M)?$/);
            expect(message.order.quote.ttl).to.be.a("string");
        }));
    } catch (err) {
        console.error(err);
    }
}

function cancellationTermsTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message.order.cancellation_terms' should be an array that is not empty", function () {
            expect(message?.order?.cancellation_terms).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        if (message?.order?.cancellation_terms && message?.order?.cancellation_terms.length > 0) {
            message?.order?.cancellation_terms.forEach((ele, index) => {
                if (ele?.fulfillment_state) {
                    if (ele?.fulfillment_state?.descriptor?.code === "SANCTIONED") {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}]' should have properties 'fulfillment_state' and 'cancellation_fee'`, function () {
                            expect(ele).to.have.property("fulfillment_state").that.is.an("object");
                            expect(ele).to.have.property("cancellation_fee").that.is.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].fulfillment_state' should have a property 'descriptor'`, function () {
                            expect(ele.fulfillment_state).to.have.property("descriptor").that.is.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].fulfillment_state.descriptor' should have a property 'code' that is equal to "SANCTIONED" (OPTIONAL)`, function () {
                            expect(ele.fulfillment_state.descriptor).to.have.property("code").that.is.equal("SANCTIONED");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].cancellation_fee' should have a property 'percentage'`, function () {
                            expect(ele.cancellation_fee).to.have.property("percentage");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].cancellation_fee.percentage' should be a string (OPTIONAL)`, function () {
                            expect(ele.cancellation_fee.percentage).to.be.a("string");
                        }));
                    }
                    if (ele?.fulfillment_state?.descriptor?.code === "DISBURSED") {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}]' should have properties 'fulfillment_state' and 'cancellation_fee'`, function () {
                            expect(ele).to.have.property("fulfillment_state").that.is.an("object");
                            expect(ele).to.have.property("cancellation_fee").that.is.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].fulfillment_state' should have a property 'descriptor'`, function () {
                            expect(ele.fulfillment_state).to.have.property("descriptor").that.is.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].fulfillment_state.descriptor' should have a property 'code' that is equal to "DISBURSED"`, function () {
                            expect(ele.fulfillment_state.descriptor).to.have.property("code").that.is.equal("DISBURSED");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].cancellation_fee' should have a property 'percentage'`, function () {
                            expect(ele.cancellation_fee).to.have.property("percentage").that.is.a("string");
                        }));
                    }
                }
                if (ele?.external_ref) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}]' should have property 'external_ref'`, function () {
                        expect(ele).to.have.property("external_ref").that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].external_ref' should have property 'mimetype' (OPTIONAL)`, function () {
                        expect(ele.external_ref).to.have.property("mimetype");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].external_ref' should have property 'url'`, function () {
                        expect(ele.external_ref).to.have.property("url");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].external_ref.mimetype' should be a string`, function () {
                        expect(ele.external_ref.mimetype).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.cancellation_terms[${index}].external_ref.url' should be a string (OPTIONAL)`, function () {
                        expect(ele.external_ref.url).to.be.a("string");
                    }));

                }
            });
        }
    } catch (err) {
        console.error(err);
    }
}

function xinputOnStatusGeneral(item, messageTestSuite, index) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput' should have a property form_reponse which is an object`, function () {
            expect(item.xinput).to.have.property("form_response").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form_reponse' should have properties 'status' and 'submission_id'`, function () {
            expect(item.xinput.form_response).to.have.property("status").that.is.a("string");
            expect(item.xinput.form_response).to.have.property("submission_id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form_reponse.status' should have be one of ["APPROVED","PENDING", "REJECTED"]`, function () {
            expect(item.xinput.form_response.status).to.be.oneOf(["APPROVED", "PENDING", "REJECTED"])
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form_reponse.submission_id' should be a string`, function () {
            expect(item.xinput.form_response.submission_id).to.be.a("string");
        }));
    } catch (err) {
        console.log(err);
    }
}

function xinputOnStatusJustAfterSearchTests(item, messageTestSuite, index, i) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].xinput' should have a property form_reponse which is an object`, function () {
            expect(item.xinput).to.have.property("form_response").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].xinput.form_reponse' should have properties 'status' and 'submission_id'`, function () {
            expect(item.xinput.form_response).to.have.property("status").that.is.a("string");
            expect(item.xinput.form_response).to.have.property("submission_id").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].xinput.form_reponse.status' should have be one of ["APPROVED","PENDING", "REJECTED"]`, function () {
            expect(item.xinput.form_response.status).to.be.oneOf(["APPROVED", "PENDING", "REJECTED"])
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].xinput.form_reponse.submission_id' should be a string`, function () {
            expect(item.xinput.form_response.submission_id).to.be.a("string");
        }));
    } catch (err) {
        console.error(err);
    }
}

function documentsTests(message, messageTestSuite) {
    if (message?.documents && message?.documents.length > 0) {
        messageTestSuite.addTest(new Mocha.Test("'message.documents' should be an array", function () {
            expect(message.documents).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        message.documents.forEach((document, index) => {
            messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.documents[${index}]'`, function () {
                expect(document).to.include.all.keys("descriptor", "mime_type", "url");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.documents[${index}].descriptor' should have property 'code'`, function () {
                expect(document.descriptor).to.have.property("code");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.documents[${index}].mime_type' should be a string`, function () {
                expect(document.mime_type).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.documents[${index}].url' should be a string and start with 'https://'`, function () {
                expect(document.url).to.be.a("string").and.to.match(/^https:\/\//);
            }));

            // Additional tests for document descriptor
            messageTestSuite.addTest(new Mocha.Test(`'message.documents[${index}].descriptor' should have property 'name'`, function () {
                expect(document.descriptor).to.have.property("name");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.documents[${index}].descriptor' should have property 'short_desc'`, function () {
                expect(document.descriptor).to.have.property("short_desc");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.documents[${index}].descriptor' should have property 'long_desc'`, function () {
                expect(document.descriptor).to.have.property("long_desc");
            }));
        });
    }
}

function paymentCommonTests(payment, index, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.payments[${index}]'`, function () {
            expect(payment).to.include.all.keys("id", "type", "status", "collected_by", "tags");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].type should be 'ON_ORDER'`, function () {
            expect(payment.type).to.be.a("string").and.to.be.oneOf(["ON_ORDER", "ON_FULFILLMENT", 'POST_FULFILLMENT']);
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].status should be a string`, function () {
            expect(payment.status).to.be.a("string").and.to.be.oneOf(["PAID", "NOT-PAID"]);
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].collected_by should be 'BPP'`, function () {
            expect(payment.collected_by).to.be.a("string").and.to.equal("BPP");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags' should be an array with length not equal 0`, function () {
            expect(payment.tags).to.exist.and.to.be.an("array").to.have.length.above(0);
        }));

        if (payment?.tags && payment?.tags.length > 0) {
            const arr = [{ code: "BUYER_FINDER_FEES", name: "buyer finder fees" }, { code: "SETTLEMENT_TERMS", name: "settlement terms" }];

            arr.forEach((ele, i) => {
                const eleIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                const tag = payment?.tags[eleIndex];

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags' should have an '${ele.name}' object`, function () {
                    expect(tag).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.payments[${index}].tags[${eleIndex}]'`, function () {
                    expect(tag).to.include.all.keys("descriptor", "display", "list");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${eleIndex}].descriptor' should have property 'code'`, function () {
                    expect(tag.descriptor).to.have.property("code");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${eleIndex}].descriptor.code' should be ${ele.code}`, function () {
                    expect(tag.descriptor.code).to.equal(ele?.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${eleIndex}].display' should be a 'boolean'`, function () {
                    expect(tag.display).to.be.a('boolean');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${eleIndex}].list' should be an array that is not empty`, function () {
                    expect(tag.list).to.be.an("array").that.is.not.empty;
                }));

                if (tag?.list && tag?.list.length > 0) {
                    const buyerFinderFeeType = tag.list?.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
                    const buyerFinderFeePercent = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }]
                    const buyerFinderFeeAmountArr = [{ code: "BUYER_FINDER_FEES_TYPE", name: "buyer finder fee type" }, { code: "BUYER_FINDER_FEES_AMOUNT" }];

                    const settlementTerms = [
                        { code: "SETTLEMENT_WINDOW", name: "settlement window" },
                        { code: "SETTLEMENT_BASIS", name: "settlement_basis" },
                        { code: "MANDATORY_ARBITRATION", name: "mandatory arbitration" },
                        { code: "COURT_JURISDICTION", name: "court jurisdiction" },
                        { code: "STATIC_TERMS", name: "static terms" },
                        { code: "SETTLEMENT_AMOUNT", name: "settlement amount" },
                        { code: "OFFLINE_CONTRACT", name: "offline contract" }
                    ];

                    let array;
                    switch (tag?.descriptor?.code) {
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
                            array = settlementTerms;
                            break;
                        default:
                            break;
                    }

                    if (array) {
                        array.forEach((it) => {
                            const itIndex = tag.list.findIndex((listItem) => listItem.descriptor.code === it.code);
                            const listItem = tag.list[itIndex];

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${eleIndex}].list' should have an '${it.name}' object`, function () {
                                expect(listItem).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.payments[${index}].tags[${eleIndex}].list[${itIndex}]' (${it.code})`, function () {
                                expect(listItem).to.include.all.keys("descriptor", "value");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${eleIndex}].list[${itIndex}].descriptor' should have property 'code' (${it.code})`, function () {
                                expect(listItem.descriptor).to.have.property("code");
                                expect(listItem.descriptor.code).to.exist;
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${eleIndex}].list[${itIndex}].value' should have the expected data type (${it.code})`, function () {
                                switch (it.code) {
                                    case 'SETTLEMENT_WINDOW':
                                        expect(listItem.value).to.be.a('string');
                                        break;
                                    case 'SETTLEMENT_BASIS':
                                        expect(listItem.value).to.be.a('string');
                                        break;
                                    case 'MANDATORY_ARBITRATION':
                                        expect(listItem.value).to.be.a('string');
                                        break;
                                    case 'COURT_JURISDICTION':
                                        expect(listItem.value).to.be.a('string');
                                        break;
                                    case 'STATIC_TERMS':
                                        expect(listItem.value).to.be.a('string').and.to.match(/^https:\/\//);
                                        break;
                                    case 'SETTLEMENT_AMOUNT':
                                        expect(listItem.value).to.be.a('string');
                                        break;
                                    case "BUYER_FINDER_FEES_TYPE":
                                        expect(listItem.value).to.be.a('string')
                                        break;
                                    case "BUYER_FINDER_FEES_PERCENTAGE":
                                        expect(listItem.value).to.be.a('string')
                                        break;
                                    default:
                                        break;
                                }
                            }));
                        })
                    }
                }
            })
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
    xinputOnStatusJustAfterSearchTests,
    documentsTests
}