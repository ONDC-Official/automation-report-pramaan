const {
  on_search,
  on_select,
  on_init,
  on_confirm,
  on_cancel,
  on_update,
} = require("./index");

const {
  calculateSettlementAmount,
  calculateSettlementAmountMobility,
} = require("../helper/utils");

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
  on_init_initiate_drawdown: 4,
  on_init_upload_invoice: 5
};

const confirmIndex = {
  on_confirm: 0,
  on_confirm_drawdown: 1
};

const updateIndex = {
  on_update_one: 0,
  on_update_two: 1,
  on_update_three: 2,
  on_update_four: 3,
  on_update_completion_of_disbursal: 0,
  on_update_update_base_transaction: 1,
  on_update_missed_emi: 2,
  on_update_missed_emi_paid: 3,
  on_update_update_base_transaction_final: 4
};


// const cancelIndex = {
//     on_cancel_one: 0,
//     on_cancel_two: 1
// };

module.exports = function testRunnerWorkingCapital(givenTest, logs) {
  try {
    const flowId = givenTest?.id;
    let statusIndex = 0;

    // Create test functions based on the given test flow
    const testFunctions = givenTest.flow
      .map((currentStep) => {
        let particularLogs;
        const flowId = givenTest?.id;
        const type= givenTest?.type;
        const constants = {
          flow: flowId,
          type: type,
          step: currentStep.test,
          action: currentStep.action
        }
        switch (currentStep.action) {
          case "on_cancel":
            particularLogs = logs.find(
              (log) => log.action === currentStep.action
            );
            break;
          case "on_search":
          case "on_select":
          case "on_init":
          case "on_confirm":
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
        // const testCaseId = `id: ${domain}_${category}_${currentStep.action}_message_test_`;
        const testCaseId = `id: wc_log_bpp_${currentStep.action}_message_test_`;

        switch (currentStep.test) {
          case "on_search_one":
          case "on_search_two":
          case "on_search_three":
            if (particularLogs[searchIndex[currentStep.test]]?.request)
              return () => on_search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], flowId, logs,constants);
            return () => on_search({}, romanIndex[searchIndex[currentStep.test] + 1], flowId, logs,constants);
          case "on_select_one":
          case "on_select_two":
          case "on_select_three":
            if (particularLogs[selectIndex[currentStep.test]]?.request)
              return () => on_select(particularLogs[selectIndex[currentStep.test]]?.request, romanIndex[selectIndex[currentStep.test] + 1], flowId, logs,constants);
            return () => on_select({}, romanIndex[selectIndex[currentStep.test] + 1], flowId, logs,constants);
          case "on_init_one":
          case "on_init_two":
          case "on_init_three":
          case "on_init_four":
            if (particularLogs[initIndex[currentStep.test]]?.request)
              return () => on_init(particularLogs[initIndex[currentStep.test]]?.request, romanIndex[initIndex[currentStep.test] + 1], flowId, logs,constants);
            return () => on_init({}, romanIndex[initIndex[currentStep.test] + 1], flowId, logs,constants);
          case "on_init_initiate_drawdown":
          case "on_init_upload_invoice":
            if (particularLogs[initIndex[currentStep.test]]?.request)
              return () => on_init(particularLogs[initIndex[currentStep.test]]?.request, currentStep.test, flowId, logs,constants);
            return () => on_init({}, currentStep.test, flowId, logs,constants);
          case "on_confirm":
          case "on_confirm_drawdown":
            if (particularLogs[confirmIndex[currentStep.test]]?.request)
              return () => on_confirm(particularLogs[confirmIndex[currentStep.test]]?.request, currentStep.test, logs,constants);
            return () => on_confirm({}, currentStep.test, logs,constants);
          case "on_update_one":
          case "on_update_two":
          case "on_update_three":
          case "on_update_four":
            if (particularLogs[updateIndex[currentStep.test]]?.request)
              return () => on_update(particularLogs[updateIndex[currentStep.test]].request, romanIndex[updateIndex[currentStep.test] + 1], testCaseId, logs);
            return () => on_update({}, romanIndex[updateIndex[currentStep.test] + 1], testCaseId, logs);
          case "on_update_completion_of_disbursal":
          case "on_update_update_base_transaction":
          case "on_update_missed_emi":
          case "on_update_missed_emi_paid":
          case "on_update_update_base_transaction_final":
            if (particularLogs[updateIndex[currentStep.test]]?.request)
              return () => on_update(particularLogs[updateIndex[currentStep.test]].request, currentStep.test, testCaseId, logs);
            return () => on_update({}, currentStep.test, testCaseId, logs);
          case "on_cancel":
            if (particularLogs?.request)
              return () => on_cancel(particularLogs?.request, logs);
            return () => on_cancel({}, logs);
          default:
            return null;
        }
      }).filter((item) => item != null);

    return testFunctions;
  } catch (error) {
    console.log(error);
    return error;
  }
};
