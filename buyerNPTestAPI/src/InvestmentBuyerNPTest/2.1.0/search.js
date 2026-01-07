const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");
const { mutualFundCategories } = require("../../utils/constants");

module.exports = async function search({ context, message } = {}, testCaseId) {
    try {
        let testcaseCounter = 1;

        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };
        const testSuite = new Mocha.Suite(`search Request Verification`);
        contextTests(context, "search", testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
       

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]Verify the presence of 'message' object`, function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message' should have a property named 'intent' which is an object`, function () {
            expect(message).to.have.property("intent").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent' should have a property named 'category' which is an object`, function () {
            expect(message.intent).to.have.property("category").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.category' should have a property named 'descriptor' which is an object`, function () {
            expect(message.intent.category).to.have.property("descriptor").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]Verify if code exists in 'message.intent.category.descriptor' object and is of type string`, function () {
            expect(message.intent.category.descriptor?.code, "Category descriptor code should exist and be a string").to.exist.and.to.be.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]Verify if code exists in 'message.intent.category.descriptor' is a valid ENUM`, function () {
            expect(message.intent.category.descriptor?.code).to.exist.and.to.be.oneOf(mutualFundCategories);
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent' should have a property named 'fulfillment' which is an object`, function () {
            expect(message.intent).to.have.property("fulfillment").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.fulfillment' should have a property named 'agent' which is an object`, function () {
            expect(message.intent.fulfillment).to.have.property("agent").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.fulfillment.agent' should have a property named 'organization' which is an object`, function () {
            expect(message.intent.fulfillment.agent).to.have.property("organization").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent.fulfillment.agent.organization' should have a property named 'creds' which is an array`, function () {
            expect(message.intent.fulfillment.agent.organization).to.have.property("creds").that.is.an("array");
        }));

        if (message?.intent?.fulfillment?.agent?.organization && message?.intent?.fulfillment?.agent?.organization?.length > 0) {
            message.intent.fulfillment.agent.organization.creds.forEach((cred, credIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.fulfillment.agent.organization.creds[${credIndex}]' should have properties 'id' and 'type' which are strings`, function () {
                    expect(cred).to.have.property("id").that.is.a("string");
                    expect(cred).to.have.property("type").that.is.a("string");
                }));
            });
        }

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.intent' should have a property named 'tags' which is an array`, function () {
            expect(message.intent).to.have.property("tags").that.is.an("array");
        }));

        if (message?.intent?.tags && message?.intent?.tags.length > 0) {
            message.intent.tags.forEach((tag, tagIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.tags[${tagIndex}]' should have properties 'display', 'descriptor', and 'list'`, function () {
                    expect(tag).to.have.property("display").that.is.a("boolean");
                    expect(tag).to.have.property("descriptor").that.is.an("object");
                    expect(tag).to.have.property("list").that.is.an("array");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                    expect(tag.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.tags[${tagIndex}].list' should be a non-empty array`, function () {
                    expect(tag.list).to.be.an("array").that.is.not.empty;
                }));

                tag.list.forEach((listItem, listItemIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.tags[${tagIndex}].list[${listItemIndex}]' should have properties 'descriptor' and 'value'`, function () {
                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                        expect(listItem).to.have.property("value").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${listItem.descriptor.code}'`, function () {
                        expect(listItem.descriptor.code).to.equal(listItem.descriptor.code);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                        expect(listItem.value).to.be.a("string").that.is.not.empty;
                    }));
                });
            });
        }

         return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
}