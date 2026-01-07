module.exports = {
  "id": "wc_log_bpp_on_search_message_01",
  "type": "object",
  "properties": {
    "catalog": {
      "id": "wc_log_bpp_on_search_message_02",
      "type": "object",
      "properties": {
        "descriptor": {
          "id": "wc_log_bpp_on_search_message_03",
          "type": "object",
          "properties": {
            "name": {
              "id": "wc_log_bpp_on_search_message_04",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "providers": {
          "id": "wc_log_bpp_on_search_message_05",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bpp_on_search_message_06",
            "type": "object",
            "properties": {
              "id": {
                "id": "wc_log_bpp_on_search_message_07",
                "type": "string",
                "minLength": 1
              },
              "descriptor": {
                "id": "wc_log_bpp_on_search_message_08",
                "type": "object",
                "properties": {
                  "images": {
                    "id": "wc_log_bpp_on_search_message_09",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "wc_log_bpp_on_search_message_10",
                      "type": "object",
                      "properties": {
                        "url": {
                          "id": "wc_log_bpp_on_search_message_11",
                          "type": "string",
                          "minLength": 1
                        },
                        "size_type": {
                          "id": "wc_log_bpp_on_search_message_12",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  },
                  "name": {
                    "id": "wc_log_bpp_on_search_message_13",
                    "type": "string",
                    "minLength": 1
                  },
                  "short_desc": {
                    "id": "wc_log_bpp_on_search_message_14",
                    "type": "string",
                    "minLength": 1
                  },
                  "long_desc": {
                    "id": "wc_log_bpp_on_search_message_15",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "categories": {
                "id": "wc_log_bpp_on_search_message_16",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "wc_log_bpp_on_search_message_17",
                  "type": "object",
                  "properties": {
                    "id": {
                      "id": "wc_log_bpp_on_search_message_18",
                      "type": "string",
                      "minLength": 1
                    },
                    "descriptor": {
                      "id": "wc_log_bpp_on_search_message_19",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "wc_log_bpp_on_search_message_20",
                          "type": "string",
                          "minLength": 1,
                          "enum":["WORKING_CAPITAL_LOAN","SOLE_PROPRIETORSHIP","PRIVATE_LTD","PARTNERSHIP_FIRM"]
                        },
                        "name": {
                          "id": "wc_log_bpp_on_search_message_21",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                }
              },
              "items": {
                "id": "wc_log_bpp_on_search_message_22",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "wc_log_bpp_on_search_message_23",
                  "type": "object",
                  "properties": {
                    "id": {
                      "id": "wc_log_bpp_on_search_message_24",
                      "type": "string",
                      "minLength": 1
                    },
                    "parent_item_id": {
                      "id": "wc_log_bpp_on_search_message_25",
                      "type": "string",
                      "minLength": 1
                    },
                    "descriptor": {
                      "id": "wc_log_bpp_on_search_message_26",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "wc_log_bpp_on_search_message_27",
                          "type": "string",
                          "minLength": 1,
                          "enum":["LOAN"]
                        },
                        "name": {
                          "id": "wc_log_bpp_on_search_message_28",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "category_ids": {
                      "id": "wc_log_bpp_on_search_message_29",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "wc_log_bpp_on_search_message_30",
                        "type": "object",
                        "properties": {}
                      }
                    },
                    "fulfillment_ids": {
                      "id": "wc_log_bpp_on_search_message_31",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "wc_log_bpp_on_search_message_32",
                        "type": "object",
                        "properties": {}
                      }
                    },
                    "tags": {
                      "id": "wc_log_bpp_on_search_message_33",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "wc_log_bpp_on_search_message_34",
                        "type": "object",
                        "properties": {
                          "descriptor": {
                            "id": "wc_log_bpp_on_search_message_35",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "wc_log_bpp_on_search_message_36",
                                "type": "string",
                                "minLength": 1
                              },
                              "name": {
                                "id": "wc_log_bpp_on_search_message_37",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "list": {
                            "id": "wc_log_bpp_on_search_message_38",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                              "id": "wc_log_bpp_on_search_message_39",
                              "type": "object",
                              "properties": {
                                "descriptor": {
                                  "id": "wc_log_bpp_on_search_message_40",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "wc_log_bpp_on_search_message_41",
                                      "type": "string",
                                      "minLength": 1
                                    },
                                    "name": {
                                      "id": "wc_log_bpp_on_search_message_42",
                                      "type": "string",
                                      "minLength": 1
                                    }
                                  }
                                },
                                "value": {
                                  "id": "wc_log_bpp_on_search_message_43",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          },
                          "display": {
                            "id": "wc_log_bpp_on_search_message_44",
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "matched": {
                      "id": "wc_log_bpp_on_search_message_45",
                      "type": "boolean"
                    },
                    "recommended": {
                      "id": "wc_log_bpp_on_search_message_46",
                      "type": "boolean"
                    }
                  }
                }
              },
              "tags": {
                "id": "wc_log_bpp_on_search_message_47",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "wc_log_bpp_on_search_message_48",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "wc_log_bpp_on_search_message_49",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "wc_log_bpp_on_search_message_50",
                          "type": "string",
                          "minLength": 1
                        },
                        "name": {
                          "id": "wc_log_bpp_on_search_message_51",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "list": {
                      "id": "wc_log_bpp_on_search_message_52",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "wc_log_bpp_on_search_message_53",
                        "type": "object",
                        "properties": {
                          "descriptor": {
                            "id": "wc_log_bpp_on_search_message_54",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "wc_log_bpp_on_search_message_55",
                                "type": "string",
                                "minLength": 1
                              },
                              "name": {
                                "id": "wc_log_bpp_on_search_message_56",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "value": {
                            "id": "wc_log_bpp_on_search_message_57",
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
      },
      "tags": {
        "id": "wc_log_bpp_on_search_message_84",
        "type": "array",
        "minItems": 1,
        "element": {
          "id": "wc_log_bpp_on_search_message_85",
          "type": "object",
          "properties": {
            "display": {
              "id": "wc_log_bpp_on_search_message_86",
              "type": "boolean"
            },
            "descriptor": {
              "id": "wc_log_bpp_on_search_message_87",
              "type": "object",
              "properties": {
                "name": {
                  "id": "wc_log_bpp_on_search_message_88",
                  "type": "string",
                  "minLength": 1
                },
                "code": {
                  "id": "wc_log_bpp_on_search_message_89",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "list": {
              "id": "wc_log_bpp_on_search_message_90",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "wc_log_bpp_on_search_message_91",
                "type": "object",
                "properties": {
                  "descriptor": {
                    "id": "wc_log_bpp_on_search_message_92",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "wc_log_bpp_on_search_message_93",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "value": {
                    "id": "wc_log_bpp_on_search_message_94",
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
