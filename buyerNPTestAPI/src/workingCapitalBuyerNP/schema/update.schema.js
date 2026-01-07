module.exports = {
  "id": "wc_log_bap_update_message_01",
  "type": "object",
  "properties": {
    "update_target": {
      "id": "wc_log_bap_update_message_02",
      "type": "string",
      "minLength": 1,
    },
    "order": {
      "id": "wc_log_bap_update_message_03",
      "type": "object",
      "properties": {
        "id": {
          "id": "wc_log_bap_update_message_04",
          "type": "string",
          "minLength": 1,
        },
        "payments": {
          "id": "wc_log_bap_update_message_05",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bap_update_message_06",
            "type": "object",
            "properties": {
              "time": {
                "id": "wc_log_bap_update_message_07",
                "type": "object",
                "properties": {
                  "label": {
                    "id": "wc_log_bap_update_message_08",
                    "type": "string",
                    "minLength": 1,
                    "enum": ["MISSED_EMI_PAYMENT", "FORECLOSURE","PRE_PART_PAYMENT", "INSTALLMENT"]
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
