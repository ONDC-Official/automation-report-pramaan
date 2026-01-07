const { on_issue, on_issue_status } = require("./index");


const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VIII"
};


module.exports = function testRunnerV2(givenTest, version, domain, logs) {
    try {
        let statusIndex = 0;
        let issueIndex = 0;

        const testFunctions = givenTest.flow
            .map((currentStep) => {
                const requestLogs = logs?.filter((log) => log?.action === currentStep?.action);

                switch (currentStep.test) {
                    case "on_issue_open":
                    case "on_issue_need_more_information":
                    case "on_issue_processing":
                    case "on_issue_resolution_option":
                    case "on_issue_resolution_provided":
                    case "on_issue_escalation_processing":
                        if (requestLogs && requestLogs[issueIndex]?.request)
                            return () => on_issue(requestLogs[issueIndex++]?.request, currentStep.test, version, domain);
                        return () => on_issue({}, currentStep.test, version, domain);
                    case "on_issue_status":
                        const issueStatusLogs = logs.filter((log) => log?.action === currentStep.action);
                        if (issueStatusLogs[statusIndex]?.request)
                            return () => on_issue_status(issueStatusLogs[statusIndex++]?.request, romanIndex[statusIndex], version, domain);
                        return () => on_issue_status({}, romanIndex[statusIndex], version, domain);
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


