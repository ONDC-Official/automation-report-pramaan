const { expect } = require("chai");
const Mocha = require("mocha");
const { iso8601DurationRegex, urlRegex, isoTime } = require("../utils/constants");
const { calculateSettlementAmount } = require("./commonBussiness");

/** A simple function to get first log of given action
 * 
 * @param {*} logs 
 * @param {string} action 
 * @returns {*}
 */
function firstActionLog(logs, action) {
    try {
        const log = logs?.find((log) => log?.request?.context?.action === action);

        return log?.request;
    } catch (err) {
        console.log(err);
    }
}


/** A simple function to get last log of given action
 * 
 * @param {*} logs 
 * @param {string} action 
 * @returns {*}
 */
function lastActionLog(logs, action) {
    try {
        const log = logs?.filter((log) => log?.request?.context?.action === action);

        return log?.length ? log[log?.length - 1]?.request : false;
    } catch (err) {
        console.log(err);
    }
}


/** This function will generate the tests for the verification of the provider.id
 * 
 */
function providerIdTest(messageTestSuite, { context, message }, logs) {
    try {
        switch (context?.action) {
            case "select":
                const firstOnSearchLog = logs?.find((log) => log?.request?.context?.bpp_id === context?.bpp_id && log?.request?.context?.action === "on_search")

                const provider_ids = firstOnSearchLog?.request?.message?.catalog?.providers?.map((provider) => provider?.id);

                messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.id' should be equal to one of sent in the first 'on_search' call which are ${JSON.stringify(provider_ids)}`, function () {
                    expect(message?.order?.provider?.id).to.exist.and.to.be.oneOf(provider_ids);
                }));
                break;
            case "init":
            case "confirm":
                const selectLog = firstActionLog(logs, 'select');

                if (selectLog) {
                    messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.id' should be equal to the provider_id selected in first 'select' call which is ${selectLog?.message?.order?.provider?.id}`, function () {
                        expect(message?.order?.provider?.id).to.exist.and.to.equal(selectLog?.message?.order?.provider?.id);
                    }));
                } else {
                    const initLog = firstActionLog(logs, 'init');
                    if (initLog) {
                        messageTestSuite.addTest(new Mocha.Test(`'message.order.provider.id' should be equal to the provider_id selected in first 'init' call which is ${initLog?.message?.order?.provider?.id}`, function () {
                            expect(message?.order?.provider?.id).to.exist.and.to.equal(initLog?.message?.order?.provider?.id);
                        }));
                    }
                }
                break;
        }
    } catch (err) {
        console.log(err);
    }
}


/** This function will generate the tests for {givenTag}
 * 
 * @param {*} messageTestSuite 
 * @param {*} message 
 * @param {*} logs 
 */
function paymentsBussinessTestsMobility(messageTestSuite, message, logs) {
    try {
        let paymentIds = [];

        const firstOnInit = firstActionLog(logs, "on_init");
        firstOnInit?.message?.order?.payments?.map((payment) => {
            paymentIds.push(payment?.id);
        });

        // verifying that the payments.id is consumed in subsequent calls
        message?.order?.payments?.forEach((payment, i) => {
            messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${i}].id' should consume 'payments.id' sent in the first 'on_init' call which is '${paymentIds[i]}'`, function () {
                expect(payment?.id).to.exist.and.to.equal(paymentIds[i]);
            }))
        });


    } catch (err) {
        console.log(err);
    }
}

function settlementTermsListTests(messageTestSuite, { context, message }, logs) {
    try {
        const firstSearchLog = firstActionLog(logs, "search");
        let setttlementTerms, buyerFinderFee;
        firstSearchLog?.message?.intent?.payment?.tags?.map((tag) => {
            switch (tag?.descriptor?.code) {
                case "SETTLEMENT_TERMS":
                    setttlementTerms = tag;
                    break;
                case "BUYER_FINDER_FEES":
                    buyerFinderFee = tag;
                    break;
                default:
                    break;
            }
        });


        let staticTerms;
        let delayInterest;

        setttlementTerms?.list?.map((ls) => {
            switch (ls?.descriptor?.code) {
                case "STATIC_TERMS":
                    staticTerms = ls;
                    break;
                case "DELAY_INTEREST":
                    delayInterest = ls;
                    break;
                default:
                    break;
            }
        });

        const firstOnSearchLog = logs?.find((log) => log?.request?.context?.bpp_id === context?.bpp_id && log?.request?.context?.action === "on_search")


        const lastOnSelectLog = lastActionLog(logs, "on_select");
        let total = 0, quotePrice;
        if (!lastOnSelectLog) {
            const onSearchLogs = logs?.filter((log) => log?.request?.context?.bpp_id === context?.bpp_id && log?.request?.context?.action === "on_search");
            const lastOnSearchLog = onSearchLogs.pop();

            message?.order?.items?.map((item) => {
                const providerFromCatalog = lastOnSearchLog?.request?.message?.catalog?.providers?.find((provider) => provider?.id === message?.order?.provider?.id);
                const itemFromCatalog = providerFromCatalog?.items?.find((it) => it?.id === item?.id);

                total += Number(itemFromCatalog?.price?.value) * Number(item?.quantity?.selected?.count);
            });

            quotePrice = total.toFixed(2);
        } else {
            quotePrice = lastOnSelectLog?.message?.order?.quote?.price?.value;
            console.log("quote.price: ", quotePrice);
        }

        let courtJurisdiction, mandatoryArbitration, settlementWindow;

        firstOnSearchLog?.request?.message?.catalog?.providers?.filter((provider) => provider?.id === message?.order?.provider?.id)?.map((provider) => {
            provider?.payments?.map((payment) => {
                payment?.tags?.filter((tag) => tag?.descriptor?.code === "SETTLEMENT_TERMS")?.map((tag) => {
                    tag?.list?.map((ls) => {
                        switch (ls?.descriptor?.code) {
                            case "COURT_JURISDICTION":
                                courtJurisdiction = ls;
                                break;
                            case "MANDATORY_ARBITRATION":
                                mandatoryArbitration = ls;
                                break;
                            case "SETTLEMENT_WINDOW":
                                settlementWindow = ls;
                            default:
                                break;
                        }
                    })
                })
            })
        })

        message?.order?.payments?.map((payment, i) => {
            payment?.tags?.map((tag, j) => {
                if (tag?.descriptor?.code === "BUYER_FINDER_FEES") {
                    messageTestSuite?.addTest(new Mocha.Test(`'message.order.payments[${i}].tags[${j}]' should be equal to the one sent in the search call (BUYER_FINDER_FEES)`, function () {
                        expect(tag).to.exist.and.to.deep.equal(buyerFinderFee);
                    }));
                }

                if (tag?.descriptor?.code === "SETTLEMENT_TERMS") {
                    tag?.list?.map((ls, k) => {
                        switch (ls?.descriptor?.code) {
                            // verify that static terms and delay interest do not fluctuate
                            case "STATIC_TERMS":
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${i}].tags[${j}].list[${k}]' should be equal to the one sent in first search call from buyer (${ls?.descriptor?.code})`, function () {
                                    expect(ls).to.exist.and.to.deep.equal(staticTerms);
                                }));
                                break;
                            case "DELAY_INTEREST":
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${i}].tags[${j}].list[${k}]' should be equal to the one sent in first search call from buyer (${ls?.descriptor?.code})`, function () {
                                    expect(ls).to.exist.and.to.deep.equal(delayInterest);
                                }));
                                break;
                            // check if it is in valid format and is the one sent by the BAP in case of Metro and Bus
                            case "SETTLEMENT_WINDOW":
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${i}].tags[${j}].list[${k}].value' should be in a valid ISO format ${ls?.descriptor?.code}`, function () {
                                    expect(ls?.value).to.exist.and.to.match(iso8601DurationRegex);
                                }));
                                if (payment?.collected_by === "BPP") {
                                    messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${i}].tags[${j}].list[${k}]' should be equal to the one sent in 'on_search' call from seller ${ls?.descriptor?.code}`, function () {
                                        expect(ls).to.exist.and.to.deep.equal(settlementWindow);
                                    }));
                                }
                                break;
                            // verify that these fields are consumed when they are received from seller
                            case "COURT_JURISDICTION":
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${i}].tags[${j}].list[${k}]' should be equal to the one sent in 'on_search' call from seller ${ls?.descriptor?.code}`, function () {
                                    expect(ls).to.exist.and.to.deep.equal(courtJurisdiction);
                                }));
                                break;
                            case "MANDATORY_ARBITRATION":
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${i}].tags[${j}].list[${k}]' should be equal to the one sent in 'on_search' call from seller ${ls?.descriptor?.code}`, function () {
                                    expect(ls).to.exist.and.to.be.deep.equal(mandatoryArbitration);
                                }));
                                break;
                            case "SETTLEMENT_AMOUNT":
                                const settlementAmount = calculateSettlementAmount(payment?.collected_by, quotePrice, buyerFinderFee);
                                const ceilVal = Math.ceil(Number(settlementAmount))
                                const floorVal = Math.floor(Number(settlementAmount))
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${i}].tags[${j}].list[${k}].value' should be equal to one of [${ceilVal.toFixed(2)}, ${floorVal.toFixed(2)}, ${settlementAmount}]`, function () {
                                    expect(ls.value).to.exist.and.to.be.oneOf([ceilVal.toFixed(2), floorVal.toFixed(2), settlementAmount])
                                }));
                                break;
                            default:
                                break;
                        }
                    })
                }
            })
        })

    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    paymentsBussinessTestsMobility,
    providerIdTest,
    settlementTermsListTests,
    firstActionLog,
    lastActionLog
}