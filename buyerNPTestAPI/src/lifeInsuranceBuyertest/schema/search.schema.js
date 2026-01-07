module.exports={
  "id": "LI_bap_search_message_01",
    "type": "object",
    "properties": {
      "intent": {
        "id": "LI_bap_search_message_02",
        "type": "object",
        "properties": {
          "category": {
            "id": "LI_bap_search_message_03",
            "type": "object",
            "properties": {
              "descriptor": {
                "id": "LI_bap_search_message_04",
                "type": "object",
                "properties": {
                  "code": {
                    "id": "LI_bap_search_message_05",
                    "type": "string",
                    "minLength": 1
                  }
                }
              }
            }
          },
          // "fulfillment": {
          //   "id": "LI_bap_search_message_06",
          //   "type": "object",
          //   "properties": {
          //     "agent": {
          //       "id": "LI_bap_search_message_07",
          //       "type": "object",
          //       "properties": {
          //         "person": {
          //           "id": "LI_bap_search_message_08",
          //           "type": "object",
          //           "properties": {
          //             "id": {
          //               "id": "LI_bap_search_message_09",
          //               "type": "string",
          //               "minLength": 1
          //             }
          //           }
          //         }
          //       }
          //     }
          //   }
          // },
          "payment": {
            "id": "LI_bap_search_message_10",
            "type": "object",
            "properties": {
              "collected_by": {
                "id": "LI_bap_search_message_11",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "tags": {
            "id": "LI_bap_search_message_12",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bap_search_message_13",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "LI_bap_search_message_14",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "LI_bap_search_message_15",
                      "type": "string",
                      "minLength": 1
                    },
                    "name": {
                      "id": "LI_bap_search_message_16",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "display": {
                  "id": "LI_bap_search_message_17",
                  "type": "boolean"
                },
                "list": {
                  "id": "LI_bap_search_message_18",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bap_search_message_19",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bap_search_message_20",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bap_search_message_21",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                        "id": "LI_bap_search_message_22",
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