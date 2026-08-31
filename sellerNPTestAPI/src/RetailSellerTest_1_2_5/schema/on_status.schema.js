module.exports = {
  "id": "retail_bpp_on_status_message_01",
  "type": "object",
  "properties": {
    "order": {
      "id": "retail_bpp_on_status_message_02",
      "type": "object",
      "properties": {
        "id": {
          "id": "retail_bpp_on_status_message_03",
          "type": "string",
          "minLength": 1
        },
        "state": {
          "id": "retail_bpp_on_status_message_04",
          "type": "string",
          "minLength": 1
        },
        "provider": {
          "id": "retail_bpp_on_status_message_05",
          "type": "object",
          "properties": {
            "id": {
              "id": "retail_bpp_on_status_message_06",
              "type": "string",
              "minLength": 1
            },
            "locations": {
              "id": "retail_bpp_on_status_message_07",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "retail_bpp_on_status_message_08",
                "type": "object",
                "properties": {
                  "id": {
                    "id": "retail_bpp_on_status_message_09",
                    "type": "string",
                    "minLength": 1
                  }
                }
              }
            }
          }
        },
        "items": {
          "id": "retail_bpp_on_status_message_10",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "retail_bpp_on_status_message_11",
            "type": "object",
            "properties": {
              "id": {
                "id": "retail_bpp_on_status_message_12",
                "type": "string",
                "minLength": 1
              },
              "fulfillment_id": {
                "id": "retail_bpp_on_status_message_13",
                "type": "string",
                "minLength": 1
              },
              "quantity": {
                "id": "retail_bpp_on_status_message_14",
                "type": "object",
                "properties": {
                  "count": {
                    "id": "retail_bpp_on_status_message_15",
                    "type": "number"
                  }
                }
              },
              "parent_item_id": {
                "id": "retail_bpp_on_status_message_16",
                "type": "string",
                "minLength": 1
              },
              "tags": {
                "id": "retail_bpp_on_status_message_17",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "retail_bpp_on_status_message_18",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "retail_bpp_on_status_message_19",
                      "type": "string",
                      "minLength": 1
                    },
                    "list": {
                      "id": "retail_bpp_on_status_message_20",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "retail_bpp_on_status_message_21",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "retail_bpp_on_status_message_22",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "retail_bpp_on_status_message_23",
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
        "billing": {
          "id": "retail_bpp_on_status_message_24",
          "type": "object",
          "properties": {
            "name": {
              "id": "retail_bpp_on_status_message_25",
              "type": "string",
              "minLength": 1
            },
            "address": {
              "id": "retail_bpp_on_status_message_26",
              "type": "object",
              "properties": {
                "name": {
                  "id": "retail_bpp_on_status_message_27",
                  "type": "string",
                  "minLength": 1
                },
                "building": {
                  "id": "retail_bpp_on_status_message_28",
                  "type": "string",
                  "minLength": 1
                },
                "locality": {
                  "id": "retail_bpp_on_status_message_29",
                  "type": "string",
                  "minLength": 1
                },
                "city": {
                  "id": "retail_bpp_on_status_message_30",
                  "type": "string",
                  "minLength": 1
                },
                "state": {
                  "id": "retail_bpp_on_status_message_31",
                  "type": "string",
                  "minLength": 1
                },
                "country": {
                  "id": "retail_bpp_on_status_message_32",
                  "type": "string",
                  "minLength": 1
                },
                "area_code": {
                  "id": "retail_bpp_on_status_message_33",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "email": {
              "id": "retail_bpp_on_status_message_34",
              "type": "string",
              "minLength": 1
            },
            "phone": {
              "id": "retail_bpp_on_status_message_35",
              "type": "string",
              "minLength": 1
            },
            "created_at": {
              "id": "retail_bpp_on_status_message_36",
              "type": "string",
              "minLength": 1
            },
            "updated_at": {
              "id": "retail_bpp_on_status_message_37",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "fulfillments": {
          "id": "retail_bpp_on_status_message_38",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "retail_bpp_on_status_message_39",
            "type": "object",
            "properties": {
              "id": {
                "id": "retail_bpp_on_status_message_40",
                "type": "string",
                "minLength": 1
              },
              "@ondc/org/provider_name": {
                "id": "retail_bpp_on_status_message_41",
                "type": "string",
                "minLength": 1
              },
              "type": {
                "id": "retail_bpp_on_status_message_42",
                "type": "string",
                "minLength": 1
              },
              "tracking": {
                "id": "retail_bpp_on_status_message_43",
                "type": "boolean"
              },
              "@ondc/org/TAT": {
                "id": "retail_bpp_on_status_message_44",
                "type": "string",
                "minLength": 1
              },
              "state": {
                "id": "retail_bpp_on_status_message_45",
                "type": "object",
                "properties": {
                  "descriptor": {
                    "id": "retail_bpp_on_status_message_46",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "retail_bpp_on_status_message_47",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              },
              "start": {
                "id": "retail_bpp_on_status_message_48",
                "type": "object",
                "properties": {
                  "location": {
                    "id": "retail_bpp_on_status_message_49",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "retail_bpp_on_status_message_50",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "retail_bpp_on_status_message_51",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "gps": {
                        "id": "retail_bpp_on_status_message_52",
                        "type": "string",
                        "minLength": 1
                      },
                      "address": {
                        "id": "retail_bpp_on_status_message_53",
                        "type": "object",
                        "properties": {
                          "locality": {
                            "id": "retail_bpp_on_status_message_54",
                            "type": "string",
                            "minLength": 1
                          },
                          "city": {
                            "id": "retail_bpp_on_status_message_55",
                            "type": "string",
                            "minLength": 1
                          },
                          "area_code": {
                            "id": "retail_bpp_on_status_message_56",
                            "type": "string",
                            "minLength": 1
                          },
                          "state": {
                            "id": "retail_bpp_on_status_message_57",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "time": {
                    "id": "retail_bpp_on_status_message_58",
                    "type": "object",
                    "properties": {
                      "timestamp": {
                        "id": "retail_bpp_on_status_message_59",
                        "type": "string",
                        "minLength": 1
                      },
                      "range": {
                        "id": "retail_bpp_on_status_message_158",
                        "type": "object",
                        "properties": {
                          "start": {
                            "id": "retail_bpp_on_status_message_159",
                            "type": "string",
                            "minLength": 1
                          },
                          "end": {
                            "id": "retail_bpp_on_status_message_160",
                            "type": "string",
                            "minLength": 1
                          },
                        }
                      },
                      "duration": {
                        "id": "retail_bpp_on_status_message_161",
                        "type": "string",
                        "minLength": 1
                      },
                    }
                  },
                  "person": {
                    "id": "retail_bpp_on_status_message_60",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "retail_bpp_on_status_message_162",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "contact": {
                    "id": "retail_bpp_on_status_message_60",
                    "type": "object",
                    "properties": {
                      "phone": {
                        "id": "retail_bpp_on_status_message_61",
                        "type": "string",
                        "minLength": 1
                      },
                      "email": {
                        "id": "retail_bpp_on_status_message_62",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                }
              },
              "end": {
                "id": "retail_bpp_on_status_message_63",
                "type": "object",
                "properties": {
                  "location": {
                    "id": "retail_bpp_on_status_message_64",
                    "type": "object",
                    "properties": {
                      "gps": {
                        "id": "retail_bpp_on_status_message_65",
                        "type": "string",
                        "minLength": 1
                      },
                      "address": {
                        "id": "retail_bpp_on_status_message_66",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "retail_bpp_on_status_message_67",
                            "type": "string",
                            "minLength": 1
                          },
                          "building": {
                            "id": "retail_bpp_on_status_message_68",
                            "type": "string",
                            "minLength": 1
                          },
                          "locality": {
                            "id": "retail_bpp_on_status_message_69",
                            "type": "string",
                            "minLength": 1
                          },
                          "city": {
                            "id": "retail_bpp_on_status_message_70",
                            "type": "string",
                            "minLength": 1
                          },
                          "state": {
                            "id": "retail_bpp_on_status_message_71",
                            "type": "string",
                            "minLength": 1
                          },
                          "country": {
                            "id": "retail_bpp_on_status_message_72",
                            "type": "string",
                            "minLength": 1
                          },
                          "area_code": {
                            "id": "retail_bpp_on_status_message_73",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "time": {
                    "id": "retail_bpp_on_status_message_74",
                    "type": "object",
                    "properties": {
                      "timestamp": {
                        "id": "retail_bpp_on_status_message_75",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "person": {
                    "id": "retail_bpp_on_status_message_76",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "retail_bpp_on_status_message_77",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "contact": {
                    "id": "retail_bpp_on_status_message_78",
                    "type": "object",
                    "properties": {
                      "phone": {
                        "id": "retail_bpp_on_status_message_79",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              },
              "vehicle": {
                "id": "retail_bpp_on_status_message_192",
                "type": "object",
                "properties": {
                  "registration": {
                    "id": "retail_bpp_on_status_message_193",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "agent": {
                "id": "retail_bpp_on_status_message_80",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "retail_bpp_on_status_message_81",
                    "type": "string",
                    "minLength": 1
                  },
                  "phone": {
                    "id": "retail_bpp_on_status_message_82",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "tags": {
                "id": "retail_bpp_on_status_message_83",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "retail_bpp_on_status_message_84",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "retail_bpp_on_status_message_85",
                      "type": "string",
                      "minLength": 1
                    },
                    "list": {
                      "id": "retail_bpp_on_status_message_86",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "retail_bpp_on_status_message_87",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "retail_bpp_on_status_message_88",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "retail_bpp_on_status_message_89",
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
                        "flowId": {
                          "const": [
                            "LOG10_7"
                          ]
                        }
                      }
                    },
                    "then": [
                      "id",
                      "@ondc/org/provider_name",
                      "type",
                      "tracking",
                      "@ondc/org/TAT",
                      "state",
                      "start",
                      "end",
                      "vehicle",
                      "agent",
                      "tags"
                    ]
                  },
                  // {
                  //   "if": {
                  //     "properties": {
                  //       "type": "params",
                  //       "domain": {
                  //         "const": [
                  //           "ONDC:RET11"
                  //         ]
                  //       }
                  //     }
                  //   },
                  //   "then": [
                  //     "id",
                  //     "quantity",
                  //     "fulfillment_id",
                  //     "parent_item_id",
                  //     "tags"
                  //   ]
                  // }
                ]
              }
            }
          }
        },
        "quote": {
          "id": "retail_bpp_on_status_message_90",
          "type": "object",
          "properties": {
            "price": {
              "id": "retail_bpp_on_status_message_91",
              "type": "object",
              "properties": {
                "currency": {
                  "id": "retail_bpp_on_status_message_92",
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "id": "retail_bpp_on_status_message_93",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "breakup": {
              "id": "retail_bpp_on_status_message_94",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "retail_bpp_on_status_message_95",
                "type": "object",
                "properties": {
                  "@ondc/org/item_id": {
                    "id": "retail_bpp_on_status_message_96",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/item_quantity": {
                    "id": "retail_bpp_on_status_message_97",
                    "type": "object",
                    "optional": true,
                    "properties": {
                      "count": {
                        "id": "retail_bpp_on_status_message_98",
                        "type": "number"
                      }
                    }
                  },
                  "title": {
                    "id": "retail_bpp_on_status_message_99",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/title_type": {
                    "id": "retail_bpp_on_status_message_100",
                    "type": "string",
                    "minLength": 1,
                    "passKeysToParams": ["@ondc/org/title_type"]
                  },
                  "price": {
                    "id": "retail_bpp_on_status_message_101",
                    "type": "object",
                    "properties": {
                      "currency": {
                        "id": "retail_bpp_on_status_message_102",
                        "type": "string",
                        "minLength": 1
                      },
                      "value": {
                        "id": "retail_bpp_on_status_message_103",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "item": {
                    "id": "retail_bpp_on_status_message_104",
                    "type": "object",
                    "optional": true,
                    "properties": {
                      "parent_item_id": {
                        "id": "retail_bpp_on_status_message_105",
                        "type": "string",
                        "optional": true
                      },
                      "price": {
                        "id": "retail_bpp_on_status_message_106",
                        "type": "object",
                        "optional": true,
                        "properties": {
                          "currency": {
                            "id": "retail_bpp_on_status_message_107",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "retail_bpp_on_status_message_108",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "tags": {
                        "id": "retail_bpp_on_status_message_109",
                        "type": "array",
                        "optional": true,
                        "element": {
                          "id": "retail_bpp_on_status_message_110",
                          "type": "object",
                          "properties": {
                            "code": {
                              "id": "retail_bpp_on_status_message_111",
                              "type": "string",
                              "enum": [
                                "type",
                                "parent",
                                "child",
                                "origin",
                                "veg_nonveg",
                                "custom_group",
                                "quote"
                              ]
                            },
                            "list": {
                              "id": "retail_bpp_on_status_message_112",
                              "type": "array",
                              "minItems": 1,
                              "element": {
                                "allOf": [
                                  {
                                    "if": {
                                      "properties": {
                                        "code": {
                                          "const": "type"
                                        }
                                      }
                                    },
                                    "then": {
                                      "type": "object",
                                      "properties": {
                                        "code": {
                                          "id": "retail_bpp_on_status_message_113",
                                          "type": "string",
                                          "enum": ["type"]
                                        },
                                        "value": {
                                          "id": "retail_bpp_on_status_message_114",
                                          "type": "string",
                                          "enum": ["item", "customization", "fulfillment"]
                                        }
                                      }
                                    }
                                  },
                                  {
                                    "if": {
                                      "properties": {
                                        "code": {
                                          "const": "id"
                                        }
                                      }
                                    },
                                    "then": {
                                      "type": "object",
                                      "properties": {
                                        "code": {
                                          "id": "retail_bpp_on_status_message_231",
                                          "type": "string",
                                          "enum": ["id"]
                                        },
                                        "value": {
                                          "id": "retail_bpp_on_status_message_232",
                                          "type": "string"
                                        }
                                      }
                                    }
                                  },
                                  {
                                    "if": {
                                      "properties": {
                                        "code": {
                                          "const": "country"
                                        }
                                      }
                                    },
                                    "then": {
                                      "type": "object",
                                      "properties": {
                                        "code": {
                                          "id": "retail_bpp_on_status_message_233",
                                          "type": "string",
                                          "enum": ["country"]
                                        },
                                        "value": {
                                          "id": "retail_bpp_on_status_message_234",
                                          "type": "string",
                                          "pattern": "^[A-Z]{3}$", "minLength": 1, "errorMessage": "Country must be in ISO 3166-1 format (three-letter country code)"
                                        }
                                      }
                                    }
                                  },
                                  {
                                    "if": {
                                      "properties": {
                                        "code": {
                                          "const": "veg"
                                        }
                                      }
                                    },
                                    "then": {
                                      "type": "object",
                                      "properties": {
                                        "code": {
                                          "id": "retail_bpp_on_status_message_235",
                                          "type": "string",
                                          "enum": ["veg"]
                                        },
                                        "value": {
                                          "id": "retail_bpp_on_status_message_236",
                                          "type": "string",
                                          "enum": ["yes", "no"]
                                        }
                                      }
                                    }
                                  },
                                  {
                                    "if": {
                                      "properties": {
                                        "code": {
                                          "const": "default"
                                        }
                                      }
                                    },
                                    "then": {
                                      "type": "object",
                                      "properties": {
                                        "code": {
                                          "id": "retail_bpp_on_status_message_237",
                                          "type": "string",
                                          "enum": ["default"]
                                        },
                                        "value": {
                                          "id": "retail_bpp_on_status_message_238",
                                          "type": "string",
                                          "enum": ["yes", "no"]
                                        }
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          },
                          "required": [
                            "code",
                            "list"
                          ],
                          "additionalProperties": false
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
                                "@ondc/org/title_type": {
                                  "const": "item"
                                },
                                "domain": {
                                  "const": [
                                    "ONDC:RET11"
                                  ]
                                }
                              }
                            },
                            "then": [
                              "parent_item_id",
                              "price",
                              "tags"
                            ]
                          },
                          {
                            "if": {
                              "properties": {
                                "type": "params",
                                "@ondc/org/title_type": {
                                  "const": "item"
                                },
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
                              "price"
                            ]
                          }
                        ]
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
                          "price"
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "ttl": {
              "id": "retail_bpp_on_status_message_116",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "payment": {
          "id": "retail_bpp_on_status_message_117",
          "type": "object",
          "properties": {
            "uri": {
              "id": "retail_bpp_on_status_message_118",
              "type": "string",
              "minLength": 1
            },
            "tl_method": {
              "id": "retail_bpp_on_status_message_119",
              "type": "string",
              "minLength": 1
            },
            "params": {
              "id": "retail_bpp_on_status_message_120",
              "type": "object",
              "properties": {
                "currency": {
                  "id": "retail_bpp_on_status_message_121",
                  "type": "string",
                  "minLength": 1
                },
                "transaction_id": {
                  "id": "retail_bpp_on_status_message_122",
                  "type": "string",
                  "minLength": 1
                },
                "amount": {
                  "id": "retail_bpp_on_status_message_123",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "status": {
              "id": "retail_bpp_on_status_message_124",
              "type": "string",
              "minLength": 1
            },
            "type": {
              "id": "retail_bpp_on_status_message_125",
              "type": "string",
              "minLength": 1
            },
            "collected_by": {
              "id": "retail_bpp_on_status_message_126",
              "type": "string",
              "minLength": 1
            },
            "@ondc/org/buyer_app_finder_fee_type": {
              "id": "retail_bpp_on_status_message_127",
              "type": "string",
              "minLength": 1
            },
            "@ondc/org/buyer_app_finder_fee_amount": {
              "id": "retail_bpp_on_status_message_128",
              "type": "string",
              "minLength": 1
            },
            "@ondc/org/settlement_basis": {
              "id": "retail_bpp_on_status_message_129",
              "type": "string",
              "minLength": 1
            },
            "@ondc/org/settlement_window": {
              "id": "retail_bpp_on_status_message_130",
              "type": "string",
              "minLength": 1
            },
            "@ondc/org/withholding_amount": {
              "id": "retail_bpp_on_status_message_131",
              "type": "string",
              "minLength": 1
            },
            "@ondc/org/settlement_details": {
              "id": "retail_bpp_on_status_message_132",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "retail_bpp_on_status_message_133",
                "type": "object",
                "properties": {
                  "settlement_counterparty": {
                    "id": "retail_bpp_on_status_message_134",
                    "type": "string",
                    "minLength": 1
                  },
                  "settlement_phase": {
                    "id": "retail_bpp_on_status_message_135",
                    "type": "string",
                    "minLength": 1
                  },
                  "beneficiary_name": {
                    "id": "retail_bpp_on_status_message_136",
                    "type": "string",
                    "minLength": 1,
                    "optional": true
                  },
                  "settlement_reference": {
                    "id": "retail_bpp_on_status_message_137",
                    "type": "string",
                    "minLength": 1,
                    "optional": true
                  },
                  "settlement_status": {
                    "id": "retail_bpp_on_status_message_138",
                    "type": "string",
                    "minLength": 1,
                    "optional": true
                  },
                  "settlement_timestamp": {
                    "id": "retail_bpp_on_status_message_139",
                    "type": "string",
                    "minLength": 1,
                    "optional": true
                  },
                  "settlement_type": {
                    "id": "retail_bpp_on_status_message_140",
                    "type": "string",
                    "minLength": 1,
                    "enum": ["upi", "neft", "wallet"]
                  },
                  "upi_address": {
                    "id": "retail_bpp_on_status_message_141",
                    "type": "string",
                    "minLength": 1,
                    "optional": true
                  },
                  "settlement_bank_account_no": {
                    "id": "retail_bpp_on_status_message_142",
                    "type": "string",
                    "minLength": 1,
                    "optional": true
                  },
                  "settlement_ifsc_code": {
                    "id": "retail_bpp_on_status_message_143",
                    "type": "string",
                    "minLength": 1,
                    "optional": true
                  },
                  "bank_name": {
                    "id": "retail_bpp_on_status_message_144",
                    "type": "string",
                    "minLength": 1,
                    "optional": true
                  },
                  "branch_name": {
                    "id": "retail_bpp_on_status_message_145",
                    "type": "string",
                    "minLength": 1,
                    "optional": true
                  },
                  "settlement_amount": {
                    "id": "retail_bpp_on_status_message_230",
                    "type": "string",
                    "minLength": 1,
                    "optional": true
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
                              "const": [
                                "upi"
                              ]
                            }
                          }
                        },
                        "then": [
                          "settlement_counterparty",
                          "settlement_phase",
                          "settlement_type",
                          "beneficiary_name",
                          "upi_address"
                        ]
                      },
                      {
                        "if": {
                          "properties": {
                            "settlement_type": {
                              "const": [
                                "neft"
                              ]
                            }
                          }
                        },
                        "then": [
                          "settlement_counterparty",
                          "settlement_phase",
                          "settlement_type",
                          "branch_name",
                          "bank_name",
                          "beneficiary_name",
                          "settlement_ifsc_code",
                          "settlement_bank_account_no"
                        ]
                      },
                      {
                        "if": {
                          "properties": {
                            "settlement_type": {
                              "const": [
                                "wallet"
                              ]
                            }
                          }
                        },
                        "then": [
                          "settlement_timestamp",
                          "settlement_counterparty",
                          "settlement_phase",
                          "settlement_type",
                          "settlement_amount"
                        ]
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        "documents": {
          "id": "retail_bpp_on_status_message_146",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "retail_bpp_on_status_message_147",
            "type": "object",
            "properties": {
              "url": {
                "id": "retail_bpp_on_status_message_148",
                "type": "string",
                "minLength": 1
              },
              "label": {
                "id": "retail_bpp_on_status_message_149",
                "type": "string",
                "minLength": 1
              }
            }
          }
        },
        "created_at": {
          "id": "retail_bpp_on_status_message_150",
          "type": "string",
          "minLength": 1
        },
        "updated_at": {
          "id": "retail_bpp_on_status_message_151",
          "type": "string",
          "minLength": 1
        }
      }
    }
  }
}

