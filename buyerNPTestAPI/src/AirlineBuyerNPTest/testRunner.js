const { search, select, init, confirm, cancel } = require("./index");
const { calculateSettlementAmount, calculateSettlementAmountMobility } = require("../helper/utils");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};

const searchIndex = {
    search: 0,
    search_two: 1,
};

const selectIndex = {
    select_one: 0,
    select_two: 1,
    search_three: 2,
};

const initIndex = {
    init: 0,
};

const cancelIndex = {
    cancel_soft: 0,
    cancel_confirm: 1
}

module.exports = function testRunnerAirline(givenTest, logs) {
    try {
        let category;
        const searchLog = logs.find(log => log.action === 'search');
        category = searchLog?.request?.message?.intent?.category?.descriptor?.code;
        const buyerFinderFee = searchLog?.request?.message?.intent?.payment?.tags?.find((tag) => tag.descriptor.code === "BUYER_FINDER_FEES");

        const finalOfferSelect = logs.filter(log => log.action === "on_select").pop();
        const quotePriceValue = finalOfferSelect?.request?.message?.order?.quote?.price?.value;

        let settlementAmount;
        if (finalOfferSelect) {
            settlementAmount = calculateSettlementAmountMobility("BAP", quotePriceValue, buyerFinderFee);
            console.log("settlement amount calculated : ", settlementAmount);
        }

        const testFunctions = givenTest.flow.map((currentStep) => {
            let particularLogs;
            const type = givenTest?.type;
            const flowId = givenTest?.id;
            const constants = {
                flow: flowId,
                type: type,
                step: currentStep.test,
                action: currentStep.action
            }
            switch (currentStep.action) {
                case "confirm":
                case "support":
                case "cancel":
                    particularLogs = logs.find((log) => log.action === currentStep.action);
                    break;
                case "search":
                case "select":
                case "init":
                case "update":
                case "status":
                    particularLogs = logs.filter((log) => log.action === currentStep.action);
                    break;
                default:
                    break;
            }

            switch (currentStep.test) {
                case "search":
                    if (particularLogs[searchIndex[currentStep.test]]?.request)
                        return () => search(particularLogs[searchIndex[currentStep.test]]?.request);
                    return () => search({}, logs, constants);
                case "select_one":
                case "select_two":
                    if (particularLogs[selectIndex[currentStep.test]]?.request)
                        return () => select(particularLogs[selectIndex[currentStep.test]]?.request, romanIndex[selectIndex[currentStep.test] + 1], logs, constants);
                    return () => select({}, romanIndex[selectIndex[currentStep.test] + 1], logs, constants);
                case "init":
                    if (particularLogs[initIndex[currentStep.test]]?.request)
                        return () => init(particularLogs[initIndex[currentStep.test]]?.request, category, settlementAmount, logs, constants);
                    return () => init({}, category, settlementAmount, logs, constants);
                case "confirm":
                    if (particularLogs?.request)
                        return () => confirm(particularLogs?.request, category, settlementAmount, logs, constants);
                    return () => confirm({}, category, settlementAmount, logs, constants);
                case "cancel_soft":
                case "cancel_confirm":
                    if (particularLogs?.request[cancelIndex[currentStep.test]]?.request)
                        return () => cancel(particularLogs?.request[cancelIndex[currentStep.test]]?.request, logs, constants);
                    return () => cancel({}, logs, constants);
                default:
                    return null;
            }
        }).filter((item) => item != null);

        return testFunctions;
    } catch (err) {
        console.log(err);
        return err;
    }
}
