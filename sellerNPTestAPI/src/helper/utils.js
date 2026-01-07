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
                settlementAmount = askedAmount * Number(percent) * Number(tenure?.value.split(" ")[0])/12 * 1 / 100;
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

module.exports = {
    flatMap,
    calculateSettlementAmount
}