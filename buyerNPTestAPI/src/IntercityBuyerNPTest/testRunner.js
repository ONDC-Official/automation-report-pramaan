const {
    search,
    select,
    init,
    confirm,
    cancel,
} = require("./index");

const { calculateSettlementAmount, calculateSettlementAmountMobility } = require("../helper/utils");



const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};

const searchIndex = {
    search_one: 0,
    search_two: 1,
    search_three: 2
}

const selectIndex = {
    select_one: 0,
    select_two: 1
};

const initIndex = {
    init: 0,
};

const cancelIndex = {
    cancel_one: 0,
    cancel_two: 1
};

module.exports = function testRunnerIntercity(givenTest, logs) {
    try {
        const searchLog = logs?.find((log) => log?.action === "search");
        const buyerFinderFee = searchLog?.request?.message?.intent?.payment?.tags?.find((tag) => tag.descriptor.code === "BUYER_FINDER_FEES");

        const finalOfferSelect = logs.filter(log => log.action === "on_select");
        const quotePriceValue = finalOfferSelect[finalOfferSelect?.length - 1]?.request?.message?.order?.quote?.price?.value;

        const init_log = logs.filter(log => log.action === "init");
        const collected_by = init_log[init_log?.length - 1]?.request?.message?.order?.payments?.find((payment) => payment?.tags)?.collected_by;

        let settlementAmount;
        if (finalOfferSelect) {
            settlementAmount = calculateSettlementAmountMobility(collected_by, quotePriceValue, buyerFinderFee);
        }

        // Create test functions based on the given test flow
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
                    particularLogs = logs.find((log) => log.action === currentStep.action);
                    break;
                case "cancel":
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
                case "search_one":
                case "search_two":
                case "search_three":
                    if (particularLogs[searchIndex[currentStep.test]]?.request)
                        return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1],logs,constants);
                    return () => search({}, romanIndex[searchIndex[currentStep.test] + 1],logs,constants);
                case "select_one":
                case "select_two":
                    if (particularLogs[selectIndex[currentStep.test]]?.request)
                        return () => select(particularLogs[selectIndex[currentStep.test]]?.request, romanIndex[selectIndex[currentStep.test] + 1],logs,constants);
                    return () => select({}, romanIndex[selectIndex[currentStep.test] + 1],logs,constants);
                case "init":
                    if (particularLogs[initIndex[currentStep.test]]?.request)
                        return () => init(particularLogs[initIndex[currentStep.test]]?.request, romanIndex[initIndex[currentStep.test] + 1], settlementAmount, logs,constants);
                    return () => init({}, romanIndex[initIndex[currentStep.test] + 1], settlementAmount, logs,constants);
                case "confirm":
                    if (particularLogs?.request)
                        return () => confirm(particularLogs?.request, settlementAmount,logs,constants);
                    return () => confirm({}, settlementAmount,logs,constants);
                case "cancel_one":
                case "cancel_two":
                    if (particularLogs[cancelIndex[currentStep.test]]?.request)
                        return () => cancel(particularLogs[cancelIndex[currentStep.test]]?.request, romanIndex[cancelIndex[currentStep.test] + 1]);
                    return () => cancel({}, romanIndex[cancelIndex[currentStep.test] + 1]);
                case "update":
                    if (particularLogs?.request)
                        return () => update(particularLogs?.request, settlementAmount);
                    return () => update({}, settlementAmount);
                default:
                    return null;
            }
        }).filter((item) => item != null);

        return testFunctions;
    } catch (error) {
        console.log(error);
        return error;
    }
}


