const Mocha = require("mocha");
const contextTests = require("./context");
const on_confirmSchema = require("./schema/on_confirm.schema");
const { generateTests } = require("./common");
const response_verification = require("../centralizedUtilities/responseVerification");

function on_confirmMessageTests({ context, message } = {}, constants = {}) {
    try {
        // generating the tests using recursive methods
        const messageTestSuite = generateTests({ context, message }, on_confirmSchema, "Verification of Message for on_confirm", constants);
        return messageTestSuite;
    } catch (err) {
        console.log(err);
    }
}

const stepMap = {
    on_confirm: "Credit Line Assigned",
    on_confirm_drawdown: "Credit Line Drawdown"
}

module.exports = async function on_confirm({ context, message } = {}, step = "", logs = [],constants = {}) {
    try {
        const testSuite = new Mocha.Suite(`on_confirm (${stepMap[step]}) request verification`);
        const responseTestSuite = response_verification({ context, message }, logs,constants);
        

        testSuite.addSuite(contextTests(context, constants, logs));
        testSuite.addSuite(on_confirmMessageTests({ context, message }, constants));

         return [testSuite,responseTestSuite];
    } catch (err) {
        console.log(err);
    }
}
