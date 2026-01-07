module.exports = {
  "type": "object",
  "properties": {
    "order": {
      "id": "b2c_log_bap_confirm_message_0",
      "type": "object",
      "properties": {
        "id": {
          "id": "b2c_log_bap_confirm_message_1",
          "type": "string",
          "minLength": 1
        },
        "state": {
          "id": "b2c_log_bap_confirm_message_2",
          "type": "string",
          "minLength": 1,
          "const": "state"
        },
        "provider": {
          "id": "b2c_log_bap_confirm_message_3",
          "type": "object",
          "properties": {
            "id": {
              "id": "b2c_log_bap_confirm_message_4",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "items": {
          "id": "b2c_log_bap_confirm_message_5",
          "type": "array",
          "minItems": 1,
          "element": {
            "type": "object",
            "properties": {
              "id": {
                "id": "b2c_log_bap_confirm_message_6",
                "type": "string",
                "minLength": 1
              },
              "fulfillment_id": {
                "id": "b2c_log_bap_confirm_message_7",
                "type": "string",
                "minLength": 1
              },
              "category_id": {
                "id": "b2c_log_bap_confirm_message_8",
                "type": "string",
                "minLength": 1
              },
              "descriptor": {
                "id": "b2c_log_bap_confirm_message_9",
                "type": "object",
                "properties": {
                  "code": {
                    "id": "b2c_log_bap_confirm_message_10",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "time": {
                "id": "b2c_log_bap_confirm_message_11",
                "type": "object",
                "properties": {
                  "label": {
                    "id": "b2c_log_bap_confirm_message_12",
                    "type": "string",
                    "minLength": 1
                  },
                  "duration": {
                    "id": "b2c_log_bap_confirm_message_13",
                    "type": "string",
                    "minLength": 1,
                    "format": "duration",
                    "errorMessage": "Duration must be RFC3339 duration."
                  },
                  "timestamp": {
                    "id": "b2c_log_bap_confirm_message_14",
                    "type": "string",
                    "minLength": 1
                  }
                }
              }
            }
          }
        },
        "quote": {
          "id": "b2c_log_bap_confirm_message_15",
          "type": "object",
          "properties": {
            "price": {
              "id": "b2c_log_bap_confirm_message_16",
              "type": "object",
              "properties": {
                "currency": {
                  "id": "b2c_log_bap_confirm_message_17",
                  "type": "string",
                  "minLength": 1,
                  "compliance": "currency"
                },
                "value": {
                  "id": "b2c_log_bap_confirm_message_18",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "breakup": {
              "id": "b2c_log_bap_confirm_message_19",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "b2c_log_bap_confirm_message_20",
                "type": "object",
                "properties": {
                  "@ondc/org/item_id": {
                    "id": "b2c_log_bap_confirm_message_21",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/title_type": {
                    "id": "b2c_log_bap_confirm_message_22",
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "id": "b2c_log_bap_confirm_message_23",
                    "type": "object",
                    "properties": {
                      "currency": {
                        "id": "b2c_log_bap_confirm_message_24",
                        "type": "string",
                        "minLength": 1,
                        "compliance": "currency"
                      },
                      "value": {
                        "id": "b2c_log_bap_confirm_message_25",
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
        "billing": {
          "id": "b2c_log_bap_confirm_message_26",
          "type": "object",
          "properties": {
            "name": {
              "id": "b2c_log_bap_confirm_message_27",
              "type": "string",
              "minLength": 1
            },
            "address": {
              "id": "b2c_log_bap_confirm_message_28",
              "type": "object",
              "properties": {
                "name": {
                  "id": "b2c_log_bap_confirm_message_29",
                  "type": "string",
                  "minLength": 1
                },
                "building": {
                  "id": "b2c_log_bap_confirm_message_30",
                  "type": "string",
                  "minLength": 1
                },
                "locality": {
                  "id": "b2c_log_bap_confirm_message_31",
                  "type": "string",
                  "minLength": 1
                },
                "city": {
                  "id": "b2c_log_bap_confirm_message_32",
                  "type": "string",
                  "minLength": 1
                },
                "state": {
                  "id": "b2c_log_bap_confirm_message_33",
                  "type": "string",
                  "minLength": 1
                },
                "country": {
                  "id": "b2c_log_bap_confirm_message_34",
                  "type": "string",
                  "minLength": 1
                },
                "area_code": {
                  "id": "b2c_log_bap_confirm_message_35",
                  "type": "string",
                  "minLength": 1,
                  "pattern": "^\\d{6}$",
                  "errorMessage": "area_code should be in proper format"
                }
              }
            },
            "tax_number": {
              "id": "b2c_log_bap_confirm_message_36",
              "type": "string",
              "minLength": 1
            },
            "phone": {
              "id": "b2c_log_bap_confirm_message_37",
              "type": "string",
              "minLength": 1,
              "compliance": "phone"
            },
            "email": {
              "id": "b2c_log_bap_confirm_message_38",
              "type": "string",
              "minLength": 1,
              "compliance": "email"
            },
            "created_at": {
              "id": "b2c_log_bap_confirm_message_39",
              "type": "string",
              "minLength": 1,
              "format": "rfc3339-date-time",
              "errorMessage": "Time must be RFC3339 UTC timestamp format."
            },
            "updated_at": {
              "id": "b2c_log_bap_confirm_message_40",
              "type": "string",
              "minLength": 1,
              "format": "rfc3339-date-time",
              "errorMessage": "Time must be RFC3339 UTC timestamp format."
            }
          }

        },
        "fulfillments": {
          "id": "b2c_log_bap_confirm_message_41",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "b2c_log_bap_confirm_message_42",
            "type": "object",
            "properties": {
              "id": {
                "id": "b2c_log_bap_confirm_message_43",
                "type": "string",
                "minLength": 1
              },
              "type": {
                "id": "b2c_log_bap_confirm_message_44",
                "type": "string",
                "minLength": 1,
                "enum": ["Delivery", "Return"]
              },
              "start": {
                "id": "b2c_log_bap_confirm_message_45",
                "type": "object",
                "properties": {
                  "location": {
                    "id": "b2c_log_bap_confirm_message_46",
                    "type": "object",
                    "properties": {
                      "gps": {
                        "id": "b2c_log_bap_confirm_message_47",
                        "type": "string",
                        "minLength": 1,
                        "pattern": "^-?\\d{1,3}\\.\\d{6}, ?-?\\d{1,3}\\.\\d{6}$",
                        "errorMessage": "gps coordinates must have 6 digits after decimal"
                      },
                      "address": {
                        "id": "b2c_log_bap_confirm_message_48",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "b2c_log_bap_confirm_message_49",
                            "type": "string",
                            "minLength": 1
                          },
                          "building": {
                            "id": "b2c_log_bap_confirm_message_50",
                            "type": "string",
                            "minLength": 1
                          },
                          "locality": {
                            "id": "b2c_log_bap_confirm_message_51",
                            "type": "string",
                            "minLength": 1
                          },
                          "city": {
                            "id": "b2c_log_bap_confirm_message_52",
                            "type": "string",
                            "minLength": 1
                          },
                          "state": {
                            "id": "b2c_log_bap_confirm_message_53",
                            "type": "string",
                            "minLength": 1
                          },
                          "country": {
                            "id": "b2c_log_bap_confirm_message_54",
                            "type": "string",
                            "minLength": 1
                          },
                          "area_code": {
                            "id": "b2c_log_bap_confirm_message_55",
                            "type": "string",
                            "minLength": 1,
                            "pattern": "^\\d{6}$",
                            "errorMessage": "area_code should be in proper format"
                          }
                        }
                      }
                    }
                  },
                  "contact": {
                    "id": "b2c_log_bap_confirm_message_56",
                    "type": "object",
                    "properties": {
                      "phone": {
                        "id": "b2c_log_bap_confirm_message_57",
                        "type": "string",
                        "minLength": 1,
                        "compliance": "phone"
                      },
                      "email": {
                        "id": "b2c_log_bap_confirm_message_58",
                        "type": "string",
                        "minLength": 1,
                        "compliance": "email"
                      }
                    }
                  },
                  "instructions": {
                    "id": "b2c_log_bap_confirm_message_59",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "b2c_log_bap_confirm_message_60",
                        "type": "string",
                        "minLength": 1
                      },
                      "short_desc": {
                        "id": "b2c_log_bap_confirm_message_61",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "person": {
                    "id": "b2c_log_bap_confirm_message_62",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "b2c_log_bap_confirm_message_63",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "time": {
                    "id": "b2c_log_bap_confirm_message_64",
                    "type": "object",
                    "properties": {
                      "duration": {
                        "id": "b2c_log_bap_confirm_message_65",
                        "type": "string",
                        "minLength": 1,
                        "format": "duration",
                        "errorMessage": "Duration must be RFC3339 duration."
                      }
                    }
                  }
                }
              },
              "end": {
                "id": "b2c_log_bap_confirm_message_66",
                "type": "object",
                "properties": {
                  "location": {
                    "id": "b2c_log_bap_confirm_message_67",
                    "type": "object",
                    "properties": {
                      "gps": {
                        "id": "b2c_log_bap_confirm_message_68",
                        "type": "string",
                        "minLength": 1,
                        "pattern": "^-?\\d{1,3}\\.\\d{6}, ?-?\\d{1,3}\\.\\d{6}$",
                        "errorMessage": "gps coordinates must have 6 digits after decimal"
                      },
                      "address": {
                        "id": "b2c_log_bap_confirm_message_69",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "b2c_log_bap_confirm_message_70",
                            "type": "string",
                            "minLength": 1
                          },
                          "building": {
                            "id": "b2c_log_bap_confirm_message_71",
                            "type": "string",
                            "minLength": 1
                          },
                          "locality": {
                            "id": "b2c_log_bap_confirm_message_72",
                            "type": "string",
                            "minLength": 1
                          },
                          "city": {
                            "id": "b2c_log_bap_confirm_message_73",
                            "type": "string",
                            "minLength": 1
                          },
                          "state": {
                            "id": "b2c_log_bap_confirm_message_74",
                            "type": "string",
                            "minLength": 1
                          },
                          "country": {
                            "id": "b2c_log_bap_confirm_message_75",
                            "type": "string",
                            "minLength": 1
                          },
                          "area_code": {
                            "id": "b2c_log_bap_confirm_message_76",
                            "type": "string",
                            "minLength": 1,
                            "pattern": "^\\d{6}$",
                            "errorMessage": "area_code should be in proper format"
                          }
                        }
                      }
                    }
                  },
                  "contact": {
                    "id": "b2c_log_bap_confirm_message_77",
                    "type": "object",
                    "properties": {
                      "phone": {
                        "id": "b2c_log_bap_confirm_message_78",
                        "type": "string",
                        "minLength": 1,
                        "compliance": "phone"
                      },
                      "email": {
                        "id": "b2c_log_bap_confirm_message_79",
                        "type": "string",
                        "minLength": 1,
                        "compliance": "email"
                      }
                    }
                  },
                  "instructions": {
                    "id": "b2c_log_bap_confirm_message_80",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "b2c_log_bap_confirm_message_81",
                        "type": "string",
                        "minLength": 1
                      },
                      "short_desc": {
                        "id": "b2c_log_bap_confirm_message_82",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "person": {
                    "id": "b2c_log_bap_confirm_message_83",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "b2c_log_bap_confirm_message_84",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              },
              "tags": {
                "id": "b2c_log_bap_confirm_message_85",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "b2c_log_bap_confirm_message_86",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "b2c_log_bap_confirm_message_87",
                      "type": "string",
                      "minLength": 1
                    },
                    "list": {
                      "id": "b2c_log_bap_confirm_message_88",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "b2c_log_bap_confirm_message_89",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "b2c_log_bap_confirm_message_90",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "b2c_log_bap_confirm_message_91",
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
        "payment": {
          "id": "b2c_log_bap_confirm_message_92",
          "type": "object",
          "properties": {
            "type": {
              "id": "b2c_log_bap_confirm_message_93",
              "type": "string",
              "minLength": 1,
              "enum": ["ON-ORDER", "ON-FULFILLMENT", "POST-FULFILLMENT"]
            },
            "collected_by": {
              "id": "b2c_log_bap_confirm_message_94",
              "type": "string",
              "minLength": 1,
              "enum": ["BAP", "BPP"]
            }
          }
        },
        "@ondc/org/linked_order": {
          "id": "b2c_log_bap_confirm_message_95",
          "type": "object",
          "properties": {
            "items": {
              "id": "b2c_log_bap_confirm_message_96",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "b2c_log_bap_confirm_message_97",
                "type": "object",
                "properties": {
                  "category_id": {
                    "id": "b2c_log_bap_confirm_message_98",
                    "type": "string",
                    "minLength": 1
                  },
                  "descriptor": {
                    "id": "b2c_log_bap_confirm_message_99",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "b2c_log_bap_confirm_message_100",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "quantity": {
                    "id": "b2c_log_bap_confirm_message_101",
                    "type": "object",
                    "properties": {
                      "count": {
                        "id": "b2c_log_bap_confirm_message_102",
                        "type": "number"
                      },
                      "measure": {
                        "id": "b2c_log_bap_confirm_message_103",
                        "type": "object",
                        "properties": {
                          "unit": {
                            "id": "b2c_log_bap_confirm_message_104",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "b2c_log_bap_confirm_message_105",
                            "type": "number"
                          }
                        }
                      }
                    }
                  },
                  "price": {
                    "id": "b2c_log_bap_confirm_message_106",
                    "type": "object",
                    "properties": {
                      "currency": {
                        "id": "b2c_log_bap_confirm_message_107",
                        "type": "string",
                        "minLength": 1
                      },
                      "value": {
                        "id": "b2c_log_bap_confirm_message_108",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "provider": {
              "id": "b2c_log_bap_confirm_message_109",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "b2c_log_bap_confirm_message_110",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "b2c_log_bap_confirm_message_111",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "address": {
                  "id": "b2c_log_bap_confirm_message_112",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "b2c_log_bap_confirm_message_113",
                      "type": "string",
                      "minLength": 1
                    },
                    "building": {
                      "id": "b2c_log_bap_confirm_message_114",
                      "type": "string",
                      "minLength": 1
                    },
                    "locality": {
                      "id": "b2c_log_bap_confirm_message_115",
                      "type": "string",
                      "minLength": 1
                    },
                    "city": {
                      "id": "b2c_log_bap_confirm_message_116",
                      "type": "string",
                      "minLength": 1
                    },
                    "state": {
                      "id": "b2c_log_bap_confirm_message_117",
                      "type": "string",
                      "minLength": 1
                    },
                    "country": {
                      "id": "b2c_log_bap_confirm_message_118",
                      "type": "string",
                      "minLength": 1
                    },
                    "area_code": {
                      "id": "b2c_log_bap_confirm_message_119",
                      "type": "string",
                      "minLength": 1,
                      "pattern": "^\\d{6}$",
                      "errorMessage": "area_code should be in proper format"
                    }
                  }
                }
              }
            },
            "order": {
              "id": "b2c_log_bap_confirm_message_120",
              "type": "object",
              "properties": {
                "id": {
                  "id": "b2c_log_bap_confirm_message_121",
                  "type": "string",
                  "minLength": 1
                },
                "weight": {
                  "id": "b2c_log_bap_confirm_message_122",
                  "type": "object",
                  "properties": {
                    "unit": {
                      "id": "b2c_log_bap_confirm_message_123",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "b2c_log_bap_confirm_message_124",
                      "type": "number"
                    }
                  }
                },
                "dimensions": {
                  "id": "b2c_log_bap_confirm_message_125",
                  "type": "object",
                  "properties": {
                    "length": {
                      "id": "b2c_log_bap_confirm_message_126",
                      "type": "object",
                      "properties": {
                        "unit": {
                          "id": "b2c_log_bap_confirm_message_127",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                          "id": "b2c_log_bap_confirm_message_128",
                          "type": "number"
                        }
                      }
                    },
                    "breadth": {
                      "id": "b2c_log_bap_confirm_message_129",
                      "type": "object",
                      "properties": {
                        "unit": {
                          "id": "b2c_log_bap_confirm_message_130",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                          "id": "b2c_log_bap_confirm_message_131",
                          "type": "number"
                        }
                      }
                    },
                    "height": {
                      "id": "b2c_log_bap_confirm_message_132",
                      "type": "object",
                      "properties": {
                        "unit": {
                          "id": "b2c_log_bap_confirm_message_133",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                          "id": "b2c_log_bap_confirm_message_134",
                          "type": "number"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "created_at": {
          "id": "b2c_log_bap_confirm_message_135",
          "type": "string",
          "minLength": 1,
          "format": "rfc3339-date-time",
          "errorMessage": "Time must be RFC3339 UTC timestamp format."
        },
        "updated_at": {
          "id": "b2c_log_bap_confirm_message_136",
          "type": "string",
          "minLength": 1,
          "format": "rfc3339-date-time",
          "errorMessage": "Time must be RFC3339 UTC timestamp format."
        }
      }
    }
  },
  "required": ["order"]
}