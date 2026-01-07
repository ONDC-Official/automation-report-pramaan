const database = require("../config/db");
const fs = require("fs");
const fsPromise = require("fs").promises;
const generator = require("mochawesome-report-generator");
const path = require("path");
const { merge } = require("../helper/merge");
const Joi = require("joi");
const axios = require("axios");
const reportDir = path.resolve(__dirname, "../output");
const { orderArray } = require("../utils/constants");
const { PRAMAAN_SELLER_TESTING_API } = require("../utils/env");

const ReportRequestvalidationSchema = Joi.object({
  test_id: Joi.string().required(),
});

async function downloadHTMLReport(req, res) {
  try {
    const response = ReportRequestvalidationSchema.validate(req.body);

    if (response?.error) {
      return res.status(400).json({
        message: {
          ack: {
            status: "NACK",
          },
        },
        error: {
          code: "400",
          message: response?.error?.details?.[0]?.message,
        },
      });
    }

    const { test_id } = req.body;

    const reports = await database.getReports(test_id);

    reports.sort((a, b) => {
      const indexA = orderArray.indexOf(a.flow_id);
      const indexB = orderArray.indexOf(b.flow_id);

      return indexA - indexB;
    });

    const jsonReports = reports.map((item) => JSON.parse(item.report));

    if (jsonReports.length > 0) {
      const mergedReport = await merge(jsonReports);

      mergedReport.results.map((result, index) => {
        result.title = reports[index]?.flow_id;
        return result;
      });

      await generator.create(mergedReport, {
        reportDir: reportDir,
        reportTitle: `Pramaan Test Report ID: ${test_id} generated at: ${JSON.stringify(
          new Date(Date.now())
        )}`,
        reportPageTitle: `${test_id}_report`,
        reportFilename: `${test_id}_report`,
        overwrite: true,
        inlineAssets: true,
      });

      const reportPath = path.join(reportDir, `${test_id}_report.html`);

      const reportContent = await fsPromise.readFile(reportPath, "utf-8");
      const base64Report = `data:text/html;base64,${Buffer.from(
        reportContent
      ).toString("base64")}`;

      return res.status(200).send(base64Report);
    }

    return res.status(404).json({
      message: {
        ack: {
          status: "NACK",
        },
      },
      error: {
        code: "404",
        message: "No transactions found",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: {
        ack: {
          status: "NACK",
        },
      },
      error: {
        code: "500",
        message: "Some internal error",
      },
    });
  }
}

const LogsRequestvalidationSchema = Joi.object({
  transaction_id: Joi.string().required(),
  id: Joi.string().required(),
});

async function downloadLogs(req, res) {
  try {
    const response = LogsRequestvalidationSchema.validate(req.body);

    if (response?.error) {
      return res.status(400).json({
        message: {
          ack: {
            status: "NACK",
          },
        },
        error: {
          code: "400",
          message: response?.error?.details?.[0]?.message,
        },
      });
    }

    const { transaction_id } = req.body;

    const buyerLogs = await database.getLogs(transaction_id);

    let logsArray = {};

    buyerLogs.forEach((log) => {
      switch (log.action) {
        case "search":
        case "on_search":
        case "select":
        case "on_select":
        case "init":
        case "on_init":
        case "update":
        case "on_update":
        case "confirm":
        case "on_confirm":
        case "status":
        case "on_status":
        case "issue":
        case "on_issue":
        case "issue_status":
        case "on_issue_status":
        case "cancel":
        case "on_cancel":
        case "track":
        case "on_track":
        case "catalog_rejection":
        case "info":
        case "on_info":
        case "recon":
        case "on_recon":
        case "rating":
        case "on_rating":
          let index = 1;
          while (logsArray[`${log.action}_${index}`]) {
            index++;
          }
          const { _id, ...logRequestWithoutId } = log?.request;
          logsArray[`${log.action}_${index}`] = {
            signature: log.signature,
            request: { ...logRequestWithoutId },
            response: { ...log?.response },
          };
          break;
        default:
          break; // Skip adding _id field to logsArray
      }
    });

    const search = buyerLogs.find((ele) => ele.action === "search");

    const domain = search?.request?.context?.domain;
    const version = search?.request?.context?.version;
    const flow = search?.request?.message?.intent?.category?.descriptor?.code;

    let logs = {
      domain: domain,
      version: version,
      flow: flow,
      payload: logsArray,
    };

    const jsonLogs = JSON.stringify(logs);

    const base64Logs = `data:text/plain;base64,${Buffer.from(jsonLogs).toString(
      "base64"
    )}`;

    // Send base64-encoded logs as the response
    res.status(200).send(base64Logs);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: {
        ack: {
          status: "NACK",
        },
      },
      error: {
        code: "500",
        message: "Some internal error",
      },
    });
  }
}

async function downloadLogsBrowser(req, res) {
  try {
    const { transaction_id } = req.params;

    const buyerLogs = await database.getLogs(transaction_id);

    let logsArray = {};

    buyerLogs.forEach((log) => {
      switch (log.action) {
        case "search":
        case "on_search":
        case "select":
        case "on_select":
        case "init":
        case "on_init":
        case "update":
        case "on_update":
        case "status":
        case "on_status":
        case "confirm":
        case "on_confirm":
        case "issue":
        case "on_issue":
        case "issue_status":
        case "on_issue_status":
        case "cancel":
        case "on_cancel":
        case "track":
        case "on_track":
        case "catalog_rejection":
        case "info":
        case "on_info":
        case "recon":
        case "on_recon":
        case "rating":
        case "on_rating":
          let index = 1;
          while (logsArray[`${log.action}_${index}`]) {
            index++;
          }
          const { _id, ...logRequestWithoutId } = log?.request;
          logsArray[`${log.action}_${index}`] = {
            signature: log.signature,
            request: { ...logRequestWithoutId },
            response: { ...log?.response },
          };
          break;
        default:
          logsArray[log.action] = log.request;
          break;
      }
    });

    const search = buyerLogs.find((ele) => ele.action === "search");

    // Extract domain, version, and flow from the specified locations in the payload
    const domain = search?.request?.context?.domain;
    const version = search?.request?.context?.version;
    const flow = search?.request?.message?.intent?.category?.descriptor?.code;

    // Create the logs object using the extracted values
    let logs = {
      domain: domain,
      version: version,
      flow: flow,
      payload: logsArray,
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", 'attachment; filename="logs.json"');

    res.status(200).json(logs);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: {
        ack: {
          status: "NACK",
        },
      },
      error: {
        code: "500",
        message: "Some internal error",
      },
    });
  }
}

async function downloadHTMLReportBrowser(req, res) {
  try {
    const { test_id } = req.params;

    const reports = await database.getReports(test_id);

    reports.sort((a, b) => {
      const indexA = orderArray.indexOf(a.flow_id);
      const indexB = orderArray.indexOf(b.flow_id);

      return indexA - indexB;
    });

    const jsonReports = reports.map((item) => JSON.parse(item.report));

    if (jsonReports.length > 0) {
      const mergedReport = await merge(jsonReports);

      mergedReport.results.map((result, index) => {
        result.title = reports[index]?.flow_id;
        return result;
      });

      console.log("merged Report: ", mergedReport);

      await generator.create(mergedReport, {
        reportDir: reportDir,
        reportTitle: `Pramaan Test Report ID: ${test_id} generated at: ${JSON.stringify(
          new Date(reports[0]?.created_at)
        )}`,
        reportPageTitle: `${test_id}_report`,
        reportFilename: `${test_id}_report`,
        overwrite: true,
        inlineAssets: true,
      });

      /* const base64Report = `data:text/html;base64,${Buffer.from(
        reportContent
      ).toString("base64")}`;

      return res.status(200).send(base64Report); */
      const reportPath = path.join(reportDir, `${test_id}_report.html`);

      // Set headers to prompt download rather than inline display
      res.setHeader("Content-Type", "text/html");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${test_id}_report.html`
      );

      // Stream the file to the response
      const readStream = fs.createReadStream(reportPath);

      readStream.on("open", () => {
        readStream.pipe(res);
      });

      readStream.on("error", (err) => {
        res.status(404).json({ message: "File not found" });
      });
    } else {
      return res.status(404).json({
        message: {
          ack: {
            status: "NACK",
          },
        },
        error: {
          code: "404",
          message: "No transactions found",
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: {
        ack: {
          status: "NACK",
        },
      },
      error: {
        code: "500",
        message: "Some internal error",
      },
    });
  }
}

async function downloadAllLogs(req, res) {
  try {
    const { transaction_id } = req.params;

    // Assuming getLogs function fetches logs based on the transaction ID
    const allLogs = await database.getLogs(transaction_id);

    // Create the logs object using the extracted values
    let logs = {
      payload: allLogs,
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", 'attachment; filename="logs.json"');

    res.status(200).json(logs);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getHTMLReports(test_id) {
  try {
    const reports = await database.getReports(test_id);

    reports.sort((a, b) => {
      const indexA = orderArray.indexOf(a.flow_id);
      const indexB = orderArray.indexOf(b.flow_id);

      return indexA - indexB;
    });

    const buyerJSONReports = reports.map((item) => JSON.parse(item.report));

    /** fetch JSON reports from Seller Testing */
    const response = await axios.get(`${PRAMAAN_SELLER_TESTING_API}/get-json-reports/${test_id}`);
    const sellerJSONReports = response.data;

    const jsonReports = [...(buyerJSONReports ?? []), ...(sellerJSONReports ?? [])];

    if (jsonReports.length > 0) {
      const mergedReport = await merge(jsonReports);

      mergedReport.results.map((result, index) => {
        result.title = reports[index]?.flow_id;
        return result;
      });

      await generator.create(mergedReport, {
        reportDir: reportDir,
        reportTitle: `Pramaan Test Report ID: ${test_id} generated at: ${JSON.stringify(
          new Date(Date.now())
        )}`,
        reportPageTitle: `${test_id}_report`,
        reportFilename: `${test_id}_report`,
        overwrite: true,
        inlineAssets: true,
      });

      const reportPath = path.join(reportDir, `${test_id}_report.html`);

      const reportContent = await fsPromise.readFile(reportPath, "utf-8");
      const base64Report = `data:text/html;base64,${Buffer.from(
        reportContent
      ).toString("base64")}`;

      return {
        data: base64Report
      };
    }

    return {
      message: {
        ack: {
          status: "NACK",
        },
      },
      error: {
        code: "404",
        message: "No transactions found",
      },
    };
  } catch (err) {
    console.log(err);
    return {
      message: {
        ack: {
          status: "NACK",
        },
      },
      error: {
        code: "500",
        message: "Some internal error",
      },
    };
  }
}

module.exports = {
  downloadHTMLReport,
  downloadLogs,
  downloadHTMLReportBrowser,
  downloadLogsBrowser,
  downloadAllLogs,
  getHTMLReports
};
