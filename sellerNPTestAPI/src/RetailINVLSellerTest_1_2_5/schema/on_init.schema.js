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
            "type": {
              "id": "retail_bpp_on_init_message_22",
              "type": "string",
              "minLength": 1
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
                                                        "ONDC:RET1D",
                                                        "ONDC:RETINVL"
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
                              "area_code": {
                                "id": "retail_bpp_on_init_message_52",
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
            "payments": {
              "id": "retail_bpp_on_init_message_87",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "retail_bpp_on_init_message_88",
                "type": "object",
                "properties": {
                  "id": {
                    "id": "retail_bpp_on_init_message_89",
                    "type": "string",
                    "minLength": 1
                  },
                  "type": {
                    "id": "retail_bpp_on_init_message_90",
                    "type": "string",
                    "minLength": 1,
                    "enum": [
                      "ON-ORDER",
                      "ON-FULFILLMENT",
                      "PART-PAYMENT"
                    ]
                  },
                  "collected_by": {
                    "id": "retail_bpp_on_init_message_91",
                    "type": "string",
                    "minLength": 1,
                    "enum": [
                      "BAP",
                      "BPP"
                    ]
                  },
                  "params": {
                    "id": "retail_bpp_on_init_message_92",
                    "type": "object",
                    "properties": {
                      "amount": {
                        "id": "retail_bpp_on_init_message_93",
                        "type": "string",
                        "minLength": 1
                      },
                      "currency": {
                        "id": "retail_bpp_on_init_message_94",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "status": {
                    "id": "retail_bpp_on_init_message_95",
                    "type": "string",
                    "minLength": 1,
                    "enum": [
                      "PAID",
                      "NOT-PAID"
                    ]
                  },
                  "tags": {
                    "id": "retail_bpp_on_init_message_96",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "retail_bpp_on_init_message_97",
                      "type": "object",
                      "properties": {
                        "descriptor": {
                          "id": "retail_bpp_on_init_message_98",
                          "type": "object",
                          "properties": {
                            "code": {
                              "id": "retail_bpp_on_init_message_99",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        },
                        "list": {
                          "id": "retail_bpp_on_init_message_100",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "retail_bpp_on_init_message_101",
                            "type": "object",
                            "properties": {
                              "descriptor": {
                                "id": "retail_bpp_on_init_message_102",
                                "type": "object",
                                "properties": {
                                  "code": {
                                    "id": "retail_bpp_on_init_message_103",
                                    "type": "string",
                                    "minLength": 1
                                  }
                                }
                              },
                              "value": {
                                "id": "retail_bpp_on_init_message_104",
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
                                  "descriptor": {
                                    "code": {
                                      "const": "LINKED-PAYMENTS"
                                    }
                                  }
                                }
                              },
                              "then": [
                                "descriptor",
                                "list"
                              ]
                            },
                            {
                              "if": {
                                "properties": {
                                  "descriptor": {
                                    "code": {
                                      "const": [
                                        "ADV-DEPOSIT",
                                        "FINAL-PAYMENT"
                                      ]
                                    }
                                  }
                                }
                              },
                              "then": [
                                "descriptor"
                              ]
                            }
                          ]
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
                              "const": "PART-PAYMENT"
                            }
                          }
                        },
                        "then": [
                          "id",
                          "type",
                          "tags"
                        ]
                      },
                      {
                        "if": {
                          "properties": {
                            "type": {
                              "const": [
                                "ON-ORDER",
                                "ON-FULFILLMENT"
                              ]
                            }
                          }
                        },
                        "then": [
                          "id",
                          "type",
                          "collected_by",
                          "params",
                          "status",
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
