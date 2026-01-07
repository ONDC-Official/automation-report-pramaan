const {
    search,
    select,
    init,
    confirm,
    update,
    cancel
} = require("./index");


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
}

const selectIndex = {
    select: 0,
    select_one: 0,
    select_two: 1,
    select_three: 2,
    select_four: 3
};

const initIndex = {
    init: 0,
};

module.exports = function testRunnerInvestment(givenTest, logs) {
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
                case "init":
                case "cancel":
                case "search":
                case "update":
                    particularLogs = logs.find((log) => log.action === currentStep.action);
                    break;
                case "select":
                case "status":
                    particularLogs = logs.filter((log) => log.action === currentStep.action);
                    break;
                default:
                    break;
            }


            let domain;
            if (Array.isArray(particularLogs)) {
                domain = particularLogs[0]?.request?.context?.domain;
            } else {
                domain = particularLogs?.request?.context?.domain;
            }
            const category = givenTest?.type;
            const testCaseId = `id: ${domain}_${category}_${currentStep.action}_message_test_`;

            switch (currentStep.test) {
                case "search":
                    if (particularLogs?.request)
                        return () => search(particularLogs?.request, testCaseId);
                    return () => search({});
                case "select_one":
                case "select_two":
                case "select_three":
                case "select_four":
                    if (particularLogs[selectIndex[currentStep.test]]?.request)
                        return () => select(particularLogs[selectIndex[currentStep.test]]?.request, romanIndex[selectIndex[currentStep.test] + 1], testCaseId, flowId, logs, constants);
                    return () => select({}, romanIndex[selectIndex[currentStep.test] + 1], flowId, logs, constants);
                case "init":
                    if (particularLogs?.request)
                        return () => init(particularLogs?.request, testCaseId, flowId, logs, constants);
                    return () => init({}, flowId, logs, constants);
                case "confirm":
                    if (particularLogs?.request)
                        return () => confirm(particularLogs?.request, testCaseId, flowId, logs, constants);
                    return () => confirm({}, testCaseId, flowId, logs, constants);
                case "update":
                    if (particularLogs?.request)
                        return () => update(particularLogs?.request, testCaseId, flowId);
                    return () => update({}, testCaseId, flowId);
                case "cancel":
                    if (particularLogs?.request)
                        return () => cancel(particularLogs?.request, testCaseId);
                    return () => cancel();
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


