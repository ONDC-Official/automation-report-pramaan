const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    on_status,
    on_update,
    on_cancel,
    on_track
} = require("./index");


const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};
const searchIndex = {
    on_search_one: 0,
    on_search_two: 1,
    on_search_three: 2,
};

const selectIndex = {
    on_select_one: 0,
    on_select_two: 1,
    on_select_three: 2,
};
const cancelIndex = {
    on_cancel_one: 0,
    on_cancel_two: 1,
    on_cancel_technical: 0,
    on_cancel_merchant: 0,
    on_cancel_driver_not_found: 0
};


module.exports = function testRunnerentryPass(givenTest, logs) {
    try {
        let statusIndex = 0;
        let updateIndex = 0;

        let isSelfPickup = givenTest?.id === "DEM_6" ? true : false;

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
                    case "on_confirm":
                    case "on_support":
                    case "on_init":
                    case "on_track":
                        particularLogs = logs.find(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    case "on_search":
                    case "on_select":
                    case "on_update":
                    case "on_status":
                    case "on_cancel":
                        particularLogs = logs.filter(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    default:
                        break;
                }
                // console.log("logs in testrunner", logs)
                switch (currentStep.test) {
                    case "on_search_one":
                    case "on_search_two":
                    case "on_search_three":
                        const search = logs.filter(log => log.action === currentStep.action)?.[searchIndex[currentStep.test]];
                        if (search?.request)
                            return () => on_search(search?.request, romanIndex[searchIndex[currentStep.test] + 1], isSelfPickup, logs, constants);
                        return () => on_search({}, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
                    case "on_select_one":
                    case "on_select_two":
                        const select = logs.filter(log => log.action === currentStep.action)?.[selectIndex[currentStep.test]]
                        if (select?.request)
                            return () => on_select(select?.request, romanIndex[selectIndex[currentStep.test] + 1], isSelfPickup, logs, constants);
                        return () => on_select({}, romanIndex[selectIndex[currentStep.test] + 1], logs, constants);
                    case "on_init":
                        if (particularLogs?.request)
                            return () => on_init(particularLogs?.request, isSelfPickup, logs, constants);
                        return () => on_init({}, logs, constants);
                    case "on_confirm":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request, "NORMAL", isSelfPickup, logs, constants);
                        return () => on_confirm({}, logs, constants);
                    case "on_confirm_assign_driver":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request, "ASSIGNED", isSelfPickup, logs, constants,);
                        return () => on_confirm({}, logs);
                    case "on_confirm_driver_not_found":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request, "DRIVER_NOT_FOUND", isSelfPickup, logs, constants,);
                        return () => on_confirm({}, logs, constants);
                    case "on_track":
                        if (particularLogs?.request)
                            return () => on_track(particularLogs?.request);
                        return () => on_track({});
                    case "on_status":
                        if (particularLogs[statusIndex]?.request)
                            return () => on_status(particularLogs[statusIndex++]?.request, logs, "", isSelfPickup);
                        return () => on_status({});
                    case "on_status_technical":
                        if (particularLogs[statusIndex]?.request)
                            return () => on_status(particularLogs[statusIndex++]?.request, logs, "RIDE_CONFIRMED", isSelfPickup);
                        return () => on_status({}, logs, "RIDE_CONFIRMED");
                    case "on_status_enroute_pickup":
                        if (particularLogs[statusIndex]?.request)
                            return () => on_status(particularLogs[statusIndex++]?.request, logs, "RIDE_ENROUTE_PICKUP", isSelfPickup);
                        return () => on_status({});
                    case "on_status_arrived_pickup":
                        if (particularLogs[statusIndex]?.request)
                            return () => on_status(particularLogs[statusIndex++]?.request, logs, "RIDE_ARRIVED_PICKUP", isSelfPickup);
                        return () => on_status({});
                    case "on_update":
                        if (particularLogs[updateIndex]?.request)
                            return () => on_update(particularLogs[updateIndex++]?.request, logs, "", isSelfPickup);
                        return () => on_update({});
                    case "on_update_assign_driver":
                        if (particularLogs[updateIndex]?.request)
                            return () => on_update(particularLogs[updateIndex++]?.request, logs, "RIDE_ASSIGNED", isSelfPickup);
                        return () => on_update({});
                    case "on_status_ride_started":
                        if (particularLogs[statusIndex]?.request)
                            return () => on_status(particularLogs[statusIndex++]?.request, logs, "RIDE_STARTED", isSelfPickup);
                        return () => on_status({});
                    case "on_status_ride_ended":
                        if (particularLogs[statusIndex]?.request)
                            return () => on_status(particularLogs[statusIndex++]?.request, logs, "RIDE_ENDED", isSelfPickup);
                        return () => on_status({});
                    case "on_cancel_driver_not_found":
                        if (particularLogs[cancelIndex[currentStep?.test]]?.request)
                            return () => on_cancel(particularLogs[cancelIndex[currentStep.test]]?.request, "Driver not found", logs, "on_cancel_driver_not_found", isSelfPickup);
                        return () => on_cancel({}, "Driver not found", logs, "on_cancel_driver_not_found");
                    case "on_cancel_merchant":
                        if (particularLogs[cancelIndex[currentStep?.test]]?.request)
                            return () => on_cancel(particularLogs[cancelIndex[currentStep.test]]?.request, "Merchant", logs, "on_cancel_merchant", isSelfPickup);
                        return () => on_cancel({}, "Merchant", logs, "on_cancel_merchant");
                    case "on_cancel_technical":
                        if (particularLogs[cancelIndex[currentStep?.test]]?.request)
                            return () => on_cancel(particularLogs[cancelIndex[currentStep.test]]?.request, "Technical", logs, "on_cancel_technical", isSelfPickup);
                        return () => on_cancel({}, "Technical", logs, "on_cancel_technical");
                    case "on_cancel_one":
                    case "on_cancel_two":
                        if (particularLogs[cancelIndex[currentStep?.test]]?.request)
                            return () => on_cancel(particularLogs[cancelIndex[currentStep.test]]?.request, romanIndex[cancelIndex[currentStep.test] + 1], logs, "", isSelfPickup);
                        return () => on_cancel({}, romanIndex[cancelIndex[currentStep.test] + 1], logs);
                    default:
                        return null;
                }
            }).filter((item) => item != null);

        return testFunctions;
    } catch (error) {
        console.log(error);
        return error;
    }
}