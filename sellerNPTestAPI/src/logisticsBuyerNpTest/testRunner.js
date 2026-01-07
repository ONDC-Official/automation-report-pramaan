const { search, init, confirm, cancel, status, track, update } = require("./index");

const statusEnumMap = {
    "status_assign_agent": "Agent-assigned",
    "status_pickup": "Pickup"
}
function findAppropriateCall(logs, action = "", type = "", key = "") {
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
    } catch (err) {
        return {};
    }
}
module.exports = function testRunnerLogistics(givenTest, forwardLogs = [], retailLogs = [], returnLogs = []) {
    try {
        // By default logs are for forward flow only
        let flowDirection = 'Forward Flow';
        let logs = forwardLogs;
        
        // if order is Buyer Initiated Return
        if(returnLogs.length > 0) {
            flowDirection = "Return Flow";
            logs = returnLogs;
        }

        const testFunctions = givenTest?.flow
            .map((currentStep) => {
                let particularLogs;
                let statusIndex = 0;
                switch (currentStep.action) {
                    case "search":
                    case "init":
                    case "confirm":
                    case "track":
                    case "cancel":
                    case "status":
                    case "update":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        break;
                    default:
                        break;
                }

                switch (currentStep.test) {
                    case "search":
                        if (particularLogs?.request)
                            return () => search(particularLogs?.request);
                        return () => search();
                    case "init":
                        if (particularLogs?.request)
                            return () => init(particularLogs?.request);
                        return () => init();
                    case "confirm":
                        if (particularLogs?.request)
                            return () => confirm(particularLogs?.request);
                        return () => confirm();
                    case "track":
                        if (particularLogs?.request)
                            return () => track(particularLogs?.request);
                        return () => track();
                    case "cancel":
                        if (particularLogs?.request)
                            return () => cancel(particularLogs?.request);
                        return () => cancel();
                    case "update":
                        if (particularLogs?.request)
                            return () => update(particularLogs?.request);
                        return () => update();
                    case "status_assign_agent":
                    case "status_pickup":
                    case "status_out_for_delivery":
                        const status_log = findAppropriateCall(logs, "status", "DELIVERY", statusEnumMap[currentStep.test])
                        if (status_log) {
                            return () => status((particularLogs?.request), statusEnumMap[currentStep.test])
                        }
                        return () => status();
                    default:
                        return null;
                }
            })
            .filter((item) => item != null) ?? [];

        return testFunctions;
    } catch (err) {
        console.log(err);
        return [];
    }
}
