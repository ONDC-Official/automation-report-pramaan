const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");
const { urlRegex, iso8601DurationRegex, isoTime } = require("../utils/constants");


function messageTests({ context, message } = {}, testSuite, step = "") {
    try {
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        if (step !== "issue_open") {
            messageTestSuite.addTest(new Mocha.Test("'message' should have property 'update_target' that is an array", function () {
                expect(message).to.have.property('update_target').that.is.an('array');
            }));

            if (message?.update_target && message?.update_target.length > 0) {
                message?.update_target.forEach((target, index) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.update_target[${index}]' should have required properties`, function () {
                        expect(target).to.have.all.keys('path', 'action');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.update_target[${index}].path' should be a string`, function () {
                        expect(target.path).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.update_target[${index}].action' should be a valid action type`, function () {
                        expect(target.action).to.be.oneOf(['APPENDED', 'UPDATED', 'DELETED']);
                    }));
                });
            }
        }

        messageTestSuite.addTest(new Mocha.Test("'message' should exist and should be an object", function () {
            expect(message).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'issue'", function () {
            expect(message).to.have.property("issue").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'id' that is a string", function () {
            expect(message.issue).to.have.property("id").that.is.a("string").that.has.length.above(0);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'level' that is a string", function () {
            expect(message.issue).to.have.property("level").that.is.a("string").that.is.not.empty;
        }));

        // Test refs array
        messageTestSuite.addTest(new Mocha.Test("'message.issue.refs' should be an array", function () {
            expect(message.issue.refs).to.be.an('array');
        }));

        if (message?.issue?.refs && message.issue.refs.length > 0) {
            message.issue.refs.forEach((ref, index) => {
                const refData = ['ref_id', 'ref_type'];
                switch (ref.ref_type) {
                    case "ITEM":
                        refData.push("tags");
                        break;
                    default:
                        break;
                }


                // messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}]' should have required properties`, function () {
                //     expect(ref).to.have.all.keys(requiredKeys);
                // }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].ref_id' should be a non-empty string`, function () {
                    expect(ref.ref_id).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].ref_type' should be valid`, function () {
                    expect(ref.ref_type).to.be.oneOf(['ORDER', 'PROVIDER', 'FULFILLMENT', 'ITEM', "TRANSACTION_ID", "MESSAGE_ID", "COMPLAINT", "ACTION", "PAYMENT", "CUSTOMER", "AGENT", "PROVIDER"]);
                }));

                if (ref?.tags) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags' should be a valid array`, function () {
                        expect(ref.tags).to.be.an('array');
                        ref.tags.forEach((tag) => {
                            expect(tag).to.have.property('descriptor').that.is.an('object');
                            expect(tag.descriptor).to.have.property('code').that.is.a('string');

                            if (tag.list) {
                                expect(tag.list).to.be.an('array');
                                tag.list.forEach((item) => {
                                    expect(item).to.have.property('descriptor').that.is.an('object');
                                    expect(item.descriptor).to.have.property('code').that.is.a('string');
                                    expect(item).to.have.property('value').that.is.a('string');
                                });
                            }
                        });
                    }));
                }
            });
        }


        // Test actors array
        messageTestSuite.addTest(new Mocha.Test("'message.issue.actors' should be an array with at least one actor", function () {
            expect(message.issue.actors).to.be.an('array').that.is.not.empty;
        }));

        if (message?.issue?.actors && message.issue.actors.length > 0) {
            message.issue.actors.forEach((actor, index) => {

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}]' should have required properties`, function () {
                    expect(actor).to.include.all.keys('id', 'type', 'info');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].id' should be a string`, function () {
                    expect(actor.id).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].type' should be a valid type`, function () {
                    expect(actor.type).to.be.oneOf([
                        "COUNTERPARTY_NP_GRO", "CASCADED_NP_GRO", "TRANSACTION_COUNTERPARTY_NP",
                        "COUNTERPARTY_NP", "COUNTER_NP", "CASCADED_NP", "PROVIDER",
                        "AGENT", "INTERFACING_NP_GRO", "INTERFACING_NP", "CONSUMER", "CUSTOMER"
                    ]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].info' should have required properties`, function () {
                    expect(actor.info).to.include.all.keys('org', 'person', 'contact');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].info.org' should have name property`, function () {
                    expect(actor.info.org).to.have.property('name').that.is.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].info.contact' should have phone and email`, function () {
                    expect(actor.info.contact).to.include.all.keys('phone', 'email');
                    expect(actor.info.contact.phone).to.be.a('string');
                    expect(actor.info.contact.email).to.be.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].info.person' should have name property`, function () {
                    expect(actor.info.person).to.have.property('name').that.is.a('string');
                }));
            });
        }


        // Test IDs
        messageTestSuite.addTest(new Mocha.Test("'message.issue.source_id' should be a string", function () {
            expect(message.issue.source_id).to.be.a('string').that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.complainant_id' should be a string", function () {
            expect(message.issue.complainant_id).to.be.a('string').that.is.not.empty;
        }));

        if (step !== "issue_open") {
            messageTestSuite.addTest(new Mocha.Test("'message.issue.respondent_ids' should be an array that is not empty", function () {
                expect(message.issue.respondent_ids).to.be.an('array').that.is.not.empty;
            }));

            message?.issue?.respondent_ids.forEach((id, index) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.respondent_ids[${index}]' should be a string`, function () {
                    expect(id).to.be.a('string').that.is.not.empty;
                }));
            });
        }

        messageTestSuite.addTest(new Mocha.Test("'message.issue.last_action_id' should be a string", function () {
            expect(message.issue.last_action_id).to.be.a('string').that.is.not.empty;
        }));

        /** message.issue.descriptor tests  */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'descriptor' that is an object", function () {
            expect(message.issue).to.have.property("descriptor").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor' object should have 'code','short_desc', 'long_desc', 'additional_desc', and 'images' properties ", function () {
            expect(message.issue.descriptor).to.include.all.keys("code", 'short_desc', 'long_desc', 'additional_desc', 'images');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.short_desc' should be a non-empty string", function () {
            expect(message.issue.descriptor.short_desc).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.long_desc' should be a non-empty string", function () {
            expect(message.issue.descriptor.long_desc).to.be.a("string").that.has.length.above(0);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.additional_desc' should be an object ", function () {
            expect(message.issue.descriptor.additional_desc).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.additional_desc.url' should be a string ", function () {
            expect(message.issue.descriptor.additional_desc.url).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.additional_desc.url' should be a valid URL (OPTIONAL)", function () {
            expect(message.issue.descriptor.additional_desc.url).to.match(urlRegex);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.additional_desc.content_type' should be a string ", function () {
            expect(message.issue.descriptor.additional_desc.content_type).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.images' should be an array", function () {
            expect(message.issue.descriptor.images).to.be.an("array");
        }));


        /** message.expected_response_time tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'expected_response_time' that is an object", function () {
            expect(message.issue).to.have.property("expected_response_time").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.expected_response_time' object should have 'duration' property", function () {
            expect(message.issue.expected_response_time).to.have.property('duration');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.expected_response_time.duration' should be a string representing duration in ISO 8601 format", function () {
            expect(message.issue.expected_response_time.duration).to.match(iso8601DurationRegex);
        }));


        /** message.expected_resolution_time tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'expected_resolution_time' that is an object", function () {
            expect(message.issue).to.have.property("expected_resolution_time").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.expected_resolution_time' object should have 'duration' property", function () {
            expect(message.issue.expected_resolution_time).to.have.property('duration');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.expected_resolution_time.duration' should be a string representing duration in ISO 8601 format", function () {
            expect(message.issue.expected_resolution_time.duration).to.match(iso8601DurationRegex);
        }));

        /** message.issue.status tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'status' that is a string", function () {
            expect(message.issue).to.have.property("status").that.is.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.status' should be a string and should be either of 'OPEN', 'PROCESSING', 'RESOLVED', 'CLOSED'", function () {
            expect(message.issue.status).to.be.a("string").and.to.be.oneOf(['OPEN', 'PROCESSING', 'RESOLVED', 'CLOSED']);
        }));

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

        // Test actions array
        messageTestSuite.addTest(new Mocha.Test("'message.issue.actions' should be an array", function () {
            expect(message.issue.actions).to.be.an('array').that.is.not.empty;
        }));

        if (message?.issue?.actions && message?.issue?.actions.length > 0) {
            message.issue.actions.forEach((action, index) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}]' should have required properties`, function () {
                    expect(action).to.include.all.keys('id', 'descriptor', 'updated_at', 'action_by', 'actor_details');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}]' can have property 'id' that is a string (OPTIONAL)`, function () {
                    expect(action).to.have.property('id').that.is.a('string');
                }));

                // Validate 'ref_id' mapping to another action if it exists

                if (action?.id) {
                    const mappedAction = message?.issue?.actions?.filter((action) => action?.id === action.id);
                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].id' should be a valid id and should map to an action item`, function () {
                        expect(mappedAction).to.not.be.empty;
                    }))
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].id' should be a string`, function () {
                    expect(action.id).to.be.a('string').that.is.not.empty;
                }));

                if (action?.descriptor?.code === "INFO_PROVIDED" || action?.descriptor?.code === "RESOLVED" || action?.descriptor?.code === "RESOLUTION_ACCEPTED") {
                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}]' can have property 'ref_id' that is a string (OPTIONAL)`, function () {
                        expect(action).to.have.property('ref_id').that.is.a('string');
                    }));
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].descriptor' should be an object"`, function () {
                    expect(action.descriptor).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].descriptor.code' should be a string"`, function () {
                    expect(action.descriptor.code).to.be.a("string");
                }));
                if (action?.descriptor?.code !== "RESOLUTION_PROPOSED" && action?.descriptor?.code !== "RESOLUTION_ACCEPTED") {
                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].descriptor.short_desc' should be a string"`, function () {
                        expect(action.descriptor.short_desc).to.be.a("string");
                    }));
                }


                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].updated_at' should be a valid ISO timestamp`, function () {
                    expect(action.updated_at).to.match(isoTime);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].action_by' should be a string`, function () {
                    expect(action.action_by).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].actor_details' should have 'name' property`, function () {
                    expect(action.actor_details).to.have.property('name').that.is.a('string');
                }));
            });
        }


        // if (step === "issue_close") {
        //     messageTestSuite.addTest(new Mocha.Test("'message.issue.rating' should be a string and to be either 'THUMBS-UP' and 'THUMBS-DOWN'", function () {
        //         expect(message.issue.rating).to.be.a("string").and.to.be.oneOf(['THUMBS-UP', 'THUMBS-DOWN']);
        //     }));
        // }

    } catch (err) {
        console.log(err);
        return err;
    }
}


const stepMap = {
    "issue_open": "Issue Open",
    "issue_provide_more_information": "Provide More Information",
    "issue_select_resolution_option": "Select Resolution Options",
    "issue_close": "Issue Close",
    "issue_escalate": "Issue Escalate"
};

async function issue({ context, message } = {}, step, version = "", domain = "") {
    try {
        const testSuite = new Mocha.Suite(`issue (${stepMap[step]}) request verification`);

        contextTests(context, "issue", testSuite, version, domain);
        messageTests({ context, message }, testSuite, step, domain);

        return testSuite;
    } catch (err) {
        console.log(err);
        return err;
    }
}


module.exports = {
    issue
}