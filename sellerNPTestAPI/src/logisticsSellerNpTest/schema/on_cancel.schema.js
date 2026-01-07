module.exports = {
    "id": "b2c_log_bpp_on_cancel_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "b2c_log_bpp_on_cancel_message_02",
            "type": "object",
            "properties": {
                "id": {
                    "id": "b2c_log_bpp_on_cancel_message_03",
                    "type": "string",
                    "minLength": 1
                },
                "state": {
                    "id": "b2c_log_bpp_on_cancel_message_04",
                    "type": "string",
                    "minLength": 1
                },
                "provider": {
                    "id": "b2c_log_bpp_on_cancel_message_05",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "b2c_log_bpp_on_cancel_message_06",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "items": {
                    "id": "b2c_log_bpp_on_cancel_message_07",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "b2c_log_bpp_on_cancel_message_08",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "b2c_log_bpp_on_cancel_message_09",
                                "type": "string",
                                "minLength": 1
                            },
                            "category_id": {
                                "id": "b2c_log_bpp_on_cancel_message_10",
                                "type": "string",
                                "minLength": 1
                            },
                            "fulfillment_id": {
                                "id": "b2c_log_bpp_on_cancel_message_11",
                                "type": "string",
                                "minLength": 1
                            },
                            "time": {
                                "id": "b2c_log_bpp_on_cancel_message_17",
                                "type": "object",
                                "properties": {
                                    "label": {
                                        "id": "b2c_log_bpp_on_cancel_message_18",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "duration": {
                                        "id": "b2c_log_bpp_on_cancel_message_19",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "timestamp": {
                                        "id": "b2c_log_bpp_on_cancel_message_20",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            }
                        }
                    }
                },
                "billing": {
                    "id": "b2c_log_bpp_on_cancel_message_21",
                    "type": "object",
                    "properties": {
                        "name": {
                            "id": "b2c_log_bpp_on_cancel_message_22",
                            "type": "string",
                            "minLength": 1
                        },
                        "address": {
                            "id": "b2c_log_bpp_on_cancel_message_23",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "b2c_log_bpp_on_cancel_message_24",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "building": {
                                    "id": "b2c_log_bpp_on_cancel_message_25",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "locality": {
                                    "id": "b2c_log_bpp_on_cancel_message_26",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "city": {
                                    "id": "b2c_log_bpp_on_cancel_message_27",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "state": {
                                    "id": "b2c_log_bpp_on_cancel_message_28",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "country": {
                                    "id": "b2c_log_bpp_on_cancel_message_29",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "area_code": {
                                    "id": "b2c_log_bpp_on_cancel_message_30",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "tax_number": {
                            "id": "b2c_log_bpp_on_cancel_message_31",
                            "type": "string",
                            "minLength": 1
                        },
                        "phone": {
                            "id": "b2c_log_bpp_on_cancel_message_32",
                            "type": "string",
                            "minLength": 1
                        },
                        "email": {
                            "id": "b2c_log_bpp_on_cancel_message_33",
                            "type": "string",
                            "minLength": 1
                        },
                        "created_at": {
                            "id": "b2c_log_bpp_on_cancel_message_34",
                            "type": "string",
                            "minLength": 1
                        },
                        "updated_at": {
                            "id": "b2c_log_bpp_on_cancel_message_35",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "fulfillments": {
                    "id": "b2c_log_bpp_on_cancel_message_36",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "b2c_log_bpp_on_cancel_message_37",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "b2c_log_bpp_on_cancel_message_38",
                                "type": "string",
                                "minLength": 1
                            },
                            "type": {
                                "id": "b2c_log_bpp_on_cancel_message_39",
                                "type": "string",
                                "minLength": 1
                            },
                            "state": {
                                "id": "b2c_log_bpp_on_cancel_message_40",
                                "type": "object",
                                "properties": {
                                    "descriptor": {
                                        "id": "b2c_log_bpp_on_cancel_message_41",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "b2c_log_bpp_on_cancel_message_42",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            },
                            "tracking": {
                                "id": "b2c_log_bpp_on_cancel_message_44",
                                "type": "boolean"
                            },
                            // "start": {
                            //     "id": "b2c_log_bpp_on_cancel_message_45",
                            //     "type": "object",
                            //     "properties": {
                            //         "location": {
                            //             "id": "b2c_log_bpp_on_cancel_message_48",
                            //             "type": "object",
                            //             "properties": {
                            //                 "gps": {
                            //                     "id": "b2c_log_bpp_on_cancel_message_49",
                            //                     "type": "string",
                            //                     "minLength": 1
                            //                 },
                            //                 "address": {
                            //                     "id": "b2c_log_bpp_on_cancel_message_50",
                            //                     "type": "object",
                            //                     "properties": {
                            //                         "name": {
                            //                             "id": "b2c_log_bpp_on_cancel_message_51",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "building": {
                            //                             "id": "b2c_log_bpp_on_cancel_message_52",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "locality": {
                            //                             "id": "b2c_log_bpp_on_cancel_message_53",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "city": {
                            //                             "id": "b2c_log_bpp_on_cancel_message_54",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "state": {
                            //                             "id": "b2c_log_bpp_on_cancel_message_55",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "country": {
                            //                             "id": "b2c_log_bpp_on_cancel_message_56",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "area_code": {
                            //                             "id": "b2c_log_bpp_on_cancel_message_57",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         }
                            //                     }
                            //                 }
                            //             }
                            //         },
                            //         "time": {
                            //             "id": "b2c_log_bpp_on_cancel_message_61",
                            //             "type": "object",
                            //             "properties": {
                            //                 "duration": {
                            //                     "id": "b2c_log_bpp_on_cancel_message_62",
                            //                     "type": "string",
                            //                     "minLength": 1
                            //                 },
                            //                 "range": {
                            //                     "id": "b2c_log_bpp_on_cancel_message_63",
                            //                     "type": "object",
                            //                     "properties": {
                            //                         "start": {
                            //                             "id": "b2c_log_bpp_on_cancel_message_64",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "end": {
                            //                             "id": "b2c_log_bpp_on_cancel_message_65",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         }
                            //                     }
                            //                 }
                            //             }
                            //         }
                            //     }
                            // },
                            "end": {
                                "id": "b2c_log_bpp_on_cancel_message_69",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "b2c_log_bpp_on_cancel_message_70",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "b2c_log_bpp_on_cancel_message_71",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "location": {
                                        "id": "b2c_log_bpp_on_cancel_message_72",
                                        "type": "object",
                                        "properties": {
                                            "gps": {
                                                "id": "b2c_log_bpp_on_cancel_message_73",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "address": {
                                                "id": "b2c_log_bpp_on_cancel_message_74",
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "id": "b2c_log_bpp_on_cancel_message_75",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "building": {
                                                        "id": "b2c_log_bpp_on_cancel_message_76",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "locality": {
                                                        "id": "b2c_log_bpp_on_cancel_message_77",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "city": {
                                                        "id": "b2c_log_bpp_on_cancel_message_78",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "state": {
                                                        "id": "b2c_log_bpp_on_cancel_message_79",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "country": {
                                                        "id": "b2c_log_bpp_on_cancel_message_80",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "area_code": {
                                                        "id": "b2c_log_bpp_on_cancel_message_81",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "b2c_log_bpp_on_cancel_message_82",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "b2c_log_bpp_on_cancel_message_83",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "email": {
                                                "id": "b2c_log_bpp_on_cancel_message_84",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                },
                                "tags": {
                                    "id": "b2c_log_bpp_on_cancel_message_88",
                                    "type": "array",
                                    "minItems": 1,
                                    "element": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "b2c_log_bpp_on_cancel_message_89",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "list": {
                                                "id": "b2c_log_bpp_on_cancel_message_90",
                                                "type": "array",
                                                "minItems": 1,
                                                "element": {
                                                    "type": "object",
                                                    "properties": {
                                                        "code": {
                                                            "id": "b2c_log_bpp_on_cancel_message_91",
                                                            "type": "string",
                                                            "minLength": 1
                                                        },
                                                        "value": {
                                                            "id": "b2c_log_bpp_on_cancel_message_92",
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
                        "required": {
                            "type": "array",
                            "element": {
                                "allOf": [
                                    {
                                        "if": {
                                            "properties": {
                                                "type": {
                                                    "const": "Delivery"
                                                }
                                            }
                                        },
                                        "then": [
                                            "id",
                                            "@ondc/org/provider_name",
                                            "state",
                                            "@ondc/org/TAT",
                                            "tracking",
                                            
                                            "end",
                                            "tags"
                                        ]
                                    },
                                    {
                                        "if": {
                                            "properties": {
                                                "type": {
                                                    "const": "RTO"
                                                }
                                            }
                                        },
                                        "then": [
                                            "id",
                                            "state",
                                            
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                },
                "quote": {
                    "id": "b2c_log_bpp_on_cancel_message_93",
                    "type": "object",
                    "properties": {
                        "price": {
                            "id": "b2c_log_bpp_on_cancel_message_94",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "b2c_log_bpp_on_cancel_message_95",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "b2c_log_bpp_on_cancel_message_96",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "breakup": {
                            "id": "b2c_log_bpp_on_cancel_message_97",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_cancel_message_98",
                                "type": "object",
                                "properties": {
                                    "@ondc/org/item_id": {
                                        "id": "b2c_log_bpp_on_cancel_message_99",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "@ondc/org/title_type": {
                                        "id": "b2c_log_bpp_on_cancel_message_100",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "price": {
                                        "id": "b2c_log_bpp_on_cancel_message_101",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "b2c_log_bpp_on_cancel_message_102",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "b2c_log_bpp_on_cancel_message_103",
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
                    "id": "b2c_log_bpp_on_cancel_message_104",
                    "type": "object",
                    "properties": {
                        "type": {
                            "id": "b2c_log_bpp_on_cancel_message_105",
                            "type": "string",
                            "minLength": 1
                        },
                         "@ondc/org/collection_amount": {
                            "id": "b2c_log_bpp_on_cancel_message_1005",
                            "type": "number",
                            "optional": true
                        },
                        "collected_by": {
                            "id": "b2c_log_bpp_on_cancel_message_106",
                            "type": "string",
                            "minLength": 1
                        },
                        "@ondc/org/settlement_details": {
                            "id": "b2c_log_bpp_on_cancel_message_107",
                            "type": "array",
                            "optional": true,
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_cancel_message_108",
                                "type": "object",
                                "properties": {
                                    "settlement_counterparty": {
                                        "id": "b2c_log_bpp_on_cancel_message_109",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_type": {
                                        "id": "b2c_log_bpp_on_cancel_message_110",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "upi_address": {
                                        "id": "b2c_log_bpp_on_cancel_message_111",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_bank_account_no": {
                                        "id": "b2c_log_bpp_on_cancel_message_112",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_ifsc_code": {
                                        "id": "b2c_log_bpp_on_cancel_message_113",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            }
                        }
                    }
                },
                "@ondc/org/linked_order": {
                    "id": "b2c_log_bpp_on_cancel_message_114",
                    "type": "object",
                    "properties": {
                        "items": {
                            "id": "b2c_log_bpp_on_cancel_message_115",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_cancel_message_116",
                                "type": "object",
                                "properties": {
                                    "category_id": {
                                        "id": "b2c_log_bpp_on_cancel_message_117",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "descriptor": {
                                        "id": "b2c_log_bpp_on_cancel_message_118",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "b2c_log_bpp_on_cancel_message_119",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "quantity": {
                                        "id": "b2c_log_bpp_on_cancel_message_120",
                                        "type": "object",
                                        "properties": {
                                            "count": {
                                                "id": "b2c_log_bpp_on_cancel_message_121",
                                                "type": "number"
                                            },
                                            "measure": {
                                                "id": "b2c_log_bpp_on_cancel_message_122",
                                                "type": "object",
                                                "properties": {
                                                    "unit": {
                                                        "id": "b2c_log_bpp_on_cancel_message_123",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "value": {
                                                        "id": "b2c_log_bpp_on_cancel_message_124",
                                                        "type": "number"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "price": {
                                        "id": "b2c_log_bpp_on_cancel_message_125",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "b2c_log_bpp_on_cancel_message_126",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "b2c_log_bpp_on_cancel_message_127",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "provider": {
                            "id": "b2c_log_bpp_on_cancel_message_128",
                            "type": "object",
                            "properties": {
                                "descriptor": {
                                    "id": "b2c_log_bpp_on_cancel_message_129",
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "id": "b2c_log_bpp_on_cancel_message_130",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                },
                                "address": {
                                    "id": "b2c_log_bpp_on_cancel_message_131",
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "id": "b2c_log_bpp_on_cancel_message_132",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "building": {
                                            "id": "b2c_log_bpp_on_cancel_message_133",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "locality": {
                                            "id": "b2c_log_bpp_on_cancel_message_134",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "city": {
                                            "id": "b2c_log_bpp_on_cancel_message_135",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "state": {
                                            "id": "b2c_log_bpp_on_cancel_message_136",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "area_code": {
                                            "id": "b2c_log_bpp_on_cancel_message_137",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            }
                        },
                        "order": {
                            "id": "b2c_log_bpp_on_cancel_message_138",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "id": "b2c_log_bpp_on_cancel_message_139",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "weight": {
                                    "id": "b2c_log_bpp_on_cancel_message_140",
                                    "type": "object",
                                    "properties": {
                                        "unit": {
                                            "id": "b2c_log_bpp_on_cancel_message_141",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "value": {
                                            "id": "b2c_log_bpp_on_cancel_message_142",
                                            "type": "number"
                                        }
                                    }
                                },
                                "dimensions": {
                                    "id": "b2c_log_bpp_on_cancel_message_143",
                                    "type": "object",
                                    "properties": {
                                        "length": {
                                            "id": "b2c_log_bpp_on_cancel_message_144",
                                            "type": "object",
                                            "properties": {
                                                "unit": {
                                                    "id": "b2c_log_bpp_on_cancel_message_145",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "value": {
                                                    "id": "b2c_log_bpp_on_cancel_message_146",
                                                    "type": "number"
                                                }
                                            }
                                        },
                                        "breadth": {
                                            "id": "b2c_log_bpp_on_cancel_message_147",
                                            "type": "object",
                                            "properties": {
                                                "unit": {
                                                    "id": "b2c_log_bpp_on_cancel_message_148",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "value": {
                                                    "id": "b2c_log_bpp_on_cancel_message_149",
                                                    "type": "number"
                                                }
                                            }
                                        },
                                        "height": {
                                            "id": "b2c_log_bpp_on_cancel_message_150",
                                            "type": "object",
                                            "properties": {
                                                "unit": {
                                                    "id": "b2c_log_bpp_on_cancel_message_151",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "value": {
                                                    "id": "b2c_log_bpp_on_cancel_message_152",
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
                    "id": "b2c_log_bpp_on_cancel_message_153",
                    "type": "string",
                    "minLength": 1
                },
                "updated_at": {
                    "id": "b2c_log_bpp_on_cancel_message_154",
                    "type": "string",
                    "minLength": 1
                },
                "cancellation": {
                    "id": "b2c_log_bpp_on_cancel_message_155",
                    "type": "object",
                    "properties": {
                        "cancelled_by": {
                            "id": "b2c_log_bpp_on_cancel_message_156",
                            "type": "string",
                            "minLength": 1
                        },
                        "reason": {
                            "id": "b2c_log_bpp_on_cancel_message_157",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "id": "b2c_log_bpp_on_cancel_message_158",
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