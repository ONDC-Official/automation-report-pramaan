module.exports= {
   "id": "retail_bpp_on_confirm_message_01",
      "type": "object",
      "properties": {
        "order": {
           "id": "retail_bpp_on_confirm_message_02",
          "type": "object",
          "properties": {
            "id": {
               "id": "retail_bpp_on_confirm_message_03",
              "type": "string",
              "minLength": 1
            },
            "state": {
               "id": "retail_bpp_on_confirm_message_04",
              "type": "string",
              "minLength": 1
            },
            "provider": {
               "id": "retail_bpp_on_confirm_message_05",
              "type": "object",
              "properties": {
                "id": {
                   "id": "retail_bpp_on_confirm_message_06",
                  "type": "string",
                  "minLength": 1
                },
                "locations": {
                   "id": "retail_bpp_on_confirm_message_07",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                     "id": "retail_bpp_on_confirm_message_08",
                    "type": "object",
                    "properties": {
                      "id": {
                         "id": "retail_bpp_on_confirm_message_09",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "items": {
               "id": "retail_bpp_on_confirm_message_10",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "retail_bpp_on_confirm_message_11",
                "type": "object",
                "properties": {
                  "id": {
                    "id": "retail_bpp_on_confirm_message_12",
                    "type": "string",
                    "minLength": 1
                  },
                  "fulfillment_id": {
                    "id": "retail_bpp_on_confirm_message_13",
                    "type": "string",
                    "minLength": 1
                  },
                  "quantity": {
                    "id": "retail_bpp_on_confirm_message_14",
                    "type": "object",
                    "properties": {
                      "count": {
                        "id": "retail_bpp_on_confirm_message_15",
                        "type": "number"
                      }
                    }
                  },
                  "parent_item_id": {
                    "id": "retail_bpp_on_confirm_message_16",
                    "type": "string",
                    "minLength": 1
                  },
                  "tags": {
                    "id": "retail_bpp_on_confirm_message_17",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "retail_bpp_on_confirm_message_18",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "retail_bpp_on_confirm_message_19",
                          "type": "string",
                          "minLength": 1
                        },
                        "list": {
                          "id": "retail_bpp_on_confirm_message_20",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "retail_bpp_on_confirm_message_21",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "retail_bpp_on_confirm_message_22",
                                "type": "string",
                                "minLength": 1
                              },
                              "value": {
                                "id": "retail_bpp_on_confirm_message_23",
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
              "id": "retail_bpp_on_confirm_message_24",
              "type": "object",
              "properties": {
                "name": {
                  "id": "retail_bpp_on_confirm_message_25",
                  "type": "string",
                  "minLength": 1
                },
                "address": {
                  "id": "retail_bpp_on_confirm_message_26",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "retail_bpp_on_confirm_message_27",
                      "type": "string",
                      "minLength": 1
                    },
                    "building": {
                      "id": "retail_bpp_on_confirm_message_28",
                      "type": "string",
                      "minLength": 1
                    },
                    "locality": {
                      "id": "retail_bpp_on_confirm_message_29",
                      "type": "string",
                      "minLength": 1
                    },
                    "city": {
                      "id": "retail_bpp_on_confirm_message_30",
                      "type": "string",
                      "minLength": 1
                    },
                    "state": {
                       "id": "retail_bpp_on_confirm_message_31",
                      "type": "string",
                      "minLength": 1
                    },
                    "country": {
                       "id": "retail_bpp_on_confirm_message_32",
                      "type": "string",
                      "minLength": 1
                    },
                    "area_code": {
                       "id": "retail_bpp_on_confirm_message_33",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "email": {
                   "id": "retail_bpp_on_confirm_message_34",
                  "type": "string",
                  "minLength": 1
                },
                "phone": {
                   "id": "retail_bpp_on_confirm_message_35",
                  "type": "string",
                  "minLength": 1
                },
                "created_at": {
                   "id": "retail_bpp_on_confirm_message_36",
                  "type": "string",
                  "minLength": 1
                },
                "updated_at": {
                   "id": "retail_bpp_on_confirm_message_37",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "fulfillments": {
               "id": "retail_bpp_on_confirm_message_38",
              "type": "array",
              "minItems": 1,
              "element": {
                 "id": "retail_bpp_on_confirm_message_39",
                "type": "object",
                "properties": {
                  "id": {
                     "id": "retail_bpp_on_confirm_message_40",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/provider_name": {
                     "id": "retail_bpp_on_confirm_message_41",
                    "type": "string",
                    "minLength": 1
                  },
                  "state": {
                     "id": "retail_bpp_on_confirm_message_42",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                         "id": "retail_bpp_on_confirm_message_43",
                        "type": "object",
                        "properties": {
                          "code": {
                             "id": "retail_bpp_on_confirm_message_44",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "type": {
                     "id": "retail_bpp_on_confirm_message_45",
                    "type": "string",
                    "minLength": 1
                  },
                  "tracking": {
                     "id": "retail_bpp_on_confirm_message_46",
                    "type": "boolean"
                  },
                  "@ondc/org/TAT": {
                     "id": "retail_bpp_on_confirm_message_47",
                    "type": "string",
                    "minLength": 1
                  },
                  "start": {
                     "id": "retail_bpp_on_confirm_message_48",
                    "type": "object",
                    "properties": {
                      "location": {
                         "id": "retail_bpp_on_confirm_message_49",
                        "type": "object",
                        "properties": {
                          "id": {
                             "id": "retail_bpp_on_confirm_message_50",
                            "type": "string",
                            "minLength": 1
                          },
                          "descriptor": {
                             "id": "retail_bpp_on_confirm_message_51",
                            "type": "object",
                            "properties": {
                              "name": {
                                 "id": "retail_bpp_on_confirm_message_52",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "gps": {
                             "id": "retail_bpp_on_confirm_message_53",
                            "type": "string",
                            "minLength": 1
                          },
                          "address": {
                             "id": "retail_bpp_on_confirm_message_54",
                            "type": "object",
                            "properties": {
                              "locality": {
                                 "id": "retail_bpp_on_confirm_message_55",
                                "type": "string",
                                "minLength": 1
                              },
                              "city": {
                                 "id": "retail_bpp_on_confirm_message_56",
                                "type": "string",
                                "minLength": 1
                              },
                              "area_code": {
                                 "id": "retail_bpp_on_confirm_message_57",
                                "type": "string",
                                "minLength": 1
                              },
                              "state": {
                                 "id": "retail_bpp_on_confirm_message_58",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          }
                        }
                      },
                      "contact": {
                         "id": "retail_bpp_on_confirm_message_59",
                        "type": "object",
                        "properties": {
                          "phone": {
                             "id": "retail_bpp_on_confirm_message_60",
                            "type": "string",
                            "minLength": 1
                          },
                          "email": {
                             "id": "retail_bpp_on_confirm_message_61",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "end": {
                     "id": "retail_bpp_on_confirm_message_62",
                    "type": "object",
                    "properties": {
                      "location": {
                         "id": "retail_bpp_on_confirm_message_63",
                        "type": "object",
                        "properties": {
                          "gps": {
                             "id": "retail_bpp_on_confirm_message_64",
                            "type": "string",
                            "minLength": 1
                          },
                          "address": {
                             "id": "retail_bpp_on_confirm_message_65",
                            "type": "object",
                            "properties": {
                              "name": {
                                 "id": "retail_bpp_on_confirm_message_66",
                                "type": "string",
                                "minLength": 1
                              },
                              "building": {
                                 "id": "retail_bpp_on_confirm_message_67",
                                "type": "string",
                                "minLength": 1
                              },
                              "locality": {
                                 "id": "retail_bpp_on_confirm_message_68",
                                "type": "string",
                                "minLength": 1
                              },
                              "city": {
                                 "id": "retail_bpp_on_confirm_message_69",
                                "type": "string",
                                "minLength": 1
                              },
                              "state": {
                                 "id": "retail_bpp_on_confirm_message_70",
                                "type": "string",
                                "minLength": 1
                              },
                              "country": {
                                "id": "retail_bpp_on_confirm_message_71",
                                "type": "string",
                                "minLength": 1
                              },
                              "area_code": {
                                "id": "retail_bpp_on_confirm_message_72",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          }
                        }
                      },
                      "person": {
                        "id": "retail_bpp_on_confirm_message_73",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "retail_bpp_on_confirm_message_74",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "contact": {
                        "id": "retail_bpp_on_confirm_message_75",
                        "type": "object",
                        "properties": {
                          "phone": {
                            "id": "retail_bpp_on_confirm_message_76",
                            "type": "string",
                            "minLength": 1
                          },
                          "email": {
                            "id": "retail_bpp_on_confirm_message_77",
                            "type": "string",
                            "optional": true,
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
              "id": "retail_bpp_on_confirm_message_78",
              "type": "object",
              "properties": {
                "price": {
                  "id": "retail_bpp_on_confirm_message_79",
                  "type": "object",
                  "properties": {
                    "currency": {
                      "id": "retail_bpp_on_confirm_message_80",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "retail_bpp_on_confirm_message_81",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "breakup": {
                  "id": "retail_bpp_on_confirm_message_82",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "retail_bpp_on_confirm_message_83",
                    "type": "object",
                    "properties": {
                      "@ondc/org/item_id": {
                        "id": "retail_bpp_on_confirm_message_84",
                        "type": "string",
                        "minLength": 1
                      },
                      "@ondc/org/item_quantity": {
                        "id": "retail_bpp_on_confirm_message_85",
                        "type": "object",
                        "properties": {
                          "count": {
                            "id": "retail_bpp_on_confirm_message_86",
                            "type": "number"
                          }
                        }
                      },
                      "title": {
                        "id": "retail_bpp_on_confirm_message_87",
                        "type": "string",
                        "minLength": 1
                      },
                      "@ondc/org/title_type": {
                        "id": "retail_bpp_on_confirm_message_88",
                        "type": "string",
                        "minLength": 1
                      },
                      "price": {
                        "id": "retail_bpp_on_confirm_message_89",
                        "type": "object",
                        "properties": {
                          "currency": {
                            "id": "retail_bpp_on_confirm_message_90",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                             "id": "retail_bpp_on_confirm_message_91",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "item": {
                         "id": "retail_bpp_on_confirm_message_92",
                        "type": "object",
                        "properties": {
                          // "parent_item_id": {
                          //    "id": "retail_bpp_on_confirm_message_93",
                          //   "type": "string",
                          //   "minLength": 1
                          // },
                          "price": {
                             "id": "retail_bpp_on_confirm_message_94",
                            "type": "object",
                            "properties": {
                              "currency": {
                                 "id": "retail_bpp_on_confirm_message_95",
                                "type": "string",
                                "minLength": 1
                              },
                              "value": {
                                 "id": "retail_bpp_on_confirm_message_96",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "tags": {
                             "id": "retail_bpp_on_confirm_message_97",
                            "type": "array",
                            "optional": true,
                            "minItems": 1,
                            "element": {
                               "id": "retail_bpp_on_confirm_message_98",
                              "type": "object",
                              "properties": {
                                "code": {
                                   "id": "retail_bpp_on_confirm_message_99",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "list": {
                                   "id": "retail_bpp_on_confirm_message_100",
                                  "type": "array",
                                  "minItems": 1,
                                  "element": {
                                     "id": "retail_bpp_on_confirm_message_101",
                                    "type": "object",
                                    "properties": {
                                      "code": {
                                         "id": "retail_bpp_on_confirm_message_102",
                                        "type": "string",
                                        "minLength": 1
                                      },
                                      "value": {
                                         "id": "retail_bpp_on_confirm_message_103",
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
                //    "id": "retail_bpp_on_confirm_message_104",
                //   "type": "string",
                //   "minLength": 1
                // }
              }
            },
            "payment": {
               "id": "retail_bpp_on_confirm_message_105",
              "type": "object",
              "properties": {
                // "uri": {
                //    "id": "retail_bpp_on_confirm_message_106",
                //   "type": "string",
                //   "minLength": 1
                // },
                // "tl_method": {
                //    "id": "retail_bpp_on_confirm_message_107",
                //   "type": "string",
                //   "minLength": 1
                // },
                "params": {
                   "id": "retail_bpp_on_confirm_message_108",
                  "type": "object",
                  "properties": {
                    "currency": {
                       "id": "retail_bpp_on_confirm_message_109",
                      "type": "string",
                      "minLength": 1
                    },
                    "transaction_id": {
                       "id": "retail_bpp_on_confirm_message_110",
                      "type": "string",
                      "minLength": 1
                    },
                    "amount": {
                       "id": "retail_bpp_on_confirm_message_111",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "status": {
                   "id": "retail_bpp_on_confirm_message_112",
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                   "id": "retail_bpp_on_confirm_message_113",
                  "type": "string",
                  "minLength": 1
                },
                "collected_by": {
                   "id": "retail_bpp_on_confirm_message_114",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/buyer_app_finder_fee_type": {
                   "id": "retail_bpp_on_confirm_message_115",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/buyer_app_finder_fee_amount": {
                   "id": "retail_bpp_on_confirm_message_116",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/settlement_basis": {
                   "id": "retail_bpp_on_confirm_message_117",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/settlement_window": {
                   "id": "retail_bpp_on_confirm_message_118",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/withholding_amount": {
                   "id": "retail_bpp_on_confirm_message_119",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/settlement_details": {
                   "id": "retail_bpp_on_confirm_message_120",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                     "id": "retail_bpp_on_confirm_message_121",
                    "type": "object",
                    "properties": {
                      "settlement_counterparty": {
                         "id": "retail_bpp_on_confirm_message_122",
                        "type": "string",
                        "minLength": 1
                      },
                      "settlement_phase": {
                         "id": "retail_bpp_on_confirm_message_123",
                        "type": "string",
                        "minLength": 1
                      },
                      "beneficiary_name": {
                         "id": "retail_bpp_on_confirm_message_124",
                        "type": "string",
                        "minLength": 1
                      },
                      "settlement_type": {
                         "id": "retail_bpp_on_confirm_message_125",
                        "type": "string",
                        "minLength": 1
                      },
                      "upi_address": {
                         "id": "retail_bpp_on_confirm_message_126",
                        "type": "string",
                        "minLength": 0
                      },
                      "settlement_bank_account_no": {
                         "id": "retail_bpp_on_confirm_message_127",
                        "type": "string",
                        "minLength": 1
                      },
                      "settlement_ifsc_code": {
                         "id": "retail_bpp_on_confirm_message_128",
                        "type": "string",
                        "minLength": 1
                      },
                      "bank_name": {
                         "id": "retail_bpp_on_confirm_message_129",
                        "type": "string",
                        "minLength": 1
                      },
                      "branch_name": {
                         "id": "retail_bpp_on_confirm_message_130",
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
               "id": "retail_bpp_on_confirm_message_131",
              "type": "array",
              "minItems": 1,
              "element": {
                 "id": "retail_bpp_on_confirm_message_132",
                "type": "object",
                "properties": {
                  "code": {
                     "id": "retail_bpp_on_confirm_message_133",
                    "type": "string",
                    "minLength": 1
                  },
                  "list": {
                     "id": "retail_bpp_on_confirm_message_134",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                       "id": "retail_bpp_on_confirm_message_135",
                      "type": "object",
                      "properties": {
                        "code": {
                           "id": "retail_bpp_on_confirm_message_136",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                           "id": "retail_bpp_on_confirm_message_137",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                }
              }
            },
            "created_at": {
               "id": "retail_bpp_on_confirm_message_138",
              "type": "string",
              "minLength": 1
            },
            "updated_at": {
               "id": "retail_bpp_on_confirm_message_139",
              "type": "string",
              "minLength": 1
            }
          }
        }
      }
    }