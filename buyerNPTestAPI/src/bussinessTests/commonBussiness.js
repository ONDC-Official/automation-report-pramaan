const Mocha = require("mocha");
const { expect } = require("chai");

/** This function tests for message_id and timestamps to be proper and transaction_id to 
 *  be same for the subsequent calls
 *  
 * @param {*} contextTestSuite 
 * @param {*} context 
 * @param {*} message 
 */
function contextBussinessTests(contextTestSuite, context, logs, constants) {
    try {

        const flowId = constants?.flow;

        // test --> message Id should be unique
        const messageIdsMap = new Map();
        logs?.map((log) => {
            const message_id = log?.request.context.message_id
            if (!log?.request?.context?.action.startsWith("on_")) {
                if (messageIdsMap.has(message_id)) {
                    messageIdsMap.set(message_id, messageIdsMap.get(message_id) + 1);
                } else {
                    messageIdsMap.set(message_id, 1);
                }
            }
        });

        if (flowId !== "RET_10") {

            contextTestSuite.addTest(new Mocha.Test(`'context.message_id' should be unique for each call lifecycle`, function () {
                expect(messageIdsMap.get(context?.message_id)).to.be.at.most(1);
            }))
        }
        // timestamp should be increasing than the previous one
        let index = 0;
        while (index < logs.length) {
            if (context?.message_id === logs[index]?.request?.context?.message_id)
                break;
            index++;
        }

        if (index !== 0) {
            const currentRequestTimestamp = new Date(context?.timestamp);
            const previousRequestTimestamp = new Date(logs[index - 1]?.request?.context?.timestamp);

            if (logs[index]?.request) {
                contextTestSuite.addTest(new Mocha.Test(`'context.timestamp' should be greater than the timestamp of the previous request`, function () {
                    expect(previousRequestTimestamp).to.be.below(currentRequestTimestamp);
                }))
            }
        }

        // bap_id, bap_uri and bpp_uri and bpp_id should not change throughout the journey
        const bap_id = logs[0]?.request?.context?.bap_id
        const bap_uri = logs[0]?.request?.context?.bap_uri
        const bpp_id = logs[1]?.request?.context?.bpp_id
        const bpp_uri = logs[1]?.request?.context?.bpp_uri

        if (index !== 0) {
            contextTestSuite.addTest(new Mocha.Test(`'context.bap_id' should be same as send in the first search call`, function () {
                expect(context.bap_id).to.equal(bap_id);
            }))

            contextTestSuite.addTest(new Mocha.Test(`'context.bap_uri' should be same as send in the first search call`, function () {
                expect(context.bap_uri).to.equal(bap_uri);
            }))
        }

        if (context?.action !== "search") {
            contextTestSuite.addTest(new Mocha.Test(`'context.bpp_id' should be same as received in the first on_search call`, function () {
                expect(context.bpp_id).to.equal(bpp_id);
            }))

            contextTestSuite.addTest(new Mocha.Test(`'context.bpp_uri' should be same as received in the first on_search call`, function () {
                expect(context.bpp_uri).to.equal(bpp_uri);
            }))
        }
    } catch (err) {
        console.log(err);
    }
}


/** this function calculates the settlement amount for mobility domain
 * @param {string} collected_by
 * @param {string} quotePrice
 * @param {any} buyerFinderFee
 * 
 * @returns {string}
 */
function calculateSettlementAmount(collected_by, quotePrice, buyerFinderFee) {
    try {
        const type = buyerFinderFee?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;

        let buyerFinderFeeVal;
        switch (type) {
            case 'amount':
                const amount = buyerFinderFee?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_AMOUNT")?.value;
                buyerFinderFeeVal = Number(amount);
                break;
            default:
                const percent = buyerFinderFee?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_PERCENTAGE")?.value;
                buyerFinderFeeVal = Number(quotePrice) * Number(percent) * 1 / 100;
                break;
        }

        let settlementAmount;
        switch (collected_by) {
            case "BPP":
                settlementAmount = buyerFinderFeeVal;
                break;
            case "BAP":
                settlementAmount = Number(quotePrice) - buyerFinderFeeVal;
                break;
            default:
                break;
        }

        return settlementAmount.toFixed(2);
    } catch (err) {
        console.log(err);
        return err;
    }
}


module.exports = {
    contextBussinessTests,
    calculateSettlementAmount
}