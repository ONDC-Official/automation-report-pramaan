const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const { xinputOnStatusJustAfterSearchTests } = require("./commonTests");
const response_verification = require("../../centralizedUtilities/responseVerification");

const codePattern = /^[A-Z_]+$/;

function messageTests(message, action = "on_search") {
    try {
        
        const messageTestSuite = new Mocha.Suite("Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("should have 'message' properties", function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }))

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property of 'catalog'", function () {
            expect(message).to.have.property("catalog");
            expect(message.catalog).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.catalog' should have properties 'descriptor' and 'providers'", function () {
            expect(message.catalog).to.include.all.keys("descriptor", "providers");
            expect(message.catalog.descriptor).to.exist;
            expect(message.catalog.providers, "message.catalog.providers should not be empty").is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.catalog.descriptor' should have a property 'name' which is a string", function () {
            expect(message.catalog.descriptor.name).to.exist.and.to.be.a("string");
        }))

        if (message?.catalog?.providers && message?.catalog?.providers.length > 0) {
            message?.catalog?.providers.forEach((provider, index) => {
                messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}]'`, function () {
                    expect(provider).to.include.all.keys("id", "descriptor", "categories", "items", "payments", "tags");
                    expect(provider.id).to.exist;
                    expect(provider.descriptor).to.exist.and.to.be.an("object");
                    expect(provider.categories).to.exist.and.to.be.an("array").that.is.not.empty;
                    expect(provider.items).to.exist.and.to.be.an("array").that.is.not.empty;
                    expect(provider.payments).to.exist.and.to.be.an("array").that.is.not.empty;
                    expect(provider.tags).to.exist.and.to.be.an("array").that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].id' should be a string`, function () {
                    expect(provider.id).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].descriptor'`, function () {
                    expect(provider.descriptor).to.include.all.keys("images", "name", "short_desc", "long_desc");
                    expect(provider.descriptor.images).to.exist.and.to.be.an("array");
                    expect(provider.descriptor.name).to.exist.and.to.be.a("string");
                    // expect(provider.descriptor.short_desc).to.exist.and.to.be.a("string");
                    // expect(provider.descriptor.long_desc).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].descriptor.short_desc' (OPTIONAL)`, function () {
                    expect(provider.descriptor.short_desc).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].descriptor.long_desc' (OPTIONAL)`, function () {
                    expect(provider.descriptor.long_desc).to.exist.and.to.be.a("string");
                }));

                if (provider?.descriptor?.images && provider?.descriptor?.images.length > 0) {
                    provider?.descriptor?.images.forEach((image, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`should verify the contents of message.catalog.providers[${index}].descriptor.images[${i}]`, function () {
                            expect(image).to.include.all.keys("url", "size_type");
                            // expect(image.url).to.be.a("string");
                            // expect(image.size_type).to.be.a("string");
                        }))

                        messageTestSuite.addTest(new Mocha.Test(`should verify the 'url' property of message.catalog.providers[${index}].descriptor.images[${i}] is a string (OPTIONAL)`, function () {
                            expect(image.url).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should verify the 'size_type' property of message.catalog.providers[${index}].descriptor.images[${i}] is a string (OPTIONAL)`, function () {
                            expect(image.size_type).to.be.a("string");
                        }));
                    });
                }

                if (provider?.categories && provider?.categories.length > 0) {
                    provider?.categories.forEach((category, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].categories[${i}]'`, function () {
                            expect(category).to.include.all.keys("id", "descriptor");
                            expect(category.id).to.exist.and.to.be.a("string");
                            expect(category.descriptor).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].categories[${i}].descriptor'`, function () {
                            expect(category.descriptor, "should have properties 'code' and 'name'").to.include.all.keys("code", "name");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should validate 'message.catalog.providers[${index}].categories[${i}].descriptor.code' and 'message.catalog.providers[${index}].categories[${i}].descriptor.code'`, function () {
                            expect(category.descriptor.code).to.be.a("string").an.oneOf(["PERSONAL_LOAN", "INVOICE_BASED_LOAN"]);
                            expect(category.descriptor.name).to.be.a("string");
                        }));
                    })
                }

                if (provider?.items && provider?.items.length > 0) {
                    provider?.items.forEach((item, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.catalog.providers[${index}].items[${i}]'`, function () {
                            expect(item).to.include.all.keys("id", "descriptor", "category_ids", "tags", "matched", "recommended");
                            expect(item.id, `'message.catalog.providers[${index}].items[${i}].id' should exist`).to.exist;
                            expect(item.descriptor, `'message.catalog.providers[${index}].items[${i}].descriptor' should exist and be an object`).to.exist.and.to.be.an("object");
                            expect(item.category_ids, `'message.catalog.providers[${index}].items[${i}].category_ids' should exist and be an array`).to.exist.and.to.be.an("array");
                            expect(item.tags, `'message.catalog.providers[${index}].items[${i}].tags' should exist and be an array`).to.exist.and.to.be.an("array");
                            expect(item.matched, `'message.catalog.providers[${index}].items[${i}].matched' should exist`).to.exist;
                            expect(item.recommended, `'message.catalog.providers[${index}].items[${i}].recommended' should exist`).to.exist;
                            // expect(item.xinput, `'message.catalog.providers[${index}].items[${i}].xinput' should exist and be an object`).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should verify if 'message.catalog.providers[${index}].items[${i}].matched' exists (OPTIONAL)`, function () {
                            expect(item.matched, `'message.catalog.providers[${index}].items[${i}].matched' should exist`).to.exist;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should verify if 'message.catalog.providers[${index}].items[${i}].recommended' exists (OPTIONAL)`, function () {
                            expect(item.recommended, `'message.catalog.providers[${index}].items[${i}].recommended' should exist`).to.exist;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].id' should be a string`, function () {
                            expect(item.id).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].descriptor' should have properties 'code' and 'name'`, function () {
                            expect(item.descriptor).include.all.keys("code", "name");
                            expect(item.descriptor.code).to.exist.and.be.a("string");
                            expect(item.descriptor.name).to.exist.and.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should validate 'message.catalog.providers[${index}].items[${i}].descriptor.code'`, function () {
                            expect(item.descriptor.code).to.be.oneOf(["PERSONAL_LOAN", "INVOICE_BASED_LOAN"]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should validate 'message.catalog.providers[${index}].items[${i}].descriptor.name'`, function () {
                            expect(item.descriptor.name).to.exist.and.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].category_ids' should be an array with length greater than 0`, function () {
                            expect(item.category_ids).to.be.an("array").and.to.have.length.above(0);
                        }));

                        if (item?.tags && item?.tags.length > 0) {
                            item?.tags.forEach((tag, j) => {
                                messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].items[${i}].tags[${j}]`, function () {
                                    expect(tag).to.include.all.keys("descriptor", "list");
                                    expect(tag.descriptor).to.exist.and.to.be.an("object");
                                    expect(tag.list).to.exist.and.to.be.an("array");
                                    expect(tag.display).to.exist.and.to.be.an("boolean");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].tags[${j}].descriptor' should have properties 'code' and 'name'`, function () {
                                    expect(tag.descriptor.code).to.exist.and.to.be.a("string");
                                    expect(tag.descriptor.name).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].tags[${j}].descriptor.code' should be equal to 'INFO', 'CONSENT_INFO', or 'general-info'`, function () {
                                    expect(tag.descriptor.code).to.be.oneOf(["INFO", "CONSENT_INFO", "general-info"]);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].tags[${j}].descriptor.name' should be equal to 'Information' or 'Consent Information'`, function () {
                                    expect(tag.descriptor.name).to.exist.and.to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].tags[${j}].display' should be a 'boolean' `, function () {
                                    expect(tag.display).to.be.a('boolean');
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].tags[${j}].list' should be an array`, function () {
                                    expect(tag.list).to.be.an("array");
                                }));

                                tag.list.forEach((listItem, k) => {
                                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].tags[${j}].list[${k}]'`, function () {
                                        expect(listItem).to.include.all.keys("descriptor", "value");
                                        expect(listItem.descriptor).to.exist.and.to.be.an("object");
                                        expect(listItem.value).to.exist;
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].tags[${j}].list[${k}].descriptor'`, function () {
                                        expect(listItem.descriptor).to.include.all.keys("code", "name");
                                        expect(listItem.descriptor.code).to.exist.and.to.be.a("string");
                                        expect(listItem.descriptor.name).to.exist.and.to.be.a("string");
                                        if (listItem.descriptor.short_desc !== undefined) {
                                            expect(listItem.descriptor.short_desc).to.be.a("string");
                                        }
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].tags[${j}].list[${k}].descriptor.code' should be in snakecase and capitalize`, function () {
                                        expect(listItem.descriptor.code).to.match(/[A-Z_]+/);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].tags[${j}].list[${k}].descriptor.name' should be a string`, function () {
                                        expect(listItem.descriptor.name).to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].tags[${j}].list[${k}].descriptor.short_desc' should be a string`, function () {
                                        if (listItem.descriptor.short_desc !== undefined) {
                                            expect(listItem.descriptor.short_desc).to.be.a("string");
                                        }
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].tags[${j}].list[${k}].value' should be a string`, function () {
                                        expect(listItem.value).to.be.a("string");
                                    }));
                                });

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].matched' should be a 'boolean' `, function () {
                                    expect(item.matched).to.be.a("boolean");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].recommended' should be a 'boolean' `, function () {
                                    expect(item.recommended).to.be.a("boolean");
                                }));

                                /** if(action === "onsearch") {
                                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].items[${i}].xinput'`, function () {
                                        expect(item.xinput).to.include.all.keys("form", "form_response");
                                        expect(item.xinput.form).to.exist.and.to.be.an("object");
                                        expect(item.xinput.form_response).to.exist.and.to.be.an("object");
                                    }));
                                    
                                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].items[${i}].xinput.form'`, function () {
                                        expect(item.xinput.form).to.include.all.keys("id");
                                        expect(item.xinput.form.id).to.equal("F01");
                                    }));
                                    
                                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].items[${i}].xinput.form_response'`, function () {
                                        expect(item.xinput.form_response).to.include.all.keys("status", "submission_id");
                                        expect(item.xinput.form_response.status).to.equal("PENDING");
                                        expect(item.xinput.form_response.submission_id).to.equal("F01_SUBMISSION_ID");
                                    }));
                                    
    
                                    messageTestSuite.addTest(new Mocha.Test(`should validate the contents of 'message.catalog.providers[${index}].items[${i}].xinput.form'`, function () {
                                        expect(item.xinput.form).to.include.all.keys("id");
                                        expect(item.xinput.form.id).to.exist;
                                    //     expect(item.xinput.form.mime_type).to.exist;
                                    //     expect(item.xinput.form.url).to.exist;
                                    //     expect(item.xinput.form.resubmit).to.exist;
                                    //     expect(item.xinput.form.multiple_sumbissions).to.exist;
                                    }));
    
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].xinput.form.id' should be a string`, function () {
                                        expect(item.xinput.form.id).to.be.a("string");
                                    }));
    
                                    // messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                                    //     expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                                    // }));
    
                                    // messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].xinput.form.url' should be a string`, function () {
                                    //     expect(item.xinput.form.url).to.be.a("string");
                                    // }));
    
                                    // messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].xinput.form.resubmit should be a boolean and should be 'false'`, function () {
                                    //     expect(item.xinput.form.resubmit).to.be.a("boolean").and.equal(false);
                                    // }));
    
                                    // messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].xinput.form.multiple_sumbissions should be a string and should be false'`, function () {
                                    //     expect(item.xinput.form.multiple_sumbissions).to.be.a("boolean").and.equal(false);
                                    // }));
    
                                    // messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].items[${i}].xinput.xinput' should be true`, function () {
                                    //     expect(item.xinput.required).to.equal(true);
                                    // }));
                                } else if(action === "on_status") {
                                    xinputOnStatusJustAfterSearchTests(item, messageTestSuite, index, i);
                                } **/
                            });
                        }
                    });
                }

                if (provider?.payments && provider?.payments.length > 0) {
                    provider?.payments.forEach((payment, index) => {
                        messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.payments[${index}]'`, function () {
                            expect(payment).to.include.all.keys("collected_by", "tags");
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

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${index}].tags[${eleIndex}].display' should be 'boolean'`, function () {
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
                                                // case 'SETTLEMENT_AMOUNT':
                                                //     expect(listItem.value).to.be.a('string');
                                                //     break;
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
                            })
                        }
                    })
                }

                if (provider?.tags && provider?.tags.length > 0) {
                    const tagsArr = [{ code: "CONTACT_INFO" }, { code: "LSP_INFO" }];

                    tagsArr.forEach((ele) => {
                        const tagIndex = provider.tags.findIndex((tag) => tag.descriptor.code === ele.code);
                        const tagItem = provider.tags[tagIndex];

                        messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.catalog.providers[${index}].tags[${tagIndex}]'`, function () {
                            expect(tagItem).to.have.property('descriptor').that.is.an('object');
                            expect(tagItem).to.have.property('list').that.is.an('array').not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.catalog.providers[${index}].tags[${tagIndex}].descriptor' should have properties 'code' and 'name'`, function () {
                            expect(tagItem.descriptor).to.include.all.keys("code", "name");
                            expect(tagItem.descriptor.code).to.exist;
                            expect(tagItem.descriptor.name).to.exist;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.catalog.providers[${index}].tags[${tagIndex}].descriptor.code' should be equal to ${ele.code} `, function () {
                            expect(tagItem.descriptor.code).to.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].tags[${tagIndex}].list' should be an array that is not empty`, function () {
                            expect(tagItem.list).to.exist.and.to.be.an("array").that.is.not.empty;
                        }))

                        const contactArr = [
                            { code: "GRO_NAME" },
                            { code: "GRO_EMAIL" },
                            { code: "GRO_CONTACT_NUMBER" },
                            { code: "CUSTOMER_SUPPORT_LINK" },
                            { code: "CUSTOMER_SUPPORT_CONTACT_NUMBER" },
                            { code: "CUSTOMER_SUPPORT_EMAIL" }
                        ];

                        const lspArr = [
                            { code: "LSP_NAME" },
                            { code: "LSP_EMAIL" },
                            { code: "LSP_CONTACT_NUMBER" },
                            { code: "LSP_ADDRESS" }
                        ]

                        let arr;
                        switch (ele.code) {
                            case "CONTACT_INFO":
                                arr = contactArr;
                                break;
                            case "LSP_INFO":
                                arr = lspArr;
                                break;
                            default:
                                break;
                        }

                        if (arr) {
                            arr.forEach((it) => {
                                const listItemIndex = tagItem.list.findIndex((listItem) => listItem.descriptor.code === it.code);
                                const listItem = tagItem.list[listItemIndex];

                                if (listItem !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].tags[${tagIndex}].list[${listItemIndex}]' (${listItem.descriptor.code}) should have 'descriptor' and 'value' properties`, function () {
                                        expect(listItem).to.have.property('descriptor').that.is.an('object');
                                        expect(listItem).to.have.property('value');
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor' (${listItem.descriptor.code}) should have properties 'code' 'name'`, function () {
                                        expect(listItem.descriptor).to.include.all.keys("code", "name");
                                        expect(listItem.descriptor.code).to.exist;
                                        expect(listItem.descriptor.name).to.exist;
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' (${listItem.descriptor.code}) should be a string and should be equal to '${it.code}'`, function () {
                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor.name' (${listItem.descriptor.code}) should be a string`, function () {
                                        expect(listItem.descriptor.name).to.be.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.catalog.providers[${index}].tags[${tagIndex}].list[${listItemIndex}].value' (${listItem.descriptor.code}) should have expected expected data type`, function () {
                                        switch (listItem.descriptor.code) {
                                            case 'GRO_EMAIL':
                                            case 'CUSTOMER_SUPPORT_EMAIL':
                                            case 'LSP_EMAIL':
                                                expect(listItem.value).to.be.a('string').and.to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                                                break;
                                            default:
                                                expect(listItem.value).to.be.a('string');
                                                break;
                                        }
                                    }));
                                }
                            })
                        }
                    })
                }
            });
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

async function on_search({ context, message } = {}, step = "",logs= [],constants ={}) {
    const testSuite = new Mocha.Suite(`on_search (${step}) Request Verification`);
    const responseTestSuite = response_verification({ context, message }, logs,constants);

    const contextTestSuite = contextTests(context, "on_search");
    const messageTestSuite = messageTests(message);

    testSuite.addSuite(contextTestSuite);
    testSuite.addSuite(messageTestSuite);

    return [testSuite,responseTestSuite];
};


module.exports = {
    on_search_3: on_search,
    onSearchMessageTests: messageTests
}