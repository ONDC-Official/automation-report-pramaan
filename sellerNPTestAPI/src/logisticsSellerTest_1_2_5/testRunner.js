const { on_confirm, on_init, on_search, on_cancel, on_status, on_track, on_update } = require("./index");

const cancelIndex = {
    "on_cancel_merchant": 0,
    "on_cancel": 0,
    "on_cancel_rto_initiated": 0
}

const onStatusEnumMap = {
    "on_status_assign_agent": "Agent-assigned",
    "on_status_at_pickup": "At-pickup",
    "on_status_out_for_pickup": "Out-for-pickup",
    "on_status_pickup_failed": "Pickup-failed",
    "on_status_pickup_rescheduled": "Pickup-rescheduled",
    "on_status_picked_up": "Order-picked-up",
    "on_status_in_transit": "In-transit",
    "on_status_at_destination_hub": "At-destination-hub",
    "on_status_at_delivery": "At-delivery",
    "on_status_out_for_delivery": "Out-for-delivery",
    "on_status_delivered": "Order-delivered",
    "on_status_rto_delivered": "RTO-Delivered",
};


function findAppropriateOnStatus(logs, action = "", type = "", key = "") {
    try {
        let requiredLog;
        for (let i = 0; i < logs.length; i++) {
            if (logs[i]?.request?.context?.action === action) {
                for (let j = 0; j < logs[i]?.request?.message?.order?.fulfillments.length; j++) {
                    const fulfillment = logs[i]?.request?.message?.order?.fulfillments[j];
                    if (fulfillment?.type === type && fulfillment?.state?.descriptor?.code === key) {
                        requiredLog = logs[i];
                        break;
                    }
                }
            }

            if (requiredLog) {
                break;
            }
        }
        if (!requiredLog) {
            return {};
        }
        return requiredLog;
    } catch (err) {
        return {};
    }
}

module.exports = function testRunnerLogistics(givenTest, logs) {
    try {
        const flowId = givenTest?.id;
        const testFunctions = givenTest.flow
            .map((currentStep) => {
                let particularLogs;

                switch (currentStep.action) {
                    case "on_search":
                    case "on_init":
                    case "on_confirm":
                    case "on_update":
                    case "on_status":
                    case "on_track":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        break;
                    case "on_cancel":
                        particularLogs = logs.filter((log) => log?.action === currentStep?.action);
                        break; // Added missing break
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
                const testCaseId = `id: b2c_log_bap_${currentStep.action}_message_test_`;

                switch (currentStep.test) {
                    case "on_search":
                        if (particularLogs?.request)
                            return () => on_search(particularLogs?.request, logs, flowId, testCaseId);
                        return () => on_search({}, logs, flowId, testCaseId);
                    case "on_init":
                        if (particularLogs?.request)
                            return () => on_init(particularLogs?.request, logs, flowId, testCaseId);
                        return () => on_init({}, logs, flowId, testCaseId);
                    case "on_confirm":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request, logs, flowId, testCaseId);
                        return () => on_confirm({}, logs, flowId, testCaseId);
                    case "on_update":
                        if (particularLogs?.request)
                            return () => on_update(particularLogs?.request, logs, flowId, testCaseId);
                        return () => on_update({}, logs, flowId, testCaseId);
                    case "on_track":
                        if (particularLogs?.request)
                            return () => on_track(particularLogs?.request, logs, flowId, testCaseId);
                        return () => on_track({}, logs, flowId, testCaseId);
                    case "on_cancel_merchant":
                    case "on_cancel":
                    case "on_cancel_rto_initiated":
                        if (particularLogs[cancelIndex[currentStep.test]]?.request) {
                            return () => on_cancel(particularLogs[cancelIndex[currentStep.test]]?.request, currentStep.test, logs, flowId)
                        }
                        return () => on_cancel({}, currentStep.test, logs, flowId);
                    case "on_status_out_for_pickup":
                    case "on_status_pickup_failed":
                    case "on_status_pickup_rescheduled":
                    case "on_status_in_transit":
                    case "on_status_at_destination_hub":
                    case "on_status_assign_agent":
                    case "on_status_at_pickup":
                    case "on_status_picked_up":
                    case "on_status_at_delivery":
                    case "on_status_out_for_delivery":
                    case "on_status_delivered":
                    case "on_status_rto_delivered":
                        const on_status_log = findAppropriateOnStatus(logs, "on_status", "Delivery", onStatusEnumMap[currentStep.test])
                        if (on_status_log) {
                            return () => on_status(on_status_log?.request, onStatusEnumMap[currentStep.test], logs, flowId, testCaseId)
                        }
                        return () => on_status({}, onStatusEnumMap[currentStep.test], logs, flowId, testCaseId);
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