const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    // on_status,
    // on_support,
    on_cancel
} = require("./index");
// const { calculateSettlementAmount } = require("../helper/utils")
const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};

const searchIndex = {
    on_search: 0,
};

const selectIndex = {
    on_select_one: 0,
    on_select_two: 1,
    on_select_three: 2,
};

const initIndex = {
    on_init: 0,
};

const cancelIndex = {
    on_cancel_soft: 0,
    on_cancel_confirm: 1,
    on_cancel_merchant: 0
}

module.exports = function testRunnerAirline(givenTest, logs, queries) {
    try {
        let statusIndex = 0;
        let updateIndex = 0;
        // console.log(logs);

        // const amount = queries["amount"];

        const testFunctions = givenTest.flow
            .map((currentStep, index) => {
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
                    case "on_confirm":
                    case "on_support":
                        particularLogs = logs.find(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    case "on_search":
                    case "on_select":
                    case "on_init":
                    case "on_update":
                    case "on_status":
                    case "on_cancel":
                        particularLogs = logs.filter(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    default:
                        break;
                }

                // let settlementAmount;
                // const finalOfferSelect = logs.filter(log => log.action === "on_select").pop();
                // switch (currentStep?.test) {
                //     case "on_init":
                //         const init_log = logs.filter(log => log.action === "init");
                //         if (init_log.length > 0) {
                //             settlementAmount = calculateSettlementAmount(init_log[initIndex[currentStep.test]]?.request?.message?.order?.payments.find(payment => payment?.tags), finalOfferSelect?.request?.message?.order?.quote, finalOfferSelect?.request?.message?.order?.items)
                //         }
                //         break;
                //     case "on_confirm":
                //         const init_log_for_confirm = logs.filter(log => log.action === "init");
                //         if (init_log_for_confirm.length > 0) {
                //             settlementAmount = calculateSettlementAmount(init_log_for_confirm[init_log_for_confirm.length - 1]?.request?.message?.order?.payments.find(payment => payment?.tags), finalOfferSelect?.request?.message?.order?.quote, finalOfferSelect?.request?.message?.order?.items)
                //         }
                // }

                const timestampConfirm = logs.filter(log => log.action === 'confirm').pop()?.request?.context?.timestamp;

                switch (currentStep.test) {
                    case "on_search":
                        const search = logs.filter(log => log.action === currentStep.action)[searchIndex[currentStep.test]]
                        if (search?.request)
                            return () => on_search(search?.request, logs, constants);
                        return () => on_search({}, logs, constants);
                    case "on_select_one":
                    case "on_select_two":
                        const select = logs.filter(log => log.action === currentStep.action)[selectIndex[currentStep.test]]
                        if (select?.request)
                            return () => on_select(select?.request, romanIndex[selectIndex[currentStep.test] + 1], logs, constants);
                        return () => on_select({}, romanIndex[selectIndex[currentStep.test] + 1], logs, constants);
                    case "on_init":
                        const init = logs.filter(log => log.action === currentStep.action)[initIndex[currentStep.test]]
                        if (init?.request)
                            return () => on_init(init?.request, logs, constants);
                        return () => on_init({}, logs, constants);
                    case "on_confirm":
                        const confirm = logs.filter(log => log.action === currentStep.action)?.pop();
                        if (confirm?.request)
                            return () => on_confirm(confirm?.request, logs, constants);
                        return () => on_confirm({}, logs, constants);
                    case "on_cancel_soft":
                    case "on_cancel_confirm":
                    case "on_cancel_merchant":
                        if (particularLogs[cancelIndex[currentStep.test]]?.request)
                            return () => on_cancel(particularLogs[cancelIndex[currentStep.test]]?.request, constants);
                        return () => on_cancel({}, constants);
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