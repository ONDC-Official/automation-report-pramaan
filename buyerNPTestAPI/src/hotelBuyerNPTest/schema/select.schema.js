module.exports={
    "id": "hotel_bap_select_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "hotel_bap_select_message_02",
        "type": "object",
        "properties": {
          "provider": {
            "id": "hotel_bap_select_message_03",
            "type": "object",
            "properties": {
              "id": {
                "id": "hotel_bap_select_message_04",
                "type": "string",
                "minLength": 1
              },
              "time": {
                "id": "hotel_bap_select_message_05",
                "type": "object",
                "properties": {
                  "label": {
                    "id": "hotel_bap_select_message_06",
                    "type": "string",
                    "minLength": 1
                  },
                  "range": {
                    "id": "hotel_bap_select_message_07",
                    "type": "object",
                    "properties": {
                      "start": {
                        "id": "hotel_bap_select_message_08",
                        "type": "string",
                        "minLength": 1
                      },
                      "end": {
                        "id": "hotel_bap_select_message_09",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            }
          },
          "items": {
            "id": "hotel_bap_select_message_10",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "hotel_bap_select_message_11",
              "type": "object",
              "properties": {
                "id": {
                    "id": "hotel_bap_select_message_12",
                  "type": "string",
                  "minLength": 1
                },
                "location_ids": {
                    "id": "hotel_bap_select_message_13",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bap_select_message_14",
                    "type": "object",
                    "properties": {}
                  }
                },
                "quantity": {
                    "id": "hotel_bap_select_message_15",
                  "type": "object",
                  "properties": {
                    "selected": {
                        "id": "hotel_bap_select_message_16",
                      "type": "object",
                      "properties": {
                        "count": {
                            "id": "hotel_bap_select_message_17",
                          "type": "number"
                        }
                      }
                    }
                  }
                },
                "add_ons": {
                    "id": "hotel_bap_select_message_18",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bap_select_message_19",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "hotel_bap_select_message_20",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            }
          },
          "fulfillments": {
            "id": "hotel_bap_select_message_21",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "hotel_bap_select_message_22",
              "type": "object",
              "properties": {
                "tags": {
                    "id": "hotel_bap_select_message_23",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bap_select_message_24",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "hotel_bap_select_message_25",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "hotel_bap_select_message_26",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "list": {
                        "id": "hotel_bap_select_message_27",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                            "id": "hotel_bap_select_message_28",
                          "type": "object",
                          "properties": {
                            "descriptor": {
                                "id": "hotel_bap_select_message_29",
                              "type": "object",
                              "properties": {
                                "code": {
                                    "id": "hotel_bap_select_message_30",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "value": {
                                "id": "hotel_bap_select_message_31",
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
      }
    }
  }