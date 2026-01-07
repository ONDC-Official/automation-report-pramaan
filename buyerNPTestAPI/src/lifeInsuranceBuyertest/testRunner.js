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

const initIndex = {
    init_one: 0,
    init_two: 1,
    init_three: 2,
    init_four: 3,
};

module.exports = function testRunnerLifeInsurance(givenTest, logs, domain) {
    try {
        const constants = {
            core_version: "2.0.0",
            domain: domain,
            flow: givenTest?.id
        }

        const testFunctions = givenTest.flow
            .map((currentStep) => {
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
                    case "search":
                    case "init":
                        particularLogs = logs.filter((log) => log.action === currentStep.action);
                        break;
                    case "select":
                    case "confirm":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
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

                // const category = givenTest?.type;
                const testCaseId = `id: LI_log_bpp_${currentStep.action}_message_test_`;

                switch (currentStep.test) {
                    case "search_one":
                    case "search_two":
                    case "search_three":
                        if (particularLogs[searchIndex[currentStep.test]]?.request)
                            return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], "", testCaseId, logs, constants);
                        return () => search({}, romanIndex[searchIndex[currentStep.test] + 1], "", testCaseId, logs, constants);
                    case "select":
                        if (particularLogs?.request)
                            return () => select(particularLogs?.request, constants, logs, constants);
                        return () => select({}, constants, logs, constants);
                    case "init_one":
                    case "init_two":
                    case "init_three":
                    case "init_four":
                        if (particularLogs[initIndex[currentStep.test]]?.request)
                            return () => init(particularLogs[initIndex[currentStep.test]]?.request, romanIndex[initIndex[currentStep.test] + 1], "", testCaseId, logs, constants);
                        return () => init({}, romanIndex[initIndex[currentStep.test] + 1], "", testCaseId, logs, constants);
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
