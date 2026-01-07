const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const response_verification = require("../../centralizedUtilities/responseVerification");

async function search({ context, message } = {}, step, testCaseId, logs = [], constants = {}) {
    const testSuite = new Mocha.Suite(`Search (${step}) Request Verification`);
    try {
        contextTests(context, "search", testSuite, logs, constants);

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        function runResponseVerification(context, message, logs, constants) {
            return response_verification({ context, message }, logs, constants);
        }
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

        let testcaseCounter = 1;

        const getNextTestcaseId = () => {
            return testcaseCounter++;
        };

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]  Verify the presence of 'message' object`, function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message' should have a property named 'intent' which is an object`, function () {
            expect(message).to.have.property("intent").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent' should have a property named 'category' which is an object`, function () {
            expect(message.intent).to.have.property("category").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.category' should have a property named 'descriptor' which is an object`, function () {
            expect(message.intent.category).to.have.property("descriptor").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if code exists in 'message.intent.category.descriptor' object and is of type string`, function () {
            const categoryDescriptorCode = message.intent?.category?.descriptor?.code;
            expect(categoryDescriptorCode, "Category descriptor code should exist and be a string").to.exist.and.to.be.a('string');
        }));


        if (step === "II" || step === "III" || step === "IV") {
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent' should have a property named 'provider' which is an object`, function () {
                expect(message.intent).to.have.property("provider").that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.provider' should have a property named 'id' which is a string`, function () {
                expect(message.intent.provider).to.have.property("id").that.is.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.provider' should have a property named 'items' which is an array`, function () {
                expect(message.intent.provider).to.have.property("items").that.is.an("array");
            }));

            if (message?.intent?.provider?.items && message?.intent?.provider?.items.length > 0) {
                message?.intent?.provider?.items.forEach((item, itemIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.provider.items[${itemIndex}].id' should be a string (OPTIONAL)`, function () {
                        expect(item.id).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.provider.items[${itemIndex}].xinput' should be an object`, function () {
                        expect(item.xinput).to.be.an('object');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.provider.items[${itemIndex}].xinput.form' should be an object`, function () {
                        expect(item.xinput.form).to.be.an('object');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.provider.items[${itemIndex}].xinput.form.id' should be a string (OPTIONAL)`, function () {
                        expect(item.xinput.form.id).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.provider.items[${itemIndex}].xinput.form_response' should be an object (OPTIONAL)`, function () {
                        expect(item.xinput.form_response).to.be.an('object');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.provider.items[${itemIndex}].xinput.form_response.status' should be a string`, function () {
                        expect(item.xinput.form_response.status).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.provider.items[${itemIndex}].xinput.form_response.status' should be one of [ 'APPROVED', 'SUCCESS', 'EXPIRED', 'REJECTED', 'PENDING' ]`, function () {
                        expect(item.xinput.form_response.status).to.be.oneOf(['APPROVED', 'SUCCESS', 'EXPIRED', 'REJECTED', 'PENDING']);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.provider.items[${itemIndex}].xinput.form_response.submission_id' should be a string (OPTIONAL)`, function () {
                        expect(item.xinput.form_response.submission_id).to.be.a('string');
                    }));
                })
            }

        }

        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent' should have a property named 'payment' which is an object`, function () {
            expect(message.intent).to.have.property("payment").that.is.an("object");
        }));


        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify if 'collected_by' property exists in 'message.intent.payment' object and is of type string`, function () {
            const collectedBy = message.intent?.payment?.collected_by;
            expect(collectedBy, "Collected by should exist and be a string").to.exist.and.to.be.a('string');
        }));



        const arr = [{ code: "BAP_TERMS" }];

        arr.forEach((ele) => {
            const tagIndex = message?.intent?.payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
            const tagItem = message?.intent?.payment?.tags[tagIndex];
            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags' should have an object of ${ele.code}`, function () {
                expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
            }));

            if (tagIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                    expect(tagItem).to.have.property("display").that.is.a("boolean");
                    expect(tagItem).to.have.property("list").that.is.an("array");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] Verify the presence of 'message.order.payment.tagitem[${tagIndex}].descriptor.name' which is a string`, function () {
                    expect(tagItem.descriptor.name).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags[${tagIndex}].display' should have be equal to false`, function () {
                    expect(tagItem.display).to.be.equal(false);
                }));

                messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags[${tagIndex}].list' should have be a non empty array`, function () {
                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                }));

                const bapTermsArr = [{ code: "BUYER_FINDER_FEES_TYPE" }, { code: "BUYER_FINDER_FEES_PERCENTAGE" }, { code: "DELAY_INTEREST" }, { code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];
                let array = bapTermsArr;
                array.forEach((it) => {
                    const listItemIndex = tagItem?.list?.findIndex((listItem) => listItem?.descriptor?.code === it?.code);
                    const listItem = tagItem?.list[listItemIndex];

                    messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                        expect(listItem).to.exist.and.to.be.an("object");
                    }));

                    if (listItemIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                            expect(listItem).to.have.property("value").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                            expect(listItem.descriptor.code).to.be.equal(it.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}] 'message.intent.payment.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                        }));
                    }
                });

            }
        });
        if (responseTestSuite) {
            return [testSuite, responseTestSuite];
        } else { return [testSuite] }
    } catch (error) {
        testSuite.addTest(new Mocha.Test("search request failed to be verified because of some missing payload or some internal error", function () {
            expect(true).to.equal(false);
        }));
        console.log(error);
        return testSuite;
    }

};
module.exports = {
    search
}
