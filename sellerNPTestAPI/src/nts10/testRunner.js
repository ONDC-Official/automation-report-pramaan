const { on_recon, recon } = require("./index");


const romanIndex = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
};


module.exports = function testRunner(givenTest, logs) {
    try {
        let reconIndex = 0;
        let reconLogs;

        const version = "2.0.0";
        const testFunctions = givenTest.flow
            .map((currentStep) => {
                switch (currentStep.test) {
                    case "recon":
                        reconLogs = logs.filter((log) => log?.action === currentStep.action);
                        if (reconLogs && reconLogs[reconIndex]?.request)
                            return () => recon(reconLogs[reconIndex++]?.request, "recon", version);
                        return () => recon({}, "recon");
                    case "on_recon":
                        reconLogs = logs.filter((log) => log?.action === currentStep.action);
                        if (reconLogs && reconLogs[reconIndex]?.request)
                            return () => on_recon(reconLogs[reconIndex++]?.request, "on_recon", version);
                        return () => on_recon({}, "on_recon");
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


