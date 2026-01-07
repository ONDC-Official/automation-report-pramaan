const Mocha = require("mocha");
const { expect } = require("chai");
const contextTests = require("./context");
const on_updateOneSchema = require("./schema/on_update_one.schema");
const on_updateTwoSchema = require("./schema/on_update_two.schema");
const on_updateThreeSchema = require("./schema/on_update_three.schema");
const on_updateFourSchema = require("./schema/on_update_four.schema");
const { generateTests } = require("./common");

function validateItemsAndPayments(message, step, testCaseId) {

    let testcaseCounter = 1001;
    const getNextTestcaseId = () => testcaseCounter++;

    const testSuite = new Mocha.Suite("Payments Validation");

    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items' should be a non-empty array`, function () {
        expect(message.order.items).to.exist.and.to.be.a("array");
    }));
    if (message?.order?.items && message?.order?.items.length > 0) {
        message.order.items.forEach((item, i) => {
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}]' should be an object`, function () {
                expect(item).to.be.an('object');
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].id' should be a string`, function () {
                expect(item.id).to.be.a('string');
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].parent_item_id' should be a string`, function () {
                expect(item.parent_item_id).to.be.a('string');
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].category_ids' should be an array, that should not be empty`, function () {
                expect(item.category_ids).to.be.an('array').that.is.not.empty;
            }));
            if (item?.category_ids && item?.category_ids.length > 0) {
                item.category_ids.forEach((categoryID, categoryIDIndex) => {
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].category_ids[${categoryIDIndex}]' should be string`, function () {
                        expect(categoryID).to.be.a("string");
                    }));
                })
            }
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].fulfillment_ids' should be an array, that should not be empty`, function () {
                expect(item.fulfillment_ids).to.be.an('array').that.is.not.empty;
            }));
            if (item?.fulfillment_ids && item?.fulfillment_ids.length > 0) {
                item.fulfillment_ids.forEach((fulfillmentID, fulfillmentIDIndex) => {
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].fulfillment_ids[${fulfillmentIDIndex}]' should be string`, function () {
                        expect(fulfillmentID).to.be.a("string");
                    }));
                })
            }

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].descriptor' should be an object`, function () {
                expect(item.descriptor).to.be.an('object');
            }));
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].descriptor.name' should be a string`, function () {
                expect(item.descriptor.name).to.be.a('string');
            }));
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].descriptor.code' should be a string`, function () {
                expect(item.descriptor.code).to.be.a('string');
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].price' should be an object`, function () {
                expect(item.price).to.be.an('object');
            }));
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].price.currency' should be a string`, function () {
                expect(item.price.currency).to.be.a('string');
            }));
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].price.value' should be a string`, function () {
                expect(item.price.value).to.be.a('string');
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags' should be an array`, function () {
                expect(item.tags).to.be.an('array');
            }));
            const arr1 = [
                { code: "INFO" },
                { code: "CHECKLISTS" },
                { code: "LINKED_ORDER_IDS" }
            ];
            const arr2 = [
                { code: "INFO" },
                { code: "CHECKLISTS" }
            ];
            let arr;

            switch (step) {
                case "II":
                    arr = arr1
                    break;
                default:
                    arr = arr2;
                    break;
            }
            arr.forEach((ele) => {
                const tagIndex = item?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                const tagItem = item?.tags?.[tagIndex];

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags' should have an object of ${ele.code}`, function () {
                    expect(tagItem).to.exist.and.to.be.an("object");
                }));


                if (tagIndex !== -1) {
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}]' should have properties named 'descriptor', 'list'`, function () {
                        expect(tagItem).to.have.property("descriptor").that.is.an("object");
                        expect(tagItem).to.have.property("list").that.is.an("array");
                    }));


                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                        expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                    }));


                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].descriptor.code' should be equal to '${ele.code}'`, function () {
                        expect(tagItem.descriptor.code).to.be.equal(ele.code);
                    }));

                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                        expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                    }));

                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].list' should be a non-empty array`, function () {
                        expect(tagItem.list).to.be.an("array").that.is.not.empty;
                    }));



                    const infoArr1 = [{ code: "INTEREST_RATE" }, { code: "REPAYMENT_FREQUENCY" }];
                    const infoArr2 = [{ code: "WORKING_CAPITAL_LIMIT" }, { code: "INTEREST_RATE" }, { code: "PROCESSING_FEE" }, { code: "INSURANCE_CHARGES" }, { code: "OTHER_UPFRONT_CHARGES" }, { code: "TERM" }, { code: "REPAYMENT_FREQUENCY" }, { code: "OTHER_CHARGES" }, { code: "COOL_OFF_PERIOD" }, { code: "KYC_MODE" }, { code: "CO_APPLICANT" }, { code: "RATE_ANNUALISED_PENAL_CHARGES" }];
                    const checklistsArr2 = [{ code: "INDIVIDUAL_KYC" }, { code: "BUSINESS_KYC" }, { code: "PERSONAL_DISCUSSION" }, { code: "PHYSICAL_VERIFICATION" }, { code: "ENACH" }, { code: "PROCESSING_FEE" }, { code: "ESIGN" }];
                    const checklistsArr1 = [{ code: "DRADOWN_APPROVAL" }];
                    const linkedOrderIdsArr = [];

                    let array;
                    switch (tagItem?.descriptor?.code) {
                        case "INFO":
                            switch (step) {
                                case "II":
                                    array = infoArr2;
                                    break;
                                default:
                                    array = infoArr1;
                                    break;
                            }
                            break;
                        case "CHECKLISTS":
                            switch (step) {
                                case "II":
                                case "on_update_update_base_transaction":
                                case "V":
                                case "on_update_update_base_transaction_final":
                                    array = checklistsArr2;
                                    break;
                                default:
                                    array = checklistsArr1;
                                    break;
                            }
                            break;
                        case "LINKED_ORDER_IDS":
                            array = linkedOrderIdsArr;
                            break;
                        default:
                            break;
                    }
                    if (array) {
                        array.forEach((it) => {
                            const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor?.code === it.code);
                            const listItem = tagItem?.list?.[listItemIndex];

                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                expect(listItem).to.exist.and.to.be.an("object");
                            }));


                            if (listItemIndex !== -1) {
                                if (it.code !== "LINKED_ORDER_IDS") {


                                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should be an object`, function () {
                                        expect(listItem.descriptor).to.be.an("object");
                                    }));
                                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                        expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                    }));

                                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.name' should be a string that is not empty`, function () {
                                        expect(listItem.descriptor.name).to.be.a('string').that.is.not.empty;
                                    }));

                                    if (it.code === "REPAYMENT_FREQUENCY") {
                                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.short_desc' should be a string`, function () {
                                            expect(listItem.descriptor.short_desc).to.be.a('string');
                                        }));
                                    }

                                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                        expect(listItem.descriptor.code).to.be.equal(it.code);
                                    }));
                                }

                                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.items[${i}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                    expect(listItem.value).to.be.a('string').that.is.not.empty;
                                }));

                            }
                        });
                    }
                }
            });


        })
    }

    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments' should be a non-empty array`, function () {
        expect(message.order.payments).to.exist.and.to.be.a("array");
    }));

    if (message?.order?.payments && message?.order?.payments?.length > 0) {
        message?.order?.payments.forEach((payment, paymentIndex) => {
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}]' should be an object`, function () {
                expect(payment).to.exist.and.to.be.a("object");
            }));
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].id' should exist and be a non-empty string`, function () {
                expect(payment.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].status' should exist and be a non-empty string`, function () {
                expect(payment.status).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));

            messageTestSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${z}].type' should be a string`, function () {
                expect(payment.type).to.be.a('string').and.to.be.oneOf(["PRE-FULFILLMENT", "ON-ORDER", "PRE-ORDER", "ON-FULFILLMENT"]);
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params' should be an object`, function () {
                expect(payment.params).to.be.an("object");
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.amount' should exist and be a valid number string`, function () {
                expect(payment.params.amount).to.exist.and.to.match(/^\d+(\.\d+)?$/);
            }));
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.currency' should exist and be a non-empty string`, function () {
                expect(payment.params.currency).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));
            if (payment?.type === "ON-ORDER") {

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.transaction_id' should exist and be a non-empty string`, function () {
                    expect(payment.params.transaction_id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));

                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.bank_account_number' should exist and be a numeric string`, function () {
                    expect(payment.params.bank_account_number).to.exist.and.to.match(/^\d+$/);
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].params.bank_code' should exist and be a non-empty string`, function () {
                    expect(payment.params.bank_code).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));

            }

            if (payment?.type === "POST-FULFILLMENT") {
                if (Array.isArray(payment.tags)) {
                    payment.tags.forEach((tag, tagIndex) => {
                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags[${tagIndex}].descriptor' should be an object`, function () {
                            expect(tag.descriptor).to.exist.and.to.be.an("object");
                        }));
                        if (Array.isArray(tag.list)) {
                            tag.list.forEach((listItem, listIndex) => {
                                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listIndex}].descriptor.code' should exist and be a non-empty string`, function () {
                                    expect(listItem.descriptor.code).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                                }));
                                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listIndex}].descriptor.name' should exist and be a non-empty string`, function () {
                                    expect(listItem.descriptor.name).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                                }));
                                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.payments[${paymentIndex}].tags[${tagIndex}].list[${listIndex}].value' should exist and be a non-empty string`, function () {
                                    expect(listItem.value).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                                }));
                            });
                        }
                    });
                }
            }
        });
    }

    // Validate if fulfillments exist and are an array
    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments' should be a non-empty array`, function () {
        expect(message.order.fulfillments).to.exist.and.to.be.an("array").that.is.not.empty;
    }));

    if (message?.order?.fulfillments?.length > 0) {
        message.order.fulfillments.forEach((fulfillment, fulfillmentIndex) => {
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}]' should exist and be an object`, function () {
                expect(fulfillment).to.exist.and.to.be.an("object");
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].id' should exist and be a string`, function () {
                expect(fulfillment.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer' should exist and be an object`, function () {
                expect(fulfillment.customer).to.exist.and.to.be.a("object");
            }));

            // Validate customer person details

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person' should exist and be an object`, function () {
                expect(fulfillment.customer.person).to.exist.and.to.be.a("object");
            }));
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person.name' should exist and be a string`, function () {
                expect(fulfillment.customer.person.name).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));
            if (step === "II" || step === "IV") {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person.dob' should exist and be a string`, function () {
                    expect(fulfillment.customer.person.dob).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person.gender' should exist and be a string`, function () {
                    expect(fulfillment.customer.person.gender).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                }));
            };
            if (step === "I" || step === "II" || step === "IV") {
                testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'fulfillment.customer.person.creds' should be a non-empty array`, function () {
                    expect(fulfillment.customer.person.creds).to.exist.and.to.be.an("array").that.is.not.empty;
                }));

                if (fulfillment?.customer?.person?.creds && fulfillment?.customer?.person?.creds.length > 0) {
                    fulfillment.customer.person.creds.forEach((cred, credIndex) => {
                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credIndex}].id' should exist and be a string`, function () {
                            expect(cred.id).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                        }));

                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.person.creds[${credIndex}].type' should exist and be a string`, function () {
                            expect(cred.type).to.exist.and.to.be.a("string").with.length.greaterThan(0);
                        }));
                    });
                }
            };

            // Validate customer contact details
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.contact' should exist and be an object`, function () {
                expect(fulfillment.customer.contact).to.exist.and.to.be.a("object");
            }));
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.contact.email' should exist and be a string`, function () {
                expect(fulfillment.customer.contact.email).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));

            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].customer.contact.phone' should exist and be a string`, function () {
                expect(fulfillment.customer.contact.phone).to.exist.and.to.be.a("string").with.length.greaterThan(0);
            }));

            if (step === "I" || step === "III") {

                if (fulfillment?.stops) {
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'fulfillment.stops' should be a non-empty array`, function () {
                        expect(fulfillment.stops).to.exist.and.to.be.an("array").that.is.not.empty;
                    }));
                    if (fulfillment?.stops && fulfillment?.stops.length > 0) {
                        fulfillment.stops.forEach((stop, stopIndex) => {
                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization' should exist and be an object`, function () {
                                expect(stop.authorization).to.exist.and.to.be.a("object");
                            }));

                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization.type' should exist and be an object`, function () {
                                expect(stop.authorization.type).to.exist.and.to.be.a("string");
                            }));
                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].stops[${stopIndex}].authorization.token' should exist and be an object`, function () {
                                expect(stop.authorization.token).to.exist.and.to.be.a("string");
                            }));
                        });
                    }
                }
            };

            if (step === "II" || step === "IV") {
                const arr = [{ code: "CHECKLISTS" }];
                arr.forEach((ele) => {
                    const tagIndex = fulfillment?.tags?.findIndex((tag) => tag?.descriptor?.code === ele.code);
                    const tagItem = fulfillment?.tags[tagIndex];
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags' should have an object of ${ele.code}`, function () {
                        expect(tagItem).to.exist.and.to.be.an("object").and.not.to.be.undefined;
                    }));


                    if (tagIndex !== -1) {
                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                            expect(tagItem).to.have.property("descriptor").that.is.an("object");
                            expect(tagItem).to.have.property("list").that.is.an("array");
                        }));


                        if (tagIndex !== -1) {
                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}]' should have properties named 'descriptor', 'display' and 'list'`, function () {
                                expect(tagItem).to.have.property("descriptor").that.is.an("object");
                                expect(tagItem).to.have.property("list").that.is.an("array");
                            }));

                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'code' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("code").that.is.a("string");
                            }));


                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor.code' should have be equal to '${ele.code}'`, function () {
                                expect(tagItem.descriptor.code).to.be.equal(ele.code);
                            }));

                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].descriptor' should have a property named 'name' which is a string`, function () {
                                expect(tagItem.descriptor).to.have.property("name").that.is.a("string");
                            }));

                            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have be a non empty array`, function () {
                                expect(tagItem.list).to.be.an("array").that.is.not.empty;
                            }));

                            const checklistsArr = [{ code: "KYC" }, { code: "E_SIGN" }];

                            let array;
                            switch (tagItem?.descriptor?.code) {
                                case "CHECKLISTS":
                                    array = checklistsArr;
                                    break;
                                default:
                                    break;
                            }

                            if (array) {
                                array.forEach((it) => {
                                    const listItemIndex = tagItem.list.findIndex((listItem) => listItem?.descriptor.code === it.code);
                                    const listItem = tagItem?.list[listItemIndex];

                                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list' should have an object '${it.code}'`, function () {
                                        expect(listItem).to.exist.and.to.be.an("object");
                                    }));

                                    if (listItemIndex !== -1) {
                                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}]' should have properties named 'descriptor' and 'value' which are strings`, function () {
                                            expect(listItem).to.have.property("descriptor").that.is.an("object");
                                            expect(listItem).to.have.property("value").that.is.a("string");
                                        }));


                                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'code' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("code").that.is.a("string");
                                        }));


                                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor.code' should be equal to '${it.code}'`, function () {
                                            expect(listItem.descriptor.code).to.be.equal(it.code);
                                        }));

                                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].descriptor' should have properties named 'name' which is a string`, function () {
                                            expect(listItem.descriptor).to.have.property("name").that.is.a("string");
                                        }));

                                        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.fulfillments[${fulfillmentIndex}].tags[${tagIndex}].list[${listItemIndex}].value' should be a string that is not empty`, function () {
                                            expect(listItem.value).to.be.a('string').that.is.not.empty;
                                        }));
                                    }
                                });
                            }
                        }
                    }
                })
            }
        });
    };


    if (step === "IV") {


        testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.ref_order_ids' should be a non-empty array`, function () {
            expect(message.order.ref_order_ids).to.exist.and.to.be.an("array").that.is.not.empty;
        }));
        if (message?.order?.ref_order_ids) {
            testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.ref_order_ids' should be a non-empty array`, function () {
                expect(message.order.ref_order_ids).to.exist.and.to.be.an("array").that.is.not.empty;
            }));
            if (message?.order?.ref_order_ids && message?.order?.ref_order_ids.length > 0) {
                message.order.ref_order_ids.forEach((orderId, index) => {
                    testSuite.addTest(new Mocha.Test(`[${testCaseId}${getNextTestcaseId()}]'message.order.ref_order_ids[${index}]' should be a non-empty string`, function () {
                        expect(orderId).to.exist.and.to.be.a("string").that.is.not.empty;
                    }));
                });
            }
        }

    }

    return testSuite;
}


function on_updateMessageTests({ context, message } = {}, constants = {}) {
    try {
        let schema;
        const { step, testCaseId } = constants;

        switch (step) {
            case "on_update_completion_of_disbursal":
            case "I":
                schema = on_updateOneSchema;
                break;
            case "II":
            case "on_update_update_base_transaction":
            case "on_update_update_base_transaction_final":
                schema = on_updateTwoSchema;
                break;
            case "III":
            case "on_update_missed_emi":
                schema = on_updateThreeSchema;
                break;
            case "IV":
            case "on_update_missed_emi_paid":
                schema = on_updateThreeSchema;
                break;
            default:
                break;
        }

        // Generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, schema, "Verification of Message of on_update", constants);
        messageTestSuite.addSuite(validateItemsAndPayments(message, step, testCaseId));
        return messageTestSuite;
    } catch (err) {
        console.log(err);
        const errorTestSuite = new Mocha.Suite("Error in verification of message of on_update call");
        errorTestSuite.addTest(new Mocha.Test("Couldn't verify the message of on_update as payload might be missing or Some Internal Error", function () {
            expect(true).to.equal(false);
        }));
        return errorTestSuite;
    }
}

const stepMap = {
    "on_update_completion_of_disbursal": "Completion of disbursal",
    "on_update_update_base_transaction": "Update Base Transaction",
    "on_update_missed_emi": "Request Missed EMI",
    "on_update_missed_emi_paid": "Missed EMI Paid",
    "on_update_update_base_transaction_final": "Update Base Transaction Post Payment"
}

module.exports = async function on_update({ context, message }, step, testCaseId, logs = []) {
    try {
        const testSuite = new Mocha.Suite(`on_update (${stepMap[step]}) request verification`);
        const constants = {
            action: "on_update",
            version: "2.3.0",
            step: step,
            testCaseId: testCaseId
        };

        testSuite.addSuite(contextTests(context, constants, logs))
        testSuite.addSuite(on_updateMessageTests({ context, message }, constants));

        return testSuite;
    } catch (err) {
        console.log(err);
    }
};


