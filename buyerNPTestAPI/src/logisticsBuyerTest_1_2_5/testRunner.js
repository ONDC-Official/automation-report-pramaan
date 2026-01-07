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
        const flowId = givenTest?.id;
        console.log(flowId)
        const testFunctions = givenTest.flow
            .map((currentStep) => {
                const type = givenTest.type;
                const flowId = givenTest?.id;
                let particularLogs;
                let statusIndex = 0;
                const testCaseId = `id: b2c_log_bap_${currentStep.action}_message_test_`;
                const constants = {
                    type: type,
                    action: currentStep.action,
                    state: "Created",
                    core_version: "1.2.5",
                    testCaseId: testCaseId,
                    flowId: flowId
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

                let domain;
                if (Array.isArray(particularLogs)) {
                    domain = particularLogs[0]?.request?.context?.domain;
                } else {
                    domain = particularLogs?.request?.context?.domain;
                }

                const category = givenTest?.type;
                // const testCaseId = `id: ${domain}_${category}_${currentStep.action}_message_test_`;

                switch (currentStep.test) {
                    case "search":
                        if (particularLogs?.request)
                            return () => search(particularLogs?.request, testCaseId, flowId, logs, constants);
                        return () => search({}, testCaseId, flowId, logs, constants);
                    case "init":
                        if (particularLogs?.request)
                            return () => init(particularLogs?.request, testCaseId, flowId, logs, constants);
                        return () => init({}, testCaseId, flowId, logs, constants);
                    case "confirm":
                        if (particularLogs?.request)
                            return () => confirm(particularLogs?.request, testCaseId, flowId, logs, constants);
                        return () => confirm({}, testCaseId, flowId, logs, constants);
                    case "track":
                        if (particularLogs?.request)
                            return () => track(particularLogs?.request, testCaseId, flowId, logs, constants);
                        return () => track({}, testCaseId, flowId, logs, constants);
                    case "cancel":
                        if (particularLogs?.request)
                            return () => cancel(particularLogs?.request, testCaseId, flowId, logs, constants);
                        return () => cancel({}, logs, constants);
                    case "update":
                        if (particularLogs?.request)
                            return () => update(particularLogs?.request, testCaseId, flowId, logs, constants);
                        return () => update({}, testCaseId, flowId, logs, constants);
                    case "status_assign_agent":
                    case "status_pickup":
                    case "status_out_for_delivery":
                        const status_log = findAppropriateCall(logs, "status", "DELIVERY", statusEnumMap[currentStep.test])
                        if (status_log) {
                            return () => status((particularLogs?.request), statusEnumMap[currentStep.test])
                        }
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