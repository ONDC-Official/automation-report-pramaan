const { search, select, init, cancel, confirm, update, track, info, rating, catalog_rejection, on_search_response } = require("./index");

const UPDATE_TYPES = {
    "update_buyer_return": "Buyer Initiated Return",
    "update_buyer_replacement": "Buyer Initiated Replacement",
    "update_settlement_trail": "Update Settlement Trail",
    "update_pickup": "Update Picked Up",
    "update_delivered": "Update Delivered"
}

const SEARCH_TYPES = {
    "search": 0,
    "search_mode_start": 0,
    "search_mode_end": 1
}

const cancelIndex = {
    "cancel": 0,
    "cancel_return": 0,
    "cancel_not_cancellable": 0,
    "cancel_forced": 1
}

const updateIndex = {
    "update_buyer_return": 0,
    "update_buyer_replacement": 0,
    "update_settlement_trail": 0,
    "update_pickup": 0,
    "update_delivered": 1
}

module.exports = function testRunnerRetail(givenTest, logs, domain, type = "") {
    try {
        const testFunctions = givenTest.flow
            .map((currentStep) => {
                let particularLogs;
                const flowId = givenTest?.id;
                switch (currentStep.action) {
                    case "select":
                    case "init":
                    case "confirm":
                    case "track":
                    case "rating":
                    case "info":
                    case "catalog_rejection":
                    case "on_search":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        break;
                    case "search":
                    case "cancel":
                    case "update":
                        particularLogs = logs.filter((log) => log.action === currentStep.action);
                        break;
                    default:
                        break;
                }

                // adding step & action to constants - metadata
                const constants = {
                    core_version: "1.2.5",
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
                    case "on_search_response":
                        if (particularLogs?.response)
                            return () => on_search_response(particularLogs?.response);
                        return () => on_search_response({});
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
                    case "cancel_not_cancellable":
                    case "cancel_forced":
                    case "cancel_return":
                        if (particularLogs[cancelIndex[currentStep.test]]?.request)
                            return () => cancel(particularLogs[cancelIndex[currentStep.test]]?.request, logs, constants);
                        return () => cancel({}, logs, constants);
                    case "catalog_rejection":
                        if (particularLogs?.request)
                            return () => catalog_rejection(particularLogs?.request, logs, constants);
                        return () => catalog_rejection({}, logs, constants);
                    case "track":
                        if (particularLogs?.request)
                            return () => track(particularLogs?.request, logs, constants);
                        return () => track({}, logs, constants);
                    case "rating":
                        if (particularLogs?.request)
                            return () => rating(particularLogs?.request, logs, constants);
                        return () => rating({});
                    case "info":
                        if (particularLogs?.request)
                            return () => info(particularLogs?.request, logs, constants);
                        return () => info({}, logs, constants);
                    case "update_buyer_return":
                    case "update_settlement_trail":
                    case "update_buyer_replacement":
                    case "update_pickup":
                    case "update_delivered":
                        if (particularLogs[updateIndex[currentStep.test]]?.request)
                            return () => update(particularLogs[updateIndex[currentStep.test]]?.request, logs, UPDATE_TYPES[currentStep.test], constants);
                        return () => update({}, logs, UPDATE_TYPES[currentStep.test], constants);
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
