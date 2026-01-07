module.exports = {
  "id": "wc_log_bap_confirm_message_01",
  "type": "object",
  "properties": {
    "order": {
      "id": "wc_log_bap_confirm_message_02",
      "type": "object",
      "properties": {
        "provider": {
          "id": "wc_log_bap_confirm_message_03",
          "type": "object",
          "properties": {
            "id": {
              "id": "wc_log_bap_confirm_message_04",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "tags": {
          "id": "wc_log_bap_confirm_message_24",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bap_confirm_message_25",
            "type": "object",
            "properties": {
              "display": {
                "id": "wc_log_bap_confirm_message_26",
                "type": "boolean"
              },
              "descriptor": {
                "id": "wc_log_bap_confirm_message_27",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "wc_log_bap_confirm_message_28",
                    "type": "string",
                    "minLength": 1
                  },
                  "code": {
                    "id": "wc_log_bap_confirm_message_29",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "list": {
                "id": "wc_log_bap_confirm_message_30",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "wc_log_bap_confirm_message_31",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "wc_log_bap_confirm_message_32",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "wc_log_bap_confirm_message_33",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "value": {
                      "id": "wc_log_bap_confirm_message_34",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}