const Mocha = require("mocha");
const contextTests = require("./context");
const searchSchema = require("./schema/search.schema");
const { generateTests } = require("./common");
const { expect } = require("chai");
const response_verification = require("../centralizedUtilities/responseVerification");

function itemsMessageTests(message, testCaseId) {

    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    const testSuite = new Mocha.Suite("Search Validation");

    if (message?.intent?.fulfillment) {
        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.fulfillment' should be an object`, function () {
            expect(message.intent.fulfillment).to.exist.and.to.be.an("object");
        }));

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.fulfillment.agent' should be an object`, function () {
            expect(message.intent.fulfillment.agent).to.exist.and.to.be.an("object");
        }));

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.fulfillment.agent.person' should be an object`, function () {
            expect(message.intent.fulfillment.agent.person).to.exist.and.to.be.an("object");
        }));

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.fulfillment.agent.person.id' should be a string`, function () {
            expect(message.intent.fulfillment.agent.person.id).to.exist.and.to.be.a("string");
        }));
    }
    if (message?.intent?.provider) {

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider' should be an object`, function () {
            expect(message.intent.provider).to.exist.and.to.be.an("object");
        }));

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider.id' should be a string`, function () {
            expect(message.intent.provider.id).to.exist.and.to.be.a("string");
        }));

        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider.items' should be a non-empty array`, function () {
            expect(message.intent.provider.items).to.exist.and.to.be.a("array");
        }));
        if (message?.intent?.provider?.items && message?.intent?.provider?.items.length > 0) {
            message?.intent?.provider?.items.forEach((item, itemIndex) => {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider.items[${itemIndex}]' should be an object`, function () {
                    expect(item).to.exist.and.to.be.an("object");
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider.items[${itemIndex}].id' should be a string`, function () {
                    expect(item.id).to.exist.and.to.be.a("string");
                }));


                if (item?.xinput) {
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider.items[${itemIndex}].xinput' should be an object`, function () {
                        expect(item.xinput).to.exist.and.to.be.an("object");
                    }));

                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider.items[${itemIndex}].xinput.form' should be an object`, function () {
                        expect(item.xinput.form).to.exist.and.to.be.an("object");
                    }));

                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider.items[${itemIndex}].xinput.form.id' should be a string`, function () {
                        expect(item.xinput.form.id).to.exist.and.to.be.a("string");
                    }));

                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider.items[${itemIndex}].xinput.form_response' should be an object`, function () {
                        expect(item.xinput.form_response).to.exist.and.to.be.an("object");
                    }));
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider.items[${itemIndex}].xinput.form_response.status' should be a string`, function () {
                        expect(item.xinput.form_response.status).to.exist.and.to.be.a("string");
                    }));
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.provider.items[${itemIndex}].xinput.form_response.submission_id' should be a string`, function () {
                        expect(item.xinput.form_response.submission_id).to.exist.and.to.be.a("string");
                    }));

                }
            })
        }
    }
    return testSuite;
}


function searchMessageTests({ context, message } = {}, step, constants = {}, testCaseId) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, searchSchema, "Verification of Message", constants);
        messageTestSuite.addSuite(itemsMessageTests(message, step, testCaseId));
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}


function runResponseVerification(context, message, logs, constants) {
    return response_verification({ context, message }, logs, constants);
}
module.exports = async function search({ context, message } = {}, step = "", testCaseId, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`search (${step}) request verification`);
        constants = { ...constants, version: "2.0.0", testCaseId };

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(searchMessageTests({ context, message }, constants, testCaseId));
        let responseTestSuite;
        switch (step) {
            case "II":
            case "III":
            case "IV":
                responseTestSuite = runResponseVerification(context, message, logs, constants);
                break;
            default:
                break;
        }

        if (responseTestSuite) {
            return [testSuite, responseTestSuite];
        } else { return [testSuite] }
    } catch (err) {
        console.log(err);
    }
}