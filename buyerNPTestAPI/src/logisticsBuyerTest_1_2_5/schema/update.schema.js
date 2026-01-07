module.exports = {
  "id": "b2c_log_bap_update_message_01",
  "type": "object",
  "properties": {
    "update_target": {
      "id": "b2c_log_bap_update_message_02",
      "type": "string",
      "minLength": 1
    },
    "order": {
      "id": "b2c_log_bap_update_message_03",
      "type": "object",
      "properties": {
        "id": {
          "id": "b2c_log_bap_update_message_04",
          "type": "string",
          "minLength": 1
        },
        "items": {
          "id": "b2c_log_bap_update_message_05",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "b2c_log_bap_update_message_06",
            "type": "object",
            "properties": {
              "id": {
                "id": "b2c_log_bap_update_message_07",
                "type": "string",
                "minLength": 1
              },
              "category_id": {
                "id": "b2c_log_bap_update_message_08",
                "type": "string",
                "minLength": 1
              },
            }
          }
        },
        "fulfillments": {
          "id": "b2c_log_bap_update_message_09",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "b2c_log_bap_update_message_10",
            "type": "object",
            "properties": {
              "id": {
                "id": "b2c_log_bap_update_message_11",
                "type": "string",
                "minLength": 1
              },
              "type": {
                "id": "b2c_log_bap_update_message_12",
                "type": "string",
                "minLength": 1
              },
              // "@ondc/org/awb_no": {
              //   "id": "b2c_log_bap_update_message_13",
              //   "type": "string",
              //   "minLength": 1
              // },
              "start": {
                "id": "b2c_log_bap_update_message_14",
                "type": "object",
                "properties": {
                  "instructions": {
                    "id": "b2c_log_bap_update_message_15",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "b2c_log_bap_update_message_16",
                        "type": "string",
                        "minLength": 1
                      },
                      "short_desc": {
                        "id": "b2c_log_bap_update_message_17",
                        "type": "string",
                        "minLength": 1
                      },
                      "long_desc": {
                        "id": "b2c_log_bap_update_message_18",
                        "type": "string",
                        "minLength": 1
                      },
                      "additional_desc": {
                        "id": "b2c_log_bap_update_message_19",
                        "type": "object",
                        "properties": {
                          "content_type": {
                            "id": "b2c_log_bap_update_message_20",
                            "type": "string",
                            "minLength": 1
                          },
                          "url": {
                            "id": "b2c_log_bap_update_message_21",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  // "authorization": {
                  //   "id": "b2c_log_bap_update_message_22",
                  //   "type": "object",
                  //   "properties": {
                  //     "type": {
                  //       "id": "b2c_log_bap_update_message_23",
                  //       "type": "string",
                  //       "minLength": 1
                  //     },
                  //     "token": {
                  //       "id": "b2c_log_bap_update_message_24",
                  //       "type": "string",
                  //       "minLength": 1
                  //     },
                  //     "valid_from": {
                  //       "id": "b2c_log_bap_update_message_25",
                  //       "type": "string",
                  //       "minLength": 1
                  //     },
                  //     "valid_to": {
                  //       "id": "b2c_log_bap_update_message_26",
                  //       "type": "string",
                  //       "minLength": 1
                  //     }
                  //   }
                  // }
                }
              },
              "end": {
                "id": "b2c_log_bap_update_message_27",
                "type": "object",
                "properties": {
                  "instructions": {
                    "id": "b2c_log_bap_update_message_28",
                    "type": "object",
                    "optional": true,
                    "properties": {
                      "code": {
                        "id": "b2c_log_bap_update_message_29",
                        "type": "string",
                        "optional": true,
                        "minLength": 1
                      },
                      "short_desc": {
                        "id": "b2c_log_bap_update_message_30",
                        "type": "string",
                        "optional": true,
                        "minLength": 1
                      },
                      "long_desc": {
                        "id": "b2c_log_bap_update_message_31",
                        "type": "string",
                        "optional": true,
                        "minLength": 1
                      }
                    }
                  }
                }
              },
              "tags": {
                "id": "b2c_log_bap_update_message_32",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "b2c_log_bap_update_message_33",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "b2c_log_bap_update_message_34",
                      "type": "string",
                      "minLength": 1
                    },
                    "list": {
                      "id": "b2c_log_bap_update_message_35",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "b2c_log_bap_update_message_36",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "b2c_log_bap_update_message_37",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "b2c_log_bap_update_message_38",
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
          "id": "b2c_log_bap_update_message_39",
          "type": "string",
          "minLength": 1
        }
      }
    }
  }
}