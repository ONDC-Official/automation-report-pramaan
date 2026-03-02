const path = require("path");
const fs = require("fs");


const CREDIT_MOBILITY_FLOWS = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "../config/flow.json"),
    "utf8"
));

const RETAIL_LOGISTICS_FLOWS = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "../config/retailLogisticsFlows.json"),
    "utf8"
));

const RETAIL_MERGED_FLOWS = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "../config/mergedFlows.json"),
    "utf8"
));

const SEGREGATED_FLOWS = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "../config/segregatedFlows.json"),
    "utf8"
));

module.exports = {
    FLOWS: [...CREDIT_MOBILITY_FLOWS, ...RETAIL_LOGISTICS_FLOWS, ...RETAIL_MERGED_FLOWS, ...SEGREGATED_FLOWS]
}