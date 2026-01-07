module.exports={
  "id": "hotel_bap_search_message_01",
    "type": "object",
    "properties": {
      "intent": {
        "id": "hotel_bap_search_message_02",
        "type": "object",
        "properties": {
          "category": {
            "id": "hotel_bap_search_message_03",
            "type": "object",
            "properties": {
              "descriptor": {
                "id": "hotel_bap_search_message_04",
                "type": "object",
                "properties": {
                  "code": {
                    "id": "hotel_bap_search_message_05",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "time": {
                "id": "hotel_bap_search_message_06",
                "type": "object",
                "properties": {
                  "label": {
                    "id": "hotel_bap_search_message_07",
                    "type": "string",
                    "minLength": 1
                  },
                  "range": {
                    "id": "hotel_bap_search_message_08",
                    "type": "object",
                    "properties": {
                      "start": {
                        "id": "hotel_bap_search_message_09",
                        "type": "string",
                        "minLength": 1
                      },
                      "end": {
                        "id": "hotel_bap_search_message_10",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            }
          },
          "fulfillment": {
            "id": "hotel_bap_search_message_11",
            "type": "object",
            "properties": {
              "stops": {
                "id": "hotel_bap_search_message_12",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "hotel_bap_search_message_13",
                  "type": "object",
                  "properties": {
                    "type": {
                      "id": "hotel_bap_search_message_14",
                      "type": "string",
                      "minLength": 1
                    },
                    "location": {
                      "id": "hotel_bap_search_message_15",
                      "type": "object",
                      "properties": {
                        "gps": {
                          "id": "hotel_bap_search_message_16",
                          "type": "string",
                          "minLength": 1
                        },
                        "area_code": {
                          "id": "hotel_bap_search_message_17",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": {
            "id": "hotel_bap_search_message_18",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "hotel_bap_search_message_19",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "hotel_bap_search_message_20",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "hotel_bap_search_message_21",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "list": {
                  "id": "hotel_bap_search_message_22",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bap_search_message_23",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "hotel_bap_search_message_24",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "hotel_bap_search_message_25",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                        "id": "hotel_bap_search_message_26",
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