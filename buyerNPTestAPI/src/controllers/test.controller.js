const runTests = require("../tests/test.js");
const Joi = require("joi");
const axios = require("axios");
const { PRAMAAN_SELLER_TESTING_API, PW_LOGS_API, PW_LOGS_API_KEY } = require("../utils/env.js");
const { getHTMLReports } = require("../services/index.service.js");

const bodySchema = Joi.object({
  id: Joi.string().required(),
  version: Joi.string().required(),
  domain: Joi.string().required(),
  logisticsUri: Joi.string().allow("").optional(),
  logisticsId: Joi.string().allow("").optional(),
  logisticsReturn: Joi.string().allow("").optional(),
  environment: Joi.string().required(),
  type: Joi.string().required(),
  aa_mandatory: Joi.boolean().optional(),
  test_id: Joi.string().required(),
  tests: Joi.array()
    .items(
      Joi.object({
        flow_id: Joi.string().required(),
        transaction_id: Joi.string().required(),
        type: Joi.string().optional(),
        logistics_transaction_id: Joi.string().allow("").optional(),
      })
    )
    .required(),
});

module.exports = async function (req, res) {
  try {
    const response = bodySchema.validate(req.body);
    if (response?.error) {
      return res.status(400).json({
        message: {
          ack: {
            status: "NACK",
          },
          error: {
            code: "401",
            message: response?.error?.details[0]?.message,
          },
        },
      });
    }

    const testSuitesReply = await runTests(req.body);
    if (testSuitesReply?.message?.ack?.status === "NACK") {
      return res.status(200).json(testSuitesReply);
    }

    if (req.body.test_id.startsWith("PW")) {
      /** forwarding the request to the seller testing API */
      axios.post(`${PRAMAAN_SELLER_TESTING_API}/runtest`, req.body, {
        headers: { "Content-Type": "application/json" }
      });

      setTimeout(async () => {
        const report = await getHTMLReports(req.body.test_id);
        axios.post(`${PW_LOGS_API}/callback/${req.body.test_id}`, report, {
          headers: {
            "Content-Type": "application/json",
            'x-api-key': PW_LOGS_API_KEY
          }
        });
      }, 60000);
    }

    return res.status(200).json({
      message: {
        ack: {
          status: "ACK",
        },
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
        message: "some internal error occured",
      },
    });
  }
};
