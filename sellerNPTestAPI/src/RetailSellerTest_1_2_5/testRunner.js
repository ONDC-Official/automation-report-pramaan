const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    on_cancel,
    on_status,
    on_update,
    on_track,
    on_rating,
    on_info,
    catalog_rejection,
    cancel_response_check
} = require("./index");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};
const cancelIndex = {
    "on_cancel_merchant": 0,
    "on_cancel_forced": 0,
    "on_cancel": 0,
    "on_cancel_one": 0,
    "on_cancel_two": 1,
    "on_cancel_rto_initiated": 0,
    "on_cancel_return_cancelled": 0
}

const onStatusEnumMap = {
    "on_status_packed": "Packed",
    "on_update_address": "Pending",
    "on_update_buyer_instructions": "Pending",
    "on_status_assign_agent": "Agent-assigned",
    "on_status_pickup": "Order-picked-up",
    "on_cancel_return_cancelled": "Cancelled",
    "on_status_out_for_delivery": "Out-for-delivery",
    "on_status_delivered": "Order-delivered",
    "on_status_rto_delivered": "RTO-Delivered",
    "on_update_buyer_return": "Return_Initiated",
    "on_update_return_delivered": "Return_Delivered",
    "on_update_return_approved": "Return_Approved",
    "on_update_return_picked": "Return_Picked",
    "on_update_merchant_partial_cancel": "Cancelled",
    "on_status_replacement_packed": "Packed",
    "on_status_replacement_assign_agent": "Agent-assigned",
    "on_status_replacement_pickup": "Order-picked-up",
    "on_status_replacement_out_for_delivery": "Out-for-delivery",
    "on_status_replacement_delivered": "Order-delivered"
}

/**
 * Finds the first log entry that matches the given action, type, and key.
 *
 * @param {Array} logs - The array of log objects to search through.
 * @param {string} action - The action to match in the log entries.
 * @param {string} type - The type to match within the fulfillment objects.
 * @param {string} key - The key to match within the fulfillment state descriptor.
 * @returns {Object} - The first matching log entry or an empty object if none are found.
 */
function findAppropriateOnStatus(logs = [], action = "", type = "", key = "", skip = 0) {
    if (!Array.isArray(logs) || [action, type, key].some(v => typeof v !== "string")) {
        throw new Error("Invalid input");
    }

    let matchCount = 0;
    for (const log of logs) {
        if (log?.action !== action) continue;

        const ok = log?.request?.message?.order?.fulfillments?.some(f =>
            f?.type === type && f?.state?.descriptor?.code === key
        );

        if (!ok) continue;

        if (matchCount < skip) {
            matchCount++;
            continue;
        }

        return log;
    }

    return {};
}


module.exports = function testRunnerRetail(givenTest, logs, domain, type = "") {
    const flowId = givenTest?.id;
    let onConfirmLog = {};



    try {
        const testFunctions = givenTest.flow
            .map((currentStep) => {
                let particularLogs;
                let step = currentStep?.test;
                const constants = {
                    core_version: "1.2.5",
                    domain: domain,
                    flow: flowId,
                    step: step,
                    type: type
                }
                switch (currentStep.action) {
                    case "on_search":
                    case "on_select":
                    case "on_init":
                    case "on_track":
                    case "on_rating":
                    case "on_info":
                    case "catalog_rejection":
                    case "cancel":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        break;
                    case "on_confirm":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        onConfirmLog = particularLogs;
                        break;
                    case "on_cancel":
                    case "on_status":
                        particularLogs = logs.filter((log) => log.action === currentStep.action);
                        break;
                    default:
                        break;
                }

                switch (currentStep.test) {
                    case "on_search":
                        if (particularLogs?.request)
                            return () => on_search(particularLogs?.request, logs, constants);
                        break;
                    case "on_select":
                    case "on_select_out_of_stock":
                        if (particularLogs?.request)
                            return () => on_select(particularLogs?.request, logs, constants, currentStep?.test);
                        return () => on_select({}, logs, constants, currentStep?.test);
                    case "on_init":
                        if (particularLogs?.request)
                            return () => on_init(particularLogs?.request, logs, constants);
                        return () => on_init({}, logs, constants);
                    case "on_confirm":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request, logs, constants);
                        return () => on_confirm({}, logs, constants);
                    case "on_track":
                        const isTrackingEnabled = onConfirmLog?.request?.message?.order?.fulfillments?.find((fulfillment) => fulfillment?.type === "Delivery")?.tracking ?? true;
                        if (isTrackingEnabled) {
                            if (particularLogs?.request)
                                return () => on_track(particularLogs?.request, logs, constants);
                            return () => on_track({}, logs, constants);
                        }
                        break;
                    case "on_info":
                        if (particularLogs?.request)
                            return () => on_info(particularLogs?.request, logs, constants);
                        return () => on_info({}, logs, constants);
                    case "on_rating":
                        if (particularLogs?.request)
                            return () => on_rating(particularLogs?.request, logs, constants);
                        return () => on_rating({}, logs, constants);
                    case "on_cancel":
                    case "on_cancel_rto_initiated":
                        if (particularLogs[cancelIndex[currentStep.test]]?.request)
                            return () => on_cancel(particularLogs[cancelIndex[currentStep.test]]?.request, currentStep.test, logs, constants);
                        return () => on_cancel({}, currentStep.test, logs, constants);
                    case "on_cancel_one":
                    case "on_cancel_two":
                    case "on_cancel_forced":
                        if (particularLogs[cancelIndex[currentStep.test]]?.request)
                            return () => on_cancel(particularLogs[cancelIndex[currentStep.test]]?.request, currentStep.test, logs, constants);
                        return () => on_cancel({}, currentStep.test, logs, constants);
                    case "on_status_packed":
                    case "on_status_assign_agent":
                    case "on_status_pickup":
                    case "on_status_out_for_delivery":
                    case "on_status_delivered":
                        const on_status_forward_log = findAppropriateOnStatus(logs, "on_status", "Delivery", onStatusEnumMap[currentStep.test])
                        if (on_status_forward_log?.request) {
                            return () => on_status((on_status_forward_log?.request), onStatusEnumMap[currentStep.test], logs, constants)
                        }
                        return () => on_status({}, onStatusEnumMap[currentStep.test], logs, constants);
                    case "on_status_replacement_packed":
                    case "on_status_replacement_assign_agent":
                    case "on_status_replacement_pickup":
                    case "on_status_replacement_out_for_delivery":
                    case "on_status_replacement_delivered":
                        const on_status_forward_replacement_log = findAppropriateOnStatus(logs, "on_status", "Delivery", onStatusEnumMap[currentStep.test], 1)
                        if (on_status_forward_replacement_log?.request) {
                            return () => on_status((on_status_forward_replacement_log?.request), onStatusEnumMap[currentStep.test], logs, constants)
                        }
                        return () => on_status({}, onStatusEnumMap[currentStep.test], logs, constants);
                    case "on_status_rto_delivered":
                        const on_status_rto_log = findAppropriateOnStatus(logs, "on_status", "RTO", onStatusEnumMap[currentStep.test])
                        if (on_status_rto_log?.request) {
                            return () => on_status((on_status_rto_log?.request), onStatusEnumMap[currentStep.test], logs, constants)
                        }
                        return () => on_status({}, onStatusEnumMap[currentStep.test], logs, constants);
                    case "on_update_merchant_partial_cancel":
                        const on_update_merchant_cancel_log = findAppropriateOnStatus(logs, "on_update", "Cancel", onStatusEnumMap[currentStep.test]);
                        if (on_update_merchant_cancel_log?.request) {
                            return () => on_update(on_update_merchant_cancel_log?.request, onStatusEnumMap[currentStep.test], logs, constants);
                        }
                        return () => on_update({}, onStatusEnumMap[currentStep.test], logs, constants);
                    case "on_update_buyer_return":
                    case "on_update_return_approved":
                    case "on_update_return_picked":
                    case "on_update_return_delivered":
                        const on_update_log = findAppropriateOnStatus(logs, "on_update", "Return", onStatusEnumMap[currentStep.test]);
                        if (on_update_log?.request) {
                            return () => on_update(on_update_log?.request, onStatusEnumMap[currentStep.test], logs, constants);
                        }
                        return () => on_update({}, onStatusEnumMap[currentStep.test], logs, constants);
                    case "on_update_address":
                        const on_update_addr_inst_log = findAppropriateOnStatus(logs, "on_update", "Delivery", onStatusEnumMap[currentStep.test]);
                        if (on_update_addr_inst_log?.request) {
                            return () => on_update(on_update_addr_inst_log?.request, onStatusEnumMap[currentStep.test], logs, constants);
                        }
                        return () => on_update({}, onStatusEnumMap[currentStep.test], logs, constants);
                    case "on_update_buyer_instructions":
                        const on_update_inst_log = findAppropriateOnStatus(logs, "on_update", "Delivery", onStatusEnumMap[currentStep.test], 1);
                        if (on_update_inst_log?.request) {
                            return () => on_update(on_update_inst_log?.request, onStatusEnumMap[currentStep.test], logs, constants);
                        }
                        return () => on_update({}, onStatusEnumMap[currentStep.test], logs, constants);
                    case "check_ack_for_catalog_rejection":
                        if (particularLogs?.response)
                            return () => catalog_rejection(particularLogs?.response, constants);
                        return () => catalog_rejection({}, constants);
                    case "cancel_response_check":
                        if (particularLogs?.response)
                            return () => cancel_response_check(particularLogs?.response);
                        return () => cancel_response_check({});
                    case "on_cancel_return_cancelled":
                        const on_cancel_return_log = findAppropriateOnStatus(logs, "on_cancel", "Return", onStatusEnumMap[currentStep.test]);
                        if (on_cancel_return_log?.request) {
                            return () => on_cancel(on_cancel_return_log?.request, currentStep.test, logs, constants);
                        }
                        return () => on_cancel({}, currentStep.test, logs, constants);
                    default:
                        return null;
                }
            })
            .filter((item) => item != null).flatMap((inner) => inner);

        return testFunctions;
    } catch (err) {
        console.log(err);
    }
}
