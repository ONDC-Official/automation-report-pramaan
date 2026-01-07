module.exports =  {
   "id": "retail_bpp_on_cancel_message_01",
      "type": "object",
      "properties": {
        "order": {
          "id": "retail_bpp_on_cancel_message_02",
          "type": "object",
          "properties": {
            "id": {
              "id": "retail_bpp_on_cancel_message_03",
              "type": "string",
              "minLength": 1
            },
            "state": {
              "id": "retail_bpp_on_cancel_message_04",
              "type": "string",
              "minLength": 1
            },
            "provider": {
              "id": "retail_bpp_on_cancel_message_05",
              "type": "object",
              "properties": {
                "id": {
                  "id": "retail_bpp_on_cancel_message_06",
                  "type": "string",
                  "minLength": 1
                },
                "locations": {
                  "id": "retail_bpp_on_cancel_message_07",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "retail_bpp_on_cancel_message_08",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "retail_bpp_on_cancel_message_09",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "items": {
              "id": "retail_bpp_on_cancel_message_10",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "retail_bpp_on_cancel_message_11",
                "type": "object",
                "properties": {
                  "id": {
                    "id": "retail_bpp_on_cancel_message_12",
                    "type": "string",
                    "minLength": 1
                  },
                  "fulfillment_id": {
                    "id": "retail_bpp_on_cancel_message_13",
                    "type": "string",
                    "minLength": 1
                  },
                  "quantity": {
                    "id": "retail_bpp_on_cancel_message_14",
                    "type": "object",
                    "properties": {
                      "count": {
                        "id": "retail_bpp_on_cancel_message_15",
                        "type": "number"
                      }
                    }
                  }
                }
              }
            },
            "billing": {
              "id": "retail_bpp_on_cancel_message_16",
              "type": "object",
              "properties": {
                "name": {
                  "id": "retail_bpp_on_cancel_message_17",
                  "type": "string",
                  "minLength": 1
                },
                "address": {
                  "id": "retail_bpp_on_cancel_message_18",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "retail_bpp_on_cancel_message_19",
                      "type": "string",
                      "minLength": 1
                    },
                    "building": {
                      "id": "retail_bpp_on_cancel_message_20",
                      "type": "string",
                      "minLength": 1
                    },
                    "locality": {
                      "id": "retail_bpp_on_cancel_message_21",
                      "type": "string",
                      "minLength": 1
                    },
                    "city": {
                      "id": "retail_bpp_on_cancel_message_22",
                      "type": "string",
                      "minLength": 1
                    },
                    "state": {
                      "id": "retail_bpp_on_cancel_message_23",
                      "type": "string",
                      "minLength": 1
                    },
                    "country": {
                      "id": "retail_bpp_on_cancel_message_24",
                      "type": "string",
                      "minLength": 1
                    },
                    "area_code": {
                      "id": "retail_bpp_on_cancel_message_25",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "email": {
                  "id": "retail_bpp_on_cancel_message_26",
                  "type": "string",
                  "minLength": 1
                },
                "phone": {
                  "id": "retail_bpp_on_cancel_message_27",
                  "type": "string",
                  "minLength": 1
                },
                "created_at": {
                  "id": "retail_bpp_on_cancel_message_28",
                  "type": "string",
                  "minLength": 1
                },
                "updated_at": {
                  "id": "retail_bpp_on_cancel_message_29",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "cancellation": {
              "id": "retail_bpp_on_cancel_message_30",
              "type": "object",
              "properties": {
                "cancelled_by": {
                   "id": "retail_bpp_on_cancel_message_31",
                  "type": "string",
                  "minLength": 1
                },
                "reason": {
                   "id": "retail_bpp_on_cancel_message_32",
                  "type": "object",
                  "properties": {
                    "id": {
                       "id": "retail_bpp_on_cancel_message_33",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                }
              }
            },
            "fulfillments": {
               "id": "retail_bpp_on_cancel_message_34",
              "type": "array",
              "minItems": 1,
              "element": {
                 "id": "retail_bpp_on_cancel_message_35",
                "type": "object",
                "properties": {
                  "id": {
                     "id": "retail_bpp_on_cancel_message_36",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/provider_name": {
                     "id": "retail_bpp_on_cancel_message_37",
                    "type": "string",
                    "minLength": 1
                  },
                  "state": {
                     "id": "retail_bpp_on_cancel_message_38",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                         "id": "retail_bpp_on_cancel_message_39",
                        "type": "object",
                        "properties": {
                          "code": {
                             "id": "retail_bpp_on_cancel_message_40",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "type": {
                     "id": "retail_bpp_on_cancel_message_41",
                    "type": "string",
                    "minLength": 1
                  },
                  "tracking": {
                     "id": "retail_bpp_on_cancel_message_42",
                    "type": "boolean"
                  },
                  "@ondc/org/TAT": {
                     "id": "retail_bpp_on_cancel_message_43",
                    "type": "string",
                    "minLength": 1
                  },
                  "start": {
                     "id": "retail_bpp_on_cancel_message_44",
                    "type": "object",
                    "properties": {
                      "location": {
                         "id": "retail_bpp_on_cancel_message_45",
                        "type": "object",
                        "properties": {
                          "id": {
                             "id": "retail_bpp_on_cancel_message_46",
                            "type": "string",
                            "minLength": 1
                          },
                          "descriptor": {
                             "id": "retail_bpp_on_cancel_message_47",
                            "type": "object",
                            "properties": {
                              "name": {
                                 "id": "retail_bpp_on_cancel_message_48",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "gps": {
                             "id": "retail_bpp_on_cancel_message_49",
                            "type": "string",
                            "minLength": 1
                          },
                          "address": {
                             "id": "retail_bpp_on_cancel_message_50",
                            "type": "object",
                            "properties": {
                              "locality": {
                                 "id": "retail_bpp_on_cancel_message_51",
                                "type": "string",
                                "minLength": 1
                              },
                              "city": {
                                 "id": "retail_bpp_on_cancel_message_52",
                                "type": "string",
                                "minLength": 1
                              },
                              "area_code": {
                                 "id": "retail_bpp_on_cancel_message_53",
                                "type": "string",
                                "minLength": 1
                              },
                              "state": {
                                 "id": "retail_bpp_on_cancel_message_54",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          }
                        }
                      },
                      "contact": {
                         "id": "retail_bpp_on_cancel_message_55",
                        "type": "object",
                        "properties": {
                          "phone": {
                             "id": "retail_bpp_on_cancel_message_56",
                            "type": "string",
                            "minLength": 1
                          },
                          "email": {
                             "id": "retail_bpp_on_cancel_message_57",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "end": {
                     "id": "retail_bpp_on_cancel_message_58",
                    "type": "object",
                    "properties": {
                      "location": {
                         "id": "retail_bpp_on_cancel_message_59",
                        "type": "object",
                        "properties": {
                          "gps": {
                             "id": "retail_bpp_on_cancel_message_60",
                            "type": "string",
                            "minLength": 1
                          },
                          "address": {
                             "id": "retail_bpp_on_cancel_message_61",
                            "type": "object",
                            "properties": {
                              "name": {
                                 "id": "retail_bpp_on_cancel_message_62",
                                "type": "string",
                                "minLength": 1
                              },
                              "building": {
                                 "id": "retail_bpp_on_cancel_message_63",
                                "type": "string",
                                "minLength": 1
                              },
                              "locality": {
                                 "id": "retail_bpp_on_cancel_message_64",
                                "type": "string",
                                "minLength": 1
                              },
                              "city": {
                                 "id": "retail_bpp_on_cancel_message_65",
                                "type": "string",
                                "minLength": 1
                              },
                              "state": {
                                 "id": "retail_bpp_on_cancel_message_66",
                                "type": "string",
                                "minLength": 1
                              },
                              "country": {
                                 "id": "retail_bpp_on_cancel_message_67",
                                "type": "string",
                                "minLength": 1
                              },
                              "area_code": {
                                 "id": "retail_bpp_on_cancel_message_68",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          }
                        }
                      },
                      "person": {
                         "id": "retail_bpp_on_cancel_message_69",
                        "type": "object",
                        "properties": {
                          "name": {
                             "id": "retail_bpp_on_cancel_message_70",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "contact": {
                         "id": "retail_bpp_on_cancel_message_71",
                        "type": "object",
                        "properties": {
                          "phone": {
                             "id": "retail_bpp_on_cancel_message_72",
                            "type": "string",
                            "minLength": 1
                          },
                          "email": {
                             "id": "retail_bpp_on_cancel_message_73",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "tags": {
                     "id": "retail_bpp_on_cancel_message_74",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                       "id": "retail_bpp_on_cancel_message_75",
                      "type": "object",
                      "properties": {
                        "code": {
                           "id": "retail_bpp_on_cancel_message_76",
                          "type": "string",
                          "minLength": 1
                        },
                        "list": {
                           "id": "retail_bpp_on_cancel_message_77",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                             "id": "retail_bpp_on_cancel_message_78",
                            "type": "object",
                            "properties": {
                              "code": {
                                 "id": "retail_bpp_on_cancel_message_79",
                                "type": "string",
                                "minLength": 1
                              },
                              "value": {
                                 "id": "retail_bpp_on_cancel_message_80",
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
                                                    "const": "Cancel"
                                                }
                                            }
                                        },
                                        "then": [
                                            "type",
                                            "state",
                                            "id",
                                            // "@ondc/org/TAT",
                                            "tags"
                                        ]
                                    },
                                    {
                                        "if": {
                                            "properties": {
                                                "type": {
                                                    "const": "Delivery"
                                                }
                                            }
                                        },
                                        "then": [
                                            "type",
                                            "state",
                                            "id",
                                            "@ondc/org/TAT",
                                            "tags",
                                            "start",
                                            "end",
                                            "tracking",
                                            "@ondc/org/provider_name"
                                        ]
                                    }
                                ]
                            }
                        }
              }
            },
            "quote": {
              "id": "retail_bpp_on_cancel_message_81",
              "type": "object",
              "properties": {
                "price": {
                  "id": "retail_bpp_on_cancel_message_82",
                  "type": "object",
                  "properties": {
                    "currency": {
                      "id": "retail_bpp_on_cancel_message_83",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "retail_bpp_on_cancel_message_84",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "breakup": {
                  "id": "retail_bpp_on_cancel_message_85",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "retail_bpp_on_cancel_message_86",
                    "type": "object",
                    "properties": {
                      "@ondc/org/item_id": {
                        "id": "retail_bpp_on_cancel_message_87",
                        "type": "string",
                        "minLength": 1
                      },
                      "@ondc/org/item_quantity": {
                        "id": "retail_bpp_on_cancel_message_88",
                        "type": "object",
                        "properties": {
                          "count": {
                            "id": "retail_bpp_on_cancel_message_89",
                            "type": "number"
                          }
                        }
                      },
                      "title": {
                        "id": "retail_bpp_on_cancel_message_90",
                        "type": "string",
                        "minLength": 1
                      },
                      "@ondc/org/title_type": {
                        "id": "retail_bpp_on_cancel_message_91",
                        "type": "string",
                        "minLength": 1
                      },
                      "price": {
                        "id": "retail_bpp_on_cancel_message_92",
                        "type": "object",
                        "properties": {
                          "currency": {
                            "id": "retail_bpp_on_cancel_message_93",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "retail_bpp_on_cancel_message_94",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "item": {
                        "id": "retail_bpp_on_cancel_message_95",
                        "type": "object",
                        "properties": {
                          "price": {
                            "id": "retail_bpp_on_cancel_message_96",
                            "type": "object",
                            "properties": {
                              "currency": {
                                "id": "retail_bpp_on_cancel_message_97",
                                "type": "string",
                                "minLength": 1
                              },
                              "value": {
                                "id": "retail_bpp_on_cancel_message_98",
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
                                                            "const": [
                                                                "packing",
                                                                "misc",
                                                                "tax"
                                                            ]
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
                                                            "const": [
                                                                "tax"
                                                            ]
                                                        }
                                                    }
                                                },
                                                "then": [
                                                    "@ondc/org/item_id",
                                                    "@ondc/org/title_type",
                                                    "title",
                                                    "price"
                                                ]
                                            }
                                        ]
                                    }
                                }
                  }
                },
                // "ttl": {
                //   "id": "retail_bpp_on_cancel_message_99",
                //   "type": "string",
                //   "minLength": 1
                // }
              }
            },
            "payment": {
              "id": "retail_bpp_on_cancel_message_100",
              "type": "object",
              "properties": {
                // "uri": {
                //    "id": "retail_bpp_on_cancel_message_101",
                //   "type": "string",
                //   "minLength": 1
                // },
                // "tl_method": {
                //    "id": "retail_bpp_on_cancel_message_102",
                //   "type": "string",
                //   "minLength": 1
                // },
                "params": {
                   "id": "retail_bpp_on_cancel_message_103",
                  "type": "object",
                  "properties": {
                    "currency": {
                       "id": "retail_bpp_on_cancel_message_104",
                      "type": "string",
                      "minLength": 1
                    },
                    "transaction_id": {
                       "id": "retail_bpp_on_cancel_message_105",
                      "type": "string",
                      "minLength": 1
                    },
                    "amount": {
                       "id": "retail_bpp_on_cancel_message_106",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "status": {
                   "id": "retail_bpp_on_cancel_message_107",
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                   "id": "retail_bpp_on_cancel_message_108",
                  "type": "string",
                  "minLength": 1
                },
                "collected_by": {
                   "id": "retail_bpp_on_cancel_message_109",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/buyer_app_finder_fee_type": {
                   "id": "retail_bpp_on_cancel_message_110",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/buyer_app_finder_fee_amount": {
                  "id": "retail_bpp_on_cancel_message_111",
                  "type": "string",
                  "minLength": 1
                },
                "@ondc/org/settlement_details": {
                  "id": "retail_bpp_on_cancel_message_112",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "retail_bpp_on_cancel_message_113",
                    "type": "object",
                    "properties": {
                      "settlement_counterparty": {
                        "id": "retail_bpp_on_cancel_message_114",
                        "type": "string",
                        "minLength": 1
                      },
                      "settlement_phase": {
                        "id": "retail_bpp_on_cancel_message_115",
                        "type": "string",
                        "minLength": 1
                      },
                      "beneficiary_name": {
                        "id": "retail_bpp_on_cancel_message_116",
                        "type": "string",
                        "minLength": 1
                      },
                      "settlement_type": {
                        "id": "retail_bpp_on_cancel_message_117",
                        "type": "string",
                        "minLength": 1
                      },
                      "upi_address": {
                        "id": "retail_bpp_on_cancel_message_118",
                        "type": "string",
                        "minLength": 0
                      },
                      "settlement_bank_account_no": {
                        "id": "retail_bpp_on_cancel_message_119",
                        "type": "string",
                        "minLength": 1
                      },
                      "settlement_ifsc_code": {
                        "id": "retail_bpp_on_cancel_message_120",
                        "type": "string",
                        "minLength": 1
                      },
                      "bank_name": {
                        "id": "retail_bpp_on_cancel_message_121",
                        "type": "string",
                        "minLength": 1
                      },
                      "branch_name": {
                        "id": "retail_bpp_on_cancel_message_122",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "created_at": {
              "id": "retail_bpp_on_cancel_message_123",
              "type": "string",
              "minLength": 1
            },
            "updated_at": {
              "id": "retail_bpp_on_cancel_message_124",
              "type": "string",
              "minLength": 1
            }
          }
        }
      }
    }