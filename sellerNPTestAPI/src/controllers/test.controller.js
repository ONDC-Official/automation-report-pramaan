const runTests = require("../tests/test.js");
const Joi = require("joi");

const bodySchema = Joi.object({
  id: Joi.string().required(),
  version: Joi.string().required(),
  domain: Joi.string().required(),
  environment: Joi.string(),
  logisticsUri: Joi.string().allow("").optional(),
  logisticsId: Joi.string().allow("").optional(),
  logisticsReturn: Joi.string().allow("").optional(),
  type: Joi.string().required(),
  aa_mandatory: Joi.boolean().optional(),
  test_id: Joi.string().required(),
  tests: Joi.array()
    .items(
      Joi.object({
        flow_id: Joi.string().required(),
        transaction_id: Joi.string().required(),
        type: Joi.string().optional(),
        logistics_forward_id: Joi.string().allow("").optional(),
        logistics_return_id: Joi.string().allow("").optional()
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

    const queries = req?.query;
    const testSuitesReply = await runTests(req.body, queries);
    if (testSuitesReply?.message?.ack?.status === "NACK") {
      return res.status(200).json(testSuitesReply);
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
