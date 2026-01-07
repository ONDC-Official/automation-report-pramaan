const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { quoteTests, itemsCommonFieldsTests, providerTests, xinputOnStatusGeneral } = require('./commonTests');
const response_verification = require("../../centralizedUtilities/responseVerification");

const codePattern = /^[A-Z_]+$/;

function messageTests(message, step, aa_mandatory, action = "on_select") {
    const messageTestSuite = new Mocha.Suite("Verification of Message");
    try {
        
        messageTestSuite.addTest(new Mocha.Test("Verify if 'message' properties exist", function () {
            expect(message, "Message object shouldn't be null or undefined").to.exist;
            expect(message).to.exist;
        }))

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message' contains 'order'", function () {
            expect(message).to.have.property("order");
            expect(message.order).to.exist.and.to.be.an("object");
        }));

        if (step === "I" && aa_mandatory) {
            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order' contains "'provider', 'items'`, function () {
                expect(message.order).to.include.all.keys("provider", "items");
            }));
        } else {
            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order' contains "'provider', 'items' and 'quote'`, function () {
                expect(message.order).to.include.all.keys("provider", "items", "quote");
            }));
        }

        providerTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.items' is an array that is not empty", function () {
            expect(message.order.items).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, index) => {
                if (step === "I" && aa_mandatory) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}]' contains necessary keys`, function () {
                        expect(item).to.include.all.keys("id", "descriptor", "tags", "xinput");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].id' is a string`, function () {
                        expect(item.id).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].descriptor' should have a properties named 'code' and 'name'`, function () {
                        expect(item.descriptor).to.include.all.keys("code", "name");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].descriptor.code' should have be one of 'PERSONAL_LOAN' or 'INVOICE_BASED_LOAN'`, function () {
                        expect(item.descriptor.code).to.be.oneOf(["PERSONAL_LOAN", "INVOICE_BASED_LOAN"]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].descriptor.name' should be a string`, function () {
                        expect(item.descriptor.name).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags' is an array that is not empty`, function () {
                        expect(item.tags).to.be.an("array").that.is.not.empty;
                    }));

                    const consentTagIndex = item.tags.findIndex((tag) => tag?.descriptor?.code === "CONSENT_INFO");
                    const consentTag = item.tags[consentTagIndex];

                    messageTestSuite.addTest(new Mocha.Test(`'message.orders.items[${index}].tags' should contains a consent info item`, function () {
                        expect(consentTag).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${consentTagIndex}]' contains necessary keys`, function () {
                        expect(consentTag).to.include.all.keys("descriptor", "list", "display");
                        expect(consentTag.descriptor).to.exist.and.to.be.an("object");
                        expect(consentTag.list).to.exist.and.to.be.an("array");
                        expect(consentTag.display).to.exist.and.to.be.a("boolean");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${consentTagIndex}].descriptor' contains necessary keys`, function () {
                        expect(consentTag.descriptor).to.include.all.keys("code", "name");
                        expect(consentTag.descriptor.code).to.exist;
                        expect(consentTag.descriptor.name).to.exist;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${consentTagIndex}].descriptor.code' is 'CONSENT_INFO'`, function () {
                        expect(consentTag.descriptor.code).to.be.a("string").and.to.equal("CONSENT_INFO");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[${consentTagIndex}].descriptor.name' is a string`, function () {
                        expect(consentTag.descriptor.name).to.be.a("string")/* .and.to.equal("Consent Information") */;
                    }));

                    if (consentTag?.list && consentTag?.length > 0) {
                        const arr = [{ code: "CONSENT_HANDLER" }];
                        arr.forEach((ele, i) => {
                            const eleIndex = consentTag?.list.findIndex((listItem) => listItem?.descriptor?.code === ele.code);
                            const listItem = consentTag?.list[eleIndex];

                            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[0].list[${j}]' contains properties 'descriptor' and 'value'`, function () {
                                expect(listItem).to.include.all.keys("descriptor", "value");
                                expect(listItem.descriptor).to.exist.and.to.be.an("object");
                                expect(listItem.value).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[0].list[${j}].descriptor' contains properties 'code' and 'name'`, function () {
                                expect(listItem.descriptor).to.include.all.keys("code", "name");
                                expect(listItem.descriptor.code).to.exist;
                                expect(listItem.descriptor.name).to.exist;
                            }));

                            switch (listItem.descriptor.code) {
                                case "CONSENT_HANDLER":
                                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[0].list[${j}].descriptor.code' is 'CONSENT_HANDLER'`, function () {
                                        expect(listItem.descriptor.code).to.be.a("string").and.to.equal("CONSENT_HANDLER");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[0].list[${j}].descriptor.name' is string`, function () {
                                        expect(listItem.descriptor.name).to.be.a("string");
                                    }));
                                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[0].list[${j}].value' is a valid consent and a string`, function () {
                                        expect(listItem.value).to.be.a("string");
                                    }));
                                    break;
                                default:
                                    break;
                            }
                        });
                    }

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].tags[0].display' is a boolean`, function () {
                        expect(consentTag.display).to.be.a('boolean');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput' contains necessary keys`, function () {
                        expect(item.xinput).to.include.all.keys("form", "form_response");
                        expect(item.xinput.form).to.exist.and.to.be.an("object");
                        expect(item.xinput.form_response).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form' contains necessary keys`, function () {
                        expect(item.xinput.form).to.include.all.keys("id");
                        expect(item.xinput.form.id).to.exist;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form.id' is a string`, function () {
                        expect(item.xinput.form.id).to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form_response' contains necessary keys`, function () {
                        expect(item.xinput.form_response).to.include.all.keys("status", "submission_id");
                        expect(item.xinput.form_response.status).to.exist;
                        expect(item.xinput.form_response.submission_id).to.exist;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form_response.status' is a string and is in UpperCase`, function () {
                        expect(item.xinput.form_response.status).to.be.a("string").and.to.match(codePattern);
                    }))

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form_response.submission_id' is a string`, function () {
                        expect(item.xinput.form_response.submission_id).to.be.a("string");
                    }));
                } else {
                    messageTestSuite.addTest(new Mocha.Test(`should verify the contents of 'message.order.items[${index}]'`, function () {
                        expect(item).to.include.all.keys("id", "descriptor", "price", "tags", "xinput");
                        expect(item.id, `'message.order.items[${index}].id' should exist`).to.exist;
                        expect(item.descriptor, `'message.order.items[${index}].descriptor' should exist and be an object`).to.exist.and.to.be.an("object");
                        expect(item.price, `'message.order.items[${index}].price' should exist and be an object`).to.exist.and.to.be.an("object");
                        expect(item.tags, `'message.order.items[${index}].tags' should exist and be an array`).to.exist.and.to.be.an("array");
                        expect(item.xinput, `'message.order.items[${index}].xinput' should exist and be an object`).to.exist.and.to.be.an("object");
                    }));

                    itemsCommonFieldsTests(item, index, messageTestSuite);

                    if (action === "on_select") {
                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput' contains necessary keys`, function () {
                            expect(item.xinput).to.include.all.keys("head", "form", "required");
                            expect(item.xinput.head).to.exist.and.to.be.an("object");
                            expect(item.xinput.form).to.exist.and.to.be.an("object");
                            expect(item.xinput.required).to.exist.and.to.be.an("boolean");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head' contains necessary keys`, function () {
                            expect(item.xinput.head).to.include.all.keys("descriptor", "index", "headings");
                            expect(item.xinput.head.descriptor).to.exist.and.to.be.an("object");
                            expect(item.xinput.head.index).to.exist.and.to.be.an("object");
                            expect(item.xinput.head.headings).to.exist.and.to.be.an("array");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head.index' contains necessary keys`, function () {
                            expect(item.xinput.head.index).to.include.all.keys("cur", "max");
                            expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                            expect(item.xinput.head.index.cur).to.exist.and.to.be.a("number");
                            expect(item.xinput.head.index.max).to.exist.and.to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].items.xinput.head.index.min'(OPTIONAL)`, function () {
                            expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head.index.min' is equal to '0'`, function () {
                            expect(item.xinput.head.index.min).to.equal(0);
                        }));

                        let cur = 0;
                        const headingsArray = ["Set Loan Amount", "Know your Customer"];
                        if (!aa_mandatory) {
                            switch (step) {
                                case "I":
                                    cur = 0;
                                    break;
                                case "II":
                                    cur = 1;
                                    break;
                            }
                        } else {
                            switch (step) {
                                case "II":
                                    cur = 0;
                                    break;
                                case "III":
                                    cur = 1;
                                    break;
                            }
                        }

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head.descriptor.name' is a string that is equal to ${headingsArray[cur]}`, function () {
                            expect(item.xinput.head.descriptor.name).to.be.a("string").and.to.equal(headingsArray[cur]);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head.index.cur' is equal ${cur}`, function () {
                            expect(item.xinput.head.index.cur).to.equal(cur);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head.index.max' is equal to '1'`, function () {
                            expect(item.xinput.head.index.max).to.equal(1);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head.headings' has length '2'`, function () {
                            expect(item.xinput.head.headings).to.have.lengthOf(2);
                        }))

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head.headings' is equal to ${headingsArray}`, function () {
                            expect(item.xinput.head.headings).to.eql(headingsArray);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form' contains necessary keys`, function () {
                            expect(item.xinput.form).to.include.all.keys("id", "mime_type", "url", "resubmit", "multiple_sumbissions");
                            expect(item.xinput.form.id).to.exist;
                            expect(item.xinput.form.mime_type).to.exist;
                            expect(item.xinput.form.url).to.exist;
                            expect(item.xinput.form.resubmit).to.exist;
                            expect(item.xinput.form.multiple_sumbissions).to.exist;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form.resubmit' is a boolean`, function () {
                            expect(item.xinput.form.resubmit).to.be.a('boolean');
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form.multiple_sumbissions' is a boolean`, function () {
                            expect(item.xinput.form.multiple_sumbissions).to.be.a('boolean');;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                            if (item?.xinput?.head?.index?.cur == 0) {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                            } else {
                                expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("application/html");
                            }
                        }));
                    } else if (action === "on_status") {
                        xinputOnStatusGeneral(item, messageTestSuite, index)
                    }
                }
            });
        }

        if ((aa_mandatory && ["II", "III"].includes(step)) || (!aa_mandatory && ["I", "II"].includes(step))) {
            quoteTests(message, messageTestSuite);
        }

        return messageTestSuite;
    } catch (error) {
        messageTestSuite.addTest(new Mocha.Test("on_select message could not be verified due to some property missing in payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return messageTestSuite;
    }
}
async function on_select({ context, message } = {}, step, aa_mandatory,logs = [],constants ={}) {
    const testSuite = new Mocha.Suite(`on_select (${step}) Request Verification`);
    const responseTestSuite = response_verification({ context, message }, logs,constants);
    const contextTestSuite = contextTests(context, 'on_select');
    const messageTestSuite = messageTests(message, step, aa_mandatory);

    testSuite.addSuite(contextTestSuite);
    testSuite.addSuite(messageTestSuite);

    return [testSuite,responseTestSuite];
}

module.exports = {
    on_select,
    onSelectMessageTests: messageTests
}
