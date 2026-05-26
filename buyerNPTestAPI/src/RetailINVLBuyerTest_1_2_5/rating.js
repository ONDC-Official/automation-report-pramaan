const Mocha = require('mocha');
const { expect } = require('chai');
const contextTests = require("./context");

module.exports = async function rating({ context, message } = {}, logs = [], constants = {}) {
    try {

        const testSuite = new Mocha.Suite(`rating Request Verification`);
        constants = { ...constants, action: "rating" };
        testSuite.addSuite(contextTests(context, constants, logs));

        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message' which is an object", function () {
            expect(message).to.exist;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'order_id' which is a string", function () {
            expect(message.order_id).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'ratings' which is an array", function () {
            expect(message.ratings).to.be.an("array");
        }));

        if (message?.ratings && message?.ratings.length > 0) {
            message.ratings.forEach((ratingItem, ratingIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.ratings[${ratingIndex}]' should be an object`, function () {
                    expect(ratingItem).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.ratings[${ratingIndex}]' should have a property named 'rating_category' which is a string`, function () {
                    expect(ratingItem.rating_category).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.ratings[${ratingIndex}]' should have a property named 'id' which is a string`, function () {
                    expect(ratingItem.id).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.ratings[${ratingIndex}]' should have a property named 'value' which is a string`, function () {
                    expect(ratingItem.value).to.be.a("string");
                }));
            });
        }
        return testSuite;
    } catch (error) {
        console.log(error);
        return error;
    }
}
