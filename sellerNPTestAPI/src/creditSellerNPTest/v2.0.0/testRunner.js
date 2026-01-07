const {
    on_search,
    on_select,
    on_init,
    on_confirm,
    on_status,
    on_support,
    on_updateForeClosure,
    on_updateFulfillment,
    on_updateMissedEmiPayment,
    on_updatePrePartPayment
} = require("../v2.0.0/index");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};

const selectIndex = {
    on_select_one: 0,
    on_select_two: 1,
    on_select_three: 2,
};

const initIndex = {
    on_init_one: 0,
    on_init_two: 1,
    on_init_three: 2,
    on_init_four: 3,
};

module.exports = function testRunner(givenTest, logs, queries, aa_mandatory) {
    try {
        let statusIndex = 0;
        let selectCount = aa_mandatory ? 0 : 1;

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
                    case "on_search":
                    case "on_confirm":
                    case "on_support":
                        particularLogs = logs.find(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    case "on_select":
                    case "on_init":
                    case "on_status":
                        particularLogs = logs.filter(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    default:
                        break;
                }

                let timestampConfirm = logs.filter(log => log.action === 'confirm').pop()?.request?.context?.timestamp;
                if (!timestampConfirm) {
                    timestampConfirm = new Date();
                }

                let select;
                switch (currentStep.test) {
                    case "on_search":
                        const search = logs.filter(log => log.action === currentStep.action)?.pop();
                        if (search)
                            return () => on_search(search?.request, logs,constants);
                        return () => on_search({}, logs,constants);
                    case "on_select_one":
                        select = logs.filter(log => log.action === currentStep.action)?.[selectIndex[currentStep.test]]
                        if (select?.request)
                            return () => on_select(select?.request, romanIndex[selectIndex[currentStep.test] + 1],  aa_mandatory,logs,constants);
                        return () => on_select({}, romanIndex[selectIndex[currentStep.test] + 1],  aa_mandatory,logs,constants);
                    case "on_select_three":
                        select = logs.filter(log => log.action === currentStep.action)?.[selectIndex[currentStep.test] - selectCount]
                        if (select?.request)
                            return () => on_select(select?.request, romanIndex[selectIndex[currentStep.test] + 1 - selectCount], aa_mandatory,logs,constants);
                        return () => on_select({}, romanIndex[selectIndex[currentStep.test] + 1 - selectCount], aa_mandatory,logs,constants);
                    case "on_select_two":
                        if (aa_mandatory) {
                            select = logs.filter(log => log.action === currentStep.action)?.[selectIndex[currentStep.test]]
                            if (select?.request)
                                return () => on_select(select?.request, romanIndex[selectIndex[currentStep.test] + 1], aa_mandatory,logs,constants);
                            return () => on_select({}, romanIndex[selectIndex[currentStep.test] + 1], aa_mandatory,logs,constants);
                        }
                        return null;
                    case "on_init_one":
                    case "on_init_two":
                    case "on_init_three":
                    case "on_init_four":
                        const init = logs.filter(log => log.action === currentStep.action)?.[initIndex[currentStep.test]]
                        if (init?.request)
                            return () => on_init(init?.request, romanIndex[initIndex[currentStep.test] + 1], logs,constants);
                        return () => on_init({}, romanIndex[initIndex[currentStep.test] + 1], logs,constants);
                    case "on_confirm":
                        const confirm = logs.filter(log => log.action === currentStep.action)?.pop();
                        if (confirm?.request)
                            return () => on_confirm(confirm?.request, amount, givenTest?.id, logs,constants);
                        return () => on_confirm({}, amount, givenTest?.id, logs,constants);
                    case "on_status":
                        const beforeConfirm = logs.filter(log => new Date(log?.request?.context?.timestamp) <= new Date(timestampConfirm) && log?.request?.context?.action === "on_status")
                        if (beforeConfirm[statusIndex]?.request)
                            return () => on_status(beforeConfirm[statusIndex++]?.request, givenTest.flow[index - 1].action, aa_mandatory);
                        return () => on_status({}, givenTest.flow[index - 1].action, aa_mandatory);
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
            switch (test) {
                case "on_update_fulfillment":
                case "on_status_fulfillment":
                    testsAdded.push({
                        fn: () => on_updateFulfillment(log?.request),
                        test: test
                    });
                    break;
                case "on_update_sanctioned":
                case "on_status_sanctioned":
                    testsAdded.push({
                        fn: () => on_status(log?.request, "Sanctioned"),
                        test: test
                    });
                    break;
                case "on_update_disbursed":
                case "on_status_disbursed":
                    testsAdded.push({
                        fn: () => on_status(log?.request, "Disbursed"),
                        test: test
                    });
                    break;
                case "on_update_foreclosure":
                    testsAdded.push({
                        fn: () => on_updateForeClosure(log?.request),
                        test: test
                    });
                    break;
                case "on_update_pre_part_payment":
                    testsAdded.push({
                        fn: () => on_updatePrePartPayment(log?.request),
                        test: test
                    });
                    break;
                case "on_update_missed_emi_payment":
                    testsAdded.push({
                        fn: () => on_updateMissedEmiPayment(log?.request),
                        test: test
                    });
                    break;
                default:
                    break;
            }
        });

        let prepartIndex = 0, foreclosureIndex = 0, missedEMIIndex = 0;
        givenTest?.flow?.map((currentStep) => {
            switch (currentStep?.test) {
                case "on_status_fulfillment":
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
                        testFunctions = [...testFunctions, () => on_updatePrePartPayment({})];
                    }
                    break;
                case "on_update_foreclosure":
                    const foreClosureTest = testsAdded.filter((it) => it?.test === "on_update_foreclosure");
                    if (foreClosureTest[foreclosureIndex]) {
                        testFunctions = [...testFunctions, foreClosureTest[foreclosureIndex++]?.fn];
                    } else {
                        testFunctions = [...testFunctions, () => on_updateForeClosure({})];
                    }
                    break;
                case "on_update_missed_emi_payment":
                    const missedEMITest = testsAdded.filter((it) => it?.test === "on_update_missed_emi_payment");
                    if (missedEMITest[missedEMIIndex]) {
                        testFunctions = [...testFunctions, missedEMITest[missedEMIIndex++]?.fn];
                    } else {
                        testFunctions = [...testFunctions, () => on_updateMissedEmiPayment({})];
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
                        case "CRD_3":
                            const isThereAnyPrePaymentObj = currentLog?.message?.order?.payments?.find((payment) => payment?.time?.label === "PRE_PART_PAYMENT");

                            if (isThereAnyPrePaymentObj && currentLog?.context?.action === "on_update") {
                                return {
                                    isValidDiff: true,
                                    test: `on_update_pre_part_payment`
                                }
                            }
                            break;
                        case "CRD_4":
                            const isAnyDelayedEMI = currentLog?.message?.order?.payments?.find((payment) => payment?.status === "DELAYED");
                            const isThereAnyMissedEMIObj = currentLog?.message?.order?.payments?.find((payment) => payment?.time?.label === "MISSED_EMI_PAYMENT");

                            if (isAnyDelayedEMI && isThereAnyMissedEMIObj && currentLog?.context?.action === "on_update") {
                                return {
                                    isValidDiff: true,
                                    test: `on_update_missed_emi_payment`
                                }
                            }

                            if (isAnyDelayedEMI && currentLog?.context?.action === "on_update") {
                                return {
                                    isValidDiff: true,
                                    test: `on_update_missed_emi_payment`
                                }
                            }
                            break;
                        case "CRD_5":
                        case "CRD_6":
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