module.exports={
   "id": "retail_bpp_on_init_message_01",
      "type": "object",
      "properties": {
        "order": {
           "id": "retail_bpp_on_init_message_02",
          "type": "object",
          "properties": {
            "provider": {
               "id": "retail_bpp_on_init_message_03",
              "type": "object",
              "properties": {
                "id": {
                   "id": "retail_bpp_on_init_message_04",
                  "type": "string",
                  "minLength": 1
                },
                "locations": {
                   "id": "retail_bpp_on_init_message_05",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                     "id": "retail_bpp_on_init_message_06",
                    "type": "object",
                    "properties": {
                      "id": {
                         "id": "retail_bpp_on_init_message_07",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "items": {
               "id": "retail_bpp_on_init_message_08",
              "type": "array",
              "minItems": 1,
              "element": {
                 "id": "retail_bpp_on_init_message_09",
                "type": "object",
                "properties": {
                  "id": {
                     "id": "retail_bpp_on_init_message_10",
                    "type": "string",
                    "minLength": 1
                  },
                  "fulfillment_id": {
                     "id": "retail_bpp_on_init_message_11",
                    "type": "string",
                    "minLength": 1
                  },
                  "quantity": {
                     "id": "retail_bpp_on_init_message_12",
                    "type": "object",
                    "properties": {
                      "count": {
                         "id": "retail_bpp_on_init_message_13",
                        "type": "number"
                      }
                    }
                  },
                  "parent_item_id": {
                     "id": "retail_bpp_on_init_message_14",
                    "type": "string",
                    "minLength": 1
                  },
                  "tags": {
                     "id": "retail_bpp_on_init_message_15",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                       "id": "retail_bpp_on_init_message_16",
                      "type": "object",
                      "properties": {
                        "code": {
                           "id": "retail_bpp_on_init_message_17",
                          "type": "string",
                          "minLength": 1
                        },
                        "list": {
                           "id": "retail_bpp_on_init_message_18",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                             "id": "retail_bpp_on_init_message_19",
                            "type": "object",
                            "properties": {
                              "code": {
                                 "id": "retail_bpp_on_init_message_20",
                                "type": "string",
                                "minLength": 1
                              },
                              "value": {
                                 "id": "retail_bpp_on_init_message_21",
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
                                                "type": "params",
                                                "domain": {
                                                    "const": [
                                                        "ONDC:RET10",
                                                        "ONDC:RET12",
                                                        "ONDC:RET13",
                                                        "ONDC:RET14",
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
                                            "quantity",
                                            "fulfillment_id"
                                        ]
                                    },
                                    {
                                        "if": {
                                            "properties": {
                                                "type": "params",
                                                "domain": {
                                                    "const": [
                                                        "ONDC:RET11"
                                                    ]
                                                }
                                            }
                                        },
                                        "then": [
                                            "id",
                                            "quantity",
                                            "fulfillment_id",
                                            "parent_item_id",
                                            "tags"
                                        ]
                                    }
                                ]
                            }
                        }
              }
            },
            "billing": {
               "id": "retail_bpp_on_init_message_22",
              "type": "object",
              "properties": {
                "name": {
                   "id": "retail_bpp_on_init_message_23",
                  "type": "string",
                  "minLength": 1
                },
                "address": {
                   "id": "retail_bpp_on_init_message_24",
                  "type": "object",
                  "properties": {
                    "name": {
                       "id": "retail_bpp_on_init_message_25",
                      "type": "string",
                      "minLength": 1
                    },
                    "building": {
                       "id": "retail_bpp_on_init_message_26",
                      "type": "string",
                      "minLength": 1
                    },
                    "locality": {
                       "id": "retail_bpp_on_init_message_27",
                      "type": "string",
                      "minLength": 1
                    },
                    "city": {
                       "id": "retail_bpp_on_init_message_28",
                      "type": "string",
                      "minLength": 1
                    },
                    "state": {
                       "id": "retail_bpp_on_init_message_29",
                      "type": "string",
                      "minLength": 1
                    },
                    "country": {
                       "id": "retail_bpp_on_init_message_30",
                      "type": "string",
                      "minLength": 1
                    },
                    "area_code": {
                      "id": "retail_bpp_on_init_message_31",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "tax_number": {
                  "id": "retail_bpp_on_init_message_32",
                  "type": "string",
                  "minLength": 1
                },
                "email": {
                  "id": "retail_bpp_on_init_message_33",
                  "type": "string",
                  "minLength": 1
                },
                "phone": {
                  "id": "retail_bpp_on_init_message_34",
                  "type": "string",
                  "minLength": 1
                },
                "created_at": {
                  "id": "retail_bpp_on_init_message_35",
                  "type": "string",
                  "minLength": 1
                },
                "updated_at": {
                  "id": "retail_bpp_on_init_message_36",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "fulfillments": {
              "id": "retail_bpp_on_init_message_37",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "retail_bpp_on_init_message_38",
                "type": "object",
                "properties": {
                  "id": {
                    "id": "retail_bpp_on_init_message_39",
                    "type": "string",
                    "minLength": 1
                  },
                  "type": {
                    "id": "retail_bpp_on_init_message_40",
                    "type": "string",
                    "minLength": 1
                  },
                  "tracking": {
                     "id": "retail_bpp_on_init_message_41",
                    "type": "boolean"
                  },
                  "end": {
                     "id": "retail_bpp_on_init_message_42",
                    "type": "object",
                    "properties": {
                      "location": {
                         "id": "retail_bpp_on_init_message_43",
                        "type": "object",
                        "properties": {
                          "gps": {
                             "id": "retail_bpp_on_init_message_44",
                            "type": "string",
                            "minLength": 1
                          },
                          "address": {
                             "id": "retail_bpp_on_init_message_45",
                            "type": "object",
                            "properties": {
                              "name": {
                                 "id": "retail_bpp_on_init_message_46",
                                "type": "string",
                                "minLength": 1
                              },
                              "building": {
                                 "id": "retail_bpp_on_init_message_47",
                                "type": "string",
                                "minLength": 1
                              },
                              "locality": {
                                 "id": "retail_bpp_on_init_message_48",
                                "type": "string",
                                "minLength": 1
                              },
                              "city": {
                                 "id": "retail_bpp_on_init_message_49",
                                "type": "string",
                                "minLength": 1
                              },
                              "state": {
                                 "id": "retail_bpp_on_init_message_50",
                                "type": "string",
                                "minLength": 1
                              },
                              "country": {
                                "id": "retail_bpp_on_init_message_51",
                                "type": "string",
                                "minLength": 1
                              },
                              "area_code": {
                                "id": "retail_bpp_on_init_message_52",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          }
                        }
                      },
                      "contact": {
                        "id": "retail_bpp_on_init_message_53",
                        "type": "object",
                        "properties": {
                          "phone": {
                            "id": "retail_bpp_on_init_message_54",
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
              "id": "retail_bpp_on_init_message_55",
              "type": "object",
              "properties": {
                "price": {
                  "id": "retail_bpp_on_init_message_56",
                  "type": "object",
                  "properties": {
                    "currency": {
                      "id": "retail_bpp_on_init_message_57",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "retail_bpp_on_init_message_58",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "breakup": {
                  "id": "retail_bpp_on_init_message_59",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "retail_bpp_on_init_message_60",
                    "type": "object",
                    "properties": {
                      "@ondc/org/item_id": {
                         "id": "retail_bpp_on_init_message_61",
                        "type": "string",
                        "minLength": 1
                      },
                      "@ondc/org/item_quantity": {
                         "id": "retail_bpp_on_init_message_62",
                        "type": "object",
                        "properties": {
                          "count": {
                             "id": "retail_bpp_on_init_message_63",
                            "type": "number"
                          }
                        }
                      },
                      "title": {
                         "id": "retail_bpp_on_init_message_64",
                        "type": "string",
                        "minLength": 1
                      },
                      "@ondc/org/title_type": {
                         "id": "retail_bpp_on_init_message_65",
                        "type": "string",
                        "minLength": 1
                      },
                      "price": {
                         "id": "retail_bpp_on_init_message_66",
                        "type": "object",
                        "properties": {
                          "currency": {
                             "id": "retail_bpp_on_init_message_67",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                             "id": "retail_bpp_on_init_message_68",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "item": {
                         "id": "retail_bpp_on_init_message_69",
                        "type": "object",
                        "properties": {
                          // "parent_item_id": {
                          //    "id": "retail_bpp_on_init_message_70",
                          //   "type": "string",
                          //   "minLength": 1
                          // },
                          // "quantity": {
                          //    "id": "retail_bpp_on_init_message_71",
                          //   "type": "object",
                          //   "properties": {
                          //     "available": {
                          //        "id": "retail_bpp_on_init_message_72",
                          //       "type": "object",
                          //       "properties": {
                          //         "count": {
                          //            "id": "retail_bpp_on_init_message_73",
                          //           "type": "string",
                          //           "minLength": 1
                          //         }
                          //       }
                          //     },
                          //     "maximum": {
                          //        "id": "retail_bpp_on_init_message_74",
                          //       "type": "object",
                          //       "properties": {
                          //         "count": {
                          //            "id": "retail_bpp_on_init_message_75",
                          //           "type": "string",
                          //           "minLength": 1
                          //         }
                          //       }
                          //     }
                          //   }
                          // },
                          "price": {
                             "id": "retail_bpp_on_init_message_76",
                            "type": "object",
                            "properties": {
                              "currency": {
                                 "id": "retail_bpp_on_init_message_77",
                                "type": "string",
                                "minLength": 1
                              },
                              "value": {
                                 "id": "retail_bpp_on_init_message_78",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "tags": {
                             "id": "retail_bpp_on_init_message_79",
                            "type": "array",
                            "optional": true,
                            "minItems": 1,
                            "element": {
                               "id": "retail_bpp_on_init_message_80",
                              "type": "object",
                              "properties": {
                                "code": {
                                   "id": "retail_bpp_on_init_message_81",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "list": {
                                   "id": "retail_bpp_on_init_message_82",
                                  "type": "array",
                                  "minItems": 1,
                                  "element": {
                                     "id": "retail_bpp_on_init_message_83",
                                    "type": "object",
                                    "properties": {
                                      "code": {
                                         "id": "retail_bpp_on_init_message_84",
                                        "type": "string",
                                        "minLength": 1
                                      },
                                      "value": {
                                         "id": "retail_bpp_on_init_message_85",
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
                // "ttl": {
                //    "id": "retail_bpp_on_init_message_86",
                //   "type": "string",
                //   "minLength": 1
                // }
              }
            },
            "payment": {
               "id": "retail_bpp_on_init_message_87",
              "type": "object",
              "properties": {
                "@ondc/org/buyer_app_finder_fee_type": {
                   "id": "retail_bpp_on_init_message_88",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/buyer_app_finder_fee_amount": {
                   "id": "retail_bpp_on_init_message_89",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/settlement_details": {
                   "id": "retail_bpp_on_init_message_90",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "retail_bpp_on_init_message_91",
                    "type": "object",
                    "properties": {
                      "settlement_counterparty": {
                        "id": "retail_bpp_on_init_message_92",
                        "type": "string",
                        "minLength": 1
                      },
                      "settlement_phase": {
                        "id": "retail_bpp_on_init_message_93",
                        "type": "string",
                        "minLength": 1
                      },
                      "settlement_type": {
                        "id": "retail_bpp_on_init_message_94",
                        "type": "string",
                        "minLength": 1
                      },
                      "beneficiary_name": {
                        "id": "retail_bpp_on_init_message_95",
                        "type": "string",
                        "minLength": 1
                      },
                      "upi_address": {
                        "id": "retail_bpp_on_init_message_96",
                        "type": "string",
                        "minLength": 0
                      },
                      "settlement_bank_account_no": {
                        "id": "retail_bpp_on_init_message_97",
                        "type": "string",
                        "minLength": 1
                      },
                      "settlement_ifsc_code": {
                        "id": "retail_bpp_on_init_message_98",
                        "type": "string",
                        "minLength": 1
                      },
                      "bank_name": {
                        "id": "retail_bpp_on_init_message_99",
                        "type": "string",
                        "minLength": 1
                      },
                      "branch_name": {
                        "id": "retail_bpp_on_init_message_100",
                        "type": "string",
                        "minLength": 1
                      }
                    },
                         "required": {
                                    "type": "array",
                                    "element": {
                                        "allOf": [
                                            {
                                                "if": {
                                                    "properties": {
                                                        "settlement_type": {
                                                            "const": "upi"
                                                        }
                                                    }
                                                },
                                                 "then": [
                                            "settlement_counterparty",
                                            "settlement_phase",
                                            "settlement_type",
                                            "beneficiary_name",
                                            "upi_address",
                                            "settlement_bank_account_no",
                                            "settlement_ifsc_code",
                                            "bank_name",
                                            "branch_name"
                                        ]
                                            },
                                            {
                                                "if": {
                                                    "properties": {
                                                        "settlement_type": {
                                                            "const": ["neft","rtgs","imps"]
                                                        }
                                                    }
                                                },
                                                    "then": [
                                            "settlement_counterparty",
                                            "settlement_phase",
                                            "settlement_type",
                                            "beneficiary_name",
                                            "settlement_bank_account_no",
                                            "settlement_ifsc_code",
                                            "bank_name",
                                            "branch_name"
                                        ]
                                            },
                                        ]
                                    }
                                }
                  }
                }
              }
            },
            "tags": {
              "id": "retail_bpp_on_init_message_101",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "retail_bpp_on_init_message_102",
                "type": "object",
                "properties": {
                  "code": {
                    "id": "retail_bpp_on_init_message_103",
                    "type": "string",
                    "minLength": 1
                  },
                  "list": {
                    "id": "retail_bpp_on_init_message_104",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "retail_bpp_on_init_message_105",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "retail_bpp_on_init_message_106",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                          "id": "retail_bpp_on_init_message_107",
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