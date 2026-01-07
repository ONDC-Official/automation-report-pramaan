const fs = require("fs").promises;
const axios = require("axios");
const path = require("path");
const Mocha = require("mocha");
const database = require("../config/db");
const { sellerDatabase } = require("../config/sellerDBConnect");
const { FLOWS } = require("../config");

// Credit Domain Test Runners
const testRunnerV2_0_0 = require("../creditSellerNPTest/v2.0.0/testRunner");
const testRunnerV2_1_0 = require("../creditSellerNPTest/v2.1.0/testRunner");
const testRunnerV2_2_0 = require("../creditSellerNPTest/v2.2.0/testRunner");

// Insurance Domain Test Runners
const testRunnerInsurance = require("../insuranceSellerNPTest/testRunner");

//Sachet Insurance Domain Test Runners
const testRunnerSachetInsurance = require("../sachetInsuranceSellerTest/testRunner");

// Giftcard Domain Test Runners
const testRunnerGiftCards = require("../giftCardTests/testRunner");

// RSF Domain Test Runner
const testRunnerRSF2_0 = require("../rsf2.0/testRunner");

// Metro Mobility Test Runner
const testRunnerMetro = require("../metroSellerNPTest/testRunner");

// Logistics Test Runner
const testRunnerLogistics = require("../logisticsSellerNpTest/testRunner");

// Logistics Test Runner
const testRunnerLogistics_1_2_5 = require("../logisticsSellerTest_1_2_5/testRunner");

// Retail Test Runner
const testRunnerRetail = require("../RetailSellerNpTest/testRunner");

// Retail Test Runner
const testRunnerRetail_1_2_5 = require("../RetailSellerTest_1_2_5/testRunner");

// Intercity Test Runner
const testRunnerIntercity = require("../IntercitySellerNPTest/testRunner");

// Metro Mobility Test Runner
const testRunnerInvestment = require("../InvestmentSellerNPTest/2.0.0/testRunner");
const testRunnerInvestment_2_1_0 = require("../InvestmentSellerNPTest/2.1.0/testRunner");

// On Demand Ride Hailing Test Runner
const testRunnerOnDemand = require("../onDemandSellerNPTest/testRunner");

// Entry Pass Test Runner
const testRunnerentryPass = require("../entryPassSellerNPTest/testRunner");

// IGM Test Runner
const testRunnerIGM = require("../igmTest/testRunner");

// IGMv2 Test Runner
const testRunnerIGMV2 = require("../igm2.0.0/testRunner");

// Airline Test Runner
const testRunnerAirline = require("../AirlineSellerNPTest/testRunner");

// Working Capital Domain Test Runner
const testRunnerWorkingCapital = require("../workingCapitalSellerNPTest/testRunner")

// Life Insurnce Domain Test Runner
const testRunnerLifeInsurance = require("../lifeInsurancesellertest/testRunner");

// Logistics Buyer Test Runner for on network tests
const testRunnerLogisticsBuyer_1_2_5 = require("../logisticsBuyerTest_1_2_5/testRunner");

// Logistics Buyer Test Runner for on network tests
const testRunnerLogisticsBuyer = require("../logisticsBuyerNpTest/testRunner");
const { analyticsAPI, PW_LOGS_API, PW_LOGS_API_KEY } = require("../utils/env");

const testRunnerHotelBooking = require("../hotelSellerNPTest/testRunner");

const reportDir = path.resolve(__dirname, "../output");

module.exports = async function (
  { id, version, domain, environment, type, test_id, tests, aa_mandatory = true },
  queries = {}
) {
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
        logs = logs.filter((log) => {
          if (!log?.request?.context?.bpp_id) return true;
          else return log?.request?.context?.bpp_id === id;
        });

        /** handling the incoming request for Protocol Workbench
         *  
         */
        if (test_id.startsWith("PW")) {
          const response = await axios.get(`${PW_LOGS_API}/logs?test_id=${test_id}&transaction_id=${transaction_id}`, {
            headers: {
              'x-api-key': PW_LOGS_API_KEY
            }
          })

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
              since flow display number might be different for each domain. And since retail has a number of children domains we need to match substring
        */
        const currentDomain = logs.map(log => log?.request?.context?.domain)[0];
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
            testFunctions = testRunnerMetro(givenTest, logs, givenTest?.type);
            break;
          case "INVESTMENT":
            switch (version) {
              case "2.0.0":
                testFunctions = testRunnerInvestment(givenTest, logs, type);
                break;
              case "2.1.0":
                testFunctions = testRunnerInvestment_2_1_0(givenTest, logs, type);
                break;
              default:
                break;
            }
            break;
          case "IGM":
            testFunctions = testRunnerIGM(givenTest, logs, version, domain, type);
            break;
          case "IGMV2":
            testFunctions = testRunnerIGMV2(givenTest, version, domain, logs);
            break;
          case "RSF2":
            testFunctions = testRunnerRSF2_0(givenTest, logs);
            break;
          case "MOTOR_INSURANCE":
          case "MARINE_INSURANCE":
          case "HEALTH_INSURANCE":
            testFunctions = testRunnerInsurance(
              givenTest,
              logs,
              givenTest?.type
            );
            break;
          case "ON_DEMAND":
            testFunctions = testRunnerOnDemand(givenTest, logs);
            break;
          case "ENTRY_PASS":
            testFunctions = testRunnerentryPass(givenTest, logs);
            break;
          case "B2C":
            testFunctions = testRunnerLogistics(givenTest, logs);
            break;
          case "B2C_1_2_5":
            testFunctions = testRunnerLogistics_1_2_5(givenTest, logs);
            break;
          case "GIFTCARD":
            testFunctions = testRunnerGiftCards(givenTest, logs);
            break;
          case "RETAIL":
            switch (currentDomain) {
              case "ONDC:NTS10":
                testFunctions = testRunnerRSF2_0(givenTest, logs);
                break;
              default:
                testFunctions = testRunnerRetail(givenTest, logs, domain, test?.type);
                break;
            }
            break;
          case "RETAIL_1_2_5":
            switch (currentDomain) {
              case "ONDC:NTS10":
                testFunctions = testRunnerRSF2_0(givenTest, logs);
                break;
              default:
                testFunctions = testRunnerRetail_1_2_5(givenTest, logs, domain, test?.type);
                break;
            }
            break;
          case "INTERCITY":
            testFunctions = testRunnerIntercity(givenTest, logs, type);
            break;
          case "AIRLINE":
            testFunctions = testRunnerAirline(givenTest, logs);
            break;
          case "WORKING_CAPITAL":
            testFunctions = testRunnerWorkingCapital(givenTest, logs);
            break;
          case "PURCHASE_FINANCE":
            testFunctions = testRunnerV2_2_0(givenTest, logs, queries);
            break;
          case "ACCOMMODATION":
            testFunctions = testRunnerHotelBooking(givenTest, logs, queries);
            break;
          case "Life_Insurance":
            testFunctions = testRunnerLifeInsurance(givenTest, logs, queries);
            break;
          case "SACHET_INSURANCE":
            testFunctions = testRunnerSachetInsurance(givenTest, logs, queries);
            break;
          case "Personal Loan":
          case "Invoice Based Loan":
            switch (version) {
              case "2.0.0":
              case "2.0.1":
                testFunctions = testRunnerV2_0_0(givenTest, logs, queries, aa_mandatory);
                break;
              case "2.1.0":
                testFunctions = testRunnerV2_1_0(givenTest, logs, queries, aa_mandatory);
                break;
            }
            break;
        }
        const parentTestSuite = new Mocha.Suite(
          `${test?.logistics_forward_id ? "Retail Order Tests" : givenTest?.name
          }`
        );
        if (index === 0) {
          const infoSuite = new Mocha.Suite("Parameters entered for the run");
          const paramObj = {
            "Subscriber ID": id,
            Environment: environment,
            Role: "Seller",
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
        const umbrellaSuiteForRetailOnNetwork = new Mocha.Suite(
          `${givenTest?.name}`
        );
        let flagForOnNetwork = false;

        const onNetworkLogisticsFlow = FLOWS.find(
          (flow) => flow?.id === flow_id && flow?.type === "LOGISTICS"
        );

        const forwardLogisticsSuite = new Mocha.Suite(
          `Logistics Forward Flow`
        );
        let logisticLogs = [];
        // logistics tests if retail is on network
        if (test?.logistics_forward_id) {
          // setting the flag for on network to true
          flagForOnNetwork = true;

          // getting logs from seller's DB
          logisticLogs = await sellerDatabase.getLogs(test?.logistics_forward_id);

          const logisticsFunctions = testRunnerLogisticsBuyer(
            onNetworkLogisticsFlow,
            logisticLogs,
            logs
          );
          logisticsFunctions.map(async (fn) => {
            const testSuite = await fn();
            forwardLogisticsSuite.addSuite(testSuite);
          });

          // Adding Retail suite to umbrella as well
          umbrellaSuiteForRetailOnNetwork.addSuite(parentTestSuite);

          // Adding Logistics Suite to umbrella suite
          umbrellaSuiteForRetailOnNetwork.addSuite(forwardLogisticsSuite);
        }

        // logistics tests if it is buyer initiated return
        if (test?.logistics_return_id) {
          const returnLogisticsSuite = new Mocha.Suite(`Logistics Return Flow`);

          // getting logs from seller's DB
          let logisticReturnLogs = await sellerDatabase.getLogs(
            test?.logistics_return_id
          );

          const logisticsBuyerReturnFunctions = testRunnerLogisticsBuyer(
            onNetworkLogisticsFlow,
            logisticLogs,
            logs,
            logisticReturnLogs
          );
          logisticsBuyerReturnFunctions.map(async (fn) => {
            const testSuite = await fn();
            forwardLogisticsSuite.addSuite(testSuite);
          });

          umbrellaSuiteForRetailOnNetwork.addSuite(returnLogisticsSuite);
        }

        if (flagForOnNetwork) {
          testRunner.suite.addSuite(umbrellaSuiteForRetailOnNetwork);
        } else {
          testRunner.suite.addSuite(parentTestSuite);
        }

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

        const on_search_log = logs.find((log) => log?.action === "on_search");
        await database.saveReport({
          id,
          test_id,
          subscriber_uri: on_search_log?.request?.context?.bpp_uri,
          flow_name: givenTest?.id === "RET_9" ? givenTest?.name + " " + test?.type : givenTest?.name,
          domain: domain,
          environment: environment,
          type: type,
          version: version,
          transaction_id,
          flow_id,
          reportPath: reportPath,
        });
        await fs.unlink(reportPath);
        axios.post(analyticsAPI, {
          route: "save_flow",
          test_id: test_id,
          flow_id: flow_id,
          role: "Seller"
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