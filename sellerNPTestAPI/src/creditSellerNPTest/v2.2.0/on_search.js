const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const { xinputOnStatusJustAfterSearchTests } = require("./commonTest");
const response_verification = require("../../centralizedUtilities/responseVerification");

const codePattern = /^[A-Z_]+$/;

function messageTests(message, testCaseId, action = "on_search", step) {
    const messageTestSuite = new Mocha.Suite("on_search Request Verification");
    try { 
               
        let testcaseCounter = 1;

        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should have 'message' properties`, function () {
            expect(message, "Request body shouldn't be null and undefined").to.exist;
            expect(message).to.exist;
        }))

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message' should have a property of 'catalog'`, function () {
            expect(message).to.have.property("catalog");
            expect(message.catalog).to.exist.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog' should have properties 'descriptor' and 'providers'`, function () {
            expect(message.catalog).to.include.all.keys("descriptor", "providers");
            expect(message.catalog.descriptor).to.exist.to.be.an("object");
            expect(message.catalog.providers, "message.catalog.providers should not be empty").is.not.empty;
        }));


        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.descriptor' should have a property 'name' which is a string`, function () {
            expect(message.catalog.descriptor.name).to.exist.and.to.be.a("string");
        }))
        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers' should be a array`, function () {
            expect(message.catalog.providers).to.exist.and.to.be.an("array");
        }))

        if (message?.catalog?.providers && message?.catalog?.providers.length > 0) {
            message?.catalog?.providers.forEach((provider, index) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate the contents of 'message.catalog.providers[${index}]'`, function () {
                    expect(provider).to.include.all.keys("id", "descriptor", "categories", "items", "payments", "tags");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].id' should exist and should be a string`, function () {
                    expect(provider.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].descriptor' should be exist and should be an object`, function () {
                    expect(provider.descriptor).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].descriptor' should have a property 'name'`, function () {
                    expect(provider.descriptor.name).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].descriptor' should have a property 'short_desc' (OPTIONAL)`, function () {
                    expect(provider.descriptor.short_desc).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].descriptor' should have a property 'long_desc' (OPTIONAL)`, function () {
                    expect(provider.descriptor.long_desc).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].descriptor' should have a property 'images' that is an array`, function () {
                    expect(provider.descriptor.images).to.exist.and.to.be.an("array").that.is.not.empty;
                }))

                if (provider?.descriptor?.images && provider?.descriptor?.images.length > 0) {
                    provider?.descriptor?.images.forEach((image, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should verify the contents of message.catalog.providers[${index}].descriptor.images[${i}]`, function () {
                            expect(image).to.include.all.keys("url", "size_type");
                            expect(image.url).to.be.a("string");
                            expect(image.size_type).to.be.a("string");
                        }))
                    });
                }

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].categories' should exists and should be an array that is not empty`, function () {
                    expect(provider.categories).to.exist.and.to.be.an("array").that.is.not.empty;
                }));

                if (provider?.categories && provider?.categories.length > 0) {
                    provider?.categories.forEach((category, i) => {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate the contents of 'message.catalog.providers[${index}].categories[${i}]'`, function () {
                            expect(category).to.include.all.keys("id", "descriptor");
                            expect(category.id).to.exist.and.to.be.a("string");
                            expect(category.descriptor).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate the contents of 'message.catalog.providers[${index}].categories[${i}].descriptor'`, function () {
                            expect(category.descriptor, "should have properties 'code' and 'name'").to.include.all.keys("code", "name");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate 'message.catalog.providers[${index}].categories[${i}].descriptor.code'`, function () {
                            expect(category.descriptor.code).to.be.a("string").to.be.oneOf(["PURCHASE_FINANCE","AGRI_PURCHASE_FINANCE","ELECTRONICS_PURCHASE_FINANCE"]);
                        }));

                         messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate 'message.catalog.providers[${index}].categories[${i}].descriptor.name' `, function () {
                            expect(category.descriptor.name).to.be.a("string");
                            }));
                    })
                }


                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items' should exist and should be an array that is not empty`, function () {
                    expect(provider.items).to.exist.and.to.be.an("array").that.is.not.empty;
                }));

                if (provider?.items && provider?.items.length > 0) {
                    provider?.items.forEach((item, i) => {

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}]' should be an object`, function () {
                            expect(item).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].id' should be a string`, function () {
                            expect(item.id).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].descriptor' should have properties 'code' and 'name'`, function () {
                            expect(item.descriptor).include.all.keys("code", "name");
                            expect(item.descriptor.code).to.exist.and.be.a("string");
                            expect(item.descriptor.name).to.exist.and.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate 'message.catalog.providers[${index}].items[${i}].descriptor.code'`, function () {
                            expect(item.descriptor.code).to.equal("LOAN");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate 'message.catalog.providers[${index}].items[${i}].descriptor.name'`, function () {
                            // expect(item.descriptor.name).to.be.oneOf(["Personal Loan", "Invoice Based Loan"]);
                            expect(item.descriptor.name).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].category_ids' should be an array with length greater than 0`, function () {
                            expect(item.category_ids).to.be.an("array").and.to.have.length.above(0);
                        }));

                        if (step === "I" || step === "II" || step === "IV") {
                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput' should be an object`, function () {
                                expect(item.xinput).to.be.an("object");
                            }));
                            if (step === "I" || step === "II") {

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.head' should be an object`, function () {
                                    expect(item.xinput.head).to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.head.descriptor' should be an object`, function () {
                                    expect(item.xinput.head.descriptor).to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.head.descriptor.name' should be 'Customer Information'`, function () {
                                    expect(item.xinput.head.descriptor.name).to.be.a("string").and.to.equal("Customer Information");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.head.index' should be an object`, function () {
                                    expect(item.xinput.head.index).to.be.an("object");
                                }));


                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate the contents of 'message.catalog.providers[${index}].items[${i}].xinput.head.index.min'(OPTIONAL)`, function () {
                                    expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.head.index.min' should be a string`, function () {
                                    expect(item.xinput.head.index.min).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.head.index.cur' should be a string`, function () {
                                    expect(item.xinput.head.index.cur).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.head.index.max' should be a string`, function () {
                                    expect(item.xinput.head.index.max).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.head.headings' must have length '1'`, function () {
                                    expect(item.xinput.head.headings).to.have.lengthOf(1);
                                }))

                                if (item?.xinput?.head?.headings && item?.xinput?.head?.headings.length > 0) {
                                    item?.xinput?.head?.headings.forEach((heading, l) => {
                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.head.headings[${l}]' should be equal to 'Personal Information'`, function () {
                                            expect(heading).to.equal("Personal Information");
                                        }));
                                    });
                                }

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate the contents of 'message.catalog.providers[${index}].items[${i}].xinput.form'`, function () {
                                    expect(item.xinput.form).to.include.all.keys("id", "mime_type", "url", "resubmit", "multiple_sumbissions");
                                    expect(item.xinput.form.id).to.exist;
                                    expect(item.xinput.form.mime_type).to.exist;
                                    expect(item.xinput.form.url).to.exist;
                                    expect(item.xinput.form.resubmit).to.exist;
                                    expect(item.xinput.form.multiple_sumbissions).to.exist;
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.form.id' should be a string`, function () {
                                    expect(item.xinput.form.id).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                                    expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.form.url' should be a string`, function () {
                                    expect(item.xinput.form.url).to.be.a("string");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.form.resubmit should be a boolean`, function () {
                                    expect(item.xinput.form.resubmit).to.be.a("boolean");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.form.multiple_sumbissions should be a boolean`, function () {
                                    expect(item.xinput.form.multiple_sumbissions).to.be.a("boolean");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.required' should be a boolean`, function () {
                                    expect(item.xinput.required).to.be.a("boolean");
                                }));
                            }
                            if (step === "IV") {

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate the contents of 'message.catalog.providers[${index}].items[${i}].xinput.form' should be an object`, function () {
                                    expect(item.xinput.form).to.be.an("object")
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.form.id' should be a string`, function () {
                                    expect(item.xinput.form.id).to.be.a("string");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should validate the contents of 'message.catalog.providers[${index}].items[${i}].xinput.form_response' should be an object`, function () {
                                    expect(item.xinput.form_response).to.be.an("object")
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.form_response.status' should be a string`, function () {
                                    expect(item.xinput.form_response.status).to.be.a("string");
                                }));
                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].xinput.form_response.submission_id' should be a string`, function () {
                                    expect(item.xinput.form_response.submission_id).to.be.a("string");
                                }));
                            }
                            if (step === "IV" || step === "III") {

                                const arr = [{ code: "CONSENT_INFO" }];
                                arr.forEach((ele) => {
                                    const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                    const tagItem = item?.tags[tagIndex];
                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].item[${i}].tags' should have an object of ${ele.code}`, function () {
                                        expect(tagItem).to.exist.and.to.be.an("object");
                                    }));

                                    if (tagIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].tags[${tagIndex}]' should have properties named 'descriptor' which is an object`, function () {
                                            expect(tagItem).to.have.property("descriptor").that.is.an("object");

                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                            expect(tagItem.descriptor.code).to.be.equal(ele.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].tags[${tagIndex}].display' should be a boolean`, function () {
                                            expect(tagItem.display).to.be.a("boolean");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                        }));


                                        const consentInfoArr = [{ code: "CONSENT_HANDLER" }]


                                        let array = consentInfoArr;

                                        if (array) {
                                            array.forEach((it) => {
                                                const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                                const listItem = tagItem?.list[listItemIndex];

                                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                                    expect(listItem).to.exist.and.to.be.an("object");
                                                }));

                                                if (listItemIndex !== -1) {
                                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                                        expect(listItem).to.have.property("value").that.is.a("string");
                                                    }));

                                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                                    }));

                                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                                    }));

                                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                                    }));
                                                }
                                            });
                                        }
                                    }
                                });

                            }
                        }
                    });
                }

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].payments' should exist and should be an array that is not empty`, function () {
                    expect(provider.payments).to.exist.and.to.be.an("array").that.is.not.empty;
                }));

                if (provider?.payments && provider?.payments.length > 0) {
                    provider?.payments.forEach((payment, index) => {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] should verify the contents of 'message.catalog.providers[${index}].payments[${index}]'`, function () {
                            expect(payment).to.include.all.keys("collected_by", "tags");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].payments[${index}].collected_by should be 'BPP'`, function () {
                            expect(payment.collected_by).to.be.a("string").and.to.equal("BPP");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].payments[${index}].tags' should be an array with length not equal 0`, function () {
                            expect(payment.tags).to.exist.and.to.be.an("array").to.have.length.above(0);
                        }));

                        if (payment?.tags) {
                            const arr = [{ code: "BPP_TERMS"}];

                            arr.forEach((ele) => {
                                const paymentTagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                                const tagItem = payment?.tags[paymentTagIndex];

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].payments[${index}].tags' should have an '${ele.name}' object`, function () {
                                    expect(tagItem).to.exist.and.to.be.an("object");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].payments[${index}].tags[${paymentTagIndex}].descriptor' should have property 'code'`, function () {
                                    expect(tagItem.descriptor).to.have.property("code");
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].payments[${index}].tags[${paymentTagIndex}].descriptor.code' should be ${ele.code}`, function () {
                                    expect(tagItem.descriptor.code).to.equal(ele?.code);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].payments[${index}].tags[${paymentTagIndex}].display' to be 'false'`, function () {
                                    expect(tagItem.display).to.equal(false);
                                }));

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].payments[${index}].tags[${paymentTagIndex}].list' should be an array that is not empty`, function () {
                                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                                }));

                                const bppTermsArr = [
                                    { code: "BUYER_FINDER_FEES_TYPE" },
                                    { code: "BUYER_FINDER_FEES_PERCENTAGE" },
                                    { code: "SETTLEMENT_WINDOW" },
                                    { code: "SETTLEMENT_BASIS" },
                                    { code: "MANDATORY_ARBITRATION" },
                                    { code: "COURT_JURISDICTION" },
                                    { code: "STATIC_TERMS" },
                                    { code: "OFFLINE_CONTRACT" }
                                ];

                                let array;
                                switch (tagItem?.descriptor?.code) {

                                    case "BPP_TERMS":
                                        array = bppTermsArr;
                                        break;
                                    default:
                                        break;
                                }

                                array.forEach((it) => {
                                    const paymentlistItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor?.code === it.code);
                                    const listItem = tagItem?.list[paymentlistItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].payments[${index}].tags[${paymentTagIndex}].list' should have an '${it.name}' object`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].payments[${index}].tags[${paymentTagIndex}].list[${paymentlistItemIndex}].descriptor' should have property 'code' (${it.code})`, function () {
                                        expect(listItem.descriptor).to.have.property("code");
                                        expect(listItem.descriptor.code).to.exist;
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.provider.tags[${paymentTagIndex}].list[${paymentlistItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));
                                })

                            })
                        }
                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags' should exist and should be an array that is not empty`, function () {
                    expect(provider.tags).to.exist.and.to.be.an("array").that.is.not.empty;
                }));
                const arr = [{ code: "CONTACT_INFO" }, { code: "LSP_INFO" }];
                arr.forEach((ele) => {
                    const tagIndex = provider?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                    const tagItem = provider?.tags[tagIndex];
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    }));

                    if (tagIndex !== -1) {

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].descriptor' should have a property named 'descriptor' which is an object`, function () {
                            expect(tagItem).to.have.property("descriptor").that.is.an("object");
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].descriptor.name' should have be equal to '${ele.name}'`, function () {
                            expect(tagItem.descriptor.name).to.be.a('string');
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                            expect(tagItem.descriptor.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.order.providers[${index}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));

                        let contactInfoArr = [{ code: "GRO_NAME" }, { code: "GRO_EMAIL" }, { code: "GRO_CONTACT_NUMBER" }, { code: "CUSTOMER_SUPPORT_LINK" }, { code: "CUSTOMER_SUPPORT_CONTACT_NUMBER" }, { code: "CUSTOMER_SUPPORT_EMAIL" }];
                        let lspInfoArr = [{ code: "LSP_NAME" }, { code: "LSP_EMAIL" }, { code: "LSP_CONTACT_NUMBER" }, { code: "LSP_ADDRESS" }];

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
                                const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                const listItem = tagItem?.list[listItemIndex];

                                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                    expect(listItem).to.exist.and.to.be.an("object");
                                }));

                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.catalog.providers[${index}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));
                                }
                            });
                        }
                    }
                });

            });
        }

        return messageTestSuite;
    } catch (error) {
        messageTestSuite.addTest(new Mocha.Test("on_search request message object failed to be verified because of some missing payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return messageTestSuite;
    }
}

async function on_search({ context, message } = {}, step, testCaseId,logs =[],constants ={}) {
    const testSuite = new Mocha.Suite(`on_search (${step}) Request Verification`);
    const responseTestSuite = response_verification({ context, message }, logs,constants);
    const contextTestSuite = contextTests(context, "on_search");
    const messageTestSuite = messageTests(message, testCaseId);

    testSuite.addSuite(contextTestSuite);
    testSuite.addSuite(messageTestSuite);

    return [testSuite,responseTestSuite];
};


module.exports = {
    on_search,
    onSearchMessageTests: messageTests
}











