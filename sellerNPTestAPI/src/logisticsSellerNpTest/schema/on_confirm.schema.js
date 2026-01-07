module.exports = {
  "type": "object",
  "properties": {
    "order": {
      "id": "b2c_log_bap_on_confirm_message_01",
      "type": "object",
      "properties": {
        "id": {
          "id": "b2c_log_bap_on_confirm_message_02",
          "type": "string",
          "minLength": 1
        },
        "state": {
          "id": "b2c_log_bap_on_confirm_message_03",
          "type": "string",
          "minLength": 1,
          "const": "state"
        },
        "provider": {
          "id": "b2c_log_bap_on_confirm_message_04",
          "type": "object",
          "properties": {
            "id": {
              "id": "b2c_log_bap_on_confirm_message_05",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "items": {
          "id": "b2c_log_bap_on_confirm_message_06",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "b2c_log_bap_on_confirm_message_07",
            "type": "object",
            "properties": {
              "id": {
                "id": "b2c_log_bap_on_confirm_message_08",
                "type": "string",
                "minLength": 1
              },
              "category_id": {
                "id": "b2c_log_bap_on_confirm_message_09",
                "type": "string",
                "minLength": 1
              },
              "fulfillment_id": {
                "id": "b2c_log_bap_on_confirm_message_10",
                "type": "string",
                "minLength": 1
              },
              "descriptor": {
                "id": "b2c_log_bap_on_confirm_message_11",
                "type": "object",
                "properties": {
                  "code": {
                    "id": "b2c_log_bap_on_confirm_message_12",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "time": {
                "id": "b2c_log_bap_on_confirm_message_16",
                "type": "object",
                "properties": {
                  "label": {
                    "id": "b2c_log_bap_on_confirm_message_17",
                    "type": "string",
                    "minLength": 1
                  },
                  "duration": {
                    "id": "b2c_log_bap_on_confirm_message_18",
                    "type": "string",
                    "minLength": 1
                  },
                  "timestamp": {
                    "id": "b2c_log_bap_on_confirm_message_19",
                    "type": "string",
                    "minLength": 1
                  }
                }
              }
            }
          }
        },
        "billing": {
          "id": "b2c_log_bap_on_confirm_message_20",
          "type": "object",
          "properties": {
            "name": {
              "id": "b2c_log_bap_on_confirm_message_21",
              "type": "string",
              "minLength": 1
            },
            "address": {
              "id": "b2c_log_bap_on_confirm_message_22",
              "type": "object",
              "properties": {
                "name": {
                  "id": "b2c_log_bap_on_confirm_message_23",
                  "type": "string",
                  "minLength": 1
                },
                "building": {
                  "id": "b2c_log_bap_on_confirm_message_24",
                  "type": "string",
                  "minLength": 1
                },
                "locality": {
                  "id": "b2c_log_bap_on_confirm_message_25",
                  "type": "string",
                  "minLength": 1
                },
                "city": {
                  "id": "b2c_log_bap_on_confirm_message_26",
                  "type": "string",
                  "minLength": 1
                },
                "state": {
                  "id": "b2c_log_bap_on_confirm_message_27",
                  "type": "string",
                  "minLength": 1
                },
                "country": {
                  "id": "b2c_log_bap_on_confirm_message_28",
                  "type": "string",
                  "minLength": 1
                },
                "area_code": {
                  "id": "b2c_log_bap_on_confirm_message_29",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "tax_number": {
              "id": "b2c_log_bap_on_confirm_message_30",
              "type": "string",
              "minLength": 1
            },
            "phone": {
              "id": "b2c_log_bap_on_confirm_message_31",
              "type": "string",
              "minLength": 1
            },
            "email": {
              "id": "b2c_log_bap_on_confirm_message_32",
              "type": "string",
              "minLength": 1
            },
            "created_at": {
              "id": "b2c_log_bap_on_confirm_message_33",
              "type": "string",
              "minLength": 1
            },
            "updated_at": {
              "id": "b2c_log_bap_on_confirm_message_34",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "fulfillments": {
          "id": "b2c_log_bap_on_confirm_message_35",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "b2c_log_bap_on_confirm_message_36",
            "type": "object",
            "properties": {
              "id": {
                "id": "b2c_log_bap_on_confirm_message_37",
                "type": "string",
                "minLength": 1
              },
              "type": {
                "id": "b2c_log_bap_on_confirm_message_38",
                "type": "string",
                "minLength": 1
              },
              "state": {
                "id": "b2c_log_bap_on_confirm_message_39",
                "type": "object",
                "properties": {
                  "descriptor": {
                    "id": "b2c_log_bap_on_confirm_message_40",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "b2c_log_bap_on_confirm_message_41",
                        "type": "string",
                        "enum": ["Pending", "Searching-for-Agent", "Agent-assigned", "At-pickup", "Order-picked-up", "Out-for-delivery", "At-delivery", "Order-delivered", "Cancelled"],
                        "minLength": 1
                      }
                    }
                  }
                }
              },
              "start": {
                "id": "b2c_log_bap_on_confirm_message_43",
                "type": "object",
                "properties": {
                  "person": {
                    "id": "b2c_log_bap_on_confirm_message_44",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "b2c_log_bap_on_confirm_message_45",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "location": {
                    "id": "b2c_log_bap_on_confirm_message_46",
                    "type": "object",
                    "properties": {
                      "gps": {
                        "id": "b2c_log_bap_on_confirm_message_47",
                        "type": "string",
                        "minLength": 1
                      },
                      "address": {
                        "id": "b2c_log_bap_on_confirm_message_48",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "b2c_log_bap_on_confirm_message_49",
                            "type": "string",
                            "minLength": 1
                          },
                          "building": {
                            "id": "b2c_log_bap_on_confirm_message_50",
                            "type": "string",
                            "minLength": 1
                          },
                          "locality": {
                            "id": "b2c_log_bap_on_confirm_message_51",
                            "type": "string",
                            "minLength": 1
                          },
                          "city": {
                            "id": "b2c_log_bap_on_confirm_message_52",
                            "type": "string",
                            "minLength": 1
                          },
                          "state": {
                            "id": "b2c_log_bap_on_confirm_message_53",
                            "type": "string",
                            "minLength": 1
                          },
                          "country": {
                            "id": "b2c_log_bap_on_confirm_message_54",
                            "type": "string",
                            "minLength": 1
                          },
                          "area_code": {
                            "id": "b2c_log_bap_on_confirm_message_55",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "contact": {
                    "id": "b2c_log_bap_on_confirm_message_56",
                    "type": "object",
                    "properties": {
                      "phone": {
                        "id": "b2c_log_bap_on_confirm_message_57",
                        "type": "string",
                        "minLength": 1
                      },
                      "email": {
                        "id": "b2c_log_bap_on_confirm_message_58",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "time": {
                    "id": "b2c_log_bap_on_confirm_message_59",
                    "type": "object",
                    "properties": {
                      "duration": {
                        "id": "b2c_log_bap_on_confirm_message_60",
                        "type": "string",
                        "minLength": 1
                      },
                      "range": {
                        "id": "b2c_log_bap_on_confirm_message_61",
                        "type": "object",
                        "properties": {
                          "start": {
                            "id": "b2c_log_bap_on_confirm_message_62",
                            "type": "string",
                            "minLength": 1
                          },
                          "end": {
                            "id": "b2c_log_bap_on_confirm_message_63",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "instructions": {
                    "id": "b2c_log_bap_on_confirm_message_64",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "b2c_log_bap_on_confirm_message_65",
                        "type": "string",
                        "minLength": 1
                      },
                      "short_desc": {
                        "id": "b2c_log_bap_on_confirm_message_66",
                        "type": "string",
                        "minLength": 1,
                        "maxLength": 6
                      },
                      "long_desc": {
                        "type": "string",
                        "id": "b2c_log_bap_on_confirm_message_607",
                        "minLength": 1,
                        "optional": true,
                      },
                      // "images": {
                      //   "type": "array",
                      //   "minItems": 1,
                      //   "element": {
                      //     "type": "string",
                      //     "minLength": 1
                      //   }
                      // },
                      "additional_desc": {
                        "type": "object",
                        "id": "b2c_log_bap_on_confirm_message_608",
                        "optional": true,
                        "properties": {
                          "content_type": {
                            "type": "string",
                            "id": "b2c_log_bap_on_confirm_message_609",
                            "minLength": 1,
                            "optional": true,
                          },
                          "url": {
                            "type": "string",
                            "id": "b2c_log_bap_on_confirm_message_610",
                            "minLength": 1,
                            "optional": true,
                          }
                        }
                      }

                    }
                  }
                }
              },
              "end": {
                "id": "b2c_log_bap_on_confirm_message_67",
                "type": "object",
                "properties": {
                  "person": {
                    "id": "b2c_log_bap_on_confirm_message_68",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "b2c_log_bap_on_confirm_message_69",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "location": {
                    "id": "b2c_log_bap_on_confirm_message_70",
                    "type": "object",
                    "properties": {
                      "gps": {
                        "id": "b2c_log_bap_on_confirm_message_71",
                        "type": "string",
                        "minLength": 1
                      },
                      "address": {
                        "id": "b2c_log_bap_on_confirm_message_72",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "b2c_log_bap_on_confirm_message_73",
                            "type": "string",
                            "minLength": 1
                          },
                          "building": {
                            "id": "b2c_log_bap_on_confirm_message_74",
                            "type": "string",
                            "minLength": 1
                          },
                          "locality": {
                            "id": "b2c_log_bap_on_confirm_message_75",
                            "type": "string",
                            "minLength": 1
                          },
                          "city": {
                            "id": "b2c_log_bap_on_confirm_message_76",
                            "type": "string",
                            "minLength": 1
                          },
                          "state": {
                            "id": "b2c_log_bap_on_confirm_message_77",
                            "type": "string",
                            "minLength": 1
                          },
                          "country": {
                            "id": "b2c_log_bap_on_confirm_message_78",
                            "type": "string",
                            "minLength": 1
                          },
                          "area_code": {
                            "id": "b2c_log_bap_on_confirm_message_79",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "contact": {
                    "id": "b2c_log_bap_on_confirm_message_80",
                    "type": "object",
                    "properties": {
                      "phone": {
                        "id": "b2c_log_bap_on_confirm_message_81",
                        "type": "string",
                        "minLength": 1
                      },
                      "email": {
                        "id": "b2c_log_bap_on_confirm_message_82",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "instructions": {
                    "id": "b2c_log_bap_on_confirm_message_83",
                    "type": "object",
                    "optional": true,
                    "properties": {
                      "code": {
                        "id": "b2c_log_bap_on_confirm_message_84",
                        "type": "string",
                        "optional": true,
                        "minLength": 1
                      },
                      "short_desc": {
                        "id": "b2c_log_bap_on_confirm_message_85",
                        "type": "string",
                        "optional": true,
                        "minLength": 1,
                        "maxLength": 6
                      }
                    }
                  }
                }
              },
              "tags": {
                "id": "b2c_log_bap_on_confirm_message_86",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "b2c_log_bap_on_confirm_message_87",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "b2c_log_bap_on_confirm_message_88",
                      "type": "string",
                      "minLength": 1
                    },
                    "list": {
                      "id": "b2c_log_bap_on_confirm_message_89",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "b2c_log_bap_on_confirm_message_90",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "b2c_log_bap_on_confirm_message_91",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "b2c_log_bap_on_confirm_message_92",
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
        "quote": {
          "id": "b2c_log_bap_on_confirm_message_93",
          "type": "object",
          "properties": {
            "price": {
              "id": "b2c_log_bap_on_confirm_message_94",
              "type": "object",
              "properties": {
                "currency": {
                  "id": "b2c_log_bap_on_confirm_message_95",
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "id": "b2c_log_bap_on_confirm_message_96",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "breakup": {
              "id": "b2c_log_bap_on_confirm_message_97",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "b2c_log_bap_on_confirm_message_98",
                "type": "object",
                "properties": {
                  "@ondc/org/item_id": {
                    "id": "b2c_log_bap_on_confirm_message_99",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/title_type": {
                    "id": "b2c_log_bap_on_confirm_message_100",
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "id": "b2c_log_bap_on_confirm_message_101",
                    "type": "object",
                    "properties": {
                      "currency": {
                        "id": "b2c_log_bap_on_confirm_message_102",
                        "type": "string",
                        "minLength": 1
                      },
                      "value": {
                        "id": "b2c_log_bap_on_confirm_message_103",
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
        "payment": {
          "id": "b2c_log_bap_on_confirm_message_104",
          "type": "object",
          "properties": {
            "type": {
              "id": "b2c_log_bap_on_confirm_message_105",
              "type": "string",
              "minLength": 1
            },
            "collected_by": {
              "id": "b2c_log_bap_on_confirm_message_106",
              "type": "string",
              "minLength": 1
            },
            // "@ondc/org/settlement_details": {
            //   "id": "b2c_log_bap_on_confirm_message_107",
            //   "type": "array",
            //   "minItems": 1,
            //   "element": {
            //     "id": "b2c_log_bap_on_confirm_message_108",
            //     "type": "object",
            //     "properties": {
            //       "settlement_counterparty": {
            //         "id": "b2c_log_bap_on_confirm_message_109",
            //         "type": "string",
            //         "minLength": 1
            //       },
            //       "settlement_type": {
            //         "id": "b2c_log_bap_on_confirm_message_110",
            //         "type": "string",
            //         "minLength": 1
            //       },
            //       "upi_address": {
            //         "id": "b2c_log_bap_on_confirm_message_111",
            //         "type": "string",
            //         "minLength": 1
            //       },
            //       "settlement_bank_account_no": {
            //         "id": "b2c_log_bap_on_confirm_message_112",
            //         "type": "string",
            //         "minLength": 1
            //       },
            //       "settlement_ifsc_code": {
            //         "id": "b2c_log_bap_on_confirm_message_113",
            //         "type": "string",
            //         "minLength": 1
            //       }
            //     }
            //   }
            // }
          }
        },
        "@ondc/org/linked_order": {
          "id": "b2c_log_bap_on_confirm_message_114",
          "type": "object",
          "properties": {
            "items": {
              "id": "b2c_log_bap_on_confirm_message_115",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "b2c_log_bap_on_confirm_message_116",
                "type": "object",
                "properties": {
                  "category_id": {
                    "id": "b2c_log_bap_on_confirm_message_117",
                    "type": "string",
                    "minLength": 1
                  },
                  "descriptor": {
                    "id": "b2c_log_bap_on_confirm_message_118",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "b2c_log_bap_on_confirm_message_119",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "quantity": {
                    "id": "b2c_log_bap_on_confirm_message_120",
                    "type": "object",
                    "properties": {
                      "count": {
                        "id": "b2c_log_bap_on_confirm_message_121",
                        "type": "number"
                      },
                      "measure": {
                        "id": "b2c_log_bap_on_confirm_message_122",
                        "type": "object",
                        "properties": {
                          "unit": {
                            "id": "b2c_log_bap_on_confirm_message_123",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "b2c_log_bap_on_confirm_message_124",
                            "type": "number"
                          }
                        }
                      }
                    }
                  },
                  "price": {
                    "id": "b2c_log_bap_on_confirm_message_125",
                    "type": "object",
                    "properties": {
                      "currency": {
                        "id": "b2c_log_bap_on_confirm_message_126",
                        "type": "string",
                        "minLength": 1
                      },
                      "value": {
                        "id": "b2c_log_bap_on_confirm_message_127",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "provider": {
              "id": "b2c_log_bap_on_confirm_message_128",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "b2c_log_bap_on_confirm_message_129",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "b2c_log_bap_on_confirm_message_130",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "address": {
                  "id": "b2c_log_bap_on_confirm_message_131",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "b2c_log_bap_on_confirm_message_132",
                      "type": "string",
                      "minLength": 1
                    },
                    "building": {
                      "id": "b2c_log_bap_on_confirm_message_133",
                      "type": "string",
                      "minLength": 1
                    },
                    "locality": {
                      "id": "b2c_log_bap_on_confirm_message_134",
                      "type": "string",
                      "minLength": 1
                    },
                    "city": {
                      "id": "b2c_log_bap_on_confirm_message_135",
                      "type": "string",
                      "minLength": 1
                    },
                    "state": {
                      "id": "b2c_log_bap_on_confirm_message_136",
                      "type": "string",
                      "minLength": 1
                    },
                    "area_code": {
                      "id": "b2c_log_bap_on_confirm_message_137",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                }
              }
            },
            "order": {
              "id": "b2c_log_bap_on_confirm_message_138",
              "type": "object",
              "properties": {
                "id": {
                  "id": "b2c_log_bap_on_confirm_message_139",
                  "type": "string",
                  "minLength": 1
                },
                "weight": {
                  "id": "b2c_log_bap_on_confirm_message_140",
                  "type": "object",
                  "properties": {
                    "unit": {
                      "id": "b2c_log_bap_on_confirm_message_141",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "b2c_log_bap_on_confirm_message_142",
                      "type": "number"
                    }
                  }
                },
                "dimensions": {
                  "id": "b2c_log_bap_on_confirm_message_143",
                  "type": "object",
                  "properties": {
                    "length": {
                      "id": "b2c_log_bap_on_confirm_message_144",
                      "type": "object",
                      "properties": {
                        "unit": {
                          "id": "b2c_log_bap_on_confirm_message_145",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                          "id": "b2c_log_bap_on_confirm_message_146",
                          "type": "number"
                        }
                      }
                    },
                    "breadth": {
                      "id": "b2c_log_bap_on_confirm_message_147",
                      "type": "object",
                      "properties": {
                        "unit": {
                          "id": "b2c_log_bap_on_confirm_message_148",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                          "id": "b2c_log_bap_on_confirm_message_149",
                          "type": "number"
                        }
                      }
                    },
                    "height": {
                      "id": "b2c_log_bap_on_confirm_message_150",
                      "type": "object",
                      "properties": {
                        "unit": {
                          "id": "b2c_log_bap_on_confirm_message_151",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                          "id": "b2c_log_bap_on_confirm_message_152",
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
          "id": "b2c_log_bap_on_confirm_message_153",
          "type": "string",
          "minLength": 1
        },
        "updated_at": {
          "id": "b2c_log_bap_on_confirm_message_154",
          "type": "string",
          "minLength": 1
        }
      }
    }
  },
  "required": ["order"]
}