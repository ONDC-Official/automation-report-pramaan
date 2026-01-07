module.exports = {
  "id": "b2c_log_bap_confirm_message_01",
  "type": "object",
  "properties": {
    "order": {
      "id": "b2c_log_bap_confirm_message_02",
      "type": "object",
      "properties": {
        "id": {
          "id": "b2c_log_bap_confirm_message_03",
          "type": "string",
          "minLength": 1
        },
        "state": {
          "id": "b2c_log_bap_confirm_message_04",
          "type": "string",
          "minLength": 1
        },
        "provider": {
          "id": "b2c_log_bap_confirm_message_05",
          "type": "object",
          "properties": {
            "id": {
              "id": "b2c_log_bap_confirm_message_06",
              "type": "string",
              "minLength": 1
            },
            // "locations": {
            //   "id": "b2c_log_bap_confirm_message_07",
            //   "type": "array",
            //   "minItems": 1,
            //    "optional": true,
            //   "element": {
            //     "type": "object",
            //     "properties": {
            //       "id": {
            //         "id": "b2c_log_bap_confirm_message_08",
            //         "type": "string",
            //         "minLength": 1
            //       }
            //     }
            //   }
            // }
          }
        },
        "items": {
          "id": "b2c_log_bap_confirm_message_09",
          "type": "array",
          "minItems": 1,
          "element": {
            "type": "object",
            "properties": {
              "id": {
                "id": "b2c_log_bap_confirm_message_10",
                "type": "string",
                "minLength": 1
              },
              "fulfillment_id": {
                "id": "b2c_log_bap_confirm_message_11",
                "type": "string",
                "minLength": 1
              },
              // "category_id": {
              //   "id": "b2c_log_bap_confirm_message_12",
              //   "type": "string",
              //   "minLength": 1
              // },
              // "descriptor": {
              //   "id": "b2c_log_bap_confirm_message_13",
              //   "type": "object",
              //    "optional": true,
              //   "properties": {
              //     "code": {
              //       "id": "b2c_log_bap_confirm_message_14",
              //       "type": "string",
              //       "minLength": 1,
              //        "optional": true,
              //     }
              //   }
              // },
              "time": {
                "id": "b2c_log_bap_confirm_message_15",
                "type": "object",
                "properties": {
                  "label": {
                    "id": "b2c_log_bap_confirm_message_16",
                    "type": "string",
                    "minLength": 1
                  },
                  "duration": {
                    "id": "b2c_log_bap_confirm_message_17",
                    "type": "string",
                    "minLength": 1
                  },
                  "timestamp": {
                    "id": "b2c_log_bap_confirm_message_18",
                    "type": "string",
                    "minLength": 1
                  }
                }
              }
            }
          }
        },
        "quote": {
          "id": "b2c_log_bap_confirm_message_19",
          "type": "object",
          "properties": {
            "price": {
              "id": "b2c_log_bap_confirm_message_20",
              "type": "object",
              "properties": {
                "currency": {
                  "id": "b2c_log_bap_confirm_message_21",
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "id": "b2c_log_bap_confirm_message_22",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "breakup": {
              "id": "b2c_log_bap_confirm_message_23",
              "type": "array",
              "minItems": 1,
              "element": {
                "type": "object",
                "properties": {
                  "@ondc/org/item_id": {
                    "id": "b2c_log_bap_confirm_message_24",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/title_type": {
                    "id": "b2c_log_bap_confirm_message_25",
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "id": "b2c_log_bap_confirm_message_26",
                    "type": "object",
                    "properties": {
                      "currency": {
                        "id": "b2c_log_bap_confirm_message_27",
                        "type": "string",
                        "minLength": 1
                      },
                      "value": {
                        "id": "b2c_log_bap_confirm_message_28",
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
        "fulfillments": {
          "id": "b2c_log_bap_confirm_message_29",
          "type": "array",
          "minItems": 1,
          "element": {
            "type": "object",
            "properties": {
              "id": {
                "id": "b2c_log_bap_confirm_message_30",
                "type": "string",
                "minLength": 1
              },
              "type": {
                "id": "b2c_log_bap_confirm_message_31",
                "type": "string",
                "minLength": 1
              },
              // "@ondc/org/awb_no": {
              //   "id": "b2c_log_bap_confirm_message_32",
              //   "type": "string",
              //    "optional": true,
              //   "minLength": 1
              // },
              "start": {
                "id": "b2c_log_bap_confirm_message_33",
                "type": "object",
                "properties": {
                  "time": {
                    "id": "b2c_log_bap_confirm_message_34",
                    "type": "object",
                    "properties": {
                      "duration": {
                        "id": "b2c_log_bap_confirm_message_35",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "person": {
                    "id": "b2c_log_bap_confirm_message_36",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "b2c_log_bap_confirm_message_37",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "location": {
                    "id": "b2c_log_bap_confirm_message_38",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "b2c_log_bap_confirm_message_39",
                        "type": "string",
                        "optional": true,
                        "minLength": 1
                      },
                      "gps": {
                        "id": "b2c_log_bap_confirm_message_40",
                        "type": "string",
                        "minLength": 1
                      },
                      "address": {
                        "id": "b2c_log_bap_confirm_message_41",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "b2c_log_bap_confirm_message_42",
                            "type": "string",
                            "minLength": 1
                          },
                          "building": {
                            "id": "b2c_log_bap_confirm_message_43",
                            "type": "string",
                            "minLength": 1
                          },
                          "locality": {
                            "id": "b2c_log_bap_confirm_message_44",
                            "type": "string",
                            "minLength": 1
                          },
                          "city": {
                            "id": "b2c_log_bap_confirm_message_45",
                            "type": "string",
                            "minLength": 1
                          },
                          "state": {
                            "id": "b2c_log_bap_confirm_message_46",
                            "type": "string",
                            "minLength": 1
                          },
                          "country": {
                            "id": "b2c_log_bap_confirm_message_47",
                            "type": "string",
                            "minLength": 1
                          },
                          "area_code": {
                            "id": "b2c_log_bap_confirm_message_48",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "contact": {
                    "id": "b2c_log_bap_confirm_message_49",
                    "type": "object",
                    "properties": {
                      "phone": {
                        "id": "b2c_log_bap_confirm_message_50",
                        "type": "string",
                        "minLength": 1
                      },
                      "email": {
                        "id": "b2c_log_bap_confirm_message_51",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "instructions": {
                    "id": "b2c_log_bap_confirm_message_52",
                    "type": "object",
                    "optional": true,
                    "properties": {
                      "code": {
                        "id": "b2c_log_bap_confirm_message_53",
                        "type": "string",
                        "optional": true,
                        "minLength": 1
                      },
                      "short_desc": {
                        "id": "b2c_log_bap_confirm_message_54",
                        "type": "string",
                        "optional": true,
                        "minLength": 1
                      },
                      "long_desc": {
                        "id": "b2c_log_bap_confirm_message_55",
                        "type": "string",
                        "optional": true,
                        "minLength": 1
                      },
                      "additional_desc": {
                        "id": "b2c_log_bap_confirm_message_56",
                        "type": "object",
                        "optional": true,
                        "properties": {
                          "content_type": {
                            "id": "b2c_log_bap_confirm_message_57",
                            "type": "string",
                            "optional": true,
                            "minLength": 1
                          },
                          "url": {
                            "id": "b2c_log_bap_confirm_message_58",
                            "type": "string",
                            "optional": true,
                            "minLength": 1
                          }
                        }
                      }
                    }
                  }
                }
              },
              // "end": {
              //   "id": "b2c_log_bap_confirm_message_59",
              //   "type": "object",
              //   "properties": {
              //     "person": {
              //       "id": "b2c_log_bap_confirm_message_60",
              //       "type": "object",
              //       "properties": {
              //         "name": {
              //           "id": "b2c_log_bap_confirm_message_61",
              //           "type": "string",
              //           "minLength": 1
              //         }
              //       }
              //     },
              //     "location": {
              //       "id": "b2c_log_bap_confirm_message_62",
              //       "type": "object",
              //       "properties": {
              //         "gps": {
              //           "id": "b2c_log_bap_confirm_message_63",
              //           "type": "string",
              //           "minLength": 1
              //         },
              //         "address": {
              //           "id": "b2c_log_bap_confirm_message_64",
              //           "type": "object",
              //           "properties": {
              //             "name": {
              //               "id": "b2c_log_bap_confirm_message_65",
              //               "type": "string",
              //               "minLength": 1
              //             },
              //             "building": {
              //               "id": "b2c_log_bap_confirm_message_66",
              //               "type": "string",
              //               "minLength": 1
              //             },
              //             "locality": {
              //               "id": "b2c_log_bap_confirm_message_67",
              //               "type": "string",
              //               "minLength": 1
              //             },
              //             "city": {
              //               "id": "b2c_log_bap_confirm_message_68",
              //               "type": "string",
              //               "minLength": 1
              //             },
              //             "state": {
              //               "id": "b2c_log_bap_confirm_message_69",
              //               "type": "string",
              //               "minLength": 1
              //             },
              //             "country": {
              //               "id": "b2c_log_bap_confirm_message_70",
              //               "type": "string",
              //               "minLength": 1
              //             },
              //             "area_code": {
              //               "id": "b2c_log_bap_confirm_message_71",
              //               "type": "string",
              //               "minLength": 1
              //             }
              //           }
              //         }
              //       }
              //     },
              //     "contact": {
              //       "id": "b2c_log_bap_confirm_message_72",
              //       "type": "object",
              //       "properties": {
              //         "phone": {
              //           "id": "b2c_log_bap_confirm_message_73",
              //           "type": "string",
              //           "minLength": 1
              //         },
              //         "email": {
              //           "id": "b2c_log_bap_confirm_message_74",
              //           "type": "string",
              //           "minLength": 1
              //         }
              //       }
              //     },
              //     "instructions": {
              //       "id": "b2c_log_bap_confirm_message_75",
              //       "type": "object",
              //       "properties": {
              //         "code": {
              //           "id": "b2c_log_bap_confirm_message_76",
              //           "type": "string",
              //           "minLength": 1
              //         },
              //         "short_desc": {
              //           "id": "b2c_log_bap_confirm_message_77",
              //           "type": "string",
              //           "minLength": 1
              //         },
              //         "long_desc": {
              //           "id": "b2c_log_bap_confirm_message_78",
              //           "type": "string",
              //           "minLength": 1
              //         },
              //         "additional_desc": {
              //           "id": "b2c_log_bap_confirm_message_79",
              //           "type": "object",
              //           "properties": {
              //             "content_type": {
              //               "id": "b2c_log_bap_confirm_message_80",
              //               "type": "string",
              //               "minLength": 1
              //             },
              //             "url": {
              //               "id": "b2c_log_bap_confirm_message_81",
              //               "type": "string",
              //               "minLength": 1
              //             }
              //           }
              //         }
              //       }
              //     }
              //   }
              // },
              // "tags": {
              //   "id": "b2c_log_bap_confirm_message_82",
              //   "type": "array",
              //   "minItems": 1,
              //   "element": {
              //     "type": "object",
              //     "properties": {
              //       "code": {
              //         "id": "b2c_log_bap_confirm_message_83",
              //         "type": "string",
              //         "minLength": 1
              //       },
              //       "list": {
              //         "id": "b2c_log_bap_confirm_message_84",
              //         "type": "array",
              //         "minItems": 1,
              //         "element": {
              //           "type": "object",
              //           "properties": {
              //             "code": {
              //               "id": "b2c_log_bap_confirm_message_85",
              //               "type": "string",
              //               "minLength": 1
              //             },
              //             "value": {
              //               "id": "b2c_log_bap_confirm_message_86",
              //               "type": "string",
              //               "minLength": 1
              //             }
              //           }
              //         }
              //       }
              //     }
              //   }
              // }
            }
          }
        },
        "billing": {
          "id": "b2c_log_bap_confirm_message_87",
          "type": "object",
          "properties": {
            "name": {
              "id": "b2c_log_bap_confirm_message_88",
              "type": "string",
              "minLength": 1
            },
            "address": {
              "id": "b2c_log_bap_confirm_message_89",
              "type": "object",
              "properties": {
                "name": {
                  "id": "b2c_log_bap_confirm_message_90",
                  "type": "string",
                  "minLength": 1
                },
                "building": {
                  "id": "b2c_log_bap_confirm_message_91",
                  "type": "string",
                  "minLength": 1
                },
                "locality": {
                  "id": "b2c_log_bap_confirm_message_92",
                  "type": "string",
                  "minLength": 1
                },
                "city": {
                  "id": "b2c_log_bap_confirm_message_93",
                  "type": "string",
                  "minLength": 1
                },
                "state": {
                  "id": "b2c_log_bap_confirm_message_94",
                  "type": "string",
                  "minLength": 1
                },
                "country": {
                  "id": "b2c_log_bap_confirm_message_95",
                  "type": "string",
                  "minLength": 1
                },
                "area_code": {
                  "id": "b2c_log_bap_confirm_message_96",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "tax_number": {
              "id": "b2c_log_bap_confirm_message_97",
              "type": "string",
              "minLength": 1
            },
            "phone": {
              "id": "b2c_log_bap_confirm_message_98",
              "type": "string",
              "minLength": 1
            },
            "email": {
              "id": "b2c_log_bap_confirm_message_99",
              "type": "string",
              "minLength": 1
            },
            "created_at": {
              "id": "b2c_log_bap_confirm_message_100",
              "type": "string",
              "minLength": 1
            },
            "updated_at": {
              "id": "b2c_log_bap_confirm_message_101",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "payment": {
          "id": "b2c_log_bap_confirm_message_102",
          "type": "object",
          "properties": {
            // "@ondc/org/collection_amount": {
            //   "id": "b2c_log_bap_confirm_message_103",
            //   "type": "string",
            //   "minLength": 1
            // },
            "collected_by": {
              "id": "b2c_log_bap_confirm_message_104",
              "type": "string",
              "minLength": 1
            },
            "type": {
              "id": "b2c_log_bap_confirm_message_105",
              "type": "string",
              "minLength": 1
            },
            "@ondc/org/settlement_basis": {
              "id": "b2c_log_bap_confirm_message_106",
              "type": "string",
              "minLength": 1
            },
            "@ondc/org/settlement_window": {
              "id": "b2c_log_bap_confirm_message_107",
              "type": "string",
              "minLength": 1
            },
            "@ondc/org/settlement_details": {
              "id": "b2c_log_bap_confirm_message_108",
              "type": "array",
              "optional": true,
              "minItems": 1,
              "element": {
                "type": "object",
                "properties": {
                  "settlement_counterparty": {
                    "id": "b2c_log_bap_confirm_message_109",
                    "optional": true,
                    "enum": ["lbnp", "lsp"],
                    "type": "string",
                    "minLength": 1
                  },
                  "settlement_type": {
                    "id": "b2c_log_bap_confirm_message_110",
                    "optional": true,
                    "type": "string",
                    "minLength": 1
                  },
                  "upi_address": {
                    "id": "b2c_log_bap_confirm_message_111",
                    "optional": true,

                    "type": "string",
                    "minLength": 1
                  },
                  "settlement_bank_account_no": {
                    "id": "b2c_log_bap_confirm_message_112",
                    "optional": true,
                    "type": "string",
                    "minLength": 1
                  },
                  "settlement_ifsc_code": {
                    "id": "b2c_log_bap_confirm_message_113",
                    "optional": true,
                    "type": "string",
                    "minLength": 1
                  }
                }
              }
            }
          }
        },
        // "@ondc/org/linked_order": {
        //   "id": "b2c_log_bap_confirm_message_114",
        //   "type": "object",
        //   "properties": {
        //     "items": {
        //       "id": "b2c_log_bap_confirm_message_115",
        //       "type": "array",
        //       "minItems": 1,
        //       "element": {
        //         "type": "object",
        //         "properties": {
        //           "category_id": {
        //             "id": "b2c_log_bap_confirm_message_116",
        //             "type": "string",
        //             "minLength": 1
        //           },
        //           "descriptor": {
        //             "id": "b2c_log_bap_confirm_message_117",
        //             "type": "object",
        //             "properties": {
        //               "name": {
        //                 "id": "b2c_log_bap_confirm_message_118",
        //                 "type": "string",
        //                 "minLength": 1
        //               }
        //             }
        //           },
        //           "quantity": {
        //             "id": "b2c_log_bap_confirm_message_119",
        //             "type": "object",
        //             "properties": {
        //               "count": {
        //                 "id": "b2c_log_bap_confirm_message_120",
        //                 "type": "number"
        //               },
        //               "measure": {
        //                 "id": "b2c_log_bap_confirm_message_121",
        //                 "type": "object",
        //                 "properties": {
        //                   "unit": {
        //                     "id": "b2c_log_bap_confirm_message_122",
        //                     "type": "string",
        //                     "minLength": 1
        //                   },
        //                   "value": {
        //                     "id": "b2c_log_bap_confirm_message_123",
        //                     "type": "number"
        //                   }
        //                 }
        //               }
        //             }
        //           },
        //           "price": {
        //             "id": "b2c_log_bap_confirm_message_124",
        //             "type": "object",
        //             "properties": {
        //               "currency": {
        //                 "id": "b2c_log_bap_confirm_message_125",
        //                 "type": "string",
        //                 "minLength": 1
        //               },
        //               "value": {
        //                 "id": "b2c_log_bap_confirm_message_126",
        //                 "type": "string",
        //                 "minLength": 1
        //               }
        //             }
        //           }
        //         }
        //       }
        //     },
        //     "provider": {
        //       "id": "b2c_log_bap_confirm_message_127",
        //       "type": "object",
        //       "properties": {
        //         // "descriptor": {
        //         //   "id": "b2c_log_bap_confirm_message_128",
        //         //   "type": "object",
        //         //   "properties": {
        //         //     "name": {
        //         //       "id": "b2c_log_bap_confirm_message_129",
        //         //       "type": "string",
        //         //       "minLength": 1
        //         //     }
        //         //   }
        //         // },
        //         "address": {
        //           "id": "b2c_log_bap_confirm_message_130",
        //           "type": "object",
        //           "properties": {
        //             "name": {
        //               "id": "b2c_log_bap_confirm_message_131",
        //               "type": "string",
        //               "minLength": 1
        //             },
        //             "building": {
        //               "id": "b2c_log_bap_confirm_message_132",
        //               "type": "string",
        //               "minLength": 1
        //             },
        //             "locality": {
        //               "id": "b2c_log_bap_confirm_message_133",
        //               "type": "string",
        //               "minLength": 1
        //             },
        //             "city": {
        //               "id": "b2c_log_bap_confirm_message_134",
        //               "type": "string",
        //               "minLength": 1
        //             },
        //             "state": {
        //               "id": "b2c_log_bap_confirm_message_135",
        //               "type": "string",
        //               "minLength": 1
        //             },
        //             "area_code": {
        //               "id": "b2c_log_bap_confirm_message_136",
        //               "type": "string",
        //               "minLength": 1
        //             }
        //           }
        //         }
        //       }
        //     },
        //     "order": {
        //       "id": "b2c_log_bap_confirm_message_137",
        //       "type": "object",
        //       "properties": {
        //         "id": {
        //           "id": "b2c_log_bap_confirm_message_138",
        //           "type": "string",
        //           "minLength": 1
        //         },
        //         "weight": {
        //           "id": "b2c_log_bap_confirm_message_139",
        //           "type": "object",
        //           "properties": {
        //             "unit": {
        //               "id": "b2c_log_bap_confirm_message_140",
        //               "type": "string",
        //               "minLength": 1
        //             },
        //             "value": {
        //               "id": "b2c_log_bap_confirm_message_141",
        //               "type": "number"
        //             }
        //           }
        //         },
        //         "dimensions": {
        //           "id": "b2c_log_bap_confirm_message_142",
        //           "type": "object",
        //           "properties": {
        //             "length": {
        //               "id": "b2c_log_bap_confirm_message_143",
        //               "type": "object",
        //               "properties": {
        //                 "unit": {
        //                   "id": "b2c_log_bap_confirm_message_144",
        //                   "type": "string",
        //                   "minLength": 1
        //                 },
        //                 "value": {
        //                   "id": "b2c_log_bap_confirm_message_145",
        //                   "type": "number"
        //                 }
        //               }
        //             },
        //             "breadth": {
        //               "id": "b2c_log_bap_confirm_message_146",
        //               "type": "object",
        //               "properties": {
        //                 "unit": {
        //                   "id": "b2c_log_bap_confirm_message_147",
        //                   "type": "string",
        //                   "minLength": 1
        //                 },
        //                 "value": {
        //                   "id": "b2c_log_bap_confirm_message_148",
        //                   "type": "number"
        //                 }
        //               }
        //             },
        //             "height": {
        //               "id": "b2c_log_bap_confirm_message_149",
        //               "type": "object",
        //               "properties": {
        //                 "unit": {
        //                   "id": "b2c_log_bap_confirm_message_150",
        //                   "type": "string",
        //                   "minLength": 1
        //                 },
        //                 "value": {
        //                   "id": "b2c_log_bap_confirm_message_151",
        //                   "type": "number"
        //                 }
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // },
        "tags": {
          "id": "b2c_log_bap_confirm_message_152",
          "type": "array",
          "minItems": 1,
          "element": {
            "type": "object",
            "properties": {
              "code": {
                "id": "b2c_log_bap_confirm_message_153",
                "type": "string",
                "minLength": 1
              },
              "list": {
                "id": "b2c_log_bap_confirm_message_154",
                "type": "array",
                "minItems": 1,
                "element": {
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "b2c_log_bap_confirm_message_155",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "b2c_log_bap_confirm_message_156",
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
          "id": "b2c_log_bap_confirm_message_157",
          "type": "string",
          "minLength": 1
        },
        "updated_at": {
          "id": "b2c_log_bap_confirm_message_158",
          "type": "string",
          "minLength": 1
        }
      }
    }
  }
};