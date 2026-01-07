const { issue, issue_status } = require("./index");

const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII"
};

module.exports = function testRunner(givenTest, version, domain, logs) {
    try {
        let statusIndex = 0;
        let issueIndex = 0;
        const testFunctions = givenTest.flow
            .map((currentStep) => {
                const requestLogs = logs?.filter((log) => log?.action === currentStep?.action);

                switch (currentStep.test) {
                    case "issue_open":
                    case "issue_provide_more_information":
                    case "issue_select_resolution_option":
                    case "issue_escalate":
                    case "issue_close":
                        if (requestLogs && requestLogs[issueIndex]?.request)
                            return () => issue(requestLogs[issueIndex++]?.request, currentStep.test, version, domain);
                        return () => issue({}, currentStep.test, version, domain);

                    case "issue_status":
                        const issueStatusLogs = logs.filter((log) => log?.action === currentStep.action);
                        if (issueStatusLogs[statusIndex]?.request)
                            return () => issue_status(issueStatusLogs[statusIndex++]?.request, romanIndex[statusIndex], version, domain);
                        return () => issue_status({}, romanIndex[statusIndex], version, domain);

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
};
