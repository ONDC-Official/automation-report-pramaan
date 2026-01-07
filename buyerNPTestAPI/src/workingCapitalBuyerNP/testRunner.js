
const { search, select, init, confirm, update, cancel } = require("./index");

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
  search_one: 0,
  search_two: 1,
  search_three: 2,
};

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
  init_initiate_drawdown: 4,
  init_upload_invoice: 5,
};

const confirmIndex = {
  confirm_one: 0,
  confirm_drawdown: 1,
}

const updateIndex = {
  update: 0,
  update_one: 0,
  update_two: 1,
  update_three: 2,
  update_four: 3,
  update_missed_emi: 0,
  update_foreclosure: 0,
  update_pre_part_payment: 0,
};

module.exports = function testRunnerWorkingCapital(givenTest, logs) {
  try {
    // Create test functions based on the given test flow
    const testFunctions = givenTest.flow
      .map((currentStep) => {
        let particularLogs;
        const type = givenTest?.type;
        const flowId = givenTest?.id;
        const constants = {
          flow: flowId,
          version:"2.3.0",
          type: type,
          step: currentStep.test,
          action: currentStep.action
        }
        
        switch (currentStep.action) {
          case "cancel":
            particularLogs = logs.find((log) => log.action === currentStep.action);
            break;
          case "search":
          case "select":
          case "init":
          case "confirm":
          case "update":
          case "status":
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
        const testCaseId = `id: wc_log_bap_${currentStep.action}_message_test_`;
        //console.log(`Current Step:`, currentStep.test);
        // console.log(`Looking up index:`, initIndex[currentStep.test]);
        // console.log(`Roman index lookup:`, romanIndex[initIndex[currentStep.test] + 1]);
        switch (currentStep.test) {
          case "search_one":
          case "search_two":
          case "search_three":
            if (particularLogs[searchIndex[currentStep.test]]?.request)
              return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], logs,constants);
            return () => search({}, romanIndex[searchIndex[currentStep.test] + 1], logs,constants);

          case "select_one":
          case "select_two":
          case "select_three":
            if (particularLogs[selectIndex[currentStep.test]]?.request)
              return () => select(particularLogs[selectIndex[currentStep.test]]?.request, romanIndex[selectIndex[currentStep.test] + 1], logs,constants);
            return () => select({}, romanIndex[selectIndex[currentStep.test] + 1], logs,constants);

          case "init_one":
          case "init_two":
          case "init_three":
          case "init_four":
            if (particularLogs[initIndex[currentStep.test]]?.request)
              return () => init(particularLogs[initIndex[currentStep.test]]?.request, romanIndex[initIndex[currentStep.test] + 1], testCaseId, logs,constants);
            return () => init({}, romanIndex[initIndex[currentStep.test] + 1], testCaseId, logs,constants);

          case "init_initiate_drawdown":
          case "init_upload_invoice":
            if (particularLogs[initIndex[currentStep.test]]?.request)
              return () => init(particularLogs[initIndex[currentStep.test]]?.request, currentStep.test, testCaseId, logs,constants);
            return () => init({}, currentStep.test, testCaseId, logs,constants);

          case "confirm_one":
          case "confirm_drawdown":
            if (particularLogs[confirmIndex[currentStep.test]]?.request)
              return () => confirm(particularLogs[confirmIndex[currentStep.test]]?.request, romanIndex[confirmIndex[currentStep.test] + 1], testCaseId, logs,constants);
            return () => confirm({}, romanIndex[confirmIndex[currentStep.test] + 1], testCaseId, logs,constants);

          case "update":
          case "update_missed_emi":
          case "update_pre_part_payment":
            if (particularLogs[updateIndex[currentStep.test]]?.request)
              return () => update(particularLogs[updateIndex[currentStep.test]]?.request, romanIndex[updateIndex[currentStep.test] + 1], testCaseId);
            return () => update({}, romanIndex[updateIndex[currentStep.test] + 1], testCaseId);

          case "cancel_one":
            if (particularLogs?.request)
              return () => cancel(particularLogs?.request);
            return () => cancel({});

          default:
            return null;
        }
      })
      .filter((item) => item != null);

    return testFunctions;
  } catch (error) {
    console.log(error);
    return error;
  }
};
