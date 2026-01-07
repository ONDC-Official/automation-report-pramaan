
module.exports={
   "id": "retail_bpp_on_select_message_01",
      "type": "object",
      "properties": {
        "order": {
           "id": "retail_bpp_on_select_message_02",
          "type": "object",
          "properties": {
            "provider": {
               "id": "retail_bpp_on_select_message_03",
              "type": "object",
              "properties": {
                "id": {
                   "id": "retail_bpp_on_select_message_04",
                  "type": "string",
                  "minLength": 1
                },
                "locations": {
                   "id": "retail_bpp_on_select_message_05",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                     "id": "retail_bpp_on_select_message_06",
                    "type": "object",
                    "properties": {
                      "id": {
                         "id": "retail_bpp_on_select_message_07",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "items": {
               "id": "retail_bpp_on_select_message_08",
              "type": "array",
              "minItems": 1,
              "element": {
                 "id": "retail_bpp_on_select_message_09",
                "type": "object",
                "properties": {
                  "fulfillment_id": {
                     "id": "retail_bpp_on_select_message_10",
                    "type": "string",
                    "minLength": 1
                  },
                  "id": {
                     "id": "retail_bpp_on_select_message_11",
                    "type": "string",
                    "minLength": 1
                  }
                }
              }
            },
            "fulfillments": {
               "id": "retail_bpp_on_select_message_12",
              "type": "array",
              "minItems": 1,
              "element": {
                 "id": "retail_bpp_on_select_message_13",
                "type": "object",
                "properties": {
                  "id": {
                     "id": "retail_bpp_on_select_message_14",
                    "type": "string",
                    "minLength": 1
                  },
                  "type": {
                     "id": "retail_bpp_on_select_message_15",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/provider_name": {
                     "id": "retail_bpp_on_select_message_16",
                    "type": "string",
                    "minLength": 1
                  },
                  "tracking": {
                     "id": "retail_bpp_on_select_message_17",
                    "type": "boolean"
                  },
                  "@ondc/org/category": {
                     "id": "retail_bpp_on_select_message_18",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/TAT": {
                     "id": "retail_bpp_on_select_message_19",
                    "type": "string",
                    "minLength": 1
                  },
                  "state": {
                     "id": "retail_bpp_on_select_message_20",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                         "id": "retail_bpp_on_select_message_21",
                        "type": "object",
                        "properties": {
                          "code": {
                             "id": "retail_bpp_on_select_message_22",
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
            "quote": {
               "id": "retail_bpp_on_select_message_23",
              "type": "object",
              "properties": {
                "price": {
                   "id": "retail_bpp_on_select_message_24",
                  "type": "object",
                  "properties": {
                    "currency": {
                       "id": "retail_bpp_on_select_message_25",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                       "id": "retail_bpp_on_select_message_26",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "breakup": {
                   "id": "retail_bpp_on_select_message_27",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                     "id": "retail_bpp_on_select_message_28",
                    "type": "object",
                    "properties": {
                      "@ondc/org/item_id": {
                         "id": "retail_bpp_on_select_message_29",
                        "type": "string",
                        "minLength": 1
                      },
                      "@ondc/org/item_quantity": {
                         "id": "retail_bpp_on_select_message_30",
                        "type": "object",
                        "properties": {
                          "count": {
                             "id": "retail_bpp_on_select_message_31",
                            "type": "number"
                          }
                        }
                      },
                      "title": {
                         "id": "retail_bpp_on_select_message_32",
                        "type": "string",
                        "minLength": 1
                      },
                      "@ondc/org/title_type": {
                         "id": "retail_bpp_on_select_message_33",
                        "type": "string",
                        "minLength": 1
                      },
                      "price": {
                         "id": "retail_bpp_on_select_message_34",
                        "type": "object",
                        "properties": {
                          "currency": {
                             "id": "retail_bpp_on_select_message_35",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                             "id": "retail_bpp_on_select_message_36",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "item": {
                         "id": "retail_bpp_on_select_message_37",
                        "type": "object",
                        "properties": {
                          "quantity": {
                             "id": "retail_bpp_on_select_message_38",
                            "type": "object",
                            "properties": {
                              "available": {
                                 "id": "retail_bpp_on_select_message_39",
                                "type": "object",
                                "properties": {
                                  "count": {
                                     "id": "retail_bpp_on_select_message_40",
                                    "type": "string",
                                    "minLength": 1
                                  }
                                }
                              },
                              "maximum": {
                                "id": "retail_bpp_on_select_message_41",
                                "type": "object",
                                "properties": {
                                  "count": {
                                    "id": "retail_bpp_on_select_message_42",
                                    "type": "string",
                                    "minLength": 1
                                  }
                                }
                              }
                            }
                          },
                          "price": {
                            "id": "retail_bpp_on_select_message_43",
                            "type": "object",
                            "properties": {
                              "currency": {
                                "id": "retail_bpp_on_select_message_44",
                                "type": "string",
                                "minLength": 1
                              },
                              "value": {
                                "id": "retail_bpp_on_select_message_45",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          }
                        }
                      }
                    },
                      "required": {
                                    "type": "array",
                                    "element": {
                                        "allOf": [
                                            {
                                                "if": {
                                                    "properties": {
                                                        "@ondc/org/title_type": {
                                                            "const": "item"
                                                        }
                                                    }
                                                },
                                                "then": [
                                                    "@ondc/org/item_id",
                                                    "title",
                                                    "@ondc/org/item_quantity",
                                                    "@ondc/org/title_type",
                                                    "price",
                                                    "item"
                                                ]
                                            },
                                            {
                                                "if": {
                                                    "properties": {
                                                        "@ondc/org/title_type": {
                                                            "const": "delivery"
                                                        }
                                                    }
                                                },
                                                "then": [
                                                    "@ondc/org/item_id",
                                                    "@ondc/org/title_type",
                                                    "title",
                                                    "price"
                                                ]
                                            },
                                            {
                                                "if": {
                                                    "properties": {
                                                        "@ondc/org/title_type": {
                                                            "const": ["packing", "misc", "tax"]
                                                        }
                                                    }
                                                },
                                                "then": [
                                                    "@ondc/org/item_id",
                                                    "@ondc/org/title_type",
                                                    "title",
                                                    "price",
                                                ]
                                            },
                                            {
                                                "if": {
                                                    "properties": {
                                                        "@ondc/org/title_type": {
                                                            "const": ["tax"]
                                                        }
                                                    }
                                                },
                                                "then": [
                                                    "@ondc/org/item_id",
                                                    "@ondc/org/title_type",
                                                    "title",
                                                    "price",
                                                ]
                                            }
                                        ]
                                    }
                                }
                  }
                },
                "ttl": {
                  "id": "retail_bpp_on_select_message_46",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          }
        }
      }
    }