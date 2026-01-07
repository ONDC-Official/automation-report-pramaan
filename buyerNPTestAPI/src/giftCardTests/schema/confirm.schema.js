// max id - 140
module.exports = {
  "id": "gc_bap_confirm_01",
  "type": "object",
  "properties": {
    "order": {
      "id": "gc_bap_confirm_02",
      "type": "object",
      "properties": {
        "id": {
          "id": "gc_bap_confirm_03",
          "type": "string",
          "minLength": 1
        },
        "status": {
          "id": "gc_bap_confirm_04",
          "type": "string",
          "minLength": 1,
          "enum": ["CREATED"]
        },
        "provider": {
          "id": "gc_bap_confirm_05",
          "type": "object",
          "properties": {
            "id": {
              "id": "gc_bap_confirm_06",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "items": {
          "id": "gc_bap_confirm_07",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "gc_bap_confirm_08",
            "type": "object",
            "properties": {
              "id": {
                "id": "gc_bap_confirm_09",
                "type": "string",
                "minLength": 1
              },
              "price": {
                "id": "gc_bap_confirm_10",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "gc_bap_confirm_11",
                    "type": "string",
                    "minLength": 1
                  },
                  "value": {
                    "id": "gc_bap_confirm_12",
                    "type": "string",
                    "minLength": 1
                  },
                  "offered_value": {
                    "id": "gc_bap_confirm_13",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "quantity": {
                "id": "gc_bap_confirm_14",
                "type": "object",
                "properties": {
                  "selected": {
                    "id": "gc_bap_confirm_15",
                    "type": "object",
                    "properties": {
                      "count": {
                        "id": "gc_bap_confirm_16",
                        "type": "number"
                      }
                    }
                  }
                }
              },
              "fulfillment_ids": {
                "id": "gc_bap_confirm_17",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "gc_bap_confirm_18",
                  "type": "string",
                  "minLength": 1
                }
              },
              "tags": {
                "id": "gc_bap_confirm_19",
                "type": "array",
                "minItems": 1,
                "optional": true,
                "element": {
                  "id": "gc_bap_confirm_20",
                  "type": "object",
                  "optional": true,
                  "properties": {
                    "descriptor": {
                      "id": "gc_bap_confirm_21",
                      "type": "object",
                      "optional": true,
                      "properties": {
                        "code": {
                          "id": "gc_bap_confirm_22",
                          "type": "string",
                          "minLength": 1,
                          "optional": true,
                          "enum": ["CUSTOMIZATION"]
                        }
                      }
                    },
                    "list": {
                      "id": "gc_bap_confirm_23",
                      "type": "array",
                      "optional": true,
                      "minItems": 1,
                      "element": {
                        "allOf": [
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "RECEIVER_NAME"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_96",
                              "type": "object",
                              "optional": true,
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_25",
                                  "type": "object",
                                  "optional": true,
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_26",
                                      "type": "string",
                                      "minLength": 1,
                                      "optional": true,
                                      "enum": ["RECEIVER_NAME"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_97",
                                  "type": "string",
                                  "optional": true,
                                  "minLength": 1
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "MESSAGE"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_98",
                              "type": "object",
                              "optional": true,
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_99",
                                  "type": "object",
                                  "optional": true,
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_100",
                                      "type": "string",
                                      "minLength": 1,
                                      "optional": true,
                                      "enum": ["MESSAGE"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_27",
                                  "type": "string",
                                  "optional": true,
                                  "minLength": 1
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "ENABLED"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_101",
                              "type": "object",
                              "optional": true,
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_102",
                                  "type": "object",
                                  "optional": true,
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_103",
                                      "type": "string",
                                      "minLength": 1,
                                      "optional": true,
                                      "enum": ["ENABLED"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_104",
                                  "type": "string",
                                  "minLength": 1,
                                  "optional": true,
                                  "enum": ["TRUE", "FALSE"]
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "PREVIEW_IMAGE"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_105",
                              "type": "object",
                              "optional": true,
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_106",
                                  "type": "object",
                                  "optional": true,
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_107",
                                      "type": "string",
                                      "minLength": 1,
                                      "optional": true,
                                      "enum": ["PREVIEW_IMAGE"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_108",
                                  "type": "string",
                                  "optional": true,
                                  "minLength": 1,
                                  "format": "url"
                                }
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "fulfillments": {
          "id": "gc_bap_confirm_28",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "gc_bap_confirm_29",
            "type": "object",
            "properties": {
              "id": {
                "id": "gc_bap_confirm_30",
                "type": "string",
                "minLength": 1
              },
              "type": {
                "id": "gc_bap_confirm_31",
                "type": "string",
                "minLength": 1,
                "enum": ["ONLINE_EMAIL", "ONLINE_SMS", "ONLINE_EMAIL_SMS", "BPP_ONLINE_EMAIL_SMS", "BAP"]
              },
              "stops": {
                "id": "gc_bap_confirm_32",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "gc_bap_confirm_33",
                  "type": "object",
                  "properties": {
                    "contact": {
                      "id": "gc_bap_confirm_34",
                      "type": "object",
                      "properties": {
                        "phone": {
                          "id": "gc_bap_confirm_35",
                          "type": "string",
                          "minLength": 1
                        },
                        "email": {
                          "id": "gc_bap_confirm_36",
                          "type": "string",
                          "minLength": 1,
                          "compliance": "email"
                        }
                      }
                    },
                    "person": {
                      "id": "gc_bap_confirm_37",
                      "type": "object",
                      "properties": {
                        "name": {
                          "id": "gc_bap_confirm_38",
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
        "billing": {
          "id": "gc_bap_confirm_39",
          "type": "object",
          "properties": {
            "name": {
              "id": "gc_bap_confirm_40",
              "type": "string",
              "minLength": 1
            },
            "address": {
              "id": "gc_bap_confirm_41",
              "type": "string",
              "minLength": 1
            },
            "city": {
              "id": "gc_bap_confirm_42",
              "type": "object",
              "properties": {
                "name": {
                  "id": "gc_bap_confirm_43",
                  "type": "string",
                  "minLength": 1
                },
                "code": {
                  "id": "gc_bap_confirm_44",
                  "type": "string",
                  "minLength": 1,
                  "compliance": "city"
                }
              }
            },
            "state": {
              "id": "gc_bap_confirm_45",
              "type": "object",
              "properties": {
                "name": {
                  "id": "gc_bap_confirm_46",
                  "type": "string",
                  "minLength": 1
                },
                "code": {
                  "id": "gc_bap_confirm_47",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "email": {
              "id": "gc_bap_confirm_48",
              "type": "string",
              "minLength": 1,
              "compliance": "email"
            },
            "phone": {
              "id": "gc_bap_confirm_49",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "offers": {
          "id": "gc_bap_confirm_50",
          "type": "array",
          "optional": true,
          "minItems": 1,
          "element": {
            "id": "gc_bap_confirm_51",
            "type": "object",
            "optional": true,
            "properties": {
              "id": {
                "id": "gc_bap_confirm_52",
                "type": "string",
                "optional": true,
                "minLength": 1
              },
              "item_ids": {
                "id": "gc_bap_confirm_53",
                "type": "array",
                "optional": true,
                "minItems": 1,
                "element": {
                  "id": "gc_bap_confirm_54",
                  "type": "string",
                  "optional": true,
                  "minLength": 1
                }
              }
            }
          }
        },
        "quote": {
          "id": "gc_bap_confirm_55",
          "type": "object",
          "properties": {
            "price": {
              "id": "gc_bap_confirm_56",
              "type": "object",
              "properties": {
                "currency": {
                  "id": "gc_bap_confirm_57",
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "id": "gc_bap_confirm_58",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "breakup": {
              "id": "gc_bap_confirm_59",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "gc_bap_confirm_60",
                "type": "object",
                "passKeysToParams": ["title"],
                "properties": {
                  "title": {
                    "id": "gc_bap_confirm_70",
                    "type": "string",
                    "minLength": 1
                  },
                  "item": {
                    "id": "gc_bap_confirm_61",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "gc_bap_confirm_62",
                        "type": "string",
                        "minLength": 1
                      },
                      "quantity": {
                        "id": "gc_bap_confirm_63",
                        "type": "object",
                        "properties": {
                          "selected": {
                            "id": "gc_bap_confirm_64",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "gc_bap_confirm_65",
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "price": {
                        "id": "gc_bap_confirm_66",
                        "type": "object",
                        "properties": {
                          "currency": {
                            "id": "gc_bap_confirm_67",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "gc_bap_confirm_68",
                            "type": "string",
                            "minLength": 1
                          },
                          "offered_value": {
                            "id": "gc_bap_confirm_69",
                            "type": "string",
                            "minLength": 1
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
                                "title": {
                                  "type": "params",
                                  "const": ["ITEM"]
                                }
                              }
                            },
                            "then": [
                              "id",
                              "quantity",
                              "price"
                            ]
                          },
                          {
                            "if": {
                              "properties": {
                                "title": {
                                  "type": "params",
                                  "const": ["TAX", "CONVENIENCE_FEE", "OFFER"]
                                }
                              }
                            },
                            "then": [
                              "id"
                            ]
                          }
                        ]
                      }
                    }
                  },
                  "price": {
                    "id": "gc_bap_confirm_71",
                    "type": "object",
                    "properties": {
                      "currency": {
                        "id": "gc_bap_confirm_72",
                        "type": "string",
                        "minLength": 1
                      },
                      "value": {
                        "id": "gc_bap_confirm_73",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            // "ttl": {
            //   "id": "gc_bap_confirm_74",
            //   "type": "string",
            //   "minLength": 1,
            //   "format": "duration"
            // }
          }
        },
        "payments": {
          "id": "gc_bap_confirm_75",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "gc_bap_confirm_76",
            "type": "object",
            "properties": {
              "id": {
                "id": "gc_bap_confirm_77",
                "type": "string",
                "minLength": 1
              },
              "collected_by": {
                "id": "gc_bap_confirm_78",
                "type": "string",
                "minLength": 1
              },
              "url": {
                "id": "gc_bap_confirm_79",
                "type": "string",
                "minLength": 1
              },
              "params": {
                "id": "gc_bap_confirm_80",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "gc_bap_confirm_81",
                    "type": "string",
                    "minLength": 1
                  },
                  "transaction_id": {
                    "id": "gc_bap_confirm_82",
                    "type": "string",
                    "minLength": 1
                  },
                  "amount": {
                    "id": "gc_bap_confirm_83",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "status": {
                "id": "gc_bap_confirm_84",
                "type": "string",
                "minLength": 1
              },
              "tags": {
                "id": "gc_bap_confirm_85",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "gc_bap_confirm_86",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "gc_bap_confirm_87",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "gc_bap_confirm_88",
                          "type": "string",
                          "minLength": 1,
                          "enum": ["BUYER_FINDER_FEES", "SETTLEMENT_DETAILS"]
                        }
                      }
                    },
                    "list": {
                      "id": "gc_bap_confirm_89",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "allOf": [
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "BUYER_FINDER_FEES_PERCENTAGE"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_109",
                              "type": "object",
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_110",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_111",
                                      "type": "string",
                                      "minLength": 1,
                                      "enum": ["BUYER_FINDER_FEES_PERCENTAGE"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_112",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "SETTLEMENT_COUNTERPARTY"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_109",
                              "type": "object",
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_110",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_111",
                                      "type": "string",
                                      "minLength": 1,
                                      "enum": ["SETTLEMENT_COUNTERPARTY"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_112",
                                  "type": "string",
                                  "minLength": 1,
                                  "enum": ["BAP", "BPP"]
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "SETTLEMENT_TYPE"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_113",
                              "type": "object",
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_114",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_115",
                                      "type": "string",
                                      "minLength": 1,
                                      "enum": ["SETTLEMENT_TYPE"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_116",
                                  "type": "string",
                                  "minLength": 1,
                                  "enum": ["UPI", "NEFT", "RTGS"]
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "VIRTUAL_ADDRESS"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_117",
                              "type": "object",
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_118",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_119",
                                      "type": "string",
                                      "minLength": 1,
                                      "enum": ["VIRTUAL_ADDRESS"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_120",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "ACCOUNT_NO"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_121",
                              "type": "object",
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_122",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_123",
                                      "type": "string",
                                      "minLength": 1,
                                      "enum": ["ACCOUNT_NO"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_124",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "BENEFICIARY_NAME"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_125",
                              "type": "object",
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_126",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_127",
                                      "type": "string",
                                      "minLength": 1,
                                      "enum": ["BENEFICIARY_NAME"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_128",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "BANK_NAME"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_129",
                              "type": "object",
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_130",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_131",
                                      "type": "string",
                                      "minLength": 1,
                                      "enum": ["BANK_NAME"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_132",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "BRANCH_CODE"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_133",
                              "type": "object",
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_134",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_135",
                                      "type": "string",
                                      "minLength": 1,
                                      "enum": ["BRANCH_CODE"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_136",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "descriptor": {
                                  "code": {
                                    "const": "BRANCH_NAME"
                                  }
                                }
                              }
                            },
                            "then": {
                              "id": "gc_bap_confirm_137",
                              "type": "object",
                              "properties": {
                                "descriptor": {
                                  "id": "gc_bap_confirm_138",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "gc_bap_confirm_139",
                                      "type": "string",
                                      "minLength": 1,
                                      "enum": ["BRANCH_NAME"]
                                    }
                                  }
                                },
                                "value": {
                                  "id": "gc_bap_confirm_140",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          }
                        ]
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
                        "collected_by": {
                          "const": ["BAP"]
                        }
                      }
                    },
                    "then": [
                      "id",
                      "collected_by",
                      "params",
                      "status",
                      "tags"
                    ]
                  },
                  {
                    "if": {
                      "properties": {
                        "collected_by": {
                          "const": ["BPP"]
                        }
                      }
                    },
                    "then": [
                      "id",
                      "collected_by",
                      "status",
                      "tags"
                    ]
                  }
                ]
              }
            }
          }
        },
        "created_at": {
          "id": "gc_bap_confirm_94",
          "type": "string",
          "minLength": 1,
          "format": "rfc3339-date-time",
          "errorMessage": "Time must be RFC3339 UTC timestamp format."
        },
        "updated_at": {
          "id": "gc_bap_confirm_95",
          "type": "string",
          "minLength": 1,
          "format": "rfc3339-date-time",
          "errorMessage": "Time must be RFC3339 UTC timestamp format."
        }
      }
    }
  }
}