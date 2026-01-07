const { on_confirm, on_select, on_init, on_search } = require("./index");

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
                    case "on_search":
                    case "on_select":
                    case "on_init":
                    case "on_confirm":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        break;
                    default:
                        break;
                }

                switch (currentStep.test) {
                    case "on_search":
                        if (particularLogs?.request)
                            return () => on_search(particularLogs?.request, logs,constants);
                        return () => on_search({},logs,constants);
                    case "on_select":
                        if (particularLogs?.request)
                            return () => on_select(particularLogs?.request, logs,constants);
                        return () => on_select({},logs,constants);
                    case "on_init":
                        if (particularLogs?.request)
                            return () => on_init(particularLogs?.request, logs,constants);
                        return () => on_init({},logs,constants);
                    case "on_confirm":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request, logs,constants);
                        return () => on_confirm({},logs,constants);
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
