const routes = require("express").Router();
const testController = require("../controllers/test.controller");
const { downloadHTMLReport, downloadLogs, downloadHTMLReportBrowser, downloadLogsBrowser, downloadAllLogs, getJSONReport } = require("../services/index.service");
const { generateCSVSheet, generateAnalyticsForNP } = require("../services/analytics.service");

routes.post("/runtest", testController);
routes.post("/download-report", downloadHTMLReport);
routes.get("/get-json-reports/:test_id", getJSONReport)
routes.post("/download-logs", downloadLogs);
routes.get("/download-report/8704aef9-8985-4b8a-9c45-2321187d3889/:test_id", downloadHTMLReportBrowser)
routes.get("/download-logs/8704aef9-8985-4b8a-9c45-2321187d3889/:transaction_id", downloadLogsBrowser);
routes.get("/download-usage-report/8704aef9-8985-4b8a-9c45-2321187d3889/:start_date/:end_date?", generateCSVSheet);
routes.get("/download-all-logs/8704aef9-8985-4b8a-9c45-2321187d3889/:transaction_id", downloadAllLogs);
routes.post("/download-usage-report-for-np/8704aef9-8985-4b8a-9c45-2321187d3889", generateAnalyticsForNP);

module.exports = routes;

