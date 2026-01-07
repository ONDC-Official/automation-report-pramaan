const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    on_update
} = require("./index");


const searchIndex = {
    on_search_one: 0,
    on_search_two: 1,
    on_search_three: 2,
};

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};


module.exports = function testRunnerSachetInsurance(givenTest, logs) {
    try {
        const category = (logs?.find((log) => log?.action === "search") ?? {})?.request?.message?.intent?.category?.descriptor?.code;

        const testFunctions = givenTest.flow
            .map((currentStep) => {
                let particularLogs;

                const type = givenTest?.type;
                const flowId = givenTest?.id;
                const constants = {
                    flow: flowId,
                    type: type,
                    step: currentStep.test,
                    action: currentStep.action,
                    insurance_category: category
                }

                switch (currentStep.action) {
                    case "on_confirm":
                    case "on_select":
                    case "on_init":
                    case "on_update":
                        particularLogs = logs.find(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    case "on_search":
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
                        const search = logs.filter(log => log.action === currentStep.action)?.[searchIndex[currentStep.test]];
                        if (search?.request)
                            return () => on_search(search?.request, romanIndex[searchIndex[currentStep.test] + 1], flowId, logs, constants);
                        return () => on_search({}, romanIndex[searchIndex[currentStep.test] + 1], flowId, logs, constants);
                    case "on_select":
                        if (particularLogs?.request)
                            return () => on_select(particularLogs?.request, flowId, logs, constants);
                        return () => on_select({}, flowId, logs, constants);
                    case "on_init":
                        if (particularLogs?.request)
                            return () => on_init(particularLogs?.request, flowId, logs, constants);
                        return () => on_init({}, flowId, logs, constants);
                    case "on_init_cd_balance_error":
                        if (particularLogs?.request)
                            return () => on_init(particularLogs?.request, flowId, logs, constants);
                        return () => on_init({}, flowId, logs, constants);
                    case "on_confirm":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request, flowId, logs, constants);
                        return () => on_confirm({}, flowId, logs, constants);
                    case "on_update":
                        if (particularLogs?.request)
                            return () => on_update(particularLogs?.request, flowId, constants);
                        return () => on_update({}, flowId, constants);
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