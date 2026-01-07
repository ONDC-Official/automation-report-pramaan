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
module.exports = function testRunnerLogistics(givenTest, logs) {
    try {
        const testFunctions = givenTest.flow
            .map((currentStep) => {
                let particularLogs;
                let statusIndex = 0;
                const type = givenTest.type;
                const constants = {
                    type: type,
                    action: currentStep.action,
                    state: "Created",
                    core_version: "1.2.0"
                }
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
                            return () => search(particularLogs?.request, constants);
                        return () => search(constants);
                    case "init":
                        if (particularLogs?.request)
                            return () => init(particularLogs?.request, logs, constants);
                        return () => init(logs, constants);
                    case "confirm":
                        if (particularLogs?.request)
                            return () => confirm(particularLogs?.request, logs, constants);
                        return () => confirm(logs, constants);
                    case "track":
                        if (particularLogs?.request)
                            return () => track(particularLogs?.request, constants);
                        return () => track({}, constants);
                    case "cancel":
                        if (particularLogs?.request)
                            return () => cancel(particularLogs?.request);
                        return () => cancel();
                    case "update":
                        if (particularLogs?.request)
                            return () => update(particularLogs?.request, logs);
                        return () => update(logs);
                    case "status":
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
            .filter((item) => item != null);

        return testFunctions;
    } catch (err) {
        console.log(err);
    }
}
