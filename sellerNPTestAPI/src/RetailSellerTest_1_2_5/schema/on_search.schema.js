module.exports = {
  "id": "retail_bpp_on_search_message_01",
      "type": "object",
      "properties": {
        "catalog": {
          "id": "retail_bpp_on_search_message_02",
          "type": "object",
          "properties": {
            // "bpp/fulfillments": {
            //   "id": "retail_bpp_on_search_message_03",
            //   "type": "array",
            //   "minItems": 1,
            //   "element": {
            //     "id": "retail_bpp_on_search_message_04",
            //     "type": "object",
            //     "properties": {
            //       "id": {
            //         "id": "retail_bpp_on_search_message_05",
            //         "type": "string",
            //         "minLength": 1
            //       },
            //       "type": {
            //         "id": "retail_bpp_on_search_message_06",
            //         "type": "string",
            //         "minLength": 1
            //       }
            //     }
            //   }
            // },
            "bpp/descriptor": {
              "id": "retail_bpp_on_search_message_07",
              "type": "object",
              "properties": {
                "name": {
                  "id": "retail_bpp_on_search_message_08",
                  "type": "string",
                  "minLength": 1
                },
                "symbol": {
                  "id": "retail_bpp_on_search_message_09",
                  "type": "string",
                  "minLength": 1
                },
                "short_desc": {
                  "id": "retail_bpp_on_search_message_10",
                  "type": "string",
                  "minLength": 1
                },
                "long_desc": {
                   "id": "retail_bpp_on_search_message_11",
                  "type": "string",
                  "minLength": 1
                },
                "images": {
                   "id": "retail_bpp_on_search_message_12",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                     "id": "retail_bpp_on_search_message_13",
                    "type": "object",
                    "properties": {}
                  }
                },
                "tags": {
                   "id": "retail_bpp_on_search_message_14",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                     "id": "retail_bpp_on_search_message_15",
                    "type": "object",
                    "properties": {
                      "code": {
                         "id": "retail_bpp_on_search_message_16",
                        "type": "string",
                        "minLength": 1
                      },
                      "list": {
                         "id": "retail_bpp_on_search_message_17",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                           "id": "retail_bpp_on_search_message_18",
                          "type": "object",
                          "properties": {
                            "code": {
                               "id": "retail_bpp_on_search_message_19",
                              "type": "string",
                              "minLength": 1
                            },
                            "value": {
                               "id": "retail_bpp_on_search_message_20",
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
            },
            "bpp/providers": {
               "id": "retail_bpp_on_search_message_21",
              "type": "array",
              "minItems": 1,
              "element": {
                 "id": "retail_bpp_on_search_message_22",
                "type": "object",
                "properties": {
                  "id": {
                     "id": "retail_bpp_on_search_message_23",
                    "type": "string",
                    "minLength": 1
                  },
                  "time": {
                     "id": "retail_bpp_on_search_message_24",
                    "type": "object",
                    "properties": {
                      "label": {
                         "id": "retail_bpp_on_search_message_25",
                        "type": "string",
                        "minLength": 1
                      },
                      "timestamp": {
                         "id": "retail_bpp_on_search_message_26",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "rating": {
                     "id": "retail_bpp_on_search_message_27",
                    "type": "string",
                    "minLength": 1
                  },
                  "fulfillments": {
                     "id": "retail_bpp_on_search_message_28",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                       "id": "retail_bpp_on_search_message_29",
                      "type": "object",
                      "properties": {
                        "id": {
                           "id": "retail_bpp_on_search_message_30",
                          "type": "string",
                          "minLength": 1
                        },
                        "type": {
                           "id": "retail_bpp_on_search_message_31",
                          "type": "string",
                          "minLength": 1
                        },
                        "contact": {
                           "id": "retail_bpp_on_search_message_32",
                          "type": "object",
                          "properties": {
                            "phone": {
                               "id": "retail_bpp_on_search_message_33",
                              "type": "string",
                              "minLength": 1
                            },
                            "email": {
                               "id": "retail_bpp_on_search_message_34",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        }
                      }
                    }
                  },
                  "descriptor": {
                     "id": "retail_bpp_on_search_message_35",
                    "type": "object",
                    "properties": {
                      "name": {
                         "id": "retail_bpp_on_search_message_36",
                        "type": "string",
                        "minLength": 1
                      },
                      "symbol": {
                         "id": "retail_bpp_on_search_message_37",
                        "type": "string",
                        "minLength": 1
                      },
                      "short_desc": {
                         "id": "retail_bpp_on_search_message_38",
                        "type": "string",
                        "minLength": 1
                      },
                      "long_desc": {
                         "id": "retail_bpp_on_search_message_39",
                        "type": "string",
                        "minLength": 1
                      },
                      "images": {
                         "id": "retail_bpp_on_search_message_40",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "retail_bpp_on_search_message_41",
                          "type": "object",
                          "properties": {}
                        }
                      }
                    }
                  },
                  "@ondc/org/fssai_license_no": {
                    "id": "retail_bpp_on_search_message_42",
                    "type": "string",
                    "minLength": 1
                  },
                  "ttl": {
                    "id": "retail_bpp_on_search_message_43",
                    "type": "string",
                    "minLength": 1
                  },
                  "locations": {
                    "id": "retail_bpp_on_search_message_44",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "retail_bpp_on_search_message_45",
                      "type": "object",
                      "properties": {
                        "id": {
                          "id": "retail_bpp_on_search_message_46",
                          "type": "string",
                          "minLength": 1
                        },
                        "time": {
                          "id": "retail_bpp_on_search_message_47",
                          "type": "object",
                          "properties": {
                            "label": {
                              "id": "retail_bpp_on_search_message_48",
                              "type": "string",
                              "minLength": 1
                            },
                            "timestamp": {
                              "id": "retail_bpp_on_search_message_49",
                              "type": "string",
                              "minLength": 1
                            },
                            // "days": {
                            //   "id": "retail_bpp_on_search_message_50",
                            //   "type": "string",
                            //   "minLength": 1
                            // },
                            "schedule": {
                              "id": "retail_bpp_on_search_message_51",
                              "type": "object",
                              "properties": {
                                "holidays": {
                                  "id": "retail_bpp_on_search_message_52",
                                  "type": "array",
                                  "element": {
                                    "id": "retail_bpp_on_search_message_53",
                                    "type": "object",
                                    "properties": {}
                                  }
                                },
                                // "frequency": {
                                //   "id": "retail_bpp_on_search_message_54",
                                //   "type": "string",
                                //   "minLength": 1
                                // },
                                // "times": {
                                //   "id": "retail_bpp_on_search_message_55",
                                //   "type": "array",
                                //   "minItems": 1,
                                //   "element": {
                                //     "id": "retail_bpp_on_search_message_56",
                                //     "type": "object",
                                //     "properties": {}
                                //   }
                                // }
                              }
                            },
                            // "range": {
                            //   "id": "retail_bpp_on_search_message_57",
                            //   "type": "object",
                            //   "properties": {
                            //     "start": {
                            //       "id": "retail_bpp_on_search_message_58",
                            //       "type": "string",
                            //       "minLength": 1
                            //     },
                            //     "end": {
                            //       "id": "retail_bpp_on_search_message_59",
                            //       "type": "string",
                            //       "minLength": 1
                            //     }
                            //   }
                            // }
                          }
                        },
                        "gps": {
                          "id": "retail_bpp_on_search_message_60",
                          "type": "string",
                          "minLength": 1
                        },
                        "address": {
                          "id": "retail_bpp_on_search_message_61",
                          "type": "object",
                          "properties": {
                            "locality": {
                              "id": "retail_bpp_on_search_message_62",
                              "type": "string",
                              "minLength": 1
                            },
                            "street": {
                              "id": "retail_bpp_on_search_message_63",
                              "type": "string",
                              "minLength": 1
                            },
                            "city": {
                              "id": "retail_bpp_on_search_message_64",
                              "type": "string",
                              "minLength": 1
                            },
                            "area_code": {
                              "id": "retail_bpp_on_search_message_65",
                              "type": "string",
                              "minLength": 1
                            },
                            "state": {
                              "id": "retail_bpp_on_search_message_66",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        },
                        // "circle": {
                        //   "id": "retail_bpp_on_search_message_67",
                        //   "type": "object",
                        //   "properties": {
                        //     "gps": {
                        //       "id": "retail_bpp_on_search_message_68",
                        //       "type": "string",
                        //       "minLength": 1
                        //     },
                        //     "radius": {
                        //       "id": "retail_bpp_on_search_message_69",
                        //       "type": "object",
                        //       "properties": {
                        //         "unit": {
                        //           "id": "retail_bpp_on_search_message_70",
                        //           "type": "string",
                        //           "minLength": 1
                        //         },
                        //         "value": {
                        //           "id": "retail_bpp_on_search_message_71",
                        //           "type": "string",
                        //           "minLength": 1
                        //         }
                        //       }
                        //     }
                        //   }
                        // }
                      }
                    }
                  },
                  "categories": {
                    "id": "retail_bpp_on_search_message_72",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "retail_bpp_on_search_message_73",
                      "type": "object",
                      "properties": {
                        "id": {
                          "id": "retail_bpp_on_search_message_74",
                          "type": "string",
                          "minLength": 1
                        },
                        "parent_category_id": {
                          "id": "retail_bpp_on_search_message_75",
                          "type": "string",
                          "minLength": 1
                        },
                        "descriptor": {
                          "id": "retail_bpp_on_search_message_76",
                          "type": "object",
                          "properties": {
                            "name": {
                              "id": "retail_bpp_on_search_message_77",
                              "type": "string",
                              "minLength": 1
                            },
                            "short_desc": {
                              "id": "retail_bpp_on_search_message_78",
                              "type": "string",
                              "minLength": 1
                            },
                            "long_desc": {
                              "id": "retail_bpp_on_search_message_79",
                              "type": "string",
                              "minLength": 1
                            },
                            "images": {
                              "id": "retail_bpp_on_search_message_80",
                              "type": "array",
                              "minItems": 1,
                              "element": {
                                 "id": "retail_bpp_on_search_message_81",
                                "type": "object",
                                "properties": {}
                              }
                            }
                          }
                        },
                        "tags": {
                           "id": "retail_bpp_on_search_message_82",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                             "id": "retail_bpp_on_search_message_83",
                            "type": "object",
                            "properties": {
                              "code": {
                                 "id": "retail_bpp_on_search_message_84",
                                "type": "string",
                                "minLength": 1
                              },
                              "list": {
                                 "id": "retail_bpp_on_search_message_85",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                   "id": "retail_bpp_on_search_message_86",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                       "id": "retail_bpp_on_search_message_87",
                                      "type": "string",
                                      "minLength": 1
                                    },
                                    "value": {
                                       "id": "retail_bpp_on_search_message_88",
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
                  "items": {
                     "id": "retail_bpp_on_search_message_89",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                       "id": "retail_bpp_on_search_message_90",
                      "type": "object",
                      "properties": {
                        "id": {
                          "id": "retail_bpp_on_search_message_91",
                          "type": "string",
                          "minLength": 1
                        },
                        "time": {
                          "id": "retail_bpp_on_search_message_92",
                          "type": "object",
                          "properties": {
                            "label": {
                              "id": "retail_bpp_on_search_message_93",
                              "type": "string",
                              "minLength": 1
                            },
                            "timestamp": {
                              "id": "retail_bpp_on_search_message_94",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        },
                        "rating": {
                          "id": "retail_bpp_on_search_message_95",
                          "type": "string",
                          "minLength": 1
                        },
                        "descriptor": {
                          "id": "retail_bpp_on_search_message_96",
                          "type": "object",
                          "properties": {
                            "name": {
                              "id": "retail_bpp_on_search_message_97",
                              "type": "string",
                              "minLength": 1
                            },
                            "symbol": {
                              "id": "retail_bpp_on_search_message_98",
                              "type": "string",
                              "minLength": 1
                            },
                            "short_desc": {
                              "id": "retail_bpp_on_search_message_99",
                              "type": "string",
                              "optional": true,
                              "minLength": 1
                            },
                            "long_desc": {
                              "id": "retail_bpp_on_search_message_100",
                              "type": "string",
                              "optional": true,
                              "minLength": 1
                            },
                            "images": {
                               "id": "retail_bpp_on_search_message_101",
                              "type": "array",
                              "minItems": 1,
                              "element": {
                                 "id": "retail_bpp_on_search_message_102",
                                "type": "object",
                                "properties": {}
                              }
                            }
                          }
                        },
                        "quantity": {
                           "id": "retail_bpp_on_search_message_103",
                          "type": "object",
                          "properties": {
                            "unitized": {
                               "id": "retail_bpp_on_search_message_104",
                              "type": "object",
                              "properties": {
                                "measure": {
                                   "id": "retail_bpp_on_search_message_105",
                                  "type": "object",
                                  "properties": {
                                    "unit": {
                                       "id": "retail_bpp_on_search_message_106",
                                      "type": "string",
                                      "minLength": 1
                                    },
                                    "value": {
                                       "id": "retail_bpp_on_search_message_107",
                                      "type": "string",
                                      "minLength": 1
                                    }
                                  }
                                }
                              }
                            },
                            "available": {
                               "id": "retail_bpp_on_search_message_108",
                              "type": "object",
                              "properties": {
                                "count": {
                                   "id": "retail_bpp_on_search_message_109",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "maximum": {
                               "id": "retail_bpp_on_search_message_110",
                              "type": "object",
                              "properties": {
                                "count": {
                                   "id": "retail_bpp_on_search_message_111",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          }
                        },
                        "price": {
                          "id": "retail_bpp_on_search_message_112",
                          "type": "object",
                          "properties": {
                            "currency": {
                              "id": "retail_bpp_on_search_message_113",
                              "type": "string",
                              "minLength": 1
                            },
                            "value": {
                              "id": "retail_bpp_on_search_message_114",
                              "type": "string",
                              "minLength": 1
                            },
                            "maximum_value": {
                              "id": "retail_bpp_on_search_message_115",
                              "type": "string",
                              "minLength": 1
                            },
                            "tags": {
                              "id": "retail_bpp_on_search_message_116",
                              "type": "array",
                              "minItems": 1,
                              "element": {
                                "id": "retail_bpp_on_search_message_117",
                                "type": "object",
                                "properties": {
                                  "code": {
                                    "id": "retail_bpp_on_search_message_118",
                                    "type": "string",
                                    "minLength": 1
                                  },
                                  "list": {
                                    "id": "retail_bpp_on_search_message_119",
                                    "type": "array",
                                    "minItems": 1,
                                    "element": {
                                      "id": "retail_bpp_on_search_message_120",
                                      "type": "object",
                                      "properties": {
                                        "code": {
                                           "id": "retail_bpp_on_search_message_121",
                                          "type": "string",
                                          "minLength": 1
                                        },
                                        "value": {
                                           "id": "retail_bpp_on_search_message_122",
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
                            "id": "retail_bpp_on_search_message_198",
                            "type": "array",
                            "element": {
                                "allOf": [
                                    {
                                        "if": {
                                            "properties": {
                                                "id": "retail_bpp_on_search_message_199",
                                                "type": "params",
                                                "domain": {
                                                    "const": [
                                                        "ONDC:RET18",
                                                    ]
                                                }
                                            }
                                        },
                                        "then": [
                                            "currency",
                                            "value",
                                            "maximum_value"
                                        ]
                                    },
                                    {
                                        "if": {
                                            "properties": {
                                                "id": "retail_bpp_on_search_message_201",
                                                "type": "params",
                                                "domain": {
                                                    "const": [
                                                        "ONDC:RET12",
                                                        "ONDC:RET11",
                                                        "ONDC:RET10"
                                                    ]
                                                }
                                            }
                                        },
                                        "then": [
                                           "currency",
                                            "value",
                                            "maximum_value",
                                            "tags"
                                        ]
                                    }
                                ]
                            }
                        }
                        },
                        "category_id": {
                           "id": "retail_bpp_on_search_message_123",
                          "type": "string",
                          "minLength": 1
                        },
                        "category_ids": {
                           "id": "retail_bpp_on_search_message_124",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                             "id": "retail_bpp_on_search_message_125",
                            "type": "object",
                            "properties": {}
                          }
                        },
                        "fulfillment_id": {
                           "id": "retail_bpp_on_search_message_126",
                          "type": "string",
                          "minLength": 1
                        },
                        "location_id": {
                           "id": "retail_bpp_on_search_message_127",
                          "type": "string",
                          "minLength": 1
                        },
                        "related": {
                          "id": "retail_bpp_on_search_message_128",
                          "type": "boolean"
                        },
                        "recommended": {
                          "id": "retail_bpp_on_search_message_129",
                          "type": "boolean"
                        },
                        "@ondc/org/returnable": {
                          "id": "retail_bpp_on_search_message_130",
                          "type": "boolean"
                        },
                        "@ondc/org/cancellable": {
                          "id": "retail_bpp_on_search_message_131",
                          "type": "boolean"
                        },
                        "@ondc/org/return_window": {
                          "id": "retail_bpp_on_search_message_132",
                          "type": "string",
                          "minLength": 1
                        },
                        "@ondc/org/seller_pickup_return": {
                          "id": "retail_bpp_on_search_message_133",
                          "type": "boolean"
                        },
                        "@ondc/org/time_to_ship": {
                          "id": "retail_bpp_on_search_message_134",
                          "type": "string",
                          "minLength": 1
                        },
                        "@ondc/org/available_on_cod": {
                          "id": "retail_bpp_on_search_message_135",
                          "type": "boolean"
                        },
                        "@ondc/org/contact_details_consumer_care": {
                          "id": "retail_bpp_on_search_message_136",
                          "type": "string",
                          "minLength": 1
                        },
                        "tags": {
                          "id": "retail_bpp_on_search_message_137",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "retail_bpp_on_search_message_138",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "retail_bpp_on_search_message_139",
                                "type": "string",
                                "minLength": 1
                              },
                              "list": {
                                "id": "retail_bpp_on_search_message_140",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                   "id": "retail_bpp_on_search_message_141",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                       "id": "retail_bpp_on_search_message_142",
                                      "type": "string",
                                      "minLength": 1
                                    },
                                    "value": {
                                       "id": "retail_bpp_on_search_message_143",
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
                            "id": "retail_bpp_on_search_message_198",
                            "type": "array",
                            "element": {
                                "allOf": [
                                    {
                                        "if": {
                                            "properties": {
                                                "id": "retail_bpp_on_search_message_199",
                                                "type": "params",
                                                "domain": {
                                                    "const": [
                                                        "ONDC:RET18",
                                                    ]
                                                }
                                            }
                                        },
                                        "then": [
                                            "id",
                                            "time",
                                            "rating",
                                            "descriptor",
                                            "quantity",
                                            "price",
                                            "category_id",
                                            "fulfillment_id",
                                            "location_id",
                                            "related",
                                            "recommended",
                                            "@ondc/org/returnable",
                                            "@ondc/org/cancellable",
                                            "@ondc/org/return_window",
                                             "@ondc/org/seller_pickup_return",
                                             "@ondc/org/time_to_ship",
                                             "@ondc/org/available_on_cod",
                                              "@ondc/org/contact_details_consumer_care",
                                              "tags"
                                        ]
                                    },
                                    {
                                        "if": {
                                            "properties": {
                                                "id": "retail_bpp_on_search_message_201",
                                                "type": "params",
                                                "domain": {
                                                    "const": [
                                                        "ONDC:RET12",
                                                        "ONDC:RET11",
                                                        "ONDC:RET10"
                                                    ]
                                                }
                                            }
                                        },
                                        "then": [
                                            "id",
                                            "time",
                                            "rating",
                                            "descriptor",
                                            "quantity",
                                            "price",
                                            "category_id",
                                            "category_ids",
                                            "fulfillment_id",
                                            "location_id",
                                            "related",
                                            "recommended",
                                            "@ondc/org/returnable",
                                            "@ondc/org/cancellable",
                                            "@ondc/org/return_window",
                                             "@ondc/org/seller_pickup_return",
                                             "@ondc/org/time_to_ship",
                                             "@ondc/org/available_on_cod",
                                              "@ondc/org/contact_details_consumer_care",
                                              "tags"
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                  },
                  "tags": {
                     "id": "retail_bpp_on_search_message_144",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                       "id": "retail_bpp_on_search_message_145",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "retail_bpp_on_search_message_146",
                          "type": "string",
                          "optional":true,
                          "minLength": 1
                        },
                        "list": {
                           "id": "retail_bpp_on_search_message_147",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                             "id": "retail_bpp_on_search_message_148",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "retail_bpp_on_search_message_149",
                                "type": "string",
                                "minLength": 1
                              },
                              "value": {
                                 "id": "retail_bpp_on_search_message_150",
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
                            "id": "retail_bpp_on_search_message_198",
                            "type": "array",
                            "element": {
                                "allOf": [
                                    {
                                        "if": {
                                            "properties": {
                                                "id": "retail_bpp_on_search_message_199",
                                                "type": "params",
                                                "domain": {
                                                    "const": [
                                                        "ONDC:RET10",
                                                        "ONDC:RET13",
                                                        "ONDC:RET15",
                                                        "ONDC:RET16",
                                                        "ONDC:RET17",
                                                        "ONDC:RET18",
                                                        "ONDC:RET19",
                                                        "ONDC:RET1A",
                                                        "ONDC:RET1B",
                                                        "ONDC:RET1C",
                                                        "ONDC:RET1D"
                                                    ]
                                                }
                                            }
                                        },
                                        "then": [
                                            "id",
                                            "time",
                                            "fulfillments",
                                            "descriptor",
                                            "ttl",
                                            "locations",
                                            "items",
                                            "tags"
                                        ]
                                    },
                                    {
                                        "if": {
                                            "properties": {
                                                "id": "retail_bpp_on_search_message_201",
                                                "type": "params",
                                                "domain": {
                                                    "const": [
                                                        "ONDC:RET12",
                                                        "ONDC:RET11"
                                                    ]
                                                }
                                            }
                                        },
                                        "then": [
                                            "id",
                                            "time",
                                            "fulfillments",
                                            "descriptor",
                                            "ttl",
                                            // "locations",
                                            // "categories",
                                            // "items",
                                            "tags"
                                        ]
                                    }
                                ]
                            }
                        }
              }
            }
          }
        }
      }
    }