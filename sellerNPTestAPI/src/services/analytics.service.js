const { sellerDatabase } = require("../config/sellerDBConnect");
const { SELLER_TESTING_URI, BUYER_TESTING_URI } = require("../utils/env");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");
const database = require("../config/db");
const fs = require("fs");
const Joi = require("joi");
const { collectReportSuites, generateStats } = require("../helper/merge");

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
const paramSchema = Joi.object({
  start_date: Joi.string().pattern(dateRegex).required(),
  end_date: Joi.string().pattern(dateRegex),
});

const getReport = (it) => {
  try {
    if (typeof it === "string") {
      return JSON.parse(it.report || "");
    }

    return it;
  } catch (error) {
    return null;
  }
};

async function countOptionalAndUpdateReport(doc, report, identifier) {
  try {
    const suites = collectReportSuites([report]);
    const stats = generateStats(suites, [report]);

    switch (identifier) {
      case "Buyer":
        await sellerDatabase.updateReport({
          test_id: doc?.test_id,
          flow_id: doc?.flow_id,
          transaction_id: doc?.transaction_id,
          optionals: stats?.optionals,
          failed_optionals: stats?.failed_optionals,
        });
        break;
      case "Seller":
        await database.updateReport({
          test_id: doc?.test_id,
          flow_id: doc?.flow_id,
          transaction_id: doc?.transaction_id,
          optionals: stats?.optionals,
          failed_optionals: stats?.failed_optionals,
        });
        break;
      default:
        break;
    }

    return {
      optionals: stats?.optionals,
      failed_optionals: stats?.failed_optionals,
    };
  } catch (err) {
    console.log(err);
  }
}

async function generateAnalyticsForNP(req, res) {
  try {
    const { id, domain, type } = req?.body;

    if (!id || !type || !domain) {
      return res.status(400).json({
        message: {
          ack: "NACK",
        },
        error: {
          code: "30000",
          message: !id
            ? "Subscriber Id or Domain Query Missing"
            : "Type Params Missing",
        },
      });
    }

    let reports, testingUrl, role;

    switch (type) {
      case "buyer":
        testingUrl = BUYER_TESTING_URI;
        role = "Buyer";
        reports = await sellerDatabase.getAllReportsForNP(id, domain);
        break;
      case "seller":
        testingUrl = SELLER_TESTING_URI;
        role = "Seller";
        reports = await database.getAllReportsForNP(id, domain);
        break;
      default:
        break;
    }

    if (reports?.length === 0) {
      return res.status(400).json({
        message: {
          ack: {
            status: "NACK",
          },
        },
        error: {
          code: "30000",
          message: `Couldn't find any data for this NP`,
        },
      });
    }

    let records = await Promise.all(
      reports.map(async (it) => {
        const report = getReport(it);
        if (!report) {
          return null;
        }

        let optionalsObj;

        if (it?.optionals >= 0 && it?.failed_optionals >= 0) {
          optionalsObj = {
            optionals: it?.optionals ? it?.optionals : 0,
            failed_optionals: it?.failed_optionals ? it?.failed_optionals : 0,
          };
        } else {
          optionalsObj = await countOptionalAndUpdateReport(it, report, role);
        }

        const { optionals, failed_optionals } = optionalsObj;

        return {
          "Pramaan ID": it?.test_id,
          "Subscriber ID": it?.id,
          "Subscriber URI": it?.subscriber_uri,
          Environment: it?.environment,
          Domain: it?.domain,
          Role: role,
          Category: it?.type,
          "Transaction Type": "B2C",
          "API Version": it?.version,
          "Report Generation Timestamp": JSON.stringify(
            new Date(it?.created_at)
          ),
          "Flow ID": it?.flow_id,
          "Flow Display Name": it?.flow_name,
          "Optional Tests": optionals,
          "Mandatory Tests": Number(report?.stats?.tests) - Number(optionals),
          "Total Tests": report?.stats?.tests,
          Passed: report?.stats?.passes,
          "Failed (Optional)": failed_optionals,
          "Failed (Mandatory)":
            Number(report?.stats?.failures) - Number(failed_optionals),
          Failed: report?.stats?.failures,
          "Report Link": `${testingUrl}/download-report/8704aef9-8985-4b8a-9c45-2321187d3889/${it?.test_id}`,
          "Logs Link": `${testingUrl}/download-logs/8704aef9-8985-4b8a-9c45-2321187d3889/${it?.transaction_id}`,
        };
      })
    );

    records = records?.filter((record) => record !== null);

    return res.status(200).json(records);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}

async function generateCSVSheet(req, res) {
  try {
    const response = paramSchema.validate(req.params);
    if (response?.error) {
      return res.status(400).json({
        message: {
          ack: {
            status: "NACK",
          },
          error: {
            code: "401",
            message: "Date Should be in DD-MM-YYYY format only",
          },
        },
      });
    }

    const { start_date, end_date } = req.params;

    const str_dt = start_date.split("-");
    const startDate = new Date(str_dt[2], Number(str_dt[1]) - 1, str_dt[0]);

    let end_dt;
    if (end_date) {
      end_dt = end_date.split("-");
    }
    const endDate = end_date
      ? new Date(end_dt[2], Number(end_dt[1]) - 1, end_dt[0])
      : new Date();

    const sellerReports = await database.getAllReports(startDate, endDate);
    const buyerReports = await sellerDatabase.getAllReports(startDate, endDate);

    const reportFolderPath = path.resolve(__dirname, "../analyticsReports");

    if (!fs.existsSync(reportFolderPath)) {
      fs.mkdirSync(reportFolderPath, { recursive: true });
    }

    const reportPath = path.resolve(reportFolderPath, "report.csv");

    const csvWriter = createCsvWriter({
      path: reportPath,
      header: [
        { id: "pramaan_id", title: "Pramaan ID" },
        { id: "subscriber_id", title: "Subscriber ID" },
        { id: "subscriber_uri", title: "Subscriber URI" },
        { id: "environment", title: "Environment" },
        { id: "domain", title: "Domain" },
        { id: "role", title: "Role" },
        { id: "category", title: "Category" },
        { id: "transaction_type", title: "Transaction Type" },
        { id: "api_version", title: "API Version" },
        {
          id: "report_generation_timestamp",
          title: "Report Generation Timestamp",
        },
        { id: "flow_id", title: "Flow ID" },
        { id: "flow_display_name", title: "Flow Display Name" },
        { id: "optional_tests", title: "Optional Tests" },
        { id: "mandatory_tests", title: "Mandatory Tests" },
        { id: "total_tests", title: "Total Tests" },
        { id: "passed", title: "Passed" },
        { id: "failed_optionals", title: "Failed (Optional)" },
        { id: "failed_mandatory", title: "Failed (Mandatory)" },
        { id: "failed", title: "Failed" },
        { id: "report_link", title: "Report Link" },
        { id: "logs_link", title: "Logs Link" },
      ],
    });

    let sellerExcelDataObj = await Promise.all(
      sellerReports.map(async (it) => {
        const report = getReport(it);
        if (!report) {
          return null;
        }

        let optionalsObj;

        if (it?.optionals >= 0 && it?.failed_optionals >= 0) {
          optionalsObj = {
            optionals: it?.optionals ? it?.optionals : 0,
            failed_optionals: it?.failed_optionals ? it?.failed_optionals : 0,
          };
        } else {
          optionalsObj = await countOptionalAndUpdateReport(
            it,
            report,
            "Seller"
          );
        }

        const { optionals, failed_optionals } = optionalsObj;

        return {
          pramaan_id: it?.test_id,
          subscriber_id: it?.id,
          subscriber_uri: it?.subscriber_uri,
          environment: it?.environment,
          domain: it?.domain,
          role: "Seller",
          category: it?.type,
          transaction_type: "B2C",
          api_version: it?.version,
          report_generation_timestamp: it?.created_at,
          flow_id: it?.flow_id,
          flow_display_name: it?.flow_name,
          optional_tests: optionals,
          mandatory_tests: Number(report?.stats?.tests) - Number(optionals),
          total_tests: report?.stats?.tests,
          passed: report?.stats?.passes,
          failed_optionals: failed_optionals,
          failed_mandatory:
            Number(report?.stats?.failures) - Number(failed_optionals),
          failed: report?.stats?.failures,
          report_link: `${SELLER_TESTING_URI}/download-report/8704aef9-8985-4b8a-9c45-2321187d3889/${it?.test_id}`,
          logs_link: `${SELLER_TESTING_URI}/download-logs/8704aef9-8985-4b8a-9c45-2321187d3889/${it?.transaction_id}`,
        };
      })
    );

    sellerExcelDataObj = sellerExcelDataObj?.filter((ele) => ele !== null);

    let buyerExcelDataObj = await Promise.all(
      buyerReports.map(async (it) => {
        const report = getReport(it);
        if (!report) {
          return null;
        }

        let optionalsObj;

        if (it?.optionals >= 0 && it?.failed_optionals >= 0) {
          optionalsObj = {
            optionals: it?.optionals ? it?.optionals : 0,
            failed_optionals: it?.failed_optionals ? it?.failed_optionals : 0,
          };
        } else {
          optionalsObj = await countOptionalAndUpdateReport(
            it,
            report,
            "Buyer"
          );
        }

        const { optionals, failed_optionals } = optionalsObj;

        return {
          pramaan_id: it?.test_id,
          subscriber_id: it?.id,
          subscriber_uri: it?.subscriber_uri,
          environment: it?.environment,
          domain: it?.domain,
          role: "Buyer",
          category: it?.type,
          transaction_type: "B2C",
          api_version: it?.version,
          report_generation_timestamp: it?.created_at,
          flow_id: it?.flow_id,
          flow_display_name: it?.flow_name,
          optional_tests: optionals,
          mandatory_tests: Number(report?.stats?.tests) - Number(optionals),
          total_tests: report?.stats?.tests,
          passed: report?.stats?.passes,
          failed_optionals: failed_optionals,
          failed_mandatory:
            Number(report?.stats?.failures) - Number(failed_optionals),
          failed: report?.stats?.failures,
          report_link: `${BUYER_TESTING_URI}/download-report/8704aef9-8985-4b8a-9c45-2321187d3889/${it?.test_id}`,
          logs_link: `${BUYER_TESTING_URI}/download-logs/8704aef9-8985-4b8a-9c45-2321187d3889/${it?.transaction_id}`,
        };
      })
    );

    buyerExcelDataObj = buyerExcelDataObj?.filter((ele) => ele !== null);

    const records = [...buyerExcelDataObj, ...sellerExcelDataObj];
    csvWriter.writeRecords(records).then(() => {
      console.log("Done Creating Excel Report");
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=report.csv`);

    const readStream = fs.createReadStream(reportPath);

    readStream.on("open", () => {
      readStream.pipe(res);
    });

    readStream.on("error", (err) => {
      res.status(404).json({ message: "File not found" });
    });
  } catch (err) {
    console.log(`Error Occured: ${err}`);
  }
}

module.exports = {
  generateCSVSheet,
  generateAnalyticsForNP,
};
