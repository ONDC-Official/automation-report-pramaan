const { search, select, init, confirm } = require("./index");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};

const searchIndex = {
    search_one: 0,
    search_two: 1,
    search_three: 2
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
                    case "search":
                        particularLogs = logs.filter((log) => log.action === currentStep.action);
                        break;
                    case "select":
                    case "init":
                    case "confirm":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        break;
                    default:
                        break;
                }

                switch (currentStep.test) {
                    case "search_one":
                    case "search_two":
                    case "search_three":
                        if (particularLogs[searchIndex[currentStep.test]]?.request)
                            return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                        return () => search({}, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                    case "select":
                        if (particularLogs?.request)
                            return () => select(particularLogs?.request, logs, constants);
                        return () => select({}, logs, constants);
                    case "init":
                        if (particularLogs?.request)
                            return () => init(particularLogs?.request, logs, constants);
                        return () => init({ flowId }, logs, constants);
                    case "confirm":
                        if (particularLogs?.request)
                            return () => confirm(particularLogs?.request, logs, constants);
                        return () => confirm({}, logs, constants);
                    default:
                        return null;
                }
            })
            .filter((item) => item != null);

        return testFunctions;
    } catch (err) {
        console.log(err);
    }
}
