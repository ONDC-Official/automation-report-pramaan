const Mocha = require("mocha");
const contextTests = require("./context");
const { expect } = require("chai");
const { urlRegex, iso8601DurationRegex, isoTime } = require("../utils/constants");

function messageTests({ context, message } = {}, testSuite, { type, step }) {
    try {
        const messageTestSuite = Mocha.Suite.create(testSuite, "Verification of Message");

        messageTestSuite.addTest(new Mocha.Test("'message' should have property 'orders' that is a array", function () {
            expect(message).to.have.property('orders').that.is.an('array');
        }));

        if (message?.orders && message?.orders?.length > 0) {
            message?.orders.forEach((order, orderIndex) => {
                messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].id' should be a non-empty string`, function () {
                    expect(order.id).to.be.a('string').that.is.not.empty;
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].amount' should be a non-empty object`, function () {
                    expect(order.amount).to.be.a('object').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].amount.currency' should be a non-empty string`, function () {
                    expect(order.amount.currency).to.be.a('string').that.is.not.empty;
                }));
                messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].amount.value' should be a non-empty string`, function () {
                    expect(order.amount.value).to.be.a('string').that.is.not.empty;
                }));

                messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements' should be a non-empty array`, function () {
                    expect(order.settlements).to.be.an('array');
                }));
                if (order?.settlements && order?.settlements.length > 0) {
                    order?.settlements.forEach((settle, index) => {

                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].id' should be a string`, function () {
                            expect(settle.id).to.be.a('string').that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].payment_id' should be a string`, function () {
                            expect(settle.payment_id).to.be.a('string').that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].status' should be a valid status`, function () {
                            expect(settle.status).to.be.oneOf(['PENDING', 'SETTLED', 'TO_BE_INITIATED']);
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].amount' should be a non-empty object`, function () {
                            expect(settle.amount).to.be.a('object').that.is.not.empty;
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].amount.currency' should be a non-empty string`, function () {
                            expect(settle.amount.currency).to.be.a('string').that.is.not.empty;
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].amount.value' should be a non-empty string`, function () {
                            expect(settle.amount.value).to.be.a('string').that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].commission' should be a non-empty object`, function () {
                            expect(settle.commission).to.be.a('object').that.is.not.empty;
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].commission.currency' should be a non-empty string`, function () {
                            expect(settle.commission.currency).to.be.a('string').that.is.not.empty;
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].commission.value' should be a non-empty string`, function () {
                            expect(settle.commission.value).to.be.a('string').that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].withholding_amount' should be a non-empty object`, function () {
                            expect(settle.withholding_amount).to.be.a('object').that.is.not.empty;
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].withholding_amount.currency' should be a non-empty string`, function () {
                            expect(settle.withholding_amount.currency).to.be.a('string').that.is.not.empty;
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].withholding_amount.value' should be a non-empty string`, function () {
                            expect(settle.withholding_amount.value).to.be.a('string').that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].tcs' should be a non-empty object`, function () {
                            expect(settle.tcs).to.be.a('object').that.is.not.empty;
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].tcs.currency' should be a non-empty string`, function () {
                            expect(settle.tcs.currency).to.be.a('string').that.is.not.empty;
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].tcs.value' should be a non-empty string`, function () {
                            expect(settle.tcs.value).to.be.a('string').that.is.not.empty;
                        }));

                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].tds' should be a non-empty object`, function () {
                            expect(settle.tds).to.be.a('object').that.is.not.empty;
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].tds.currency' should be a non-empty string`, function () {
                            expect(settle.tds.currency).to.be.a('string').that.is.not.empty;
                        }));
                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].tds.value' should be a non-empty string`, function () {
                            expect(settle.tds.value).to.be.a('string').that.is.not.empty;
                        }));

                        if (settle?.status === "SETTLED") {
                            messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].settlement_ref_no' should be a string`, function () {
                                expect(settle.settlement_ref_no).to.be.a('string').that.is.not.empty;
                            }));
                        }

                        if (settle?.status !== "SETTLED") {
                            if (settle.due_date) {
                                messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].due_date' should be a string`, function () {
                                    expect(settle.due_date).to.be.a('string').that.is.not.empty;
                                }));
                            }
                        }

                        messageTestSuite.addTest(new Mocha.Test(`'message.orders[${orderIndex}].settlements[${index}].updated_at' should be valid ISO timestamp`, function () {
                            expect(settle.updated_at).to.match(isoTime);
                        }));
                    })
                }
            })
        }

    } catch (err) {
        console.log(err);
        return err;
    }
}


async function recon({ context, message } = {}, step, version = "") {
    try {
        const testSuite = new Mocha.Suite(`recon (${step}) request verification`);

        contextTests(context, "recon", testSuite, version);
        messageTests({ context, message }, testSuite, step);

        return testSuite;
    } catch (err) {
        console.log(err);
        return err;
    }
}



module.exports = {
    recon
}
