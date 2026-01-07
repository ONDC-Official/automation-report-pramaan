const contextTests = require("./context");
const Mocha = require("mocha");
const { expect } = require("chai");

const { iso8601DurationRegex, urlRegex, isoTime } = require("../utils/constants.js");

function messageTests(context, message, testSuite) {
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
                    expect(action.respondent_action).to.be.a("string").and.to.be.oneOf(["CLOSE", "OPEN", "PROCESSING", "RESOLVED"]);
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
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.respondent_actions[${index}].updated_by' should have a property 'name' that is a string`, function () {
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

        const isResolved = message?.issue?.issue_actions?.respondent_actions.find((action) => {
            return action?.respondent_action === "RESOLVED";
        })

        // if it is resolved then these test cases should run
        if (isResolved) {
            /** tests for resolution_provider */
            messageTestSuite.addTest(new Mocha.Test("'message.issue.resolution_provider' object should have 'respondent_info' property", function () {
                expect(message.issue.resolution_provider).to.have.property('respondent_info');
            }));

            const respondentInfo = message?.issue?.resolution_provider?.respondent_info;
            messageTestSuite.addTest(new Mocha.Test("'message.issue.resolution_provider.respondent_info' should have 'type', 'organization', and 'resolution_support' properties", function () {
                expect(respondentInfo).to.have.all.keys('type', 'organization', 'resolution_support');
            }));

            messageTestSuite.addTest(new Mocha.Test("'type' in 'message.issue.resolution_provider.respondent_info' should be a string", function () {
                expect(respondentInfo.type).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("'organization' in 'message.issue.resolution_provider.respondent_info' should have 'org', 'contact', and 'person' properties", function () {
                expect(respondentInfo.organization).to.have.all.keys('org', 'contact', 'person');
            }));

            const organization = respondentInfo?.organization;
            messageTestSuite.addTest(new Mocha.Test("'org' in 'message.issue.resolution_provider.respondent_info.organization' should have 'name' property", function () {
                expect(organization.org).to.have.property('name');
            }));

            messageTestSuite.addTest(new Mocha.Test("'contact' in 'message.issue.resolution_provider.respondent_info.organization' should have 'phone' and 'email' properties", function () {
                expect(organization.contact).to.have.all.keys('phone', 'email');
            }));

            messageTestSuite.addTest(new Mocha.Test("'phone' in 'message.issue.resolution_provider.respondent_info.organization.contact' should be a string", function () {
                expect(organization.contact.phone).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("'email' in 'message.issue.resolution_provider.respondent_info.organization.contact' should be a string", function () {
                expect(organization.contact.email).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("'person' in 'message.issue.resolution_provider.respondent_info.organization' should have 'name' property", function () {
                expect(organization.person).to.have.property('name');
            }));

            messageTestSuite.addTest(new Mocha.Test("'resolution_support' in 'message.issue.resolution_provider.respondent_info' should have a property 'contact' that is an object", function () {
                expect(respondentInfo.resolution_support).to.have.property('contact').that.is.an("object");
            }));

            const resolutionSupport = respondentInfo?.resolution_support;
            messageTestSuite.addTest(new Mocha.Test("'contact' in 'message.issue.resolution_provider.respondent_info.resolution_support' should have 'phone' and 'email' properties", function () {
                expect(resolutionSupport.contact).to.have.all.keys('phone', 'email');
            }));

            messageTestSuite.addTest(new Mocha.Test("'phone' in 'message.issue.resolution_provider.respondent_info.resolution_support.contact' should be a string", function () {
                expect(resolutionSupport.contact.phone).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("'email' in 'message.issue.resolution_provider.respondent_info.resolution_support.contact' should be a string", function () {
                expect(resolutionSupport.contact.email).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("'resolution_support' in 'message.issue.resolution_provider.respondent_info' should have a property 'gros' that is an array", function () {
                expect(respondentInfo.resolution_support).to.have.property('gros').that.is.an("array");
            }));

            resolutionSupport?.gros.forEach(function (gro, index) {
                messageTestSuite.addTest(new Mocha.Test(`'gro' at index ${index} in 'message.issue.resolution_provider.respondent_info.resolution_support' should have property 'person' that is an object`, function () {
                    expect(gro).to.have.property('person').that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'gro.person' at index ${index} in 'message.issue.resolution_provider.respondent_info.resolution_support' should have a property named 'name'`, function () {
                    expect(gro.person).to.have.property('name');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'gro' at index ${index} in 'message.issue.resolution_provider.respondent_info.resolution_support' should have property 'contact' that is an object`, function () {
                    expect(gro).to.have.property('contact').that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'gro.contact' at index ${index} in 'message.issue.resolution_provider.respondent_info.resolution_support' should have properties 'phone' and 'email'`, function () {
                    expect(gro.contact).to.have.all.keys('phone', 'email');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'gro.contact.phone' at index ${index} in 'message.issue.resolution_provider.respondent_info.resolution_support' should be a string`, function () {
                    expect(gro.contact.phone).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'gro.contact.email' at index ${index} in 'message.issue.resolution_provider.respondent_info.resolution_support' should be a string`, function () {
                    expect(gro.contact.email).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'gro' at index ${index} in 'message.issue.resolution_provider.respondent_info.resolution_support' should have property 'gro_type' that is a string`, function () {
                    expect(gro).to.have.property('gro_type').that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'gro.gro_type' at index ${index} in 'message.issue.resolution_provider.respondent_info.resolution_support' should be a string`, function () {
                    expect(gro.gro_type).to.be.a("string").and.to.be.oneOf(["INTERFACING-NP-GRO", "TRANSACTION-COUNTERPARTY-NP-GRO", "CASCADED-COUNTERPARTY-NP-GRO"]);
                }));
            });

            messageTestSuite.addTest(new Mocha.Test("'resolution_support' in 'message.issue.resolution_provider.respondent_info' should have a property 'chat_link' that is a string (OPTIONAL)", function () {
                expect(respondentInfo.resolution_support).to.have.property('chat_link').that.is.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("'chat_link' in 'resolution_support' should be a string (OPTIONAL)", function () {
                expect(resolutionSupport.chat_link).to.be.a("string");
            }));


            const resolution = message?.issue?.resolution;
            if (resolution?.refund_amount) {
                messageTestSuite.addTest(new Mocha.Test("'refund_amount' in 'message.issue.resolution' should be a string", function () {
                    expect(resolution.refund_amount).to.be.a("string");
                }));
            } else {
                messageTestSuite.addTest(new Mocha.Test("'message.issue.resolution' object should have 'short_desc' property", function () {
                    expect(message.issue.resolution).to.have.property('short_desc');
                }));

                messageTestSuite.addTest(new Mocha.Test("'message.issue.resolution' object should have 'action_triggered' property", function () {
                    expect(message.issue.resolution).to.have.property('action_triggered');
                }));
            }

            messageTestSuite.addTest(new Mocha.Test("'short_desc' in 'message.issue.resolution' should be a string", function () {
                expect(resolution.short_desc).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("'message.issue.resolution' object should have property named 'long_desc' which is a string (OPTIONAL)", function () {
                expect(message.issue.resolution).to.have.property('long_desc').that.is.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("'long_desc' in 'message.issue.resolution' should be a string (OPTIONAL)", function () {
                expect(resolution.long_desc).to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test("'action_triggered' in 'message.issue.resolution' should be a string", function () {
                expect(resolution.action_triggered).to.be.a("string");
            }));
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}


async function on_issue_status({ context, message } = {}, step, version = "", domain = "") {
    try {
        const testSuite = new Mocha.Suite(`on_issue_status (${step}) Request Verification`);

        contextTests(context, "on_issue_status", testSuite, version, domain);
        messageTests(context, message, testSuite);

        return testSuite;
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    on_issue_status
}