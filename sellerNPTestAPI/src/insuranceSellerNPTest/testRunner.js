const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    on_update_fulfillment,
    on_status,
    on_cancel
} = require("./index");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};

const searchIndex = {
    on_search_one: 0,
    on_search_two: 1,
    on_search_three: 2,
};

const selectIndex = {
    on_select_one: 0,
    on_select_two: 1,
    on_select_three: 2,
};

const initIndex = {
    on_init_one: 0,
    on_init_two: 1,
    on_init_three: 2,
    on_init_four: 3,
};

const updateIndex = {
    on_update_fulfillment_one: 0,
    on_update_fulfillment_two: 1,
    on_update_fulfillment_three: 2,

};

module.exports = function testRunnerINS(givenTest, logs, descriptor) {
    try {
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
                    case "on_search":
                    case "on_confirm":
                    case "on_support":
                    case "on_cancel":
                        particularLogs = logs.find(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    case "on_select":
                    case "on_init":
                    case "on_update":
                    case "on_status":
                        particularLogs = logs.filter(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    default:
                        break;
                }

                let timestampConfirm = logs.filter(log => log.action === 'confirm').pop()?.request?.context?.timestamp;
                if (!timestampConfirm) {
                    timestampConfirm = new Date();
                }
                switch (currentStep.test) {
                    case "on_search_one":
                    case "on_search_two":
                    case "on_search_three":
                        const search = logs.filter(log => log.action === currentStep.action)?.[searchIndex[currentStep.test]];
                        if (search?.request)
                            return () => on_search(search?.request, romanIndex[searchIndex[currentStep.test] + 1], logs,constants);
                        return () => on_search({}, romanIndex[searchIndex[currentStep.test] + 1], logs,constants);
                    case "on_select_one":
                    case "on_select_two":
                    case "on_select_three":
                        const select = logs.filter(log => log.action === currentStep.action)?.[selectIndex[currentStep.test]]
                        if (select?.request)
                            return () => on_select(select?.request, romanIndex[selectIndex[currentStep.test] + 1], descriptor, logs,constants);
                        return () => on_select({}, romanIndex[selectIndex[currentStep.test] + 1], descriptor, logs,constants);
                    case "on_init_one":
                    case "on_init_two":
                    case "on_init_three":
                    case "on_init_four":
                        const init = logs.filter(log => log.action === currentStep.action)?.[initIndex[currentStep.test]]
                        if (init?.request)
                            return () => on_init(init?.request, romanIndex[initIndex[currentStep.test] + 1], descriptor, logs,constants);
                        return () => on_init({}, romanIndex[initIndex[currentStep.test] + 1], descriptor, logs,constants);
                    case "on_confirm":
                        const confirm = logs.filter(log => log.action === currentStep.action)?.pop();
                        if (confirm?.request)
                            return () => on_confirm(confirm?.request, descriptor, logs,constants);
                        return () => on_confirm({}, descriptor, logs,constants);
                    // case "on_status":
                    //     const afterConfirm = logs.find(log => new Date(log?.request?.context?.timestamp) >= new Date(timestampConfirm) && log?.request?.context?.action === "on_status" && ['SANCTIONED'].includes(log?.request?.message?.order?.fulfillments?.[0]?.state?.descriptor?.code))

                    //     if (afterConfirm) {
                    //         return () => on_status(afterConfirm?.request, givenTest.flow[index].test);
                    //     }
                    //     return () => on_status({}, givenTest.flow[index - 1].action);
                    case "on_support":
                        if (particularLogs?.request)
                            return () => on_support(particularLogs.request);
                        return () => on_support();
                    case "on_update_fulfillment_one":
                    case "on_update_fulfillment_two":
                    case "on_update_fulfillment_three":
                        // if (particularLogs[updateIndex]?.request)
                        //     return () => on_update_fulfillment(particularLogs[updateIndex++]?.request);
                        // return () => on_update_fulfillment();
                        const update = logs.filter(log => log.action === currentStep.action)?.[updateIndex[currentStep.test]]
                        if (update?.request)
                            return () => on_update_fulfillment(update?.request, romanIndex[updateIndex[currentStep.test] + 1], descriptor);
                        return () => on_update_fulfillment({}, romanIndex[updateIndex[currentStep.test] + 1], descriptor);
                    case "on_status":
                        const status = logs.filter(log => log.action === currentStep.action)?.pop();
                        if (status?.request)
                            return () => on_status(status?.request, descriptor);
                        return () => on_status({}, descriptor);
                    case "on_cancel":
                        const cancel = logs.filter(log => log.action === currentStep.action)?.pop();
                        if (cancel?.request)
                            return () => on_cancel(cancel?.request, descriptor);
                        return () => on_cancel({}, descriptor);
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
