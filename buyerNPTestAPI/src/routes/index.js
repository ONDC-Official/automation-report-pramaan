const routes = require("express").Router();
const testController = require("../controllers/test.controller");
const { downloadHTMLReport, downloadLogsBrowser, downloadLogs, downloadAllLogs, downloadHTMLReportBrowser } = require("../services/index.service");

routes.post("/runtest", testController);
routes.post("/download-report", downloadHTMLReport);
routes.post("/download-logs", downloadLogs);
routes.get("/download-report/8704aef9-8985-4b8a-9c45-2321187d3889/:test_id", downloadHTMLReportBrowser)
routes.get("/download-logs/8704aef9-8985-4b8a-9c45-2321187d3889/:transaction_id", downloadLogsBrowser);
routes.get("/download-all-logs/8704aef9-8985-4b8a-9c45-2321187d3889/:transaction_id", downloadAllLogs);

module.exports = routes;