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

        // Pramaan models search_one/search_two/search_three as one continuous flow, but
        // Workbench can run each search as its own isolated flow (or bundle only a subset of
        // them, e.g. the Purchase Journey leg only re-sends the final search). So `logs` here
        // may legitimately contain fewer "search" entries than the flow definition has
        // search-type steps. Rather than trusting the fixed searchIndex position (0/1/2) to
        // find the right log — which breaks the moment logs don't contain all three — track how
        // many search-type steps this flow definition has declared *so far* and use that as the
        // position into this run's own filtered search logs. The searchIndex/romanIndex lookup
        // is kept only to pick which assertion tier (I/II/III) applies to that semantic step.
        let searchStepsSeen = 0;

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
                    case "search_three": {
                        const positionInThisRun = searchStepsSeen++;
                        const roman = romanIndex[searchIndex[currentStep.test] + 1];
                        if (particularLogs[positionInThisRun]?.request)
                            return () => search(particularLogs[positionInThisRun]?.request, roman, logs, constants);
                        return () => search({}, roman, logs, constants);
                    }
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
