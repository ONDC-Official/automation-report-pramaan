const {
    search,
    select,
    init,
    confirm,
    cancel,
    status
} = require("./index");


const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X"
};


const searchIndex = {
    search: 0,
    search_one: 0,
    search_two: 1,
    search_three: 2
}

const cancelIndex = {
    cancel_one: 0,
    cancel_two: 1,
    cancel_technical: 0
}

module.exports = function testRunnerUnreservedMobility(givenTest, logs) {
    try {
        let statusIndex = 0;

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
                case "select":
                case "init":
                    particularLogs = logs.find((log) => log.action === currentStep.action);
                    break;
                case "search":
                case "update":
                case "status":
                case "cancel":
                    particularLogs = logs.filter((log) => log.action === currentStep.action);
                    break;
                default:
                    break;
            }
            switch (currentStep.test) {
                case "search_one":
                    if (particularLogs) {
                        switch (particularLogs.length) {
                            case 1:
                                const firstSearchLog = particularLogs.pop();
                                if (!firstSearchLog?.request?.message?.intent?.fulfillment?.stops) {
                                    return () => search(firstSearchLog?.request, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                                }
                                break;
                            case 0:
                                return () => search({}, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                            default:
                                return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                        }
                    }
                    break;
                case "search_two":
                    if (particularLogs) {
                        switch (particularLogs.length) {
                            case 1:
                                const searchLog = particularLogs.pop();
                                if (searchLog?.request?.message?.intent?.fulfillment?.stops) {
                                    return () => search(searchLog?.request, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                                }
                                break;
                            case 0:
                                break;
                            default:
                                return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                        }
                    }
                    return () => search({}, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                case "select":
                    if (particularLogs?.request)
                        return () => select(particularLogs?.request, logs, constants);
                    break;
                case "init":
                    if (particularLogs?.request)
                        return () => init(particularLogs?.request, logs, constants);
                    return () => init({}, logs, constants);
                case "confirm":
                    if (particularLogs?.request)
                        return () => confirm(particularLogs?.request, logs, constants);
                    return () => confirm({}, logs, constants);
                case "status":
                    if (particularLogs[statusIndex]?.request)
                        return () => status(particularLogs[statusIndex++]?.request, romanIndex[statusIndex], logs);
                    return () => status({});
                case "cancel_one":
                case "cancel_two":
                case "cancel_technical":
                    if (particularLogs[cancelIndex[currentStep.test]]?.request)
                        return () => cancel(particularLogs[cancelIndex[currentStep.test]]?.request, currentStep?.test, logs);
                    return () => cancel({}, currentStep?.test, logs);
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


