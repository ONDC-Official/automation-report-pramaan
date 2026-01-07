const { on_issue, on_issue_status } = require("./index");


const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};


module.exports = function testRunner(givenTest, logs, version, domain, type_of_loan) {
    try {
        let statusIndex = 0;
        let issueIndex = 0;

        let issueLogs;
        const testFunctions = givenTest.flow
            .map((currentStep) => {
                switch (currentStep.test) {
                    case "on_issue_open":
                        issueLogs = logs.filter((log) => log?.action === currentStep.action);
                        if (issueLogs && issueLogs[issueIndex]?.request)
                            return () => on_issue(issueLogs[issueIndex++]?.request, "issue_open", type_of_loan, version, domain);
                        return () => on_issue({}, "issue_open");
                    case "on_issue_status":
                    case "on_issue_status_two":
                        const issueStatusLogs = logs.filter((log) => log?.action === currentStep.action);
                        if (issueStatusLogs && issueStatusLogs[statusIndex]?.request)
                            return () => on_issue_status(issueStatusLogs[statusIndex++]?.request, romanIndex[statusIndex], version, domain);
                        return () => on_issue_status({}, romanIndex[statusIndex]);

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


