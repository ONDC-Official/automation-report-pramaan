const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    on_cancel,
    on_update,
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
};
const cancelIndex = {
    on_cancel_one: 0,
    on_cancel_merchant: 0,
    on_cancel_two: 1,
};

const initIndex = {
    on_init: 0,
};
const confirmIndex = {
    on_confirm: 0,
};
const updateIndex = {
    on_update: 0,
};

module.exports = function testRunnerIntercity(givenTest, logs, queries) {
    try {
        let statusIndex = 0;
        let updateIndex = 0;

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

                switch (currentStep.test) {
                    case "on_search_one":
                    case "on_search_two":
                    case "on_search_three":
                        const search = logs.filter(log => log.action === currentStep.action)[searchIndex[currentStep.test]]
                        if (search?.request)
                            return () => on_search(search?.request, romanIndex[searchIndex[currentStep.test] + 1],logs,constants);
                        return () => on_search({}, romanIndex[searchIndex[currentStep.test] + 1],logs,constants);
                    case "on_select_one":
                    case "on_select_two":
                        const select = logs.filter(log => log.action === currentStep.action)[selectIndex[currentStep.test]]
                        if (select?.request)
                            return () => on_select(select?.request, romanIndex[selectIndex[currentStep.test] + 1],logs,constants);
                        return () => on_select({}, romanIndex[selectIndex[currentStep.test] + 1],logs,constants);
                    case "on_init":
                        const init = logs.filter(log => log.action === currentStep.action)[initIndex[currentStep.test]]
                        if (init?.request)
                            return () => on_init(init?.request,logs,constants);
                        return () => on_init({},logs,constants);
                    case "on_confirm":
                        const confirm = logs.filter(log => log.action === currentStep.action)[confirmIndex[currentStep.test]]
                        if (confirm?.request)
                            return () => on_confirm(confirm?.request,logs,constants);
                        return () => on_confirm({},logs,constants);
                    case "on_cancel_one":
                    case "on_cancel_two":
                    case "on_cancel_merchant":
                        const cancel = logs.filter(log => log.action === currentStep.action)[cancelIndex[currentStep.test]]
                        if (cancel?.request)
                            return () => on_cancel(cancel?.request, romanIndex[cancelIndex[currentStep.test] + 1]);
                        return () => on_cancel({}, romanIndex[cancelIndex[currentStep.test] + 1]);
                    case "on_update":
                        const update = logs.filter(log => log.action === currentStep.action)[updateIndex[currentStep.test]]
                        if (update?.request)
                            return () => on_update(update?.request);
                        return () => on_update({});
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