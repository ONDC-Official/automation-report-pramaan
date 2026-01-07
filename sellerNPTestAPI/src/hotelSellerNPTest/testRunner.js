const {
  on_confirm,
  on_select,
  on_init,
  on_search,
  on_status,
  on_update,
  on_cancel,
} = require("./index");

const romanIndex = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
};

const on_searchIndex = {
  on_search_one: 0,
  on_search_two: 1,
  on_search_three: 2,
  on_search_four: 3,
};

module.exports = function testRunnerHotelBooking(givenTest, logs) {
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
          case "on_search":
            particularLogs = logs.filter(
              (log) => log.action === currentStep.action
            );
            break;
          case "on_select":
          case "on_init":
          case "on_confirm":
          case "on_status":
          case "on_update":
          case "on_cancel":
            particularLogs = logs.find(
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
        const testCaseId = `id: hotel_log_bpp_${currentStep.action}_message_test_`;

        switch (currentStep.test) {
          case "on_search_one":
          case "on_search_two":
          case "on_search_three":
          case "on_search_four":
            if (particularLogs[on_searchIndex[currentStep.test]]?.request)
              return () =>
                on_search(
                  particularLogs[on_searchIndex[currentStep.test]]?.request,
                  romanIndex[on_searchIndex[currentStep.test] + 1], logs);
            return () =>
              on_search({}, romanIndex[on_searchIndex[currentStep.test] + 1], logs,constants);
          case "on_select":
            if (particularLogs?.request)
              return () => on_select(particularLogs?.request,  "", testCaseId,logs,constants);
            return () => on_select({}, "", testCaseId,logs,constants);
          case "on_init":
            if (particularLogs?.request)
              return () => on_init(particularLogs?.request,  "", testCaseId,logs,constants);
            return () => on_init({},  "", testCaseId,logs,constants);
          case "on_confirm":
            if (particularLogs?.request)
              return () => on_confirm(particularLogs?.request,  "", testCaseId,logs,constants);
            return () => on_confirm({},  "", testCaseId,logs,constants);
          case "on_status":
            if (particularLogs?.request)
              return () => on_status(particularLogs?.request, logs, "", testCaseId);
            return () => on_status({}, logs, "", testCaseId);
          case "on_update":
            if (particularLogs?.request)
              return () => on_update(particularLogs?.request, logs, "", testCaseId);
            return () => on_update({}, logs, "", testCaseId);
          case "on_cancel":
            if (particularLogs?.request)
              return () => on_cancel(particularLogs?.request);
            return () => on_cancel();

          default:
            return null;
        }
      })
      .filter((item) => item != null);

    return testFunctions;
  } catch (err) {
    console.log(err);
  }
};
