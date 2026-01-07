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

function settlementTermsListTests(messageTestSuite, { context, message }, logs) {
    try {
        const firstInitLog = firstActionLog(logs, "on_init");
        let setttlementTerms, buyerFinderFee;
        firstInitLog?.message?.order?.payments?.find((payment) => payment?.tags)?.tags?.map((tag) => {
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

        const lastOnSelectLog = lastActionLog(logs, "on_select");
        const quotePrice = lastOnSelectLog?.message?.order?.quote?.price?.value;

        message?.order?.payments?.map((payment, i) => {
            payment?.tags?.map((tag, j) => {
                if (tag?.descriptor?.code === "SETTLEMENT_TERMS") {
                    tag?.list?.map((ls, k) => {
                        switch (ls?.descriptor?.code) {
                            case "SETTLEMENT_AMOUNT":
                                const settlementAmount = calculateSettlementAmount(payment?.collected_by, quotePrice, buyerFinderFee);
                                const ceilVal = Math.ceil(Number(settlementAmount))
                                const floorVal = Math.floor(Number(settlementAmount))
                                messageTestSuite.addTest(new Mocha.Test(`'message.order.payments[${i}].tags[${j}].list[${k}].value' (SETTLEMENT_AMOUNT) should be equal to one of ["${Math.floor(settlementAmount)}", "${Math.ceil(settlementAmount)}", "${settlementAmount}"]`, function () {
                                    expect(ls.value).to.exist.and.to.be.oneOf([ceilVal.toString(), floorVal.toString(), settlementAmount])
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
    settlementTermsListTests,
    lastActionLog
}