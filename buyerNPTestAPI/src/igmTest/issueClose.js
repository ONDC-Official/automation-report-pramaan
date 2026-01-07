const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");
const { urlRegex, iso8601DurationRegex, isoTime } = require("../utils/constants");


function messageTests({ context, message } = {}, testSuite, { type, step }) {
    try {
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("'message' should exist and should be an object", function () {
            expect(message).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'issue'", function () {
            expect(message).to.have.property("issue").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'id' that is a string", function () {
            expect(message.issue).to.have.property("id").that.is.a("string").that.has.length.above(0);
        }));

        /** message.issue.status tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'status' that is a string", function () {
            expect(message.issue).to.have.property("status").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.status' should be a string and either 'OPEN' or 'CLOSED'", function () {
            expect(message.issue.status).to.be.a("string").and.to.be.oneOf(["OPEN", "CLOSED"]);
        }));

        /** message.issue.issue_actions tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'issue_actions' that is an object", function () {
            expect(message.issue).to.have.a.property("issue_actions").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.issue_actions' object should have 'complainant_actions' property", function () {
            expect(message.issue.issue_actions).to.have.property('complainant_actions');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.issue_actions.complainant_actions' should be an array that is not empty", function () {
            expect(message.issue.issue_actions.complainant_actions).to.be.an("array").that.is.not.empty;
        }));

        if (message?.issue?.issue_actions?.complainant_actions && message?.issue?.issue_actions?.complainant_actions.length > 0) {
            message?.issue?.issue_actions?.complainant_actions.forEach(function (action, index) {
                // Check if 'complainant_action' has the necessary properties
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}]' should contains all the necessary properties`, function () {
                    expect(action).to.have.all.keys('complainant_action', 'short_desc', 'updated_at', 'updated_by');
                }));

                // Check 'complainant_action' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}].complainant_action' should be a string`, function () {
                    expect(action.complainant_action).to.be.a("string").and.to.be.oneOf(["CLOSE", "OPEN"]);
                }));

                // Check 'short_desc' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}].short_desc' should be a string`, function () {
                    expect(action.short_desc).to.be.a("string").that.has.length.above(0);
                }));

                // Check 'updated_at' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}].updated_at' should be a valid ISO 8601 date`, function () {
                    expect(action.updated_at).to.match(isoTime);
                }));

                // Check 'updated_by' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}].updated_by' include all the keys`, function () {
                    expect(action.updated_by).to.have.all.keys('org', 'contact', 'person');
                }));

                // Check 'org' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}].updated_by' should have a property 'name' that is a string`, function () {
                    expect(action.updated_by.org).to.have.property('name');
                }));

                // Check 'contact' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}].updated_by.contact' should be an object having properties 'phone' and 'email'`, function () {
                    expect(action.updated_by.contact).to.be.an("object").and.have.all.keys('phone', 'email');
                }));

                // Check 'phone' in 'contact'
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}].updated_by.contact.phone' should be a string`, function () {
                    expect(action.updated_by.contact.phone).to.be.a("string");
                }));

                // Check 'email' in 'contact'
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}].updated_by.contact.email' should be a string`, function () {
                    expect(action.updated_by.contact.email).to.be.a("string");
                }));

                // Check 'person' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}].updated_by.updated_at.person' should be an object having a property name that is a string`, function () {
                    expect(action.updated_by.person).to.be.an("object").and.to.have.property('name').that.is.a("string");
                }));
            });
        }

        /** message.issue.created_at tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'created_at' that is a string", function () {
            expect(message.issue).to.have.property("created_at").that.is.a("string").that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.created_at' should be a valid ISO 8601 date", function () {
            expect(message.issue.created_at).matches(isoTime);
        }));

        /** message.issue.updated_at tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'updated_at' that is a string", function () {
            expect(message.issue).to.have.property("updated_at").that.is.a("string").that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.updated_at' should be a valid ISO 8601 date", function () {
            expect(message.issue.updated_at).matches(isoTime);
        }));

        if (step === "issue_close") {
            messageTestSuite.addTest(new Mocha.Test("'message.issue.rating' should be a string and to be either 'THUMBS-UP' and 'THUMBS-DOWN'", function () {
                expect(message.issue.rating).to.be.a("string").and.to.be.oneOf(['THUMBS-UP', 'THUMBS-DOWN']);
            }));
        }

    } catch (err) {
        console.log(err);
        return err;
    }
}


async function issue_close({ context, message } = {}, step, type_of_loan = "", version = "", domain = "") {
    try {
        const testSuite = new Mocha.Suite(`Issue (${step}) request verification`);

        contextTests(context, "issue", testSuite, version, domain);
        messageTests({ context, message }, testSuite, { type: type_of_loan, step });

        return testSuite;
    } catch (err) {
        console.log(err);
        return err;
    }
}



module.exports = {
    issue_close
}