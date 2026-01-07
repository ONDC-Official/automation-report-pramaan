const Mocha = require("mocha");
const contextTests = require("./context.js");
const { expect } = require("chai");
const { urlRegex, iso8601DurationRegex, isoTime } = require("../utils/constants.js");


function messageTests({ context, message } = {}, testSuite) {
    try {
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        // Test for update_target
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

        // Test for issue object
        messageTestSuite.addTest(new Mocha.Test("'message' should have property 'issue' that is an object", function () {
            expect(message).to.have.property('issue').that.is.an('object');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.id' should be a non-empty string", function () {
            expect(message.issue.id).to.be.a('string').that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.status' should be a valid status that is one of ['OPEN', 'PROCESSING', 'RESOLVED', 'CLOSED']", function () {
            expect(message.issue.status).to.be.oneOf(['OPEN', 'PROCESSING', 'RESOLVED', 'CLOSED']);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.level' should be 'ISSUE'", function () {
            expect(message.issue.level).to.be.a('string').that.is.not.empty;
        }));

        // Timestamp tests
        messageTestSuite.addTest(new Mocha.Test("'message.created_at' should be valid ISO timestamp", function () {
            expect(message.issue.created_at).to.match(isoTime);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.updated_at' should be valid ISO timestamp", function () {
            expect(message.issue.updated_at).to.match(isoTime);
        }));

        // Expected time durations
        messageTestSuite.addTest(new Mocha.Test("'issuemessageexpected_response_time' should have duration property", function () {
            expect(message.issue.expected_response_time).to.have.property('duration').that.is.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.expected_response_time.duration' should be ISO8601 duration", function () {
            expect(message.issue.expected_response_time.duration).to.match(iso8601DurationRegex);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.expected_resolution_time' should have duration property", function () {
            expect(message.issue.expected_resolution_time).to.have.property('duration').that.is.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.expected_resolution_time.duration' should be ISO8601 duration", function () {
            expect(message.issue.expected_resolution_time.duration).to.match(iso8601DurationRegex);
        }));

        // Test refs array
        messageTestSuite.addTest(new Mocha.Test("'message.issue.refs' should be an array", function () {
            expect(message.issue.refs).to.be.an('array');
        }));

        if (message?.issue?.refs && message?.issue?.refs.length > 0) {
            message.issue.refs.forEach((ref, index) => {
                const refData = ['ref_id', 'ref_type'];
                switch (ref.ref_type) {
                    case "ITEM":
                        refData.push("tags");
                        break;
                    default:
                        break;
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}]' should have required properties`, function () {
                    expect(ref).to.have.all.keys(refData);
                }));

                messageTestSuite.addTest(new Mocha.Test(`' message.issue.refs[${index}].ref_id' should be a string`, function () {
                    expect(ref.ref_id).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`' message.issue.refs[${index}].ref_type' should be a valid type`, function () {
                    expect(ref.ref_type).to.be.oneOf(['ORDER', 'PROVIDER', 'FULFILLMENT', 'ITEM']);
                }));

                if (ref?.tags) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags' should be valid if present`, function () {
                        expect(ref.tags).to.be.an('array');
                    }));
                    const arr = [{ code: "message.order.items" }];
                    arr.forEach((ele) => {
                        const tagIndex = ref?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = ref?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object");
                        }));


                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags[${tagIndex}]' should be an object`, function () {
                                expect(tagItem).to.be.an("object");

                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags[${tagIndex}].descriptor' should be an object`, function () {
                                expect(tagItem.descriptor).to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));


                            const massageOrderItemsArr1 = [{ code: "quantity.selected.count" }];
                            const massageOrderItemsArr2 = [{ code: "quantity.count" }];

                            let array;
                            if (/ONDC:RET|ONDC:LOG|nic|AGR/.test(context?.domain || "")) {
                                array = massageOrderItemsArr2
                            } else {
                                array = massageOrderItemsArr1
                            }


                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags[${tagIndex}].list[${listItemIndex}]' should have be an object`, function () {
                                            expect(listItem).to.be.an("object");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.issue.refs[${index}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));

                                    }
                                });
                            }
                        }
                    })

                }
            });
        }

        // Test actors array
        messageTestSuite.addTest(new Mocha.Test("'message.issue.actors' should be an array with at least one actor", function () {
            expect(message.issue.actors).to.be.an('array').that.is.not.empty;
        }));

        if (message?.issue?.actors && message?.issue?.actors.length > 0) {
            message.issue.actors.forEach((actor, index) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}]' should have required properties`, function () {
                    expect(actor).to.have.all.keys('id', 'type', 'info');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].id' should be a string`, function () {
                    expect(actor.id).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].type' should be a valid type`, function () {
                    expect(actor.type).to.be.oneOf(["COUNTERPARTY_NP_GRO", "CASCADED_NP_GRO", "TRANSACTION_COUNTERPARTY_NP", "COUNTERPARTY_NP", "COUNTER_NP", "CASCADED_NP", "PROVIDER", "AGENT", "INTERFACING_NP_GRO", "INTERFACING_NP", "CONSUMER", "CUSTOMER"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].info' should have required properties`, function () {
                    expect(actor.info).to.have.all.keys('org', 'person', 'contact');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].info.org' should have name property`, function () {
                    expect(actor.info.org).to.have.property('name').that.is.a('string');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actors[${index}].info.contact' should have phone and email`, function () {
                    expect(actor.info.contact).to.have.all.keys('phone', 'email');
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

        messageTestSuite.addTest(new Mocha.Test("'message.issue.respondent_ids' should be an array of strings", function () {
            expect(message.issue.respondent_ids).to.be.an('array');
            message.issue.respondent_ids.forEach(id => {
                expect(id).to.be.a('string').that.is.not.empty;
            });
        }));

        // Test descriptor
        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor' should have required properties", function () {
            expect(message.issue.descriptor).to.include.all.keys('code', 'short_desc', 'long_desc', 'additional_desc', 'images');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.code' should be a string", function () {
            expect(message.issue.descriptor.code).to.be.a('string').that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.short_desc' should be a string", function () {
            expect(message.issue.descriptor.short_desc).to.be.a('string').that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.long_desc' should be a string", function () {
            expect(message.issue.descriptor.long_desc).to.be.a('string').that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.additional_desc' should have url and content_type", function () {
            expect(message.issue.descriptor.additional_desc).to.have.all.keys('url', 'content_type');
            expect(message.issue.descriptor.additional_desc.url).to.match(urlRegex);
            expect(message.issue.descriptor.additional_desc.content_type).to.be.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.images' should be an array (OPTIONAL)", function () {
            expect(message.issue.descriptor.images).to.be.an("array");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.descriptor.images' should not be empty (OPTIONAL)", function () {
            expect(message.issue.descriptor.images).to.have.length.above(0);
        }));

        message?.issue?.descriptor?.images.forEach(function (image, index) {
            messageTestSuite.addTest(new Mocha.Test(`'message.issue.descriptor.images[${index}]' should be objects containing valid keys (OPTIONAL)`, function () {
                expect(image).to.be.an("object").that.is.not.null;
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.issue.descriptor.images[${index}]' to have property 'url' that is a string (OPTIONAL)`, function () {
                expect(image).to.have.property('url').that.is.a("string").and.match(urlRegex);
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.issue.descriptor.images[${index}]' to have property 'size_type' that is a string (OPTIONAL)`, function () {
                expect(image).to.have.property('size_type').that.is.a("string");
            }));
        });

        // Test last_action_id
        messageTestSuite.addTest(new Mocha.Test("'message.issue.last_action_id' should be a string", function () {
            expect(message.issue.last_action_id).to.be.a('string').that.is.not.empty;
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

                if (action?.descriptor?.code === "INFO_PROVIDED" || action?.descriptor?.code === "RESOLVED" || action?.descriptor?.code === "RESOLUTION_ACCEPTED") {
                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}]' can have property 'ref_id' that is a string (OPTIONAL)`, function () {
                        expect(action).to.have.property('ref_id').that.is.a('string');
                    }));
                }

                if (action?.id) {
                    const mappedAction = message?.issue?.actions?.filter((action) => action?.id === action.id);
                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].id' should be a valid id and should map to an action item`, function () {
                        expect(mappedAction).to.not.be.empty;
                    }))
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].id' should be a string`, function () {
                    expect(action.id).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].descriptor' should be an object"`, function () {
                    expect(action.descriptor).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].descriptor.code' should be a string"`, function () {
                    expect(action.descriptor.code).to.be.a("string");
                }));
                if (action?.ref_type !== "RESOLUTIONS") {
                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].descriptor.short_desc' should be a string"`, function () {
                        expect(action.descriptor.short_desc).to.be.a("string");
                    }));
                }

                if (action.descriptor?.code === "INFO_REQUESTED" || action.descriptor?.code === "RESOLVED") {
                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].descriptor.name' should be a string (OPTIONAL)"`, function () {
                        expect(action.descriptor.name).to.be.a("string");
                    }));
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].updated_at' should be valid ISO timestamp`, function () {
                    expect(action.updated_at).to.match(isoTime);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].action_by' should be a string`, function () {
                    expect(action.action_by).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.issue.actions[${index}].actor_details' should have name property`, function () {
                    expect(action.actor_details).to.have.property('name').that.is.a('string');
                }));
            });
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

const stepMap = {
    "on_issue_open": "Issue Open",
    "on_issue_need_more_information": "Need More Information",
    "on_issue_processing": "Processing",
    "on_issue_resolution_option": "Resolution Options",
    "on_issue_resolution_provided": "Resolution Provided",
    "on_issue_escalation_processing": "Processing Escalation"
}
async function on_issue({ context, message } = {}, step, version = "", domain = "") {
    try {
        const testSuite = new Mocha.Suite(`on_issue (${stepMap[step]}) request verification`);

        contextTests(context, "on_issue", testSuite, version, domain);
        messageTests({ context, message }, testSuite);

        return testSuite;
    } catch (err) {
        console.log(err);
        return err;
    }
}



module.exports = {
    on_issue
}