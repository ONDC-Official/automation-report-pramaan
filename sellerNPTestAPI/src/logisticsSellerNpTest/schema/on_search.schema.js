module.exports = {
  "type": "object",
  "properties": {
    "catalog": {
      "id": "b2c_log_bpp_on_search_message_1",
      "type": "object",
      "properties": {
        "bpp/descriptor": {
          "id": "b2c_log_bpp_on_search_message_2",
          "type": "object",
          "properties": {
            "name": {
              "id": "b2c_log_bpp_on_search_message_3",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "bpp/providers": {
          "id": "b2c_log_bpp_on_search_message_4",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "b2c_log_bpp_on_search_message_5",
            "type": "object",
            "properties": {
              "id": {
                "id": "b2c_log_bpp_on_search_message_6",
                "type": "string",
                "minLength": 1
              },
              "descriptor": {
                "id": "b2c_log_bpp_on_search_message_7",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "b2c_log_bpp_on_search_message_8",
                    "type": "string",
                    "minLength": 1
                  },
                  "short_desc": {
                    "id": "b2c_log_bpp_on_search_message_9",
                    "type": "string",
                    "minLength": 1
                  },
                  "long_desc": {
                    "id": "b2c_log_bpp_on_search_message_10",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "fulfillments": {
                "id": "b2c_log_bpp_on_search_message_18",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "b2c_log_bpp_on_search_message_19",
                  "type": "object",
                  "properties": {
                    "id": {
                      "id": "b2c_log_bpp_on_search_message_20",
                      "type": "string",
                      "minLength": 1
                    },
                    "type": {
                      "id": "b2c_log_bpp_on_search_message_21",
                      "type": "string",
                      "minLength": 1
                    },
                    "start": {
                      "id": "b2c_log_bpp_on_search_message_22",
                      "type": "object",
                      "optional": true,
                      "properties": {
                        "time": {
                          "id": "b2c_log_bpp_on_search_message_23",
                          "type": "object",
                          "optional": true,
                          "properties": {
                            "duration": {
                              "id": "b2c_log_bpp_on_search_message_24",
                              "type": "string",
                              "optional": true,
                              "minLength": 1
                            }
                          }
                        }
                      }
                    },
                    "tags": {
                      "id": "b2c_log_bpp_on_search_message_25",
                      "type": "array",
                      "optional": true,
                      "minItems": 1,
                      "element": {
                        "id": "b2c_log_bpp_on_search_message_26",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "b2c_log_bpp_on_search_message_27",
                            "type": "string",
                            "minLength": 1
                          },
                          "list": {
                            "id": "b2c_log_bpp_on_search_message_28",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                              "id": "b2c_log_bpp_on_search_message_29",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "b2c_log_bpp_on_search_message_30",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "value": {
                                  "id": "b2c_log_bpp_on_search_message_31",
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
                  "required": {
                    "id": "retail_bpp_on_search_message_23",
                    "type": "array",
                    "element": {
                      "allOf": [
                        {
                          "if": {
                            "properties": {
                              "id": "retail_bpp_on_search_message_24",
                              "type": "params",
                              "type": {
                                "const": [
                                  "Delivery"
                                ]
                              }
                            }
                          },
                          "then": [
                            "id",
                            "start",
                            "type",
                            "tags"
                          ]
                        },
                        {
                          "if": {
                            "properties": {
                              "id": "retail_bpp_on_search_message_24",
                              "type": "params",
                              "type": {
                                "const": [
                                  "RTO"
                                ]
                              }
                            }
                          },
                          "then": [
                            "id",
                            "type",

                          ]
                        }
                      ]
                    }
                  },
                }
              },
              "items": {
                "id": "b2c_log_bpp_on_search_message_32",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "b2c_log_bpp_on_search_message_33",
                  "type": "object",
                  "properties": {
                    "id": {
                      "id": "b2c_log_bpp_on_search_message_34",
                      "type": "string",
                      "minLength": 1
                    },
                    "category_id": {
                      "id": "b2c_log_bpp_on_search_message_36",
                      "type": "string",
                      "minLength": 1
                    },
                    "descriptor": {
                      "id": "b2c_log_bpp_on_search_message_37",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "b2c_log_bpp_on_search_message_38",
                          "type": "string",
                          "minLength": 1
                        },
                        "name": {
                          "id": "b2c_log_bpp_on_search_message_39",
                          "type": "string",
                          "minLength": 1
                        },
                        "long_desc": {
                          "id": "b2c_log_bpp_on_search_message_40",
                          "type": "string",
                          "minLength": 1
                        },
                        "short_desc": {
                          "id": "b2c_log_bpp_on_search_message_41",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "fulfillment_id": {
                      "id": "b2c_log_bpp_on_search_message_42",
                      "type": "string",
                      "minLength": 1
                    },
                    "time": {
                      "id": "b2c_log_bpp_on_search_message_43",
                      "type": "object",
                      "properties": {
                        "label": {
                          "id": "b2c_log_bpp_on_search_message_44",
                          "type": "string",
                          "minLength": 1
                        },
                        "duration": {
                          "id": "b2c_log_bpp_on_search_message_45",
                          "type": "string",
                          "minLength": 1
                        },
                        "timestamp": {
                          "id": "b2c_log_bpp_on_search_message_46",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "price": {
                      "id": "b2c_log_bpp_on_search_message_47",
                      "type": "object",
                      "properties": {
                        "currency": {
                          "id": "b2c_log_bpp_on_search_message_48",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                          "id": "b2c_log_bpp_on_search_message_49",
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
  },
  "required": ["catalog"]
}
