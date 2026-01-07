const fs = require("fs").promises;
const axios = require("axios");
const path = require("path");
const Mocha = require("mocha");
const database = require("../config/db");

// Credit Domain Test Runners
const testRunnerV2_0_0 = require("../creditBuyerNPTest/v2.0.0/testRunner");
const testRunnerV2_1_0 = require("../creditBuyerNPTest/v2.1.0/testRunner");
const testRunnerV2_2_0 = require("../creditBuyerNPTest/v2.2.0/testRunner");

// Insurance Domain Test Runner
const testRunnerInsurance = require("../insuranceBuyerNPTest/testRunner");

//Sachet Insurance Domain Test Runner
const testRunnerSachetInsurance = require("../sachetInsuranceBuyerTest/testRunner");

// Unreserved Mobility Test Runner
const testRunnerUnreservedMobility = require("../unreservedMobilityTest/testRunner");

// On Demand Ride Hailing Test Runner
const testRunneronDemand = require("../onDemandBuyerNP/testRunner");

// entryPass  Test Runner
const testRunnerentryPass = require("../entryPassBuyerNPTest/testRunner");

// Intercity Domain Test Runner
const testRunnerIntercity = require("../IntercityBuyerNPTest/testRunner");

// Logistics Domain Test Runner
const testRunnerLogistics = require("../logisticsBuyerNpTest/testRunner");

// Logistics Domain Test Runner
const testRunnerLogistics_1_2_5 = require("../logisticsBuyerTest_1_2_5/testRunner");

// Retail Domain Test Runner
const testRunnerRetail = require("../RetailBuyerNpTest/testRunner");

// Retail Domain Test Runner
const testRunnerRetail_1_2_5 = require("../RetailBuyerTest_1_2_5/testRunner");

// RSF Domain Test Runner
const testRunnerRSF2_0 = require("../rsf2.0/testRunner");

// IGM Domain Test Runner
const testRunnerIGM = require("../igmTest/testRunner");
const testRunnerIGM2_0_0 = require("../igm2.0.0/testRunner");

// Investment Domain Test Runner
const testRunnerInvestment = require("../InvestmentBuyerNPTest/2.0.0/testRunner");
const testRunnerInvestment_2_1_0 = require("../InvestmentBuyerNPTest/2.1.0/testRunner");

// Airline Domain Test Runner
const testRunnerAirline = require("../AirlineBuyerNPTest/testRunner");

// Working Capital Domain Test Runner
const testRunnerWorkingCapital = require("../workingCapitalBuyerNP/testRunner")

// GiftCard Domain Test Runner
const testRunnerGiftCards = require("../giftCardTests/testRunner");

// Hotel booking Domain Test Runner
const testRunnerHotelBooking = require("../hotelBuyerNPTest/testRunner");

// Life Insurnce Domain Test Runner
const testRunnerLifeInsurance = require("../lifeInsuranceBuyertest/testRunner");

const { FLOWS } = require("../config");
const { analyticsAPI, PW_LOGS_API, PW_LOGS_API_KEY } = require("../utils/env");

const reportDir = path.resolve(__dirname, "../output");

module.exports = async function ({
  id,
  version,
  domain,
  environment,
  type,
  test_id,
  tests,
  aa_mandatory = true
}) {
  try {
    await Promise.all(
      tests.map(async (test, index) => {
        const { flow_id, transaction_id } = test;

        const testRunner = new Mocha({
          reporter: "mochawesome",
          reporterOptions: {
            reportDir: reportDir,
            reportFilename: `${transaction_id}_report`,
            html: false,
            overwrite: true,
            consoleReporter: "none",
          },
        });

        let logs = await database.getLogs(transaction_id);
        /** handling the incoming request for Protocol Workbench
         *  
         */
        if (test_id.startsWith("PW")) {
          const response = await axios.get(`${PW_LOGS_API}/logs?test_id=${test_id}&transaction_id=${transaction_id}`, {
            headers: {
              'x-api-key': PW_LOGS_API_KEY
            }
          });

          logs = response.data;
        }

        if (!logs) {
          return {
            message: {
              ack: {
                status: "NACK"
              }
            },
            error: {
              code: "30000",
              message: "No Logs exist for this transaction_id"
            }
          }
        }

        /**  The reason for below check is -
              For IGM 2.0 we are having same flow_ids, thus we need to check the domains as well,
              since flow display number might be different for each domain. And since retail has a
              number of children domains we need to match substring
        */
        const givenTest = FLOWS.find(({ id, domain: flowDomain, for: flowFor, version: domainVersion }) =>
          id === flow_id &&
          (!flowDomain || domain.startsWith(flowDomain)) &&
          (!flowFor || flowFor === type) &&
          (
            !domainVersion ||
            (Array.isArray(domainVersion)
              ? domainVersion.includes(version)
              : version === domainVersion)
          )
        );
        
        let testFunctions;
        switch (givenTest?.type) {
          case "METRO":
          case "BUS":
            testFunctions = testRunnerUnreservedMobility(givenTest, logs, type);
            break;
          case "IGM":
            testFunctions = testRunnerIGM(givenTest, logs, version, domain, type);
            break;
          case "IGMV2":
            testFunctions = testRunnerIGM2_0_0(givenTest, version, domain, logs);
            break;
          case "RSF2":
            testFunctions = testRunnerRSF2_0(givenTest, logs);
            break;
          case "INVESTMENT":
            switch (version) {
              case "2.0.0":
                testFunctions = testRunnerInvestment(givenTest, logs);
                break;
              case "2.1.0":
                testFunctions = testRunnerInvestment_2_1_0(givenTest, logs, version);
                break;
            }
            break;
          case "MOTOR_INSURANCE":
          case "MARINE_INSURANCE":
          case "HEALTH_INSURANCE":
            testFunctions = testRunnerInsurance(givenTest, logs, givenTest?.type);
            break;
          case "SACHET_INSURANCE":
            testFunctions = testRunnerSachetInsurance(givenTest, logs)
            break;
          case "ON_DEMAND":
            testFunctions = testRunneronDemand(givenTest, logs);
            break;
          case "ENTRY_PASS":
            testFunctions = testRunnerentryPass(givenTest, logs);
            break;
          case "INTERCITY":
            testFunctions = testRunnerIntercity(givenTest, logs, type);
            break;
          case "LOGISTICS":
            testFunctions = testRunnerLogistics(givenTest, logs, type);
            break;
          case "LOGISTICS_1_2_5":
            testFunctions = testRunnerLogistics_1_2_5(givenTest, logs, type);
            break;
          case "RETAIL":
            testFunctions = testRunnerRetail(givenTest, logs, domain, test?.type);
            break;
          case "RETAIL_1_2_5":
            testFunctions = testRunnerRetail_1_2_5(givenTest, logs, domain, test?.type);
            break;
          case "AIRLINE":
            testFunctions = testRunnerAirline(givenTest, logs);
            break;
          case "GIFTCARD":
            testFunctions = testRunnerGiftCards(givenTest, logs);
            break;
          case "WORKING_CAPITAL":
            testFunctions = testRunnerWorkingCapital(givenTest, logs);
            break;
          case "ACCOMMODATION":
            testFunctions = testRunnerHotelBooking(givenTest, logs);
            break;
          case "PURCHASE_FINANCE":
            testFunctions = testRunnerV2_2_0(givenTest, logs);
            break;
          case "Life_Insurance":
            testFunctions = testRunnerLifeInsurance(givenTest, logs);
            break;
          case "Personal Loan":
          case "Invoice Based Loan":
            switch (version) {
              case "2.0.0":
              case "2.0.1":
              case "2.0.2":
                testFunctions = testRunnerV2_0_0(givenTest, logs, version, aa_mandatory);
                break;
              case "2.1.0":
                testFunctions = testRunnerV2_1_0(givenTest, logs, aa_mandatory);
                break;
            }
            break;
        }
        const parentTestSuite = new Mocha.Suite(`${givenTest?.name}`);

        if (index === 0) {
          const infoSuite = new Mocha.Suite("Parameters entered for the run");

          const paramObj = {
            "Subscriber ID": id,
            Environment: environment,
            Role: "Buyer",
            Domain: domain,
            Version: version,
            "Transaction Type": "B2C",
            Category: type,
          };

          infoSuite.addTest(
            new Mocha.Test(`${JSON.stringify(paramObj)}`, function () { })
          );

          testRunner.suite.addSuite(infoSuite);
        }

        testFunctions.map(async (fn) => {
          const testSuite = await fn();
          if (Array.isArray(testSuite)) {
            testSuite.forEach((suite) => {
              parentTestSuite.addSuite(suite);
            });
            return;
          }
          parentTestSuite.addSuite(testSuite);
        });

        testRunner.suite.addSuite(parentTestSuite);

        await new Promise((resolve, reject) => {
          testRunner.run(async (failures) => {
            if (failures) {
              // reject(new Error(`TestRunner finished with ${failures} failures`));
              resolve();
            } else {
              resolve();
            }
          });
        });

        const reportPath = path.join(
          reportDir,
          `${transaction_id}_report.json`
        );

        const search = logs.find((log) => log?.action === "search");
        await database.saveReport({
          id,
          test_id,
          environment: environment,
          subscriber_uri: search?.request?.context?.bap_uri,
          flow_name: givenTest?.name,
          domain: domain,
          environment: environment,
          version: version,
          type: type,
          transaction_id,
          flow_id,
          reportPath: reportPath,
        });

        // await fs.unlink(reportPath);

        axios.post(analyticsAPI, {
          route: "save_flow",
          test_id: test_id,
          flow_id: flow_id,
          role: "Buyer"
        }, {
          headers: { "Content-Type": "application/json" }
        });
      })
    );
  } catch (err) {
    console.log(err);
    return {
      message: {
        ack: {
          status: "NACK"
        }
      },
      error: {
        code: "30000",
        message: "Some Internal Error"
      }
    }
  }
};