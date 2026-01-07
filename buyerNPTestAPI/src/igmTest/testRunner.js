const { issue, issue_status, issue_close } = require("./index");


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
                    case "issue_open":
                        issueLogs = logs.filter((log) => log?.action === currentStep.action);
                        if (issueLogs && issueLogs[issueIndex]?.request)
                            return () => issue(issueLogs[issueIndex++]?.request, "issue_open", type_of_loan, version, logs, domain);
                        return () => issue({}, "issue_open", logs, domain);
                    case "issue_status":
                        const issueStatusLogs = logs.filter((log) => log?.action === currentStep.action);
                        if (issueStatusLogs[statusIndex]?.request)
                            return () => issue_status(issueStatusLogs[statusIndex++]?.request, romanIndex[statusIndex], version, domain);
                        return () => issue_status({}, romanIndex[statusIndex], domain)
                    case "issue_close":
                        if (issueLogs && issueLogs[issueIndex]?.request)
                            return () => issue_close(issueLogs[issueIndex++]?.request, "issue_close", type_of_loan, version, domain);
                        return () => issue_close({}, "issue_close", domain);
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


