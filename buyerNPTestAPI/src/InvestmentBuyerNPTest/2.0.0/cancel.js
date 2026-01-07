const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require('./context');

module.exports = async function cancel({ context, message } = {}, testCaseId, flowId) {
    try {
        let testcaseCounter = 1;

        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };

        const testSuite = new Mocha.Suite('Cancel Request Verification');
        contextTests(context, 'cancel', testSuite);
        const messageTestSuite = Mocha.Suite.create(testSuite, 'Verification of Message');

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]Verify the presence of 'message' object`, function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message' should have a property named 'order_id' which is a string`, function () {
            expect(message).to.have.property('order_id').that.is.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message' should have a property named 'cancellation_reason_id' which is a string`, function () {
            expect(message).to.have.property('cancellation_reason_id').that.is.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message' should have a property named 'tags' which is an array`, function () {
            expect(message).to.have.property('tags').that.is.an('array');
        }));

        const arr = [{ code: "CONSUMER_INFO" }];

        arr.forEach((ele) => {
            const tagIndex = message?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
            const tagItem = message?.tags[tagIndex];
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags' should have an object of ${ele.code}`, function () {
                expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
            }));

            if (tagIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}]' should have properties named 'descriptor', display and 'list'`, function () {
                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                    expect(tagItem).to.have.property("display").that.is.a("boolean");
                    expect(tagItem).to.have.property("list").that.is.an("array");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].display' which is a boolean`, function () {
                    expect(tagItem.display).that.is.a("boolean");
                }));
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string (OPTIONAL)`, function () {
                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                }));
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].descriptor.name' should  be a string`, function () {
                    expect(tagItem.descriptor.name).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].list' should have be a non empty array`, function () {
                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                }));

                const consumerInfoArr = [{ code: "IP_ADDRESS" }];

                let array;
                switch (tagItem?.descriptor?.code) {
                    case "CONSUMER_INFO":
                        array = consumerInfoArr;
                        break;
                    default:
                        break;
                }

                if (array) {
                    array.forEach((it) => {
                        const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                        const listItem = tagItem?.list[listItemIndex];

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                            expect(listItem).to.exist.and.to.be.an("object");
                        }));

                        if (listItemIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                expect(listItem).to.have.property("descriptor").that.is.an("object");
                                expect(listItem).to.have.property("value").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string (OPTIONAL)`, function () {
                                expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                expect(listItem.descriptor.code).to.be.equal(it.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be a string`, function () {
                                expect(listItem.descriptor.name).to.be.a('string').that.is.not.empty;
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.tags[${tagIndex}].list[${listItemIndex}].value' should be a string`, function () {
                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                            }));

                        }
                    });
                }
            }
        });

        return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
};
