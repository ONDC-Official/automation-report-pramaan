const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");
const { urlRegex, iso8601DurationRegex, isoTime } = require("../utils/constants");


function firstActionLog(logs, action) {
    try {
        const log = logs?.find((log) => log?.request?.context?.action === action);

        return log?.request;
    } catch (err) {
        console.log(err);
    }
}
function messageTests({ context, message } = {}, testSuite, { type, step }, logs = []) {
    try {
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");
        messageTestSuite.addTest(new Mocha.Test("'message' should exist and should be an object", function () {
            expect(message).to.exist.and.to.be.an("object");
        }));
        const on_cancelLogs = firstActionLog(logs, "on_cancel");
        const on_confirmLogs = firstActionLog(logs, "on_confirm");
        const on_statusLogs = firstActionLog(logs, "on_status");
        const onCancelFulfillmentId = on_cancelLogs?.message?.order?.fulfillments.map((fulfillment) => {
            return fulfillment.id;
        })
        const onConfirmFulfillmentId = on_confirmLogs?.message?.order?.fulfillments.map((fulfillment) => {
            return fulfillment.id;
        })
        const onConfirmOrderStatus = on_confirmLogs?.message?.order?.status
        const onCancelOrderStatus = on_cancelLogs?.message?.order?.status
        const onStatusOrderStatus = on_statusLogs?.message?.order?.status
        messageTestSuite.addTest(new Mocha.Test("'message' should have a property named 'issue'", function () {
            expect(message).to.have.property("issue").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'id' that is a string", function () {
            expect(message.issue).to.have.property("id").that.is.a("string").that.has.length.above(0);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'category' that is a string", function () {
            expect(message.issue).to.have.property("category").that.is.a("string").that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.category' should be oneOf ['ORDER', 'ITEM', 'FULFILLMENT', 'AGENT', 'PAYMENT', 'TRANSACTION']", function () {
            expect(message.issue.category).to.be.oneOf(['ORDER', 'ITEM', 'FULFILLMENT', 'AGENT', 'PAYMENT', 'TRANSACTION']);
        }));
        if (context?.domain === "ONDC:TRV10") {
            messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'sub_category' that is a string", function () {
                expect(message.issue).to.have.property("sub_category").that.is.a("string").and.to.be.oneOf(['FLM111', 'FLM112', 'FLM113', 'FLM114', 'FLM115']);
            }));

        } else {
            messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'sub_category' that is a string", function () {
                expect(message.issue).to.have.property("sub_category").that.is.a("string").that.is.not.empty;
            }));
        }


        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'complainant_info' that is an object", function () {
            expect(message.issue).to.have.property("complainant_info").that.is.an("object");
        }));

        if (type === "Personal Loan") {
            messageTestSuite.addTest(new Mocha.Test("'message.issue.complainant_info' should have a property named 'person' that is an object", function () {
                expect(message.issue.complainant_info).to.have.property("person").that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test("'message.issue.complainant_info.person' should have a property named 'name' that is a string", function () {
                expect(message.issue.complainant_info.person).to.have.property("name").that.is.a("string").that.is.not.empty;
            }));

            messageTestSuite.addTest(new Mocha.Test("'messsage.issue.complainant_info' should have a property named 'contact'", function () {
                expect(message.issue.complainant_info).to.have.a.property("contact").that.is.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test("'message.issue.complainant_info.contact' to have properties 'phone' and 'email'", function () {
                expect(message.issue.complainant_info.contact).to.include.all.keys("phone", "email");
            }));

            messageTestSuite.addTest(new Mocha.Test("'message.issue.complainant_info.contact.phone' should be a string", function () {
                expect(message.issue.complainant_info.contact.phone).to.be.a("string").that.has.length.above(0);
            }));

            messageTestSuite.addTest(new Mocha.Test("'message.issue.complainant_info.contact.email' should be a string", function () {
                expect(message.issue.complainant_info.contact.email).to.be.a("string").that.has.length.above(0);
            }));

        } else {

        }

        /** message.issue.order_details tests  */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'order_details' that is an object", function () {
            expect(message.issue).to.have.property("order_details").that.is.an("object");
        }));

        switch (context?.domain) {
            case "ONDC:FIS12":
            case "ONDC:FIS13":
            case "ONDC:FIS14":
                messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details' object should have 'id', 'state', and 'provider_id' properties", function () {
                    expect(message.issue.order_details).to.have.all.keys('id', 'state', 'provider_id');
                }));
                break;
            case "ONDC:TRV11":
            case "ONDC:TRV10":
            case "ONDC:TRV12":
                messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details' object should have 'id', 'state', 'items', 'fulfillments' and 'provider_id' properties (OPTIONAL)", function () {
                    expect(message.issue.order_details).to.have.all.keys('id', 'state', 'provider_id', 'items', 'fulfillments');
                }));
                break;
        }


        messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.id' should be a non-empty string", function () {
            expect(message.issue.order_details.id).to.be.a("string").that.has.length.above(0);
        }));

        switch (context?.domain) {
            case "ONDC:FIS12":
                messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.state' should be a valid ENUM", function () {
                    expect(message.issue.order_details.state).to.be.a("string").and.to.match(/^(DISBURSED|PENDING|CANCELLED|SANCTIONED|INITIATED|CONSENT_CREATED)$/);
                }));
                break;
            case "ONDC:FIS13":
                messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.state' should be a valid ENUM", function () {
                    expect(message.issue.order_details.state).to.be.a("string").and.to.match(/^(GRANTED|PROCESSING|INITIATED|PROCESSED|CLAIM_REJECTED)$/);
                }));
                break;
            case "ONDC:TRV11":
                messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.state' should be a valid ENUM (OPTIONAL)", function () {
                    expect(message.issue.order_details.state).to.be.a("string").and.to.match(/^(COMPLETED|ACTIVE|CANCELLED|SOFT_CANCEL)$/);
                }));
                break;
            case "ONDC:TRV10":
                messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.state' should be a valid ENUM (OPTIONAL)", function () {
                    expect(message.issue.order_details.state).to.be.a("string").and.to.match(/^(COMPLETED|ACTIVE|CANCELLED|SOFT_CANCEL)$/);
                }));
                break;
            default:
                break;
        }

        switch (context?.domain) {
            case "ONDC:FIS12":
                break;
            default:
        if (onCancelOrderStatus || onConfirmOrderStatus) {
            const issueTimestamp = new Date(context?.timestamp);
            const onCancelTimestamp = new Date(on_cancelLogs?.context?.timestamp);
            if (issueTimestamp > onCancelTimestamp) {
                messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.state' should be a valid ENUM", function () {
                    expect(message.issue.order_details.state)
                        .to.be.a("string")
                        .and.to.be.equal(onCancelOrderStatus);
                }));
            } else {
                messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.state' should be a valid ENUM", function () {
                    expect(message.issue.order_details.state).to.be.a("string").and.to.be.equal(onConfirmOrderStatus);
                }));
            }
        } else if (!onCancelOrderStatus && onStatusOrderStatus) {
            messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.state' should be a valid ENUM", function () {
                expect(message.issue.order_details.state).to.be.a("string").and.to.be.equal(onStatusOrderStatus);
            }));
        } else {
            messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.state' should be a valid ENUM", function () {
                expect(message.issue.order_details.state).to.be.a("string").and.to.be.equal(onConfirmOrderStatus);
            }));
        }
                break;
        }


        messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.provider_id' should be a non-empty string", function () {
            expect(message.issue.order_details.provider_id).to.be.a("string").that.has.length.above(0);
        }));

        switch (context?.domain) {
            case "ONDC:TRV11":
            case "ONDC:TRV10":
            case "ONDC:TRV12":
                messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.items' should be a non-empty array (OPTIONAL)", function () {
                    expect(message.issue.order_details.items).to.be.an("array").that.is.not.empty;
                }));

                message.issue.order_details.items?.forEach((item, itemIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.order_details.items[${itemIndex}]' should have a property 'id' that is a string`, function () {
                        expect(item).to.have.property("id").that.is.a("string").that.is.not.empty;
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.order_details.items[${itemIndex}]' should have a property 'quantity' that is a number`, function () {
                        expect(item).to.have.property("quantity").that.is.a("number");
                    }));
                })

                messageTestSuite.addTest(new Mocha.Test("'message.issue.order_details.fulfillments' should be a non-empty array", function () {
                    expect(message.issue.order_details.fulfillments).to.be.an("array").that.is.not.empty;
                }));

                message.issue.order_details.fulfillments?.forEach((fulfillment, fulfillmentIndex) => {
                    if (onCancelFulfillmentId) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.issue.order_details.fulfillments[${fulfillmentIndex}]' should have a property 'id' that is a string`, function () {
                            expect(fulfillment).to.have.property("id").that.is.a("string").to.be.oneOf(onCancelFulfillmentId);
                        }));
                    } else {
                        messageTestSuite.addTest(new Mocha.Test(`'message.issue.order_details.fulfillments[${fulfillmentIndex}]' should have a property 'id' that is a string`, function () {
                            expect(fulfillment).to.have.property("id").that.is.a("string").to.be.oneOf(onConfirmFulfillmentId);
                        }));

                    }

                    messageTestSuite.addTest(new Mocha.Test(`'message.issue.order_details.fulfillments[${fulfillmentIndex}]' should have a property 'state' that is a string (OPTIONAL)`, function () {
                        expect(fulfillment).to.have.property("state").that.is.a("string").that.is.not.empty;
                    }));
                })
                break;
        }

        /** message.issue.description tests  */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'description' that is an object", function () {
            expect(message.issue).to.have.property("description").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.description' object should have 'short_desc', 'long_desc', 'additional_desc', and 'images' properties (OPTIONAL)", function () {
            expect(message.issue.description).to.have.all.keys('short_desc', 'long_desc', 'additional_desc', 'images');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.description.short_desc' should be a non-empty string (OPTIONAL)", function () {
            expect(message.issue.description.short_desc).to.be.a("string").that.has.length.above(0);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.description.long_desc' should be a non-empty string (OPTIONAL)", function () {
            expect(message.issue.description.long_desc).to.be.a("string").that.has.length.above(0);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.description.additional_desc' should be an object (OPTIONAL)", function () {
            expect(message.issue.description.additional_desc).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.description.additional_desc.url' should be a string (OPTIONAL)", function () {
            expect(message.issue.description.additional_desc.url).to.be.a("string").that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.description.additional_desc.url' should be a valid URL (OPTIONAL)", function () {
            expect(message.issue.description.additional_desc.url).to.match(urlRegex);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.description.additional_desc.content_type' should be a string (OPTIONAL)", function () {
            expect(message.issue.description.additional_desc.content_type).to.be.a("string").that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.description.images' should be an array (OPTIONAL)", function () {
            expect(message.issue.description.images).to.be.an("array");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.description.images' should not be empty (OPTIONAL)", function () {
            expect(message.issue.description.images).to.have.length.above(0);
        }));

        messageTestSuite.addTest(new Mocha.Test("All items in 'message.issue.description.images' should be strings representing valid URLs (OPTIONAL)", function () {
            message.issue.description.images.forEach(function (imageUrl) {
                expect(imageUrl).to.be.a("string").and.match(urlRegex);
            });
        }));


        /** message.issue.source tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'source' that is an object", function () {
            expect(message.issue).to.have.property("source").that.is.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.source' object should have 'network_participant_id' and 'type' properties", function () {
            expect(message.issue.source).to.have.all.keys('network_participant_id', 'type');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.source.network_participant_id' should be a non-empty string", function () {
            expect(message.issue.source.network_participant_id).to.be.a("string").that.has.length.above(0);
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.source.type' should be a string", function () {
            expect(message.issue.source.type).to.be.a("string").that.is.not.empty;
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
            expect(message.issue).to.have.property("status").that.is.a("string").that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.status' should be a string and either 'OPEN' or 'CLOSED'", function () {
            expect(message.issue.status).to.be.a("string").and.to.be.oneOf(["OPEN", "CLOSED"]);
        }));

        /** message.issue.issue_type tests */
        messageTestSuite.addTest(new Mocha.Test("'message.issue' should have a property named 'issue_type' that is a string", function () {
            expect(message.issue).to.have.property("issue_type").that.is.a("string").that.is.not.empty;
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.issue.issue_type' should be a string", function () {
            expect(message.issue.issue_type).to.be.a("string").that.is.not.empty;
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
                    expect(action.updated_by.contact.phone).to.be.a("string").that.is.not.empty;
                }));

                // Check 'email' in 'contact'
                messageTestSuite.addTest(new Mocha.Test(`'message.issue.issue_actions.complainant_actions[${index}].updated_by.contact.email' should be a string`, function () {
                    expect(action.updated_by.contact.email).to.be.a("string").that.is.not.empty;
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


async function issue({ context, message } = {}, step, type_of_loan = "", version = "", logs = [], domain = "") {
    try {
        const testSuite = new Mocha.Suite(`Issue (${step}) request verification`);

        contextTests(context, "issue", testSuite, version, domain);
        messageTests({ context, message }, testSuite, { type: type_of_loan, step }, logs);

        return testSuite;
    } catch (err) {
        console.log(err);
        return err;
    }
}



module.exports = {
    issue
}