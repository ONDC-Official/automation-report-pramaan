const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const on_selectOneSchema = require("./schema/on_select_one.schema");
const on_selectThreeSchema = require("./schema/on_select_three.schema");
const { generateTests } = require("./common");
const constants = require("../utils/constants");
const response_verification = require("../centralizedUtilities/responseVerification");

function on_selectMessageTests({ context, message } = {}, constants = {}) {
    try {
        // Select schema based on step
        let schema;
        switch (constants?.step) {
            case "I":
            case "II":
                schema = on_selectOneSchema;
                break;
            case "III":
                schema = on_selectThreeSchema;
                break;
            default:
                break;
        }

        // Generate base schema tests
        const messageTestSuite = generateTests({ context, message }, schema, "Verification of Message for on_select", constants);

        message?.order?.items?.forEach((item, itemIndex) => {
            const xinput = item?.xinput;

            if (!xinput) return;

            //only for WC_8 + Step II
            if (
                (constants?.flowId === "WC_8" && constants?.step === "II") ||
                (constants?.flowId === "WC_12" && constants?.step === "II")
            ) {
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_62] 'message.order.items[${itemIndex}].xinput.form.id' should exist and be a non-empty string`, function () {
                    expect(xinput?.form?.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_63] 'message.order.items[${itemIndex}].xinput.form_response.status' should exist and be a non-empty string`, function () {
                    expect(xinput?.form_response?.status).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_64] 'message.order.items[${itemIndex}].xinput.form_response.submission_id' should exist and be a non-empty string`, function () {
                    expect(xinput?.form_response?.submission_id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
            }
            else if (constants?.step !== "III") {

                //other flows/steps
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_65] 'message.order.items[${itemIndex}].xinput.head.descriptor.name' should exist and be a non-empty string`, function () {
                    expect(xinput?.head?.descriptor?.name).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_66] 'message.order.items[${itemIndex}].xinput.head.index.min' should exist and be a number`, function () {
                    expect(xinput?.head?.index?.min).to.exist.and.to.be.a("number");
                }));
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_67] 'message.order.items[${itemIndex}].xinput.head.index.cur' should exist and be a number`, function () {
                    expect(xinput?.head?.index?.cur).to.exist.and.to.be.a("number");
                }));
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_68] 'message.order.items[${itemIndex}].xinput.head.index.max' should exist and be a number`, function () {
                    expect(xinput?.head?.index?.max).to.exist.and.to.be.a("number");
                }));
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_69] 'message.order.items[${itemIndex}].xinput.head.headings' should exist and be a non-empty array`, function () {
                    expect(xinput?.head?.headings).to.exist.and.to.be.an("array").that.is.not.empty;
                }));
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_70] 'message.order.items[${itemIndex}].xinput.form.id' should exist and be a non-empty string`, function () {
                    expect(xinput?.form?.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_71] 'message.order.items[${itemIndex}].xinput.form.mime_type' should exist and be a string`, function () {
                    expect(xinput?.form?.mime_type).to.exist.and.to.be.a("string");
                }));
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_72] 'message.order.items[${itemIndex}].xinput.form.url' should exist and be a non-empty string`, function () {
                    expect(xinput?.form?.url).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
                messageTestSuite.addTest(new Mocha.Test(`[id: wc_log_bpp_on_select_message_73] 'message.order.items[${itemIndex}].xinput.required' should exist and be a boolean`, function () {
                    expect(xinput?.required).to.exist.and.to.be.a("boolean");
                }));
            }

        });

        return messageTestSuite;
    } catch (err) {
        console.log(err);
        const errorTestSuite = new Mocha.Suite("Error in verification of message of on_select call");
        errorTestSuite.addTest(new Mocha.Test("Couldn't verify the message of on_select as payload might be missing or Some Internal Error", function () {
            expect(true).to.equal(false);
        }));
        return errorTestSuite;
    }
}

module.exports = async function on_select({ context, message } = {}, step = "",  flowId = "",logs = [],constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_select (${step}) request verification`);
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(on_selectMessageTests({ context, message }, constants));

         return [ testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
};