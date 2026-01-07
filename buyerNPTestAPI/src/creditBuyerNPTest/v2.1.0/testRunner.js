const {
    search,
    select,
    init,
    confirm,
    status,
    support,
    update_foreClosure,
    update_fulfillment,
    update_missed_emi_payment,
    update_pre_part_payment,
} = require("./index");

const { calculateSettlementAmount } = require("../../helper/utils");


const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};

const selectReIndex = {
    select_re_one: 3,
    select_re_two: 4
}

const searchIndex = {
    search_one: 0,
    search_two: 1,
    search_three: 2
}

const selectIndex = {
    select_one: 0,
    select_two: 1,
    select_three: 2,
};

const initIndex = {
    init_one: 0,
    init_two: 1,
    init_three: 2,
    init_four: 3,
};

module.exports = function testRunner(givenTest, logs, aa_mandatory = true) {
    try {
        let searchLogIndex = aa_mandatory ? 0 : 1;

        let statusIndex = 0;
        let updateIndex = 0;

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
                    case "confirm":
                    case "support":
                        particularLogs = logs.find((log) => log.action === currentStep.action);
                        break;
                    case "search":
                    case "select":
                    case "init":
                    case "update":
                    case "status":
                        particularLogs = logs.filter(
                            (log) => log.action === currentStep.action
                        );
                        break;
                    default:
                        break;
                }

                let settlementAmount;
                const finalOfferSelect = logs.filter(log => log.action === "on_select").pop();
                switch (currentStep?.test) {
                    case "init_one":
                    case "init_two":
                    case "init_three":
                    case "init_four":
                        const init_log = logs.filter(log => log.action === "init");
                        if (init_log.length > 1) {
                            settlementAmount = calculateSettlementAmount(init_log[initIndex[currentStep.test]]?.request?.message?.order?.payments.find(payment => payment?.tags), finalOfferSelect?.request?.message?.order?.quote, finalOfferSelect?.request?.message?.order?.items)
                        }
                        break;
                    case "confirm":
                        const init_log_for_confirm = logs.filter(log => log.action === "init");
                        if (init_log_for_confirm.length > 1) {
                            settlementAmount = calculateSettlementAmount(init_log_for_confirm[init_log_for_confirm.length - 1]?.request?.message?.order?.payments.find(payment => payment?.tags), finalOfferSelect?.request?.message?.order?.quote, finalOfferSelect?.request?.message?.order?.items)
                        }
                }

                let previous_on_init_payment_id;
                switch (currentStep?.test) {
                    case "init_one":
                        break;
                    case "init_two":
                    case "init_three":
                    case "init_four":
                        const on_init_log_for_inits = logs.filter(log => log.action === "on_init");
                        if (on_init_log_for_inits.length > 1) {
                            previous_on_init_payment_id = on_init_log_for_inits[initIndex[currentStep.test] - 1]?.request?.message?.order?.payments.find(payment => payment?.tags)?.id;
                        }
                        break;
                    case "confirm":
                        const on_init_log_for_confirm = logs.filter(log => log.action === "on_init");
                        if (on_init_log_for_confirm.length > 1) {
                            previous_on_init_payment_id = on_init_log_for_confirm[on_init_log_for_confirm.length - 1]?.request?.message?.order?.payments.find(payment => payment?.tags)?.id;
                        }
                }

                switch (currentStep.test) {
                    case "search_one":
                        if (particularLogs[searchIndex[currentStep.test]]?.request)
                            return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], logs,constants);
                        return () => search({}, romanIndex[searchIndex[currentStep.test] + 1],logs,constants);
                    case "search_two":
                        if (aa_mandatory) {
                            if (particularLogs[searchIndex[currentStep.test]]?.request)
                                return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], logs,constants);
                            return () => search({}, romanIndex[searchIndex[currentStep.test] + 1],logs,constants);
                        }
                    case "search_three":
                        if (particularLogs[searchIndex[currentStep.test] - searchLogIndex]?.request)
                            return () => search(particularLogs[searchIndex[currentStep.test] - searchLogIndex]?.request, romanIndex[searchIndex[currentStep.test] + 1 - searchLogIndex], logs,constants);
                        return () => search({}, romanIndex[searchIndex[currentStep.test] + 1 - searchLogIndex],logs,constants);
                    case "select_one":
                    case "select_two":
                        if (particularLogs[selectIndex[currentStep.test]]?.request)
                            return () => select(particularLogs[selectIndex[currentStep.test]]?.request, romanIndex[selectIndex[currentStep.test] + 1], logs,constants);
                        return () => select({}, romanIndex[selectIndex[currentStep.test] + 1],logs,constants);
                    case "select_re_one":
                    case "select_re_two":
                        if (particularLogs[selectReIndex[currentStep.test] - 1]?.request)
                            return () => select(particularLogs[selectReIndex[currentStep.test] - 1]?.request, romanIndex[selectReIndex[currentStep.test]], logs,constants);
                        return () => select({}, romanIndex[selectReIndex[currentStep.test]],logs,constants);
                    case "init_one":
                    case "init_two":
                    case "init_three":
                    case "init_four":
                        if (particularLogs[initIndex[currentStep.test]]?.request)
                            return () => init(particularLogs[initIndex[currentStep.test]]?.request, romanIndex[initIndex[currentStep.test] + 1], previous_on_init_payment_id, settlementAmount, logs,constants);
                        return () => init({}, romanIndex[initIndex[currentStep.test] + 1],logs,constants);
                    case "confirm":
                        if (particularLogs?.request)
                            return () => confirm(particularLogs?.request, previous_on_init_payment_id, settlementAmount, logs,constants);
                        return () => confirm({},logs,constants);
                    case "status":
                        if (particularLogs[statusIndex]?.request)
                            return () => status(particularLogs[statusIndex++]?.request, logs);
                        return () => status();
                    case "support":
                        if (particularLogs?.request)
                            return () => support(particularLogs?.request, logs);
                        return () => status();
                    case "update_fulfillment":
                        if (aa_mandatory) {
                            if (particularLogs[updateIndex]?.request && particularLogs[updateIndex]?.request?.message?.update_target === "fulfillment")
                                return () => update_fulfillment(particularLogs[updateIndex++]?.request, logs);
                            return () => update_fulfillment();
                        }
                        return null;
                    case "update_pre_part_payment":
                        if (particularLogs[updateIndex]?.request)
                            return () => update_pre_part_payment(particularLogs[updateIndex++]?.request, logs);
                        return () => update_pre_part_payment();
                    case "update_missed_emi_payment":
                        if (particularLogs[updateIndex]?.request)
                            return () => update_missed_emi_payment(particularLogs[updateIndex++]?.request, logs);
                        return () => update_missed_emi_payment();
                    case "update_foreclosure":
                        if (particularLogs[updateIndex]?.request)
                            return () => update_foreClosure(particularLogs[updateIndex++]?.request, logs);
                        return () => update_foreClosure();
                    default:
                        return null;
                }
            })
            .filter((item) => item != null);

        return testFunctions;
    } catch (err) {
        console.log(err);
        return err;
    }
}


