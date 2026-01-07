const { MongoClient, GridFSBucket } = require("mongodb");
const { MONGODB_URI, FLUSHPERIOD, SELLER_TESTING_URI } = require("../utils/env");
const { parse, end, toSeconds, pattern } = require("iso8601-duration");
const fs = require("fs");
const os = require("os");
const path = require("path");
// const { collectReportSuites, generateStats } = require('../helper/merge');
const { createZip, extractZip } = require('../helper/compression');

const isValidJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

class Database {
  constructor() {
    if (!Database.instance) {
      this.client = new MongoClient(MONGODB_URI);
      Database.instance = this;
    }

    return Database.instance;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db();

      const Report = this.getCollection("report");
      if (!Report) await this.client.db.createCollection("reports");
      console.log("DB Connected...");
    } catch (err) {
      return err;
    }
  }

  async ensureConnected() {
    if (!this.db || !this.client.topology || this.client.topology.s.state !== 'connected') {
      await this.connect();
    }
  }

  getCollection(collectionName) {
    try {
      return this.client.db().collection(collectionName);
    } catch (err) {
      return err;
    }
  }

  getGridFSBucket() {
    return new GridFSBucket(this.db);
  }

  async saveReport({ id, test_id, type, subscriber_uri, environment, flow_name, domain, version, transaction_id, flow_id, reportPath }) {
    await this.ensureConnected();
    try {
      const bucket = this.getGridFSBucket();

      //  create a zip of the report
      const zipPath = path.join(os.tmpdir(), `${transaction_id}_report.zip`);
      console.log(`Creating zip file at: ${zipPath}`);
      await createZip(reportPath, zipPath);

      const reportContent = await fs.promises.readFile(zipPath);
      const buffer = Buffer.from(reportContent);

      const uploadStream = bucket.openUploadStream(`${transaction_id}_report.zip`);
      console.log(`Uploading file to GridFS: ${transaction_id}_report.zip`);
      uploadStream.end(buffer);

      const file = await new Promise((resolve, reject) => {
        uploadStream.on('finish', () => {
          console.log("File upload complete");
          resolve(uploadStream.id);  // Get the file ID
        });
        uploadStream.on('error', (error) => {
          console.error("File upload error:", error);
          reject(error);
        });
      });

      const filter = { id, test_id, domain, environment, type, transaction_id, subscriber_uri, flow_name, flow_id, version };
      const update = { $set: { report: file, created_at: new Date() } };
      const options = { upsert: true };

      const Report = this.getCollection("reports");
      const result = await Report.updateOne(filter, update, options);

      // Clean up the temporary zip file
      // console.log(`Cleaning up temporary zip file: ${zipPath}`);
      // await fs.promises.unlink(zipPath);

      return result.upsertedId || result.modifiedCount;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async updateReport({ test_id, flow_id, transaction_id, optionals, failed_optionals }) {
    try {
      const filter = { test_id, flow_id, transaction_id };
      const update = {
        $set: { optionals: optionals, failed_optionals: failed_optionals },
      };
      const options = { upsert: true };

      const Report = this.getCollection("reports");
      const result = await Report.findOneAndUpdate(filter, update, options);

      return result._id;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllReportsForNP(subscriber_id, domain) {
    try {
      const now = new Date();
      const fifteenDaysAgo = new Date(now);
      fifteenDaysAgo.setDate(now.getDate() - 15);
      const formattedDate = fifteenDaysAgo
        .toISOString()
        .replace(/Z$/, "+00:00");

      const pipeline = [
        // Match documents created in the last 15 days
        {
          $match: {
            created_at: { $gte: new Date(formattedDate) },
            id: subscriber_id,
            domain: domain,
          },
        },
        // Sort by unique field and created_at in descending order
        { $sort: { flow_id: 1, created_at: -1 } }, // Replace 'uniqueField' with the field you want to group by
        // Group by the unique field and keep only the newest document in each group
        {
          $group: {
            _id: "$flow_id", // Group by the unique field
            latestDocument: { $first: "$$ROOT" },
          },
        },
        // Replace root with the latestDocument to get the actual documents
        { $replaceRoot: { newRoot: "$latestDocument" } },
      ];

      const Report = this.getCollection("reports");
      const reports = await Report.aggregate(pipeline).toArray();

      if (isValidJson(reports[0]?.report)) {
        return reports;
      }

      const bucket = this.getGridFSBucket();
      const result = await Promise.all(reports.map(async (report) => {
        const stream = bucket.openDownloadStream(report.report);
        const zipOutputPath = path.join(os.tmpdir(), `${report._id}.zip`);

        console.log(`Downloading to: ${zipOutputPath}`);

        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(zipOutputPath);
          stream.pipe(writeStream);
          stream.on('error', reject);
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        const extractToDir = path.join(os.tmpdir(), `${report._id}`);
        await extractZip(zipOutputPath, extractToDir);

        console.log(`Extracted to directory: ${extractToDir}`);

        const extractedFiles = await fs.promises.readdir(extractToDir);
        if (extractedFiles.length === 0) {
          throw new Error(`No files found in extracted directory: ${extractToDir}`);
        }

        const extractedFilePath = path.join(extractToDir, extractedFiles[0]);
        console.log(`Extracted file path: ${extractedFilePath}`);

        const content = await fs.promises.readFile(extractedFilePath, "utf-8");
        // await fs.promises.unlink(zipOutputPath);
        // await fs.promises.rmdir(extractToDir, { recursive: true }).catch(() => {});

        return {
          ...report,
          report: content
        };
      }));

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllReports(startDate, endDate) {
    await this.ensureConnected();
    try {
      const query = {
        created_at: { $gte: new Date(startDate), $lte: new Date(endDate) }
      };

      const Report = this.getCollection("reports");
      const reports = await Report.find(query).toArray();

      if (isValidJson(reports[0]?.report)) {
        return reports;
      }

      const bucket = this.getGridFSBucket();
      const result = await Promise.all(reports.map(async (report) => {
        const stream = bucket.openDownloadStream(report.report);
        const zipOutputPath = path.join(os.tmpdir(), `${report._id}.zip`);

        console.log(`Downloading to: ${zipOutputPath}`);

        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(zipOutputPath);
          stream.pipe(writeStream);
          stream.on('error', reject);
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        const extractToDir = path.join(os.tmpdir(), `${report._id}`);
        await extractZip(zipOutputPath, extractToDir);

        console.log(`Extracted to directory: ${extractToDir}`);

        const extractedFiles = await fs.promises.readdir(extractToDir);
        if (extractedFiles.length === 0) {
          throw new Error(`No files found in extracted directory: ${extractToDir}`);
        }

        const extractedFilePath = path.join(extractToDir, extractedFiles[0]);
        console.log(`Extracted file path: ${extractedFilePath}`);

        const content = await fs.promises.readFile(extractedFilePath, "utf-8");
        // await fs.promises.unlink(zipOutputPath);
        // await fs.promises.rmdir(extractToDir, { recursive: true }).catch(() => {});

        return {
          ...report,
          report: content
        };
      }));

      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async getLogs(transaction_id) {
    try {
      const Log = this.getCollection("logs");
      const logs = await Log.find({ transaction_id: transaction_id }).toArray();
      return logs;
    } catch (err) {
      return err;
    }
  }

  async getReports(test_id) {
    await this.ensureConnected();
    try {
      const Report = this.getCollection("reports");
      const reports = await Report.find({ test_id: test_id }).toArray();

      if (isValidJson(reports[0]?.report)) {
        return reports;
      }

      const bucket = this.getGridFSBucket();
      const result = await Promise.all(reports.map(async (report) => {
        const stream = bucket.openDownloadStream(report.report);
        const zipOutputPath = path.join(os.tmpdir(), `${report._id}.zip`);

        console.log(`Downloading to: ${zipOutputPath}`);

        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(zipOutputPath);
          stream.pipe(writeStream);
          stream.on('error', reject);
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        const extractToDir = path.join(os.tmpdir(), `${report._id}`);
        await extractZip(zipOutputPath, extractToDir);

        console.log(`Extracted to directory: ${extractToDir}`);

        const extractedFiles = await fs.promises.readdir(extractToDir);
        if (extractedFiles.length === 0) {
          throw new Error(`No files found in extracted directory: ${extractToDir}`);
        }

        const extractedFilePath = path.join(extractToDir, extractedFiles[0]);
        console.log(`Extracted file path: ${extractedFilePath}`);

        const content = await fs.promises.readFile(extractedFilePath, "utf-8");
        // await fs.promises.unlink(zipOutputPath);
        // await fs.promises.rmdir(extractToDir, { recursive: true }).catch(() => {});

        return {
          ...report,
          report: content
        };
      }));

      return result;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async close() {
    try {
      await this.client.close();
    } catch (err) {
      return err;
    }
  }

  // async processReports() {
  //   try {
  //     const Report = this.getCollection("reports");
  //     const Progress = this.getCollection("processingProgress");

  //     const batchSize = 25;
  //     // const maxDocuments = 1000;
  //     let count = 0;
  //     let batch = [];

  //     let lastProcessed = await Progress.findOne({ key: "lastProcessedId" });
  //     let lastId = lastProcessed ? lastProcessed.value : null;
  //     let query = lastId ? { _id: { $gt: lastId } } : {};

  //     const cursor = Report.find(query).batchSize(batchSize).sort({ _id: 1 });
  //     if (!(await cursor.hasNext())) {
  //       console.log("No documents to process. Exiting...");
  //       return;
  //     }

  //     for await (const doc of cursor) {
  //       const report = doc?.report && isValidJson(doc?.report) ? JSON.parse(doc?.report) : null;
  //       if (!report)
  //         continue;

  //       const suites = collectReportSuites([report]);
  //       const { optionals, failed_optionals } = generateStats(suites, [report]);
  //       const valid = Number(report?.stats?.tests) !== 0 ? true : false;

  //       let mandatory_tests = valid ? Number(report?.stats?.tests) - Number(optionals) : 0;
  //       let optional_tests = valid ? optionals : 0;
  //       let optional_failed_tests = valid ? failed_optionals : 0;
  //       let mandatory_failed_tests = valid ? Number(report?.stats?.failures) - Number(failed_optionals) : 0;

  //       const flow_data = {
  //         _id: doc?._id,
  //         "Pramaan ID": doc?.test_id,
  //         "Subscriber ID": doc?.id,
  //         "Subscriber URI": doc?.subscriber_uri,
  //         "Environment": doc?.environment,
  //         "Domain": doc?.domain,
  //         "Role": "Seller",
  //         "Category": doc?.type,
  //         "Transaction Type": "B2C",
  //         "API Version": doc?.version,
  //         "Report Generation Timestamp": JSON.stringify(new Date(doc?.created_at)),
  //         "Flow ID": doc?.flow_id,
  //         "Flow Display Name": doc?.flow_name,
  //         "Optional Tests": optional_tests,
  //         "Mandatory Tests": mandatory_tests,
  //         "Total Tests": report?.stats?.tests,
  //         "Passed": report?.stats?.passes,
  //         "Failed (Optional)": optional_failed_tests,
  //         "Failed (Mandatory)": mandatory_failed_tests,
  //         "Failed": report?.stats?.failures,
  //         "Report Link": `${SELLER_TESTING_URI}/download-report/8704aef9-8985-4b8a-9c45-2321187d3889/${doc?.test_id}`,
  //         "Logs Link": `${SELLER_TESTING_URI}/download-logs/8704aef9-8985-4b8a-9c45-2321187d3889/${doc?.transaction_id}`,
  //       }

  //       batch.push(flow_data);
  //       if (batch.length === batchSize) {
  //         await Promise.all(batch.map(async (ele) => {
  //           await this.saveFlow(ele);
  //         }));

  //         count += batch.length;
  //         console.log(`Processed ${batch.length} documents, Total: ${count}`);

  //         // Store last processed `_id`
  //         lastId = batch[batch.length - 1]._id;
  //         await Progress.updateOne(
  //           { key: "lastProcessedId" },
  //           { $set: { value: lastId } },
  //           { upsert: true }
  //         );

  //         batch = []; // Reset batch
  //       }

  //       // if (count >= maxDocuments) {
  //       //   console.log(`Reached daily limit of ${maxDocuments} documents. Stopping.`);
  //       //   break;
  //       // }
  //     }

  //     // Process Remaining Documents (Less Than `batchSize`)
  //     if (batch.length > 0) {
  //       console.log(`Processing final batch of ${batch.length} documents.`);
  //       await Promise.all(batch.map(async (ele) => await this.saveFlow(ele)));

  //       count += batch.length;
  //       console.log(`Final batch processed. Total documents: ${count}`);

  //       // Store last processed `_id`
  //       lastId = batch[batch.length - 1]._id;
  //       await Progress.updateOne(
  //         { key: "lastProcessedId" },
  //         { $set: { value: lastId } },
  //         { upsert: true }
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }
  // }

  // async saveFlow(flow_data) {
  //   try {
  //     const { _id, ...remainingFlowData } = flow_data;
  //     const { Category, Domain, Role, Environment } = remainingFlowData;

  //     const filter = {
  //       Domain: Domain,
  //       Role: Role,
  //       "Transaction Type": remainingFlowData["Transaction Type"],
  //       "Subscriber ID": remainingFlowData["Subscriber ID"],
  //       "Flow ID": remainingFlowData["Flow ID"],
  //       Environment: Environment,
  //       "API Version": remainingFlowData["API Version"],
  //       Category: Category
  //     }

  //     const saved_flows = this.getCollection("saved_flows");
  //     const document = await saved_flows.replaceOne(
  //       filter,
  //       {
  //         ...remainingFlowData,
  //         created_at: new Date(),
  //         updated_at: new Date()
  //       },
  //       { upsert: true, new: true }
  //     );

  //     return document ? true : false;
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }
  // }

  async flushDB() {
    try {
      const collections = await this.client.db().listCollections().toArray();

      const durationInS = toSeconds(parse(FLUSHPERIOD));

      const cutoffDate = new Date();
      cutoffDate.setTime(cutoffDate.getTime() - durationInS * 1000);

      for (let collection of collections) {
        if (collection.name !== "reports") {
          const result = await this.client
            .db()
            .collection(collection.name)
            .deleteMany({ created_at: { $lt: cutoffDate } });
          console.log(
            `${result.deletedCount} documents were deleted from the '${collection.name}' collection.`
          );
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

const database = new Database();
module.exports = database;
