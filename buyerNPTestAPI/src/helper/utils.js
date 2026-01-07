const { Duration, DateTime } = require("luxon");

const flatten = items => items.reduce((acc, arr) => [...acc, ...arr], [])

const flatMap = fn => items => flatten(items.map(fn))

/**
 * @param {any} loanInformation
 * @param {string} code
*/
function getLoanDetails(loanInformation, code) {
    try {
        const details = loanInformation.list.find((ele) => ele.descriptor.code === code);

        return details;
    } catch (err) {
        return err;
    }
}

/** function to calculate the settlement amount using buyer finder fee
 * @param {any} payment
 * @param {any} quote
 * @param {[any]} items
 * @returns 
 */
function calculateSettlementAmount(payment, quote, items) {
    try {
        const buyerFinderFee = payment?.tags.find((tag) => tag?.descriptor?.code === "BUYER_FINDER_FEES");

        const type = buyerFinderFee?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
        const percent = buyerFinderFee?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_PERCENTAGE")?.value

        const principalAmount = quote?.breakup?.find((it) => it?.title === "PRINCIPAL");
        const askedAmount = Number(principalAmount?.price?.value);
        const tenure = getLoanDetails(items[0]?.tags[0], "TERM")

        let settlementAmount;
        switch (type) {
            case "percent":
                settlementAmount = askedAmount * Number(percent) * 1 / 100;
                break;
            case "percent-annualized":
                settlementAmount = askedAmount * Number(percent) * Number(tenure?.value.split(" ")[0]) / 12 * 1 / 100;
                break;
            default:
                settlementAmount = 1159;
                break;
        }

        return settlementAmount;
    } catch (err) {
        console.log(err);
        return err;
    }
}


/** function to calculate the settlement amount using buyer finder fee
 * @param {any} payment
 * @param {any} quote
 * @param {[any]} items
 * @returns 
 */
function calculateSettlementAmountForInsurance(payment, quote, items) {
    try {
        const buyerFinderFee = payment?.tags.find((tag) => tag?.descriptor?.code === "BUYER_FINDER_FEES");

        const type = buyerFinderFee?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_TYPE")?.value;
        const percent = buyerFinderFee?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_PERCENTAGE")?.value

        const principalOrBasePrice = quote?.breakup?.find((it) => it?.title === "PRINCIPAL" || it?.title === "BASE_PRICE");
        const amount = Number(principalOrBasePrice?.price?.value);

        const time = items[0]?.time;

        let tenure;
        let duration;
        if (time?.duration) {
            duration = Duration.fromISO(time?.duration);
        } else {
            const start = DateTime.fromISO(time?.range?.start);
            const end = DateTime.fromISO(time?.range?.end);

            const interval = end.diff(start);
            tenure = interval.as('months');
        }

        switch (time?.duration?.charAt(time?.duration?.length - 1)) {
            case 'M':
                tenure = duration['months'];
                break;
            case 'Y':
                tenure = duration['years'] * 12;
            default:
                break;
        }

        let settlementAmount;
        const settlementValue = buyerFinderFee?.list.find((listItem) => listItem?.descriptor?.code === "BUYER_FINDER_FEES_AMOUNT")?.value;
        switch (type) {
            case "percent":
                settlementAmount = amount * Number(percent) * 1 / 100;
                break;
            case "percent-annualized":
                settlementAmount = amount * Number(percent) * Number(tenure) / 12 * 1 / 100;
                break;
            default:
                settlementAmount = settlementValue ? Number(settlementValue) : 1159;
                break;
        }

        return settlementAmount.toFixed(2);
    } catch (err) {
        console.log(err);
        return err;
    }
}


function calculateSettlementAmountMobility(collected_by, quotePrice, buyerFinderFee) {
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
    flatMap,
    calculateSettlementAmount,
    calculateSettlementAmountMobility,
    calculateSettlementAmountForInsurance
}