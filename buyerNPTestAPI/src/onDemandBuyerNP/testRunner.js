const {
    search,
    select,
    init,
    confirm,
    status,
    cancel,
    track
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

const cancelIndex = {
    cancel_one: 0,
    cancel_two: 1,
}

module.exports = function testRunneronDemand(givenTest, logs) {
    try {
        let statusIndex = 0;
        const isSelfPickup = givenTest?.id === "DEM_6" ? true : false;

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
                    case "confirm":
                    case "support":
                    case "search":
                    case "select":
                    case "init":
                    case "track":
                        particularLogs = logs.find((log) => log?.action === currentStep?.action);
                        break;
                    case "update":
                    case "status":
                    case "status":
                    case "cancel":
                        particularLogs = logs.filter((log) => log?.action === currentStep?.action);
                        break;
                    default:
                        break;
                }

                switch (currentStep.test) {
                    case "search":
                        if (particularLogs?.request)
                            return () => search(particularLogs?.request, logs);
                        return () => search({}, logs);
                    case "select":
                        if (particularLogs?.request)
                            return () => select(particularLogs?.request, logs, constants);
                        return () => select({}, logs, constants);
                    case "init":
                        if (particularLogs?.request)
                            return () => init(particularLogs?.request, isSelfPickup, logs, constants);
                        return () => init({}, logs, constants);
                    case "confirm":
                        if (particularLogs?.request)
                            return () => confirm(particularLogs?.request, isSelfPickup, logs, constants);
                        return () => confirm({}, logs, constants);
                    case "status":
                        if (particularLogs[statusIndex]?.request)
                            return () => status(particularLogs[statusIndex++]?.request, romanIndex[statusIndex], logs);
                        return () => status({});
                    case "track":
                        if (particularLogs?.request)
                            return () => track(particularLogs?.request, logs);
                        return () => track({}, logs);
                    case "cancel_one":
                        const cancelOneLog = particularLogs?.shift();
                        if (cancelOneLog?.request)
                            return () => cancel(cancelOneLog?.request, currentStep?.test, logs);
                        return () => cancel({}, currentStep?.test, logs);
                    case "cancel_two":
                        const cancelTwoLog = particularLogs?.pop();
                        if (cancelTwoLog?.request)
                            return () => cancel(cancelTwoLog?.request, currentStep?.test, logs);
                        return () => cancel({}, currentStep?.test, logs);
                    case "cancel_technical":
                        const cancelTechnical = particularLogs?.pop();
                        if (cancelTechnical?.request)
                            return () => cancel(cancelTechnical?.request, currentStep?.test, logs);
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


