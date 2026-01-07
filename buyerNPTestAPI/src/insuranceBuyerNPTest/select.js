const Mocha = require("mocha");
const contextTests = require("./context")
const { expect } = require("chai");
const { quoteTests, itemsCommonFieldsTests, providerWithID, xinputOnStatusGeneral, fulfillmentsTests, itemsWithXinputTests } = require('./commonTest');
const response_verification = require("../centralizedUtilities/responseVerification");

module.exports = async function select({ context, message } = "", { category, step },logs = [],constants ={}) {
    const testSuite = new Mocha.Suite(`Select (${step}) Request Verification`);
    contextTests(context, "select", testSuite);
    const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
    const responseTestSuite = response_verification({ context, message }, logs,constants);

    messageTestSuite.addTest(new Mocha.Test("should have 'message' properties", function () {
        expect(message, "Request body shouldn't be null and undefined").to.exist;
        expect(message).to.exist;
    }));

    switch (category) {
        case 'MARINE_INSURANCE':
            marineSelectTests(message, messageTestSuite);
            break;
        case 'HEALTH_INSURANCE':
            healthSelectTests(message, messageTestSuite);
            break;
        case 'MOTOR_INSURANCE':
            motorSelectTests(message, messageTestSuite, step);
            break;
        default:
        // throw new Error(`Invalid search type: ${category}`);
    }

     return [responseTestSuite, testSuite];
};

function marineSelectTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
            expect(message).to.exist.a.property("order").that.is.an("object");
        }));
        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'items' which is an array", function () {
            expect(message.order).to.exist;
            expect(message.order).to.be.an("object").that.has.property("items").that.is.an("array").and.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items?.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}]' should be an object`, function () {
                    expect(item).to.be.an("object").that.includes.all.keys("id", "xinput");
                }));
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${i}].id' should be an string`, function () {
                    expect(item.id).to.be.an("string");
                }));
                xinputOnStatusGeneral(message, messageTestSuite);
            })
        }
        providerWithID(message, messageTestSuite)
    } catch (err) {
        console.log(err);
        return err;
    }
}

function healthSelectTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
            expect(message).to.exist.a.property("order").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'items' which is an array", function () {
            expect(message.order).to.exist.a.property("items").that.is.an("array");
        }));

        itemsCommonFieldsTests(message, messageTestSuite);
        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
            expect(message.order).to.exist.a.property("provider").that.is.an("object");
        }));

        providerWithID(message, messageTestSuite)
    } catch (err) {
        console.log(err);
        return err;
    }
}

function motorSelectTests(message, messageTestSuite, step) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order' which is an object", function () {
            expect(message).to.exist.a.property("order").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.items' should be an array that is not empty", function () {
            expect(message.order?.items, "Order items should exist").to.be.an('array').that.is.not.empty;
        }));

        if (message?.order?.items && message?.order?.items.length > 0) {
            message?.order?.items.forEach((item, index) => {
                messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.items[${index}]' should be an object`, function () {
                    expect(item).to.be.an("object").that.includes.all.keys("add_ons", "id", "parent_item_id");
                }));

                itemsCommonFieldsTests(message, messageTestSuite);

                if (step === 'II' || step === 'III') {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}]' should have a property 'xinput' that is an object`, function () {
                        expect(item).to.have.a.property("xinput").that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput' should have a property 'form' that is an object`, function () {
                        expect(item.xinput).to.have.a.property("form").that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form' should have a property 'id' that is a string (OPTIONAL)`, function () {
                        expect(item.xinput.form).to.have.a.property("id").that.is.a("string").and.has.a.lengthOf.above(0);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput' should have a property 'form_response' that is an object`, function () {
                        expect(item.xinput).to.have.a.property("form_response").that.is.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${index}].xinput.form_response' should have properties 'status' and 'submission_id' that are strings`, function () {
                        expect(item.xinput.form_response).to.include.all.keys("status", "submission_id");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form_response.status' exists and is of type string (OPTIONAL)`, function () {
                        expect(item.xinput.form_response.status, "'form_response.status' should exist and be a string").to.exist.and.to.be.a('string').that.is.oneOf(["SUCCESS", "APPROVED"]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify if 'message.order.items[${index}].xinput.form_response.submission_id' exists and is of type string (OPTIONAL)`, function () {
                        expect(item.xinput.form_response.submission_id, "'form_response.submission_id' should exist and be a string").to.exist.and.to.be.a('string');
                    }));
                }
            });
        }

        //provider
        providerWithID(message, messageTestSuite);
    } catch (err) {
        console.log(err);
        return err;
    }
}
