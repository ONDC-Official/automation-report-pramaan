const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    on_status
} = require("./index");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI"
};

const searchIndex = {
    on_search_one: 0,
    on_search_two: 1,
    on_search_three: 2,
};

const initIndex = {
    on_init_one: 0,
    on_init_two: 1,
    on_init_three: 2,
    on_init_four:3,
};

const statusIndex = {
    on_status_one:0,
    on_status_two:1,
    on_status_three:2,
    on_status_four:3,
}



// const onStatusEnumMap = {
//     "on_status_packed": "Packed",
//     "on_status_assign_agent": "Agent-assigned",
//     "on_status_pickup": "Order-picked-up",
//     "on_status_out_for_delivery": "Out-for-delivery",
//     "on_status_delivered": "Order-delivered",
//     "on_status_rto_delivered": "RTO-Delivered",
//     "on_update_buyer_return": "Return_Initiated",
//     "on_update_return_delivered": "Return_Delivered",
//     "on_update_return_approved": "Return_Approved",
//     "on_update_return_picked": "Return_Picked",
//     "on_update_merchant_partial_cancel": "Cancelled"
// }

/**
 * Finds the first log entry that matches the given action, type, and key.
 *
 * @param {Array} logs - The array of log objects to search through.
 * @param {string} action - The action to match in the log entries.
 * @param {string} type - The type to match within the fulfillment objects.
 * @param {string} key - The key to match within the fulfillment state descriptor.
 * @returns {Object} - The first matching log entry or an empty object if none are found.
 */



module.exports = function testRunnerLifeInsurance(givenTest, logs, domain) {
    const flowId = givenTest?.id;
    let onConfirmLog = {};

    const constants = {
        core_version: "2.0.0",
        domain: domain,
        flow: flowId
    }

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
                    case "on_select":
                    case "on_confirm":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        onConfirmLog = particularLogs;
                        break;
                    case "on_status":
                    case "on_init":
                    case "on_search":
                        particularLogs = logs.filter((log) => log.action === currentStep.action);
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
                const testCaseId = `id: LI_log_bpp_${currentStep.action}_message_test_`;

                switch (currentStep.test) {
                    case "on_search_one":
                    case "on_search_two":
                    case "on_search_three":
                        if (particularLogs[searchIndex[currentStep.test]]?.request)
                            return () => on_search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], logs,constants);
                        return () => on_search({}, romanIndex[searchIndex[currentStep.test] + 1], logs,constants);
                    case "on_select":
                        if (particularLogs?.request)
                            return () => on_select(particularLogs?.request, currentStep?.test, logs, constants);
                        return () => on_select({},  constants, currentStep?.test,logs,constants);
                    case "on_init_one":
                    case "on_init_two":
                    case "on_init_three":
                    case "on_init_four":    
                        if (particularLogs[initIndex[currentStep.test]]?.request)
                            return () => on_init(particularLogs[initIndex[currentStep.test]]?.request, romanIndex[initIndex[currentStep.test] + 1],  "", testCaseId, logs, constants);
                        return () => on_init({}, romanIndex[initIndex[currentStep.test] + 1],  "", testCaseId, logs, constants);
                    case "on_confirm":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request, logs, constants);
                        return () => on_confirm({}, logs, constants);
                    case "on_status_one":
                    case "on_status_two":  
                    case "on_status_three": 
                    case "on_status_four": 
                        if(particularLogs[statusIndex[currentStep.test]]?.request)
                            return () => on_status(particularLogs[statusIndex[currentStep.test]]?.request, romanIndex[statusIndex[currentStep.test] + 1], logs, "", testCaseId);
                        return () => on_status ({},romanIndex[statusIndex[currentStep.test] + 1], logs, "", testCaseId )
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
