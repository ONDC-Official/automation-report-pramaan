const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    on_cancel,
    on_status,
    on_update
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


const cancelIndex = {
    on_cancel_one: 0,
    on_cancel_merchant: 0,
    on_cancel_two: 1,
    on_cancel_technical: 0
};

module.exports = function testRunnerMobility_2_0_1(givenTest, logs, type) {
    try {
        let statusIndex = 0;
        let updateIndex = 0;

        const testFunctions = givenTest.flow
            .map((currentStep, index) => {
                let particularLogs;
                const flowId = givenTest?.id;
                const constants = {
                    flow: flowId,
                    type: type,
                    step: currentStep.test,
                    action: currentStep.action
                }
                switch (currentStep.action) {
                    case "on_confirm":
                    case "on_select":
                    case "on_init":
                        particularLogs = logs.find(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    case "on_search":
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

                switch (currentStep?.test) {
                    case "on_search_one":
                        if (particularLogs) {
                            switch (particularLogs?.length) {
                                case 1:
                                    const searchLog = logs?.find((log) => log?.action === "search")?.request;
                                    if (!searchLog?.request?.message?.intent?.fulfillment?.stops) {
                                        const firstOnSearchLog = particularLogs.pop();
                                        return () => on_search(firstOnSearchLog?.request, romanIndex[searchIndex[currentStep.test] + 1], type, logs, constants);
                                    }
                                    break;
                                case 0:
                                    return () => on_search({}, romanIndex[searchIndex[currentStep.test] + 1], type, logs, constants);
                                default:
                                    return () => on_search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], type, logs, constants);
                            }
                        }
                        break;
                    case "on_search_two":
                        if (particularLogs) {
                            switch (particularLogs?.length) {
                                case 1:
                                    const secondSearchLog = logs?.find((log) => log?.action === "search")?.request;
                                    if (secondSearchLog?.request?.message?.intent?.fulfillment?.stops) {
                                        const onSearchLog = particularLogs.pop();
                                        return () => on_search(onSearchLog?.request, romanIndex[searchIndex[currentStep.test] + 1], type, logs, constants);
                                    }
                                    break;
                                case 0:
                                    break;
                                default:
                                    return () => on_search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], type, logs, constants);
                            }
                        }
                        return () => on_search({}, romanIndex[searchIndex[currentStep.test] + 1], type, logs, constants);
                    case "on_select":
                        if (particularLogs?.request)
                            return () => on_select(particularLogs?.request, type, logs, constants);
                        break;
                    case "on_init":
                        if (particularLogs?.request)
                            return () => on_init(particularLogs?.request, type, logs, constants);
                        return () => on_init({}, type, logs, constants);
                    case "on_confirm":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request, type, logs, constants);
                        return () => on_confirm({}, type, logs, constants);
                    case "on_status":
                        if (particularLogs[statusIndex]?.request)
                            return () => on_status(particularLogs[statusIndex++]?.request, logs, type);
                        return () => on_status({});
                    case "on_status_journey_completed":
                        if (particularLogs[statusIndex]?.request)
                            return () => on_status(particularLogs[statusIndex++]?.request, logs, type, "COMPLETED");
                        return () => on_status({});
                    case "on_update":
                        if (particularLogs[updateIndex]?.request)
                            return () => on_update(particularLogs[updateIndex++]?.request, logs, type);
                        return () => on_update({});
                    case "on_cancel_one":
                    case "on_cancel_two":
                    case "on_cancel_merchant":
                    case "on_cancel_technical":
                        if (particularLogs[cancelIndex[currentStep?.test]]?.request)
                            return () => on_cancel(particularLogs[cancelIndex[currentStep.test]]?.request, currentStep?.test, type, logs);
                        return () => on_cancel({}, currentStep.test);
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
