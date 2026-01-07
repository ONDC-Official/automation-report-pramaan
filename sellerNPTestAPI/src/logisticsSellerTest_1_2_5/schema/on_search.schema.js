module.exports = {
  "id": "b2c_log_bpp_on_search_message_01",
  "type": "object",
  "properties": {
    "catalog": {
      "id": "b2c_log_bpp_on_search_message_02",
      "type": "object",
      "properties": {
        "bpp/descriptor": {
          "id": "b2c_log_bpp_on_search_message_03",
          "type": "object",
          "properties": {
            "name": {
              "id": "b2c_log_bpp_on_search_message_04",
              "type": "string",
              "minLength": 1
            },
            // "tags": {
            //   "id": "b2c_log_bpp_on_search_message_05",
            //   "type": "array",
            //   "minItems": 1,
            //   "element": {
            //     "id": "b2c_log_bpp_on_search_message_06",
            //     "type": "object",
            //     "properties": {
            //       "code": {
            //         "id": "b2c_log_bpp_on_search_message_07",
            //         "type": "string",
            //         "minLength": 1
            //       },
            //       "list": {
            //         "id": "b2c_log_bpp_on_search_message_08",
            //         "type": "array",
            //         "minItems": 1,
            //         "element": {
            //           "id": "b2c_log_bpp_on_search_message_09",
            //           "type": "object",
            //           "properties": {
            //             "code": {
            //               "id": "b2c_log_bpp_on_search_message_10",
            //               "type": "string",
            //               "minLength": 1
            //             },
            //             "value": {
            //               "id": "b2c_log_bpp_on_search_message_11",
            //               "type": "string",
            //               "minLength": 0
            //             }
            //           }
            //         }
            //       }
            //     }
            //   }
            // }
          }
        },
        "bpp/providers": {
          "id": "b2c_log_bpp_on_search_message_12",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "b2c_log_bpp_on_search_message_13",
            "type": "object",
            "properties": {
              "id": {
                "id": "b2c_log_bpp_on_search_message_14",
                "type": "string",
                "minLength": 1
              },
              "descriptor": {
                "id": "b2c_log_bpp_on_search_message_15",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "b2c_log_bpp_on_search_message_16",
                    "type": "string",
                    "minLength": 1
                  },
                  "short_desc": {
                    "id": "b2c_log_bpp_on_search_message_17",
                    "type": "string",
                    "minLength": 1
                  },
                  "long_desc": {
                    "id": "b2c_log_bpp_on_search_message_18",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "categories": {
                "id": "b2c_log_bpp_on_search_message_19",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "b2c_log_bpp_on_search_message_20",
                  "type": "object",
                  "properties": {
                    // "id": {
                    //   "id": "b2c_log_bpp_on_search_message_21",
                    //   "type": "string",
                    //   "minLength": 1
                    // },
                    "time": {
                      "id": "b2c_log_bpp_on_search_message_22",
                      "type": "object",
                      "properties": {
                        "label": {
                          "id": "b2c_log_bpp_on_search_message_23",
                          "type": "string",
                          "minLength": 1
                        },
                        "duration": {
                          "id": "b2c_log_bpp_on_search_message_24",
                          "type": "string",
                          "minLength": 1
                        },
                        "timestamp": {
                          "id": "b2c_log_bpp_on_search_message_25",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                }
              },
              "fulfillments": {
                "id": "b2c_log_bpp_on_search_message_26",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "b2c_log_bpp_on_search_message_27",
                  "type": "object",
                  "properties": {
                    "id": {
                      "id": "b2c_log_bpp_on_search_message_28",
                      "type": "string",
                      "minLength": 1
                    },
                    "type": {
                      "id": "b2c_log_bpp_on_search_message_29",
                      "enum": ["Delivery", "Return", "RTO"],
                      "type": "string",
                      "minLength": 1
                    },
                    "start": {
                      "id": "b2c_log_bpp_on_search_message_30",
                      "type": "object",
                      "properties": {
                        "time": {
                          "id": "b2c_log_bpp_on_search_message_31",
                          "type": "object",
                          "properties": {
                            "duration": {
                              "id": "b2c_log_bpp_on_search_message_32",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        }
                      }
                    },
                    "tags": {
                      "id": "b2c_log_bpp_on_search_message_33",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "b2c_log_bpp_on_search_message_34",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "b2c_log_bpp_on_search_message_35",
                            "type": "string",
                            "minLength": 1
                          },
                          "list": {
                            "id": "b2c_log_bpp_on_search_message_36",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                              "id": "b2c_log_bpp_on_search_message_37",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "b2c_log_bpp_on_search_message_38",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "value": {
                                  "id": "b2c_log_bpp_on_search_message_39",
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
                    "type": "array",
                    "element": {
                      "allOf": [
                        {
                          "if": {
                            "properties": {
                              "type": {
                                "const": "Delivery"
                              }
                            }
                          },
                          "then": [
                            "id",
                            "type",
                            "start",
                            "tags"
                          ]
                        },
                        {
                          "if": {
                            "properties": {
                              "type": {
                                "const": "RTO"
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
                  }
                }
              },
              // "locations": {
              //   "id": "b2c_log_bpp_on_search_message_40",
              //   "type": "array",
              //   "minItems": 1,
              //   "element": {
              //     "id": "b2c_log_bpp_on_search_message_41",
              //     "type": "object",
              //     "properties": {
              //       "id": {
              //         "id": "b2c_log_bpp_on_search_message_42",
              //         "type": "string",
              //         "minLength": 1
              //       },
              //       "gps": {
              //         "id": "b2c_log_bpp_on_search_message_43",
              //         "type": "string",
              //         "minLength": 1
              //       },
              //       "address": {
              //         "id": "b2c_log_bpp_on_search_message_44",
              //         "type": "object",
              //         "properties": {
              //           "street": {
              //             "id": "b2c_log_bpp_on_search_message_45",
              //             "type": "string",
              //             "minLength": 1
              //           },
              //           "city": {
              //             "id": "b2c_log_bpp_on_search_message_46",
              //             "type": "string",
              //             "minLength": 1
              //           },
              //           "area_code": {
              //             "id": "b2c_log_bpp_on_search_message_47",
              //             "type": "string",
              //             "minLength": 1
              //           },
              //           "state": {
              //             "id": "b2c_log_bpp_on_search_message_48",
              //             "type": "string",
              //             "minLength": 1
              //           }
              //         }
              //       }
              //     }
              //   }
              // },
              "items": {
                "id": "b2c_log_bpp_on_search_message_49",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "b2c_log_bpp_on_search_message_50",
                  "type": "object",
                  "properties": {
                    "id": {
                      "id": "b2c_log_bpp_on_search_message_51",
                      "type": "string",
                      "minLength": 1
                    },
                    // "category_id": {
                    //   "id": "b2c_log_bpp_on_search_message_53",
                    //   "type": "string",
                    //   "minLength": 1
                    // },
                    "fulfillment_id": {
                      "id": "b2c_log_bpp_on_search_message_54",
                      "type": "string",
                      "minLength": 1
                    },
                    "descriptor": {
                      "id": "b2c_log_bpp_on_search_message_55",
                      "type": "object",
                      "properties": {
                        // "code": {
                        //   "id": "b2c_log_bpp_on_search_message_56",
                        //   "type": "string",
                        //   "minLength": 1
                        // },
                        "name": {
                          "id": "b2c_log_bpp_on_search_message_57",
                          "type": "string",
                          "minLength": 1
                        },
                        "short_desc": {
                          "id": "b2c_log_bpp_on_search_message_58",
                          "type": "string",
                          "minLength": 1
                        },
                        "long_desc": {
                          "id": "b2c_log_bpp_on_search_message_59",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "price": {
                      "id": "b2c_log_bpp_on_search_message_60",
                      "type": "object",
                      "properties": {
                        "currency": {
                          "id": "b2c_log_bpp_on_search_message_61",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                          "id": "b2c_log_bpp_on_search_message_62",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "time": {
                      "id": "b2c_log_bpp_on_search_message_63",
                      "type": "object",
                      "properties": {
                        "label": {
                          "id": "b2c_log_bpp_on_search_message_64",
                          "type": "string",
                          "minLength": 1
                        },
                        "duration": {
                          "id": "b2c_log_bpp_on_search_message_65",
                          "type": "string",
                          "minLength": 1
                        },
                        "timestamp": {
                          "id": "b2c_log_bpp_on_search_message_66",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                }
              },
              // "tags": {
              //   "id": "b2c_log_bpp_on_search_message_67",
              //   "type": "array",
              //   "minItems": 1,
              //   "element": {
              //     "id": "b2c_log_bpp_on_search_message_68",
              //     "type": "object",
              //     "properties": {
              //       "code": {
              //         "id": "b2c_log_bpp_on_search_message_69",
              //         "type": "string",
              //         "minLength": 1
              //       },
              //       "list": {
              //         "id": "b2c_log_bpp_on_search_message_70",
              //         "type": "array",
              //         "minItems": 1,
              //         "element": {
              //           "id": "b2c_log_bpp_on_search_message_71",
              //           "type": "object",
              //           "properties": {
              //             "code": {
              //               "id": "b2c_log_bpp_on_search_message_72",
              //               "type": "string",
              //               "minLength": 1
              //             },
              //             "value": {
              //               "id": "b2c_log_bpp_on_search_message_73",
              //               "type": "string",
              //               "minLength": 1
              //             }
              //           }
              //         }
              //       }
              //     }
              //   }
              // }
            }
          }
        },

      }
    }
  }
}