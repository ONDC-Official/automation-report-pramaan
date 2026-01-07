const { confirm, select, init, search, cancel, update, status } = require("./index");

const romanIndex = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
};

const searchIndex = {
  search_one: 0,
  search_two: 1,
  search_three: 2,
  search_four: 3
}

module.exports = function testRunnerHotelBooking(givenTest, logs) {
  try {
    const testFunctions = givenTest.flow
      .map((currentStep) => {
        let particularLogs;
        const type = givenTest?.type;
        const flowId = givenTest?.id;
        const constants = {
          version: "2.0.0",
          flow: flowId,
          type: type,
          step: currentStep.test,
          action: currentStep.action
        }

        switch (currentStep.action) {
          case "search":
            particularLogs = logs.filter(
              (log) => log.action === currentStep.action
            );
            break;
          case "select":
          case "init":
          case "confirm":
          case "status":
          case "update":
          case "cancel":
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

        // const testCaseId = `id: ${domain}_${category}_${currentStep.action}_message_test_`;
        const testCaseId = `id: hotel_log_bpp_${currentStep.action}_message_test_`;

        switch (currentStep.test) {
          case "search_one":
          case "search_two":
          case "search_three":
          case "search_four":
            if (particularLogs[searchIndex[currentStep.test]]?.request)
              return () => search(particularLogs[searchIndex[currentStep.test]]?.request, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
            return () => search({}, romanIndex[searchIndex[currentStep.test] + 1], logs, constants);
          case "select":
            if (particularLogs?.request)
              return () => select(particularLogs?.request, logs, constants);
            return () => select({}, logs, constants);
          case "init":
            if (particularLogs?.request)
              return () => init(particularLogs?.request, testCaseId, logs, constants);
            return () => init({}, testCaseId, logs, constants);
          case "confirm":
            if (particularLogs?.request)
              return () => confirm(particularLogs?.request, testCaseId, logs, constants);
            return () => confirm({}, testCaseId, logs, constants);
          case "status":
            if (particularLogs?.request)
              return () => status(particularLogs?.request);
            return () => status();
          case "update":
            if (particularLogs?.request)
              return () => update(particularLogs?.request);
            return () => update();
          case "cancel":
            if (particularLogs?.request)
              return () => cancel(particularLogs?.request);
            return () => cancel();
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
