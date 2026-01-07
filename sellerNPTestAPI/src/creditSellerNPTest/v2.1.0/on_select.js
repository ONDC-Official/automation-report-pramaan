const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { quoteTests, itemsCommonFieldsTests, providerTests, xinputOnStatusGeneral } = require('./commonTests');
const response_verification = require("../../centralizedUtilities/responseVerification");

function messageTests(message, action = "on_select", step = "") {
    try {
        
        const messageTestSuite = new Mocha.Suite("Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message' properties exist", function () {
            expect(message, "Message object shouldn't be null or undefined").to.exist;
            expect(message).to.exist;
        }))

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message' contains 'order'", function () {
            expect(message).to.have.property("order");
            expect(message.order).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order' contains necessary keys", function () {
            if (message?.order?.quote) {
                expect(message.order).to.include.all.keys("provider", "items", "quote");
            } else {
                expect(message.order).to.include.all.keys("provider", "items");
            }
        }));

        providerTests(message, messageTestSuite);

        messageTestSuite.addTest(new Mocha.Test("Verify if 'message.order.items' is an array that is not empty", function () {
            expect(message.order.items).to.exist.and.to.be.an("array").that.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message.order.items.forEach((item, index) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}]' contains necessary keys`, function () {
                    expect(item).to.include.all.keys("id", "descriptor", "price", "tags", "xinput");
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

                    let cur = step === "I" ? 0 : 1;
                    const headingsArray = ["Set Loan Amount", "Individual KYC"];

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head.descriptor.name' is ${headingsArray[cur]}`, function () {
                        expect(item.xinput.head.descriptor.name).to.be.a("string").and.to.equal(headingsArray[cur]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head.index' contains necessary keys`, function () {
                        expect(item.xinput.head.index).to.include.all.keys("min", "cur", "max");
                        expect(item.xinput.head.index.min).to.exist.and.to.be.a("number");
                        expect(item.xinput.head.index.cur).to.exist.and.to.be.a("number");
                        expect(item.xinput.head.index.max).to.exist.and.to.be.a("number");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.head.index.min' is equal to '0'`, function () {
                        expect(item.xinput.head.index.min).to.equal(0);
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
                        expect(item.xinput.form.url).to.be.a("string").and.to.match(/^https:\/\//);
                        expect(item.xinput.form.resubmit).to.exist;
                        expect(item.xinput.form.multiple_sumbissions).to.exist;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form.resubmit' should be a 'boolean' `, function () {
                        expect(item.xinput.form.resubmit).to.be.a('boolean');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form.multiple_sumbissions' should be a 'boolean' `, function () {
                        expect(item.xinput.form.multiple_sumbissions).to.be.a('boolean');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form.mime_type' should be a string and equal to 'text/html'`, function () {
                        if (item?.xinput?.head?.index?.cur == 0) {
                            expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("text/html");
                        } else {
                            expect(item.xinput.form.mime_type).to.be.a("string").and.to.equal("application/html");
                        }
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the contents of 'message.order.items[${index}].price'`, function () {
                        expect(item.price).to.exist.and.to.be.an("object");
                        expect(item.price.currency).to.exist.and.to.be.a("string");
                        expect(item.price.value).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].price.currency' is 'INR'`, function () {
                        expect(item.price.currency).to.be.a("string").and.to.equal("INR");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].price.value' is a positive number`, function () {
                        expect(item.price.value).to.be.a("string");
                    }));

                } else if (action === "on_status") {
                    xinputOnStatusGeneral(item, messageTestSuite, index)
                }

            });
        }

        quoteTests(message, messageTestSuite);

       return messageTestSuite;
    } catch (error) {
        throw error;
    }
}
async function on_select({ context, message } = {}, step,logs= [],constants ={}) {
    const testSuite = new Mocha.Suite(`on_select (${step}) Request Verification`);
    const responseTestSuite = response_verification({ context, message }, logs,constants);

    const contextTestSuite = contextTests(context, 'on_select');
    const messageTestSuite = messageTests(message, "on_select", step);

    testSuite.addSuite(contextTestSuite);
    testSuite.addSuite(messageTestSuite);

     return [testSuite,responseTestSuite];
}

module.exports = {
    on_select,
    onSelectMessageTests: messageTests
}
