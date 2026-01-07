const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const on_initOneSchema = require("./schema/on_init_one.schema");
const on_initTwoSchema = require("./schema/on_init_two.schema");
const on_initThreeSchema = require("./schema/on_init_three.schema");
const on_initFourSchema = require("./schema/on_init_four.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function generateOrderTagsTestCases(message, messageTestSuite) {
    try {
        const tags = message?.order?.tags;

        messageTestSuite.addTest(new Mocha.Test(`'message.order.tags' should exist and be an array`, function () {
            expect(tags).to.exist.and.to.be.an("array");
        }));

        if (tags && tags.length > 0) {
            const arr = [{ code: "BPP_TERMS" }];

            arr.forEach((ele) => {
                const tagIndex = tags.findIndex((tag) => tag?.descriptor?.code === ele?.code);
                const tag = tags[tagIndex];

                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_71] Verify if 'message.order.tags[${tagIndex}]' contains necessary keys`, function () {
                    expect(tag).to.include.all.keys("descriptor", "list", "display");
                    expect(tag.descriptor).to.exist.and.to.be.an("object");
                    expect(tag.list).to.exist.and.to.be.an("array");
                    expect(tag.display).to.exist.and.to.be.a("boolean");
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_72] Verify if 'message.order.tags[${tagIndex}].descriptor' contains necessary keys`, function () {
                    expect(tag.descriptor).to.include.all.keys("code", "name");
                    expect(tag.descriptor.code).to.exist;
                    expect(tag.descriptor.name).to.exist;
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_73] Verify if 'message.order.tags[${tagIndex}].descriptor.code' is '${ele.code}'`, function () {
                    expect(tag.descriptor.code).to.be.a("string").and.to.equal(ele.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_74] Verify if 'message.order.tags[${tagIndex}].descriptor.name' is a string`, function () {
                    expect(tag.descriptor.name).to.be.a("string");
                }));

                if (tag?.list && tag?.list.length > 0) {
                    let listArr;

                    const bppTermsArr = [
                        { code: "BUYER_FINDER_FEES_TYPE" },
                        { code: "BUYER_FINDER_FEES_PERCENTAGE" },
                        { code: "SETTLEMENT_WINDOW" },
                        { code: "SETTLEMENT_BASIS" },
                        { code: "MANDATORY_ARBITRATION" },
                        { code: "COURT_JURISDICTION" },
                        { code: "STATIC_TERMS" },
                        { code: "SETTLEMENT_AMOUNT" },
                        { code: "OFFLINE_CONTRACT" }
                    ];

                    switch (ele.code) {
                        case "BPP_TERMS":
                            listArr = bppTermsArr;
                            break;
                        default:
                            listArr = [];
                            break;
                    }

                    listArr.forEach((it) => {
                        const bppTermsListItemIndex = tag.list.findIndex((listItem) => listItem?.descriptor?.code === it.code);
                        const bppTermsListItem = tag.list[bppTermsListItemIndex];

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_75] Verify if 'message.order.tags[${tagIndex}].list[${bppTermsListItemIndex}]' contains properties 'descriptor' and 'value' (${it.code})`, function () {
                            expect(bppTermsListItem).to.include.all.keys("descriptor", "value");
                            expect(bppTermsListItem.descriptor).to.exist.and.to.be.an("object");
                            expect(bppTermsListItem.value).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_76] Verify if 'message.order.tags[${tagIndex}].list[${bppTermsListItemIndex}].descriptor' contains property 'code'`, function () {
                            expect(bppTermsListItem.descriptor).to.include.all.keys("code");
                            expect(bppTermsListItem.descriptor.code).to.exist;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_77] 'message.order.tags[${tagIndex}].list[${bppTermsListItemIndex}].descriptor.code' should be equal to ${it.code}`, function () {
                            expect(bppTermsListItem.descriptor.code).to.be.equal(it.code)
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_78] Verify if 'message.order.tags[${tagIndex}].list[${bppTermsListItemIndex}].value' is a string`, function () {
                            expect(bppTermsListItem.value).to.be.a("string");
                        }));
                    });
                }

                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_79] Verify if 'message.order.tags[${tagIndex}].display' should be a 'boolean'`, function () {
                    expect(tag.display).to.be.a('boolean');
                }));
            });
        }

    } catch (err) {
        console.log("Error in generateOrderTagsTestCases:", err);
        // Add error test case if needed
        messageTestSuite.addTest(new Mocha.Test(`Error in verifying message.order.tags`, function () {
            expect(false).to.be.true; // This will fail and show the error
        }));
    }
}



function on_initMessageTests({ context, message } = {}, constants = {}) {
    let schema;
    const { step } = constants;

    switch (step) {
        case "I":
            schema = on_initOneSchema;
            break;
        case "II":
            schema = on_initTwoSchema;
            break;
        case "III":
            schema = on_initThreeSchema;
            break;
        case "IV":
            schema = on_initFourSchema;
            break;
        case "on_init_initiate_drawdown":
            schema = on_initFourSchema;
            break;
        case "on_init_upload_invoice":
            schema = on_initFourSchema;
            break;
        default:
            break;
    }

    try {
        const messageTestSuite = generateTests({ context, message }, schema, "Verification of Message for on_init", constants);

        // Not Add order tags test cases only
        if (!(constants?.flowId === "WC_8" && constants?.step === "I")) {
            generateOrderTagsTestCases(message, messageTestSuite);
        }

        // xinput test cases
        if (!((constants?.flowId === "WC_8" && constants?.step === "I") ||
            (constants?.flowId === "WC_1" && constants?.step === "IV") ||
            (constants?.flowId === "WC_9" && constants?.step === "IV")||
            (constants?.flowId === "WC_12" && constants?.step === "IV")
        )) {

            try {
                if (message?.order?.items?.length > 0) {
                    message.order.items.forEach((item, itemIndex) => {
                        const xinput = item?.xinput;
                        if (!xinput) return;

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_108] 'message.order.items[${itemIndex}].xinput.head.descriptor.name' should exist and be a non-empty string`, function () {
                            expect(xinput?.head?.descriptor?.name).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_109] 'message.order.items[${itemIndex}].xinput.head.index.min' should exist and be a number`, function () {
                            expect(xinput?.head?.index?.min).to.exist.and.to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_110] 'message.order.items[${itemIndex}].xinput.head.index.cur' should exist and be a number`, function () {
                            expect(xinput?.head?.index?.cur).to.exist.and.to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_111] 'message.order.items[${itemIndex}].xinput.head.index.max' should exist and be a number`, function () {
                            expect(xinput?.head?.index?.max).to.exist.and.to.be.a("number");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_112] 'message.order.items[${itemIndex}].xinput.head.headings' should exist and be a non-empty array`, function () {
                            expect(xinput?.head?.headings).to.exist.and.to.be.an("array").that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_113] 'message.order.items[${itemIndex}].xinput.form.id' should exist and be a non-empty string`, function () {
                            expect(xinput?.form?.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_114] 'message.order.items[${itemIndex}].xinput.form.mime_type' should exist and be a string`, function () {
                            expect(xinput?.form?.mime_type).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_115] 'message.order.items[${itemIndex}].xinput.form.url' should exist and be a string`, function () {
                            expect(xinput?.form?.url).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_init_message_116] 'message.order.items[${itemIndex}].xinput.required' should exist and be a boolean`, function () {
                            expect(xinput?.required).to.exist.and.to.be.a("boolean");
                        }));
                    });
                }
            } catch (err) {
                console.log("Error in xinput test cases:", err);
                messageTestSuite.addTest(new Mocha.Test(`Error in verifying message.order.items xinput`, function () {
                    expect(false).to.be.true; // This will fail and show the error
                }));
            }
        }

        return messageTestSuite;
    } catch (err) {
        console.log(err);
        const errorTestSuite = new Mocha.Suite("Error in verification of message of on_init call");
        errorTestSuite.addTest(new Mocha.Test("Couldn't verify the message of on_init as payload might be missing or Some Internal Error", function () {
            expect(true).to.equal(false);
        }));
        return errorTestSuite;
    }
}

const stepMap = {
    "I": "I",
    "II": "II",
    "III": "III",
    "IV": "IV",
    "on_init_initiate_drawdown": "Initiate Drawdown",
    "on_init_upload_invoice": "Upload Invoice"
}

module.exports = async function on_init({ context, message } = {}, step = "", flowId, logs = [], constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_init (${stepMap[step]}) request verification`);
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(on_initMessageTests({ context, message }, constants));

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}