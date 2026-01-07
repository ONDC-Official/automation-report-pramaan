const { search, select, init, cancel, confirm, update, track, info, catalog_rejection, on_search_response } = require("./index");

const UPDATE_TYPES = {
    "update_buyer_return": "Buyer Initiated Return",
    "update_settlement_trail": "Update Settlement Trail"
}

const SEARCH_TYPES = {
    "search": 0,
    "on_search_response": 0,
    "search_mode_start": 0,
    "search_mode_end": 1
}

module.exports = function testRunnerRetail(givenTest, logs, domain, type = "") {
    let testFunctions = [];
    try {
        const flowId = givenTest?.id;

        testFunctions = givenTest.flow
            .map((currentStep) => {
                let particularLogs;

                switch (currentStep.action) {
                    case "select":
                    case "init":
                    case "confirm":
                    case "update":
                    case "cancel":
                    case "track":
                    case "info":
                    case "catalog_rejection":
                    case "on_search":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        break;
                    case "search":
                        particularLogs = logs.filter((log) => log.action === currentStep.action);
                        break;
                    default:
                        break;
                }

                // adding step & action to constants - metadata
                const constants = {
                    core_version: "1.2.0",
                    domain: domain,
                    flow: flowId,
                    type: type,
                    step: currentStep.test,
                    action: currentStep.action
                }

                switch (currentStep.test) {
                    case "search":
                        if (particularLogs[SEARCH_TYPES[currentStep.test]]?.request)
                            return () => search(particularLogs[SEARCH_TYPES[currentStep.test]]?.request, logs, constants);
                        break;
                    case "search_mode_start":
                    case "search_mode_stop":
                        if (particularLogs[SEARCH_TYPES[currentStep.test]]?.request)
                            return () => search(particularLogs[SEARCH_TYPES[currentStep.test]]?.request, logs, constants);
                        break;
                    case "select":
                        if (particularLogs?.request)
                            return () => select(particularLogs?.request, logs, constants);
                        return () => select({}, logs, constants);
                    case "init":
                        if (particularLogs?.request)
                            return () => init(particularLogs?.request, logs, constants);
                        return () => init({}, logs, constants);
                    case "confirm":
                        if (particularLogs?.request)
                            return () => confirm(particularLogs?.request, logs, constants);
                        return () => confirm({}, logs, constants);
                    case "cancel":
                        if (particularLogs?.request)
                            return () => cancel(particularLogs?.request, logs, constants);
                        return () => cancel({}, logs, constants);
                    case "cancel_not_cancellable":
                        if (particularLogs?.request)
                            return () => cancel(particularLogs?.request, logs, constants);
                        return () => cancel({}, logs, constants);
                    case "catalog_rejection":
                        if (particularLogs?.request)
                            return () => catalog_rejection(particularLogs?.request, logs, constants);
                        return () => catalog_rejection({}, logs, constants);
                    case "track":
                        if (particularLogs?.request)
                            return () => track(particularLogs?.request, logs, constants);
                        return () => track({}, logs, constants);
                    case "info":
                        if (particularLogs?.request)
                            return () => info(particularLogs?.request, logs, constants);
                        return () => info({}, logs, constants);
                    case "update_buyer_return":
                    case "update_settlement_trail":
                        if (particularLogs?.request)
                            return () => update(particularLogs?.request, logs, UPDATE_TYPES[currentStep.test], constants);
                        return () => update({}, logs, UPDATE_TYPES[currentStep.test], constants);
                    default:
                        return null;
                }
            })
            .filter((item) => item != null);

            console.log("testFunctions: ", testFunctions);
        return testFunctions;
    } catch (err) {
        console.log(err);
        return testFunctions;
    }
}
