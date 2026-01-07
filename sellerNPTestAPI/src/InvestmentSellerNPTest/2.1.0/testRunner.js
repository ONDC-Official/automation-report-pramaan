const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    on_status,
    on_update,
    on_cancel
} = require("./index");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
};

const selectIndex = {
    on_select: 0,
    on_select_one: 0,
    on_select_two: 1,
    on_select_three: 2,
    on_select_four: 3,
};

const updateIndex = {
    on_update_one: 0,
    on_update_two: 1,
    on_update_three: 2,
    on_update_four: 3,
    on_update_five: 4,
};
const confirmIndex = {
    on_confirm: 0,
    on_confirm_two: 1
};
const initIndex = {
    on_init: 0
};
const statusIndex = {
    on_status: 0,
    on_status_two: 1
};

module.exports = function testRunnerInvestment_2_1_0(givenTest, logs, type) {
    try {
        const flowId = givenTest?.id;

        const testFunctions = givenTest.flow
            .map((currentStep, index) => {
                const step = currentStep?.test;
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
                    case "on_cancel":
                        particularLogs = logs.find(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    case "on_init":
                    case "on_confirm":
                    case "on_update":
                    case "on_select":
                    case "on_status":
                        particularLogs = logs.filter(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    default:
                        break;
                }

                switch (currentStep?.test) {
                    case "on_search":
                        if (particularLogs?.request)
                            return () => on_search(particularLogs?.request, logs, constants);
                        return () => on_search({}, logs, constants);
                    case "on_select_one":
                    case "on_select_two":
                    case "on_select_three":
                    case "on_select_four":
                        if (particularLogs[selectIndex[currentStep?.test]])
                            return () => on_select(particularLogs[selectIndex[currentStep?.test]]?.request, romanIndex[selectIndex[currentStep?.test] + 1], flowId, logs, constants);
                        return () => on_select({}, romanIndex[selectIndex[currentStep.test] + 1], flowId, logs, constants);
                    case "on_init":
                        if (particularLogs[initIndex[currentStep?.test]])
                            return () => on_init(particularLogs[initIndex[currentStep?.test]]?.request, romanIndex[initIndex[currentStep?.test] + 1], flowId, logs, constants);
                        return () => on_init({}, romanIndex[initIndex[currentStep.test] + 1], flowId, logs, constants);
                    case "on_confirm":
                    case "on_confirm_two":
                        if (particularLogs[confirmIndex[currentStep?.test]])
                            return () => on_confirm(particularLogs[confirmIndex[currentStep?.test]]?.request, romanIndex[confirmIndex[currentStep?.test] + 1], flowId, logs, constants);
                        return () => on_confirm({}, romanIndex[confirmIndex[currentStep.test] + 1], flowId, logs, constants);
                    case "on_update_one":
                    case "on_update_two":
                    case "on_update_three":
                    case "on_update_four":
                    case "on_update_five":
                        if (particularLogs[updateIndex[currentStep?.test]])
                            return () => on_update(particularLogs[updateIndex[currentStep?.test]]?.request, romanIndex[updateIndex[currentStep?.test] + 1], logs, flowId);
                        return () => on_update({}, romanIndex[updateIndex[currentStep.test] + 1], logs, flowId);

                    case "on_status":
                    case "on_status_two":
                        if (particularLogs[statusIndex[currentStep?.test]])
                            return () => on_status(particularLogs[statusIndex[currentStep?.test]]?.request, romanIndex[statusIndex[currentStep?.test] + 1], logs, flowId);
                        return () => on_status({}, romanIndex[statusIndex[currentStep.test] + 1], logs, flowId);
                    case "on_cancel":
                        if (particularLogs?.request)
                            return () => on_cancel(particularLogs?.request, step, flowId, logs);
                        return () => on_cancel({}, step, flowId, logs);
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
