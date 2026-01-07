const {
    search,
    select,
    init,
    confirm,
    status,
} = require("./index");

module.exports = function testRunnerGiftCards(givenTest, logs) {
    try {
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
                    case "select":
                    case "init":
                    case "confirm":
                    case "status":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        break;
                    default:
                        break;
                }

                switch (currentStep.test) {
                    case "search":
                        if (particularLogs?.request)
                            return () => search(particularLogs?.request, logs,constants);
                        return () => search({}, logs,constants);
                    case "select":
                        if (particularLogs?.request)
                            return () => select(particularLogs?.request, logs,constants);
                        return () => select({}, logs,constants);
                    case "init":
                        if (particularLogs?.request)
                            return () => init(particularLogs?.request, logs,constants);
                        return () => init({}, logs,constants);
                    case "confirm":
                        if (particularLogs?.request)
                            return () => confirm(particularLogs?.request, logs,constants);
                        return () => confirm({}, logs,constants);
                    case "status":
                        if (particularLogs?.request)
                            return () => status(particularLogs?.request, logs);
                        return () => status({}, logs);
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
