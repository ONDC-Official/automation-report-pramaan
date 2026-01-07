module.exports = {
    "type": "object",
    "properties": {
      "update_message_target": {
        "id": "b2c_log_bap_update_message_1",
        "type": "string",
        "minLength": 1
      },
      "order": {
        "id": "b2c_log_bap_update_message_2",
        "type": "object",
        "properties": {
          "id": {
            "id": "b2c_log_bap_update_message_3",
            "type": "string",
            "minLength": 1
          },
          "items": {
            "id": "b2c_log_bap_update_message_4",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "b2c_log_bap_update_message_5",
              "type": "object",
              "properties": {
                "id": {
                  "id": "b2c_log_bap_update_message_6",
                  "type": "string",
                  "minLength": 1
                },
                "descriptor": {
                  "id": "b2c_log_bap_update_message_7",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "b2c_log_bap_update_message_8",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "category_id": {
                  "id": "b2c_log_bap_update_message_9",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          },
          "fulfillments": {
            "id": "b2c_log_bap_update_message_10",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "b2c_log_bap_update_message_11",
              "type": "object",
              "properties": {
                "id": {
                  "id": "b2c_log_bap_update_message_12",
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "id": "b2c_log_bap_update_message_13",
                  "type": "string",
                  "minLength": 1
                },
                "tags": {
                  "id": "b2c_log_bap_update_message_14",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "b2c_log_bap_update_message_15",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "b2c_log_bap_update_message_16",
                        "type": "string",
                        "minLength": 1
                      },
                      "list": {
                        "id": "b2c_log_bap_update_message_17",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "b2c_log_bap_update_message_18",
                          "type": "object",
                          "properties": {
                            "code": {
                              "id": "b2c_log_bap_update_message_19",
                              "type": "string",
                              "minLength": 1
                            },
                            "value": {
                              "id": "b2c_log_bap_update_message_20",
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
          },
          "updated_at": {
            "id": "b2c_log_bap_update_message_21",
            "type": "string",
            "minLength": 1
          }
        }
      }
    },
    "required": ["order"]
  }
  