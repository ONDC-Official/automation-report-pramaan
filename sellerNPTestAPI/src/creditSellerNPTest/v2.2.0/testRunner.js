const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    on_status,
    on_support,
    on_update,
    missedEMIPaymentTests,
    updateForeClosureTests,
    on_updateFulfillment,
    prePartPaymentTests
} = require("./index");

const { calculateSettlementAmount } = require("../../helper/utils");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};

const onSearchIndex = {
    on_search_one: 0,
    on_search_two: 1,
    on_search_three: 2,
    on_search_four: 3
};
const onSelectIndex = {
    on_select_one: 0,
    on_select_two: 1,
    on_select_three: 2,
};
const updateIndex = {
    on_update_one: 0,
    on_update_two: 1,
};

const initIndex = {
    on_init_one: 0,
    on_init_two: 1,
    on_init_three: 2,
    on_init_four: 3
};


module.exports = function testRunnerV2_2_0(givenTest, logs, queries) {
    try {
        let statusIndex = 0;
        const amount = queries["amount"];

        let testFunctions = givenTest.flow
            .map((currentStep, index) => {
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
                        //case "on_update":
                        particularLogs = logs.find(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    case "on_search":
                    case "on_select":
                    case "on_init":
                    case "on_status":
                    case "on_update":
                        particularLogs = logs.filter(
                            (log) => log.action === currentStep.action
                        );
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
                const testCaseId = `id: ${domain}_${category}_${currentStep.action}_message_test_`;

                let timestampConfirm = logs.filter(log => log.action === 'confirm').pop()?.request?.context?.timestamp;
                if (!timestampConfirm) {
                    timestampConfirm = new Date();
                }

                let settlementAmount;
                const finalOfferSelect = logs.filter(log => log.action === "on_select").pop();
                switch (currentStep?.test) {
                    case "on_init_one":
                    case "on_init_two":
                    case "on_init_three":
                        const init_log = logs.filter(log => log.action === "on_init");
                        if (init_log.length > 1) {
                            settlementAmount = calculateSettlementAmount(init_log[initIndex[currentStep.test]]?.request?.message?.order?.payments.find(payment => payment?.tags), finalOfferSelect?.request?.message?.order?.quote, finalOfferSelect?.request?.message?.order?.items)
                        }
                        break;
                    case "on_confirm":
                        const init_log_for_confirm = logs.filter(log => log.action === "on_init");
                        if (init_log_for_confirm.length > 1) {
                            settlementAmount = calculateSettlementAmount(init_log_for_confirm[init_log_for_confirm.length - 1]?.request?.message?.order?.payments.find(payment => payment?.tags), finalOfferSelect?.request?.message?.order?.quote, finalOfferSelect?.request?.message?.order?.items)
                        }
                }
                let previous_on_init_payment_id;
                switch (currentStep?.test) {
                    case "on_init_one":
                        break;
                    case "on_init_two":
                    case "on_init_three":
                        const on_init_log_for_inits = logs.filter(log => log.action === "on_init");
                        if (on_init_log_for_inits.length > 1) {
                            previous_on_init_payment_id = on_init_log_for_inits[initIndex[currentStep.test] - 1]?.request?.message?.order?.payments.find(payment => payment?.tags)?.id;
                        }
                        break;
                    case "on_confirm":
                        const on_init_log_for_confirm = logs.filter(log => log.action === "on_init");
                        if (on_init_log_for_confirm.length > 1) {
                            previous_on_init_payment_id = on_init_log_for_confirm[on_init_log_for_confirm.length - 1]?.request?.message?.order?.payments.find(payment => payment?.tags)?.id;
                        }
                }
                switch (currentStep.test) {
                    case "on_search_one":
                    case "on_search_two":
                    case "on_search_three":
                    case "on_search_four":
                        const search = logs?.filter(log => log.action === currentStep.action)?.[onSearchIndex[currentStep.test]];
                        if (search?.request)
                            return () => on_search(search?.request, romanIndex[onSearchIndex[currentStep.test] + 1], testCaseId, logs, constants);
                        return () => on_search({}, romanIndex[onSearchIndex[currentStep.test] + 1], testCaseId, logs, constants);
                    case "on_select_one":
                    case "on_select_two":
                    case "on_select_three":
                        if (particularLogs[onSelectIndex[currentStep.test]]?.request)
                            return () => on_select(particularLogs[onSelectIndex[currentStep.test]]?.request, romanIndex[onSelectIndex[currentStep.test] + 1], testCaseId, logs, constants);
                        return () => on_select({}, romanIndex[onSelectIndex[currentStep.test] + 1], testCaseId, logs, constants);
                    case "on_init_one":
                    case "on_init_two":
                    case "on_init_three":
                        if (particularLogs[initIndex[currentStep.test]]?.request)
                            return () => on_init(particularLogs[initIndex[currentStep.test]]?.request, romanIndex[initIndex[currentStep.test] + 1], testCaseId, logs, constants);
                        return () => on_init({}, romanIndex[initIndex[currentStep.test] + 1], testCaseId, logs, constants);
                    case "on_confirm":
                        if (particularLogs?.request)
                            return () => on_confirm(particularLogs?.request, previous_on_init_payment_id, settlementAmount, testCaseId, logs, constants);
                        return () => on_confirm({}, previous_on_init_payment_id, settlementAmount, testCaseId, logs, constants);
                    case "on_status":
                        const beforeConfirm = logs.filter(log => new Date(log?.request?.context?.timestamp) <= new Date(timestampConfirm) && log?.request?.context?.action === "on_status")
                        if (beforeConfirm[statusIndex]?.request)
                            return () => on_status(beforeConfirm[statusIndex++]?.request, givenTest.flow[index - 1].action);
                        return () => on_status({}, givenTest.flow[index - 1].action);
                    case "on_support":
                        if (particularLogs?.request)
                            return () => on_support(particularLogs.request);
                        return () => on_support();

                    default:
                        return null;
                }
            })
            .filter((item) => item != null);

        const onConfirmLog = logs.find((log) => log?.action === "on_confirm");
        const postOnConfirmLogs = logs?.filter((log) => (new Date(log?.request?.context?.timestamp) > new Date(onConfirmLog?.request?.context?.timestamp) && log?.request?.context?.action.startsWith("on_")));

        const postOnConfirmLogsToBeTested = [];
        // handling for post on_confirm scenario    
        postOnConfirmLogs?.map((log, index) => {
            const { test, isValidDiff } = index === 0 ? diff(log?.request, onConfirmLog?.request, givenTest?.id) : diff(log?.request, postOnConfirmLogs[index - 1]?.request, givenTest?.id);
            if (isValidDiff) {
                postOnConfirmLogsToBeTested.push({
                    log: log,
                    test: test
                })
            }
        })

        const testsAdded = [];
        postOnConfirmLogsToBeTested?.map((ele) => {
            const { log, test } = ele;
            const category = givenTest?.type;
            const testCaseId = `id: ${log.request.context.domain}_${category}_${log.action}_message_test_`;
            switch (test) {
                case "on_update_fulfillment":
                case "on_status_fulfillment":
                    testsAdded.push({
                        fn: () => on_updateFulfillment(log?.request),
                        test: test
                    });
                    break;
                case "on_update_sanctioned":
                    testsAdded.push({
                        fn: () => on_update(log?.request, testCaseId, "Sanctioned"),
                        test: test
                    });
                    break;
                case "on_status_sanctioned":
                    testsAdded.push({
                        fn: () => on_status(log?.request, testCaseId, "Sanctioned"),
                        test: test
                    });
                    break;
                case "on_update_disbursed":
                    testsAdded.push({
                        fn: () => on_update(log?.request, testCaseId, "Disbursed"),
                        test: test
                    });
                    break;
                case "on_status_disbursed":
                    testsAdded.push({
                        fn: () => on_status(log?.request, testCaseId, "Disbursed"),
                        test: test
                    });
                    break;
                case "on_update_foreclosure":
                    testsAdded.push({
                        fn: () => updateForeClosureTests(log?.request),
                        test: test
                    });
                    break;
                case "on_update_pre_part_payment":
                    testsAdded.push({
                        fn: () => prePartPaymentTests(log?.request, testCaseId),
                        test: test
                    });
                    break;
                case "on_update_missed_emi_payment":
                    testsAdded.push({
                        fn: () => missedEMIPaymentTests(log?.request, testCaseId),
                        test: test
                    });
                    break;
                default:
                    break;
            }
        });
        let prepartIndex = 0, foreclosureIndex = 0, missedEMIIndex = 0;
        givenTest?.flow?.map((currentStep, testCaseId) => {
            switch (currentStep?.test) {
                case "on_status_fulfillment":
                case "on_update_fulfillment":
                    switch (onConfirmLog?.request?.message?.order?.fulfillments[0]?.state?.descriptor?.code) {
                        case "DISBURSED":
                        case "SANCTIONED":
                            break;
                        case "INITIATED":
                            const fulfillmentTest = testsAdded?.find((it) => it?.test === "on_status_fulfillment" || it?.test === "on_update_fulfillment");
                            if (fulfillmentTest) {
                                testFunctions = [...testFunctions, fulfillmentTest?.fn];
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case "on_status_sanctioned":
                case "on_update_sanctioned":
                    switch (onConfirmLog?.request?.message?.order?.fulfillments[0]?.state?.descriptor?.code) {
                        case "DISBURSED":
                        case "SANCTIONED":
                            break;
                        case "INITIATED":
                            const sanctionedTest = testsAdded?.find((it) => it?.test === "on_status_sanctioned" || it?.test === "on_update_sanctioned");
                            if (sanctionedTest) {
                                testFunctions = [...testFunctions, sanctionedTest?.fn];
                            }
                            break;
                        default:
                            testFunctions = [...testFunctions, () => on_status({}, "Sanctioned")];
                            break;
                    }
                    break;
                case "on_status_disbursed":
                case "on_update_disbursed":
                    switch (onConfirmLog?.request?.message?.order?.fulfillments[0]?.state?.descriptor?.code) {
                        case "DISBURSED":
                            break;
                        case "SANCTIONED":
                            const disbursedTest = testsAdded?.find((it) => it?.test === "on_status_disbursed" || it?.test === "on_update_disbursed");

                            if (disbursedTest) {
                                testFunctions = [...testFunctions, disbursedTest?.fn];
                            } else {
                                testFunctions = [...testFunctions, () => on_status({}, "Disbursed")];
                            }
                            break;
                        case "INITIATED":
                            const testDisbursed = testsAdded?.find((it) => it?.test === "on_status_disbursed" || it?.test === "on_update_disbursed");
                            if (testDisbursed) {
                                testFunctions = [...testFunctions, testDisbursed?.fn];
                            } else {
                                testFunctions = [...testFunctions, () => on_status({}, "Disbursed")];
                            }
                            break;
                        default:
                            testFunctions = [...testFunctions, () => on_status({}, "Disbursed")];
                            break;
                    }
                    break;
                case "on_update_pre_part_payment":
                    const prePartPaymentTest = testsAdded.filter((it) => it?.test === "on_update_pre_part_payment");
                    if (prePartPaymentTest[prepartIndex]) {
                        testFunctions = [...testFunctions, prePartPaymentTest[prepartIndex++]?.fn];
                    } else {
                        testFunctions = [...testFunctions, () => prePartPaymentTests({})];
                    }
                    break;
                case "on_update_foreclosure":
                    const foreClosureTest = testsAdded.filter((it) => it?.test === "on_update_foreclosure");
                    if (foreClosureTest[foreclosureIndex]) {
                        testFunctions = [...testFunctions, foreClosureTest[foreclosureIndex++]?.fn];
                    } else {
                        testFunctions = [...testFunctions, () => updateForeClosureTests({})];
                    }
                    break;
                case "on_update_missed_emi_payment":
                    const missedEMITest = testsAdded.filter((it) => it?.test === "on_update_missed_emi_payment");
                    if (missedEMITest[missedEMIIndex]) {
                        testFunctions = [...testFunctions, missedEMITest[missedEMIIndex++]?.fn];
                    } else {
                        testFunctions = [...testFunctions, () => missedEMIPaymentTests({})];
                    }
                    break;
                default:
                    break;
            }
        })

        return testFunctions;
    } catch (err) {
        console.log(err);
        return err;
    }
}

function diff(currentLog, lastLog, testId) {
    try {
        const currentState = currentLog?.message?.order?.fulfillments[0]?.state?.descriptor?.code;
        const lastState = lastLog?.message?.order?.fulfillments[0]?.state?.descriptor?.code;
        switch (currentState) {
            case "CONSENT_REQUIRED":
                if (currentState !== lastState) {
                    return {
                        isValidDiff: true,
                        test: `${currentLog?.context?.action}_fulfillment`
                    }
                }
                break;
            case "DISBURSED":
                if (currentState !== lastState) {
                    return {
                        isValidDiff: true,
                        test: `${currentLog?.context?.action}_disbursed`
                    }
                } else {
                    switch (testId) {
                        case "PUR_3":
                            const isThereAnyPrePaymentObj = currentLog?.message?.order?.payments?.find((payment) => payment?.time?.label === "PRE_PART_PAYMENT");

                            if (isThereAnyPrePaymentObj && currentLog?.context?.action === "on_update") {
                                return {
                                    isValidDiff: true,
                                    test: `on_update_pre_part_payment`
                                }
                            }
                            break;
                        case "PUR_4":
                            const isAnyDelayedEMI = currentLog?.message?.order?.payments?.find((payment) => payment?.status === "DELAYED");
                            const isThereAnyMissedEMIObj = currentLog?.message?.order?.payments?.find((payment) => payment?.time?.label === "MISSED_EMI_PAYMENT");

                            if (isAnyDelayedEMI && isThereAnyMissedEMIObj && currentLog?.context?.action === "on_update") {
                                return {
                                    isValidDiff: true,
                                    test: "on_update_missed_emi_payment"
                                }
                            }

                            if (isAnyDelayedEMI && currentLog?.context?.action === "on_update") {
                                return {
                                    isValidDiff: true,
                                    test: "on_update_missed_emi_payment"
                                }
                            }
                            break;
                        case "PUR_5":
                        case "PUR_6":
                            const isThereAnyForeClosureObj = currentLog?.message?.order?.payments?.find((payment) => payment?.time?.label === "FORECLOSURE");

                            if (isThereAnyForeClosureObj && currentLog?.context?.action === "on_update") {
                                return {
                                    isValidDiff: true,
                                    test: `on_update_foreclosure`
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
                break;
            case "COMPLETED":
                const isThereAnyForeClosureObj = currentLog?.message?.order?.payments?.find((payment) => payment?.time?.label === "FORECLOSURE");

                if (isThereAnyForeClosureObj && currentLog?.context?.action === "on_update") {
                    return {
                        isValidDiff: true,
                        test: `on_update_foreclosure`
                    }
                }
                break;
            case "SANCTIONED":
                if (currentState !== lastState) {
                    return {
                        isValidDiff: true,
                        test: `${currentLog?.context?.action}_sanctioned`
                    }
                }
                break;
            default:
                break;
        }

        return {
            isValidDiff: false,
            test: "no_test"
        }
    } catch (err) {
        console.log(err);
    }
}
