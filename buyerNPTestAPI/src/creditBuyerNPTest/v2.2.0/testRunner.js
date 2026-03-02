const {
    search,
    select,
    init,
    confirm,
    status,
    update,
} = require("./index");

const { calculateSettlementAmount } = require("../../helper/utils");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};

const searchIndex = {
    search_one: 0,
    search_two: 1,
    search_three: 2,
    search_four: 3
}
const selectIndex = {
    select_one: 0,
    select_two: 1,
    select_three: 2
};

const initIndex = {
    init_one: 0,
    init_two: 1,
    init_three: 2
};

const updateIndex = {
    update_one: 0,
    update_two: 1,
};

module.exports = function testRunnerV2_2_0(givenTest, logs) {
    try {
        let statusIndex = 0;
        // let updateIndex = 0;
        const testFunctions = givenTest.flow
            .map((currentStep) => {
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
                    case "init":
                    case "update":
                    case "search":
                    case "select":
                    case "status":
                        particularLogs = logs.filter(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    default:
                        break;
                }

                // Generate a unique test_id for each test
                let domain;
                if (Array.isArray(particularLogs)) {
                    domain = particularLogs[0]?.request?.context?.domain;
                } else {
                    domain = particularLogs?.request?.context?.domain;
                }
                const category = givenTest?.type;
                const testCaseId = `id: ${domain}_${category}_${currentStep.action}_message_test_`;
                // let settlementAmount;
                // const finalOfferSelect = logs.filter(log => log.action === "select").pop();
                // switch (currentStep?.test) {
                //     case "init_one":
                //     case "init_two":
                //     case "init_three":
                //         const init_log = logs.filter(log => log.action === "init");
                //         if (init_log.length > 1) {
                //             settlementAmount = calculateSettlementAmount(init_log[initIndex[currentStep.test]]?.request?.message?.order?.payments.find(payment => payment?.tags), finalOfferSelect?.request?.message?.order?.quote, finalOfferSelect?.request?.message?.order?.items)
                //         }
                //         break;
                //     case "confirm":
                //         const init_log_for_confirm = logs.filter(log => log.action === "init");
                //         if (init_log_for_confirm.length > 1) {
                //             settlementAmount = calculateSettlementAmount(init_log_for_confirm[init_log_for_confirm.length - 1]?.request?.message?.order?.payments.find(payment => payment?.tags), finalOfferSelect?.request?.message?.order?.quote, finalOfferSelect?.request?.message?.order?.items)
                //         }
                // }

                let previous_init_payment_id;
                switch (currentStep?.test) {
                    case "init_two":
                    case "init_three":
                        const init_log_for_inits = logs.filter(log => log.action === "init");
                        if (init_log_for_inits.length > 1) {
                            previous_init_payment_id = init_log_for_inits[initIndex[currentStep.test] - 1]?.request?.message?.order?.payments.find(payment => payment?.tags)?.id;
                        }
                    case "confirm":
                        const init_log_for_confirm = logs.filter(log => log.action === "init");
                        if (init_log_for_confirm.length > 1) {
                            previous_init_payment_id = init_log_for_confirm[init_log_for_confirm.length - 1]?.request?.message?.order?.payments.find(payment => payment?.tags)?.id;
                        }
                }

                switch (currentStep.test) {
                    case "search_one":
                    case "search_two":
                    case "search_three":
                    case "search_four":
                        if (particularLogs[searchIndex[currentStep.test]]?.request)
                            return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], testCaseId, logs, constants);
                        return () => search({}, romanIndex[searchIndex[currentStep.test] + 1], testCaseId, logs, constants);
                    case "select_one":
                    case "select_two":
                    case "select_three":
                        if (particularLogs[selectIndex[currentStep.test]]?.request)
                            return () => select(particularLogs[selectIndex[currentStep.test]]?.request, romanIndex[selectIndex[currentStep.test] + 1], testCaseId, logs, constants);
                        return () => select({}, romanIndex[selectIndex[currentStep.test] + 1], testCaseId, logs, constants);
                    case "init_one":
                    case "init_two":
                    case "init_three":
                        if (particularLogs[initIndex[currentStep.test]]?.request)
                            return () => init(particularLogs[initIndex[currentStep.test]]?.request, romanIndex[initIndex[currentStep.test] + 1], previous_init_payment_id, testCaseId, logs, constants);
                        return () => init({}, romanIndex[initIndex[currentStep.test] + 1], testCaseId, logs, constants);
                    case "confirm":
                        if (particularLogs?.request)
                            return () => confirm(particularLogs?.request, previous_init_payment_id, testCaseId, logs, constants);
                        return () => confirm({}, logs, constants);
                    case "status":
                        if (particularLogs[statusIndex]?.request)
                            return () => status(particularLogs[statusIndex++]?.request, testCaseId, logs);
                        return () => status();
                    case "support":
                        if (particularLogs?.request)
                            return () => support(particularLogs?.request, testCaseId, logs);
                        return () => support();
                    case "update_one":
                    case "update_two":
                        if (particularLogs[updateIndex[currentStep.test]]?.request)
                            return () => update(particularLogs[updateIndex[currentStep.test]]?.request, romanIndex[updateIndex[currentStep.test] + 1], testCaseId, logs);
                        return () => update({}, romanIndex[updateIndex[currentStep.test] + 1], testCaseId, logs);
                    default:
                        return null;
                }
            })
            .filter((item) => item != null);

        return testFunctions;
    } catch (err) {
        console.log(err);
        return err;
    }
}


