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
                "cancellation": {
                    "id": "b2c_log_bpp_on_cancel_message_05",
                    "type": "object",
                    "properties": {
                        "cancelled_by": {
                            "id": "b2c_log_bpp_on_cancel_message_06",
                            "type": "string",
                            "minLength": 1
                        },
                        "reason": {
                            "id": "b2c_log_bpp_on_cancel_message_07",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "id": "b2c_log_bpp_on_cancel_message_08",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        }
                    }
                },
                "provider": {
                    "id": "b2c_log_bpp_on_cancel_message_09",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "b2c_log_bpp_on_cancel_message_10",
                            "type": "string",
                            "minLength": 1
                        },
                        // "locations": {
                        //     "id": "b2c_log_bpp_on_cancel_message_11",
                        //     "type": "array",
                        //     "minItems": 1,
                        //     "element": {
                        //         "id": "b2c_log_bpp_on_cancel_message_12",
                        //         "type": "object",
                        //         "properties": {
                        //             "id": {
                        //                 "id": "b2c_log_bpp_on_cancel_message_13",
                        //                 "type": "string",
                        //                 "minLength": 1
                        //             }
                        //         }
                        //     }
                        // }
                    }
                },
                "items": {
                    "id": "b2c_log_bpp_on_cancel_message_14",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "b2c_log_bpp_on_cancel_message_15",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "b2c_log_bpp_on_cancel_message_16",
                                "type": "string",
                                "minLength": 1
                            },
                            "fulfillment_id": {
                                "id": "b2c_log_bpp_on_cancel_message_17",
                                "type": "string",
                                "minLength": 1
                            },
                            "category_id": {
                                "id": "b2c_log_bpp_on_cancel_message_18",
                                "type": "string",
                                "minLength": 1
                            },
                            // "descriptor": {
                            //     "id": "b2c_log_bpp_on_cancel_message_19",
                            //     "type": "object",
                            //     "properties": {
                            //         "code": {
                            //             "id": "b2c_log_bpp_on_cancel_message_20",
                            //             "type": "string",
                            //             "minLength": 1
                            //         }
                            //     }
                            // },
                            "time": {
                                "id": "b2c_log_bpp_on_cancel_message_21",
                                "type": "object",
                                "properties": {
                                    "label": {
                                        "id": "b2c_log_bpp_on_cancel_message_22",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "duration": {
                                        "id": "b2c_log_bpp_on_cancel_message_23",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "timestamp": {
                                        "id": "b2c_log_bpp_on_cancel_message_24",
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
                                                "type": "params",
                                                "flowId": {
                                                    "const": [
                                                        "LOG10_7",
                                                        "LOG10COD",
                                                        "LOG10SURGFEE",
                                                    ]
                                                }
                                            }
                                        },
                                        "then": [
                                            "id",
                                            "time",
                                            "fulfillment_id",
                                            "category_id"
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                },
                "quote": {
                    "id": "b2c_log_bpp_on_cancel_message_25",
                    "type": "object",
                    "properties": {
                        "price": {
                            "id": "b2c_log_bpp_on_cancel_message_26",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "b2c_log_bpp_on_cancel_message_27",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "b2c_log_bpp_on_cancel_message_28",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "breakup": {
                            "id": "b2c_log_bpp_on_cancel_message_29",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_cancel_message_30",
                                "type": "object",
                                "properties": {
                                    "@ondc/org/item_id": {
                                        "id": "b2c_log_bpp_on_cancel_message_31",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "@ondc/org/title_type": {
                                        "id": "b2c_log_bpp_on_cancel_message_32",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "price": {
                                        "id": "b2c_log_bpp_on_cancel_message_33",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "b2c_log_bpp_on_cancel_message_34",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "b2c_log_bpp_on_cancel_message_35",
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
                            "@ondc/org/awb_no": {
                                "id": "b2c_log_bpp_on_cancel_message_43",
                                "type": "string",
                                "minLength": 1
                            },
                            "tracking": {
                                "id": "b2c_log_bpp_on_cancel_message_44",
                                "type": "boolean"
                            },
                            "start": {
                                "id": "b2c_log_bpp_on_cancel_message_45",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "b2c_log_bpp_on_cancel_message_46",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "b2c_log_bpp_on_cancel_message_47",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "location": {
                                        "id": "b2c_log_bpp_on_cancel_message_48",
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "id": "b2c_log_bpp_on_cancel_message_49",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "gps": {
                                                "id": "b2c_log_bpp_on_cancel_message_50",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "address": {
                                                "id": "b2c_log_bpp_on_cancel_message_51",
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "id": "b2c_log_bpp_on_cancel_message_52",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "building": {
                                                        "id": "b2c_log_bpp_on_cancel_message_53",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "locality": {
                                                        "id": "b2c_log_bpp_on_cancel_message_54",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "city": {
                                                        "id": "b2c_log_bpp_on_cancel_message_55",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "state": {
                                                        "id": "b2c_log_bpp_on_cancel_message_56",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "country": {
                                                        "id": "b2c_log_bpp_on_cancel_message_57",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "area_code": {
                                                        "id": "b2c_log_bpp_on_cancel_message_58",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "b2c_log_bpp_on_cancel_message_59",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "b2c_log_bpp_on_cancel_message_60",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "email": {
                                                "id": "b2c_log_bpp_on_cancel_message_61",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "instructions": {
                                        "id": "b2c_log_bpp_on_cancel_message_62",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "b2c_log_bpp_on_cancel_message_63",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "short_desc": {
                                                "id": "b2c_log_bpp_on_cancel_message_64",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "long_desc": {
                                                "id": "b2c_log_bpp_on_cancel_message_65",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "additional_desc": {
                                                "id": "b2c_log_bpp_on_cancel_message_66",
                                                "type": "object",
                                                "properties": {
                                                    "content_type": {
                                                        "id": "b2c_log_bpp_on_cancel_message_67",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "url": {
                                                        "id": "b2c_log_bpp_on_cancel_message_68",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "time": {
                                        "id": "b2c_log_bpp_on_cancel_message_69",
                                        "type": "object",
                                        "properties": {
                                            "duration": {
                                                "id": "b2c_log_bpp_on_cancel_message_70",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "range": {
                                                "id": "b2c_log_bpp_on_cancel_message_71",
                                                "type": "object",
                                                "properties": {
                                                    "start": {
                                                        "id": "b2c_log_bpp_on_cancel_message_72",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "end": {
                                                        "id": "b2c_log_bpp_on_cancel_message_73",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "end": {
                                "id": "b2c_log_bpp_on_cancel_message_74",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "b2c_log_bpp_on_cancel_message_75",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "b2c_log_bpp_on_cancel_message_76",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "location": {
                                        "id": "b2c_log_bpp_on_cancel_message_77",
                                        "type": "object",
                                        "properties": {
                                            "gps": {
                                                "id": "b2c_log_bpp_on_cancel_message_78",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "address": {
                                                "id": "b2c_log_bpp_on_cancel_message_79",
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "id": "b2c_log_bpp_on_cancel_message_80",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "building": {
                                                        "id": "b2c_log_bpp_on_cancel_message_81",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "locality": {
                                                        "id": "b2c_log_bpp_on_cancel_message_82",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "city": {
                                                        "id": "b2c_log_bpp_on_cancel_message_83",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "state": {
                                                        "id": "b2c_log_bpp_on_cancel_message_84",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "country": {
                                                        "id": "b2c_log_bpp_on_cancel_message_85",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "area_code": {
                                                        "id": "b2c_log_bpp_on_cancel_message_86",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "b2c_log_bpp_on_cancel_message_87",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "b2c_log_bpp_on_cancel_message_88",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "email": {
                                                "id": "b2c_log_bpp_on_cancel_message_89",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "instructions": {
                                        "id": "b2c_log_bpp_on_cancel_message_90",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "b2c_log_bpp_on_cancel_message_91",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "short_desc": {
                                                "id": "b2c_log_bpp_on_cancel_message_92",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "additional_desc": {
                                                "id": "b2c_log_bpp_on_cancel_message_93",
                                                "type": "object",
                                                "properties": {
                                                    "content_type": {
                                                        "id": "b2c_log_bpp_on_cancel_message_94",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "url": {
                                                        "id": "b2c_log_bpp_on_cancel_message_95",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "time": {
                                        "id": "b2c_log_bpp_on_cancel_message_96",
                                        "type": "object",
                                        "properties": {
                                            "range": {
                                                "id": "b2c_log_bpp_on_cancel_message_97",
                                                "type": "object",
                                                "properties": {
                                                    "start": {
                                                        "id": "b2c_log_bpp_on_cancel_message_98",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "end": {
                                                        "id": "b2c_log_bpp_on_cancel_message_99",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "agent": {
                                "id": "b2c_log_bpp_on_cancel_message_100",
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "id": "b2c_log_bpp_on_cancel_message_101",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "phone": {
                                        "id": "b2c_log_bpp_on_cancel_message_102",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "vehicle": {
                                "id": "b2c_log_bpp_on_cancel_message_103",
                                "type": "object",
                                "properties": {
                                    "registration": {
                                        "id": "b2c_log_bpp_on_cancel_message_104",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "tags": {
                                "id": "b2c_log_bpp_on_cancel_message_105",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "b2c_log_bpp_on_cancel_message_106",
                                    "type": "object",
                                    "properties": {
                                        "code": {
                                            "id": "b2c_log_bpp_on_cancel_message_107",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "list": {
                                            "id": "b2c_log_bpp_on_cancel_message_108",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "b2c_log_bpp_on_cancel_message_109",
                                                "type": "object",
                                                "properties": {
                                                    "code": {
                                                        "id": "b2c_log_bpp_on_cancel_message_110",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "value": {
                                                        "id": "b2c_log_bpp_on_cancel_message_111",
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
                                                        "LOG10_7",
                                                        "LOG10COD",
                                                        "LOG10SURGFEE",
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
                                    }
                                ]
                            }
                        }
                    }
                },
                "billing": {
                    "id": "b2c_log_bpp_on_cancel_message_112",
                    "type": "object",
                    "properties": {
                        "name": {
                            "id": "b2c_log_bpp_on_cancel_message_113",
                            "type": "string",
                            "minLength": 1
                        },
                        "address": {
                            "id": "b2c_log_bpp_on_cancel_message_114",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "b2c_log_bpp_on_cancel_message_115",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "building": {
                                    "id": "b2c_log_bpp_on_cancel_message_116",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "locality": {
                                    "id": "b2c_log_bpp_on_cancel_message_117",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "city": {
                                    "id": "b2c_log_bpp_on_cancel_message_118",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "state": {
                                    "id": "b2c_log_bpp_on_cancel_message_119",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "country": {
                                    "id": "b2c_log_bpp_on_cancel_message_120",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "area_code": {
                                    "id": "b2c_log_bpp_on_cancel_message_121",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "tax_number": {
                            "id": "b2c_log_bpp_on_cancel_message_122",
                            "type": "string",
                            "minLength": 1
                        },
                        "phone": {
                            "id": "b2c_log_bpp_on_cancel_message_123",
                            "type": "string",
                            "minLength": 1
                        },
                        "email": {
                            "id": "b2c_log_bpp_on_cancel_message_124",
                            "type": "string",
                            "minLength": 1
                        },
                        "created_at": {
                            "id": "b2c_log_bpp_on_cancel_message_125",
                            "type": "string",
                            "minLength": 1
                        },
                        "updated_at": {
                            "id": "b2c_log_bpp_on_cancel_message_126",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "payment": {
                    "id": "b2c_log_bpp_on_cancel_message_127",
                    "type": "object",
                    "properties": {
                        "@ondc/org/collection_amount": {
                            "id": "b2c_log_bpp_on_cancel_message_128",
                            "type": "string",
                            "minLength": 1
                        },
                        "collected_by": {
                            "id": "b2c_log_bpp_on_cancel_message_129",
                            "type": "string",
                            "minLength": 1
                        },
                        "type": {
                            "id": "b2c_log_bpp_on_cancel_message_130",
                            "type": "string",
                            "minLength": 1
                        },
                        "@ondc/org/settlement_basis": {
                            "id": "b2c_log_bpp_on_cancel_message_131",
                            "type": "string",
                            "minLength": 1
                        },
                        "@ondc/org/settlement_window": {
                            "id": "b2c_log_bpp_on_cancel_message_132",
                            "type": "string",
                            "minLength": 1
                        },
                        "@ondc/org/settlement_details": {
                            "id": "b2c_log_bpp_on_cancel_message_133",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_cancel_message_134",
                                "type": "object",
                                "properties": {
                                    "settlement_counterparty": {
                                        "id": "b2c_log_bpp_on_cancel_message_135",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_type": {
                                        "id": "b2c_log_bpp_on_cancel_message_136",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "upi_address": {
                                        "id": "b2c_log_bpp_on_cancel_message_137",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_bank_account_no": {
                                        "id": "b2c_log_bpp_on_cancel_message_138",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_ifsc_code": {
                                        "id": "b2c_log_bpp_on_cancel_message_139",
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
                                            "flowId": {
                                                "const": [
                                                    "LOG10_7",
                                                    "LOG10COD",
                                                    "LOG10SURGFEE",
                                                ]
                                            }
                                        }
                                    },
                                    "then": [
                                        "collected_by",
                                        "@ondc/org/settlement_basis",
                                        "@ondc/org/settlement_window",
                                        "@ondc/org/settlement_details",
                                        "status",
                                        "type"
                                    ]
                                }
                            ]
                        }
                    }
                },
                "@ondc/org/linked_order": {
                    "id": "b2c_log_bpp_on_cancel_message_140",
                    "type": "object",
                    "properties": {
                        "items": {
                            "id": "b2c_log_bpp_on_cancel_message_141",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_cancel_message_142",
                                "type": "object",
                                "properties": {
                                    "category_id": {
                                        "id": "b2c_log_bpp_on_cancel_message_143",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "descriptor": {
                                        "id": "b2c_log_bpp_on_cancel_message_144",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "b2c_log_bpp_on_cancel_message_145",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "quantity": {
                                        "id": "b2c_log_bpp_on_cancel_message_146",
                                        "type": "object",
                                        "properties": {
                                            "count": {
                                                "id": "b2c_log_bpp_on_cancel_message_147",
                                                "type": "number"
                                            },
                                            "measure": {
                                                "id": "b2c_log_bpp_on_cancel_message_148",
                                                "type": "object",
                                                "properties": {
                                                    "unit": {
                                                        "id": "b2c_log_bpp_on_cancel_message_149",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "value": {
                                                        "id": "b2c_log_bpp_on_cancel_message_150",
                                                        "type": "number"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "price": {
                                        "id": "b2c_log_bpp_on_cancel_message_151",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "b2c_log_bpp_on_cancel_message_152",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "b2c_log_bpp_on_cancel_message_153",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "provider": {
                            "id": "b2c_log_bpp_on_cancel_message_154",
                            "type": "object",
                            "properties": {
                                // "descriptor": {
                                //     "id": "b2c_log_bpp_on_cancel_message_155",
                                //     "type": "object",
                                //     "properties": {
                                //         "name": {
                                //             "id": "b2c_log_bpp_on_cancel_message_156",
                                //             "type": "string",
                                //             "minLength": 1
                                //         }
                                //     }
                                // },
                                "address": {
                                    "id": "b2c_log_bpp_on_cancel_message_157",
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "id": "b2c_log_bpp_on_cancel_message_158",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "building": {
                                            "id": "b2c_log_bpp_on_cancel_message_159",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "locality": {
                                            "id": "b2c_log_bpp_on_cancel_message_160",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "city": {
                                            "id": "b2c_log_bpp_on_cancel_message_161",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "state": {
                                            "id": "b2c_log_bpp_on_cancel_message_162",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "area_code": {
                                            "id": "b2c_log_bpp_on_cancel_message_163",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            }
                        },
                        "order": {
                            "id": "b2c_log_bpp_on_cancel_message_164",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "id": "b2c_log_bpp_on_cancel_message_165",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "weight": {
                                    "id": "b2c_log_bpp_on_cancel_message_166",
                                    "type": "object",
                                    "properties": {
                                        "unit": {
                                            "id": "b2c_log_bpp_on_cancel_message_167",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "value": {
                                            "id": "b2c_log_bpp_on_cancel_message_168",
                                            "type": "number"
                                        }
                                    }
                                },
                                "dimensions": {
                                    "id": "b2c_log_bpp_on_cancel_message_169",
                                    "type": "object",
                                    "properties": {
                                        "length": {
                                            "id": "b2c_log_bpp_on_cancel_message_170",
                                            "type": "object",
                                            "properties": {
                                                "unit": {
                                                    "id": "b2c_log_bpp_on_cancel_message_171",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "value": {
                                                    "id": "b2c_log_bpp_on_cancel_message_172",
                                                    "type": "number"
                                                }
                                            }
                                        },
                                        "breadth": {
                                            "id": "b2c_log_bpp_on_cancel_message_173",
                                            "type": "object",
                                            "properties": {
                                                "unit": {
                                                    "id": "b2c_log_bpp_on_cancel_message_174",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "value": {
                                                    "id": "b2c_log_bpp_on_cancel_message_175",
                                                    "type": "number"
                                                }
                                            }
                                        },
                                        "height": {
                                            "id": "b2c_log_bpp_on_cancel_message_176",
                                            "type": "object",
                                            "properties": {
                                                "unit": {
                                                    "id": "b2c_log_bpp_on_cancel_message_177",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "value": {
                                                    "id": "b2c_log_bpp_on_cancel_message_178",
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
                "updated_at": {
                    "id": "b2c_log_bpp_on_cancel_message_179",
                    "type": "string",
                    "minLength": 1
                }
            }
        }
    }
}