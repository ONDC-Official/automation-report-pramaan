const Mocha = require('mocha');
const { expect } = require('chai');
const { contextTests } = require("./context");
const { tagsCommonTests, fulfillmentsCommonTests, quoteCommonTests, providerCommonTests, paymentsCommonTests, itemsCommonTests } = require("./commonTests")
const response_verification = require("../../centralizedUtilities/responseVerification");

async function on_select({ context, message } = {}, step,  flowId,logs = [],constants ={}) {
    try {
        const action = "on_select";
        
        const testSuite = new Mocha.Suite(`on_select (${step}) Request Verification`);
        const responseTestSuite = response_verification({ context, message }, logs,constants);

        
        contextTests(context, "on_select", testSuite);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order' which is an object", function () {
            expect(message.order).to.exist.and.to.be.an("object");
        }));

        providerCommonTests(message, messageTestSuite);

        itemsCommonTests(message, messageTestSuite, flowId, action);

        fulfillmentsCommonTests(message, messageTestSuite, logs, flowId, action);
        if (flowId !== "INVESTMENT_7") {

            messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput' should be an object`, function () {
                expect(message.order.xinput).to.exist.and.to.be.an("object");
            }));

            if ((flowId === "INVESTMENT_6" && step === "I") || (flowId === "INVESTMENT_3") || (flowId === "INVESTMENT_5") || (flowId === "INVESTMENT_9") || (flowId === "INVESTMENT_20" && step !== "IV") || (flowId === "INVESTMENT_1" && step !== "IV") || (flowId === "INVESTMENT_2" && step === "I")) {
                //message.order.xinput.head
                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.head' should be an object`, function () {
                    expect(message.order.xinput.head).to.exist.and.to.be.an("object");
                }));

                //message.order.xinput.head.index
                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.head.index' should be an object`, function () {
                    expect(message.order.xinput.head.index).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.head.index.min' should be  number`, function () {
                    expect(message.order.xinput.head.index.min).to.exist.and.to.be.a("number");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.head.index.cur' should be  number`, function () {
                    expect(message.order.xinput.head.index.cur).to.exist.and.to.be.a("number");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.head.index.max' should be  number`, function () {
                    expect(message.order.xinput.head.index.max).to.exist.and.to.be.a("number");
                }));

                //message.order.xinput.head.headings
                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.head.headings' should be an array`, function () {
                    expect(message.order.xinput.head.headings).to.exist.and.to.be.an("array");
                }));

                if (message?.order?.xinput?.head?.headings && message?.order?.xinput?.head?.headings.length > 0) {
                    message?.order?.xinput?.head?.headings.forEach((heading, headinIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.head.headings[${headinIndex}]' should be a string`, function () {
                            expect(heading).to.exist.and.to.be.a("string");
                        }));
                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form.required' should be a boolean`, function () {
                    expect(message.order.xinput.required).to.exist.and.to.be.a("boolean");
                }));
            }
            //message.order.xinput.form

            messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form' should be an object`, function () {
                expect(message.order.xinput.form).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form.id' should be a string`, function () {
                expect(message.order.xinput.form.id).to.exist.and.to.be.a("string");
            }));

            if (message?.order?.xinput?.form?.url) {

                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form.mime_type' should be a string`, function () {
                    expect(message.order.xinput.form.mime_type).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.xinput.form.url' should be a valid URL`, function () {
                    expect(message.order.xinput.form.url).to.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/);
                }));

            }

            if (message?.order?.xinput?.form_response) {

                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form_response' should be an object`, function () {
                    expect(message.order.xinput.form_response).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form_response.status' should be a string`, function () {
                    expect(message.order.xinput.form_response.status).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form_response.submission_id' should be a string`, function () {
                    expect(message.order.xinput.form_response.submission_id).to.exist.and.to.be.a("string");
                }));
            }
        }

        switch (flowId) {
            case "INVESTMENT_2":
            case "INVESTMENT_6":
                switch (step) {
                    case "II":
                        paymentsCommonTests(message, messageTestSuite, logs, flowId, action);
                        quoteCommonTests(message, messageTestSuite, flowId);
                }
                break;
            case "INVESTMENT_1":
            case "INVESTMENT_20":
                switch (step) {
                    case "IV":
                        paymentsCommonTests(message, messageTestSuite, logs, flowId, action);
                        quoteCommonTests(message, messageTestSuite, flowId);
                }
                break;
            case "INVESTMENT_3":
            case "INVESTMENT_9":
            case "INVESTMENT_5":
                paymentsCommonTests(message, messageTestSuite, logs, flowId, action);
                quoteCommonTests(message, messageTestSuite, flowId);
                break;
            case "INVESTMENT_7":
                quoteCommonTests(message, messageTestSuite, flowId);
                break;
            default:
                break;
        }


        tagsCommonTests(message, messageTestSuite, action);

        return [ testSuite,responseTestSuite];
    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = {
    on_select
}