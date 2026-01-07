const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");
const { urlRegex, iso8601DurationRegex, isoTime } = require("../utils/constants.js");


function messageTests(context, message, testSuite, { type }) {
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

        /** message.issue.issue_actions tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'issue_actions' that is an object", function () {
            expect(message.issue).to.have.a.property("issue_actions").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.issue_actions' object should have 'respondent_actions' property", function () {
            expect(message.issue.issue_actions).to.have.property('respondent_actions');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.issue_actions.respondent_actions' should be an array that is not empty", function () {
            expect(message.issue.issue_actions.respondent_actions).to.be.an("array").that.is.not.empty;
        }));

        if (message?.issue?.issue_actions?.respondent_actions && message?.issue?.issue_actions?.respondent_actions.length > 0) {
            message?.issue?.issue_actions?.respondent_actions.forEach(function (action, index) {
                // Check if 'respondent_action' has the necessary properties
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}]' should contains all the necessary properties`, function () {
                    expect(action).to.have.all.keys('respondent_action', 'short_desc', 'updated_at', 'updated_by', 'cascaded_level');
                }));

                // Check 'respondent_action' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].respondent_action' should be a string`, function () {
                    expect(action.respondent_action).to.be.a("string").and.to.be.oneOf(["CLOSE", "OPEN", "PROCESSING"]);
                }));

                // Check 'short_desc' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].short_desc' should be a string`, function () {
                    expect(action.short_desc).to.be.a("string").that.has.length.above(0);
                }));

                // Check 'updated_at' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].updated_at' should be a valid ISO 8601 date`, function () {
                    expect(action.updated_at).to.match(isoTime);
                }));

                // Check 'updated_by' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].updated_by' include all the keys`, function () {
                    expect(action.updated_by).to.have.all.keys('org', 'contact', 'person');
                }));

                // Check 'org' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].updated_by.org' should have a property 'name' that is a string`, function () {
                    expect(action.updated_by.org).to.have.property('name');
                }));

                // Check 'org.name' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].updated_by.org.name' should include the bpp_id`, function () {
                    expect(action.updated_by.org.name).to.include(context?.bpp_id);
                }));

                // Check 'contact' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].updated_by.contact' should be an object having properties 'phone' and 'email'`, function () {
                    expect(action.updated_by.contact).to.be.an("object").and.have.all.keys('phone', 'email');
                }));

                // Check 'phone' in 'contact'
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].updated_by.contact.phone' should be a string`, function () {
                    expect(action.updated_by.contact.phone).to.be.a("string");
                }));

                // Check 'email' in 'contact'
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].updated_by.contact.email' should be a string`, function () {
                    expect(action.updated_by.contact.email).to.be.a("string");
                }));

                // Check 'person' property
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].updated_by.updated_at.person' should be an object having a property name that is a string`, function () {
                    expect(action.updated_by.person).to.be.an("object").and.to.have.property('name').that.is.a("string");
                }));

                // check 'cascaded_level' property in the repondent_actions field
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].cascaded_level' should be a number`, function () {
                    expect(action.cascaded_level).to.be.a("number");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].cascaded_level' should be equal to 1`, function () {
                    expect(action.cascaded_level).to.equal(1);
                }));
            });
        }

        /** message.issue.created_at tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'created_at' that is a string", function () {
            expect(message.issue).to.have.property("created_at").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.created_at' should be a valid ISO 8601 date", function () {
            expect(message.issue.created_at).matches(isoTime);
        }));

        /** message.issue.updated_at tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'updated_at' that is a string", function () {
            expect(message.issue).to.have.property("updated_at").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.updated_at' should be a valid ISO 8601 date", function () {
            expect(message.issue.updated_at).matches(isoTime);
        }));
    } catch (err) {
        console.log(err);
        return err;
    }
}


async function on_issue({ context, message } = {}, step, type_of_loan, version = "", domain = "") {
    try {
        const testSuite = new Mocha.Suite(`on_issue (${step}) request verification`);

        contextTests(context, "on_issue", testSuite, version, domain);
        messageTests(context, message, testSuite, { type: type_of_loan, step });

        return testSuite;
    } catch (err) {
        console.log(err);
        return err;
    }
}



module.exports = {
    on_issue
}