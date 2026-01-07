const {
    search,
    select,
    init,
    confirm,
    cancel
} = require("./index");

const { calculateSettlementAmountForInsurance } = require("../helper/utils");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};

const searchIndex = {
    search: 0,
    search_one: 0,
    search_two: 1,
    search_three: 2
}

const selectIndex = {
    select: 0,
    select_one: 0,
    select_two: 1,
    select_three: 2,
};

const initIndex = {
    init_one: 0,
    init_two: 1,
    init_three: 2,
    init_four: 3,
};

module.exports = function testRunnerINS(givenTest, logs, category = "") {
    try {
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

            let settlementAmount;
            const finalOfferSelect = logs.filter(log => log.action === "on_select").pop();
            switch (currentStep?.test) {
                case "init_one":
                case "init_two":
                case "init_three":
                case "init_four":
                    const init_log = logs.filter(log => log.action === "init");
                    if (init_log.length > 1) {
                        settlementAmount = calculateSettlementAmountForInsurance(init_log[initIndex[currentStep.test]]?.request?.message?.order?.payments.find(payment => payment?.tags), finalOfferSelect?.request?.message?.order?.quote, finalOfferSelect?.request?.message?.order?.items)
                    }
                    break;
                case "confirm":
                    const init_log_for_confirm = logs.filter(log => log.action === "init");
                    if (init_log_for_confirm.length > 1) {
                        settlementAmount = calculateSettlementAmountForInsurance(init_log_for_confirm[init_log_for_confirm.length - 1]?.request?.message?.order?.payments.find(payment => payment?.tags), finalOfferSelect?.request?.message?.order?.quote, finalOfferSelect?.request?.message?.order?.items)
                    }
            }

            let previous_on_init_payment_id;
            switch (currentStep?.test) {
                case "init_one":
                    break;
                case "init_two":
                case "init_three":
                case "init_four":
                    const on_init_log_for_inits = logs.filter(log => log.action === "on_init");
                    if (on_init_log_for_inits.length > 1) {
                        previous_on_init_payment_id = on_init_log_for_inits[initIndex[currentStep.test] - 1]?.request?.message?.order?.payments.find(payment => payment?.tags)?.id;
                    }
                    break;
                case "confirm":
                    const on_init_log_for_confirm = logs.filter(log => log.action === "on_init");
                    if (on_init_log_for_confirm.length > 1) {
                        previous_on_init_payment_id = on_init_log_for_confirm[on_init_log_for_confirm.length - 1]?.request?.message?.order?.payments.find(payment => payment?.tags)?.id;
                    }
            }

            switch (currentStep.test) {
                case "search_one":
                case "search_two":
                case "search_three":
                    if (particularLogs[searchIndex[currentStep.test]]?.request)
                        return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                    return () => search({}, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                case "select_one":
                case "select_two":
                case "select_three":
                    if (particularLogs[selectIndex[currentStep.test]]?.request)
                        return () => select(particularLogs[selectIndex[currentStep.test]]?.request, { category, step: romanIndex[selectIndex[currentStep.test] + 1] }, logs, constants);
                    return () => select({}, romanIndex[selectIndex[currentStep.test] + 1], { category, step: romanIndex[selectIndex[currentStep.test] + 1] }, logs, constants);
                case "init_one":
                case "init_two":
                case "init_three":
                case "init_four":
                    if (particularLogs[initIndex[currentStep.test]]?.request)
                        return () => init(particularLogs[initIndex[currentStep.test]]?.request, { category, step: romanIndex[initIndex[currentStep.test] + 1], settlementAmount, previous_on_init_payment_id }, logs, constants);
                    return () => init({}, romanIndex[initIndex[currentStep.test] + 1], { category, step: romanIndex[initIndex[currentStep.test] + 1], settlementAmount, previous_on_init_payment_id }, logs, constants);
                case "confirm":
                    if (particularLogs?.request)
                        return () => confirm(particularLogs?.request, { category, settlementAmount, previous_on_init_payment_id }, logs, constants);
                    return () => confirm({}, { category, settlementAmount, previous_on_init_payment_id }, logs, constants);
                case "cancel":
                    if (particularLogs?.request)
                        return () => cancel(particularLogs?.request, { category });
                    return () => cancel({}, { category });
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


