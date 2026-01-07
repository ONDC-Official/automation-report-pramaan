module.exports = {
  "id": "wc_log_bpp_on_confirm_message_01",
  "type": "object",
  "properties": {
    "order": {
      "id": "wc_log_bpp_on_confirm_message_02",
      "type": "object",
      "properties": {
        "id": {
          "id": "wc_log_bpp_on_confirm_message_03",
          "type": "string",
          "minLength": 1
        },
        "ref_order_ids": {
          "id": "wc_log_bpp_on_confirm_message_133",
          "type": "array",
          "minLength": 1,
          "element": {
            "id": "wc_log_bpp_on_confirm_message_139",
            "type": "string",
            "minLength": 1
          }
        },
        "status": {
          "id": "wc_log_bpp_on_confirm_message_04",
          "type": "string",
          "minLength": 1
        },
        "provider": {
          "id": "wc_log_bpp_on_confirm_message_05",
          "type": "object",
          "properties": {
            "id": {
              "id": "wc_log_bpp_on_confirm_message_06",
              "type": "string",
              "minLength": 1
            },
            "descriptor": {
              "id": "wc_log_bpp_on_confirm_message_07",
              "type": "object",
              "properties": {
                "images": {
                  "id": "wc_log_bpp_on_confirm_message_08",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "wc_log_bpp_on_confirm_message_09",
                    "type": "object",
                    "properties": {
                      "size_type": {
                        "id": "wc_log_bpp_on_confirm_message_10",
                        "type": "string",
                        "minLength": 1
                      },
                      "url": {
                        "id": "wc_log_bpp_on_confirm_message_11",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                },
                "long_desc": {
                  "id": "wc_log_bpp_on_confirm_message_12",
                  "type": "string",
                  "minLength": 1
                },
                "name": {
                  "id": "wc_log_bpp_on_confirm_message_13",
                  "type": "string",
                  "minLength": 1
                },
                "short_desc": {
                  "id": "wc_log_bpp_on_confirm_message_14",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "tags": {
              "id": "wc_log_bpp_on_confirm_message_15",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "wc_log_bpp_on_confirm_message_16",
                "type": "object",
                "properties": {
                  "descriptor": {
                    "id": "wc_log_bpp_on_confirm_message_17",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "wc_log_bpp_on_confirm_message_18",
                        "type": "string",
                        "minLength": 1
                      },
                      "name": {
                        "id": "wc_log_bpp_on_confirm_message_19",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "list": {
                    "id": "wc_log_bpp_on_confirm_message_20",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "wc_log_bpp_on_confirm_message_21",
                      "type": "object",
                      "properties": {
                        "descriptor": {
                          "id": "wc_log_bpp_on_confirm_message_22",
                          "type": "object",
                          "properties": {
                            "code": {
                              "id": "wc_log_bpp_on_confirm_message_23",
                              "type": "string",
                              "minLength": 1
                            },
                            "name": {
                              "id": "wc_log_bpp_on_confirm_message_24",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        },
                        "value": {
                          "id": "wc_log_bpp_on_confirm_message_25",
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
        "quote": {
          "id": "wc_log_bpp_on_confirm_message_26",
          "type": "object",
          "properties": {
            "id": {
              "id": "wc_log_bpp_on_confirm_message_27",
              "type": "string",
              "minLength": 1
            },
            "price": {
              "id": "wc_log_bpp_on_confirm_message_28",
              "type": "object",
              "properties": {
                "currency": {
                  "id": "wc_log_bpp_on_confirm_message_29",
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "id": "wc_log_bpp_on_confirm_message_30",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "breakup": {
              "id": "wc_log_bpp_on_confirm_message_31",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "wc_log_bpp_on_confirm_message_32",
                "type": "object",
                "properties": {
                  "title": {
                    "id": "wc_log_bpp_on_confirm_message_33",
                    "type": "string",
                    "minLength": 1,
                    "enum": ["WORKING_CAPITAL_LIMIT", "CURRENT_UTLIZATION", "PROCESSING_FEE", "INSURANCE_CHARGES", "OTHER_UPFRONT_CHARGES", "OTHER_CHARGES", "LATE_FEE_AMOUNT", "FORCLOSUER_CHARGES", "PRE_PAYMENT_CHARGE"]
                  },
                  "price": {
                    "id": "wc_log_bpp_on_confirm_message_34",
                    "type": "object",
                    "properties": {
                      "value": {
                        "id": "wc_log_bpp_on_confirm_message_35",
                        "type": "string",
                        "minLength": 1
                      },
                      "currency": {
                        "id": "wc_log_bpp_on_confirm_message_36",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "ttl": {
              "id": "wc_log_bpp_on_confirm_message_37",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "items": {
          "id": "wc_log_bpp_on_confirm_message_38",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bpp_on_confirm_message_39",
            "type": "object",
            "properties": {
              "id": {
                "id": "wc_log_bpp_on_confirm_message_40",
                "type": "string",
                "minLength": 1
              },
              "parent_item_id": {
                "id": "wc_log_bpp_on_confirm_message_41",
                "type": "string",
                "minLength": 1
              },
              "descriptor": {
                "id": "wc_log_bpp_on_confirm_message_42",
                "type": "object",
                "properties": {
                  "code": {
                    "id": "wc_log_bpp_on_confirm_message_43",
                    "type": "string",
                    "minLength": 1,
                    "enum": ["LOAN"]
                  },
                  "name": {
                    "id": "wc_log_bpp_on_confirm_message_44",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "category_ids": {
                "id": "wc_log_bpp_on_confirm_message_45",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "wc_log_bpp_on_confirm_message_46",
                  "type": "object",
                  "properties": {}
                }
              },
              "fulfillment_ids": {
                "id": "wc_log_bpp_on_confirm_message_47",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "wc_log_bpp_on_confirm_message_48",
                  "type": "object",
                  "properties": {}
                }
              },
              "price": {
                "id": "wc_log_bpp_on_confirm_message_49",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "wc_log_bpp_on_confirm_message_50",
                    "type": "string",
                    "minLength": 1
                  },
                  "value": {
                    "id": "wc_log_bpp_on_confirm_message_51",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "tags": {
                "id": "wc_log_bpp_on_confirm_message_52",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "wc_log_bpp_on_confirm_message_53",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "wc_log_bpp_on_confirm_message_54",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "wc_log_bpp_on_confirm_message_55",
                          "type": "string",
                          "minLength": 1
                        },
                        "name": {
                          "id": "wc_log_bpp_on_confirm_message_56",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "list": {
                      "id": "wc_log_bpp_on_confirm_message_57",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "wc_log_bpp_on_confirm_message_58",
                        "type": "object",
                        "properties": {
                          "descriptor": {
                            "id": "wc_log_bpp_on_confirm_message_59",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "wc_log_bpp_on_confirm_message_60",
                                "type": "string",
                                "minLength": 1
                              },
                              "name": {
                                "id": "wc_log_bpp_on_confirm_message_61",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "value": {
                            "id": "wc_log_bpp_on_confirm_message_62",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    },
                    "display": {
                      "id": "wc_log_bpp_on_confirm_message_63",
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          }
        },
        "payments": {
          "id": "wc_log_bpp_on_confirm_message_64",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bpp_on_confirm_message_65",
            "type": "object",
            "properties": {
              "id": {
                "id": "wc_log_bpp_on_confirm_message_66",
                "type": "string",
                "minLength": 1
              },
              "collected_by": {
                "id": "wc_log_bpp_on_confirm_message_67",
                "type": "string",
                "minLength": 1,
                "emun": ["BAP", "BPP"]
              },
              "params": {
                "id": "wc_log_bpp_on_confirm_message_68",
                "type": "object",
                "properties": {
                  "amount": {
                    "id": "wc_log_bpp_on_confirm_message_69",
                    "type": "string",
                    "minLength": 1
                  },
                  "currency": {
                    "id": "wc_log_bpp_on_confirm_message_70",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "status": {
                "id": "wc_log_bpp_on_confirm_message_71",
                "type": "string",
                "minLength": 1,
                "emun": ["PAID", "NOT-PAID", "DEFERRED", "DELAYED"]
              },
              "type": {
                "id": "wc_log_bpp_on_confirm_message_72",
                "type": "string",
                "minLength": 1,
                "emun": ["POST-FULFILLMENT", "ON-FULFILLMENT", "ON-ORDER"]
              }
            }
          }
        },
        "documents": {
          "id": "wc_log_bpp_on_confirm_message_83",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bpp_on_confirm_message_84",
            "type": "object",
            "properties": {
              "descriptor": {
                "id": "wc_log_bpp_on_confirm_message_85",
                "type": "object",
                "properties": {
                  "code": {
                    "id": "wc_log_bpp_on_confirm_message_86",
                    "type": "string",
                    "minLength": 1
                  },
                  "name": {
                    "id": "wc_log_bpp_on_confirm_message_87",
                    "type": "string",
                    "minLength": 1
                  },
                  "short_desc": {
                    "id": "wc_log_bpp_on_confirm_message_88",
                    "type": "string",
                    "minLength": 1
                  },
                  "long_desc": {
                    "id": "wc_log_bpp_on_confirm_message_89",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "mime_type": {
                "id": "wc_log_bpp_on_confirm_message_90",
                "type": "string",
                "minLength": 1
              },
              "url": {
                "id": "wc_log_bpp_on_confirm_message_91",
                "type": "string",
                "minLength": 1
              }
            }
          }
        },
        "tags": {
          "id": "wc_log_bpp_on_confirm_message_92",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bpp_on_confirm_message_93",
            "type": "object",
            "properties": {
              "display": {
                "id": "wc_log_bpp_on_confirm_message_94",
                "type": "boolean"
              },
              "descriptor": {
                "id": "wc_log_bpp_on_confirm_message_95",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "wc_log_bpp_on_confirm_message_96",
                    "type": "string",
                    "minLength": 1
                  },
                  "code": {
                    "id": "wc_log_bpp_on_confirm_message_97",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "list": {
                "id": "wc_log_bpp_on_confirm_message_98",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "wc_log_bpp_on_confirm_message_99",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "wc_log_bpp_on_confirm_message_100",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "wc_log_bpp_on_confirm_message_101",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "value": {
                      "id": "wc_log_bpp_on_confirm_message_102",
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
          "id": "wc_log_bpp_on_confirm_message_103",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bpp_on_confirm_message_104",
            "type": "object",
            "properties": {
              "id": {
                "id": "wc_log_bpp_on_confirm_message_105",
                "type": "string",
                "minLength": 1
              },
              "customer": {
                "id": "wc_log_bpp_on_confirm_message_106",
                "type": "object",
                "properties": {
                  "person": {
                    "id": "wc_log_bpp_on_confirm_message_107",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "wc_log_bpp_on_confirm_message_108",
                        "type": "string",
                        "minLength": 1
                      },
                      "dob": {
                        "id": "wc_log_bpp_on_confirm_message_109",
                        "type": "string",
                        "minLength": 1
                      },
                      "gender": {
                        "id": "wc_log_bpp_on_confirm_message_110",
                        "type": "string",
                        "minLength": 1
                      },
                      "creds": {
                        "id": "wc_log_bpp_on_confirm_message_111",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "wc_log_bpp_on_confirm_message_112",
                          "type": "object",
                          "properties": {
                            "id": {
                              "id": "wc_log_bpp_on_confirm_message_113",
                              "type": "string",
                              "minLength": 1
                            },
                            "type": {
                              "id": "wc_log_bpp_on_confirm_message_114",
                              "type": "string",
                              "minLength": 1
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
                                "step": {
                                  "const": [
                                    "on_confirm_drawdown"
                                  ]
                                }
                              }
                            },
                            "then": [
                              "name",
                              "creds"
                            ]
                          }
                        ]
                      }
                    }
                  },
                  "contact": {
                    "id": "wc_log_bpp_on_confirm_message_115",
                    "type": "object",
                    "properties": {
                      "email": {
                        "id": "wc_log_bpp_on_confirm_message_116",
                        "type": "string",
                        "minLength": 1
                      },
                      "phone": {
                        "id": "wc_log_bpp_on_confirm_message_117",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              },
              "tags": {
                "id": "wc_log_bpp_on_confirm_message_118",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "wc_log_bpp_on_confirm_message_119",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "wc_log_bpp_on_confirm_message_120",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "wc_log_bpp_on_confirm_message_121",
                          "type": "string",
                          "minLength": 1
                        },
                        "name": {
                          "id": "wc_log_bpp_on_confirm_message_122",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "list": {
                      "id": "wc_log_bpp_on_confirm_message_123",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "wc_log_bpp_on_confirm_message_124",
                        "type": "object",
                        "properties": {
                          "descriptor": {
                            "id": "wc_log_bpp_on_confirm_message_125",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "wc_log_bpp_on_confirm_message_126",
                                "type": "string",
                                "minLength": 1
                              },
                              "name": {
                                "id": "wc_log_bpp_on_confirm_message_127",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "value": {
                            "id": "wc_log_bpp_on_confirm_message_128",
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
                        "step": {
                          "const": [
                            "on_confirm_drawdown"
                          ]
                        }
                      }
                    },
                    "then": [
                      "id",
                      "customer"
                    ]
                  }
                ]
              }
            }
          }
        },
        "created_at": {
          "id": "wc_log_bpp_on_confirm_message_129",
          "type": "string",
          "minLength": 1
        },
        "updated_at": {
          "id": "wc_log_bpp_on_confirm_message_130",
          "type": "string",
          "minLength": 1
        }
      },
      // "required": {
      //   "type": "array",
      //   "element": {
      //     "allOf": [
      //       {
      //         "if": {
      //           "properties": {
      //             "type": "params",
      //             "step": {
      //               "const": [
      //                 "on_confirm_drawdown"
      //               ]
      //             }
      //           }
      //         },
      //         "then": [
      //           "ref_order_ids",
      //           "provider",
      //           "quote",
      //           "items",
      //           "payments",
      //           "fulfillments",
      //           "id",
      //           "status",
      //           "created_at",
      //           "updated_at"
      //         ],
      //         "if": {
      //           "properties": {
      //             "type": "params",
      //             "step": {
      //               "const": [
      //                 "I"
      //               ]
      //             }
      //           }
      //         },
      //         "then": [
      //           "documents",
      //           "provider",
      //           "quote",
      //           "items",
      //           "payments",
      //           "fulfillments",
      //           "id",
      //           "status",
      //           "created_at",
      //           "updated_at"
      //         ],
      //       }
      //     ]
      //   }
      // }
    }
  }
}