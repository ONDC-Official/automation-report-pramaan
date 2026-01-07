const { MongoClient, GridFSBucket } = require("mongodb");
const { SELLER_DB_URI } = require("../utils/env");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { extractZip } = require('../helper/compression');

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
      this.client = new MongoClient(SELLER_DB_URI);
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
      console.log("Seller DB Connected...");
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

  async getLogs(transaction_id) {
    try {
      const Log = this.getCollection("logs");
      const logs = await Log.find({ transaction_id: transaction_id }).toArray();
      return logs;
    } catch (err) {
      return err;
      return [];
    }
  }

  async close() {
    try {
      await this.client.close();
    } catch (err) {
      return err;
    }
  }
}

const database = new Database();
database.connect();

module.exports = {
  sellerDatabase: database,
};
