const Mocha = require('mocha');
const { expect } = require('chai');


function providerCommonTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("'message.order' should have a property named 'provider' which is an object", function () {
            expect(message.order.provider).to.be.an("object");
        }))
        messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'id' which is a string", function () {
            expect(message.order.provider.id).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.provider' should have a property named 'descriptor' which is an object", function () {
            expect(message.order.provider.descriptor).to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.provider.descriptor' should have a property named 'name' which is a string", function () {
            expect(message.order.provider.descriptor.name).to.be.a("string");
        }));

    } catch (error) {
        console.log(error)
        return error;
    }
}

function itemsCommonTests(message, messageTestSuite, flowId, action) {
    try {
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.items' which is an array", function () {
            expect(message.order.items).to.exist.and.to.be.an("array");
        }));

        if (message?.order?.items && message?.order?.items?.length > 0) {
            message.order.items.forEach((item, i) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}]' which is an object`, function () {
                    expect(item).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].id' which is a string`, function () {
                    expect(item.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor' which is an object`, function () {
                    expect(item.descriptor).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.name' which is a string`, function () {
                    expect(item.descriptor.name).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].descriptor.code' which is a string (OPTIONAL)`, function () {
                    expect(item.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["SCHEME", "SCHEME_PLAN"]);
                }));

                if ((flowId === "INVESTMENT_7") || (flowId === "INVESTMENT_9") || (flowId === "INVESTMENT_5") || (flowId === "INVESTMENT_6") || (flowId === "INVESTMENT_3") || (flowId === "INVESTMENT_2") || (flowId === "INVESTMENT_1") || (flowId === "INVESTMENT_20")) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                        expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
                    }));

                    if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                        item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIdIndex) => {
                            // Test to check if fulfillmentID is a string
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].fulfillment_ids[${fulfillmentIdIndex}]' should be a string`, function () {
                                expect(fulfillmentID).to.be.a("string");
                            }));

                        })
                    }

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].parent_item_id' should be a string`, function () {
                        expect(item.parent_item_id).to.be.a("string");
                    }));
                }
                if ((flowId === "INVESTMENT_6" && action !== "on_select") || (flowId === "INVESTMENT_3" && action !== "on_select") || (flowId === "INVESTMENT_2" && action !== "on_select") || (flowId === "INVESTMENT_5" && action !== "on_select") || (flowId === "INVESTMENT_1" && action !== "on_select") || (flowId === "INVESTMENT_9" && action !== "on_select") || (flowId === "INVESTMENT_20" && action !== "on_select")) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].payment_ids' should be an array, that should not be empty`, function () {
                        expect(item.payment_ids).to.be.an('array').that.is.not.empty;
                    }));

                    if (item?.payment_ids && item?.payment_ids.length > 0) {
                        item.payment_ids.forEach((paymentID, paymentIdIndex) => {
                            // Test to check if paymentID is a string
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].payment_ids[${paymentIdIndex}]' should be a string`, function () {
                                expect(paymentID).to.be.a("string");
                            }));

                        })
                    }
                }

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity' which is an object`, function () {
                    expect(item.quantity).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected' which is an object`, function () {
                    expect(item.quantity.selected).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected.measure' which is an object`, function () {
                    expect(item.quantity.selected.measure).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected.measure.value' which is a string`, function () {
                    expect(item.quantity.selected.measure.value).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.selected.measure.unit' which is a string`, function () {
                    expect(item.quantity.selected.measure.unit).to.exist.and.to.be.a("string").and.to.be.oneOf(["INR", "MF_UNITS"]);
                }));

                if ((flowId === "INVESTMENT_6" && action === "on_update") || (flowId === "INVESTMENT_7" && action === "on_update") || (flowId === "INVESTMENT_20" && action === "on_update") || (flowId === "INVESTMENT_5" && action === "on_update")) {

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.allocated' which is an object`, function () {
                        expect(item.quantity.allocated).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.allocated.measure' which is an object`, function () {
                        expect(item.quantity.allocated.measure).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.allocated.measure.value' which is a string`, function () {
                        expect(item.quantity.allocated.measure.value).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.items[${i}].quantity.allocated.measure.unit' which is a string`, function () {
                        expect(item.quantity.allocated.measure.unit).to.exist.and.to.be.a("string").and.to.be.oneOf(["INR", "MF_UNITS"]);
                    }));

                }



                const arr1 = [{ code: "PLAN_INFORMATION" }, { code: "PLAN_IDENTIFIERS" }, { code: "PLAN_OPTIONS" }];
                const arr2 = [{ code: "PLAN_INFORMATION" }, { code: "PLAN_IDENTIFIERS" }, { code: "PLAN_OPTIONS" }, { code: "CHECKLISTS" }];
                let arr;
                switch (flowId) {
                    case "INVESTMENT_3":
                    case "INVESTMENT_7":
                    case "INVESTMENT_5":
                    case "INVESTMENT_9":
                        arr = arr1;
                        break;
                    default:
                        arr = arr2;
                }
                arr.forEach((ele) => {
                    const tagIndex = item?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                    const tagItem = item?.tags[tagIndex];
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object");
                    }));

                    if (tagIndex !== -1) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                            expect(tagItem).to.have.property("descriptor").that.is.an("object");
                            expect(tagItem).to.have.property("display").that.is.a("boolean");
                            expect(tagItem).to.have.property("list").that.is.an("array");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                            expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                            expect(tagItem.descriptor.code).to.be.equal(ele.code);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].descriptor.name' should be string '`, function () {
                            expect(tagItem.descriptor.name).to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].display' should be a boolean (OPTIONAL)`, function () {
                            expect(tagItem.display).to.be.a("boolean");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                            expect(tagItem.list).to.be.an("array").that.is.not.empty;
                        }));
                        const planInformationArr = [{ code: "CONSUMER_TNC" }];

                        const checklistsArr1 = [{ code: "APPLICATION_FORM" }];
                        const checklistsArr2 = [{ code: "APPLICATION_FORM_WITH_KYC" }, { code: "KYC" }, { code: "ESIGN" }];

                        const planIdentifiersArr = [{ code: "ISIN" }, { code: "RTA_IDENTIFIER" }, { code: "AMFI_IDENTIFIER" }];

                        const planOptionsArr = [{ code: "PLAN" }, { code: "OPTION" }, { code: "IDCW_OPTION" }];

                        let array;
                        switch (tagItem?.descriptor?.code) {

                            case "PLAN_INFORMATION":
                                array = planInformationArr
                                break;
                            case "PLAN_IDENTIFIERS":
                                array = planIdentifiersArr;
                                break;
                            case "PLAN_OPTIONS":
                                array = planOptionsArr;
                                break;
                            case "CHECKLISTS":
                                switch (flowId) {
                                    case "INVESTMENT_2":
                                    case "INVESTMENT_6":
                                        array = checklistsArr1;
                                        break;
                                    case "INVESTMENT_20":

                                        switch (action) {
                                            case "on_select":
                                                array = checklistsArr2;
                                                break;
                                            default:
                                                array = checklistsArr1;
                                                break;
                                        }
                                    default:
                                        array = checklistsArr2;
                                        break;
                                }
                                break;
                            default:
                                break;
                        }
                        if (array) {
                            array.forEach((it) => {
                                const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                const listItem = tagItem?.list[listItemIndex];
                                if (it?.code === "IDCW_OPTION") {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}' (OPTIONAL)`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));
                                } else {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));
                                }


                                if (listItemIndex !== -1) {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                        expect(listItem).to.have.property("descriptor").that.is.an("object");
                                        expect(listItem).to.have.property("value").that.is.a("string");
                                    }));

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    if (it?.code === "IDCW_OPTION") {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}' (OPTIONAL)`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));
                                    } else {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));
                                    }

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                        expect(listItem.value).to.be.a('string').that.is.not.empty;
                                    }));

                                }
                            });
                        }
                    }
                });

                if ((flowId === "INVESTMENT_7" && action === "on_update") || (flowId === "INVESTMENT_6" && action === "on_update") || (flowId === "INVESTMENT_20" && action === "on_update") || (flowId === "INVESTMENT_5" && action === "on_update")) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price' should be an object`, function () {
                        expect(item.price).to.be.an('object');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.currency' should be a string`, function () {
                        expect(item.price.currency).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.value' should be a string`, function () {
                        expect(item.price.value).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].price.listed_value' should be a string`, function () {
                        expect(item.price.listed_value).to.be.a('string');
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time' should be an object`, function () {
                        expect(item.time).to.be.an('object');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.label' should be a string`, function () {
                        expect(item.time.label).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.items[${i}].time.timestamp' should be a string`, function () {
                        expect(item.time.timestamp).to.be.a('string');
                    }));
                }

            })
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}

function fulfillmentsCommonTests(message, messageTestSuite, logs, flowId, action, step) {
    try {
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.fulfillments' which is an array", function () {
            expect(message.order.fulfillments).to.exist.and.to.be.an("array");
        }));


        if (message?.order?.fulfillments && message?.order?.fulfillments?.length > 0) {
            message?.order?.fulfillments?.forEach((fulfillment, fulfillmentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}]' which is an object`, function () {
                    expect(fulfillment).to.exist.and.to.be.an("object");
                }));

                if ((action === "on_confirm" && flowId !== "INVESTMENT_7") || (flowId === "INVESTMENT_9" && action ===
                    'on_status' || action === 'on_confirm' || action === "on_update") || (flowId === "INVESTMENT_7" && action === "on_update" || action === "on_cancel") || (flowId === "INVESTMENT_6" && action === "on_update" || action === "on_cancel")) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state' which is an object`, function () {
                        expect(fulfillment.state).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor' which is an object`, function () {
                        expect(fulfillment.state.descriptor).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor.code' which is a string`, function () {
                        expect(fulfillment.state.descriptor.code).to.exist.and.to.be.a("string");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor.name' which is a string`, function () {
                        expect(fulfillment.state.descriptor.name).to.exist.and.to.be.a("string");
                    }));
                }

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].id' which is a string`, function () {
                    expect(fulfillment.id).to.exist.and.to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].type' which is a string`, function () {
                    expect(fulfillment.type).to.exist.and.to.be.a("string").and.to.be.oneOf(["LUMPSUM", "WITHDRAWL", "SIP", "SWP", "REDEMPTION"]);
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer' which is an object`, function () {
                    expect(fulfillment.customer).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person' which is an object`, function () {
                    expect(fulfillment.customer.person).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.id' which is a string`, function () {
                    expect(fulfillment.customer.person.id).to.exist.and.to.be.a("string");
                }));

                if ((flowId === "INVESTMENT_1" && action !== "on_select" && action !== "on_update") || (flowId === "INVESTMENT_3" && action !== "on_select") || (flowId === "INVESTMENT_6" && action !== "on_select") || (flowId === "INVESTMENT_7") || (flowId === "INVESTMENT_5" && action !== "on_select") || (flowId === "INVESTMENT_2" && action !== "on_select") || (flowId === "INVESTMENT_6" && action !== "on_select") || (flowId === "INVESTMENT_20" && action !== "on_select") || (flowId === "INVESTMENT_9" && action !== "on_select")) {

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds' which is an array`, function () {
                        expect(fulfillment.customer.person.creds).to.exist.and.to.be.an("array");
                    }));

                    if (fulfillment?.customer?.person?.creds && fulfillment?.customer?.person?.creds.length > 0) {
                        fulfillment?.customer?.person?.creds.forEach((credsItem, credsIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credsIndex}]' which is an object`, function () {
                                expect(credsItem).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credsIndex}].id' which is a string`, function () {
                                expect(credsItem.id).to.exist.and.to.be.a("string");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credsIndex}].type' which is a string`, function () {
                                expect(credsItem.type).to.exist.and.to.be.a("string");
                            }));
                        })
                    }


                }
                if (action === "on_init" || action === "on_confirm" || action === "on_status" || action === "on_update") {

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.contact' which is an object`, function () {
                        expect(fulfillment.customer.contact).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].customer.contact.phone' which is a string`, function () {
                        expect(fulfillment.customer.contact.phone).to.exist.and.to.be.a("string");
                    }));

                }

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent' which is an object`, function () {
                    expect(fulfillment.agent).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.person' which is an object`, function () {
                    expect(fulfillment.agent.person).to.exist.and.to.be.an("object");
                }));


                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.person.id' which is a string (OPTIONAL)`, function () {
                    expect(fulfillment.agent.person.id).to.exist.and.to.be.a("string");
                }));



                if ((flowId === "INVESTMENT_6" && action === "on_update") || (flowId === "INVESTMENT_20" && action === "on_update") || (flowId === "INVESTMENT_7" && action === "on_update")) {

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.person.creds' which is an array`, function () {
                        expect(fulfillment.agent.person.creds).to.exist.and.to.be.an("array");
                    }));

                    if (fulfillment?.agent?.person?.creds && fulfillment?.agent?.person?.creds.length > 0) {
                        fulfillment?.agent?.person?.creds.forEach((cred, credIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.person.creds[${credIndex}]' which is an object`, function () {
                                expect(cred).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.person.creds[${credIndex}].id' which is a string`, function () {
                                expect(cred.id).to.exist.and.to.be.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.person.creds[${credIndex}].type' which is a string`, function () {
                                expect(cred.type).to.exist.and.to.be.a("string");
                            }));

                        })
                    }
                }


                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.organization' which is an object`, function () {
                    expect(fulfillment.agent.organization).to.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.organization.creds' which is an array`, function () {
                    expect(fulfillment.agent.organization.creds).to.exist.and.to.be.an("array");
                }));



                if (fulfillment?.agent?.organization?.creds && fulfillment?.agent?.organization?.creds.length > 0) {
                    fulfillment?.agent?.organization?.creds.forEach((cred, credIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.organization.creds[${credIndex}]' which is an object`, function () {
                            expect(cred).to.exist.and.to.be.an("object");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.organization.creds[${credIndex}].id' which is a string`, function () {
                            expect(cred.id).to.exist.and.to.be.a("string");
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].agent.organization.creds[${credIndex}].type' which is a string`, function () {
                            expect(cred.type).to.exist.and.to.be.a("string");
                        }));

                    })
                }
                if (fulfillment?.type === "SIP") {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops' which is an array`, function () {
                        expect(fulfillment.stops).to.exist.and.to.be.an("array");
                    }));

                    if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                        fulfillment.stops.forEach((stopItem, stopIndex) => {
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}]' which is an object`, function () {
                                expect(stopItem).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time' which is an object`, function () {
                                expect(stopItem.time).to.exist.and.to.be.an("object");
                            }));
                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.schedule' which is an object`, function () {
                                expect(stopItem.time.schedule).to.exist.and.to.be.an("object");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].time.schedule.frquency' which is a string (OPTIONAL)`, function () {
                                expect(stopItem.time.schedule.frequency).to.exist.and.to.be.a("string");
                            }));

                        })
                    }
                }

                if ((flowId === "INVESTMENT_7" && action === "on_update" || action === "on_cancel") || (flowId === "INVESTMENT_6" && action === "on_update" || action === "on_cancel")) {
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state' which is an object`, function () {
                        expect(fulfillment.state).to.exist.and.to.be.an("object");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor' which is an object`, function () {
                        expect(fulfillment.state.descriptor).to.exist.and.to.be.an("object");
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor.name' which is a string`, function () {
                        expect(fulfillment.state.descriptor.name).to.exist.and.to.be.a("string");
                    }));
                    messageTestSuite.addTest(new Mocha.Test(`Verify the presence of 'message.order.fulfillments[${fulfillmentIndex}].state.descriptor.code' which is a string`, function () {
                        expect(fulfillment.state.descriptor.code).to.exist.and.to.be.a("string").and.to.be.oneOf(["PENDING", "INITIATED", "INPROGRESS", "COMPLETED", "SUCCESSFUL", "FAILED", "CANCELLED"])
                    }));

                }

                const arr_1 = [{ code: "THRESHOLDS" }]
                const arr_2 = [{ code: "THRESHOLDS" }, { code: "FOLIO_INFORMATION" }]
                const arr_3 = [{ code: "THRESHOLDS" }, { code: "PAYOUT_BANK_ACCOUNT" }]
                const arr_4 = [{ code: "THRESHOLDS" }, { code: "FOLIO_INFORMATION" }, { code: "SUCCESS_INFORMATION" }]

                let arr;
                switch (flowId) {
                    case "INVESTMENT_1":
                    case "INVESTMENT_2":
                        arr = arr_1
                        break;
                    case "INVESTMENT_3":
                    case "INVESTMENT_6":
                        switch (action) {
                            case "on_update":
                                arr = arr_4
                            default:
                                arr = arr_1
                                break;
                        }
                        break;
                    case "INVESTMENT_7":
                        arr = arr_3
                        break;
                    case "INVESTMENT_20":
                    case "INVESTMENT_9":
                    case "INVESTMENT_5":
                        arr = arr_2
                        break;
                    default:
                        break;

                }
                if (arr) {
                    arr.forEach((ele) => {
                        const tagIndex = fulfillment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = fulfillment?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object");
                        }));


                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'(OPTIONAL)`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.name' should be string (OPTIONAL)'`, function () {
                                expect(tagItem.descriptor.name).to.be.a("string");
                            }));


                            if (tagItem?.display) {

                                messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].display' should be a boolean (OPTIONAL)`, function () {
                                    expect(tagItem.display).to.be.a("boolean");
                                }));
                            }

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));



                            const thresholdsArr1 = [{ code: "FREQUENCY" }, { code: "FREQUENCY_DATES" }, { code: "AMOUNT_MIN" }, { code: "AMOUNT_MAX" }, { code: "AMOUNT_MULTIPLES" }, { code: "INSTALMENTS_COUNT_MIN" }, { code: "INSTALMENTS_COUNT_MAX" }, { code: "CUMULATIVE_AMOUNT_MIN" }];
                            const thresholdsArr2 = [{ code: "AMOUNT_MIN" }, { code: "AMOUNT_MAX" }, { code: "AMOUNT_MULTIPLES" }];
                            const thresholdsArr3 = [{ code: "AMOUNT_MIN" }, { code: "AMOUNT_MAX" }, { code: "AMOUNT_MULTIPLES" }, { code: "UNITS_MIN" }, { code: "UNITS_MAX" }, { code: "UNITS_MULTIPLES" }];
                            const folioInformationArr = [{ code: "FOLIO_NUMBER" }, { code: "HOLDING_PATTERN" }, { code: "HOLDER_NAME" }, { code: "CREATED_ON" }, { code: "2FA_EMAIL_ADDRESS_MASKED" }, { code: "2FA_MOBILE_NUMBER_MASKED" }]
                            const payoutBankAmoutArr1 = [{ code: 'IDENTIFIER' }, { code: "MASKED_ACCOUNT_NUMBER" }, { code: "ACCOUNT_HOLDER_NAME" }, { code: "ACCOUNT_TYPE" }, { code: "BANK_NAME" }, { code: "BANK_CODE" }]
                            const informationArr = [{ code: 'FOLIO_NUMBER' }]
                            const payoutBankAmoutArr2 = [{ code: 'IDENTIFIER' }]
                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "THRESHOLDS":
                                    switch (flowId) {
                                        case "INVESTMENT_6":
                                        case "INVESTMENT_20":
                                        case "INVESTMENT_9":
                                        case "INVESTMENT_5":
                                            array = thresholdsArr2
                                            break;
                                        case "INVESTMENT_7":
                                            array = thresholdsArr3
                                            break;
                                        default:
                                            array = thresholdsArr1
                                            break;
                                    }
                                    break;
                                case "FOLIO_INFORMATION":
                                    array = folioInformationArr
                                    break;
                                case "INFORMATION":
                                    array = informationArr
                                    break;
                                case "PAYOUT_BANK_ACCOUNT":
                                    switch (action) {
                                        case "on_select":
                                            array = payoutBankAmoutArr1
                                            break;
                                        default:
                                            array = payoutBankAmoutArr2
                                            break;
                                    }

                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));


                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be string`, function () {
                                            expect(listItem.descriptor.name).to.be.a("string");
                                        }));


                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));

                                    }
                                });
                            }
                        }
                    });
                }


            })
        }

    } catch (error) {
        console.log(error)
        return error;
    }
}

function xinputForGeneral(message, messageTestSuite, flowId, action) {
    try {

        messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput' should be an object`, function () {
            expect(message.order.xinput).to.exist.and.to.be.an("object");
        }));


        //message.order.xinput.form
        messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form' should be an object`, function () {
            expect(message.order.xinput.form).to.exist.and.to.be.an("object");
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form.id' should be a string (OPTIONAL)`, function () {
            expect(message.order.xinput.form.id).to.exist.and.to.be.a("string");
        }));

        if (message?.order?.xinput?.form?.url) {

            messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form.mime_type' should be a string`, function () {
                expect(message.order.xinput.form.mime_type).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`verify that 'message.order.xinput.form.url' should be a valid URL`, function () {
                expect(message.order.xinput.form.url).to.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/);
            }));

        }

        if (message?.order?.xinput?.form_response) {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form_response.status' should be a string`, function () {
                expect(message.order.xinput.form_response.status).to.exist.and.to.be.a("string");
            }));

            messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.form_response.submission_id' should be a string (OPTIONAL)`, function () {
                expect(message.order.xinput.form_response.submission_id).to.exist.and.to.be.a("string");
            }));

        }

        if (message?.order?.xinput?.required || flowId === "INVESTMENT_3" || flowId === "INVESTMENT_2" && action === "on_select") {
            messageTestSuite.addTest(new Mocha.Test("'message.order.xinput.required' should be a boolean", function () {
                expect(message.order.xinput.required).to.exist.and.to.be.a("boolean");
            }));

            //message.order.xinput.head
            messageTestSuite.addTest(new Mocha.Test("'message.order.xinput.head' should be an object", function () {
                expect(message.order.xinput.head).to.exist.and.to.be.an("object");
            }));

            //message.order.xinput.head.index
            messageTestSuite.addTest(new Mocha.Test("'message.order.xinput.head.index' should be an object", function () {
                expect(message.order.xinput.head.index).to.exist.and.to.be.an("object");
            }));

            messageTestSuite.addTest(new Mocha.Test("'message.order.xinput.head.index.min' should be  number", function () {
                expect(message.order.xinput.head.index.min).to.exist.and.to.be.a("number");
            }));

            messageTestSuite.addTest(new Mocha.Test("'message.order.xinput.head.index.cur' should be  number", function () {
                expect(message.order.xinput.head.index.cur).to.exist.and.to.be.a("number");
            }));

            messageTestSuite.addTest(new Mocha.Test("'message.order.xinput.head.index.max' should be  number", function () {
                expect(message.order.xinput.head.index.max).to.exist.and.to.be.a("number");
            }));

            //message.order.xinput.head.headings
            messageTestSuite.addTest(new Mocha.Test("'message.order.xinput.head.headings' should be an array", function () {
                expect(message.order.xinput.head.headings).to.exist.and.to.be.an("array");
            }));

            if (message?.order?.xinput?.head?.headings && message?.order?.xinput?.head?.headings.length > 0) {
                message?.order?.xinput?.head?.headings.forEach((heading, headinIndex) => {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.xinput.head.headings[${headinIndex}]' should be a string`, function () {
                        expect(heading).to.exist.and.to.be.a("string").and.to.be.oneOf(["APPLICATION_FORM", "KYC", "ESIGN"]);
                    }));
                })
            }
        }

    } catch (error) {
        console.log(error);
        return error;
    }
}

function firstActionLog(logs, action) {
    try {
        const log = logs?.find((log) => log?.request?.context?.action === action);

        return log?.request;
    } catch (err) {
        console.log(err);
    }
}

function orderIdStatus(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.id' which is a string", function () {
            expect(message.order.id).to.be.a("string");
        }));

        messageTestSuite.addTest(new Mocha.Test("Verify the presence of 'message.order.status' which is a string", function () {
            expect(message.order.status).to.be.a("string");
        }));
    } catch (error) {
        console.log(error);
        return error;
    }
}

function tagsCommonTests(message, messageTestSuite, action) {
    try {
        const arr1 = [{ code: "BPP_TERMS" }];
        const arr2 = [{ code: "BAP_TERMS" }, { code: "BPP_TERMS" }];
        let arr;
        switch (action) {
            case "on_confirm":
            case "on_update":
                arr = arr2;
                break;
            default:
                arr = arr1;
                break;
        }




        arr.forEach((ele) => {
            const tagIndex = message?.order?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
            const tagItem = message?.order?.tags[tagIndex];
            messageTestSuite.addTest(new Mocha.Test(`'message.order.tags' should have an object of ${ele.code}`, function () {
                expect(tagItem).to.exist.and.to.be.an("object");
            }));


            if (tagIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                    expect(tagItem).to.have.property("display").that.is.a("boolean");
                    expect(tagItem).to.have.property("list").that.is.an("array");
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].descriptor.name' should be string '`, function () {
                    expect(tagItem.descriptor.name).to.be.a("string");
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].display' should be a boolean`, function () {
                    expect(tagItem.display).to.be.a("boolean");
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list' should have be a non empty array`, function () {
                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                }));


                const array = [{ code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];

                if (array) {
                    array.forEach((it) => {
                        const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                        const listItem = tagItem?.list[listItemIndex];

                        messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                            expect(listItem).to.exist.and.to.be.an("object");
                        }));


                        if (listItemIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                expect(listItem).to.have.property("descriptor").that.is.an("object");
                                expect(listItem).to.have.property("value").that.is.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                expect(listItem.descriptor.code).to.be.equal(it.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be string`, function () {
                                expect(listItem.descriptor.name).to.be.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.order.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                            }));

                        }
                    });
                }
            }
        });
    } catch (error) {
        console.log(error)
        return error;
    }
}

function paymentsCommonTests(message, messageTestSuite, logs, flowId, action) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments' should be an array`, function () {
            expect(message.order.payments).to.be.an('array');
        }));
        if (message?.order?.payments && message?.order?.payments.length > 0) {
            message.order.payments.forEach((payment, z) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}]' should be an object`, function () {
                    expect(payment).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].collected_by' should be a string (OPTIONAL)`, function () {
                    expect(payment.collected_by).to.be.a('string').and.to.be.oneOf(["BPP", "BAP"]);
                }));

                if (action === "on_init" || action === "on_confirm") {

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].url' should be a string (OPTIONAL)`, function () {
                        expect(payment.url).to.be.a('string');
                    }));

                }

                if (action === "on_init" || action === "on_confirm" || action === "on_status" || action === "on_update" || action === "on_cancel") {

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].status' should be a string (OPTIONAL)`, function () {
                        expect(payment.status).to.be.a('string').and.to.be.oneOf(["PAID", "NOT-PAID", "FAILED"]);
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].id' should be a string (OPTIONAL)`, function () {
                        expect(payment.id).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params' should be an object`, function () {
                        expect(payment.params).to.be.an('object');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.amount' should be a string (OPTIONAL)`, function () {
                        expect(payment.params.amount).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.currency' should be a string (OPTIONAL)`, function () {
                        expect(payment.params.currency).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.source_bank_code' should be a string (OPTIONAL)`, function () {
                        expect(payment.params.source_bank_code).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.source_bank_account_number' should be a string (OPTIONAL)`, function () {
                        expect(payment.params.source_bank_account_number).to.be.a('string');
                    }));

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.source_bank_account_name' should be a string (OPTIONAL)`, function () {
                        expect(payment.params.source_bank_account_name).to.be.a('string');
                    }));

                    if ((flowId === "INVESTMENT_3" && action === "on_update" || action === "on_status") || (flowId === "INVESTMENT_2" && action === "on_update" || action === "on_status") || (flowId === "INVESTMENT_1" && action === "on_update" || action === "on_status") || (flowId === "INVESTMENT_20" && action === "on_update" || action === "on_status")) {
                        if (flowId !== "INVESTMENT_9") {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].params.transaction_id' should be a string`, function () {
                                expect(payment.params.transaction_id).to.be.a('string');
                            }));
                        }
                    }
                }

                if (flowId !== "INVESTMENT_20") {

                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].type' should be a string (OPTIONAL)`, function () {
                        expect(payment.type).to.be.a('string');
                    }));
                }
                if (payment?.tags) {
                    const arr = [{ code: "PAYMENT_METHOD" }]

                    arr.forEach((ele) => {
                        const tagIndex = payment?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
                        const tagItem = payment?.tags[tagIndex];
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags' should have an object of ${ele.code}`, function () {
                            expect(tagItem).to.exist.and.to.be.an("object");
                        }));

                        if (tagIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}]' should have properties named 'descriptor', and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string (OPTIONAL)`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}' (OPTIONAL)`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].descriptor.name' should be string  (OPTIONAL)'`, function () {
                                expect(tagItem.descriptor.name).to.be.a("string");
                            }));

                            if (flowId === "INVESTMENT_20" || flowId === "INVESTMENT_6") {
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}]' should have a property named 'display' which is a boolean (OPTIONAL)`, function () {
                                    expect(tagItem).to.have.property("display").that.is.a("boolean");
                                }));
                            }

                            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            const paymentModeType = tagItem?.list?.find((listItem) => listItem?.descriptor?.code === "MODE")?.value;
                            const paymentMethodArrForRegistration = [{ code: "MODE" }]
                            const paymentMethodArrForExisting = [{ code: "MODE" }, { code: "MANDATE_IDENTIFIER" }, { code: "TYPE" }, { code: "MASKED_BANK_ACCOUNT_NUMBER" }, { code: "BANK_ACCOUNT_NAME" }, { code: "BANK_NAME" }];

                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "PAYMENT_METHOD":
                                    switch (flowId) {
                                        case "INVESTMENT_1":
                                        case "INVESTMENT_3":
                                            switch (paymentModeType) {
                                                case "MANDATE_REGISTRATION":
                                                case "UPI_COLLECT":
                                                    array = paymentMethodArrForRegistration;
                                                    break;
                                                case "MANDATE_EXISTING":
                                                    array = paymentMethodArrForExisting;
                                                    break;
                                            }
                                            break;
                                        case "INVESTMENT_9":
                                        case "INVESTMENT_20":
                                        case "INVESTMENT_5":
                                            array = paymentMethodArrForRegistration;
                                            break;
                                        case "INVESTMENT_6":
                                        case "INVESTMENT_2":
                                            array = paymentMethodArrForRegistration
                                            break;
                                        default:
                                            break;

                                    }
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

                                    if (listItemIndex !== -1) {
                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}' (OPTIONAL)`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${z}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty (OPTIONAL)`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));

                                    }
                                });
                            }
                        }
                    })
                }
            })

        }
    } catch (error) {
        console.log(error)
        return error;
    }
}

function quoteCommonTests(message, messageTestSuite, flowId) {
    try {

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote' should be an object", function () {
            expect(message.order.quote).to.be.an('object');
        }));

        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.id' should be a string`, function () {
            expect(message.order.quote.id).to.be.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price' should be an object", function () {
            expect(message.order.quote.price).to.be.an('object');
        }));


        // Calculate the total breakup price
        const totalBreakupPrice = message?.order?.quote?.breakup.reduce((total, item) => {
            const priceValue = parseFloat(item?.price?.value);
            return total + (isNaN(priceValue) ? 0 : priceValue);
        }, 0);

        // Create a new test for the messageTestSuite
        messageTestSuite.addTest(new Mocha.Test(`message.order.quote.price.value' should be equal to the sum of 'breakup' prices (${totalBreakupPrice})`, function () {
            // Convert the actual price value to a fixed decimal format
            const actualPriceValue = parseFloat(message.order.quote.price.value).toFixed(2);

            // Assert that the actual price value is one of the expected values
            expect(actualPriceValue).to.be.oneOf([
                totalBreakupPrice.toFixed(2),
                Math.floor(totalBreakupPrice).toFixed(2),
                Math.ceil(totalBreakupPrice).toFixed(2)
            ]);
        }));



        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.value' should be a string", function () {
            expect(message.order.quote.price.value).to.be.a('string');
        }));

        messageTestSuite.addTest(new Mocha.Test("'message.order.quote.price.currency' should be a string", function () {
            expect(message.order.quote.price.currency).to.be.a('string');
        }));

        const arr1 = [
            { title: "SIP" }
        ];
        const arr2 = [
            { title: "Investment" }
        ];
        const arr3 = [
            { title: "Redemption" }
        ];

        let arr;
        switch (flowId) {
            case "INVESTMENT_6":
            case "INVESTMENT_5":
            case "INVESTMENT_20":
            case "INVESTMENT_9":
                arr = arr2
                break;
            case "INVESTMENT_7":
                arr = arr3
                break;
            default:
                arr = arr1;
                break;
        }

        arr.forEach((ele) => {
            const breakupIndex = message?.order?.quote?.breakup.findIndex((breakup) => breakup?.title === ele.title);
            const breakupItem = message?.order?.quote?.breakup[breakupIndex];
            messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup' should have an object of ${ele.title}`, function () {
                expect(breakupItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
            }));

            if (breakupIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}]' should be an object`, function () {
                    expect(breakupItem).to.be.exist.and.to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].title' should be equal to '${ele.title}'`, function () {
                    expect(breakupItem.title).to.be.equal(ele.title);
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}] should have an 'item' property`, function () {
                    expect(breakupItem).to.have.property("item");
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item should be an object`, function () {
                    expect(breakupItem.item).to.be.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item should have an 'id' property`, function () {
                    expect(breakupItem.item).to.have.property("id");
                }));

                messageTestSuite.addTest(new Mocha.Test(`message.order.quote.breakup[${breakupIndex}].item.id should be a string (OPTIONAL)`, function () {
                    expect(breakupItem.item.id).to.be.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.fulfillment_ids' should be an array (OPTIONAL)`, function () {
                    expect(breakupItem.item.fulfillment_ids).to.be.an('array');
                }));

                if (breakupItem?.item?.fulfillment_ids && breakupItem?.item?.fulfillment_ids.length > 0) {
                    breakupItem?.item?.fulfillment_ids.forEach((fulfillmentId, fulfillmentIdIndex) => {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].item.fulfillment_ids[${fulfillmentIdIndex}]' should be a string (OPTIONAL)`, function () {
                            expect(fulfillmentId).to.be.a('string');
                        }));
                    })
                }

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price' should  be object`, function () {
                    expect(breakupItem).to.have.property("price").that.is.an("object");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.value' should  be string`, function () {
                    expect(breakupItem.price).to.have.property("value").that.is.a("string");
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.quote.breakup[${breakupIndex}].price.currency' should  be string`, function () {
                    expect(breakupItem.price).to.have.property("currency").that.is.a("string");
                }));

            }
        })

    } catch (error) {
        console.log(error)
        return error;
    }
}

function documentsCommonTests(message, messageTestSuite) {
    try {
        messageTestSuite.addTest(new Mocha.Test(`'message.order.documents' should be an array`, function () {
            expect(message.order.documents).to.be.an('array');
        }));
        if (message?.order?.documents && message?.order?.documents.length > 0) {
            message.order.documents.forEach((document, documentIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${documentIndex}]' should be an object`, function () {
                    expect(document).to.be.an('object');
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${documentIndex}].descriptor' should be an object`, function () {
                    expect(document.descriptor).to.be.an("object")
                }))
                messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${documentIndex}].descriptor.name' should be an string`, function () {
                    expect(document.descriptor.name).to.be.an("string")
                }))
                messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${documentIndex}].descriptor.code' should be an string`, function () {
                    expect(document.descriptor.code).to.be.an("string")
                }))
                messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${documentIndex}].url' should be an string`, function () {
                    expect(document.url).to.be.an("string")
                }))
                messageTestSuite.addTest(new Mocha.Test(`'message.order.documents[${documentIndex}].mime_type' should be an string`, function () {
                    expect(document.mime_type).to.be.an("string")
                }))
            })
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

function onSearchtagsCommonTests(message, messageTestSuite) {
    try {
        const arr = [{ code: "BPP_TERMS" }];

        arr.forEach((ele) => {
            const tagIndex = message?.catalog?.tags.findIndex((tag) => tag?.descriptor?.code === ele.code);
            const tagItem = message?.catalog?.tags[tagIndex];
            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags' should have an object of ${ele.code}`, function () {
                expect(tagItem).to.exist.and.to.be.an("object");
            }));


            if (tagIndex !== -1) {
                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                    expect(tagItem).to.have.property("descriptor").that.is.an("object");
                    expect(tagItem).to.have.property("display").that.is.a("boolean");
                    expect(tagItem).to.have.property("list").that.is.an("array");
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                    expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                    expect(tagItem.descriptor.code).to.be.equal(ele.code);
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].descriptor.name' should be string '`, function () {
                    expect(tagItem.descriptor.name).to.be.a("string");
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].display' should be a boolean (OPTIONAL)`, function () {
                    expect(tagItem.display).to.be.a("boolean");
                }));


                messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list' should have be a non empty array`, function () {
                    expect(tagItem.list).to.be.an("array").that.is.not.empty;
                }));


                const array = [{ code: "STATIC_TERMS" }, { code: "OFFLINE_CONTRACT" }];

                if (array) {
                    array.forEach((it) => {
                        const listItemIndex = tagItem?.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                        const listItem = tagItem?.list[listItemIndex];

                        messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                            expect(listItem).to.exist.and.to.be.an("object");
                        }));


                        if (listItemIndex !== -1) {
                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                expect(listItem).to.have.property("descriptor").that.is.an("object");
                                expect(listItem).to.have.property("value").that.is.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                expect(listItem.descriptor.code).to.be.equal(it.code);
                            }));

                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be string`, function () {
                                expect(listItem.descriptor.name).to.be.a("string");
                            }));


                            messageTestSuite.addTest(new Mocha.Test(`'message.catalog.tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                expect(listItem.value).to.be.a('string').that.is.not.empty;
                            }));

                        }
                    });
                }
            }
        });
    } catch (error) {
        console.log(error)
        return error;
    }
}
module.exports = {
    onSearchtagsCommonTests,
    providerCommonTests,
    itemsCommonTests,
    paymentsCommonTests,
    fulfillmentsCommonTests,
    xinputForGeneral,
    tagsCommonTests,
    firstActionLog,
    documentsCommonTests,
    quoteCommonTests,
    orderIdStatus
}