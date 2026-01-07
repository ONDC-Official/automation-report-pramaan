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
};

const selectIndex = {
    on_select: 0,
    on_select_one: 0,
    on_select_two: 1,
    on_select_three: 2,
    on_select_four: 3,
};

module.exports = function testRunnerInvestment(givenTest, logs, type) {
    try {
        const flowId = givenTest?.id;
        let statusIndex
        switch (flowId) {
            case "INVESTMENT_2":
                statusIndex = 2
                break;
            default:
                statusIndex = 0;
                break;
        }
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
                    case "on_confirm":
                    case "on_init":
                    case "on_search":
                    case "on_cancel":
                        particularLogs = logs.find(
                            (log) => log.action === currentStep.action
                        );
                        break;
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
                            return () => on_search(particularLogs?.request, logs,constants);
                        return () => on_search({}, logs,constants);
                    case "on_select_one":
                    case "on_select_two":
                    case "on_select_three":
                    case "on_select_four":
                        if (particularLogs[selectIndex[currentStep?.test]])
                            return () => on_select(particularLogs[selectIndex[currentStep?.test]]?.request, romanIndex[selectIndex[currentStep?.test] + 1],  flowId,logs,constants);
                        return () => on_select({}, romanIndex[selectIndex[currentStep.test] + 1],  flowId,logs,constants);
                    case "on_init":
                        if (particularLogs?.request)
                            return () => on_init(particularLogs?.request,  flowId,logs,constants);
                        return () => on_init({}, flowId,logs,constants);
                    case "on_confirm":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request,  flowId,logs,constants);
                        return () => on_confirm({}, flowId,logs,constants);
                    case "on_update_one":
                    case "on_update_two":
                    case "on_update_three":
                        if (particularLogs[updateIndex]?.request)
                            return () => on_update(particularLogs[updateIndex++]?.request, logs, flowId);
                        return () => on_update({}, flowId);
                    case "on_status":
                        if (particularLogs[statusIndex]?.request)
                            return () => on_status(particularLogs[statusIndex++]?.request, logs, flowId);
                        return () => on_status({}, logs, flowId);
                    case "on_cancel":
                        if (particularLogs?.request)
                            return () => on_cancel(particularLogs?.request, logs, flowId);
                        return () => on_cancel({}, flowId);
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
