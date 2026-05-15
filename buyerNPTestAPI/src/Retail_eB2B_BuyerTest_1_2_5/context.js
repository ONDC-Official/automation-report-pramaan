
/** importing context Schema */
const schema = require("./schema/context.schema");
const { contextTests } = require("../centralizedUtilities/utilityFunctions");
const { expect } = require("chai");


module.exports = function contextTestsGenerator(context, constants, logs) {
    return contextTests(context, constants, logs, schema);
}